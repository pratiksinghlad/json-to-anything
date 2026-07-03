/**
 * Wraps a value string inside a Markdown fenced code block.
 *
 * The resulting string is suitable for pasting into Notion, GitHub wikis,
 * Confluence, or any other Markdown-aware tool.
 *
 * @param value    The raw content to wrap.
 * @param language The language identifier used for syntax highlighting hints
 *                 (e.g. "json", "yaml", "xml", "graphql", "plaintext").
 *                 Defaults to an empty string (unhinted fence).
 */
export function wrapInMarkdownFence(value: string, language = ""): string {
  return `\`\`\`${language}\n${value}\n\`\`\``;
}
