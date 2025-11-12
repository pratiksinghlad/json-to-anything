import { n as __toESM } from "./rolldown-runtime-BM52pwkw.js";
import { D as FormControlLabel_default, E as InputLabel_default, F as Typography_default, G as require_react, I as Alert_default, L as IconButton_default, M as Button_default, N as Box_default, O as FormControl_default, P as Fade_default, S as MenuItem_default, T as Link_default, U as require_jsx_runtime, _ as Table_default, b as Snackbar_default, c as Download_default, f as TableRow_default, g as TableBody_default, h as TableCell_default, i as LinkedIn_default, j as Container_default, l as ContentCopy_default, m as TableContainer_default, n as OpenInNew_default, o as GitHub_default, p as TableHead_default, t as Twitter_default, v as Switch_default, x as Select_default, y as Stack_default, z as Paper_default } from "./mui-vendor-CE9s5qa2.js";
import { t as require_lib } from "./react-vendor-D6TQlta-.js";
import { t as require_prism } from "./prism-vendor-hkdziHBB.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var import_prism = /* @__PURE__ */ __toESM(require_prism());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var highlight = (code) => {
	return import_prism.default.highlight(code, import_prism.default.languages.json, "json");
};
function JsonEditor({ value, onChange, error }) {
	const lineCount = value.split("\n").length;
	const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join("\n");
	const lineNumbersRef = (0, import_react.useRef)(null);
	const lineNumbersScrollableRef = (0, import_react.useRef)(null);
	const editorContainerRef = (0, import_react.useRef)(null);
	const LINE_HEIGHT_MULTIPLIER = 1.4;
	const [lineHeightPx, setLineHeightPx] = (0, import_react.useState)(21);
	const [verticalPaddingPx, setVerticalPaddingPx] = (0, import_react.useState)(32);
	const lineNumbersHeight = lineCount * lineHeightPx + verticalPaddingPx;
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const measure = () => {
			const textarea = document.getElementById("json-editor");
			if (!textarea) return;
			const cs = getComputedStyle(textarea);
			const parsedLineHeight = parseFloat(cs.lineHeight || "");
			let measuredLineHeight = Number.isFinite(parsedLineHeight) && parsedLineHeight > 0 ? parsedLineHeight : NaN;
			if (Number.isNaN(measuredLineHeight)) {
				const parsedFontSize = parseFloat(cs.fontSize || "");
				measuredLineHeight = Number.isFinite(parsedFontSize) && parsedFontSize > 0 ? parsedFontSize * LINE_HEIGHT_MULTIPLIER : 21;
			}
			const paddingTop = parseFloat(cs.paddingTop || "") || 16;
			const paddingBottom = parseFloat(cs.paddingBottom || "") || 16;
			setLineHeightPx(measuredLineHeight);
			setVerticalPaddingPx(paddingTop + paddingBottom);
		};
		measure();
		const id = window.setTimeout(measure, 50);
		return () => window.clearTimeout(id);
	}, [value]);
	(0, import_react.useEffect)(() => {
		const editorContainer = editorContainerRef.current;
		const lineNumbersScrollable = lineNumbersScrollableRef.current;
		if (!editorContainer || !lineNumbersScrollable) return;
		const handleScroll = () => {
			lineNumbersScrollable.scrollTop = editorContainer.scrollTop;
		};
		editorContainer.addEventListener("scroll", handleScroll);
		return () => editorContainer.removeEventListener("scroll", handleScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box_default, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography_default, {
			variant: "h6",
			gutterBottom: true,
			sx: {
				color: "#000000",
				fontWeight: 500
			},
			children: "JSON Input"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper_default, {
			elevation: 0,
			sx: {
				border: error ? "2px solid #d32f2f" : "1px solid #d0d0d0",
				borderRadius: "8px",
				overflow: "hidden",
				position: "relative",
				height: {
					xs: "40vh",
					sm: "45vh",
					md: "50vh"
				},
				maxHeight: {
					xs: "40vh",
					sm: "45vh",
					md: "50vh"
				},
				minHeight: "250px",
				display: "flex",
				backgroundColor: "#ffffff"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box_default, {
				ref: lineNumbersScrollableRef,
				sx: {
					width: "50px",
					backgroundColor: "#f8f8f8",
					borderRight: "1px solid #e0e0e0",
					overflow: "auto",
					position: "relative",
					"&::-webkit-scrollbar": { display: "none" },
					scrollbarWidth: "none"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box_default, {
					ref: lineNumbersRef,
					sx: {
						padding: "16px 8px",
						textAlign: "right",
						color: "#757575",
						fontSize: 14,
						fontFamily: "\"Fira code\", \"Fira Mono\", monospace",
						userSelect: "none",
						lineHeight: `${lineHeightPx}px`,
						pointerEvents: "none",
						whiteSpace: "pre",
						height: `${lineNumbersHeight}px`
					},
					children: lineNumbers
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box_default, {
				ref: editorContainerRef,
				sx: {
					flex: 1,
					overflow: "auto",
					position: "relative"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lib.default, {
					value,
					onValueChange: onChange,
					highlight,
					padding: 16,
					style: {
						fontFamily: "\"Fira code\", \"Fira Mono\", monospace",
						fontSize: 14,
						minHeight: `${lineNumbersHeight}px`,
						backgroundColor: "#ffffff",
						lineHeight: `${lineHeightPx}px`,
						width: "100%"
					},
					textareaId: "json-editor",
					"aria-label": "JSON editor"
				})
			})]
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert_default, {
			severity: "error",
			sx: { mt: 1 },
			children: error
		})
	] });
}
function OptionsBar({ separator, includeHeader, trimEmptyColumns, pascalCaseHeaders, onSeparatorChange, onIncludeHeaderChange, onTrimEmptyColumnsChange, onPascalCaseHeadersChange }) {
	const handleSeparatorChange = (event) => {
		onSeparatorChange(event.target.value);
	};
	const getSeparatorLabel = (sep) => {
		switch (sep) {
			case ",": return "Comma (,)";
			case ";": return "Semicolon (;)";
			case "	": return "Tab";
			default: return sep;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper_default, {
		elevation: 0,
		sx: {
			p: 2.5,
			mb: 2,
			border: "2px solid #e0e0e0",
			borderRadius: "8px",
			backgroundColor: "#ffffff"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack_default, {
			direction: {
				xs: "column",
				sm: "row"
			},
			spacing: 3,
			alignItems: "center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormControl_default, {
					size: "small",
					sx: {
						minWidth: 150,
						"& .MuiOutlinedInput-root": {
							backgroundColor: "#ffffff",
							"& fieldset": { borderColor: "#d0d0d0" },
							"&:hover fieldset": { borderColor: "#1976d2" },
							"&.Mui-focused fieldset": { borderColor: "#1976d2" }
						}
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputLabel_default, {
						id: "separator-label",
						children: "Separator"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select_default, {
						labelId: "separator-label",
						id: "separator-select",
						value: separator,
						label: "Separator",
						onChange: handleSeparatorChange,
						"aria-label": "CSV separator",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem_default, {
								value: ",",
								children: getSeparatorLabel(",")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem_default, {
								value: ";",
								children: getSeparatorLabel(";")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem_default, {
								value: "\\t",
								children: getSeparatorLabel("	")
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControlLabel_default, {
					control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch_default, {
						checked: includeHeader,
						onChange: (e) => onIncludeHeaderChange(e.target.checked),
						"aria-label": "Include header row"
					}),
					label: "Include header",
					sx: { "& .MuiFormControlLabel-label": {
						color: "#000000",
						fontSize: "0.875rem"
					} }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControlLabel_default, {
					control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch_default, {
						checked: trimEmptyColumns,
						onChange: (e) => onTrimEmptyColumnsChange(e.target.checked),
						"aria-label": "Trim empty columns"
					}),
					label: "Trim empty columns",
					sx: { "& .MuiFormControlLabel-label": {
						color: "#000000",
						fontSize: "0.875rem"
					} }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControlLabel_default, {
					control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch_default, {
						checked: pascalCaseHeaders,
						onChange: (e) => onPascalCaseHeadersChange(e.target.checked),
						"aria-label": "Convert headers to Pascal case"
					}),
					label: "Pascal case headers",
					sx: { "& .MuiFormControlLabel-label": {
						color: "#000000",
						fontSize: "0.875rem"
					} }
				})
			]
		})
	});
}
function flattenObject(obj, prefix = "", result = {}) {
	for (const key in obj) {
		if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
		const value = obj[key];
		const newKey = prefix ? `${prefix}.${key}` : key;
		if (value === null || value === void 0) result[newKey] = value;
		else if (Array.isArray(value)) result[newKey] = JSON.stringify(value);
		else if (typeof value === "object" && value.constructor === Object) flattenObject(value, newKey, result);
		else result[newKey] = value;
	}
	return result;
}
function getAllKeys(data) {
	const keysSet = /* @__PURE__ */ new Set();
	for (const obj of data) {
		const flattened = flattenObject(obj);
		for (const key in flattened) if (Object.prototype.hasOwnProperty.call(flattened, key)) keysSet.add(key);
	}
	return Array.from(keysSet).sort();
}
function toPascalCase(str) {
	return str.split(/[._-\s]+/).filter((word) => word.length > 0).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
}
function escapeCsvCell(value, separator) {
	if (value === null || value === void 0) return "";
	const stringValue = String(value);
	if (stringValue.includes(separator) || stringValue.includes("\"") || stringValue.includes("\n") || stringValue.includes("\r")) return `"${stringValue.replace(/"/g, "\"\"")}"`;
	return stringValue;
}
function jsonToCsv(data, options) {
	if (data.length === 0) return "";
	const { separator, includeHeader, trimEmptyColumns, pascalCaseHeaders } = options;
	let columns = getAllKeys(data);
	if (trimEmptyColumns) columns = columns.filter((col) => {
		return data.some((row) => {
			const value = flattenObject(row)[col];
			return value !== null && value !== void 0 && value !== "";
		});
	});
	const lines = [];
	if (includeHeader) {
		const headerRow = columns.map((col) => {
			const headerValue = pascalCaseHeaders ? toPascalCase(col) : col;
			return escapeCsvCell(headerValue, separator);
		}).join(separator);
		lines.push(headerRow);
	}
	for (const obj of data) {
		const flattened = flattenObject(obj);
		const row = columns.map((col) => escapeCsvCell(flattened[col], separator)).join(separator);
		lines.push(row);
	}
	return lines.join("\n");
}
function PreviewTable({ data, maxRows = 50, pascalCaseHeaders = false }) {
	if (data.length === 0) return null;
	const columns = getAllKeys(data);
	const displayData = data.slice(0, maxRows);
	const hasMore = data.length > maxRows;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fade_default, {
		in: true,
		timeout: 500,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography_default, {
			variant: "h6",
			gutterBottom: true,
			sx: {
				color: "#000000",
				fontWeight: 500
			},
			children: ["Preview ", hasMore && `(showing ${maxRows} of ${data.length} rows)`]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableContainer_default, {
			component: Paper_default,
			elevation: 0,
			sx: {
				maxHeight: 500,
				border: "1px solid #d0d0d0",
				borderRadius: "8px",
				backgroundColor: "#ffffff"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table_default, {
				stickyHeader: true,
				size: "small",
				"aria-label": "CSV preview table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow_default, { children: columns.map((column) => {
					const displayHeader = pascalCaseHeaders ? toPascalCase(column) : column;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell_default, {
						sx: {
							fontWeight: 600,
							backgroundColor: "#f5f5f5",
							whiteSpace: "nowrap",
							borderRight: "1px solid #e0e0e0",
							borderBottom: "2px solid #d0d0d0",
							color: "#000000",
							fontSize: "0.875rem",
							"&:last-child": { borderRight: "none" }
						},
						children: displayHeader
					}, column);
				}) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody_default, { children: displayData.map((row, index) => {
					const flattened = flattenObject(row);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow_default, {
						hover: true,
						sx: { "&:hover": { backgroundColor: "#f9f9f9" } },
						children: columns.map((column) => {
							const value = flattened[column];
							const displayValue = value === null || value === void 0 ? "" : String(value);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell_default, {
								sx: {
									maxWidth: 300,
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
									borderRight: "1px solid #e0e0e0",
									borderBottom: "1px solid #e0e0e0",
									color: "#000000",
									fontSize: "0.8125rem",
									"&:last-child": { borderRight: "none" }
								},
								children: displayValue
							}, column);
						})
					}, index);
				}) })]
			})
		})] })
	});
}
const interactiveHoverSx = {
	color: "rgba(0,0,0,0.6)",
	transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out",
	"&:hover": {
		color: "primary.main",
		backgroundColor: "transparent"
	}
};
const primaryContainedButtonSx = {
	backgroundColor: "primary.main",
	color: "#ffffff",
	"&:hover": { backgroundColor: "primary.dark" },
	"&:disabled": {
		backgroundColor: "#e0e0e0",
		color: "rgba(0, 0, 0, 0.26)"
	}
};
const primaryOutlinedButtonSx = {
	borderColor: "primary.main",
	color: "primary.main",
	"&:hover": {
		borderColor: "primary.dark",
		backgroundColor: "rgba(25, 118, 210, 0.04)"
	},
	"&:disabled": {
		borderColor: "#e0e0e0",
		color: "rgba(0, 0, 0, 0.26)"
	}
};
const textAccentButtonSx = {
	color: "primary.main",
	"&:hover": { backgroundColor: "rgba(25, 118, 210, 0.04)" },
	"&:disabled": { color: "rgba(0, 0, 0, 0.26)" }
};
function DownloadButtons({ csvData, jsonData, disabled = false }) {
	const [snackbarOpen, setSnackbarOpen] = (0, import_react.useState)(false);
	const [snackbarMessage, setSnackbarMessage] = (0, import_react.useState)("");
	const showSnackbar = (message) => {
		setSnackbarMessage(message);
		setSnackbarOpen(true);
	};
	const downloadFile = (content, filename, mimeType) => {
		const blob = new Blob([content], { type: mimeType });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};
	const getTimestamp = () => {
		const now = /* @__PURE__ */ new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, "0");
		const day = String(now.getDate()).padStart(2, "0");
		const hours = String(now.getHours()).padStart(2, "0");
		const minutes = String(now.getMinutes()).padStart(2, "0");
		const seconds = String(now.getSeconds()).padStart(2, "0");
		return `${year}${month}${day}-${hours}${minutes}${seconds}`;
	};
	const handleDownloadCsv = () => {
		const filename = `data-${getTimestamp()}.csv`;
		downloadFile(csvData, filename, "text/csv;charset=utf-8;");
		showSnackbar("CSV downloaded successfully");
	};
	const handleDownloadJson = () => {
		const filename = `data-${getTimestamp()}.json`;
		downloadFile(jsonData, filename, "application/json");
		showSnackbar("JSON downloaded successfully");
	};
	const handleCopyCsv = async () => {
		try {
			await navigator.clipboard.writeText(csvData);
			showSnackbar("CSV copied to clipboard");
		} catch {
			showSnackbar("Failed to copy to clipboard");
		}
	};
	const handleShowRawData = () => {
		const blob = new Blob([csvData], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		window.open(url, "_blank");
		setTimeout(() => {
			URL.revokeObjectURL(url);
		}, 100);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack_default, {
		direction: {
			xs: "column",
			sm: "row"
		},
		spacing: 2,
		sx: { mb: 3 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button_default, {
				variant: "contained",
				startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download_default, {}),
				onClick: handleDownloadCsv,
				disabled,
				"aria-label": "Download CSV file",
				sx: primaryContainedButtonSx,
				children: "Download CSV"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button_default, {
				variant: "outlined",
				startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download_default, {}),
				onClick: handleDownloadJson,
				disabled,
				"aria-label": "Download JSON file",
				sx: primaryOutlinedButtonSx,
				children: "Download JSON"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button_default, {
				variant: "outlined",
				startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentCopy_default, {}),
				onClick: handleCopyCsv,
				disabled,
				"aria-label": "Copy CSV to clipboard",
				sx: primaryOutlinedButtonSx,
				children: "Copy CSV"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button_default, {
				variant: "text",
				startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenInNew_default, {}),
				onClick: handleShowRawData,
				disabled,
				"aria-label": "Show raw CSV data in new tab",
				sx: textAccentButtonSx,
				children: "Show raw data"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snackbar_default, {
		open: snackbarOpen,
		autoHideDuration: 3e3,
		onClose: () => setSnackbarOpen(false),
		anchorOrigin: {
			vertical: "bottom",
			horizontal: "center"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert_default, {
			onClose: () => setSnackbarOpen(false),
			severity: "success",
			variant: "filled",
			children: snackbarMessage
		})
	})] });
}
function Footer() {
	const userName = "pratiksinghlad";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box_default, {
		component: "footer",
		sx: {
			mt: "auto",
			py: 3,
			px: 2,
			backgroundColor: "#f5f5f5",
			borderTop: "3px solid #e0e0e0"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container_default, {
			maxWidth: "lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack_default, {
				spacing: 2,
				alignItems: "center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography_default, {
						variant: "body2",
						color: "text.secondary",
						align: "center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Privacy & open source." }),
							" All conversion happens in your browser — nothing is uploaded or stored on a server. The full source code is available on",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
								href: `https://github.com/${userName}/json-to-anything`,
								target: "_blank",
								rel: "noopener noreferrer",
								children: "GitHub"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack_default, {
						direction: "row",
						spacing: 1,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton_default, {
								href: `https://github.com/${userName}`,
								target: "_blank",
								rel: "noopener noreferrer",
								"aria-label": "View source on GitHub",
								size: "small",
								sx: interactiveHoverSx,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitHub_default, { sx: { color: "inherit" } })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton_default, {
								href: `https://x.com/${userName}`,
								target: "_blank",
								rel: "noopener noreferrer",
								"aria-label": "Follow on Twitter",
								size: "small",
								sx: interactiveHoverSx,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Twitter_default, { sx: { color: "inherit" } })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton_default, {
								href: `https://www.linkedin.com/in/${userName}/`,
								target: "_blank",
								rel: "noopener noreferrer",
								"aria-label": "Connect on LinkedIn",
								size: "small",
								sx: interactiveHoverSx,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedIn_default, { sx: { color: "inherit" } })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography_default, {
						variant: "body2",
						color: "text.secondary",
						align: "center",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" JSON to Anything. Made with ❤️ for all."
						]
					})
				]
			})
		})
	});
}
function parseJson(input) {
	try {
		if (!input.trim()) return {
			success: false,
			error: "Input is empty"
		};
		return {
			success: true,
			data: JSON.parse(input)
		};
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Invalid JSON"
		};
	}
}
function normalizeData(input) {
	if (Array.isArray(input)) {
		if (input.length === 0) return {
			success: false,
			error: "Array is empty"
		};
		if (!input.every((item) => typeof item === "object" && item !== null && !Array.isArray(item))) return {
			success: false,
			error: "Array must contain only objects"
		};
		return {
			success: true,
			data: input
		};
	}
	if (typeof input === "object" && input !== null && !Array.isArray(input)) {
		const obj = input;
		if ("data" in obj && Array.isArray(obj.data)) {
			if (obj.data.length === 0) return {
				success: false,
				error: "Data array is empty"
			};
			if (!obj.data.every((item) => typeof item === "object" && item !== null && !Array.isArray(item))) return {
				success: false,
				error: "Data array must contain only objects"
			};
			return {
				success: true,
				data: obj.data
			};
		}
		return {
			success: true,
			data: [obj]
		};
	}
	return {
		success: false,
		error: "Input must be an array of objects, a single object, or an object with a \"data\" array property"
	};
}
var DEFAULT_JSON = `[
  {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "profile": {
      "role": "engineer",
      "joined": "2023-04-12T08:00:00Z"
    },
    "tags": ["frontend", "react"]
  },
  {
    "id": 2,
    "name": "Bob",
    "email": "bob@example.com",
    "profile": {
      "role": "designer"
    },
    "tags": []
  }
]`;
var JsonToCsvPage = () => {
	const [jsonInput, setJsonInput] = (0, import_react.useState)(DEFAULT_JSON);
	const [error, setError] = (0, import_react.useState)();
	const [normalizedData, setNormalizedData] = (0, import_react.useState)([]);
	const [csvData, setCsvData] = (0, import_react.useState)("");
	const [separator, setSeparator] = (0, import_react.useState)(",");
	const [includeHeader, setIncludeHeader] = (0, import_react.useState)(true);
	const [trimEmptyColumns, setTrimEmptyColumns] = (0, import_react.useState)(false);
	const [pascalCaseHeaders, setPascalCaseHeaders] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const parseResult = parseJson(jsonInput);
		if (!parseResult.success) {
			setError(parseResult.error);
			setNormalizedData([]);
			setCsvData("");
			return;
		}
		const normalizeResult = normalizeData(parseResult.data);
		if (!normalizeResult.success) {
			setError(normalizeResult.error);
			setNormalizedData([]);
			setCsvData("");
			return;
		}
		setError(void 0);
		setNormalizedData(normalizeResult.data || []);
		const options = {
			separator,
			includeHeader,
			trimEmptyColumns,
			pascalCaseHeaders
		};
		const csv = jsonToCsv(normalizeResult.data || [], options);
		setCsvData(csv);
	}, [
		jsonInput,
		separator,
		includeHeader,
		trimEmptyColumns,
		pascalCaseHeaders
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container_default, {
		maxWidth: "lg",
		sx: {
			py: 4,
			flex: 1,
			backgroundColor: "#ffffff"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography_default, {
				variant: "h3",
				component: "h1",
				gutterBottom: true,
				align: "center",
				sx: {
					color: "#000000",
					fontWeight: 600
				},
				children: "JSON to CSV Converter"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography_default, {
				variant: "subtitle1",
				gutterBottom: true,
				align: "center",
				sx: {
					mb: 4,
					color: "rgba(0, 0, 0, 0.6)"
				},
				children: "Convert JSON data to CSV format instantly in your browser"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box_default, {
				sx: { mb: 4 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonEditor, {
					value: jsonInput,
					onChange: setJsonInput,
					error
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionsBar, {
				separator,
				includeHeader,
				trimEmptyColumns,
				pascalCaseHeaders,
				onSeparatorChange: setSeparator,
				onIncludeHeaderChange: setIncludeHeader,
				onTrimEmptyColumnsChange: setTrimEmptyColumns,
				onPascalCaseHeadersChange: setPascalCaseHeaders
			}),
			normalizedData.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadButtons, {
				csvData,
				jsonData: jsonInput,
				disabled: normalizedData.length === 0
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewTable, {
				data: normalizedData,
				pascalCaseHeaders
			})] })
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})] });
};
var JsonToCsvPage_default = JsonToCsvPage;
export { JsonToCsvPage_default as default };
