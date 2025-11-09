import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import MobileMenu from "../../../components/navigation/MobileMenu";
import "../../../i18n";

// Mock i18n for testing
vi.mock("react-i18next", async () => {
  const actual = await vi.importActual("react-i18next");
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => {
        const translations: Record<string, string> = {
          "menu.jsonToCsv": "JSON to CSV",
          "menu.jsonToXml": "JSON to XML",
          "menu.beautifyJson": "Beautify JSON",
          "menu.compare": "Compare",
          "menu.about": "About",
          "aria.openMenu": "Open navigation menu",
          "aria.closeMenu": "Close navigation menu",
          "aria.mainNavigation": "Main navigation",
        };
        return translations[key] || key;
      },
      i18n: {
        language: "en",
        changeLanguage: vi.fn(),
      },
    }),
  };
});

// Mock LanguageMenu component
vi.mock("../../../components/navigation/LanguageMenu", () => ({
  default: () => <div data-testid="language-menu">Language Menu</div>,
}));

describe("MobileMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders mobile header with hamburger icon", () => {
    render(
      <BrowserRouter>
        <MobileMenu />
      </BrowserRouter>
    );

    expect(screen.getByLabelText("Open navigation menu")).toBeInTheDocument();
  });

  it("renders language menu in header", () => {
    render(
      <BrowserRouter>
        <MobileMenu />
      </BrowserRouter>
    );

    expect(screen.getByTestId("language-menu")).toBeInTheDocument();
  });

  it("opens drawer when hamburger is clicked", () => {
    render(
      <BrowserRouter>
        <MobileMenu />
      </BrowserRouter>
    );

    const hamburger = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburger);

    expect(screen.getByLabelText("Close navigation menu")).toBeInTheDocument();
  });

  it("displays all menu items in drawer when open", () => {
    render(
      <BrowserRouter>
        <MobileMenu />
      </BrowserRouter>
    );

    const hamburger = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburger);

    // Find items within the navigation
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveTextContent("JSON to CSV");
    expect(nav).toHaveTextContent("JSON to XML");
    expect(nav).toHaveTextContent("Beautify JSON");
    expect(nav).toHaveTextContent("Compare");
    expect(nav).toHaveTextContent("About");
  });

  it("does NOT display phone, email, or settings items", () => {
    render(
      <BrowserRouter>
        <MobileMenu />
      </BrowserRouter>
    );

    const hamburger = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburger);

    expect(screen.queryByText(/phone/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/email/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/settings/i)).not.toBeInTheDocument();
  });

  it("marks active menu item with aria-current", () => {
    render(
      <MemoryRouter initialEntries={["/validate"]}>
        <MobileMenu />
      </MemoryRouter>
    );

    const hamburger = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburger);

    const validateButton = screen.getAllByText("Validate JSON").find((el) => 
      el.tagName === "SPAN" && el.closest("button")
    );
    expect(validateButton?.closest("button")).toHaveAttribute("aria-current", "page");
  });

  it("has correct aria attributes for accessibility", () => {
    render(
      <BrowserRouter>
        <MobileMenu />
      </BrowserRouter>
    );

    const hamburger = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburger);

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("aria-label", "Main navigation");
  });
});
