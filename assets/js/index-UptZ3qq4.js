const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/js/JsonToCsvPage-FzhPmBTK.js","assets/js/react-vendor-D6TQlta-.js","assets/js/mui-vendor-CE9s5qa2.js","assets/js/rolldown-runtime-BM52pwkw.js","assets/js/prism-vendor-hkdziHBB.js","assets/css/prism-vendor-BXf0deJJ.css","assets/js/JsonToXmlPage-B4joefWi.js","assets/js/BeautifyJsonPage-B2307-PZ.js","assets/js/ComparePage-CtnEj9g4.js","assets/js/AboutPage-f5Z8Pd64.js"])))=>i.map(i=>d[i]);
import { n as __toESM } from "./rolldown-runtime-BM52pwkw.js";
import { A as CssBaseline_default, B as ThemeProvider, C as Menu_default$1, G as require_react, H as createTheme, L as IconButton_default, N as Box_default, R as CircularProgress_default, S as MenuItem_default, U as require_jsx_runtime, V as useTheme, a as Language_default, d as useMediaQuery_default, k as Drawer_default, r as Menu_default, s as ExpandMore_default, u as Close_default, w as List_default } from "./mui-vendor-CE9s5qa2.js";
import { a as useLocation, c as useTranslation, i as Routes, l as initReactI18next, n as BrowserRouter, o as useNavigate, r as Route, s as __vitePreload, u as require_client } from "./react-vendor-D6TQlta-.js";
import { t as instance } from "./i18n-vendor-CtonVZ5r.js";
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
var import_client = /* @__PURE__ */ __toESM(require_client());
var import_react = /* @__PURE__ */ __toESM(require_react());
var en_default = {
	menu: {
		"jsonToCsv": "JSON to CSV",
		"jsonToXml": "JSON to XML",
		"beautifyJson": "Beautify JSON",
		"compare": "Compare",
		"about": "About"
	},
	language: {
		"english": "English",
		"spanish": "Spanish",
		"hindi": "Hindi",
		"selectLanguage": "Select Language"
	},
	aria: {
		"openMenu": "Open navigation menu",
		"closeMenu": "Close navigation menu",
		"mainNavigation": "Main navigation",
		"languageSelector": "Language selector",
		"currentPage": "Current page"
	}
};
var es_default = {
	menu: {
		"jsonToCsv": "JSON a CSV",
		"jsonToXml": "JSON a XML",
		"beautifyJson": "Embellecer JSON",
		"compare": "Comparar",
		"about": "Acerca de"
	},
	language: {
		"english": "Inglés",
		"spanish": "Español",
		"hindi": "Hindi",
		"selectLanguage": "Seleccionar idioma"
	},
	aria: {
		"openMenu": "Abrir menú de navegación",
		"closeMenu": "Cerrar menú de navegación",
		"mainNavigation": "Navegación principal",
		"languageSelector": "Selector de idioma",
		"currentPage": "Página actual"
	}
};
var hi_default = {
	menu: {
		"jsonToCsv": "JSON से CSV",
		"jsonToXml": "JSON से XML",
		"beautifyJson": "JSON सुंदर बनाएं",
		"compare": "तुलना करें",
		"about": "के बारे में"
	},
	language: {
		"english": "अंग्रेज़ी",
		"spanish": "स्पेनिश",
		"hindi": "हिन्दी",
		"selectLanguage": "भाषा चुनें"
	},
	aria: {
		"openMenu": "नेविगेशन मेनू खोलें",
		"closeMenu": "नेविगेशन मेनू बंद करें",
		"mainNavigation": "मुख्य नेविगेशन",
		"languageSelector": "भाषा चयनकर्ता",
		"currentPage": "वर्तमान पृष्ठ"
	}
};
var savedLanguage = localStorage.getItem("appLanguage");
var browserLanguage = navigator.language.split("-")[0];
var defaultLanguage = savedLanguage || ([
	"en",
	"es",
	"hi"
].includes(browserLanguage) ? browserLanguage : "en");
instance.use(initReactI18next).init({
	resources: {
		en: { translation: en_default },
		es: { translation: es_default },
		hi: { translation: hi_default }
	},
	lng: defaultLanguage,
	fallbackLng: "en",
	interpolation: { escapeValue: false }
});
instance.on("languageChanged", (lng) => {
	localStorage.setItem("appLanguage", lng);
	document.documentElement.lang = lng;
});
const themeConfig = {
	PRIMARY_COLOR: "#1976d2",
	PRIMARY_DARK: "#115293",
	PRIMARY_LIGHT: "#4791db",
	SURFACE_BG: "#ffffff",
	SURFACE_LIGHT: "#f5f5f5",
	SURFACE_LIGHTER: "#eeeeee",
	TEXT_PRIMARY: "#000000",
	TEXT_SECONDARY: "#000000",
	TEXT_DISABLED: "#666666",
	HOVER_BG: "rgba(255, 255, 255, 0.08)",
	ACTIVE_BG: "rgba(25, 118, 210, 0.12)",
	FOCUS_OUTLINE: "#4791db",
	BREAKPOINTS: {
		xs: 0,
		sm: 600,
		md: 960,
		lg: 1280,
		xl: 1920
	}
};
const menuItems = [
	{
		key: "json-to-csv",
		labelKey: "menu.jsonToCsv",
		path: "/"
	},
	{
		key: "json-to-xml",
		labelKey: "menu.jsonToXml",
		path: "/json-to-xml"
	},
	{
		key: "beautify-json",
		labelKey: "menu.beautifyJson",
		path: "/beautify"
	},
	{
		key: "compare",
		labelKey: "menu.compare",
		path: "/compare"
	},
	{
		key: "about",
		labelKey: "menu.about",
		path: "/about"
	}
];
const languageOptions = [
	{
		code: "en",
		label: "English",
		nativeLabel: "English"
	},
	{
		code: "es",
		label: "Spanish",
		nativeLabel: "Español"
	},
	{
		code: "hi",
		label: "Hindi",
		nativeLabel: "हिन्दी"
	}
];
var LanguageMenu_module_default = {
	languageMenu: "_languageMenu_1ss8t_1",
	languageMenu__button: "_languageMenu__button_1ss8t_4",
	languageMenu__flag: "_languageMenu__flag_1ss8t_31",
	languageMenu__label: "_languageMenu__label_1ss8t_37",
	languageMenu__icon: "_languageMenu__icon_1ss8t_41",
	"languageMenu__icon--open": "_languageMenu__icon--open_1ss8t_47",
	"languageMenu__button--mobile": "_languageMenu__button--mobile_1ss8t_51"
};
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var LanguageMenu = ({ mobile = false }) => {
	const { i18n, t } = useTranslation();
	const [anchorEl, setAnchorEl] = (0, import_react.useState)(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLanguageChange = (languageCode) => {
		i18n.changeLanguage(languageCode);
		handleClose();
	};
	const currentLanguage = languageOptions.find((lang) => lang.code === i18n.language) || languageOptions[0];
	if (mobile) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: LanguageMenu_module_default.languageMenu,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton_default, {
			onClick: handleClick,
			"aria-label": t("aria.languageSelector"),
			"aria-expanded": open,
			"aria-haspopup": "true",
			className: LanguageMenu_module_default.languageMenu__button + " " + LanguageMenu_module_default["languageMenu__button--mobile"],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Language_default, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu_default$1, {
			anchorEl,
			open,
			onClose: handleClose,
			anchorOrigin: {
				vertical: "bottom",
				horizontal: "right"
			},
			transformOrigin: {
				vertical: "top",
				horizontal: "right"
			},
			sx: {
				"& .MuiPaper-root": {
					backgroundColor: "#ffffff",
					border: "2px solid #d0d0d0",
					borderRadius: "8px",
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
				},
				"& .MuiMenuItem-root": {
					color: "#000000",
					fontSize: "0.9375rem",
					padding: "12px 20px",
					"&:hover": { backgroundColor: "#f5f5f5" },
					"&.Mui-selected": {
						backgroundColor: "rgba(25, 118, 210, 0.12)",
						color: "#1976d2",
						fontWeight: 600,
						"&:hover": { backgroundColor: "rgba(25, 118, 210, 0.18)" }
					}
				}
			},
			children: languageOptions.map((lang) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem_default, {
				onClick: () => handleLanguageChange(lang.code),
				selected: lang.code === i18n.language,
				children: lang.nativeLabel
			}, lang.code))
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: LanguageMenu_module_default.languageMenu,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: handleClick,
			"aria-label": t("aria.languageSelector"),
			"aria-expanded": open,
			"aria-haspopup": "true",
			className: LanguageMenu_module_default.languageMenu__button,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Language_default, { className: LanguageMenu_module_default.languageMenu__flag }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: LanguageMenu_module_default.languageMenu__label,
					children: currentLanguage.nativeLabel
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandMore_default, { className: `${LanguageMenu_module_default.languageMenu__icon} ${open ? LanguageMenu_module_default["languageMenu__icon--open"] : ""}` })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu_default$1, {
			anchorEl,
			open,
			onClose: handleClose,
			anchorOrigin: {
				vertical: "bottom",
				horizontal: "center"
			},
			transformOrigin: {
				vertical: "top",
				horizontal: "center"
			},
			sx: {
				"& .MuiPaper-root": {
					backgroundColor: "#ffffff",
					border: "2px solid #d0d0d0",
					borderRadius: "8px",
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
					marginTop: "8px"
				},
				"& .MuiMenuItem-root": {
					color: "#000000",
					fontSize: "0.9375rem",
					padding: "12px 20px",
					minWidth: "160px",
					"&:hover": { backgroundColor: "#f5f5f5" },
					"&.Mui-selected": {
						backgroundColor: "rgba(25, 118, 210, 0.12)",
						color: "#1976d2",
						fontWeight: 600,
						"&:hover": { backgroundColor: "rgba(25, 118, 210, 0.18)" }
					}
				}
			},
			children: languageOptions.map((lang) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem_default, {
				onClick: () => handleLanguageChange(lang.code),
				selected: lang.code === i18n.language,
				children: lang.nativeLabel
			}, lang.code))
		})]
	});
};
var LanguageMenu_default = LanguageMenu;
const desktopMenu = "_desktopMenu_1dxjx_1";
const desktopMenu__nav = "_desktopMenu__nav_1dxjx_12";
const desktopMenu__link = "_desktopMenu__link_1dxjx_18";
const desktopMenu__languageWrapper = "_desktopMenu__languageWrapper_1dxjx_46";
var DesktopMenu_module_default = {
	desktopMenu,
	desktopMenu__nav,
	desktopMenu__link,
	"desktopMenu__link--active": "_desktopMenu__link--active_1dxjx_40",
	desktopMenu__languageWrapper,
	"desktopMenu--vertical": "_desktopMenu--vertical_1dxjx_50"
};
var DesktopMenu = ({ vertical = false }) => {
	const { t } = useTranslation();
	const location = useLocation();
	const navigate = useNavigate();
	const handleNavigation = (path) => {
		navigate(path);
	};
	const handleKeyDown = (event, path) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleNavigation(path);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `${DesktopMenu_module_default.desktopMenu} ${vertical ? DesktopMenu_module_default["desktopMenu--vertical"] : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			"aria-label": t("aria.mainNavigation"),
			className: DesktopMenu_module_default.desktopMenu__nav,
			children: menuItems.map((item) => {
				const isActive = location.pathname === item.path;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => handleNavigation(item.path),
					onKeyDown: (e) => handleKeyDown(e, item.path),
					className: `${DesktopMenu_module_default.desktopMenu__link} ${isActive ? DesktopMenu_module_default["desktopMenu__link--active"] : ""}`,
					"aria-current": isActive ? "page" : void 0,
					children: t(item.labelKey)
				}, item.key);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: DesktopMenu_module_default.desktopMenu__languageWrapper,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageMenu_default, {})
		})]
	});
};
var DesktopMenu_default = DesktopMenu;
const mobileMenu__header = "_mobileMenu__header_udds2_1";
const mobileMenu__left = "_mobileMenu__left_udds2_12";
const mobileMenu__hamburger = "_mobileMenu__hamburger_udds2_18";
const mobileMenu__title = "_mobileMenu__title_udds2_25";
const mobileMenu__languageWrapper = "_mobileMenu__languageWrapper_udds2_31";
const drawer__paper = "_drawer__paper_udds2_35";
const drawer__list = "_drawer__list_udds2_40";
const drawer__item = "_drawer__item_udds2_43";
const drawer__itemText = "_drawer__itemText_udds2_74";
var MobileMenu_module_default = {
	mobileMenu__header,
	mobileMenu__left,
	mobileMenu__hamburger,
	mobileMenu__title,
	mobileMenu__languageWrapper,
	drawer__paper,
	drawer__list,
	drawer__item,
	"drawer__item--active": "_drawer__item--active_udds2_67",
	drawer__itemText
};
var MobileMenu = () => {
	const { t } = useTranslation();
	const location = useLocation();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const toggleDrawer = (open) => (event) => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
		setIsOpen(open);
	};
	const handleNavigation = (path) => {
		navigate(path);
		setIsOpen(false);
	};
	const handleKeyDown = (event, path) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleNavigation(path);
		}
	};
	(0, import_react.useEffect)(() => {
		const handleEscape = (event) => {
			if (event.key === "Escape" && isOpen) setIsOpen(false);
		};
		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [isOpen]);
	const currentMenuItem = menuItems.find((item) => item.path === location.pathname);
	const pageTitle = currentMenuItem ? t(currentMenuItem.labelKey) : t("menu.jsonToCsv");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: MobileMenu_module_default.mobileMenu__header,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: MobileMenu_module_default.mobileMenu__left,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton_default, {
				onClick: toggleDrawer(true),
				"aria-label": t("aria.openMenu"),
				className: MobileMenu_module_default.mobileMenu__hamburger,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu_default, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: MobileMenu_module_default.mobileMenu__title,
				children: pageTitle
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: MobileMenu_module_default.mobileMenu__languageWrapper,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageMenu_default, { mobile: true })
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer_default, {
		anchor: "left",
		open: isOpen,
		onClose: toggleDrawer(false),
		classes: { paper: MobileMenu_module_default.drawer__paper },
		ModalProps: { keepMounted: true },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "presentation",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: MobileMenu_module_default.mobileMenu__header,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton_default, {
					onClick: toggleDrawer(false),
					"aria-label": t("aria.closeMenu"),
					className: MobileMenu_module_default.mobileMenu__hamburger,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close_default, {})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": t("aria.mainNavigation"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List_default, {
					className: MobileMenu_module_default.drawer__list,
					children: menuItems.map((item) => {
						const isActive = location.pathname === item.path;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleNavigation(item.path),
							onKeyDown: (e) => handleKeyDown(e, item.path),
							className: `${MobileMenu_module_default.drawer__item} ${isActive ? MobileMenu_module_default["drawer__item--active"] : ""}`,
							"aria-current": isActive ? "page" : void 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: MobileMenu_module_default.drawer__itemText,
								children: t(item.labelKey)
							})
						}, item.key);
					})
				})
			})]
		})
	})] });
};
var MobileMenu_default = MobileMenu;
var NavBar = (0, import_react.memo)(({ vertical = false }) => {
	const theme$1 = useTheme();
	const isMobile = useMediaQuery_default(theme$1.breakpoints.down("md"));
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	if (!mounted) return null;
	if (isMobile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileMenu_default, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopMenu_default, { vertical });
});
NavBar.displayName = "NavBar";
var NavBar_default = NavBar;
var JsonToCsvPage = (0, import_react.lazy)(() => __vitePreload(() => import("./JsonToCsvPage-FzhPmBTK.js"), __vite__mapDeps([0,1,2,3,4,5])));
var JsonToXmlPage = (0, import_react.lazy)(() => __vitePreload(() => import("./JsonToXmlPage-B4joefWi.js"), __vite__mapDeps([6,2,3])));
var BeautifyJsonPage = (0, import_react.lazy)(() => __vitePreload(() => import("./BeautifyJsonPage-B2307-PZ.js"), __vite__mapDeps([7,2,3])));
var ComparePage = (0, import_react.lazy)(() => __vitePreload(() => import("./ComparePage-CtnEj9g4.js"), __vite__mapDeps([8,2,3])));
var AboutPage = (0, import_react.lazy)(() => __vitePreload(() => import("./AboutPage-f5Z8Pd64.js"), __vite__mapDeps([9,2,3])));
var theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: themeConfig.PRIMARY_COLOR,
			dark: themeConfig.PRIMARY_DARK,
			light: themeConfig.PRIMARY_LIGHT
		},
		background: {
			default: "#ffffff",
			paper: "#ffffff"
		},
		text: {
			primary: "#000000",
			secondary: "rgba(0, 0, 0, 0.6)",
			disabled: "rgba(0, 0, 0, 0.38)"
		}
	},
	typography: { fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif" },
	breakpoints: { values: themeConfig.BREAKPOINTS },
	components: { MuiSwitch: { styleOverrides: { root: {
		"& .MuiSwitch-switchBase": {
			color: "#bdbdbd",
			"&.Mui-checked": {
				color: themeConfig.PRIMARY_COLOR,
				"& + .MuiSwitch-track": {
					backgroundColor: themeConfig.PRIMARY_COLOR,
					opacity: .5
				}
			}
		},
		"& .MuiSwitch-track": {
			backgroundColor: "#9e9e9e",
			opacity: .38
		}
	} } } }
});
var basename = "/json-to-anything/";
var PageLoader = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box_default, {
	sx: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "60vh"
	},
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress_default, { size: 48 })
});
function App() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, {
		theme,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CssBaseline_default, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowserRouter, {
			basename,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box_default, {
				sx: {
					display: "flex",
					flexDirection: "column",
					minHeight: "100vh",
					backgroundColor: "#ffffff"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBar_default, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoader, {}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Routes, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
							path: "/",
							element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonToCsvPage, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
							path: "/json-to-xml",
							element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonToXmlPage, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
							path: "/beautify",
							element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeautifyJsonPage, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
							path: "/compare",
							element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComparePage, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
							path: "/about",
							element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutPage, {})
						})
					] })
				})]
			})
		})]
	});
}
var App_default = App;
(0, import_client.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App_default, {}) }));
