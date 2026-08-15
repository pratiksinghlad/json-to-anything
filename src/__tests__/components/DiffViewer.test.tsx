import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DiffViewer from "../../components/Compare/DiffViewer";
import type { DiffRow } from "../../engine/diffTypes";

describe("DiffViewer", () => {
  const sampleRows: DiffRow[] = [
    {
      id: "row-0",
      left: {
        lineNumber: 1,
        content: "pratik",
        type: "removed",
        parts: [
          { type: "equal", value: "pr" },
          { type: "removed", value: "a" },
          { type: "equal", value: "tik" },
        ],
      },
      right: {
        lineNumber: 1,
        content: "pr@tik",
        type: "added",
        parts: [
          { type: "equal", value: "pr" },
          { type: "added", value: "@" },
          { type: "equal", value: "tik" },
        ],
      },
    },
  ];

  it("renders side-by-side lines with character-level highlights", () => {
    render(<DiffViewer rows={sampleRows} disableLineWrap={false} />);

    expect(screen.getByTestId("diff-char-removed")).toHaveTextContent("a");
    expect(screen.getByTestId("diff-char-added")).toHaveTextContent("@");
  });

  it("renders with disableLineWrap enabled", () => {
    const { container } = render(<DiffViewer rows={sampleRows} disableLineWrap={true} />);
    expect(container).toBeInTheDocument();
  });
});
