import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import LanguageMenu from "../../../components/navigation/LanguageMenu";
import "../../../i18n";

// Mock i18n for testing
vi.mock("react-i18next", async () => {
  const actual = await vi.importActual("react-i18next");
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: {
        language: "en",
        changeLanguage: vi.fn(),
      },
    }),
  };
});

describe("LanguageMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders language selector button in desktop mode", () => {
    render(<LanguageMenu />);
    expect(screen.getByLabelText("aria.languageSelector")).toBeInTheDocument();
  });

  it("renders language selector as IconButton in mobile mode", () => {
    render(<LanguageMenu mobile />);
    const button = screen.getByLabelText("aria.languageSelector");
    expect(button).toBeInTheDocument();
  });

  it("opens menu when button is clicked", async () => {
    render(<LanguageMenu />);
    const button = screen.getByLabelText("aria.languageSelector");
    
    fireEvent.click(button);
    
    await waitFor(() => {
      const menu = screen.getByRole("menu");
      expect(menu).toBeInTheDocument();
      expect(screen.getByRole("menuitem", { name: "English" })).toBeInTheDocument();
      expect(screen.getByRole("menuitem", { name: "Español" })).toBeInTheDocument();
      expect(screen.getByRole("menuitem", { name: "हिन्दी" })).toBeInTheDocument();
    });
  });

  it("has correct aria attributes", () => {
    render(<LanguageMenu />);
    const button = screen.getByLabelText("aria.languageSelector");
    
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-haspopup", "true");
    
    fireEvent.click(button);
    
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("displays current language label in desktop mode", () => {
    render(<LanguageMenu />);
    expect(screen.getByText("English")).toBeInTheDocument();
  });
});
