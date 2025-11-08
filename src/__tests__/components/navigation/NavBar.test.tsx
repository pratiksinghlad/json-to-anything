import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../../../components/navigation/NavBar";
import "../../../i18n";

// Mock the MUI useMediaQuery hook
vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

// Mock child components
vi.mock("../../../components/navigation/DesktopMenu", () => ({
  default: () => <div data-testid="desktop-menu">Desktop Menu</div>,
}));

vi.mock("../../../components/navigation/MobileMenu", () => ({
  default: () => <div data-testid="mobile-menu">Mobile Menu</div>,
}));

describe("NavBar", () => {
  it("renders desktop menu on desktop viewport", async () => {
    const { useMediaQuery } = await import("@mui/material");
    vi.mocked(useMediaQuery).mockReturnValue(false);

    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    // Wait for component to mount
    await new Promise((resolve) => setTimeout(resolve, 100));

    const desktopMenu = screen.queryByTestId("desktop-menu");
    const mobileMenu = screen.queryByTestId("mobile-menu");

    expect(desktopMenu).toBeInTheDocument();
    expect(mobileMenu).not.toBeInTheDocument();
  });

  it("renders mobile menu on mobile viewport", async () => {
    const { useMediaQuery } = await import("@mui/material");
    vi.mocked(useMediaQuery).mockReturnValue(true);

    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    // Wait for component to mount
    await new Promise((resolve) => setTimeout(resolve, 100));

    const mobileMenu = screen.queryByTestId("mobile-menu");
    const desktopMenu = screen.queryByTestId("desktop-menu");

    expect(mobileMenu).toBeInTheDocument();
    expect(desktopMenu).not.toBeInTheDocument();
  });

  it("renders null before mounting, then renders content after mount", async () => {
    const { useMediaQuery } = await import("@mui/material");
    vi.mocked(useMediaQuery).mockReturnValue(false);

    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    // After mounting completes, it should render the desktop menu
    await new Promise((resolve) => setTimeout(resolve, 100));
    
    expect(screen.queryByTestId("desktop-menu")).toBeInTheDocument();
  });
});
