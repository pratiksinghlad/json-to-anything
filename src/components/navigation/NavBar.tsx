import { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

interface NavBarProps {
  vertical?: boolean;
}

const NavBar = ({ vertical = false }: NavBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch in SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder during SSR to prevent hydration issues
    return null;
  }

  if (isMobile) {
    return <MobileMenu />;
  }

  return <DesktopMenu vertical={vertical} />;
};

export default NavBar;
