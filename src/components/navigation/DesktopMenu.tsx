import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../../menuData";
import LanguageMenu from "./LanguageMenu";
import styles from "./DesktopMenu.module.scss";

interface DesktopMenuProps {
  vertical?: boolean;
}

const DesktopMenu = ({ vertical = false }: DesktopMenuProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleKeyDown = (event: React.KeyboardEvent, path: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNavigation(path);
    }
  };

  return (
    <header className={`${styles.desktopMenu} ${vertical ? styles["desktopMenu--vertical"] : ""}`}>
      <nav aria-label={t("aria.mainNavigation")} className={styles.desktopMenu__nav}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.key}
              onClick={() => handleNavigation(item.path)}
              onKeyDown={(e) => handleKeyDown(e, item.path)}
              className={`${styles.desktopMenu__link} ${isActive ? styles["desktopMenu__link--active"] : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {t(item.labelKey)}
            </button>
          );
        })}
      </nav>
      <div className={styles.desktopMenu__languageWrapper}>
        <LanguageMenu />
      </div>
    </header>
  );
};

export default DesktopMenu;
