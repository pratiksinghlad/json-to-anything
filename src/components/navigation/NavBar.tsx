import { memo } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

interface NavBarProps {
  vertical?: boolean;
}

const NavBar = memo(({ vertical = false }: NavBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  if (isMobile) {
    return <MobileMenu />;
  }

  return <DesktopMenu vertical={vertical} />;
});

NavBar.displayName = "NavBar";

export default NavBar;
