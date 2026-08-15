import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DiffToolbar from "../../components/Compare/DiffToolbar";
import "../../i18n";

describe("DiffToolbar", () => {
  it("renders both toggle switches with correct labels", () => {
    render(
      <DiffToolbar
        hideWhitespace={false}
        disableLineWrap={false}
        onHideWhitespaceChange={vi.fn()}
        onDisableLineWrapChange={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/hide whitespace changes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/disable line wrap/i)).toBeInTheDocument();
  });

  it("calls onHideWhitespaceChange when toggled", () => {
    const onHideWhitespace = vi.fn();
    render(
      <DiffToolbar
        hideWhitespace={false}
        disableLineWrap={false}
        onHideWhitespaceChange={onHideWhitespace}
        onDisableLineWrapChange={vi.fn()}
      />
    );

    const switchEl = screen.getByLabelText(/hide whitespace changes/i);
    fireEvent.click(switchEl);
    expect(onHideWhitespace).toHaveBeenCalledWith(true);
  });

  it("calls onDisableLineWrapChange when toggled", () => {
    const onDisableLineWrap = vi.fn();
    render(
      <DiffToolbar
        hideWhitespace={false}
        disableLineWrap={false}
        onHideWhitespaceChange={vi.fn()}
        onDisableLineWrapChange={onDisableLineWrap}
      />
    );

    const switchEl = screen.getByLabelText(/disable line wrap/i);
    fireEvent.click(switchEl);
    expect(onDisableLineWrap).toHaveBeenCalledWith(true);
  });
});
