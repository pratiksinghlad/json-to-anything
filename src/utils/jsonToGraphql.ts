export interface JsonToGraphqlOptions {
  rootTypeName?: string;
  includeInputTypes?: boolean;
  includeInterfaces?: boolean;
}

type GraphqlScalar = "String" | "Int" | "Float" | "Boolean" | "JSON";

type Shape =
  | { kind: "scalar"; scalar: GraphqlScalar; nullable: boolean }
  | { kind: "array"; item: Shape; nullable: boolean }
  | { kind: "object"; typeName: string; fields: Map<string, FieldShape>; nullable: boolean };

interface FieldShape {
  outputName: string;
  sourceName: string;
  shape: Shape;
  seen: number;
}

interface ObjectRegistration {
  typeName: string;
  fields: Map<string, FieldShape>;
}

const RESERVED_NAMES = new Set([
  "Boolean",
  "Float",
  "ID",
  "Int",
  "JSON",
  "Query",
  "String",
  "Subscription",
  "Mutation",
]);

const toPascalCase = (value: string): string => {
  const words = value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);

  const result = words
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join("");

  return result || "Generated";
};

const singularize = (value: string): string => {
  if (value.endsWith("ies") && value.length > 3) {
    return `${value.slice(0, -3)}y`;
  }

  if (value.endsWith("s") && value.length > 1) {
    return value.slice(0, -1);
  }

  return value;
};

const sanitizeTypeName = (value: string): string => {
  const candidate = toPascalCase(value).replace(/^[^A-Za-z_]+/, "");
  const safeName = candidate || "Generated";

  return RESERVED_NAMES.has(safeName) ? `${safeName}Type` : safeName;
};

const sanitizeFieldName = (value: string): string => {
  const normalized = value.replace(/[^A-Za-z0-9_]/g, "_");
  const withValidStart = /^[A-Za-z_]/.test(normalized) ? normalized : `_${normalized}`;
  const compacted = withValidStart.replace(/_+/g, "_").replace(/_$/g, "");

  return compacted || "field";
};

const getScalar = (value: unknown): GraphqlScalar => {
  switch (typeof value) {
    case "boolean":
      return "Boolean";
    case "number":
      return Number.isInteger(value) ? "Int" : "Float";
    case "string":
      return "String";
    default:
      return "JSON";
  }
};

const mergeScalars = (left: GraphqlScalar, right: GraphqlScalar): GraphqlScalar => {
  if (left === right) return left;
  if ((left === "Int" && right === "Float") || (left === "Float" && right === "Int")) {
    return "Float";
  }
  return "JSON";
};

class GraphqlSchemaBuilder {
  private readonly registrations = new Map<string, ObjectRegistration>();
  private readonly usedTypeNames = new Set<string>();

  build(data: unknown, options: JsonToGraphqlOptions = {}): string {
    const rootTypeName = sanitizeTypeName(options.rootTypeName ?? "Root");
    const includeInputTypes = options.includeInputTypes ?? true;
    const includeInterfaces = options.includeInterfaces ?? true;

    const rootShape = Array.isArray(data)
      ? this.wrapRootArray(data, rootTypeName)
      : this.inferShape(data, rootTypeName);

    if (rootShape.kind !== "object") {
      throw new Error("GraphQL conversion requires a JSON object or an array at the root.");
    }

    const usesJsonScalar = this.usesJsonScalar(rootShape);
    const sections: string[] = [];

    if (usesJsonScalar) {
      sections.push("scalar JSON");
    }

    if (includeInterfaces) {
      sections.push(...this.getObjectRegistrations().map((entry) => this.renderInterface(entry)));
    }

    sections.push(...this.getObjectRegistrations().map((entry) => this.renderType(entry, includeInterfaces)));

    if (includeInputTypes) {
      sections.push(...this.getObjectRegistrations().map((entry) => this.renderInput(entry)));
    }

    return sections.join("\n\n");
  }

  private wrapRootArray(data: unknown[], rootTypeName: string): Shape {
    const itemTypeName = sanitizeTypeName(`${rootTypeName}Item`);
    const itemShape = this.mergeShapes(
      data.map((item) => this.inferShape(item, itemTypeName, true)),
      itemTypeName,
    );
    const rootFields = new Map<string, FieldShape>();
    rootFields.set("items", {
      outputName: "items",
      sourceName: "items",
      seen: data.length > 0 ? 1 : 0,
      shape: { kind: "array", item: itemShape, nullable: false },
    });

    const rootShape: Shape = {
      kind: "object",
      typeName: rootTypeName,
      fields: rootFields,
      nullable: false,
    };
    this.registerObject(rootTypeName, rootFields);
    return rootShape;
  }

  private inferShape(value: unknown, preferredTypeName: string, reuseExistingType = false): Shape {
    if (value === null || value === undefined) {
      return { kind: "scalar", scalar: "JSON", nullable: true };
    }

    if (Array.isArray(value)) {
      const itemTypeName = sanitizeTypeName(singularize(preferredTypeName));
      const item =
        value.length === 0
          ? { kind: "scalar", scalar: "JSON", nullable: true } satisfies Shape
          : this.mergeShapes(
              value.map((itemValue) => this.inferShape(itemValue, itemTypeName, true)),
              itemTypeName,
            );

      return { kind: "array", item, nullable: false };
    }

    if (typeof value === "object") {
      const reusableTypeName = sanitizeTypeName(preferredTypeName);
      const typeName =
        reuseExistingType && this.registrations.has(reusableTypeName)
          ? reusableTypeName
          : this.getUniqueTypeName(preferredTypeName);
      const fields = this.inferFields(value as Record<string, unknown>, typeName);
      this.registerObject(typeName, fields);

      return { kind: "object", typeName, fields, nullable: false };
    }

    return { kind: "scalar", scalar: getScalar(value), nullable: false };
  }

  private inferFields(value: Record<string, unknown>, parentTypeName: string): Map<string, FieldShape> {
    const fields = new Map<string, FieldShape>();
    const usedFieldNames = new Set<string>();

    for (const [sourceName, sourceValue] of Object.entries(value)) {
      const baseFieldName = sanitizeFieldName(sourceName);
      let outputName = baseFieldName;
      let suffix = 2;
      while (usedFieldNames.has(outputName)) {
        outputName = `${baseFieldName}_${suffix}`;
        suffix += 1;
      }
      usedFieldNames.add(outputName);

      fields.set(sourceName, {
        outputName,
        sourceName,
        seen: 1,
        shape: this.inferShape(sourceValue, `${parentTypeName}${singularize(toPascalCase(sourceName))}`),
      });
    }

    return fields;
  }

  private mergeShapes(shapes: Shape[], preferredTypeName: string): Shape {
    if (shapes.length === 0) {
      return { kind: "scalar", scalar: "JSON", nullable: true };
    }

    return shapes.slice(1).reduce((current, next) => this.mergeTwoShapes(current, next, preferredTypeName), shapes[0]);
  }

  private mergeTwoShapes(left: Shape, right: Shape, preferredTypeName: string): Shape {
    const nullable = left.nullable || right.nullable;

    if (left.kind === "scalar" && right.kind === "scalar") {
      return { kind: "scalar", scalar: mergeScalars(left.scalar, right.scalar), nullable };
    }

    if (left.kind === "array" && right.kind === "array") {
      return {
        kind: "array",
        item: this.mergeTwoShapes(left.item, right.item, preferredTypeName),
        nullable,
      };
    }

    if (left.kind === "object" && right.kind === "object") {
      const typeName = left.typeName || right.typeName || this.getUniqueTypeName(preferredTypeName);
      const fields = this.mergeFields(left.fields, right.fields, typeName);
      this.registerObject(typeName, fields);
      return { kind: "object", typeName, fields, nullable };
    }

    return { kind: "scalar", scalar: "JSON", nullable };
  }

  private mergeFields(
    leftFields: Map<string, FieldShape>,
    rightFields: Map<string, FieldShape>,
    parentTypeName: string,
  ): Map<string, FieldShape> {
    const merged = new Map<string, FieldShape>();
    const keys = new Set([...leftFields.keys(), ...rightFields.keys()]);

    for (const key of keys) {
      const left = leftFields.get(key);
      const right = rightFields.get(key);

      if (left && right) {
        merged.set(key, {
          outputName: left.outputName,
          sourceName: left.sourceName,
          seen: left.seen + right.seen,
          shape: this.mergeTwoShapes(left.shape, right.shape, `${parentTypeName}${toPascalCase(key)}`),
        });
        continue;
      }

      const existing = left ?? right;
      if (existing) {
        merged.set(key, {
          ...existing,
          shape: this.markNullable(existing.shape),
        });
      }
    }

    return merged;
  }

  private markNullable(shape: Shape): Shape {
    return { ...shape, nullable: true };
  }

  private getUniqueTypeName(preferredName: string): string {
    const baseName = sanitizeTypeName(preferredName);
    if (!this.usedTypeNames.has(baseName)) {
      this.usedTypeNames.add(baseName);
      return baseName;
    }

    let suffix = 2;
    let candidate = `${baseName}${suffix}`;
    while (this.usedTypeNames.has(candidate)) {
      suffix += 1;
      candidate = `${baseName}${suffix}`;
    }

    this.usedTypeNames.add(candidate);
    return candidate;
  }

  private registerObject(typeName: string, fields: Map<string, FieldShape>): void {
    this.registrations.set(typeName, { typeName, fields });
  }

  private getObjectRegistrations(): ObjectRegistration[] {
    return Array.from(this.registrations.values());
  }

  private usesJsonScalar(shape: Shape): boolean {
    if (shape.kind === "scalar") return shape.scalar === "JSON";
    if (shape.kind === "array") return this.usesJsonScalar(shape.item);
    return Array.from(shape.fields.values()).some((field) => this.usesJsonScalar(field.shape));
  }

  private renderInterface(entry: ObjectRegistration): string {
    return [
      `interface ${entry.typeName}Fields {`,
      ...Array.from(entry.fields.values()).map((field) => `  ${field.outputName}: ${this.renderOutputType(field.shape)}`),
      "}",
    ].join("\n");
  }

  private renderType(entry: ObjectRegistration, includeInterface: boolean): string {
    const implementsClause = includeInterface ? ` implements ${entry.typeName}Fields` : "";

    return [
      `type ${entry.typeName}${implementsClause} {`,
      ...Array.from(entry.fields.values()).map((field) => `  ${field.outputName}: ${this.renderOutputType(field.shape)}`),
      "}",
    ].join("\n");
  }

  private renderInput(entry: ObjectRegistration): string {
    return [
      `input ${entry.typeName}Input {`,
      ...Array.from(entry.fields.values()).map((field) => `  ${field.outputName}: ${this.renderInputType(field.shape)}`),
      "}",
    ].join("\n");
  }

  private renderOutputType(shape: Shape): string {
    if (shape.kind === "scalar") {
      return this.withNullability(shape.scalar, shape.nullable);
    }

    if (shape.kind === "array") {
      return this.withNullability(`[${this.renderOutputType(shape.item)}]`, shape.nullable);
    }

    return this.withNullability(shape.typeName, shape.nullable);
  }

  private renderInputType(shape: Shape): string {
    if (shape.kind === "scalar") {
      return this.withNullability(shape.scalar, shape.nullable);
    }

    if (shape.kind === "array") {
      return this.withNullability(`[${this.renderInputType(shape.item)}]`, shape.nullable);
    }

    return this.withNullability(`${shape.typeName}Input`, shape.nullable);
  }

  private withNullability(typeName: string, nullable: boolean): string {
    return nullable ? typeName : `${typeName}!`;
  }
}

export const jsonToGraphql = (
  data: unknown,
  options: JsonToGraphqlOptions = {},
): { ok: true; output: string } | { ok: false; error: string } => {
  try {
    const builder = new GraphqlSchemaBuilder();
    return { ok: true, output: builder.build(data, options) };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
