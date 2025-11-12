import { n as __toESM } from "./rolldown-runtime-BM52pwkw.js";
import { F as Typography_default, N as Box_default, T as Link_default, U as require_jsx_runtime, j as Container_default } from "./mui-vendor-CE9s5qa2.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var AboutPage = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container_default, {
		maxWidth: "lg",
		sx: { py: 4 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box_default, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography_default, {
				variant: "h3",
				component: "h1",
				gutterBottom: true,
				children: "About JSON to Anything"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography_default, {
				variant: "body1",
				paragraph: true,
				children: "A simple, robust, and user-friendly web application for converting JSON data to various formats entirely in your browser."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography_default, {
				variant: "body1",
				paragraph: true,
				children: "All processing occurs directly in your browser—nothing is uploaded or stored on a server. The app is fully private and hosted on GitHub Pages, with no API calls made."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography_default, {
				variant: "body1",
				paragraph: true,
				children: [
					"Made with ❤️ by",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
						href: "https://github.com/pratiksinghlad",
						target: "_blank",
						rel: "noopener noreferrer",
						children: "Pratik Singh Lad"
					})
				]
			})
		] })
	});
};
var AboutPage_default = AboutPage;
export { AboutPage_default as default };
