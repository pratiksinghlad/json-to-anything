import { n as __toESM, t as __commonJSMin } from "./rolldown-runtime-BM52pwkw.js";
var require_react_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE$2 = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE$2 = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE$2 = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE$1 = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE$1 = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE$1 = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE$1 = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE$1 = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE$1 = Symbol.for("react.suspense"), REACT_MEMO_TYPE$1 = Symbol.for("react.memo"), REACT_LAZY_TYPE$1 = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, assign$1 = Object.assign, emptyObject = {};
	function Component(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function(partialState, callback) {
		if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function(callback) {
		this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	assign$1(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = !0;
	var isArrayImpl = Array.isArray;
	function noop$5() {}
	var ReactSharedInternals$1 = {
		H: null,
		A: null,
		T: null,
		S: null
	}, hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, props) {
		var refProp = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE$2,
			type,
			key,
			ref: void 0 !== refProp ? refProp : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, oldElement.props);
	}
	function isValidElement$1(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE$2;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match$1) {
			return escaperLookup[match$1];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop$5, noop$5) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE$2:
				case REACT_PORTAL_TYPE$2:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE$1: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c$1) {
			return c$1;
		})) : null != callback && (isValidElement$1(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result;
			ctor = ctor();
			ctor.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
			});
			-1 === payload._status && (payload._status = 0, payload._result = ctor);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof process && "function" === typeof process.emit) {
			process.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	}, Children$1 = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n$1 = 0;
			mapChildren(children, function() {
				n$1++;
			});
			return n$1;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement$1(children)) throw Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
	};
	exports.Activity = REACT_ACTIVITY_TYPE;
	exports.Children = Children$1;
	exports.Component = Component;
	exports.Fragment = REACT_FRAGMENT_TYPE$2;
	exports.Profiler = REACT_PROFILER_TYPE$1;
	exports.PureComponent = PureComponent;
	exports.StrictMode = REACT_STRICT_MODE_TYPE$1;
	exports.Suspense = REACT_SUSPENSE_TYPE$1;
	exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals$1;
	exports.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(size) {
			return ReactSharedInternals$1.H.useMemoCache(size);
		}
	};
	exports.cache = function(fn) {
		return function() {
			return fn.apply(null, arguments);
		};
	};
	exports.cacheSignal = function() {
		return null;
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
		var props = assign$1({}, element.props), key = element.key;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, props);
	};
	exports.createContext = function(defaultValue) {
		defaultValue = {
			$$typeof: REACT_CONTEXT_TYPE$1,
			_currentValue: defaultValue,
			_currentValue2: defaultValue,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		};
		defaultValue.Provider = defaultValue;
		defaultValue.Consumer = {
			$$typeof: REACT_CONSUMER_TYPE$1,
			_context: defaultValue
		};
		return defaultValue;
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE$1,
			render
		};
	};
	exports.isValidElement = isValidElement$1;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE$1,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE$1,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.startTransition = function(scope) {
		var prevTransition = ReactSharedInternals$1.T, currentTransition = {};
		ReactSharedInternals$1.T = currentTransition;
		try {
			var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals$1.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop$5, reportGlobalError);
		} catch (error) {
			reportGlobalError(error);
		} finally {
			null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals$1.T = prevTransition;
		}
	};
	exports.unstable_useCacheRefresh = function() {
		return ReactSharedInternals$1.H.useCacheRefresh();
	};
	exports.use = function(usable) {
		return ReactSharedInternals$1.H.use(usable);
	};
	exports.useActionState = function(action, initialState, permalink) {
		return ReactSharedInternals$1.H.useActionState(action, initialState, permalink);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals$1.H.useCallback(callback, deps);
	};
	exports.useContext = function(Context) {
		return ReactSharedInternals$1.H.useContext(Context);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(value, initialValue) {
		return ReactSharedInternals$1.H.useDeferredValue(value, initialValue);
	};
	exports.useEffect = function(create, deps) {
		return ReactSharedInternals$1.H.useEffect(create, deps);
	};
	exports.useEffectEvent = function(callback) {
		return ReactSharedInternals$1.H.useEffectEvent(callback);
	};
	exports.useId = function() {
		return ReactSharedInternals$1.H.useId();
	};
	exports.useImperativeHandle = function(ref, create, deps) {
		return ReactSharedInternals$1.H.useImperativeHandle(ref, create, deps);
	};
	exports.useInsertionEffect = function(create, deps) {
		return ReactSharedInternals$1.H.useInsertionEffect(create, deps);
	};
	exports.useLayoutEffect = function(create, deps) {
		return ReactSharedInternals$1.H.useLayoutEffect(create, deps);
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals$1.H.useMemo(create, deps);
	};
	exports.useOptimistic = function(passthrough, reducer) {
		return ReactSharedInternals$1.H.useOptimistic(passthrough, reducer);
	};
	exports.useReducer = function(reducer, initialArg, init) {
		return ReactSharedInternals$1.H.useReducer(reducer, initialArg, init);
	};
	exports.useRef = function(initialValue) {
		return ReactSharedInternals$1.H.useRef(initialValue);
	};
	exports.useState = function(initialState) {
		return ReactSharedInternals$1.H.useState(initialState);
	};
	exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
		return ReactSharedInternals$1.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	};
	exports.useTransition = function() {
		return ReactSharedInternals$1.H.useTransition();
	};
	exports.version = "19.2.0";
}));
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_production();
}));
var require_react_dom_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React$3 = require_react();
	function formatProdErrorMessage(code) {
		var url = "https://react.dev/errors/" + code;
		if (1 < arguments.length) {
			url += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var i = 2; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
		}
		return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function noop$4() {}
	var Internals = {
		d: {
			f: noop$4,
			r: function() {
				throw Error(formatProdErrorMessage(522));
			},
			D: noop$4,
			C: noop$4,
			L: noop$4,
			m: noop$4,
			X: noop$4,
			S: noop$4,
			M: noop$4
		},
		p: 0,
		findDOMNode: null
	}, REACT_PORTAL_TYPE$1 = Symbol.for("react.portal");
	function createPortal$1(children, containerInfo, implementation) {
		var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
		return {
			$$typeof: REACT_PORTAL_TYPE$1,
			key: null == key ? null : "" + key,
			children,
			containerInfo,
			implementation
		};
	}
	var ReactSharedInternals = React$3.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function getCrossOriginStringAs(as, input) {
		if ("font" === as) return "";
		if ("string" === typeof input) return "use-credentials" === input ? input : "";
	}
	exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
	exports.createPortal = function(children, container) {
		var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
		if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType) throw Error(formatProdErrorMessage(299));
		return createPortal$1(children, container, null, key);
	};
	exports.flushSync = function(fn) {
		var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
		try {
			if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
		} finally {
			ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
		}
	};
	exports.preconnect = function(href, options) {
		"string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
	};
	exports.prefetchDNS = function(href) {
		"string" === typeof href && Internals.d.D(href);
	};
	exports.preinit = function(href, options) {
		if ("string" === typeof href && options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
			"style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
				crossOrigin,
				integrity,
				fetchPriority
			}) : "script" === as && Internals.d.X(href, {
				crossOrigin,
				integrity,
				fetchPriority,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0
			});
		}
	};
	exports.preinitModule = function(href, options) {
		if ("string" === typeof href) if ("object" === typeof options && null !== options) {
			if (null == options.as || "script" === options.as) {
				var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
				Internals.d.M(href, {
					crossOrigin,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0
				});
			}
		} else options ?? Internals.d.M(href);
	};
	exports.preload = function(href, options) {
		if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
			Internals.d.L(href, as, {
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0,
				type: "string" === typeof options.type ? options.type : void 0,
				fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
				referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
				imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
				imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
				media: "string" === typeof options.media ? options.media : void 0
			});
		}
	};
	exports.preloadModule = function(href, options) {
		if ("string" === typeof href) if (options) {
			var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
			Internals.d.m(href, {
				as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0
			});
		} else Internals.d.m(href);
	};
	exports.requestFormReset = function(form) {
		Internals.d.r(form);
	};
	exports.unstable_batchedUpdates = function(fn, a) {
		return fn(a);
	};
	exports.useFormState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useFormState(action, initialState, permalink);
	};
	exports.useFormStatus = function() {
		return ReactSharedInternals.H.useHostTransitionStatus();
	};
	exports.version = "19.2.0";
}));
var require_react_dom = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function checkDCE() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") return;
		try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
		} catch (err) {
			console.error(err);
		}
	}
	checkDCE();
	module.exports = require_react_dom_production();
}));
var common_default = {
	black: "#000",
	white: "#fff"
};
var red_default = {
	50: "#ffebee",
	100: "#ffcdd2",
	200: "#ef9a9a",
	300: "#e57373",
	400: "#ef5350",
	500: "#f44336",
	600: "#e53935",
	700: "#d32f2f",
	800: "#c62828",
	900: "#b71c1c",
	A100: "#ff8a80",
	A200: "#ff5252",
	A400: "#ff1744",
	A700: "#d50000"
};
var purple_default = {
	50: "#f3e5f5",
	100: "#e1bee7",
	200: "#ce93d8",
	300: "#ba68c8",
	400: "#ab47bc",
	500: "#9c27b0",
	600: "#8e24aa",
	700: "#7b1fa2",
	800: "#6a1b9a",
	900: "#4a148c",
	A100: "#ea80fc",
	A200: "#e040fb",
	A400: "#d500f9",
	A700: "#aa00ff"
};
var blue_default = {
	50: "#e3f2fd",
	100: "#bbdefb",
	200: "#90caf9",
	300: "#64b5f6",
	400: "#42a5f5",
	500: "#2196f3",
	600: "#1e88e5",
	700: "#1976d2",
	800: "#1565c0",
	900: "#0d47a1",
	A100: "#82b1ff",
	A200: "#448aff",
	A400: "#2979ff",
	A700: "#2962ff"
};
var lightBlue_default = {
	50: "#e1f5fe",
	100: "#b3e5fc",
	200: "#81d4fa",
	300: "#4fc3f7",
	400: "#29b6f6",
	500: "#03a9f4",
	600: "#039be5",
	700: "#0288d1",
	800: "#0277bd",
	900: "#01579b",
	A100: "#80d8ff",
	A200: "#40c4ff",
	A400: "#00b0ff",
	A700: "#0091ea"
};
var green_default = {
	50: "#e8f5e9",
	100: "#c8e6c9",
	200: "#a5d6a7",
	300: "#81c784",
	400: "#66bb6a",
	500: "#4caf50",
	600: "#43a047",
	700: "#388e3c",
	800: "#2e7d32",
	900: "#1b5e20",
	A100: "#b9f6ca",
	A200: "#69f0ae",
	A400: "#00e676",
	A700: "#00c853"
};
var orange_default = {
	50: "#fff3e0",
	100: "#ffe0b2",
	200: "#ffcc80",
	300: "#ffb74d",
	400: "#ffa726",
	500: "#ff9800",
	600: "#fb8c00",
	700: "#f57c00",
	800: "#ef6c00",
	900: "#e65100",
	A100: "#ffd180",
	A200: "#ffab40",
	A400: "#ff9100",
	A700: "#ff6d00"
};
var grey_default = {
	50: "#fafafa",
	100: "#f5f5f5",
	200: "#eeeeee",
	300: "#e0e0e0",
	400: "#bdbdbd",
	500: "#9e9e9e",
	600: "#757575",
	700: "#616161",
	800: "#424242",
	900: "#212121",
	A100: "#f5f5f5",
	A200: "#eeeeee",
	A400: "#bdbdbd",
	A700: "#616161"
};
function formatMuiErrorMessage(code, ...args) {
	const url = new URL(`https://mui.com/production-error/?code=${code}`);
	args.forEach((arg$1) => url.searchParams.append("args[]", arg$1));
	return `Minified MUI error #${code}; visit ${url} for the full message.`;
}
var identifier_default = "$$material";
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n$1) {
		for (var e$1 = 1; e$1 < arguments.length; e$1++) {
			var t$1 = arguments[e$1];
			for (var r$2 in t$1) ({}).hasOwnProperty.call(t$1, r$2) && (n$1[r$2] = t$1[r$2]);
		}
		return n$1;
	}, _extends.apply(null, arguments);
}
var isDevelopment$3 = false;
function sheetForTag(tag) {
	if (tag.sheet) return tag.sheet;
	/* istanbul ignore next */
	for (var i = 0; i < document.styleSheets.length; i++) if (document.styleSheets[i].ownerNode === tag) return document.styleSheets[i];
}
function createStyleElement(options) {
	var tag = document.createElement("style");
	tag.setAttribute("data-emotion", options.key);
	if (options.nonce !== void 0) tag.setAttribute("nonce", options.nonce);
	tag.appendChild(document.createTextNode(""));
	tag.setAttribute("data-s", "");
	return tag;
}
var StyleSheet = /* @__PURE__ */ function() {
	function StyleSheet$1(options) {
		var _this = this;
		this._insertTag = function(tag) {
			var before;
			if (_this.tags.length === 0) if (_this.insertionPoint) before = _this.insertionPoint.nextSibling;
			else if (_this.prepend) before = _this.container.firstChild;
			else before = _this.before;
			else before = _this.tags[_this.tags.length - 1].nextSibling;
			_this.container.insertBefore(tag, before);
			_this.tags.push(tag);
		};
		this.isSpeedy = options.speedy === void 0 ? !isDevelopment$3 : options.speedy;
		this.tags = [];
		this.ctr = 0;
		this.nonce = options.nonce;
		this.key = options.key;
		this.container = options.container;
		this.prepend = options.prepend;
		this.insertionPoint = options.insertionPoint;
		this.before = null;
	}
	var _proto = StyleSheet$1.prototype;
	_proto.hydrate = function hydrate(nodes) {
		nodes.forEach(this._insertTag);
	};
	_proto.insert = function insert(rule) {
		if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) this._insertTag(createStyleElement(this));
		var tag = this.tags[this.tags.length - 1];
		if (this.isSpeedy) {
			var sheet = sheetForTag(tag);
			try {
				sheet.insertRule(rule, sheet.cssRules.length);
			} catch (e$1) {}
		} else tag.appendChild(document.createTextNode(rule));
		this.ctr++;
	};
	_proto.flush = function flush() {
		this.tags.forEach(function(tag) {
			var _tag$parentNode;
			return (_tag$parentNode = tag.parentNode) == null ? void 0 : _tag$parentNode.removeChild(tag);
		});
		this.tags = [];
		this.ctr = 0;
	};
	return StyleSheet$1;
}();
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length$1) {
	return charat(value, 0) ^ 45 ? (((length$1 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
	return value.trim();
}
function match(value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
	return value.replace(pattern, replacement);
}
function indexof(value, search) {
	return value.indexOf(search);
}
function charat(value, index) {
	return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
	return value.slice(begin, end);
}
function strlen(value) {
	return value.length;
}
function sizeof(value) {
	return value.length;
}
function append(value, array) {
	return array.push(value), value;
}
function combine(array, callback) {
	return array.map(callback).join("");
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length$1) {
	return {
		value,
		root,
		parent,
		type,
		props,
		children,
		line,
		column,
		length: length$1,
		return: ""
	};
}
function copy(root, props) {
	return assign(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
function char() {
	return character;
}
function prev() {
	character = position > 0 ? charat(characters, --position) : 0;
	if (column--, character === 10) column = 1, line--;
	return character;
}
function next() {
	character = position < length ? charat(characters, position++) : 0;
	if (column++, character === 10) column = 1, line++;
	return character;
}
function peek() {
	return charat(characters, position);
}
function caret() {
	return position;
}
function slice(begin, end) {
	return substr(characters, begin, end);
}
function token(type) {
	switch (type) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
function alloc(value) {
	return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
	return characters = "", value;
}
function delimit(type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
	while (character = peek()) if (character < 33) next();
	else break;
	return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
	while (--count && next()) if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97) break;
	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
	while (next()) switch (character) {
		case type: return position;
		case 34:
		case 39:
			if (type !== 34 && type !== 39) delimiter(character);
			break;
		case 40:
			if (type === 41) delimiter(type);
			break;
		case 92:
			next();
			break;
	}
	return position;
}
function commenter(type, index) {
	while (next()) if (type + character === 57) break;
	else if (type + character === 84 && peek() === 47) break;
	return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
	while (!token(peek())) next();
	return slice(index, position);
}
function compile(value) {
	return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0;
	var offset = 0;
	var length$1 = pseudo;
	var atrule = 0;
	var property = 0;
	var previous = 0;
	var variable = 1;
	var scanning = 1;
	var ampersand = 1;
	var character$1 = 0;
	var type = "";
	var props = rules;
	var children = rulesets;
	var reference = rule;
	var characters$1 = type;
	while (scanning) switch (previous = character$1, character$1 = next()) {
		case 40: if (previous != 108 && charat(characters$1, length$1 - 1) == 58) {
			if (indexof(characters$1 += replace(delimit(character$1), "&", "&\f"), "&\f") != -1) ampersand = -1;
			break;
		}
		case 34:
		case 39:
		case 91:
			characters$1 += delimit(character$1);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			characters$1 += whitespace(previous);
			break;
		case 92:
			characters$1 += escaping(caret() - 1, 7);
			continue;
		case 47:
			switch (peek()) {
				case 42:
				case 47:
					append(comment(commenter(next(), caret()), root, parent), declarations);
					break;
				default: characters$1 += "/";
			}
			break;
		case 123 * variable: points[index++] = strlen(characters$1) * ampersand;
		case 125 * variable:
		case 59:
		case 0:
			switch (character$1) {
				case 0:
				case 125: scanning = 0;
				case 59 + offset:
					if (ampersand == -1) characters$1 = replace(characters$1, /\f/g, "");
					if (property > 0 && strlen(characters$1) - length$1) append(property > 32 ? declaration(characters$1 + ";", rule, parent, length$1 - 1) : declaration(replace(characters$1, " ", "") + ";", rule, parent, length$1 - 2), declarations);
					break;
				case 59: characters$1 += ";";
				default:
					append(reference = ruleset(characters$1, root, parent, index, offset, rules, points, type, props = [], children = [], length$1), rulesets);
					if (character$1 === 123) if (offset === 0) parse(characters$1, root, reference, reference, props, rulesets, length$1, points, children);
					else switch (atrule === 99 && charat(characters$1, 3) === 110 ? 100 : atrule) {
						case 100:
						case 108:
						case 109:
						case 115:
							parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length$1), children), rules, children, length$1, points, rule ? props : children);
							break;
						default: parse(characters$1, reference, reference, reference, [""], children, 0, points, children);
					}
			}
			index = offset = property = 0, variable = ampersand = 1, type = characters$1 = "", length$1 = pseudo;
			break;
		case 58: length$1 = 1 + strlen(characters$1), property = previous;
		default:
			if (variable < 1) {
				if (character$1 == 123) --variable;
				else if (character$1 == 125 && variable++ == 0 && prev() == 125) continue;
			}
			switch (characters$1 += from(character$1), character$1 * variable) {
				case 38:
					ampersand = offset > 0 ? 1 : (characters$1 += "\f", -1);
					break;
				case 44:
					points[index++] = (strlen(characters$1) - 1) * ampersand, ampersand = 1;
					break;
				case 64:
					if (peek() === 45) characters$1 += delimit(next());
					atrule = peek(), offset = length$1 = strlen(type = characters$1 += identifier(caret())), character$1++;
					break;
				case 45: if (previous === 45 && strlen(characters$1) == 2) variable = 0;
			}
	}
	return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length$1) {
	var post = offset - 1;
	var rule = offset === 0 ? rules : [""];
	var size = sizeof(rule);
	for (var i = 0, j = 0, k$1 = 0; i < index; ++i) for (var x$1 = 0, y$1 = substr(value, post + 1, post = abs(j = points[i])), z$1 = value; x$1 < size; ++x$1) if (z$1 = trim(j > 0 ? rule[x$1] + " " + y$1 : replace(y$1, /&\f/g, rule[x$1]))) props[k$1++] = z$1;
	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length$1);
}
function comment(value, root, parent) {
	return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length$1) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length$1), substr(value, length$1 + 1, -1), length$1);
}
function serialize(children, callback) {
	var output = "";
	var length$1 = sizeof(children);
	for (var i = 0; i < length$1; i++) output += callback(children[i], i, children, callback) || "";
	return output;
}
function stringify(element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break;
		case IMPORT:
		case DECLARATION: return element.return = element.return || element.value;
		case COMMENT: return "";
		case KEYFRAMES: return element.return = element.value + "{" + serialize(element.children, callback) + "}";
		case RULESET: element.value = element.props.join(",");
	}
	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
function middleware(collection) {
	var length$1 = sizeof(collection);
	return function(element, index, children, callback) {
		var output = "";
		for (var i = 0; i < length$1; i++) output += collection[i](element, index, children, callback) || "";
		return output;
	};
}
function rulesheet(callback) {
	return function(element) {
		if (!element.root) {
			if (element = element.return) callback(element);
		}
	};
}
function memoize$1(fn) {
	var cache = Object.create(null);
	return function(arg$1) {
		if (cache[arg$1] === void 0) cache[arg$1] = fn(arg$1);
		return cache[arg$1];
	};
}
var identifierWithPointTracking = function identifierWithPointTracking$1(begin, points, index) {
	var previous = 0;
	var character$1 = 0;
	while (true) {
		previous = character$1;
		character$1 = peek();
		if (previous === 38 && character$1 === 12) points[index] = 1;
		if (token(character$1)) break;
		next();
	}
	return slice(begin, position);
};
var toRules = function toRules$1(parsed, points) {
	var index = -1;
	var character$1 = 44;
	do
		switch (token(character$1)) {
			case 0:
				if (character$1 === 38 && peek() === 12) points[index] = 1;
				parsed[index] += identifierWithPointTracking(position - 1, points, index);
				break;
			case 2:
				parsed[index] += delimit(character$1);
				break;
			case 4: if (character$1 === 44) {
				parsed[++index] = peek() === 58 ? "&\f" : "";
				points[index] = parsed[index].length;
				break;
			}
			default: parsed[index] += from(character$1);
		}
	while (character$1 = next());
	return parsed;
};
var getRules = function getRules$1(value, points) {
	return dealloc(toRules(alloc(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat$1(element) {
	if (element.type !== "rule" || !element.parent || element.length < 1) return;
	var value = element.value;
	var parent = element.parent;
	var isImplicitRule = element.column === parent.column && element.line === parent.line;
	while (parent.type !== "rule") {
		parent = parent.parent;
		if (!parent) return;
	}
	if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) return;
	if (isImplicitRule) return;
	fixedElements.set(element, true);
	var points = [];
	var rules = getRules(value, points);
	var parentRules = parent.props;
	for (var i = 0, k$1 = 0; i < rules.length; i++) for (var j = 0; j < parentRules.length; j++, k$1++) element.props[k$1] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
};
var removeLabel = function removeLabel$1(element) {
	if (element.type === "decl") {
		var value = element.value;
		if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
			element["return"] = "";
			element.value = "";
		}
	}
};
function prefix(value, length$1) {
	switch (hash(value, length$1)) {
		case 5103: return WEBKIT + "print-" + value + value;
		case 5737:
		case 4201:
		case 3177:
		case 3433:
		case 1641:
		case 4457:
		case 2921:
		case 5572:
		case 6356:
		case 5844:
		case 3191:
		case 6645:
		case 3005:
		case 6391:
		case 5879:
		case 5623:
		case 6135:
		case 4599:
		case 4855:
		case 4215:
		case 6389:
		case 5109:
		case 5365:
		case 5621:
		case 3829: return WEBKIT + value + value;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return WEBKIT + value + MOZ + value + MS + value + value;
		case 6828:
		case 4268: return WEBKIT + value + MS + value + value;
		case 6165: return WEBKIT + value + MS + "flex-" + value + value;
		case 5187: return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
		case 5443: return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
		case 4675: return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
		case 5548: return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
		case 5292: return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
		case 6060: return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
		case 4554: return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
		case 6187: return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
		case 5495:
		case 3959: return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
		case 4968: return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
		case 8116:
		case 7059:
		case 5753:
		case 5535:
		case 5445:
		case 5701:
		case 4933:
		case 4677:
		case 5533:
		case 5789:
		case 5021:
		case 4765:
			if (strlen(value) - 1 - length$1 > 6) switch (charat(value, length$1 + 1)) {
				case 109: if (charat(value, length$1 + 4) !== 45) break;
				case 102: return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length$1 + 3) == 108 ? "$3" : "$2-$3")) + value;
				case 115: return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length$1) + value : value;
			}
			break;
		case 4949: if (charat(value, length$1 + 1) !== 115) break;
		case 6444:
			switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
				case 107: return replace(value, ":", ":" + WEBKIT) + value;
				case 101: return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
			}
			break;
		case 5936:
			switch (charat(value, length$1 + 11)) {
				case 114: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
				case 108: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
				case 45: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
			}
			return WEBKIT + value + MS + value + value;
	}
	return value;
}
var defaultStylisPlugins = [function prefixer(element, index, children, callback) {
	if (element.length > -1) {
		if (!element["return"]) switch (element.type) {
			case DECLARATION:
				element["return"] = prefix(element.value, element.length);
				break;
			case KEYFRAMES: return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
			case RULESET: if (element.length) return combine(element.props, function(value) {
				switch (match(value, /(::plac\w+|:read-\w+)/)) {
					case ":read-only":
					case ":read-write": return serialize([copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] })], callback);
					case "::placeholder": return serialize([
						copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }),
						copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }),
						copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] })
					], callback);
				}
				return "";
			});
		}
	}
}];
var createCache = function createCache$1(options) {
	var key = options.key;
	if (key === "css") {
		var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
		Array.prototype.forEach.call(ssrStyles, function(node$1) {
			if (node$1.getAttribute("data-emotion").indexOf(" ") === -1) return;
			document.head.appendChild(node$1);
			node$1.setAttribute("data-s", "");
		});
	}
	var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
	var inserted = {};
	var container;
	var nodesToHydrate = [];
	container = options.container || document.head;
	Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function(node$1) {
		var attrib = node$1.getAttribute("data-emotion").split(" ");
		for (var i = 1; i < attrib.length; i++) inserted[attrib[i]] = true;
		nodesToHydrate.push(node$1);
	});
	var _insert;
	var omnipresentPlugins = [compat, removeLabel];
	var currentSheet;
	var finalizingPlugins = [stringify, rulesheet(function(rule) {
		currentSheet.insert(rule);
	})];
	var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
	var stylis = function stylis$1(styles$4) {
		return serialize(compile(styles$4), serializer);
	};
	_insert = function insert(selector, serialized, sheet, shouldCache) {
		currentSheet = sheet;
		stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
		if (shouldCache) cache.inserted[serialized.name] = true;
	};
	var cache = {
		key,
		sheet: new StyleSheet({
			key,
			container,
			nonce: options.nonce,
			speedy: options.speedy,
			prepend: options.prepend,
			insertionPoint: options.insertionPoint
		}),
		nonce: options.nonce,
		inserted,
		registered: {},
		insert: _insert
	};
	cache.sheet.hydrate(nodesToHydrate);
	return cache;
};
var require_react_is_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var b = "function" === typeof Symbol && Symbol.for, c = b ? Symbol.for("react.element") : 60103, d = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107, f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114, h = b ? Symbol.for("react.provider") : 60109, k = b ? Symbol.for("react.context") : 60110, l = b ? Symbol.for("react.async_mode") : 60111, m = b ? Symbol.for("react.concurrent_mode") : 60111, n = b ? Symbol.for("react.forward_ref") : 60112, p = b ? Symbol.for("react.suspense") : 60113, q = b ? Symbol.for("react.suspense_list") : 60120, r$1 = b ? Symbol.for("react.memo") : 60115, t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121, w = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118, y = b ? Symbol.for("react.scope") : 60119;
	function z(a) {
		if ("object" === typeof a && null !== a) {
			var u = a.$$typeof;
			switch (u) {
				case c: switch (a = a.type, a) {
					case l:
					case m:
					case e:
					case g:
					case f:
					case p: return a;
					default: switch (a = a && a.$$typeof, a) {
						case k:
						case n:
						case t:
						case r$1:
						case h: return a;
						default: return u;
					}
				}
				case d: return u;
			}
		}
	}
	function A(a) {
		return z(a) === m;
	}
	exports.AsyncMode = l;
	exports.ConcurrentMode = m;
	exports.ContextConsumer = k;
	exports.ContextProvider = h;
	exports.Element = c;
	exports.ForwardRef = n;
	exports.Fragment = e;
	exports.Lazy = t;
	exports.Memo = r$1;
	exports.Portal = d;
	exports.Profiler = g;
	exports.StrictMode = f;
	exports.Suspense = p;
	exports.isAsyncMode = function(a) {
		return A(a) || z(a) === l;
	};
	exports.isConcurrentMode = A;
	exports.isContextConsumer = function(a) {
		return z(a) === k;
	};
	exports.isContextProvider = function(a) {
		return z(a) === h;
	};
	exports.isElement = function(a) {
		return "object" === typeof a && null !== a && a.$$typeof === c;
	};
	exports.isForwardRef = function(a) {
		return z(a) === n;
	};
	exports.isFragment = function(a) {
		return z(a) === e;
	};
	exports.isLazy = function(a) {
		return z(a) === t;
	};
	exports.isMemo = function(a) {
		return z(a) === r$1;
	};
	exports.isPortal = function(a) {
		return z(a) === d;
	};
	exports.isProfiler = function(a) {
		return z(a) === g;
	};
	exports.isStrictMode = function(a) {
		return z(a) === f;
	};
	exports.isSuspense = function(a) {
		return z(a) === p;
	};
	exports.isValidElementType = function(a) {
		return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r$1 || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
	};
	exports.typeOf = z;
}));
var require_react_is$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_is_production_min();
}));
var require_hoist_non_react_statics_cjs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var reactIs = require_react_is$1();
	var REACT_STATICS = {
		childContextTypes: true,
		contextType: true,
		contextTypes: true,
		defaultProps: true,
		displayName: true,
		getDefaultProps: true,
		getDerivedStateFromError: true,
		getDerivedStateFromProps: true,
		mixins: true,
		propTypes: true,
		type: true
	};
	var KNOWN_STATICS = {
		name: true,
		length: true,
		prototype: true,
		caller: true,
		callee: true,
		arguments: true,
		arity: true
	};
	var FORWARD_REF_STATICS = {
		"$$typeof": true,
		render: true,
		defaultProps: true,
		displayName: true,
		propTypes: true
	};
	var MEMO_STATICS = {
		"$$typeof": true,
		compare: true,
		defaultProps: true,
		displayName: true,
		propTypes: true,
		type: true
	};
	var TYPE_STATICS = {};
	TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
	TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
	function getStatics(component) {
		if (reactIs.isMemo(component)) return MEMO_STATICS;
		return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
	}
	var defineProperty = Object.defineProperty;
	var getOwnPropertyNames = Object.getOwnPropertyNames;
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var getPrototypeOf = Object.getPrototypeOf;
	var objectPrototype = Object.prototype;
	function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
		if (typeof sourceComponent !== "string") {
			if (objectPrototype) {
				var inheritedComponent = getPrototypeOf(sourceComponent);
				if (inheritedComponent && inheritedComponent !== objectPrototype) hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
			}
			var keys = getOwnPropertyNames(sourceComponent);
			if (getOwnPropertySymbols) keys = keys.concat(getOwnPropertySymbols(sourceComponent));
			var targetStatics = getStatics(targetComponent);
			var sourceStatics = getStatics(sourceComponent);
			for (var i = 0; i < keys.length; ++i) {
				var key = keys[i];
				if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
					var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
					try {
						defineProperty(targetComponent, key, descriptor);
					} catch (e$1) {}
				}
			}
		}
		return targetComponent;
	}
	module.exports = hoistNonReactStatics;
}));
var isBrowser = true;
function getRegisteredStyles(registered, registeredStyles, classNames) {
	var rawClassName = "";
	classNames.split(" ").forEach(function(className) {
		if (registered[className] !== void 0) registeredStyles.push(registered[className] + ";");
		else if (className) rawClassName += className + " ";
	});
	return rawClassName;
}
var registerStyles = function registerStyles$1(cache, serialized, isStringTag$1) {
	var className = cache.key + "-" + serialized.name;
	if ((isStringTag$1 === false || isBrowser === false) && cache.registered[className] === void 0) cache.registered[className] = serialized.styles;
};
var insertStyles = function insertStyles$1(cache, serialized, isStringTag$1) {
	registerStyles(cache, serialized, isStringTag$1);
	var className = cache.key + "-" + serialized.name;
	if (cache.inserted[serialized.name] === void 0) {
		var current = serialized;
		do {
			cache.insert(serialized === current ? "." + className : "", current, cache.sheet, true);
			current = current.next;
		} while (current !== void 0);
	}
};
function murmur2(str) {
	var h$1 = 0;
	var k$1, i = 0, len = str.length;
	for (; len >= 4; ++i, len -= 4) {
		k$1 = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
		k$1 = (k$1 & 65535) * 1540483477 + ((k$1 >>> 16) * 59797 << 16);
		k$1 ^= k$1 >>> 24;
		h$1 = (k$1 & 65535) * 1540483477 + ((k$1 >>> 16) * 59797 << 16) ^ (h$1 & 65535) * 1540483477 + ((h$1 >>> 16) * 59797 << 16);
	}
	switch (len) {
		case 3: h$1 ^= (str.charCodeAt(i + 2) & 255) << 16;
		case 2: h$1 ^= (str.charCodeAt(i + 1) & 255) << 8;
		case 1:
			h$1 ^= str.charCodeAt(i) & 255;
			h$1 = (h$1 & 65535) * 1540483477 + ((h$1 >>> 16) * 59797 << 16);
	}
	h$1 ^= h$1 >>> 13;
	h$1 = (h$1 & 65535) * 1540483477 + ((h$1 >>> 16) * 59797 << 16);
	return ((h$1 ^ h$1 >>> 15) >>> 0).toString(36);
}
var unitlessKeys = {
	animationIterationCount: 1,
	aspectRatio: 1,
	borderImageOutset: 1,
	borderImageSlice: 1,
	borderImageWidth: 1,
	boxFlex: 1,
	boxFlexGroup: 1,
	boxOrdinalGroup: 1,
	columnCount: 1,
	columns: 1,
	flex: 1,
	flexGrow: 1,
	flexPositive: 1,
	flexShrink: 1,
	flexNegative: 1,
	flexOrder: 1,
	gridRow: 1,
	gridRowEnd: 1,
	gridRowSpan: 1,
	gridRowStart: 1,
	gridColumn: 1,
	gridColumnEnd: 1,
	gridColumnSpan: 1,
	gridColumnStart: 1,
	msGridRow: 1,
	msGridRowSpan: 1,
	msGridColumn: 1,
	msGridColumnSpan: 1,
	fontWeight: 1,
	lineHeight: 1,
	opacity: 1,
	order: 1,
	orphans: 1,
	scale: 1,
	tabSize: 1,
	widows: 1,
	zIndex: 1,
	zoom: 1,
	WebkitLineClamp: 1,
	fillOpacity: 1,
	floodOpacity: 1,
	stopOpacity: 1,
	strokeDasharray: 1,
	strokeDashoffset: 1,
	strokeMiterlimit: 1,
	strokeOpacity: 1,
	strokeWidth: 1
};
var isDevelopment$2 = false;
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty$1(property) {
	return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue$1(value) {
	return value != null && typeof value !== "boolean";
};
var processStyleName = /* @__PURE__ */ memoize$1(function(styleName) {
	return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue$1(key, value) {
	switch (key) {
		case "animation":
		case "animationName": if (typeof value === "string") return value.replace(animationRegex, function(match$1, p1, p2) {
			cursor = {
				name: p1,
				styles: p2,
				next: cursor
			};
			return p1;
		});
	}
	if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) return value + "px";
	return value;
};
var noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function handleInterpolation(mergedProps, registered, interpolation) {
	if (interpolation == null) return "";
	var componentSelector = interpolation;
	if (componentSelector.__emotion_styles !== void 0) return componentSelector;
	switch (typeof interpolation) {
		case "boolean": return "";
		case "object":
			var keyframes$1 = interpolation;
			if (keyframes$1.anim === 1) {
				cursor = {
					name: keyframes$1.name,
					styles: keyframes$1.styles,
					next: cursor
				};
				return keyframes$1.name;
			}
			var serializedStyles = interpolation;
			if (serializedStyles.styles !== void 0) {
				var next$1 = serializedStyles.next;
				if (next$1 !== void 0) while (next$1 !== void 0) {
					cursor = {
						name: next$1.name,
						styles: next$1.styles,
						next: cursor
					};
					next$1 = next$1.next;
				}
				return serializedStyles.styles + ";";
			}
			return createStringFromObject(mergedProps, registered, interpolation);
		case "function":
			if (mergedProps !== void 0) {
				var previousCursor = cursor;
				var result = interpolation(mergedProps);
				cursor = previousCursor;
				return handleInterpolation(mergedProps, registered, result);
			}
			break;
	}
	var asString = interpolation;
	if (registered == null) return asString;
	var cached = registered[asString];
	return cached !== void 0 ? cached : asString;
}
function createStringFromObject(mergedProps, registered, obj) {
	var string = "";
	if (Array.isArray(obj)) for (var i = 0; i < obj.length; i++) string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
	else for (var key in obj) {
		var value = obj[key];
		if (typeof value !== "object") {
			var asString = value;
			if (registered != null && registered[asString] !== void 0) string += key + "{" + registered[asString] + "}";
			else if (isProcessableValue(asString)) string += processStyleName(key) + ":" + processStyleValue(key, asString) + ";";
		} else {
			if (key === "NO_COMPONENT_SELECTOR" && isDevelopment$2) throw new Error(noComponentSelectorMessage);
			if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
				for (var _i = 0; _i < value.length; _i++) if (isProcessableValue(value[_i])) string += processStyleName(key) + ":" + processStyleValue(key, value[_i]) + ";";
			} else {
				var interpolated = handleInterpolation(mergedProps, registered, value);
				switch (key) {
					case "animation":
					case "animationName":
						string += processStyleName(key) + ":" + interpolated + ";";
						break;
					default: string += key + "{" + interpolated + "}";
				}
			}
		}
	}
	return string;
}
var labelPattern = /label:\s*([^\s;{]+)\s*(;|$)/g;
var cursor;
function serializeStyles(args, registered, mergedProps) {
	if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) return args[0];
	var stringMode = true;
	var styles$4 = "";
	cursor = void 0;
	var strings = args[0];
	if (strings == null || strings.raw === void 0) {
		stringMode = false;
		styles$4 += handleInterpolation(mergedProps, registered, strings);
	} else styles$4 += strings[0];
	for (var i = 1; i < args.length; i++) {
		styles$4 += handleInterpolation(mergedProps, registered, args[i]);
		if (stringMode) styles$4 += strings[i];
	}
	labelPattern.lastIndex = 0;
	var identifierName = "";
	var match$1;
	while ((match$1 = labelPattern.exec(styles$4)) !== null) identifierName += "-" + match$1[1];
	return {
		name: murmur2(styles$4) + identifierName,
		styles: styles$4,
		next: cursor
	};
}
var import_react = /* @__PURE__ */ __toESM(require_react());
var syncFallback = function syncFallback$1(create) {
	return create();
};
var useInsertionEffect = import_react.useInsertionEffect ? import_react.useInsertionEffect : false;
var useInsertionEffectAlwaysWithSyncFallback = useInsertionEffect || syncFallback;
var useInsertionEffectWithLayoutFallback = useInsertionEffect || import_react.useLayoutEffect;
var EmotionCacheContext = /* @__PURE__ */ import_react.createContext(typeof HTMLElement !== "undefined" ? /* @__PURE__ */ createCache({ key: "css" }) : null);
EmotionCacheContext.Provider;
var withEmotionCache = function withEmotionCache$1(func) {
	return /* @__PURE__ */ (0, import_react.forwardRef)(function(props, ref) {
		var cache = (0, import_react.useContext)(EmotionCacheContext);
		return func(props, cache, ref);
	});
};
var ThemeContext = /* @__PURE__ */ import_react.createContext({});
var hasOwn = {}.hasOwnProperty;
var typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
var createEmotionProps = function createEmotionProps$1(type, props) {
	var newProps = {};
	for (var _key in props) if (hasOwn.call(props, _key)) newProps[_key] = props[_key];
	newProps[typePropName] = type;
	return newProps;
};
var Insertion$1 = function Insertion$2(_ref) {
	var cache = _ref.cache, serialized = _ref.serialized, isStringTag$1 = _ref.isStringTag;
	registerStyles(cache, serialized, isStringTag$1);
	useInsertionEffectAlwaysWithSyncFallback(function() {
		return insertStyles(cache, serialized, isStringTag$1);
	});
	return null;
};
var Emotion$1 = /* @__PURE__ */ withEmotionCache(function(props, cache, ref) {
	var cssProp = props.css;
	if (typeof cssProp === "string" && cache.registered[cssProp] !== void 0) cssProp = cache.registered[cssProp];
	var WrappedComponent = props[typePropName];
	var registeredStyles = [cssProp];
	var className = "";
	if (typeof props.className === "string") className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
	else if (props.className != null) className = props.className + " ";
	var serialized = serializeStyles(registeredStyles, void 0, import_react.useContext(ThemeContext));
	className += cache.key + "-" + serialized.name;
	var newProps = {};
	for (var _key2 in props) if (hasOwn.call(props, _key2) && _key2 !== "css" && _key2 !== typePropName && true) newProps[_key2] = props[_key2];
	newProps.className = className;
	if (ref) newProps.ref = ref;
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(Insertion$1, {
		cache,
		serialized,
		isStringTag: typeof WrappedComponent === "string"
	}), /* @__PURE__ */ import_react.createElement(WrappedComponent, newProps));
});
require_hoist_non_react_statics_cjs();
var jsx = function jsx$1(type, props) {
	var args = arguments;
	if (props == null || !hasOwn.call(props, "css")) return import_react.createElement.apply(void 0, args);
	var argsLength = args.length;
	var createElementArgArray = new Array(argsLength);
	createElementArgArray[0] = Emotion$1;
	createElementArgArray[1] = createEmotionProps(type, props);
	for (var i = 2; i < argsLength; i++) createElementArgArray[i] = args[i];
	return import_react.createElement.apply(null, createElementArgArray);
};
(function(_jsx$82) {
	var JSX;
	(function(_JSX) {})(JSX || (JSX = _jsx$82.JSX || (_jsx$82.JSX = {})));
})(jsx || (jsx = {}));
var Global = /* @__PURE__ */ withEmotionCache(function(props, cache) {
	var styles$4 = props.styles;
	var serialized = serializeStyles([styles$4], void 0, import_react.useContext(ThemeContext));
	var sheetRef = import_react.useRef();
	useInsertionEffectWithLayoutFallback(function() {
		var key = cache.key + "-global";
		var sheet = new cache.sheet.constructor({
			key,
			nonce: cache.sheet.nonce,
			container: cache.sheet.container,
			speedy: cache.sheet.isSpeedy
		});
		var rehydrating = false;
		var node$1 = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");
		if (cache.sheet.tags.length) sheet.before = cache.sheet.tags[0];
		if (node$1 !== null) {
			rehydrating = true;
			node$1.setAttribute("data-emotion", key);
			sheet.hydrate([node$1]);
		}
		sheetRef.current = [sheet, rehydrating];
		return function() {
			sheet.flush();
		};
	}, [cache]);
	useInsertionEffectWithLayoutFallback(function() {
		var sheetRefCurrent = sheetRef.current;
		var sheet = sheetRefCurrent[0];
		if (sheetRefCurrent[1]) {
			sheetRefCurrent[1] = false;
			return;
		}
		if (serialized.next !== void 0) insertStyles(cache, serialized.next, true);
		if (sheet.tags.length) {
			sheet.before = sheet.tags[sheet.tags.length - 1].nextElementSibling;
			sheet.flush();
		}
		cache.insert("", serialized, sheet, false);
	}, [cache, serialized.name]);
	return null;
});
function css() {
	for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	return serializeStyles(args);
}
function keyframes() {
	var insertable = css.apply(void 0, arguments);
	var name = "animation-" + insertable.name;
	return {
		name,
		styles: "@keyframes " + name + "{" + insertable.styles + "}",
		anim: 1,
		toString: function toString() {
			return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
		}
	};
}
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ memoize$1(function(prop) {
	return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
});
var isDevelopment = false;
var testOmitPropsOnStringTag = isPropValid;
var testOmitPropsOnComponent = function testOmitPropsOnComponent$1(key) {
	return key !== "theme";
};
var getDefaultShouldForwardProp = function getDefaultShouldForwardProp$1(tag) {
	return typeof tag === "string" && tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps$1(tag, options, isReal) {
	var shouldForwardProp$1;
	if (options) {
		var optionsShouldForwardProp = options.shouldForwardProp;
		shouldForwardProp$1 = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
			return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
		} : optionsShouldForwardProp;
	}
	if (typeof shouldForwardProp$1 !== "function" && isReal) shouldForwardProp$1 = tag.__emotion_forwardProp;
	return shouldForwardProp$1;
};
var Insertion = function Insertion$2(_ref) {
	var cache = _ref.cache, serialized = _ref.serialized, isStringTag$1 = _ref.isStringTag;
	registerStyles(cache, serialized, isStringTag$1);
	useInsertionEffectAlwaysWithSyncFallback(function() {
		return insertStyles(cache, serialized, isStringTag$1);
	});
	return null;
};
var createStyled$1 = function createStyled$2(tag, options) {
	var isReal = tag.__emotion_real === tag;
	var baseTag = isReal && tag.__emotion_base || tag;
	var identifierName;
	var targetClassName;
	if (options !== void 0) {
		identifierName = options.label;
		targetClassName = options.target;
	}
	var shouldForwardProp$1 = composeShouldForwardProps(tag, options, isReal);
	var defaultShouldForwardProp = shouldForwardProp$1 || getDefaultShouldForwardProp(baseTag);
	var shouldUseAs = !defaultShouldForwardProp("as");
	return function() {
		var args = arguments;
		var styles$4 = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
		if (identifierName !== void 0) styles$4.push("label:" + identifierName + ";");
		if (args[0] == null || args[0].raw === void 0) styles$4.push.apply(styles$4, args);
		else {
			var templateStringsArr = args[0];
			styles$4.push(templateStringsArr[0]);
			var len = args.length;
			var i = 1;
			for (; i < len; i++) styles$4.push(args[i], templateStringsArr[i]);
		}
		var Styled = withEmotionCache(function(props, cache, ref) {
			var FinalTag = shouldUseAs && props.as || baseTag;
			var className = "";
			var classInterpolations = [];
			var mergedProps = props;
			if (props.theme == null) {
				mergedProps = {};
				for (var key in props) mergedProps[key] = props[key];
				mergedProps.theme = import_react.useContext(ThemeContext);
			}
			if (typeof props.className === "string") className = getRegisteredStyles(cache.registered, classInterpolations, props.className);
			else if (props.className != null) className = props.className + " ";
			var serialized = serializeStyles(styles$4.concat(classInterpolations), cache.registered, mergedProps);
			className += cache.key + "-" + serialized.name;
			if (targetClassName !== void 0) className += " " + targetClassName;
			var finalShouldForwardProp = shouldUseAs && shouldForwardProp$1 === void 0 ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
			var newProps = {};
			for (var _key in props) {
				if (shouldUseAs && _key === "as") continue;
				if (finalShouldForwardProp(_key)) newProps[_key] = props[_key];
			}
			newProps.className = className;
			if (ref) newProps.ref = ref;
			return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(Insertion, {
				cache,
				serialized,
				isStringTag: typeof FinalTag === "string"
			}), /* @__PURE__ */ import_react.createElement(FinalTag, newProps));
		});
		Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
		Styled.defaultProps = tag.defaultProps;
		Styled.__emotion_real = Styled;
		Styled.__emotion_base = baseTag;
		Styled.__emotion_styles = styles$4;
		Styled.__emotion_forwardProp = shouldForwardProp$1;
		Object.defineProperty(Styled, "toString", { value: function value() {
			if (targetClassName === void 0 && isDevelopment) return "NO_COMPONENT_SELECTOR";
			return "." + targetClassName;
		} });
		Styled.withComponent = function(nextTag, nextOptions) {
			return createStyled$2(nextTag, _extends({}, options, nextOptions, { shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true) })).apply(void 0, styles$4);
		};
		return Styled;
	};
};
var tags = [
	"a",
	"abbr",
	"address",
	"area",
	"article",
	"aside",
	"audio",
	"b",
	"base",
	"bdi",
	"bdo",
	"big",
	"blockquote",
	"body",
	"br",
	"button",
	"canvas",
	"caption",
	"cite",
	"code",
	"col",
	"colgroup",
	"data",
	"datalist",
	"dd",
	"del",
	"details",
	"dfn",
	"dialog",
	"div",
	"dl",
	"dt",
	"em",
	"embed",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hgroup",
	"hr",
	"html",
	"i",
	"iframe",
	"img",
	"input",
	"ins",
	"kbd",
	"keygen",
	"label",
	"legend",
	"li",
	"link",
	"main",
	"map",
	"mark",
	"marquee",
	"menu",
	"menuitem",
	"meta",
	"meter",
	"nav",
	"noscript",
	"object",
	"ol",
	"optgroup",
	"option",
	"output",
	"p",
	"param",
	"picture",
	"pre",
	"progress",
	"q",
	"rp",
	"rt",
	"ruby",
	"s",
	"samp",
	"script",
	"section",
	"select",
	"small",
	"source",
	"span",
	"strong",
	"style",
	"sub",
	"summary",
	"sup",
	"table",
	"tbody",
	"td",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"title",
	"tr",
	"track",
	"u",
	"ul",
	"var",
	"video",
	"wbr",
	"circle",
	"clipPath",
	"defs",
	"ellipse",
	"foreignObject",
	"g",
	"image",
	"line",
	"linearGradient",
	"mask",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"radialGradient",
	"rect",
	"stop",
	"svg",
	"text",
	"tspan"
];
var styled$3 = createStyled$1.bind(null);
tags.forEach(function(tagName) {
	styled$3[tagName] = styled$3(tagName);
});
var require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE$1 = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE$1 = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
		var key = null;
		void 0 !== maybeKey && (key = "" + maybeKey);
		void 0 !== config.key && (key = "" + config.key);
		if ("key" in config) {
			maybeKey = {};
			for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
		} else maybeKey = config;
		config = maybeKey.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE$1,
			type,
			key,
			ref: void 0 !== config ? config : null,
			props: maybeKey
		};
	}
	exports.Fragment = REACT_FRAGMENT_TYPE$1;
	exports.jsx = jsxProd;
	exports.jsxs = jsxProd;
}));
var require_jsx_runtime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_production();
}));
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function isEmpty$2(obj) {
	return obj === void 0 || obj === null || Object.keys(obj).length === 0;
}
function GlobalStyles$2(props) {
	const { styles: styles$4, defaultTheme: defaultTheme$4 = {} } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Global, { styles: typeof styles$4 === "function" ? (themeInput) => styles$4(isEmpty$2(themeInput) ? defaultTheme$4 : themeInput) : styles$4 });
}
function styled$2(tag, options) {
	return styled$3(tag, options);
}
function internal_mutateStyles(tag, processor) {
	if (Array.isArray(tag.__emotion_styles)) tag.__emotion_styles = processor(tag.__emotion_styles);
}
var wrapper = [];
function internal_serializeStyles(styles$4) {
	wrapper[0] = styles$4;
	return serializeStyles(wrapper);
}
var require_react_is_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
	exports.isValidElementType = function(type) {
		return "string" === typeof type || "function" === typeof type || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || "object" === typeof type && null !== type && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_CONSUMER_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_CLIENT_REFERENCE || void 0 !== type.getModuleId) ? !0 : !1;
	};
}));
var import_react_is = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_is_production();
})))());
function isPlainObject(item) {
	if (typeof item !== "object" || item === null) return false;
	const prototype = Object.getPrototypeOf(item);
	return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in item) && !(Symbol.iterator in item);
}
function deepClone(source) {
	if (/* @__PURE__ */ import_react.isValidElement(source) || (0, import_react_is.isValidElementType)(source) || !isPlainObject(source)) return source;
	const output = {};
	Object.keys(source).forEach((key) => {
		output[key] = deepClone(source[key]);
	});
	return output;
}
function deepmerge(target, source, options = { clone: true }) {
	const output = options.clone ? { ...target } : target;
	if (isPlainObject(target) && isPlainObject(source)) Object.keys(source).forEach((key) => {
		if (/* @__PURE__ */ import_react.isValidElement(source[key]) || (0, import_react_is.isValidElementType)(source[key])) output[key] = source[key];
		else if (isPlainObject(source[key]) && Object.prototype.hasOwnProperty.call(target, key) && isPlainObject(target[key])) output[key] = deepmerge(target[key], source[key], options);
		else if (options.clone) output[key] = isPlainObject(source[key]) ? deepClone(source[key]) : source[key];
		else output[key] = source[key];
	});
	return output;
}
var sortBreakpointsValues = (values$2) => {
	const breakpointsAsArray = Object.keys(values$2).map((key) => ({
		key,
		val: values$2[key]
	})) || [];
	breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
	return breakpointsAsArray.reduce((acc, obj) => {
		return {
			...acc,
			[obj.key]: obj.val
		};
	}, {});
};
function createBreakpoints(breakpoints) {
	const { values: values$2 = {
		xs: 0,
		sm: 600,
		md: 900,
		lg: 1200,
		xl: 1536
	}, unit = "px", step = 5,...other } = breakpoints;
	const sortedValues = sortBreakpointsValues(values$2);
	const keys = Object.keys(sortedValues);
	function up(key) {
		return `@media (min-width:${typeof values$2[key] === "number" ? values$2[key] : key}${unit})`;
	}
	function down(key) {
		return `@media (max-width:${(typeof values$2[key] === "number" ? values$2[key] : key) - step / 100}${unit})`;
	}
	function between(start, end) {
		const endIndex = keys.indexOf(end);
		return `@media (min-width:${typeof values$2[start] === "number" ? values$2[start] : start}${unit}) and (max-width:${(endIndex !== -1 && typeof values$2[keys[endIndex]] === "number" ? values$2[keys[endIndex]] : end) - step / 100}${unit})`;
	}
	function only(key) {
		if (keys.indexOf(key) + 1 < keys.length) return between(key, keys[keys.indexOf(key) + 1]);
		return up(key);
	}
	function not(key) {
		const keyIndex = keys.indexOf(key);
		if (keyIndex === 0) return up(keys[1]);
		if (keyIndex === keys.length - 1) return down(keys[keyIndex]);
		return between(key, keys[keys.indexOf(key) + 1]).replace("@media", "@media not all and");
	}
	return {
		keys,
		values: sortedValues,
		up,
		down,
		between,
		only,
		not,
		unit,
		...other
	};
}
function sortContainerQueries(theme, css$1) {
	if (!theme.containerQueries) return css$1;
	const sorted = Object.keys(css$1).filter((key) => key.startsWith("@container")).sort((a, b$1) => {
		const regex = /min-width:\s*([0-9.]+)/;
		return +(a.match(regex)?.[1] || 0) - +(b$1.match(regex)?.[1] || 0);
	});
	if (!sorted.length) return css$1;
	return sorted.reduce((acc, key) => {
		const value = css$1[key];
		delete acc[key];
		acc[key] = value;
		return acc;
	}, { ...css$1 });
}
function isCqShorthand(breakpointKeys, value) {
	return value === "@" || value.startsWith("@") && (breakpointKeys.some((key) => value.startsWith(`@${key}`)) || !!value.match(/^@\d/));
}
function getContainerQuery(theme, shorthand) {
	const matches = shorthand.match(/^@([^/]+)?\/?(.+)?$/);
	if (!matches) return null;
	const [, containerQuery, containerName] = matches;
	const value = Number.isNaN(+containerQuery) ? containerQuery || 0 : +containerQuery;
	return theme.containerQueries(containerName).up(value);
}
function cssContainerQueries(themeInput) {
	const toContainerQuery = (mediaQuery, name) => mediaQuery.replace("@media", name ? `@container ${name}` : "@container");
	function attachCq(node$2, name) {
		node$2.up = (...args) => toContainerQuery(themeInput.breakpoints.up(...args), name);
		node$2.down = (...args) => toContainerQuery(themeInput.breakpoints.down(...args), name);
		node$2.between = (...args) => toContainerQuery(themeInput.breakpoints.between(...args), name);
		node$2.only = (...args) => toContainerQuery(themeInput.breakpoints.only(...args), name);
		node$2.not = (...args) => {
			const result = toContainerQuery(themeInput.breakpoints.not(...args), name);
			if (result.includes("not all and")) return result.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or");
			return result;
		};
	}
	const node$1 = {};
	const containerQueries = (name) => {
		attachCq(node$1, name);
		return node$1;
	};
	attachCq(containerQueries);
	return {
		...themeInput,
		containerQueries
	};
}
var shape_default = { borderRadius: 4 };
function merge(acc, item) {
	if (!item) return acc;
	return deepmerge(acc, item, { clone: false });
}
var merge_default = merge;
const values$1 = {
	xs: 0,
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536
};
var defaultBreakpoints = {
	keys: [
		"xs",
		"sm",
		"md",
		"lg",
		"xl"
	],
	up: (key) => `@media (min-width:${values$1[key]}px)`
};
var defaultContainerQueries = { containerQueries: (containerName) => ({ up: (key) => {
	let result = typeof key === "number" ? key : values$1[key] || key;
	if (typeof result === "number") result = `${result}px`;
	return containerName ? `@container ${containerName} (min-width:${result})` : `@container (min-width:${result})`;
} }) };
function handleBreakpoints(props, propValue, styleFromPropValue) {
	const theme = props.theme || {};
	if (Array.isArray(propValue)) {
		const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
		return propValue.reduce((acc, item, index) => {
			acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
			return acc;
		}, {});
	}
	if (typeof propValue === "object") {
		const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
		return Object.keys(propValue).reduce((acc, breakpoint) => {
			if (isCqShorthand(themeBreakpoints.keys, breakpoint)) {
				const containerKey = getContainerQuery(theme.containerQueries ? theme : defaultContainerQueries, breakpoint);
				if (containerKey) acc[containerKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
			} else if (Object.keys(themeBreakpoints.values || values$1).includes(breakpoint)) {
				const mediaKey = themeBreakpoints.up(breakpoint);
				acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
			} else {
				const cssKey = breakpoint;
				acc[cssKey] = propValue[cssKey];
			}
			return acc;
		}, {});
	}
	return styleFromPropValue(propValue);
}
function createEmptyBreakpointObject(breakpointsInput = {}) {
	return breakpointsInput.keys?.reduce((acc, key) => {
		const breakpointStyleKey = breakpointsInput.up(key);
		acc[breakpointStyleKey] = {};
		return acc;
	}, {}) || {};
}
function removeUnusedBreakpoints(breakpointKeys, style$3) {
	return breakpointKeys.reduce((acc, key) => {
		const breakpointOutput = acc[key];
		if (!breakpointOutput || Object.keys(breakpointOutput).length === 0) delete acc[key];
		return acc;
	}, style$3);
}
function mergeBreakpointsInOrder(breakpointsInput, ...styles$4) {
	const emptyBreakpoints = createEmptyBreakpointObject(breakpointsInput);
	const mergedOutput = [emptyBreakpoints, ...styles$4].reduce((prev$1, next$1) => deepmerge(prev$1, next$1), {});
	return removeUnusedBreakpoints(Object.keys(emptyBreakpoints), mergedOutput);
}
function computeBreakpointsBase(breakpointValues, themeBreakpoints) {
	if (typeof breakpointValues !== "object") return {};
	const base = {};
	const breakpointsKeys = Object.keys(themeBreakpoints);
	if (Array.isArray(breakpointValues)) breakpointsKeys.forEach((breakpoint, i) => {
		if (i < breakpointValues.length) base[breakpoint] = true;
	});
	else breakpointsKeys.forEach((breakpoint) => {
		if (breakpointValues[breakpoint] != null) base[breakpoint] = true;
	});
	return base;
}
function resolveBreakpointValues({ values: breakpointValues, breakpoints: themeBreakpoints, base: customBase }) {
	const base = customBase || computeBreakpointsBase(breakpointValues, themeBreakpoints);
	const keys = Object.keys(base);
	if (keys.length === 0) return breakpointValues;
	let previous;
	return keys.reduce((acc, breakpoint, i) => {
		if (Array.isArray(breakpointValues)) {
			acc[breakpoint] = breakpointValues[i] != null ? breakpointValues[i] : breakpointValues[previous];
			previous = i;
		} else if (typeof breakpointValues === "object") {
			acc[breakpoint] = breakpointValues[breakpoint] != null ? breakpointValues[breakpoint] : breakpointValues[previous];
			previous = breakpoint;
		} else acc[breakpoint] = breakpointValues;
		return acc;
	}, {});
}
function capitalize(string) {
	if (typeof string !== "string") throw new Error(formatMuiErrorMessage(7));
	return string.charAt(0).toUpperCase() + string.slice(1);
}
function getPath(obj, path, checkVars = true) {
	if (!path || typeof path !== "string") return null;
	if (obj && obj.vars && checkVars) {
		const val = `vars.${path}`.split(".").reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
		if (val != null) return val;
	}
	return path.split(".").reduce((acc, item) => {
		if (acc && acc[item] != null) return acc[item];
		return null;
	}, obj);
}
function getStyleValue$1(themeMapping, transform, propValueFinal, userValue = propValueFinal) {
	let value;
	if (typeof themeMapping === "function") value = themeMapping(propValueFinal);
	else if (Array.isArray(themeMapping)) value = themeMapping[propValueFinal] || userValue;
	else value = getPath(themeMapping, propValueFinal) || userValue;
	if (transform) value = transform(value, userValue, themeMapping);
	return value;
}
function style$2(options) {
	const { prop, cssProperty = options.prop, themeKey, transform } = options;
	const fn = (props) => {
		if (props[prop] == null) return null;
		const propValue = props[prop];
		const theme = props.theme;
		const themeMapping = getPath(theme, themeKey) || {};
		const styleFromPropValue = (propValueFinal) => {
			let value = getStyleValue$1(themeMapping, transform, propValueFinal);
			if (propValueFinal === value && typeof propValueFinal === "string") value = getStyleValue$1(themeMapping, transform, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal);
			if (cssProperty === false) return value;
			return { [cssProperty]: value };
		};
		return handleBreakpoints(props, propValue, styleFromPropValue);
	};
	fn.propTypes = {};
	fn.filterProps = [prop];
	return fn;
}
var style_default = style$2;
function memoize(fn) {
	const cache = {};
	return (arg$1) => {
		if (cache[arg$1] === void 0) cache[arg$1] = fn(arg$1);
		return cache[arg$1];
	};
}
var properties = {
	m: "margin",
	p: "padding"
};
var directions = {
	t: "Top",
	r: "Right",
	b: "Bottom",
	l: "Left",
	x: ["Left", "Right"],
	y: ["Top", "Bottom"]
};
var aliases = {
	marginX: "mx",
	marginY: "my",
	paddingX: "px",
	paddingY: "py"
};
var getCssProperties = memoize((prop) => {
	if (prop.length > 2) if (aliases[prop]) prop = aliases[prop];
	else return [prop];
	const [a, b$1] = prop.split("");
	const property = properties[a];
	const direction = directions[b$1] || "";
	return Array.isArray(direction) ? direction.map((dir) => property + dir) : [property + direction];
});
const marginKeys = [
	"m",
	"mt",
	"mr",
	"mb",
	"ml",
	"mx",
	"my",
	"margin",
	"marginTop",
	"marginRight",
	"marginBottom",
	"marginLeft",
	"marginX",
	"marginY",
	"marginInline",
	"marginInlineStart",
	"marginInlineEnd",
	"marginBlock",
	"marginBlockStart",
	"marginBlockEnd"
];
const paddingKeys = [
	"p",
	"pt",
	"pr",
	"pb",
	"pl",
	"px",
	"py",
	"padding",
	"paddingTop",
	"paddingRight",
	"paddingBottom",
	"paddingLeft",
	"paddingX",
	"paddingY",
	"paddingInline",
	"paddingInlineStart",
	"paddingInlineEnd",
	"paddingBlock",
	"paddingBlockStart",
	"paddingBlockEnd"
];
var spacingKeys = [...marginKeys, ...paddingKeys];
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
	const themeSpacing = getPath(theme, themeKey, true) ?? defaultValue;
	if (typeof themeSpacing === "number" || typeof themeSpacing === "string") return (val) => {
		if (typeof val === "string") return val;
		if (typeof themeSpacing === "string") {
			if (themeSpacing.startsWith("var(") && val === 0) return 0;
			if (themeSpacing.startsWith("var(") && val === 1) return themeSpacing;
			return `calc(${val} * ${themeSpacing})`;
		}
		return themeSpacing * val;
	};
	if (Array.isArray(themeSpacing)) return (val) => {
		if (typeof val === "string") return val;
		const transformed = themeSpacing[Math.abs(val)];
		if (val >= 0) return transformed;
		if (typeof transformed === "number") return -transformed;
		if (typeof transformed === "string" && transformed.startsWith("var(")) return `calc(-1 * ${transformed})`;
		return `-${transformed}`;
	};
	if (typeof themeSpacing === "function") return themeSpacing;
	return () => void 0;
}
function createUnarySpacing(theme) {
	return createUnaryUnit(theme, "spacing", 8, "spacing");
}
function getValue(transformer, propValue) {
	if (typeof propValue === "string" || propValue == null) return propValue;
	return transformer(propValue);
}
function getStyleFromPropValue(cssProperties, transformer) {
	return (propValue) => cssProperties.reduce((acc, cssProperty) => {
		acc[cssProperty] = getValue(transformer, propValue);
		return acc;
	}, {});
}
function resolveCssProperty(props, keys, prop, transformer) {
	if (!keys.includes(prop)) return null;
	const cssProperties = getCssProperties(prop);
	const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
	const propValue = props[prop];
	return handleBreakpoints(props, propValue, styleFromPropValue);
}
function style$1(props, keys) {
	const transformer = createUnarySpacing(props.theme);
	return Object.keys(props).map((prop) => resolveCssProperty(props, keys, prop, transformer)).reduce(merge_default, {});
}
function margin(props) {
	return style$1(props, marginKeys);
}
margin.propTypes = {};
margin.filterProps = marginKeys;
function padding(props) {
	return style$1(props, paddingKeys);
}
padding.propTypes = {};
padding.filterProps = paddingKeys;
function spacing(props) {
	return style$1(props, spacingKeys);
}
spacing.propTypes = {};
spacing.filterProps = spacingKeys;
function createSpacing(spacingInput = 8, transform = createUnarySpacing({ spacing: spacingInput })) {
	if (spacingInput.mui) return spacingInput;
	const spacing$1 = (...argsInput) => {
		return (argsInput.length === 0 ? [1] : argsInput).map((argument) => {
			const output = transform(argument);
			return typeof output === "number" ? `${output}px` : output;
		}).join(" ");
	};
	spacing$1.mui = true;
	return spacing$1;
}
function compose(...styles$4) {
	const handlers = styles$4.reduce((acc, style$3) => {
		style$3.filterProps.forEach((prop) => {
			acc[prop] = style$3;
		});
		return acc;
	}, {});
	const fn = (props) => {
		return Object.keys(props).reduce((acc, prop) => {
			if (handlers[prop]) return merge_default(acc, handlers[prop](props));
			return acc;
		}, {});
	};
	fn.propTypes = {};
	fn.filterProps = styles$4.reduce((acc, style$3) => acc.concat(style$3.filterProps), []);
	return fn;
}
var compose_default = compose;
function borderTransform(value) {
	if (typeof value !== "number") return value;
	return `${value}px solid`;
}
function createBorderStyle(prop, transform) {
	return style_default({
		prop,
		themeKey: "borders",
		transform
	});
}
const border = createBorderStyle("border", borderTransform);
const borderTop = createBorderStyle("borderTop", borderTransform);
const borderRight = createBorderStyle("borderRight", borderTransform);
const borderBottom = createBorderStyle("borderBottom", borderTransform);
const borderLeft = createBorderStyle("borderLeft", borderTransform);
const borderColor = createBorderStyle("borderColor");
const borderTopColor = createBorderStyle("borderTopColor");
const borderRightColor = createBorderStyle("borderRightColor");
const borderBottomColor = createBorderStyle("borderBottomColor");
const borderLeftColor = createBorderStyle("borderLeftColor");
const outline = createBorderStyle("outline", borderTransform);
const outlineColor = createBorderStyle("outlineColor");
const borderRadius = (props) => {
	if (props.borderRadius !== void 0 && props.borderRadius !== null) {
		const transformer = createUnaryUnit(props.theme, "shape.borderRadius", 4, "borderRadius");
		const styleFromPropValue = (propValue) => ({ borderRadius: getValue(transformer, propValue) });
		return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
	}
	return null;
};
borderRadius.propTypes = {};
borderRadius.filterProps = ["borderRadius"];
compose_default(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius, outline, outlineColor);
const gap = (props) => {
	if (props.gap !== void 0 && props.gap !== null) {
		const transformer = createUnaryUnit(props.theme, "spacing", 8, "gap");
		const styleFromPropValue = (propValue) => ({ gap: getValue(transformer, propValue) });
		return handleBreakpoints(props, props.gap, styleFromPropValue);
	}
	return null;
};
gap.propTypes = {};
gap.filterProps = ["gap"];
const columnGap = (props) => {
	if (props.columnGap !== void 0 && props.columnGap !== null) {
		const transformer = createUnaryUnit(props.theme, "spacing", 8, "columnGap");
		const styleFromPropValue = (propValue) => ({ columnGap: getValue(transformer, propValue) });
		return handleBreakpoints(props, props.columnGap, styleFromPropValue);
	}
	return null;
};
columnGap.propTypes = {};
columnGap.filterProps = ["columnGap"];
const rowGap = (props) => {
	if (props.rowGap !== void 0 && props.rowGap !== null) {
		const transformer = createUnaryUnit(props.theme, "spacing", 8, "rowGap");
		const styleFromPropValue = (propValue) => ({ rowGap: getValue(transformer, propValue) });
		return handleBreakpoints(props, props.rowGap, styleFromPropValue);
	}
	return null;
};
rowGap.propTypes = {};
rowGap.filterProps = ["rowGap"];
const gridColumn = style_default({ prop: "gridColumn" });
const gridRow = style_default({ prop: "gridRow" });
const gridAutoFlow = style_default({ prop: "gridAutoFlow" });
const gridAutoColumns = style_default({ prop: "gridAutoColumns" });
const gridAutoRows = style_default({ prop: "gridAutoRows" });
const gridTemplateColumns = style_default({ prop: "gridTemplateColumns" });
const gridTemplateRows = style_default({ prop: "gridTemplateRows" });
const gridTemplateAreas = style_default({ prop: "gridTemplateAreas" });
const gridArea = style_default({ prop: "gridArea" });
compose_default(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
function paletteTransform(value, userValue) {
	if (userValue === "grey") return userValue;
	return value;
}
const color = style_default({
	prop: "color",
	themeKey: "palette",
	transform: paletteTransform
});
const bgcolor = style_default({
	prop: "bgcolor",
	cssProperty: "backgroundColor",
	themeKey: "palette",
	transform: paletteTransform
});
const backgroundColor = style_default({
	prop: "backgroundColor",
	themeKey: "palette",
	transform: paletteTransform
});
compose_default(color, bgcolor, backgroundColor);
function sizingTransform(value) {
	return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
const width = style_default({
	prop: "width",
	transform: sizingTransform
});
const maxWidth = (props) => {
	if (props.maxWidth !== void 0 && props.maxWidth !== null) {
		const styleFromPropValue = (propValue) => {
			const breakpoint = props.theme?.breakpoints?.values?.[propValue] || values$1[propValue];
			if (!breakpoint) return { maxWidth: sizingTransform(propValue) };
			if (props.theme?.breakpoints?.unit !== "px") return { maxWidth: `${breakpoint}${props.theme.breakpoints.unit}` };
			return { maxWidth: breakpoint };
		};
		return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
	}
	return null;
};
maxWidth.filterProps = ["maxWidth"];
const minWidth = style_default({
	prop: "minWidth",
	transform: sizingTransform
});
const height = style_default({
	prop: "height",
	transform: sizingTransform
});
const maxHeight = style_default({
	prop: "maxHeight",
	transform: sizingTransform
});
const minHeight = style_default({
	prop: "minHeight",
	transform: sizingTransform
});
style_default({
	prop: "size",
	cssProperty: "width",
	transform: sizingTransform
});
style_default({
	prop: "size",
	cssProperty: "height",
	transform: sizingTransform
});
const boxSizing = style_default({ prop: "boxSizing" });
compose_default(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
var defaultSxConfig_default = {
	border: {
		themeKey: "borders",
		transform: borderTransform
	},
	borderTop: {
		themeKey: "borders",
		transform: borderTransform
	},
	borderRight: {
		themeKey: "borders",
		transform: borderTransform
	},
	borderBottom: {
		themeKey: "borders",
		transform: borderTransform
	},
	borderLeft: {
		themeKey: "borders",
		transform: borderTransform
	},
	borderColor: { themeKey: "palette" },
	borderTopColor: { themeKey: "palette" },
	borderRightColor: { themeKey: "palette" },
	borderBottomColor: { themeKey: "palette" },
	borderLeftColor: { themeKey: "palette" },
	outline: {
		themeKey: "borders",
		transform: borderTransform
	},
	outlineColor: { themeKey: "palette" },
	borderRadius: {
		themeKey: "shape.borderRadius",
		style: borderRadius
	},
	color: {
		themeKey: "palette",
		transform: paletteTransform
	},
	bgcolor: {
		themeKey: "palette",
		cssProperty: "backgroundColor",
		transform: paletteTransform
	},
	backgroundColor: {
		themeKey: "palette",
		transform: paletteTransform
	},
	p: { style: padding },
	pt: { style: padding },
	pr: { style: padding },
	pb: { style: padding },
	pl: { style: padding },
	px: { style: padding },
	py: { style: padding },
	padding: { style: padding },
	paddingTop: { style: padding },
	paddingRight: { style: padding },
	paddingBottom: { style: padding },
	paddingLeft: { style: padding },
	paddingX: { style: padding },
	paddingY: { style: padding },
	paddingInline: { style: padding },
	paddingInlineStart: { style: padding },
	paddingInlineEnd: { style: padding },
	paddingBlock: { style: padding },
	paddingBlockStart: { style: padding },
	paddingBlockEnd: { style: padding },
	m: { style: margin },
	mt: { style: margin },
	mr: { style: margin },
	mb: { style: margin },
	ml: { style: margin },
	mx: { style: margin },
	my: { style: margin },
	margin: { style: margin },
	marginTop: { style: margin },
	marginRight: { style: margin },
	marginBottom: { style: margin },
	marginLeft: { style: margin },
	marginX: { style: margin },
	marginY: { style: margin },
	marginInline: { style: margin },
	marginInlineStart: { style: margin },
	marginInlineEnd: { style: margin },
	marginBlock: { style: margin },
	marginBlockStart: { style: margin },
	marginBlockEnd: { style: margin },
	displayPrint: {
		cssProperty: false,
		transform: (value) => ({ "@media print": { display: value } })
	},
	display: {},
	overflow: {},
	textOverflow: {},
	visibility: {},
	whiteSpace: {},
	flexBasis: {},
	flexDirection: {},
	flexWrap: {},
	justifyContent: {},
	alignItems: {},
	alignContent: {},
	order: {},
	flex: {},
	flexGrow: {},
	flexShrink: {},
	alignSelf: {},
	justifyItems: {},
	justifySelf: {},
	gap: { style: gap },
	rowGap: { style: rowGap },
	columnGap: { style: columnGap },
	gridColumn: {},
	gridRow: {},
	gridAutoFlow: {},
	gridAutoColumns: {},
	gridAutoRows: {},
	gridTemplateColumns: {},
	gridTemplateRows: {},
	gridTemplateAreas: {},
	gridArea: {},
	position: {},
	zIndex: { themeKey: "zIndex" },
	top: {},
	right: {},
	bottom: {},
	left: {},
	boxShadow: { themeKey: "shadows" },
	width: { transform: sizingTransform },
	maxWidth: { style: maxWidth },
	minWidth: { transform: sizingTransform },
	height: { transform: sizingTransform },
	maxHeight: { transform: sizingTransform },
	minHeight: { transform: sizingTransform },
	boxSizing: {},
	font: { themeKey: "font" },
	fontFamily: { themeKey: "typography" },
	fontSize: { themeKey: "typography" },
	fontStyle: { themeKey: "typography" },
	fontWeight: { themeKey: "typography" },
	letterSpacing: {},
	textTransform: {},
	lineHeight: {},
	textAlign: {},
	typography: {
		cssProperty: false,
		themeKey: "typography"
	}
};
function objectsHaveSameKeys(...objects) {
	const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
	const union = new Set(allKeys);
	return objects.every((object) => union.size === Object.keys(object).length);
}
function callIfFn(maybeFn, arg$1) {
	return typeof maybeFn === "function" ? maybeFn(arg$1) : maybeFn;
}
function unstable_createStyleFunctionSx() {
	function getThemeValue(prop, val, theme, config) {
		const props = {
			[prop]: val,
			theme
		};
		const options = config[prop];
		if (!options) return { [prop]: val };
		const { cssProperty = prop, themeKey, transform, style: style$3 } = options;
		if (val == null) return null;
		if (themeKey === "typography" && val === "inherit") return { [prop]: val };
		const themeMapping = getPath(theme, themeKey) || {};
		if (style$3) return style$3(props);
		const styleFromPropValue = (propValueFinal) => {
			let value = getStyleValue$1(themeMapping, transform, propValueFinal);
			if (propValueFinal === value && typeof propValueFinal === "string") value = getStyleValue$1(themeMapping, transform, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal);
			if (cssProperty === false) return value;
			return { [cssProperty]: value };
		};
		return handleBreakpoints(props, val, styleFromPropValue);
	}
	function styleFunctionSx$1(props) {
		const { sx, theme = {}, nested } = props || {};
		if (!sx) return null;
		const config = theme.unstable_sxConfig ?? defaultSxConfig_default;
		function traverse(sxInput) {
			let sxObject = sxInput;
			if (typeof sxInput === "function") sxObject = sxInput(theme);
			else if (typeof sxInput !== "object") return sxInput;
			if (!sxObject) return null;
			const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
			const breakpointsKeys = Object.keys(emptyBreakpoints);
			let css$1 = emptyBreakpoints;
			Object.keys(sxObject).forEach((styleKey) => {
				const value = callIfFn(sxObject[styleKey], theme);
				if (value !== null && value !== void 0) if (typeof value === "object") if (config[styleKey]) css$1 = merge_default(css$1, getThemeValue(styleKey, value, theme, config));
				else {
					const breakpointsValues = handleBreakpoints({ theme }, value, (x$1) => ({ [styleKey]: x$1 }));
					if (objectsHaveSameKeys(breakpointsValues, value)) css$1[styleKey] = styleFunctionSx$1({
						sx: value,
						theme,
						nested: true
					});
					else css$1 = merge_default(css$1, breakpointsValues);
				}
				else css$1 = merge_default(css$1, getThemeValue(styleKey, value, theme, config));
			});
			if (!nested && theme.modularCssLayers) return { "@layer sx": sortContainerQueries(theme, removeUnusedBreakpoints(breakpointsKeys, css$1)) };
			return sortContainerQueries(theme, removeUnusedBreakpoints(breakpointsKeys, css$1));
		}
		return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
	}
	return styleFunctionSx$1;
}
var styleFunctionSx = unstable_createStyleFunctionSx();
styleFunctionSx.filterProps = ["sx"];
var styleFunctionSx_default = styleFunctionSx;
function applyStyles(key, styles$4) {
	const theme = this;
	if (theme.vars) {
		if (!theme.colorSchemes?.[key] || typeof theme.getColorSchemeSelector !== "function") return {};
		let selector = theme.getColorSchemeSelector(key);
		if (selector === "&") return styles$4;
		if (selector.includes("data-") || selector.includes(".")) selector = `*:where(${selector.replace(/\s*&$/, "")}) &`;
		return { [selector]: styles$4 };
	}
	if (theme.palette.mode === key) return styles$4;
	return {};
}
function createTheme$1(options = {}, ...args) {
	const { breakpoints: breakpointsInput = {}, palette: paletteInput = {}, spacing: spacingInput, shape: shapeInput = {},...other } = options;
	const breakpoints = createBreakpoints(breakpointsInput);
	const spacing$1 = createSpacing(spacingInput);
	let muiTheme = deepmerge({
		breakpoints,
		direction: "ltr",
		components: {},
		palette: {
			mode: "light",
			...paletteInput
		},
		spacing: spacing$1,
		shape: {
			...shape_default,
			...shapeInput
		}
	}, other);
	muiTheme = cssContainerQueries(muiTheme);
	muiTheme.applyStyles = applyStyles;
	muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
	muiTheme.unstable_sxConfig = {
		...defaultSxConfig_default,
		...other?.unstable_sxConfig
	};
	muiTheme.unstable_sx = function sx(props) {
		return styleFunctionSx_default({
			sx: props,
			theme: this
		});
	};
	return muiTheme;
}
var createTheme_default = createTheme$1;
function isObjectEmpty$2(obj) {
	return Object.keys(obj).length === 0;
}
function useTheme$3(defaultTheme$4 = null) {
	const contextTheme = import_react.useContext(ThemeContext);
	return !contextTheme || isObjectEmpty$2(contextTheme) ? defaultTheme$4 : contextTheme;
}
var useThemeWithoutDefault_default = useTheme$3;
const systemDefaultTheme$1 = createTheme_default();
function useTheme$2(defaultTheme$4 = systemDefaultTheme$1) {
	return useThemeWithoutDefault_default(defaultTheme$4);
}
var useTheme_default = useTheme$2;
function wrapGlobalLayer(styles$4) {
	const serialized = internal_serializeStyles(styles$4);
	if (styles$4 !== serialized && serialized.styles) {
		if (!serialized.styles.match(/^@layer\s+[^{]*$/)) serialized.styles = `@layer global{${serialized.styles}}`;
		return serialized;
	}
	return styles$4;
}
function GlobalStyles$3({ styles: styles$4, themeId, defaultTheme: defaultTheme$4 = {} }) {
	const upperTheme = useTheme_default(defaultTheme$4);
	const resolvedTheme = themeId ? upperTheme[themeId] || upperTheme : upperTheme;
	let globalStyles = typeof styles$4 === "function" ? styles$4(resolvedTheme) : styles$4;
	if (resolvedTheme.modularCssLayers) if (Array.isArray(globalStyles)) globalStyles = globalStyles.map((styleArg) => {
		if (typeof styleArg === "function") return wrapGlobalLayer(styleArg(resolvedTheme));
		return wrapGlobalLayer(styleArg);
	});
	else globalStyles = wrapGlobalLayer(globalStyles);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalStyles$2, { styles: globalStyles });
}
var GlobalStyles_default$1 = GlobalStyles$3;
var splitProps = (props) => {
	const result = {
		systemProps: {},
		otherProps: {}
	};
	const config = props?.theme?.unstable_sxConfig ?? defaultSxConfig_default;
	Object.keys(props).forEach((prop) => {
		if (config[prop]) result.systemProps[prop] = props[prop];
		else result.otherProps[prop] = props[prop];
	});
	return result;
};
function extendSxProp$1(props) {
	const { sx: inSx,...other } = props;
	const { systemProps, otherProps } = splitProps(other);
	let finalSx;
	if (Array.isArray(inSx)) finalSx = [systemProps, ...inSx];
	else if (typeof inSx === "function") finalSx = (...args) => {
		const result = inSx(...args);
		if (!isPlainObject(result)) return systemProps;
		return {
			...systemProps,
			...result
		};
	};
	else finalSx = {
		...systemProps,
		...inSx
	};
	return {
		...otherProps,
		sx: finalSx
	};
}
var defaultGenerator = (componentName) => componentName;
var createClassNameGenerator = () => {
	let generate = defaultGenerator;
	return {
		configure(generator) {
			generate = generator;
		},
		generate(componentName) {
			return generate(componentName);
		},
		reset() {
			generate = defaultGenerator;
		}
	};
};
var ClassNameGenerator_default = createClassNameGenerator();
function r(e$1) {
	var t$1, f$1, n$1 = "";
	if ("string" == typeof e$1 || "number" == typeof e$1) n$1 += e$1;
	else if ("object" == typeof e$1) if (Array.isArray(e$1)) {
		var o = e$1.length;
		for (t$1 = 0; t$1 < o; t$1++) e$1[t$1] && (f$1 = r(e$1[t$1])) && (n$1 && (n$1 += " "), n$1 += f$1);
	} else for (f$1 in e$1) e$1[f$1] && (n$1 && (n$1 += " "), n$1 += f$1);
	return n$1;
}
function clsx() {
	for (var e$1, t$1, f$1 = 0, n$1 = "", o = arguments.length; f$1 < o; f$1++) (e$1 = arguments[f$1]) && (t$1 = r(e$1)) && (n$1 && (n$1 += " "), n$1 += t$1);
	return n$1;
}
var clsx_default = clsx;
function createBox(options = {}) {
	const { themeId, defaultTheme: defaultTheme$4, defaultClassName = "MuiBox-root", generateClassName } = options;
	const BoxRoot = styled$2("div", { shouldForwardProp: (prop) => prop !== "theme" && prop !== "sx" && prop !== "as" })(styleFunctionSx_default);
	return /* @__PURE__ */ import_react.forwardRef(function Box$1(inProps, ref) {
		const theme = useTheme_default(defaultTheme$4);
		const { className, component = "div",...other } = extendSxProp$1(inProps);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoxRoot, {
			as: component,
			ref,
			className: clsx_default(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),
			theme: themeId ? theme[themeId] || theme : theme,
			...other
		});
	});
}
const globalStateClasses = {
	active: "active",
	checked: "checked",
	completed: "completed",
	disabled: "disabled",
	error: "error",
	expanded: "expanded",
	focused: "focused",
	focusVisible: "focusVisible",
	open: "open",
	readOnly: "readOnly",
	required: "required",
	selected: "selected"
};
function generateUtilityClass(componentName, slot, globalStatePrefix = "Mui") {
	const globalStateClass = globalStateClasses[slot];
	return globalStateClass ? `${globalStatePrefix}-${globalStateClass}` : `${ClassNameGenerator_default.generate(componentName)}-${slot}`;
}
function generateUtilityClasses(componentName, slots, globalStatePrefix = "Mui") {
	const result = {};
	slots.forEach((slot) => {
		result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix);
	});
	return result;
}
function preprocessStyles(input) {
	const { variants,...style$3 } = input;
	const result = {
		variants,
		style: internal_serializeStyles(style$3),
		isProcessed: true
	};
	if (result.style === style$3) return result;
	if (variants) variants.forEach((variant) => {
		if (typeof variant.style !== "function") variant.style = internal_serializeStyles(variant.style);
	});
	return result;
}
const systemDefaultTheme = createTheme_default();
function shouldForwardProp(prop) {
	return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
function shallowLayer(serialized, layerName) {
	if (layerName && serialized && typeof serialized === "object" && serialized.styles && !serialized.styles.startsWith("@layer")) serialized.styles = `@layer ${layerName}{${String(serialized.styles)}}`;
	return serialized;
}
function defaultOverridesResolver(slot) {
	if (!slot) return null;
	return (_props, styles$4) => styles$4[slot];
}
function attachTheme(props, themeId, defaultTheme$4) {
	props.theme = isObjectEmpty$1(props.theme) ? defaultTheme$4 : props.theme[themeId] || props.theme;
}
function processStyle(props, style$3, layerName) {
	const resolvedStyle = typeof style$3 === "function" ? style$3(props) : style$3;
	if (Array.isArray(resolvedStyle)) return resolvedStyle.flatMap((subStyle) => processStyle(props, subStyle, layerName));
	if (Array.isArray(resolvedStyle?.variants)) {
		let rootStyle;
		if (resolvedStyle.isProcessed) rootStyle = layerName ? shallowLayer(resolvedStyle.style, layerName) : resolvedStyle.style;
		else {
			const { variants,...otherStyles } = resolvedStyle;
			rootStyle = layerName ? shallowLayer(internal_serializeStyles(otherStyles), layerName) : otherStyles;
		}
		return processStyleVariants(props, resolvedStyle.variants, [rootStyle], layerName);
	}
	if (resolvedStyle?.isProcessed) return layerName ? shallowLayer(internal_serializeStyles(resolvedStyle.style), layerName) : resolvedStyle.style;
	return layerName ? shallowLayer(internal_serializeStyles(resolvedStyle), layerName) : resolvedStyle;
}
function processStyleVariants(props, variants, results = [], layerName = void 0) {
	let mergedState;
	variantLoop: for (let i = 0; i < variants.length; i += 1) {
		const variant = variants[i];
		if (typeof variant.props === "function") {
			mergedState ??= {
				...props,
				...props.ownerState,
				ownerState: props.ownerState
			};
			if (!variant.props(mergedState)) continue;
		} else for (const key in variant.props) if (props[key] !== variant.props[key] && props.ownerState?.[key] !== variant.props[key]) continue variantLoop;
		if (typeof variant.style === "function") {
			mergedState ??= {
				...props,
				...props.ownerState,
				ownerState: props.ownerState
			};
			results.push(layerName ? shallowLayer(internal_serializeStyles(variant.style(mergedState)), layerName) : variant.style(mergedState));
		} else results.push(layerName ? shallowLayer(internal_serializeStyles(variant.style), layerName) : variant.style);
	}
	return results;
}
function createStyled(input = {}) {
	const { themeId, defaultTheme: defaultTheme$4 = systemDefaultTheme, rootShouldForwardProp: rootShouldForwardProp$1 = shouldForwardProp, slotShouldForwardProp: slotShouldForwardProp$1 = shouldForwardProp } = input;
	function styleAttachTheme(props) {
		attachTheme(props, themeId, defaultTheme$4);
	}
	const styled$4 = (tag, inputOptions = {}) => {
		internal_mutateStyles(tag, (styles$4) => styles$4.filter((style$3) => style$3 !== styleFunctionSx_default));
		const { name: componentName, slot: componentSlot, skipVariantsResolver: inputSkipVariantsResolver, skipSx: inputSkipSx, overridesResolver: overridesResolver$2 = defaultOverridesResolver(lowercaseFirstLetter(componentSlot)),...options } = inputOptions;
		const layerName = componentName && componentName.startsWith("Mui") || !!componentSlot ? "components" : "custom";
		const skipVariantsResolver = inputSkipVariantsResolver !== void 0 ? inputSkipVariantsResolver : componentSlot && componentSlot !== "Root" && componentSlot !== "root" || false;
		const skipSx = inputSkipSx || false;
		let shouldForwardPropOption = shouldForwardProp;
		if (componentSlot === "Root" || componentSlot === "root") shouldForwardPropOption = rootShouldForwardProp$1;
		else if (componentSlot) shouldForwardPropOption = slotShouldForwardProp$1;
		else if (isStringTag(tag)) shouldForwardPropOption = void 0;
		const defaultStyledResolver = styled$2(tag, {
			shouldForwardProp: shouldForwardPropOption,
			label: generateStyledLabel(componentName, componentSlot),
			...options
		});
		const transformStyle = (style$3) => {
			if (style$3.__emotion_real === style$3) return style$3;
			if (typeof style$3 === "function") return function styleFunctionProcessor(props) {
				return processStyle(props, style$3, props.theme.modularCssLayers ? layerName : void 0);
			};
			if (isPlainObject(style$3)) {
				const serialized = preprocessStyles(style$3);
				return function styleObjectProcessor(props) {
					if (!serialized.variants) return props.theme.modularCssLayers ? shallowLayer(serialized.style, layerName) : serialized.style;
					return processStyle(props, serialized, props.theme.modularCssLayers ? layerName : void 0);
				};
			}
			return style$3;
		};
		const muiStyledResolver = (...expressionsInput) => {
			const expressionsHead = [];
			const expressionsBody = expressionsInput.map(transformStyle);
			const expressionsTail = [];
			expressionsHead.push(styleAttachTheme);
			if (componentName && overridesResolver$2) expressionsTail.push(function styleThemeOverrides(props) {
				const styleOverrides = props.theme.components?.[componentName]?.styleOverrides;
				if (!styleOverrides) return null;
				const resolvedStyleOverrides = {};
				for (const slotKey in styleOverrides) resolvedStyleOverrides[slotKey] = processStyle(props, styleOverrides[slotKey], props.theme.modularCssLayers ? "theme" : void 0);
				return overridesResolver$2(props, resolvedStyleOverrides);
			});
			if (componentName && !skipVariantsResolver) expressionsTail.push(function styleThemeVariants(props) {
				const themeVariants = props.theme?.components?.[componentName]?.variants;
				if (!themeVariants) return null;
				return processStyleVariants(props, themeVariants, [], props.theme.modularCssLayers ? "theme" : void 0);
			});
			if (!skipSx) expressionsTail.push(styleFunctionSx_default);
			if (Array.isArray(expressionsBody[0])) {
				const inputStrings = expressionsBody.shift();
				const placeholdersHead = new Array(expressionsHead.length).fill("");
				const placeholdersTail = new Array(expressionsTail.length).fill("");
				let outputStrings;
				outputStrings = [
					...placeholdersHead,
					...inputStrings,
					...placeholdersTail
				];
				outputStrings.raw = [
					...placeholdersHead,
					...inputStrings.raw,
					...placeholdersTail
				];
				expressionsHead.unshift(outputStrings);
			}
			const expressions = [
				...expressionsHead,
				...expressionsBody,
				...expressionsTail
			];
			const Component$1 = defaultStyledResolver(...expressions);
			if (tag.muiName) Component$1.muiName = tag.muiName;
			return Component$1;
		};
		if (defaultStyledResolver.withConfig) muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
		return muiStyledResolver;
	};
	return styled$4;
}
function generateStyledLabel(componentName, componentSlot) {
	let label;
	return label;
}
function isObjectEmpty$1(object) {
	for (const _ in object) return false;
	return true;
}
function isStringTag(tag) {
	return typeof tag === "string" && tag.charCodeAt(0) > 96;
}
function lowercaseFirstLetter(string) {
	if (!string) return string;
	return string.charAt(0).toLowerCase() + string.slice(1);
}
var styled_default$1 = createStyled();
function resolveProps(defaultProps$1, props, mergeClassNameAndStyle = false) {
	const output = { ...props };
	for (const key in defaultProps$1) if (Object.prototype.hasOwnProperty.call(defaultProps$1, key)) {
		const propName = key;
		if (propName === "components" || propName === "slots") output[propName] = {
			...defaultProps$1[propName],
			...output[propName]
		};
		else if (propName === "componentsProps" || propName === "slotProps") {
			const defaultSlotProps = defaultProps$1[propName];
			const slotProps = props[propName];
			if (!slotProps) output[propName] = defaultSlotProps || {};
			else if (!defaultSlotProps) output[propName] = slotProps;
			else {
				output[propName] = { ...slotProps };
				for (const slotKey in defaultSlotProps) if (Object.prototype.hasOwnProperty.call(defaultSlotProps, slotKey)) {
					const slotPropName = slotKey;
					output[propName][slotPropName] = resolveProps(defaultSlotProps[slotPropName], slotProps[slotPropName], mergeClassNameAndStyle);
				}
			}
		} else if (propName === "className" && mergeClassNameAndStyle && props.className) output.className = clsx_default(defaultProps$1?.className, props?.className);
		else if (propName === "style" && mergeClassNameAndStyle && props.style) output.style = {
			...defaultProps$1?.style,
			...props?.style
		};
		else if (output[propName] === void 0) output[propName] = defaultProps$1[propName];
	}
	return output;
}
function getThemeProps$1(params) {
	const { theme, name, props } = params;
	if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) return props;
	return resolveProps(theme.components[name].defaultProps, props);
}
function useThemeProps({ props, name, defaultTheme: defaultTheme$4, themeId }) {
	let theme = useTheme_default(defaultTheme$4);
	if (themeId) theme = theme[themeId] || theme;
	return getThemeProps$1({
		theme,
		name,
		props
	});
}
var useEnhancedEffect_default$1 = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
function useMediaQueryOld(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr) {
	const [match$1, setMatch] = import_react.useState(() => {
		if (noSsr && matchMedia) return matchMedia(query).matches;
		if (ssrMatchMedia) return ssrMatchMedia(query).matches;
		return defaultMatches;
	});
	useEnhancedEffect_default$1(() => {
		if (!matchMedia) return;
		const queryList = matchMedia(query);
		const updateMatch = () => {
			setMatch(queryList.matches);
		};
		updateMatch();
		queryList.addEventListener("change", updateMatch);
		return () => {
			queryList.removeEventListener("change", updateMatch);
		};
	}, [query, matchMedia]);
	return match$1;
}
var maybeReactUseSyncExternalStore = { ...import_react }.useSyncExternalStore;
function useMediaQueryNew(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr) {
	const getDefaultSnapshot = import_react.useCallback(() => defaultMatches, [defaultMatches]);
	const getServerSnapshot = import_react.useMemo(() => {
		if (noSsr && matchMedia) return () => matchMedia(query).matches;
		if (ssrMatchMedia !== null) {
			const { matches } = ssrMatchMedia(query);
			return () => matches;
		}
		return getDefaultSnapshot;
	}, [
		getDefaultSnapshot,
		query,
		ssrMatchMedia,
		noSsr,
		matchMedia
	]);
	const [getSnapshot, subscribe] = import_react.useMemo(() => {
		if (matchMedia === null) return [getDefaultSnapshot, () => () => {}];
		const mediaQueryList = matchMedia(query);
		return [() => mediaQueryList.matches, (notify) => {
			mediaQueryList.addEventListener("change", notify);
			return () => {
				mediaQueryList.removeEventListener("change", notify);
			};
		}];
	}, [
		getDefaultSnapshot,
		matchMedia,
		query
	]);
	return maybeReactUseSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
function unstable_createUseMediaQuery(params = {}) {
	const { themeId } = params;
	return function useMediaQuery$2(queryInput, options = {}) {
		let theme = useThemeWithoutDefault_default();
		if (theme && themeId) theme = theme[themeId] || theme;
		const supportMatchMedia = typeof window !== "undefined" && typeof window.matchMedia !== "undefined";
		const { defaultMatches = false, matchMedia = supportMatchMedia ? window.matchMedia : null, ssrMatchMedia = null, noSsr = false } = getThemeProps$1({
			name: "MuiUseMediaQuery",
			props: options,
			theme
		});
		let query = typeof queryInput === "function" ? queryInput(theme) : queryInput;
		query = query.replace(/^@media( ?)/m, "");
		if (query.includes("print")) console.warn([
			`MUI: You have provided a \`print\` query to the \`useMediaQuery\` hook.`,
			"Using the print media query to modify print styles can lead to unexpected results.",
			"Consider using the `displayPrint` field in the `sx` prop instead.",
			"More information about `displayPrint` on our docs: https://mui.com/system/display/#display-in-print."
		].join("\n"));
		return (maybeReactUseSyncExternalStore !== void 0 ? useMediaQueryNew : useMediaQueryOld)(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr);
	};
}
unstable_createUseMediaQuery();
function clamp(val, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
	return Math.max(min, Math.min(val, max));
}
var clamp_default = clamp;
function clampWrapper(value, min = 0, max = 1) {
	return clamp_default(value, min, max);
}
function hexToRgb(color$1) {
	color$1 = color$1.slice(1);
	const re = new RegExp(`.{1,${color$1.length >= 6 ? 2 : 1}}`, "g");
	let colors = color$1.match(re);
	if (colors && colors[0].length === 1) colors = colors.map((n$1) => n$1 + n$1);
	return colors ? `rgb${colors.length === 4 ? "a" : ""}(${colors.map((n$1, index) => {
		return index < 3 ? parseInt(n$1, 16) : Math.round(parseInt(n$1, 16) / 255 * 1e3) / 1e3;
	}).join(", ")})` : "";
}
function decomposeColor(color$1) {
	if (color$1.type) return color$1;
	if (color$1.charAt(0) === "#") return decomposeColor(hexToRgb(color$1));
	const marker = color$1.indexOf("(");
	const type = color$1.substring(0, marker);
	if (![
		"rgb",
		"rgba",
		"hsl",
		"hsla",
		"color"
	].includes(type)) throw new Error(formatMuiErrorMessage(9, color$1));
	let values$2 = color$1.substring(marker + 1, color$1.length - 1);
	let colorSpace;
	if (type === "color") {
		values$2 = values$2.split(" ");
		colorSpace = values$2.shift();
		if (values$2.length === 4 && values$2[3].charAt(0) === "/") values$2[3] = values$2[3].slice(1);
		if (![
			"srgb",
			"display-p3",
			"a98-rgb",
			"prophoto-rgb",
			"rec-2020"
		].includes(colorSpace)) throw new Error(formatMuiErrorMessage(10, colorSpace));
	} else values$2 = values$2.split(",");
	values$2 = values$2.map((value) => parseFloat(value));
	return {
		type,
		values: values$2,
		colorSpace
	};
}
const colorChannel = (color$1) => {
	const decomposedColor = decomposeColor(color$1);
	return decomposedColor.values.slice(0, 3).map((val, idx) => decomposedColor.type.includes("hsl") && idx !== 0 ? `${val}%` : val).join(" ");
};
const private_safeColorChannel = (color$1, warning) => {
	try {
		return colorChannel(color$1);
	} catch (error) {
		return color$1;
	}
};
function recomposeColor(color$1) {
	const { type, colorSpace } = color$1;
	let { values: values$2 } = color$1;
	if (type.includes("rgb")) values$2 = values$2.map((n$1, i) => i < 3 ? parseInt(n$1, 10) : n$1);
	else if (type.includes("hsl")) {
		values$2[1] = `${values$2[1]}%`;
		values$2[2] = `${values$2[2]}%`;
	}
	if (type.includes("color")) values$2 = `${colorSpace} ${values$2.join(" ")}`;
	else values$2 = `${values$2.join(", ")}`;
	return `${type}(${values$2})`;
}
function hslToRgb(color$1) {
	color$1 = decomposeColor(color$1);
	const { values: values$2 } = color$1;
	const h$1 = values$2[0];
	const s = values$2[1] / 100;
	const l$1 = values$2[2] / 100;
	const a = s * Math.min(l$1, 1 - l$1);
	const f$1 = (n$1, k$1 = (n$1 + h$1 / 30) % 12) => l$1 - a * Math.max(Math.min(k$1 - 3, 9 - k$1, 1), -1);
	let type = "rgb";
	const rgb = [
		Math.round(f$1(0) * 255),
		Math.round(f$1(8) * 255),
		Math.round(f$1(4) * 255)
	];
	if (color$1.type === "hsla") {
		type += "a";
		rgb.push(values$2[3]);
	}
	return recomposeColor({
		type,
		values: rgb
	});
}
function getLuminance(color$1) {
	color$1 = decomposeColor(color$1);
	let rgb = color$1.type === "hsl" || color$1.type === "hsla" ? decomposeColor(hslToRgb(color$1)).values : color$1.values;
	rgb = rgb.map((val) => {
		if (color$1.type !== "color") val /= 255;
		return val <= .03928 ? val / 12.92 : ((val + .055) / 1.055) ** 2.4;
	});
	return Number((.2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2]).toFixed(3));
}
function getContrastRatio(foreground, background) {
	const lumA = getLuminance(foreground);
	const lumB = getLuminance(background);
	return (Math.max(lumA, lumB) + .05) / (Math.min(lumA, lumB) + .05);
}
function alpha(color$1, value) {
	color$1 = decomposeColor(color$1);
	value = clampWrapper(value);
	if (color$1.type === "rgb" || color$1.type === "hsl") color$1.type += "a";
	if (color$1.type === "color") color$1.values[3] = `/${value}`;
	else color$1.values[3] = value;
	return recomposeColor(color$1);
}
function private_safeAlpha(color$1, value, warning) {
	try {
		return alpha(color$1, value);
	} catch (error) {
		return color$1;
	}
}
function darken(color$1, coefficient) {
	color$1 = decomposeColor(color$1);
	coefficient = clampWrapper(coefficient);
	if (color$1.type.includes("hsl")) color$1.values[2] *= 1 - coefficient;
	else if (color$1.type.includes("rgb") || color$1.type.includes("color")) for (let i = 0; i < 3; i += 1) color$1.values[i] *= 1 - coefficient;
	return recomposeColor(color$1);
}
function private_safeDarken(color$1, coefficient, warning) {
	try {
		return darken(color$1, coefficient);
	} catch (error) {
		return color$1;
	}
}
function lighten(color$1, coefficient) {
	color$1 = decomposeColor(color$1);
	coefficient = clampWrapper(coefficient);
	if (color$1.type.includes("hsl")) color$1.values[2] += (100 - color$1.values[2]) * coefficient;
	else if (color$1.type.includes("rgb")) for (let i = 0; i < 3; i += 1) color$1.values[i] += (255 - color$1.values[i]) * coefficient;
	else if (color$1.type.includes("color")) for (let i = 0; i < 3; i += 1) color$1.values[i] += (1 - color$1.values[i]) * coefficient;
	return recomposeColor(color$1);
}
function private_safeLighten(color$1, coefficient, warning) {
	try {
		return lighten(color$1, coefficient);
	} catch (error) {
		return color$1;
	}
}
function emphasize(color$1, coefficient = .15) {
	return getLuminance(color$1) > .5 ? darken(color$1, coefficient) : lighten(color$1, coefficient);
}
function private_safeEmphasize(color$1, coefficient, warning) {
	try {
		return emphasize(color$1, coefficient);
	} catch (error) {
		return color$1;
	}
}
var ThemeContext_default = /* @__PURE__ */ import_react.createContext(null);
function useTheme$1() {
	return import_react.useContext(ThemeContext_default);
}
var nested_default = typeof Symbol === "function" && Symbol.for ? Symbol.for("mui.nested") : "__THEME_NESTED__";
function mergeOuterLocalTheme(outerTheme, localTheme) {
	if (typeof localTheme === "function") return localTheme(outerTheme);
	return {
		...outerTheme,
		...localTheme
	};
}
function ThemeProvider$2(props) {
	const { children, theme: localTheme } = props;
	const outerTheme = useTheme$1();
	const theme = import_react.useMemo(() => {
		const output = outerTheme === null ? { ...localTheme } : mergeOuterLocalTheme(outerTheme, localTheme);
		if (output != null) output[nested_default] = outerTheme !== null;
		return output;
	}, [localTheme, outerTheme]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext_default.Provider, {
		value: theme,
		children
	});
}
var ThemeProvider_default$1 = ThemeProvider$2;
var RtlContext = /* @__PURE__ */ import_react.createContext();
function RtlProvider({ value,...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RtlContext.Provider, {
		value: value ?? true,
		...props
	});
}
const useRtl = () => {
	return import_react.useContext(RtlContext) ?? false;
};
var RtlProvider_default = RtlProvider;
var PropsContext = /* @__PURE__ */ import_react.createContext(void 0);
function DefaultPropsProvider({ value, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropsContext.Provider, {
		value,
		children
	});
}
function getThemeProps(params) {
	const { theme, name, props } = params;
	if (!theme || !theme.components || !theme.components[name]) return props;
	const config = theme.components[name];
	if (config.defaultProps) return resolveProps(config.defaultProps, props, theme.components.mergeClassNameAndStyle);
	if (!config.styleOverrides && !config.variants) return resolveProps(config, props, theme.components.mergeClassNameAndStyle);
	return props;
}
function useDefaultProps$1({ props, name }) {
	const ctx = import_react.useContext(PropsContext);
	return getThemeProps({
		props,
		name,
		theme: { components: ctx }
	});
}
var DefaultPropsProvider_default = DefaultPropsProvider;
var globalId = 0;
function useGlobalId(idOverride) {
	const [defaultId, setDefaultId] = import_react.useState(idOverride);
	const id = idOverride || defaultId;
	import_react.useEffect(() => {
		if (defaultId == null) {
			globalId += 1;
			setDefaultId(`mui-${globalId}`);
		}
	}, [defaultId]);
	return id;
}
var maybeReactUseId = { ...import_react }.useId;
function useId(idOverride) {
	if (maybeReactUseId !== void 0) {
		const reactId = maybeReactUseId();
		return idOverride ?? reactId;
	}
	return useGlobalId(idOverride);
}
function useLayerOrder(theme) {
	const upperTheme = useThemeWithoutDefault_default();
	const id = useId() || "";
	const { modularCssLayers } = theme;
	let layerOrder = "mui.global, mui.components, mui.theme, mui.custom, mui.sx";
	if (!modularCssLayers || upperTheme !== null) layerOrder = "";
	else if (typeof modularCssLayers === "string") layerOrder = modularCssLayers.replace(/mui(?!\.)/g, layerOrder);
	else layerOrder = `@layer ${layerOrder};`;
	useEnhancedEffect_default$1(() => {
		const head = document.querySelector("head");
		if (!head) return;
		const firstChild = head.firstChild;
		if (layerOrder) {
			if (firstChild && firstChild.hasAttribute?.("data-mui-layer-order") && firstChild.getAttribute("data-mui-layer-order") === id) return;
			const styleElement = document.createElement("style");
			styleElement.setAttribute("data-mui-layer-order", id);
			styleElement.textContent = layerOrder;
			head.prepend(styleElement);
		} else head.querySelector(`style[data-mui-layer-order="${id}"]`)?.remove();
	}, [layerOrder, id]);
	if (!layerOrder) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalStyles_default$1, { styles: layerOrder });
}
var EMPTY_THEME = {};
function useThemeScoping(themeId, upperTheme, localTheme, isPrivate = false) {
	return import_react.useMemo(() => {
		const resolvedTheme = themeId ? upperTheme[themeId] || upperTheme : upperTheme;
		if (typeof localTheme === "function") {
			const mergedTheme = localTheme(resolvedTheme);
			const result = themeId ? {
				...upperTheme,
				[themeId]: mergedTheme
			} : mergedTheme;
			if (isPrivate) return () => result;
			return result;
		}
		return themeId ? {
			...upperTheme,
			[themeId]: localTheme
		} : {
			...upperTheme,
			...localTheme
		};
	}, [
		themeId,
		upperTheme,
		localTheme,
		isPrivate
	]);
}
function ThemeProvider$1(props) {
	const { children, theme: localTheme, themeId } = props;
	const upperTheme = useThemeWithoutDefault_default(EMPTY_THEME);
	const upperPrivateTheme = useTheme$1() || EMPTY_THEME;
	const engineTheme = useThemeScoping(themeId, upperTheme, localTheme);
	const privateTheme = useThemeScoping(themeId, upperPrivateTheme, localTheme, true);
	const rtlValue = (themeId ? engineTheme[themeId] : engineTheme).direction === "rtl";
	const layerOrder = useLayerOrder(engineTheme);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider_default$1, {
		theme: privateTheme,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
			value: engineTheme,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RtlProvider_default, {
				value: rtlValue,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DefaultPropsProvider_default, {
					value: themeId ? engineTheme[themeId].components : engineTheme.components,
					children: [layerOrder, children]
				})
			})
		})
	});
}
var ThemeProvider_default = ThemeProvider$1;
var arg = { theme: void 0 };
function unstable_memoTheme(styleFn) {
	let lastValue;
	let lastTheme;
	return function styleMemoized(props) {
		let value = lastValue;
		if (value === void 0 || props.theme !== lastTheme) {
			arg.theme = props.theme;
			value = preprocessStyles(styleFn(arg));
			lastValue = value;
			lastTheme = props.theme;
		}
		return value;
	};
}
const DEFAULT_MODE_STORAGE_KEY = "mode";
const DEFAULT_COLOR_SCHEME_STORAGE_KEY = "color-scheme";
const DEFAULT_ATTRIBUTE = "data-color-scheme";
function InitColorSchemeScript(options) {
	const { defaultMode = "system", defaultLightColorScheme = "light", defaultDarkColorScheme = "dark", modeStorageKey = DEFAULT_MODE_STORAGE_KEY, colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY, attribute: initialAttribute = DEFAULT_ATTRIBUTE, colorSchemeNode = "document.documentElement", nonce } = options || {};
	let setter = "";
	let attribute = initialAttribute;
	if (initialAttribute === "class") attribute = ".%s";
	if (initialAttribute === "data") attribute = "[data-%s]";
	if (attribute.startsWith(".")) {
		const selector = attribute.substring(1);
		setter += `${colorSchemeNode}.classList.remove('${selector}'.replace('%s', light), '${selector}'.replace('%s', dark));
      ${colorSchemeNode}.classList.add('${selector}'.replace('%s', colorScheme));`;
	}
	const matches = attribute.match(/\[([^[\]]+)\]/);
	if (matches) {
		const [attr, value] = matches[1].split("=");
		if (!value) setter += `${colorSchemeNode}.removeAttribute('${attr}'.replace('%s', light));
      ${colorSchemeNode}.removeAttribute('${attr}'.replace('%s', dark));`;
		setter += `
      ${colorSchemeNode}.setAttribute('${attr}'.replace('%s', colorScheme), ${value ? `${value}.replace('%s', colorScheme)` : "\"\""});`;
	} else setter += `${colorSchemeNode}.setAttribute('${attribute}', colorScheme);`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		suppressHydrationWarning: true,
		nonce: typeof window === "undefined" ? nonce : "",
		dangerouslySetInnerHTML: { __html: `(function() {
try {
  let colorScheme = '';
  const mode = localStorage.getItem('${modeStorageKey}') || '${defaultMode}';
  const dark = localStorage.getItem('${colorSchemeStorageKey}-dark') || '${defaultDarkColorScheme}';
  const light = localStorage.getItem('${colorSchemeStorageKey}-light') || '${defaultLightColorScheme}';
  if (mode === 'system') {
    // handle system mode
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = dark
    } else {
      colorScheme = light
    }
  }
  if (mode === 'light') {
    colorScheme = light;
  }
  if (mode === 'dark') {
    colorScheme = dark;
  }
  if (colorScheme) {
    ${setter}
  }
} catch(e){}})();` }
	}, "mui-color-scheme-init");
}
function noop$3() {}
var localStorageManager = ({ key, storageWindow }) => {
	if (!storageWindow && typeof window !== "undefined") storageWindow = window;
	return {
		get(defaultValue) {
			if (typeof window === "undefined") return;
			if (!storageWindow) return defaultValue;
			let value;
			try {
				value = storageWindow.localStorage.getItem(key);
			} catch {}
			return value || defaultValue;
		},
		set: (value) => {
			if (storageWindow) try {
				storageWindow.localStorage.setItem(key, value);
			} catch {}
		},
		subscribe: (handler) => {
			if (!storageWindow) return noop$3;
			const listener = (event) => {
				const value = event.newValue;
				if (event.key === key) handler(value);
			};
			storageWindow.addEventListener("storage", listener);
			return () => {
				storageWindow.removeEventListener("storage", listener);
			};
		}
	};
};
var localStorageManager_default = localStorageManager;
function noop$2() {}
function getSystemMode(mode) {
	if (typeof window !== "undefined" && typeof window.matchMedia === "function" && mode === "system") {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
		return "light";
	}
}
function processState(state, callback) {
	if (state.mode === "light" || state.mode === "system" && state.systemMode === "light") return callback("light");
	if (state.mode === "dark" || state.mode === "system" && state.systemMode === "dark") return callback("dark");
}
function getColorScheme(state) {
	return processState(state, (mode) => {
		if (mode === "light") return state.lightColorScheme;
		if (mode === "dark") return state.darkColorScheme;
	});
}
function useCurrentColorScheme(options) {
	const { defaultMode = "light", defaultLightColorScheme, defaultDarkColorScheme, supportedColorSchemes = [], modeStorageKey = DEFAULT_MODE_STORAGE_KEY, colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY, storageWindow = typeof window === "undefined" ? void 0 : window, storageManager = localStorageManager_default, noSsr = false } = options;
	const joinedColorSchemes = supportedColorSchemes.join(",");
	const isMultiSchemes = supportedColorSchemes.length > 1;
	const modeStorage = import_react.useMemo(() => storageManager?.({
		key: modeStorageKey,
		storageWindow
	}), [
		storageManager,
		modeStorageKey,
		storageWindow
	]);
	const lightStorage = import_react.useMemo(() => storageManager?.({
		key: `${colorSchemeStorageKey}-light`,
		storageWindow
	}), [
		storageManager,
		colorSchemeStorageKey,
		storageWindow
	]);
	const darkStorage = import_react.useMemo(() => storageManager?.({
		key: `${colorSchemeStorageKey}-dark`,
		storageWindow
	}), [
		storageManager,
		colorSchemeStorageKey,
		storageWindow
	]);
	const [state, setState] = import_react.useState(() => {
		const initialMode = modeStorage?.get(defaultMode) || defaultMode;
		const lightColorScheme = lightStorage?.get(defaultLightColorScheme) || defaultLightColorScheme;
		const darkColorScheme = darkStorage?.get(defaultDarkColorScheme) || defaultDarkColorScheme;
		return {
			mode: initialMode,
			systemMode: getSystemMode(initialMode),
			lightColorScheme,
			darkColorScheme
		};
	});
	const [isClient, setIsClient] = import_react.useState(noSsr || !isMultiSchemes);
	import_react.useEffect(() => {
		setIsClient(true);
	}, []);
	const colorScheme = getColorScheme(state);
	const setMode = import_react.useCallback((mode) => {
		setState((currentState) => {
			if (mode === currentState.mode) return currentState;
			const newMode = mode ?? defaultMode;
			modeStorage?.set(newMode);
			return {
				...currentState,
				mode: newMode,
				systemMode: getSystemMode(newMode)
			};
		});
	}, [modeStorage, defaultMode]);
	const setColorScheme = import_react.useCallback((value) => {
		if (!value) setState((currentState) => {
			lightStorage?.set(defaultLightColorScheme);
			darkStorage?.set(defaultDarkColorScheme);
			return {
				...currentState,
				lightColorScheme: defaultLightColorScheme,
				darkColorScheme: defaultDarkColorScheme
			};
		});
		else if (typeof value === "string") if (value && !joinedColorSchemes.includes(value)) console.error(`\`${value}\` does not exist in \`theme.colorSchemes\`.`);
		else setState((currentState) => {
			const newState = { ...currentState };
			processState(currentState, (mode) => {
				if (mode === "light") {
					lightStorage?.set(value);
					newState.lightColorScheme = value;
				}
				if (mode === "dark") {
					darkStorage?.set(value);
					newState.darkColorScheme = value;
				}
			});
			return newState;
		});
		else setState((currentState) => {
			const newState = { ...currentState };
			const newLightColorScheme = value.light === null ? defaultLightColorScheme : value.light;
			const newDarkColorScheme = value.dark === null ? defaultDarkColorScheme : value.dark;
			if (newLightColorScheme) if (!joinedColorSchemes.includes(newLightColorScheme)) console.error(`\`${newLightColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
			else {
				newState.lightColorScheme = newLightColorScheme;
				lightStorage?.set(newLightColorScheme);
			}
			if (newDarkColorScheme) if (!joinedColorSchemes.includes(newDarkColorScheme)) console.error(`\`${newDarkColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
			else {
				newState.darkColorScheme = newDarkColorScheme;
				darkStorage?.set(newDarkColorScheme);
			}
			return newState;
		});
	}, [
		joinedColorSchemes,
		lightStorage,
		darkStorage,
		defaultLightColorScheme,
		defaultDarkColorScheme
	]);
	const handleMediaQuery = import_react.useCallback((event) => {
		if (state.mode === "system") setState((currentState) => {
			const systemMode = event?.matches ? "dark" : "light";
			if (currentState.systemMode === systemMode) return currentState;
			return {
				...currentState,
				systemMode
			};
		});
	}, [state.mode]);
	const mediaListener = import_react.useRef(handleMediaQuery);
	mediaListener.current = handleMediaQuery;
	import_react.useEffect(() => {
		if (typeof window.matchMedia !== "function" || !isMultiSchemes) return;
		const handler = (...args) => mediaListener.current(...args);
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		media.addListener(handler);
		handler(media);
		return () => {
			media.removeListener(handler);
		};
	}, [isMultiSchemes]);
	import_react.useEffect(() => {
		if (isMultiSchemes) {
			const unsubscribeMode = modeStorage?.subscribe((value) => {
				if (!value || [
					"light",
					"dark",
					"system"
				].includes(value)) setMode(value || defaultMode);
			}) || noop$2;
			const unsubscribeLight = lightStorage?.subscribe((value) => {
				if (!value || joinedColorSchemes.match(value)) setColorScheme({ light: value });
			}) || noop$2;
			const unsubscribeDark = darkStorage?.subscribe((value) => {
				if (!value || joinedColorSchemes.match(value)) setColorScheme({ dark: value });
			}) || noop$2;
			return () => {
				unsubscribeMode();
				unsubscribeLight();
				unsubscribeDark();
			};
		}
	}, [
		setColorScheme,
		setMode,
		joinedColorSchemes,
		defaultMode,
		storageWindow,
		isMultiSchemes,
		modeStorage,
		lightStorage,
		darkStorage
	]);
	return {
		...state,
		mode: isClient ? state.mode : void 0,
		systemMode: isClient ? state.systemMode : void 0,
		colorScheme: isClient ? colorScheme : void 0,
		setMode,
		setColorScheme
	};
}
const DISABLE_CSS_TRANSITION = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function createCssVarsProvider(options) {
	const { themeId, theme: defaultTheme$4 = {}, modeStorageKey: defaultModeStorageKey = DEFAULT_MODE_STORAGE_KEY, colorSchemeStorageKey: defaultColorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY, disableTransitionOnChange: designSystemTransitionOnChange = false, defaultColorScheme, resolveTheme } = options;
	const defaultContext = {
		allColorSchemes: [],
		colorScheme: void 0,
		darkColorScheme: void 0,
		lightColorScheme: void 0,
		mode: void 0,
		setColorScheme: () => {},
		setMode: () => {},
		systemMode: void 0
	};
	const ColorSchemeContext = /* @__PURE__ */ import_react.createContext(void 0);
	const useColorScheme$1 = () => import_react.useContext(ColorSchemeContext) || defaultContext;
	const defaultColorSchemes = {};
	const defaultComponents = {};
	function CssVarsProvider$1(props) {
		const { children, theme: themeProp, modeStorageKey = defaultModeStorageKey, colorSchemeStorageKey = defaultColorSchemeStorageKey, disableTransitionOnChange = designSystemTransitionOnChange, storageManager, storageWindow = typeof window === "undefined" ? void 0 : window, documentNode = typeof document === "undefined" ? void 0 : document, colorSchemeNode = typeof document === "undefined" ? void 0 : document.documentElement, disableNestedContext = false, disableStyleSheetGeneration = false, defaultMode: initialMode = "system", forceThemeRerender = false, noSsr } = props;
		const hasMounted = import_react.useRef(false);
		const upperTheme = useTheme$1();
		const ctx = import_react.useContext(ColorSchemeContext);
		const nested = !!ctx && !disableNestedContext;
		const initialTheme = import_react.useMemo(() => {
			if (themeProp) return themeProp;
			return typeof defaultTheme$4 === "function" ? defaultTheme$4() : defaultTheme$4;
		}, [themeProp]);
		const scopedTheme = initialTheme[themeId];
		const restThemeProp = scopedTheme || initialTheme;
		const { colorSchemes = defaultColorSchemes, components = defaultComponents, cssVarPrefix } = restThemeProp;
		const joinedColorSchemes = Object.keys(colorSchemes).filter((k$1) => !!colorSchemes[k$1]).join(",");
		const allColorSchemes = import_react.useMemo(() => joinedColorSchemes.split(","), [joinedColorSchemes]);
		const defaultLightColorScheme$1 = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.light;
		const defaultDarkColorScheme$1 = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.dark;
		const defaultMode = colorSchemes[defaultLightColorScheme$1] && colorSchemes[defaultDarkColorScheme$1] ? initialMode : colorSchemes[restThemeProp.defaultColorScheme]?.palette?.mode || restThemeProp.palette?.mode;
		const { mode: stateMode, setMode, systemMode, lightColorScheme, darkColorScheme, colorScheme: stateColorScheme, setColorScheme } = useCurrentColorScheme({
			supportedColorSchemes: allColorSchemes,
			defaultLightColorScheme: defaultLightColorScheme$1,
			defaultDarkColorScheme: defaultDarkColorScheme$1,
			modeStorageKey,
			colorSchemeStorageKey,
			defaultMode,
			storageManager,
			storageWindow,
			noSsr
		});
		let mode = stateMode;
		let colorScheme = stateColorScheme;
		if (nested) {
			mode = ctx.mode;
			colorScheme = ctx.colorScheme;
		}
		let calculatedColorScheme = colorScheme || restThemeProp.defaultColorScheme;
		if (restThemeProp.vars && !forceThemeRerender) calculatedColorScheme = restThemeProp.defaultColorScheme;
		const memoTheme$1 = import_react.useMemo(() => {
			const themeVars = restThemeProp.generateThemeVars?.() || restThemeProp.vars;
			const theme = {
				...restThemeProp,
				components,
				colorSchemes,
				cssVarPrefix,
				vars: themeVars
			};
			if (typeof theme.generateSpacing === "function") theme.spacing = theme.generateSpacing();
			if (calculatedColorScheme) {
				const scheme = colorSchemes[calculatedColorScheme];
				if (scheme && typeof scheme === "object") Object.keys(scheme).forEach((schemeKey) => {
					if (scheme[schemeKey] && typeof scheme[schemeKey] === "object") theme[schemeKey] = {
						...theme[schemeKey],
						...scheme[schemeKey]
					};
					else theme[schemeKey] = scheme[schemeKey];
				});
			}
			return resolveTheme ? resolveTheme(theme) : theme;
		}, [
			restThemeProp,
			calculatedColorScheme,
			components,
			colorSchemes,
			cssVarPrefix
		]);
		const colorSchemeSelector = restThemeProp.colorSchemeSelector;
		useEnhancedEffect_default$1(() => {
			if (colorScheme && colorSchemeNode && colorSchemeSelector && colorSchemeSelector !== "media") {
				const selector = colorSchemeSelector;
				let rule = colorSchemeSelector;
				if (selector === "class") rule = `.%s`;
				if (selector === "data") rule = `[data-%s]`;
				if (selector?.startsWith("data-") && !selector.includes("%s")) rule = `[${selector}="%s"]`;
				if (rule.startsWith(".")) {
					colorSchemeNode.classList.remove(...allColorSchemes.map((scheme) => rule.substring(1).replace("%s", scheme)));
					colorSchemeNode.classList.add(rule.substring(1).replace("%s", colorScheme));
				} else {
					const matches = rule.replace("%s", colorScheme).match(/\[([^\]]+)\]/);
					if (matches) {
						const [attr, value] = matches[1].split("=");
						if (!value) allColorSchemes.forEach((scheme) => {
							colorSchemeNode.removeAttribute(attr.replace(colorScheme, scheme));
						});
						colorSchemeNode.setAttribute(attr, value ? value.replace(/"|'/g, "") : "");
					} else colorSchemeNode.setAttribute(rule, colorScheme);
				}
			}
		}, [
			colorScheme,
			colorSchemeSelector,
			colorSchemeNode,
			allColorSchemes
		]);
		import_react.useEffect(() => {
			let timer;
			if (disableTransitionOnChange && hasMounted.current && documentNode) {
				const css$1 = documentNode.createElement("style");
				css$1.appendChild(documentNode.createTextNode(DISABLE_CSS_TRANSITION));
				documentNode.head.appendChild(css$1);
				window.getComputedStyle(documentNode.body);
				timer = setTimeout(() => {
					documentNode.head.removeChild(css$1);
				}, 1);
			}
			return () => {
				clearTimeout(timer);
			};
		}, [
			colorScheme,
			disableTransitionOnChange,
			documentNode
		]);
		import_react.useEffect(() => {
			hasMounted.current = true;
			return () => {
				hasMounted.current = false;
			};
		}, []);
		const contextValue = import_react.useMemo(() => ({
			allColorSchemes,
			colorScheme,
			darkColorScheme,
			lightColorScheme,
			mode,
			setColorScheme,
			setMode,
			systemMode
		}), [
			allColorSchemes,
			colorScheme,
			darkColorScheme,
			lightColorScheme,
			mode,
			setColorScheme,
			setMode,
			systemMode,
			memoTheme$1.colorSchemeSelector
		]);
		let shouldGenerateStyleSheet = true;
		if (disableStyleSheetGeneration || restThemeProp.cssVariables === false || nested && upperTheme?.cssVarPrefix === cssVarPrefix) shouldGenerateStyleSheet = false;
		const element = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider_default, {
			themeId: scopedTheme ? themeId : void 0,
			theme: memoTheme$1,
			children
		}), shouldGenerateStyleSheet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalStyles$2, { styles: memoTheme$1.generateStyleSheets?.() || [] })] });
		if (nested) return element;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorSchemeContext.Provider, {
			value: contextValue,
			children: element
		});
	}
	const defaultLightColorScheme = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.light;
	const defaultDarkColorScheme = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.dark;
	const getInitColorSchemeScript = (params) => InitColorSchemeScript({
		colorSchemeStorageKey: defaultColorSchemeStorageKey,
		defaultLightColorScheme,
		defaultDarkColorScheme,
		modeStorageKey: defaultModeStorageKey,
		...params
	});
	return {
		CssVarsProvider: CssVarsProvider$1,
		useColorScheme: useColorScheme$1,
		getInitColorSchemeScript
	};
}
function createGetCssVar(prefix$1 = "") {
	function appendVar(...vars) {
		if (!vars.length) return "";
		const value = vars[0];
		if (typeof value === "string" && !value.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/)) return `, var(--${prefix$1 ? `${prefix$1}-` : ""}${value}${appendVar(...vars.slice(1))})`;
		return `, ${value}`;
	}
	const getCssVar = (field, ...fallbacks) => {
		return `var(--${prefix$1 ? `${prefix$1}-` : ""}${field}${appendVar(...fallbacks)})`;
	};
	return getCssVar;
}
const assignNestedKeys = (obj, keys, value, arrayKeys = []) => {
	let temp = obj;
	keys.forEach((k$1, index) => {
		if (index === keys.length - 1) {
			if (Array.isArray(temp)) temp[Number(k$1)] = value;
			else if (temp && typeof temp === "object") temp[k$1] = value;
		} else if (temp && typeof temp === "object") {
			if (!temp[k$1]) temp[k$1] = arrayKeys.includes(k$1) ? [] : {};
			temp = temp[k$1];
		}
	});
};
const walkObjectDeep = (obj, callback, shouldSkipPaths) => {
	function recurse(object, parentKeys = [], arrayKeys = []) {
		Object.entries(object).forEach(([key, value]) => {
			if (!shouldSkipPaths || shouldSkipPaths && !shouldSkipPaths([...parentKeys, key])) {
				if (value !== void 0 && value !== null) if (typeof value === "object" && Object.keys(value).length > 0) recurse(value, [...parentKeys, key], Array.isArray(value) ? [...arrayKeys, key] : arrayKeys);
				else callback([...parentKeys, key], value, arrayKeys);
			}
		});
	}
	recurse(obj);
};
var getCssValue = (keys, value) => {
	if (typeof value === "number") {
		if ([
			"lineHeight",
			"fontWeight",
			"opacity",
			"zIndex"
		].some((prop) => keys.includes(prop))) return value;
		if (keys[keys.length - 1].toLowerCase().includes("opacity")) return value;
		return `${value}px`;
	}
	return value;
};
function cssVarsParser(theme, options) {
	const { prefix: prefix$1, shouldSkipGeneratingVar: shouldSkipGeneratingVar$1 } = options || {};
	const css$1 = {};
	const vars = {};
	const varsWithDefaults = {};
	walkObjectDeep(theme, (keys, value, arrayKeys) => {
		if (typeof value === "string" || typeof value === "number") {
			if (!shouldSkipGeneratingVar$1 || !shouldSkipGeneratingVar$1(keys, value)) {
				const cssVar = `--${prefix$1 ? `${prefix$1}-` : ""}${keys.join("-")}`;
				const resolvedValue = getCssValue(keys, value);
				Object.assign(css$1, { [cssVar]: resolvedValue });
				assignNestedKeys(vars, keys, `var(${cssVar})`, arrayKeys);
				assignNestedKeys(varsWithDefaults, keys, `var(${cssVar}, ${resolvedValue})`, arrayKeys);
			}
		}
	}, (keys) => keys[0] === "vars");
	return {
		css: css$1,
		vars,
		varsWithDefaults
	};
}
function prepareCssVars(theme, parserConfig = {}) {
	const { getSelector = defaultGetSelector, disableCssColorScheme, colorSchemeSelector: selector, enableContrastVars } = parserConfig;
	const { colorSchemes = {}, components, defaultColorScheme = "light",...otherTheme } = theme;
	const { vars: rootVars, css: rootCss, varsWithDefaults: rootVarsWithDefaults } = cssVarsParser(otherTheme, parserConfig);
	let themeVars = rootVarsWithDefaults;
	const colorSchemesMap = {};
	const { [defaultColorScheme]: defaultScheme,...otherColorSchemes } = colorSchemes;
	Object.entries(otherColorSchemes || {}).forEach(([key, scheme]) => {
		const { vars, css: css$1, varsWithDefaults } = cssVarsParser(scheme, parserConfig);
		themeVars = deepmerge(themeVars, varsWithDefaults);
		colorSchemesMap[key] = {
			css: css$1,
			vars
		};
	});
	if (defaultScheme) {
		const { css: css$1, vars, varsWithDefaults } = cssVarsParser(defaultScheme, parserConfig);
		themeVars = deepmerge(themeVars, varsWithDefaults);
		colorSchemesMap[defaultColorScheme] = {
			css: css$1,
			vars
		};
	}
	function defaultGetSelector(colorScheme, cssObject) {
		let rule = selector;
		if (selector === "class") rule = ".%s";
		if (selector === "data") rule = "[data-%s]";
		if (selector?.startsWith("data-") && !selector.includes("%s")) rule = `[${selector}="%s"]`;
		if (colorScheme) {
			if (rule === "media") {
				if (theme.defaultColorScheme === colorScheme) return ":root";
				return { [`@media (prefers-color-scheme: ${colorSchemes[colorScheme]?.palette?.mode || colorScheme})`]: { ":root": cssObject } };
			}
			if (rule) {
				if (theme.defaultColorScheme === colorScheme) return `:root, ${rule.replace("%s", String(colorScheme))}`;
				return rule.replace("%s", String(colorScheme));
			}
		}
		return ":root";
	}
	const generateThemeVars = () => {
		let vars = { ...rootVars };
		Object.entries(colorSchemesMap).forEach(([, { vars: schemeVars }]) => {
			vars = deepmerge(vars, schemeVars);
		});
		return vars;
	};
	const generateStyleSheets = () => {
		const stylesheets = [];
		const colorScheme = theme.defaultColorScheme || "light";
		function insertStyleSheet(key, css$1) {
			if (Object.keys(css$1).length) stylesheets.push(typeof key === "string" ? { [key]: { ...css$1 } } : key);
		}
		insertStyleSheet(getSelector(void 0, { ...rootCss }), rootCss);
		const { [colorScheme]: defaultSchemeVal,...other } = colorSchemesMap;
		if (defaultSchemeVal) {
			const { css: css$1 } = defaultSchemeVal;
			const cssColorSheme = colorSchemes[colorScheme]?.palette?.mode;
			const finalCss = !disableCssColorScheme && cssColorSheme ? {
				colorScheme: cssColorSheme,
				...css$1
			} : { ...css$1 };
			insertStyleSheet(getSelector(colorScheme, { ...finalCss }), finalCss);
		}
		Object.entries(other).forEach(([key, { css: css$1 }]) => {
			const cssColorSheme = colorSchemes[key]?.palette?.mode;
			const finalCss = !disableCssColorScheme && cssColorSheme ? {
				colorScheme: cssColorSheme,
				...css$1
			} : { ...css$1 };
			insertStyleSheet(getSelector(key, { ...finalCss }), finalCss);
		});
		if (enableContrastVars) stylesheets.push({ ":root": {
			"--__l-threshold": "0.7",
			"--__l": "clamp(0, (l / var(--__l-threshold) - 1) * -infinity, 1)",
			"--__a": "clamp(0.87, (l / var(--__l-threshold) - 1) * -infinity, 1)"
		} });
		return stylesheets;
	};
	return {
		vars: themeVars,
		generateThemeVars,
		generateStyleSheets
	};
}
var prepareCssVars_default = prepareCssVars;
function createGetColorSchemeSelector(selector) {
	return function getColorSchemeSelector(colorScheme) {
		if (selector === "media") return `@media (prefers-color-scheme: ${colorScheme})`;
		if (selector) {
			if (selector.startsWith("data-") && !selector.includes("%s")) return `[${selector}="${colorScheme}"] &`;
			if (selector === "class") return `.${colorScheme} &`;
			if (selector === "data") return `[data-${colorScheme}] &`;
			return `${selector.replace("%s", colorScheme)} &`;
		}
		return "&";
	};
}
function composeClasses(slots, getUtilityClass, classes = void 0) {
	const output = {};
	for (const slotName in slots) {
		const slot = slots[slotName];
		let buffer = "";
		let start = true;
		for (let i = 0; i < slot.length; i += 1) {
			const value = slot[i];
			if (value) {
				buffer += (start === true ? "" : " ") + getUtilityClass(value);
				start = false;
				if (classes && classes[value]) buffer += " " + classes[value];
			}
		}
		output[slotName] = buffer;
	}
	return output;
}
var defaultTheme$3 = createTheme_default();
var defaultCreateStyledComponent$1 = styled_default$1("div", {
	name: "MuiContainer",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.root,
			styles$4[`maxWidth${capitalize(String(ownerState.maxWidth))}`],
			ownerState.fixed && styles$4.fixed,
			ownerState.disableGutters && styles$4.disableGutters
		];
	}
});
var useThemePropsDefault$1 = (inProps) => useThemeProps({
	props: inProps,
	name: "MuiContainer",
	defaultTheme: defaultTheme$3
});
var useUtilityClasses$37 = (ownerState, componentName) => {
	const getContainerUtilityClass = (slot) => {
		return generateUtilityClass(componentName, slot);
	};
	const { classes, fixed, disableGutters, maxWidth: maxWidth$1 } = ownerState;
	const slots = { root: [
		"root",
		maxWidth$1 && `maxWidth${capitalize(String(maxWidth$1))}`,
		fixed && "fixed",
		disableGutters && "disableGutters"
	] };
	return composeClasses(slots, getContainerUtilityClass, classes);
};
function createContainer(options = {}) {
	const { createStyledComponent = defaultCreateStyledComponent$1, useThemeProps: useThemeProps$1 = useThemePropsDefault$1, componentName = "MuiContainer" } = options;
	const ContainerRoot = createStyledComponent(({ theme, ownerState }) => ({
		width: "100%",
		marginLeft: "auto",
		boxSizing: "border-box",
		marginRight: "auto",
		...!ownerState.disableGutters && {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
			[theme.breakpoints.up("sm")]: {
				paddingLeft: theme.spacing(3),
				paddingRight: theme.spacing(3)
			}
		}
	}), ({ theme, ownerState }) => ownerState.fixed && Object.keys(theme.breakpoints.values).reduce((acc, breakpointValueKey) => {
		const breakpoint = breakpointValueKey;
		const value = theme.breakpoints.values[breakpoint];
		if (value !== 0) acc[theme.breakpoints.up(breakpoint)] = { maxWidth: `${value}${theme.breakpoints.unit}` };
		return acc;
	}, {}), ({ theme, ownerState }) => ({
		...ownerState.maxWidth === "xs" && { [theme.breakpoints.up("xs")]: { maxWidth: Math.max(theme.breakpoints.values.xs, 444) } },
		...ownerState.maxWidth && ownerState.maxWidth !== "xs" && { [theme.breakpoints.up(ownerState.maxWidth)]: { maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}` } }
	}));
	return /* @__PURE__ */ import_react.forwardRef(function Container$1(inProps, ref) {
		const props = useThemeProps$1(inProps);
		const { className, component = "div", disableGutters = false, fixed = false, maxWidth: maxWidth$1 = "lg", classes: classesProp,...other } = props;
		const ownerState = {
			...props,
			component,
			disableGutters,
			fixed,
			maxWidth: maxWidth$1
		};
		const classes = useUtilityClasses$37(ownerState, componentName);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContainerRoot, {
			as: component,
			ownerState,
			className: clsx_default(classes.root, className),
			ref,
			...other
		});
	});
}
function isMuiElement(element, muiNames) {
	return /* @__PURE__ */ import_react.isValidElement(element) && muiNames.indexOf(element.type.muiName ?? element.type?._payload?.value?.muiName) !== -1;
}
var defaultTheme$2 = createTheme_default();
var defaultCreateStyledComponent = styled_default$1("div", {
	name: "MuiStack",
	slot: "Root"
});
function useThemePropsDefault(props) {
	return useThemeProps({
		props,
		name: "MuiStack",
		defaultTheme: defaultTheme$2
	});
}
function joinChildren(children, separator) {
	const childrenArray = import_react.Children.toArray(children).filter(Boolean);
	return childrenArray.reduce((output, child, index) => {
		output.push(child);
		if (index < childrenArray.length - 1) output.push(/* @__PURE__ */ import_react.cloneElement(separator, { key: `separator-${index}` }));
		return output;
	}, []);
}
var getSideFromDirection = (direction) => {
	return {
		row: "Left",
		"row-reverse": "Right",
		column: "Top",
		"column-reverse": "Bottom"
	}[direction];
};
const style = ({ ownerState, theme }) => {
	let styles$4 = {
		display: "flex",
		flexDirection: "column",
		...handleBreakpoints({ theme }, resolveBreakpointValues({
			values: ownerState.direction,
			breakpoints: theme.breakpoints.values
		}), (propValue) => ({ flexDirection: propValue }))
	};
	if (ownerState.spacing) {
		const transformer = createUnarySpacing(theme);
		const base = Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
			if (typeof ownerState.spacing === "object" && ownerState.spacing[breakpoint] != null || typeof ownerState.direction === "object" && ownerState.direction[breakpoint] != null) acc[breakpoint] = true;
			return acc;
		}, {});
		const directionValues = resolveBreakpointValues({
			values: ownerState.direction,
			base
		});
		const spacingValues = resolveBreakpointValues({
			values: ownerState.spacing,
			base
		});
		if (typeof directionValues === "object") Object.keys(directionValues).forEach((breakpoint, index, breakpoints) => {
			if (!directionValues[breakpoint]) directionValues[breakpoint] = index > 0 ? directionValues[breakpoints[index - 1]] : "column";
		});
		const styleFromPropValue = (propValue, breakpoint) => {
			if (ownerState.useFlexGap) return { gap: getValue(transformer, propValue) };
			return {
				"& > :not(style):not(style)": { margin: 0 },
				"& > :not(style) ~ :not(style)": { [`margin${getSideFromDirection(breakpoint ? directionValues[breakpoint] : ownerState.direction)}`]: getValue(transformer, propValue) }
			};
		};
		styles$4 = deepmerge(styles$4, handleBreakpoints({ theme }, spacingValues, styleFromPropValue));
	}
	styles$4 = mergeBreakpointsInOrder(theme.breakpoints, styles$4);
	return styles$4;
};
function createStack(options = {}) {
	const { createStyledComponent = defaultCreateStyledComponent, useThemeProps: useThemeProps$1 = useThemePropsDefault, componentName = "MuiStack" } = options;
	const useUtilityClasses$38 = () => {
		return composeClasses({ root: ["root"] }, (slot) => generateUtilityClass(componentName, slot), {});
	};
	const StackRoot = createStyledComponent(style);
	return /* @__PURE__ */ import_react.forwardRef(function Grid(inProps, ref) {
		const themeProps = useThemeProps$1(inProps);
		const { component = "div", direction = "column", spacing: spacing$1 = 0, divider, children, className, useFlexGap = false,...other } = extendSxProp$1(themeProps);
		const ownerState = {
			direction,
			spacing: spacing$1,
			useFlexGap
		};
		const classes = useUtilityClasses$38();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StackRoot, {
			as: component,
			ownerState,
			ref,
			className: clsx_default(classes.root, className),
			...other,
			children: divider ? joinChildren(children, divider) : children
		});
	});
}
function getLight() {
	return {
		text: {
			primary: "rgba(0, 0, 0, 0.87)",
			secondary: "rgba(0, 0, 0, 0.6)",
			disabled: "rgba(0, 0, 0, 0.38)"
		},
		divider: "rgba(0, 0, 0, 0.12)",
		background: {
			paper: common_default.white,
			default: common_default.white
		},
		action: {
			active: "rgba(0, 0, 0, 0.54)",
			hover: "rgba(0, 0, 0, 0.04)",
			hoverOpacity: .04,
			selected: "rgba(0, 0, 0, 0.08)",
			selectedOpacity: .08,
			disabled: "rgba(0, 0, 0, 0.26)",
			disabledBackground: "rgba(0, 0, 0, 0.12)",
			disabledOpacity: .38,
			focus: "rgba(0, 0, 0, 0.12)",
			focusOpacity: .12,
			activatedOpacity: .12
		}
	};
}
const light = getLight();
function getDark() {
	return {
		text: {
			primary: common_default.white,
			secondary: "rgba(255, 255, 255, 0.7)",
			disabled: "rgba(255, 255, 255, 0.5)",
			icon: "rgba(255, 255, 255, 0.5)"
		},
		divider: "rgba(255, 255, 255, 0.12)",
		background: {
			paper: "#121212",
			default: "#121212"
		},
		action: {
			active: common_default.white,
			hover: "rgba(255, 255, 255, 0.08)",
			hoverOpacity: .08,
			selected: "rgba(255, 255, 255, 0.16)",
			selectedOpacity: .16,
			disabled: "rgba(255, 255, 255, 0.3)",
			disabledBackground: "rgba(255, 255, 255, 0.12)",
			disabledOpacity: .38,
			focus: "rgba(255, 255, 255, 0.12)",
			focusOpacity: .12,
			activatedOpacity: .24
		}
	};
}
const dark = getDark();
function addLightOrDark(intent, direction, shade, tonalOffset) {
	const tonalOffsetLight = tonalOffset.light || tonalOffset;
	const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
	if (!intent[direction]) {
		if (intent.hasOwnProperty(shade)) intent[direction] = intent[shade];
		else if (direction === "light") intent.light = lighten(intent.main, tonalOffsetLight);
		else if (direction === "dark") intent.dark = darken(intent.main, tonalOffsetDark);
	}
}
function mixLightOrDark(colorSpace, intent, direction, shade, tonalOffset) {
	const tonalOffsetLight = tonalOffset.light || tonalOffset;
	const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
	if (!intent[direction]) {
		if (intent.hasOwnProperty(shade)) intent[direction] = intent[shade];
		else if (direction === "light") intent.light = `color-mix(in ${colorSpace}, ${intent.main}, #fff ${(tonalOffsetLight * 100).toFixed(0)}%)`;
		else if (direction === "dark") intent.dark = `color-mix(in ${colorSpace}, ${intent.main}, #000 ${(tonalOffsetDark * 100).toFixed(0)}%)`;
	}
}
function getDefaultPrimary(mode = "light") {
	if (mode === "dark") return {
		main: blue_default[200],
		light: blue_default[50],
		dark: blue_default[400]
	};
	return {
		main: blue_default[700],
		light: blue_default[400],
		dark: blue_default[800]
	};
}
function getDefaultSecondary(mode = "light") {
	if (mode === "dark") return {
		main: purple_default[200],
		light: purple_default[50],
		dark: purple_default[400]
	};
	return {
		main: purple_default[500],
		light: purple_default[300],
		dark: purple_default[700]
	};
}
function getDefaultError(mode = "light") {
	if (mode === "dark") return {
		main: red_default[500],
		light: red_default[300],
		dark: red_default[700]
	};
	return {
		main: red_default[700],
		light: red_default[400],
		dark: red_default[800]
	};
}
function getDefaultInfo(mode = "light") {
	if (mode === "dark") return {
		main: lightBlue_default[400],
		light: lightBlue_default[300],
		dark: lightBlue_default[700]
	};
	return {
		main: lightBlue_default[700],
		light: lightBlue_default[500],
		dark: lightBlue_default[900]
	};
}
function getDefaultSuccess(mode = "light") {
	if (mode === "dark") return {
		main: green_default[400],
		light: green_default[300],
		dark: green_default[700]
	};
	return {
		main: green_default[800],
		light: green_default[500],
		dark: green_default[900]
	};
}
function getDefaultWarning(mode = "light") {
	if (mode === "dark") return {
		main: orange_default[400],
		light: orange_default[300],
		dark: orange_default[700]
	};
	return {
		main: "#ed6c02",
		light: orange_default[500],
		dark: orange_default[900]
	};
}
function contrastColor(background) {
	return `oklch(from ${background} var(--__l) 0 h / var(--__a))`;
}
function createPalette(palette$1) {
	const { mode = "light", contrastThreshold = 3, tonalOffset = .2, colorSpace,...other } = palette$1;
	const primary = palette$1.primary || getDefaultPrimary(mode);
	const secondary = palette$1.secondary || getDefaultSecondary(mode);
	const error = palette$1.error || getDefaultError(mode);
	const info = palette$1.info || getDefaultInfo(mode);
	const success = palette$1.success || getDefaultSuccess(mode);
	const warning = palette$1.warning || getDefaultWarning(mode);
	function getContrastText(background) {
		if (colorSpace) return contrastColor(background);
		return getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
	}
	const augmentColor = ({ color: color$1, name, mainShade = 500, lightShade = 300, darkShade = 700 }) => {
		color$1 = { ...color$1 };
		if (!color$1.main && color$1[mainShade]) color$1.main = color$1[mainShade];
		if (!color$1.hasOwnProperty("main")) throw new Error(formatMuiErrorMessage(11, name ? ` (${name})` : "", mainShade));
		if (typeof color$1.main !== "string") throw new Error(formatMuiErrorMessage(12, name ? ` (${name})` : "", JSON.stringify(color$1.main)));
		if (colorSpace) {
			mixLightOrDark(colorSpace, color$1, "light", lightShade, tonalOffset);
			mixLightOrDark(colorSpace, color$1, "dark", darkShade, tonalOffset);
		} else {
			addLightOrDark(color$1, "light", lightShade, tonalOffset);
			addLightOrDark(color$1, "dark", darkShade, tonalOffset);
		}
		if (!color$1.contrastText) color$1.contrastText = getContrastText(color$1.main);
		return color$1;
	};
	let modeHydrated;
	if (mode === "light") modeHydrated = getLight();
	else if (mode === "dark") modeHydrated = getDark();
	return deepmerge({
		common: { ...common_default },
		mode,
		primary: augmentColor({
			color: primary,
			name: "primary"
		}),
		secondary: augmentColor({
			color: secondary,
			name: "secondary",
			mainShade: "A400",
			lightShade: "A200",
			darkShade: "A700"
		}),
		error: augmentColor({
			color: error,
			name: "error"
		}),
		warning: augmentColor({
			color: warning,
			name: "warning"
		}),
		info: augmentColor({
			color: info,
			name: "info"
		}),
		success: augmentColor({
			color: success,
			name: "success"
		}),
		grey: grey_default,
		contrastThreshold,
		getContrastText,
		augmentColor,
		tonalOffset,
		...modeHydrated
	}, other);
}
function prepareTypographyVars(typography) {
	const vars = {};
	Object.entries(typography).forEach((entry) => {
		const [key, value] = entry;
		if (typeof value === "object") vars[key] = `${value.fontStyle ? `${value.fontStyle} ` : ""}${value.fontVariant ? `${value.fontVariant} ` : ""}${value.fontWeight ? `${value.fontWeight} ` : ""}${value.fontStretch ? `${value.fontStretch} ` : ""}${value.fontSize || ""}${value.lineHeight ? `/${value.lineHeight} ` : ""}${value.fontFamily || ""}`;
	});
	return vars;
}
function createMixins(breakpoints, mixins) {
	return {
		toolbar: {
			minHeight: 56,
			[breakpoints.up("xs")]: { "@media (orientation: landscape)": { minHeight: 48 } },
			[breakpoints.up("sm")]: { minHeight: 64 }
		},
		...mixins
	};
}
function round(value) {
	return Math.round(value * 1e5) / 1e5;
}
var caseAllCaps = { textTransform: "uppercase" };
var defaultFontFamily = "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif";
function createTypography(palette$1, typography) {
	const { fontFamily = defaultFontFamily, fontSize = 14, fontWeightLight = 300, fontWeightRegular = 400, fontWeightMedium = 500, fontWeightBold = 700, htmlFontSize = 16, allVariants, pxToRem: pxToRem2,...other } = typeof typography === "function" ? typography(palette$1) : typography;
	const coef = fontSize / 14;
	const pxToRem = pxToRem2 || ((size) => `${size / htmlFontSize * coef}rem`);
	const buildVariant = (fontWeight, size, lineHeight, letterSpacing, casing) => ({
		fontFamily,
		fontWeight,
		fontSize: pxToRem(size),
		lineHeight,
		...fontFamily === defaultFontFamily ? { letterSpacing: `${round(letterSpacing / size)}em` } : {},
		...casing,
		...allVariants
	});
	const variants = {
		h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
		h2: buildVariant(fontWeightLight, 60, 1.2, -.5),
		h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
		h4: buildVariant(fontWeightRegular, 34, 1.235, .25),
		h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
		h6: buildVariant(fontWeightMedium, 20, 1.6, .15),
		subtitle1: buildVariant(fontWeightRegular, 16, 1.75, .15),
		subtitle2: buildVariant(fontWeightMedium, 14, 1.57, .1),
		body1: buildVariant(fontWeightRegular, 16, 1.5, .15),
		body2: buildVariant(fontWeightRegular, 14, 1.43, .15),
		button: buildVariant(fontWeightMedium, 14, 1.75, .4, caseAllCaps),
		caption: buildVariant(fontWeightRegular, 12, 1.66, .4),
		overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps),
		inherit: {
			fontFamily: "inherit",
			fontWeight: "inherit",
			fontSize: "inherit",
			lineHeight: "inherit",
			letterSpacing: "inherit"
		}
	};
	return deepmerge({
		htmlFontSize,
		pxToRem,
		fontFamily,
		fontSize,
		fontWeightLight,
		fontWeightRegular,
		fontWeightMedium,
		fontWeightBold,
		...variants
	}, other, { clone: false });
}
var shadowKeyUmbraOpacity = .2;
var shadowKeyPenumbraOpacity = .14;
var shadowAmbientShadowOpacity = .12;
function createShadow(...px) {
	return [
		`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`,
		`${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`,
		`${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`
	].join(",");
}
var shadows_default = [
	"none",
	createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
	createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
	createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
	createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
	createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
	createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
	createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
	createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
	createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
	createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
	createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
	createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
	createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
	createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
	createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
	createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
	createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
	createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
	createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
	createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
	createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
	createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
	createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
	createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)
];
const easing = {
	easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
	easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
	easeIn: "cubic-bezier(0.4, 0, 1, 1)",
	sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
};
const duration = {
	shortest: 150,
	shorter: 200,
	short: 250,
	standard: 300,
	complex: 375,
	enteringScreen: 225,
	leavingScreen: 195
};
function formatMs(milliseconds) {
	return `${Math.round(milliseconds)}ms`;
}
function getAutoHeightDuration(height$1) {
	if (!height$1) return 0;
	const constant = height$1 / 36;
	return Math.min(Math.round((4 + 15 * constant ** .25 + constant / 5) * 10), 3e3);
}
function createTransitions(inputTransitions) {
	const mergedEasing = {
		...easing,
		...inputTransitions.easing
	};
	const mergedDuration = {
		...duration,
		...inputTransitions.duration
	};
	const create = (props = ["all"], options = {}) => {
		const { duration: durationOption = mergedDuration.standard, easing: easingOption = mergedEasing.easeInOut, delay = 0,...other } = options;
		return (Array.isArray(props) ? props : [props]).map((animatedProp) => `${animatedProp} ${typeof durationOption === "string" ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === "string" ? delay : formatMs(delay)}`).join(",");
	};
	return {
		getAutoHeightDuration,
		create,
		...inputTransitions,
		easing: mergedEasing,
		duration: mergedDuration
	};
}
var zIndex_default = {
	mobileStepper: 1e3,
	fab: 1050,
	speedDial: 1050,
	appBar: 1100,
	drawer: 1200,
	modal: 1300,
	snackbar: 1400,
	tooltip: 1500
};
function isSerializable(val) {
	return isPlainObject(val) || typeof val === "undefined" || typeof val === "string" || typeof val === "boolean" || typeof val === "number" || Array.isArray(val);
}
function stringifyTheme(baseTheme = {}) {
	const serializableTheme = { ...baseTheme };
	function serializeTheme(object) {
		const array = Object.entries(object);
		for (let index = 0; index < array.length; index++) {
			const [key, value] = array[index];
			if (!isSerializable(value) || key.startsWith("unstable_")) delete object[key];
			else if (isPlainObject(value)) {
				object[key] = { ...value };
				serializeTheme(object[key]);
			}
		}
	}
	serializeTheme(serializableTheme);
	return `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(serializableTheme, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
function coefficientToPercentage(coefficient) {
	if (typeof coefficient === "number") return `${(coefficient * 100).toFixed(0)}%`;
	return `calc((${coefficient}) * 100%)`;
}
var parseAddition = (str) => {
	if (!Number.isNaN(+str)) return +str;
	const numbers = str.match(/\d*\.?\d+/g);
	if (!numbers) return 0;
	let sum = 0;
	for (let i = 0; i < numbers.length; i += 1) sum += +numbers[i];
	return sum;
};
function attachColorManipulators(theme) {
	Object.assign(theme, {
		alpha(color$1, coefficient) {
			const obj = this || theme;
			if (obj.colorSpace) return `oklch(from ${color$1} l c h / ${typeof coefficient === "string" ? `calc(${coefficient})` : coefficient})`;
			if (obj.vars) return `rgba(${color$1.replace(/var\(--([^,\s)]+)(?:,[^)]+)?\)+/g, "var(--$1Channel)")} / ${typeof coefficient === "string" ? `calc(${coefficient})` : coefficient})`;
			return alpha(color$1, parseAddition(coefficient));
		},
		lighten(color$1, coefficient) {
			const obj = this || theme;
			if (obj.colorSpace) return `color-mix(in ${obj.colorSpace}, ${color$1}, #fff ${coefficientToPercentage(coefficient)})`;
			return lighten(color$1, coefficient);
		},
		darken(color$1, coefficient) {
			const obj = this || theme;
			if (obj.colorSpace) return `color-mix(in ${obj.colorSpace}, ${color$1}, #000 ${coefficientToPercentage(coefficient)})`;
			return darken(color$1, coefficient);
		}
	});
}
function createThemeNoVars(options = {}, ...args) {
	const { breakpoints: breakpointsInput, mixins: mixinsInput = {}, spacing: spacingInput, palette: paletteInput = {}, transitions: transitionsInput = {}, typography: typographyInput = {}, shape: shapeInput, colorSpace,...other } = options;
	if (options.vars && options.generateThemeVars === void 0) throw new Error(formatMuiErrorMessage(20));
	const palette$1 = createPalette({
		...paletteInput,
		colorSpace
	});
	const systemTheme = createTheme_default(options);
	let muiTheme = deepmerge(systemTheme, {
		mixins: createMixins(systemTheme.breakpoints, mixinsInput),
		palette: palette$1,
		shadows: shadows_default.slice(),
		typography: createTypography(palette$1, typographyInput),
		transitions: createTransitions(transitionsInput),
		zIndex: { ...zIndex_default }
	});
	muiTheme = deepmerge(muiTheme, other);
	muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
	muiTheme.unstable_sxConfig = {
		...defaultSxConfig_default,
		...other?.unstable_sxConfig
	};
	muiTheme.unstable_sx = function sx(props) {
		return styleFunctionSx_default({
			sx: props,
			theme: this
		});
	};
	muiTheme.toRuntimeSource = stringifyTheme;
	attachColorManipulators(muiTheme);
	return muiTheme;
}
var createThemeNoVars_default = createThemeNoVars;
function getOverlayAlpha(elevation) {
	let alphaValue;
	if (elevation < 1) alphaValue = 5.11916 * elevation ** 2;
	else alphaValue = 4.5 * Math.log(elevation + 1) + 2;
	return Math.round(alphaValue * 10) / 1e3;
}
var defaultDarkOverlays = [...Array(25)].map((_, index) => {
	if (index === 0) return "none";
	const overlay = getOverlayAlpha(index);
	return `linear-gradient(rgba(255 255 255 / ${overlay}), rgba(255 255 255 / ${overlay}))`;
});
function getOpacity(mode) {
	return {
		inputPlaceholder: mode === "dark" ? .5 : .42,
		inputUnderline: mode === "dark" ? .7 : .42,
		switchTrackDisabled: mode === "dark" ? .2 : .12,
		switchTrack: mode === "dark" ? .3 : .38
	};
}
function getOverlays(mode) {
	return mode === "dark" ? defaultDarkOverlays : [];
}
function createColorScheme(options) {
	const { palette: paletteInput = { mode: "light" }, opacity, overlays, colorSpace,...other } = options;
	const palette$1 = createPalette({
		...paletteInput,
		colorSpace
	});
	return {
		palette: palette$1,
		opacity: {
			...getOpacity(palette$1.mode),
			...opacity
		},
		overlays: overlays || getOverlays(palette$1.mode),
		...other
	};
}
function shouldSkipGeneratingVar(keys) {
	return !!keys[0].match(/(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!keys[0].match(/sxConfig$/) || keys[0] === "palette" && !!keys[1]?.match(/(mode|contrastThreshold|tonalOffset)/);
}
var excludeVariablesFromRoot = (cssVarPrefix) => [
	...[...Array(25)].map((_, index) => `--${cssVarPrefix ? `${cssVarPrefix}-` : ""}overlays-${index}`),
	`--${cssVarPrefix ? `${cssVarPrefix}-` : ""}palette-AppBar-darkBg`,
	`--${cssVarPrefix ? `${cssVarPrefix}-` : ""}palette-AppBar-darkColor`
];
var excludeVariablesFromRoot_default = excludeVariablesFromRoot;
var createGetSelector_default = (theme) => (colorScheme, css$1) => {
	const root = theme.rootSelector || ":root";
	const selector = theme.colorSchemeSelector;
	let rule = selector;
	if (selector === "class") rule = ".%s";
	if (selector === "data") rule = "[data-%s]";
	if (selector?.startsWith("data-") && !selector.includes("%s")) rule = `[${selector}="%s"]`;
	if (theme.defaultColorScheme === colorScheme) {
		if (colorScheme === "dark") {
			const excludedVariables = {};
			excludeVariablesFromRoot_default(theme.cssVarPrefix).forEach((cssVar) => {
				excludedVariables[cssVar] = css$1[cssVar];
				delete css$1[cssVar];
			});
			if (rule === "media") return {
				[root]: css$1,
				[`@media (prefers-color-scheme: dark)`]: { [root]: excludedVariables }
			};
			if (rule) return {
				[rule.replace("%s", colorScheme)]: excludedVariables,
				[`${root}, ${rule.replace("%s", colorScheme)}`]: css$1
			};
			return { [root]: {
				...css$1,
				...excludedVariables
			} };
		}
		if (rule && rule !== "media") return `${root}, ${rule.replace("%s", String(colorScheme))}`;
	} else if (colorScheme) {
		if (rule === "media") return { [`@media (prefers-color-scheme: ${String(colorScheme)})`]: { [root]: css$1 } };
		if (rule) return rule.replace("%s", String(colorScheme));
	}
	return root;
};
function assignNode(obj, keys) {
	keys.forEach((k$1) => {
		if (!obj[k$1]) obj[k$1] = {};
	});
}
function setColor(obj, key, defaultValue) {
	if (!obj[key] && defaultValue) obj[key] = defaultValue;
}
function toRgb(color$1) {
	if (typeof color$1 !== "string" || !color$1.startsWith("hsl")) return color$1;
	return hslToRgb(color$1);
}
function setColorChannel(obj, key) {
	if (!(`${key}Channel` in obj)) obj[`${key}Channel`] = private_safeColorChannel(toRgb(obj[key]), `MUI: Can't create \`palette.${key}Channel\` because \`palette.${key}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${key}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`);
}
function getSpacingVal(spacingInput) {
	if (typeof spacingInput === "number") return `${spacingInput}px`;
	if (typeof spacingInput === "string" || typeof spacingInput === "function" || Array.isArray(spacingInput)) return spacingInput;
	return "8px";
}
var silent = (fn) => {
	try {
		return fn();
	} catch (error) {}
};
const createGetCssVar$1 = (cssVarPrefix = "mui") => createGetCssVar(cssVarPrefix);
function attachColorScheme$1(colorSpace, colorSchemes, scheme, restTheme, colorScheme) {
	if (!scheme) return;
	scheme = scheme === true ? {} : scheme;
	const mode = colorScheme === "dark" ? "dark" : "light";
	if (!restTheme) {
		colorSchemes[colorScheme] = createColorScheme({
			...scheme,
			palette: {
				mode,
				...scheme?.palette
			},
			colorSpace
		});
		return;
	}
	const { palette: palette$1,...muiTheme } = createThemeNoVars_default({
		...restTheme,
		palette: {
			mode,
			...scheme?.palette
		},
		colorSpace
	});
	colorSchemes[colorScheme] = {
		...scheme,
		palette: palette$1,
		opacity: {
			...getOpacity(mode),
			...scheme?.opacity
		},
		overlays: scheme?.overlays || getOverlays(mode)
	};
	return muiTheme;
}
function createThemeWithVars(options = {}, ...args) {
	const { colorSchemes: colorSchemesInput = { light: true }, defaultColorScheme: defaultColorSchemeInput, disableCssColorScheme = false, cssVarPrefix = "mui", nativeColor = false, shouldSkipGeneratingVar: shouldSkipGeneratingVar$1 = shouldSkipGeneratingVar, colorSchemeSelector: selector = colorSchemesInput.light && colorSchemesInput.dark ? "media" : void 0, rootSelector = ":root",...input } = options;
	const firstColorScheme = Object.keys(colorSchemesInput)[0];
	const defaultColorScheme = defaultColorSchemeInput || (colorSchemesInput.light && firstColorScheme !== "light" ? "light" : firstColorScheme);
	const getCssVar = createGetCssVar$1(cssVarPrefix);
	const { [defaultColorScheme]: defaultSchemeInput, light: builtInLight, dark: builtInDark,...customColorSchemes } = colorSchemesInput;
	const colorSchemes = { ...customColorSchemes };
	let defaultScheme = defaultSchemeInput;
	if (defaultColorScheme === "dark" && !("dark" in colorSchemesInput) || defaultColorScheme === "light" && !("light" in colorSchemesInput)) defaultScheme = true;
	if (!defaultScheme) throw new Error(formatMuiErrorMessage(21, defaultColorScheme));
	let colorSpace;
	if (nativeColor) colorSpace = "oklch";
	const muiTheme = attachColorScheme$1(colorSpace, colorSchemes, defaultScheme, input, defaultColorScheme);
	if (builtInLight && !colorSchemes.light) attachColorScheme$1(colorSpace, colorSchemes, builtInLight, void 0, "light");
	if (builtInDark && !colorSchemes.dark) attachColorScheme$1(colorSpace, colorSchemes, builtInDark, void 0, "dark");
	let theme = {
		defaultColorScheme,
		...muiTheme,
		cssVarPrefix,
		colorSchemeSelector: selector,
		rootSelector,
		getCssVar,
		colorSchemes,
		font: {
			...prepareTypographyVars(muiTheme.typography),
			...muiTheme.font
		},
		spacing: getSpacingVal(input.spacing)
	};
	Object.keys(theme.colorSchemes).forEach((key) => {
		const palette$1 = theme.colorSchemes[key].palette;
		const setCssVarColor = (cssVar) => {
			const tokens = cssVar.split("-");
			const color$1 = tokens[1];
			const colorToken = tokens[2];
			return getCssVar(cssVar, palette$1[color$1][colorToken]);
		};
		if (palette$1.mode === "light") {
			setColor(palette$1.common, "background", "#fff");
			setColor(palette$1.common, "onBackground", "#000");
		}
		if (palette$1.mode === "dark") {
			setColor(palette$1.common, "background", "#000");
			setColor(palette$1.common, "onBackground", "#fff");
		}
		function colorMix(method, color$1, coefficient) {
			if (colorSpace) {
				let mixer;
				if (method === private_safeAlpha) mixer = `transparent ${((1 - coefficient) * 100).toFixed(0)}%`;
				if (method === private_safeDarken) mixer = `#000 ${(coefficient * 100).toFixed(0)}%`;
				if (method === private_safeLighten) mixer = `#fff ${(coefficient * 100).toFixed(0)}%`;
				return `color-mix(in ${colorSpace}, ${color$1}, ${mixer})`;
			}
			return method(color$1, coefficient);
		}
		assignNode(palette$1, [
			"Alert",
			"AppBar",
			"Avatar",
			"Button",
			"Chip",
			"FilledInput",
			"LinearProgress",
			"Skeleton",
			"Slider",
			"SnackbarContent",
			"SpeedDialAction",
			"StepConnector",
			"StepContent",
			"Switch",
			"TableCell",
			"Tooltip"
		]);
		if (palette$1.mode === "light") {
			setColor(palette$1.Alert, "errorColor", colorMix(private_safeDarken, palette$1.error.light, .6));
			setColor(palette$1.Alert, "infoColor", colorMix(private_safeDarken, palette$1.info.light, .6));
			setColor(palette$1.Alert, "successColor", colorMix(private_safeDarken, palette$1.success.light, .6));
			setColor(palette$1.Alert, "warningColor", colorMix(private_safeDarken, palette$1.warning.light, .6));
			setColor(palette$1.Alert, "errorFilledBg", setCssVarColor("palette-error-main"));
			setColor(palette$1.Alert, "infoFilledBg", setCssVarColor("palette-info-main"));
			setColor(palette$1.Alert, "successFilledBg", setCssVarColor("palette-success-main"));
			setColor(palette$1.Alert, "warningFilledBg", setCssVarColor("palette-warning-main"));
			setColor(palette$1.Alert, "errorFilledColor", silent(() => palette$1.getContrastText(palette$1.error.main)));
			setColor(palette$1.Alert, "infoFilledColor", silent(() => palette$1.getContrastText(palette$1.info.main)));
			setColor(palette$1.Alert, "successFilledColor", silent(() => palette$1.getContrastText(palette$1.success.main)));
			setColor(palette$1.Alert, "warningFilledColor", silent(() => palette$1.getContrastText(palette$1.warning.main)));
			setColor(palette$1.Alert, "errorStandardBg", colorMix(private_safeLighten, palette$1.error.light, .9));
			setColor(palette$1.Alert, "infoStandardBg", colorMix(private_safeLighten, palette$1.info.light, .9));
			setColor(palette$1.Alert, "successStandardBg", colorMix(private_safeLighten, palette$1.success.light, .9));
			setColor(palette$1.Alert, "warningStandardBg", colorMix(private_safeLighten, palette$1.warning.light, .9));
			setColor(palette$1.Alert, "errorIconColor", setCssVarColor("palette-error-main"));
			setColor(palette$1.Alert, "infoIconColor", setCssVarColor("palette-info-main"));
			setColor(palette$1.Alert, "successIconColor", setCssVarColor("palette-success-main"));
			setColor(palette$1.Alert, "warningIconColor", setCssVarColor("palette-warning-main"));
			setColor(palette$1.AppBar, "defaultBg", setCssVarColor("palette-grey-100"));
			setColor(palette$1.Avatar, "defaultBg", setCssVarColor("palette-grey-400"));
			setColor(palette$1.Button, "inheritContainedBg", setCssVarColor("palette-grey-300"));
			setColor(palette$1.Button, "inheritContainedHoverBg", setCssVarColor("palette-grey-A100"));
			setColor(palette$1.Chip, "defaultBorder", setCssVarColor("palette-grey-400"));
			setColor(palette$1.Chip, "defaultAvatarColor", setCssVarColor("palette-grey-700"));
			setColor(palette$1.Chip, "defaultIconColor", setCssVarColor("palette-grey-700"));
			setColor(palette$1.FilledInput, "bg", "rgba(0, 0, 0, 0.06)");
			setColor(palette$1.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)");
			setColor(palette$1.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)");
			setColor(palette$1.LinearProgress, "primaryBg", colorMix(private_safeLighten, palette$1.primary.main, .62));
			setColor(palette$1.LinearProgress, "secondaryBg", colorMix(private_safeLighten, palette$1.secondary.main, .62));
			setColor(palette$1.LinearProgress, "errorBg", colorMix(private_safeLighten, palette$1.error.main, .62));
			setColor(palette$1.LinearProgress, "infoBg", colorMix(private_safeLighten, palette$1.info.main, .62));
			setColor(palette$1.LinearProgress, "successBg", colorMix(private_safeLighten, palette$1.success.main, .62));
			setColor(palette$1.LinearProgress, "warningBg", colorMix(private_safeLighten, palette$1.warning.main, .62));
			setColor(palette$1.Skeleton, "bg", colorSpace ? colorMix(private_safeAlpha, palette$1.text.primary, .11) : `rgba(${setCssVarColor("palette-text-primaryChannel")} / 0.11)`);
			setColor(palette$1.Slider, "primaryTrack", colorMix(private_safeLighten, palette$1.primary.main, .62));
			setColor(palette$1.Slider, "secondaryTrack", colorMix(private_safeLighten, palette$1.secondary.main, .62));
			setColor(palette$1.Slider, "errorTrack", colorMix(private_safeLighten, palette$1.error.main, .62));
			setColor(palette$1.Slider, "infoTrack", colorMix(private_safeLighten, palette$1.info.main, .62));
			setColor(palette$1.Slider, "successTrack", colorMix(private_safeLighten, palette$1.success.main, .62));
			setColor(palette$1.Slider, "warningTrack", colorMix(private_safeLighten, palette$1.warning.main, .62));
			const snackbarContentBackground = colorSpace ? colorMix(private_safeDarken, palette$1.background.default, .6825) : private_safeEmphasize(palette$1.background.default, .8);
			setColor(palette$1.SnackbarContent, "bg", snackbarContentBackground);
			setColor(palette$1.SnackbarContent, "color", silent(() => colorSpace ? dark.text.primary : palette$1.getContrastText(snackbarContentBackground)));
			setColor(palette$1.SpeedDialAction, "fabHoverBg", private_safeEmphasize(palette$1.background.paper, .15));
			setColor(palette$1.StepConnector, "border", setCssVarColor("palette-grey-400"));
			setColor(palette$1.StepContent, "border", setCssVarColor("palette-grey-400"));
			setColor(palette$1.Switch, "defaultColor", setCssVarColor("palette-common-white"));
			setColor(palette$1.Switch, "defaultDisabledColor", setCssVarColor("palette-grey-100"));
			setColor(palette$1.Switch, "primaryDisabledColor", colorMix(private_safeLighten, palette$1.primary.main, .62));
			setColor(palette$1.Switch, "secondaryDisabledColor", colorMix(private_safeLighten, palette$1.secondary.main, .62));
			setColor(palette$1.Switch, "errorDisabledColor", colorMix(private_safeLighten, palette$1.error.main, .62));
			setColor(palette$1.Switch, "infoDisabledColor", colorMix(private_safeLighten, palette$1.info.main, .62));
			setColor(palette$1.Switch, "successDisabledColor", colorMix(private_safeLighten, palette$1.success.main, .62));
			setColor(palette$1.Switch, "warningDisabledColor", colorMix(private_safeLighten, palette$1.warning.main, .62));
			setColor(palette$1.TableCell, "border", colorMix(private_safeLighten, colorMix(private_safeAlpha, palette$1.divider, 1), .88));
			setColor(palette$1.Tooltip, "bg", colorMix(private_safeAlpha, palette$1.grey[700], .92));
		}
		if (palette$1.mode === "dark") {
			setColor(palette$1.Alert, "errorColor", colorMix(private_safeLighten, palette$1.error.light, .6));
			setColor(palette$1.Alert, "infoColor", colorMix(private_safeLighten, palette$1.info.light, .6));
			setColor(palette$1.Alert, "successColor", colorMix(private_safeLighten, palette$1.success.light, .6));
			setColor(palette$1.Alert, "warningColor", colorMix(private_safeLighten, palette$1.warning.light, .6));
			setColor(palette$1.Alert, "errorFilledBg", setCssVarColor("palette-error-dark"));
			setColor(palette$1.Alert, "infoFilledBg", setCssVarColor("palette-info-dark"));
			setColor(palette$1.Alert, "successFilledBg", setCssVarColor("palette-success-dark"));
			setColor(palette$1.Alert, "warningFilledBg", setCssVarColor("palette-warning-dark"));
			setColor(palette$1.Alert, "errorFilledColor", silent(() => palette$1.getContrastText(palette$1.error.dark)));
			setColor(palette$1.Alert, "infoFilledColor", silent(() => palette$1.getContrastText(palette$1.info.dark)));
			setColor(palette$1.Alert, "successFilledColor", silent(() => palette$1.getContrastText(palette$1.success.dark)));
			setColor(palette$1.Alert, "warningFilledColor", silent(() => palette$1.getContrastText(palette$1.warning.dark)));
			setColor(palette$1.Alert, "errorStandardBg", colorMix(private_safeDarken, palette$1.error.light, .9));
			setColor(palette$1.Alert, "infoStandardBg", colorMix(private_safeDarken, palette$1.info.light, .9));
			setColor(palette$1.Alert, "successStandardBg", colorMix(private_safeDarken, palette$1.success.light, .9));
			setColor(palette$1.Alert, "warningStandardBg", colorMix(private_safeDarken, palette$1.warning.light, .9));
			setColor(palette$1.Alert, "errorIconColor", setCssVarColor("palette-error-main"));
			setColor(palette$1.Alert, "infoIconColor", setCssVarColor("palette-info-main"));
			setColor(palette$1.Alert, "successIconColor", setCssVarColor("palette-success-main"));
			setColor(palette$1.Alert, "warningIconColor", setCssVarColor("palette-warning-main"));
			setColor(palette$1.AppBar, "defaultBg", setCssVarColor("palette-grey-900"));
			setColor(palette$1.AppBar, "darkBg", setCssVarColor("palette-background-paper"));
			setColor(palette$1.AppBar, "darkColor", setCssVarColor("palette-text-primary"));
			setColor(palette$1.Avatar, "defaultBg", setCssVarColor("palette-grey-600"));
			setColor(palette$1.Button, "inheritContainedBg", setCssVarColor("palette-grey-800"));
			setColor(palette$1.Button, "inheritContainedHoverBg", setCssVarColor("palette-grey-700"));
			setColor(palette$1.Chip, "defaultBorder", setCssVarColor("palette-grey-700"));
			setColor(palette$1.Chip, "defaultAvatarColor", setCssVarColor("palette-grey-300"));
			setColor(palette$1.Chip, "defaultIconColor", setCssVarColor("palette-grey-300"));
			setColor(palette$1.FilledInput, "bg", "rgba(255, 255, 255, 0.09)");
			setColor(palette$1.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)");
			setColor(palette$1.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)");
			setColor(palette$1.LinearProgress, "primaryBg", colorMix(private_safeDarken, palette$1.primary.main, .5));
			setColor(palette$1.LinearProgress, "secondaryBg", colorMix(private_safeDarken, palette$1.secondary.main, .5));
			setColor(palette$1.LinearProgress, "errorBg", colorMix(private_safeDarken, palette$1.error.main, .5));
			setColor(palette$1.LinearProgress, "infoBg", colorMix(private_safeDarken, palette$1.info.main, .5));
			setColor(palette$1.LinearProgress, "successBg", colorMix(private_safeDarken, palette$1.success.main, .5));
			setColor(palette$1.LinearProgress, "warningBg", colorMix(private_safeDarken, palette$1.warning.main, .5));
			setColor(palette$1.Skeleton, "bg", colorSpace ? colorMix(private_safeAlpha, palette$1.text.primary, .13) : `rgba(${setCssVarColor("palette-text-primaryChannel")} / 0.13)`);
			setColor(palette$1.Slider, "primaryTrack", colorMix(private_safeDarken, palette$1.primary.main, .5));
			setColor(palette$1.Slider, "secondaryTrack", colorMix(private_safeDarken, palette$1.secondary.main, .5));
			setColor(palette$1.Slider, "errorTrack", colorMix(private_safeDarken, palette$1.error.main, .5));
			setColor(palette$1.Slider, "infoTrack", colorMix(private_safeDarken, palette$1.info.main, .5));
			setColor(palette$1.Slider, "successTrack", colorMix(private_safeDarken, palette$1.success.main, .5));
			setColor(palette$1.Slider, "warningTrack", colorMix(private_safeDarken, palette$1.warning.main, .5));
			const snackbarContentBackground = colorSpace ? colorMix(private_safeLighten, palette$1.background.default, .985) : private_safeEmphasize(palette$1.background.default, .98);
			setColor(palette$1.SnackbarContent, "bg", snackbarContentBackground);
			setColor(palette$1.SnackbarContent, "color", silent(() => colorSpace ? light.text.primary : palette$1.getContrastText(snackbarContentBackground)));
			setColor(palette$1.SpeedDialAction, "fabHoverBg", private_safeEmphasize(palette$1.background.paper, .15));
			setColor(palette$1.StepConnector, "border", setCssVarColor("palette-grey-600"));
			setColor(palette$1.StepContent, "border", setCssVarColor("palette-grey-600"));
			setColor(palette$1.Switch, "defaultColor", setCssVarColor("palette-grey-300"));
			setColor(palette$1.Switch, "defaultDisabledColor", setCssVarColor("palette-grey-600"));
			setColor(palette$1.Switch, "primaryDisabledColor", colorMix(private_safeDarken, palette$1.primary.main, .55));
			setColor(palette$1.Switch, "secondaryDisabledColor", colorMix(private_safeDarken, palette$1.secondary.main, .55));
			setColor(palette$1.Switch, "errorDisabledColor", colorMix(private_safeDarken, palette$1.error.main, .55));
			setColor(palette$1.Switch, "infoDisabledColor", colorMix(private_safeDarken, palette$1.info.main, .55));
			setColor(palette$1.Switch, "successDisabledColor", colorMix(private_safeDarken, palette$1.success.main, .55));
			setColor(palette$1.Switch, "warningDisabledColor", colorMix(private_safeDarken, palette$1.warning.main, .55));
			setColor(palette$1.TableCell, "border", colorMix(private_safeDarken, colorMix(private_safeAlpha, palette$1.divider, 1), .68));
			setColor(palette$1.Tooltip, "bg", colorMix(private_safeAlpha, palette$1.grey[700], .92));
		}
		setColorChannel(palette$1.background, "default");
		setColorChannel(palette$1.background, "paper");
		setColorChannel(palette$1.common, "background");
		setColorChannel(palette$1.common, "onBackground");
		setColorChannel(palette$1, "divider");
		Object.keys(palette$1).forEach((color$1) => {
			const colors = palette$1[color$1];
			if (color$1 !== "tonalOffset" && colors && typeof colors === "object") {
				if (colors.main) setColor(palette$1[color$1], "mainChannel", private_safeColorChannel(toRgb(colors.main)));
				if (colors.light) setColor(palette$1[color$1], "lightChannel", private_safeColorChannel(toRgb(colors.light)));
				if (colors.dark) setColor(palette$1[color$1], "darkChannel", private_safeColorChannel(toRgb(colors.dark)));
				if (colors.contrastText) setColor(palette$1[color$1], "contrastTextChannel", private_safeColorChannel(toRgb(colors.contrastText)));
				if (color$1 === "text") {
					setColorChannel(palette$1[color$1], "primary");
					setColorChannel(palette$1[color$1], "secondary");
				}
				if (color$1 === "action") {
					if (colors.active) setColorChannel(palette$1[color$1], "active");
					if (colors.selected) setColorChannel(palette$1[color$1], "selected");
				}
			}
		});
	});
	theme = args.reduce((acc, argument) => deepmerge(acc, argument), theme);
	const parserConfig = {
		prefix: cssVarPrefix,
		disableCssColorScheme,
		shouldSkipGeneratingVar: shouldSkipGeneratingVar$1,
		getSelector: createGetSelector_default(theme),
		enableContrastVars: nativeColor
	};
	const { vars, generateThemeVars, generateStyleSheets } = prepareCssVars_default(theme, parserConfig);
	theme.vars = vars;
	Object.entries(theme.colorSchemes[theme.defaultColorScheme]).forEach(([key, value]) => {
		theme[key] = value;
	});
	theme.generateThemeVars = generateThemeVars;
	theme.generateStyleSheets = generateStyleSheets;
	theme.generateSpacing = function generateSpacing() {
		return createSpacing(input.spacing, createUnarySpacing(this));
	};
	theme.getColorSchemeSelector = createGetColorSchemeSelector(selector);
	theme.spacing = theme.generateSpacing();
	theme.shouldSkipGeneratingVar = shouldSkipGeneratingVar$1;
	theme.unstable_sxConfig = {
		...defaultSxConfig_default,
		...input?.unstable_sxConfig
	};
	theme.unstable_sx = function sx(props) {
		return styleFunctionSx_default({
			sx: props,
			theme: this
		});
	};
	theme.toRuntimeSource = stringifyTheme;
	return theme;
}
function attachColorScheme(theme, scheme, colorScheme) {
	if (!theme.colorSchemes) return;
	if (colorScheme) theme.colorSchemes[scheme] = {
		...colorScheme !== true && colorScheme,
		palette: createPalette({
			...colorScheme === true ? {} : colorScheme.palette,
			mode: scheme
		})
	};
}
function createTheme(options = {}, ...args) {
	const { palette: palette$1, cssVariables = false, colorSchemes: initialColorSchemes = !palette$1 ? { light: true } : void 0, defaultColorScheme: initialDefaultColorScheme = palette$1?.mode,...other } = options;
	const defaultColorSchemeInput = initialDefaultColorScheme || "light";
	const defaultScheme = initialColorSchemes?.[defaultColorSchemeInput];
	const colorSchemesInput = {
		...initialColorSchemes,
		...palette$1 ? { [defaultColorSchemeInput]: {
			...typeof defaultScheme !== "boolean" && defaultScheme,
			palette: palette$1
		} } : void 0
	};
	if (cssVariables === false) {
		if (!("colorSchemes" in options)) return createThemeNoVars_default(options, ...args);
		let paletteOptions = palette$1;
		if (!("palette" in options)) {
			if (colorSchemesInput[defaultColorSchemeInput]) {
				if (colorSchemesInput[defaultColorSchemeInput] !== true) paletteOptions = colorSchemesInput[defaultColorSchemeInput].palette;
				else if (defaultColorSchemeInput === "dark") paletteOptions = { mode: "dark" };
			}
		}
		const theme = createThemeNoVars_default({
			...options,
			palette: paletteOptions
		}, ...args);
		theme.defaultColorScheme = defaultColorSchemeInput;
		theme.colorSchemes = colorSchemesInput;
		if (theme.palette.mode === "light") {
			theme.colorSchemes.light = {
				...colorSchemesInput.light !== true && colorSchemesInput.light,
				palette: theme.palette
			};
			attachColorScheme(theme, "dark", colorSchemesInput.dark);
		}
		if (theme.palette.mode === "dark") {
			theme.colorSchemes.dark = {
				...colorSchemesInput.dark !== true && colorSchemesInput.dark,
				palette: theme.palette
			};
			attachColorScheme(theme, "light", colorSchemesInput.light);
		}
		return theme;
	}
	if (!palette$1 && !("light" in colorSchemesInput) && defaultColorSchemeInput === "light") colorSchemesInput.light = true;
	return createThemeWithVars({
		...other,
		colorSchemes: colorSchemesInput,
		defaultColorScheme: defaultColorSchemeInput,
		...typeof cssVariables !== "boolean" && cssVariables
	}, ...args);
}
var defaultTheme_default = createTheme();
function useTheme() {
	const theme = useTheme_default(defaultTheme_default);
	return theme["$$material"] || theme;
}
function slotShouldForwardProp(prop) {
	return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
var slotShouldForwardProp_default = slotShouldForwardProp;
var rootShouldForwardProp = (prop) => slotShouldForwardProp_default(prop) && prop !== "classes";
var rootShouldForwardProp_default = rootShouldForwardProp;
var styled_default = createStyled({
	themeId: identifier_default,
	defaultTheme: defaultTheme_default,
	rootShouldForwardProp: rootShouldForwardProp_default
});
function ThemeProviderNoVars({ theme: themeInput,...props }) {
	const scopedTheme = "$$material" in themeInput ? themeInput[identifier_default] : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider_default, {
		...props,
		themeId: scopedTheme ? identifier_default : void 0,
		theme: scopedTheme || themeInput
	});
}
const defaultConfig = {
	attribute: "data-mui-color-scheme",
	colorSchemeStorageKey: "mui-color-scheme",
	defaultLightColorScheme: "light",
	defaultDarkColorScheme: "dark",
	modeStorageKey: "mui-mode"
};
var { CssVarsProvider: InternalCssVarsProvider, useColorScheme, getInitColorSchemeScript: deprecatedGetInitColorSchemeScript } = createCssVarsProvider({
	themeId: identifier_default,
	theme: () => createTheme({ cssVariables: true }),
	colorSchemeStorageKey: defaultConfig.colorSchemeStorageKey,
	modeStorageKey: defaultConfig.modeStorageKey,
	defaultColorScheme: {
		light: defaultConfig.defaultLightColorScheme,
		dark: defaultConfig.defaultDarkColorScheme
	},
	resolveTheme: (theme) => {
		const newTheme = {
			...theme,
			typography: createTypography(theme.palette, theme.typography)
		};
		newTheme.unstable_sx = function sx(props) {
			return styleFunctionSx_default({
				sx: props,
				theme: this
			});
		};
		return newTheme;
	}
});
const CssVarsProvider = InternalCssVarsProvider;
function ThemeProvider({ theme,...props }) {
	const noVarsTheme = import_react.useMemo(() => {
		if (typeof theme === "function") return theme;
		const muiTheme = "$$material" in theme ? theme[identifier_default] : theme;
		if (!("colorSchemes" in muiTheme)) {
			if (!("vars" in muiTheme)) return {
				...theme,
				vars: null
			};
			return theme;
		}
		return null;
	}, [theme]);
	if (noVarsTheme) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProviderNoVars, {
		theme: noVarsTheme,
		...props
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CssVarsProvider, {
		theme,
		...props
	});
}
var capitalize_default = capitalize;
function createChainedFunction(...funcs) {
	return funcs.reduce((acc, func) => {
		if (func == null) return acc;
		return function chainedFunction(...args) {
			acc.apply(this, args);
			func.apply(this, args);
		};
	}, () => {});
}
function GlobalStyles$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalStyles_default$1, {
		...props,
		defaultTheme: defaultTheme_default,
		themeId: identifier_default
	});
}
var GlobalStyles_default = GlobalStyles$1;
function globalCss(styles$4) {
	return function GlobalStylesWrapper(props) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalStyles_default, { styles: typeof styles$4 === "function" ? (theme) => styles$4({
			theme,
			...props
		}) : styles$4 });
	};
}
function internal_createExtendSxProp() {
	return extendSxProp$1;
}
var memoTheme_default = unstable_memoTheme;
function useDefaultProps(params) {
	return useDefaultProps$1(params);
}
function getSvgIconUtilityClass(slot) {
	return generateUtilityClass("MuiSvgIcon", slot);
}
generateUtilityClasses("MuiSvgIcon", [
	"root",
	"colorPrimary",
	"colorSecondary",
	"colorAction",
	"colorError",
	"colorDisabled",
	"fontSizeInherit",
	"fontSizeSmall",
	"fontSizeMedium",
	"fontSizeLarge"
]);
var useUtilityClasses$36 = (ownerState) => {
	const { color: color$1, fontSize, classes } = ownerState;
	const slots = { root: [
		"root",
		color$1 !== "inherit" && `color${capitalize_default(color$1)}`,
		`fontSize${capitalize_default(fontSize)}`
	] };
	return composeClasses(slots, getSvgIconUtilityClass, classes);
};
var SvgIconRoot = styled_default("svg", {
	name: "MuiSvgIcon",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.root,
			ownerState.color !== "inherit" && styles$4[`color${capitalize_default(ownerState.color)}`],
			styles$4[`fontSize${capitalize_default(ownerState.fontSize)}`]
		];
	}
})(memoTheme_default(({ theme }) => ({
	userSelect: "none",
	width: "1em",
	height: "1em",
	display: "inline-block",
	flexShrink: 0,
	transition: theme.transitions?.create?.("fill", { duration: (theme.vars ?? theme).transitions?.duration?.shorter }),
	variants: [
		{
			props: (props) => !props.hasSvgAsChild,
			style: { fill: "currentColor" }
		},
		{
			props: { fontSize: "inherit" },
			style: { fontSize: "inherit" }
		},
		{
			props: { fontSize: "small" },
			style: { fontSize: theme.typography?.pxToRem?.(20) || "1.25rem" }
		},
		{
			props: { fontSize: "medium" },
			style: { fontSize: theme.typography?.pxToRem?.(24) || "1.5rem" }
		},
		{
			props: { fontSize: "large" },
			style: { fontSize: theme.typography?.pxToRem?.(35) || "2.1875rem" }
		},
		...Object.entries((theme.vars ?? theme).palette).filter(([, value]) => value && value.main).map(([color$1]) => ({
			props: { color: color$1 },
			style: { color: (theme.vars ?? theme).palette?.[color$1]?.main }
		})),
		{
			props: { color: "action" },
			style: { color: (theme.vars ?? theme).palette?.action?.active }
		},
		{
			props: { color: "disabled" },
			style: { color: (theme.vars ?? theme).palette?.action?.disabled }
		},
		{
			props: { color: "inherit" },
			style: { color: void 0 }
		}
	]
})));
var SvgIcon = /* @__PURE__ */ import_react.forwardRef(function SvgIcon$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiSvgIcon"
	});
	const { children, className, color: color$1 = "inherit", component = "svg", fontSize = "medium", htmlColor, inheritViewBox = false, titleAccess, viewBox = "0 0 24 24",...other } = props;
	const hasSvgAsChild = /* @__PURE__ */ import_react.isValidElement(children) && children.type === "svg";
	const ownerState = {
		...props,
		color: color$1,
		component,
		fontSize,
		instanceFontSize: inProps.fontSize,
		inheritViewBox,
		viewBox,
		hasSvgAsChild
	};
	const more = {};
	if (!inheritViewBox) more.viewBox = viewBox;
	const classes = useUtilityClasses$36(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SvgIconRoot, {
		as: component,
		className: clsx_default(classes.root, className),
		focusable: "false",
		color: htmlColor,
		"aria-hidden": titleAccess ? void 0 : true,
		role: titleAccess ? "img" : void 0,
		ref,
		...more,
		...other,
		...hasSvgAsChild && children.props,
		ownerState,
		children: [hasSvgAsChild ? children.props.children : children, titleAccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: titleAccess }) : null]
	});
});
SvgIcon.muiName = "SvgIcon";
var SvgIcon_default = SvgIcon;
function createSvgIcon(path, displayName) {
	function Component$1(props, ref) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgIcon_default, {
			"data-testid": void 0,
			ref,
			...props,
			children: path
		});
	}
	Component$1.muiName = SvgIcon_default.muiName;
	return /* @__PURE__ */ import_react.memo(/* @__PURE__ */ import_react.forwardRef(Component$1));
}
function debounce(func, wait = 166) {
	let timeout;
	function debounced(...args) {
		const later = () => {
			func.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	}
	debounced.clear = () => {
		clearTimeout(timeout);
	};
	return debounced;
}
var debounce_default = debounce;
var isMuiElement_default = isMuiElement;
function ownerDocument(node$1) {
	return node$1 && node$1.ownerDocument || document;
}
var ownerDocument_default = ownerDocument;
function ownerWindow(node$1) {
	return ownerDocument(node$1).defaultView || window;
}
var ownerWindow_default = ownerWindow;
function setRef(ref, value) {
	if (typeof ref === "function") ref(value);
	else if (ref) ref.current = value;
}
var useEnhancedEffect_default = useEnhancedEffect_default$1;
var useId_default = useId;
function useControlled(props) {
	const { controlled, default: defaultProp, name, state = "value" } = props;
	const { current: isControlled } = import_react.useRef(controlled !== void 0);
	const [valueState, setValue] = import_react.useState(defaultProp);
	const value = isControlled ? controlled : valueState;
	const setValueIfUncontrolled = import_react.useCallback((newValue) => {
		if (!isControlled) setValue(newValue);
	}, []);
	return [value, setValueIfUncontrolled];
}
var useControlled_default = useControlled;
function useEventCallback(fn) {
	const ref = import_react.useRef(fn);
	useEnhancedEffect_default$1(() => {
		ref.current = fn;
	});
	return import_react.useRef((...args) => (0, ref.current)(...args)).current;
}
var useEventCallback_default = useEventCallback;
var useEventCallback_default$1 = useEventCallback_default;
function useForkRef(...refs) {
	const cleanupRef = import_react.useRef(void 0);
	const refEffect = import_react.useCallback((instance) => {
		const cleanups = refs.map((ref) => {
			if (ref == null) return null;
			if (typeof ref === "function") {
				const refCallback = ref;
				const refCleanup = refCallback(instance);
				return typeof refCleanup === "function" ? refCleanup : () => {
					refCallback(null);
				};
			}
			ref.current = instance;
			return () => {
				ref.current = null;
			};
		});
		return () => {
			cleanups.forEach((refCleanup) => refCleanup?.());
		};
	}, refs);
	return import_react.useMemo(() => {
		if (refs.every((ref) => ref == null)) return null;
		return (value) => {
			if (cleanupRef.current) {
				cleanupRef.current();
				cleanupRef.current = void 0;
			}
			if (value != null) cleanupRef.current = refEffect(value);
		};
	}, refs);
}
var useForkRef_default = useForkRef;
function isEventHandler(key, value) {
	const thirdCharCode = key.charCodeAt(2);
	return key[0] === "o" && key[1] === "n" && thirdCharCode >= 65 && thirdCharCode <= 90 && typeof value === "function";
}
function mergeSlotProps(externalSlotProps, defaultSlotProps) {
	if (!externalSlotProps) return defaultSlotProps;
	function extractHandlers(externalSlotPropsValue, defaultSlotPropsValue) {
		const handlers$1 = {};
		Object.keys(defaultSlotPropsValue).forEach((key) => {
			if (isEventHandler(key, defaultSlotPropsValue[key]) && typeof externalSlotPropsValue[key] === "function") handlers$1[key] = (...args) => {
				externalSlotPropsValue[key](...args);
				defaultSlotPropsValue[key](...args);
			};
		});
		return handlers$1;
	}
	if (typeof externalSlotProps === "function" || typeof defaultSlotProps === "function") return (ownerState) => {
		const defaultSlotPropsValue = typeof defaultSlotProps === "function" ? defaultSlotProps(ownerState) : defaultSlotProps;
		const externalSlotPropsValue = typeof externalSlotProps === "function" ? externalSlotProps({
			...ownerState,
			...defaultSlotPropsValue
		}) : externalSlotProps;
		const className$1 = clsx_default(ownerState?.className, defaultSlotPropsValue?.className, externalSlotPropsValue?.className);
		const handlers$1 = extractHandlers(externalSlotPropsValue, defaultSlotPropsValue);
		return {
			...defaultSlotPropsValue,
			...externalSlotPropsValue,
			...handlers$1,
			...!!className$1 && { className: className$1 },
			...defaultSlotPropsValue?.style && externalSlotPropsValue?.style && { style: {
				...defaultSlotPropsValue.style,
				...externalSlotPropsValue.style
			} },
			...defaultSlotPropsValue?.sx && externalSlotPropsValue?.sx && { sx: [...Array.isArray(defaultSlotPropsValue.sx) ? defaultSlotPropsValue.sx : [defaultSlotPropsValue.sx], ...Array.isArray(externalSlotPropsValue.sx) ? externalSlotPropsValue.sx : [externalSlotPropsValue.sx]] }
		};
	};
	const typedDefaultSlotProps = defaultSlotProps;
	const handlers = extractHandlers(externalSlotProps, typedDefaultSlotProps);
	const className = clsx_default(typedDefaultSlotProps?.className, externalSlotProps?.className);
	return {
		...defaultSlotProps,
		...externalSlotProps,
		...handlers,
		...!!className && { className },
		...typedDefaultSlotProps?.style && externalSlotProps?.style && { style: {
			...typedDefaultSlotProps.style,
			...externalSlotProps.style
		} },
		...typedDefaultSlotProps?.sx && externalSlotProps?.sx && { sx: [...Array.isArray(typedDefaultSlotProps.sx) ? typedDefaultSlotProps.sx : [typedDefaultSlotProps.sx], ...Array.isArray(externalSlotProps.sx) ? externalSlotProps.sx : [externalSlotProps.sx]] }
	};
}
function _objectWithoutPropertiesLoose(r$2, e$1) {
	if (null == r$2) return {};
	var t$1 = {};
	for (var n$1 in r$2) if ({}.hasOwnProperty.call(r$2, n$1)) {
		if (-1 !== e$1.indexOf(n$1)) continue;
		t$1[n$1] = r$2[n$1];
	}
	return t$1;
}
function _setPrototypeOf(t$1, e$1) {
	return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t$2, e$2) {
		return t$2.__proto__ = e$2, t$2;
	}, _setPrototypeOf(t$1, e$1);
}
function _inheritsLoose(t$1, o) {
	t$1.prototype = Object.create(o.prototype), t$1.prototype.constructor = t$1, _setPrototypeOf(t$1, o);
}
var config_default = { disabled: false };
var TransitionGroupContext_default = import_react.createContext(null);
var forceReflow = function forceReflow$1(node$1) {
	return node$1.scrollTop;
};
var import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
var Transition = /* @__PURE__ */ function(_React$Component) {
	_inheritsLoose(Transition$1, _React$Component);
	function Transition$1(props, context) {
		var _this = _React$Component.call(this, props, context) || this;
		var parentGroup = context;
		var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
		var initialStatus;
		_this.appearStatus = null;
		if (props.in) if (appear) {
			initialStatus = EXITED;
			_this.appearStatus = ENTERING;
		} else initialStatus = ENTERED;
		else if (props.unmountOnExit || props.mountOnEnter) initialStatus = UNMOUNTED;
		else initialStatus = EXITED;
		_this.state = { status: initialStatus };
		_this.nextCallback = null;
		return _this;
	}
	Transition$1.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
		if (_ref.in && prevState.status === "unmounted") return { status: EXITED };
		return null;
	};
	var _proto = Transition$1.prototype;
	_proto.componentDidMount = function componentDidMount() {
		this.updateStatus(true, this.appearStatus);
	};
	_proto.componentDidUpdate = function componentDidUpdate(prevProps) {
		var nextStatus = null;
		if (prevProps !== this.props) {
			var status = this.state.status;
			if (this.props.in) {
				if (status !== "entering" && status !== "entered") nextStatus = ENTERING;
			} else if (status === "entering" || status === "entered") nextStatus = EXITING;
		}
		this.updateStatus(false, nextStatus);
	};
	_proto.componentWillUnmount = function componentWillUnmount() {
		this.cancelNextCallback();
	};
	_proto.getTimeouts = function getTimeouts() {
		var timeout = this.props.timeout;
		var exit = enter = appear = timeout, enter, appear;
		if (timeout != null && typeof timeout !== "number") {
			exit = timeout.exit;
			enter = timeout.enter;
			appear = timeout.appear !== void 0 ? timeout.appear : enter;
		}
		return {
			exit,
			enter,
			appear
		};
	};
	_proto.updateStatus = function updateStatus(mounting, nextStatus) {
		if (mounting === void 0) mounting = false;
		if (nextStatus !== null) {
			this.cancelNextCallback();
			if (nextStatus === "entering") {
				if (this.props.unmountOnExit || this.props.mountOnEnter) {
					var node$1 = this.props.nodeRef ? this.props.nodeRef.current : import_react_dom$1.default.findDOMNode(this);
					if (node$1) forceReflow(node$1);
				}
				this.performEnter(mounting);
			} else this.performExit();
		} else if (this.props.unmountOnExit && this.state.status === "exited") this.setState({ status: UNMOUNTED });
	};
	_proto.performEnter = function performEnter(mounting) {
		var _this2 = this;
		var enter = this.props.enter;
		var appearing = this.context ? this.context.isMounting : mounting;
		var _ref2 = this.props.nodeRef ? [appearing] : [import_react_dom$1.default.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
		var timeouts = this.getTimeouts();
		var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
		if (!mounting && !enter || config_default.disabled) {
			this.safeSetState({ status: ENTERED }, function() {
				_this2.props.onEntered(maybeNode);
			});
			return;
		}
		this.props.onEnter(maybeNode, maybeAppearing);
		this.safeSetState({ status: ENTERING }, function() {
			_this2.props.onEntering(maybeNode, maybeAppearing);
			_this2.onTransitionEnd(enterTimeout, function() {
				_this2.safeSetState({ status: ENTERED }, function() {
					_this2.props.onEntered(maybeNode, maybeAppearing);
				});
			});
		});
	};
	_proto.performExit = function performExit() {
		var _this3 = this;
		var exit = this.props.exit;
		var timeouts = this.getTimeouts();
		var maybeNode = this.props.nodeRef ? void 0 : import_react_dom$1.default.findDOMNode(this);
		if (!exit || config_default.disabled) {
			this.safeSetState({ status: EXITED }, function() {
				_this3.props.onExited(maybeNode);
			});
			return;
		}
		this.props.onExit(maybeNode);
		this.safeSetState({ status: EXITING }, function() {
			_this3.props.onExiting(maybeNode);
			_this3.onTransitionEnd(timeouts.exit, function() {
				_this3.safeSetState({ status: EXITED }, function() {
					_this3.props.onExited(maybeNode);
				});
			});
		});
	};
	_proto.cancelNextCallback = function cancelNextCallback() {
		if (this.nextCallback !== null) {
			this.nextCallback.cancel();
			this.nextCallback = null;
		}
	};
	_proto.safeSetState = function safeSetState(nextState, callback) {
		callback = this.setNextCallback(callback);
		this.setState(nextState, callback);
	};
	_proto.setNextCallback = function setNextCallback(callback) {
		var _this4 = this;
		var active = true;
		this.nextCallback = function(event) {
			if (active) {
				active = false;
				_this4.nextCallback = null;
				callback(event);
			}
		};
		this.nextCallback.cancel = function() {
			active = false;
		};
		return this.nextCallback;
	};
	_proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
		this.setNextCallback(handler);
		var node$1 = this.props.nodeRef ? this.props.nodeRef.current : import_react_dom$1.default.findDOMNode(this);
		var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;
		if (!node$1 || doesNotHaveTimeoutOrListener) {
			setTimeout(this.nextCallback, 0);
			return;
		}
		if (this.props.addEndListener) {
			var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node$1, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
			this.props.addEndListener(maybeNode, maybeNextCallback);
		}
		if (timeout != null) setTimeout(this.nextCallback, timeout);
	};
	_proto.render = function render() {
		var status = this.state.status;
		if (status === "unmounted") return null;
		var _this$props = this.props, children = _this$props.children;
		_this$props.in;
		_this$props.mountOnEnter;
		_this$props.unmountOnExit;
		_this$props.appear;
		_this$props.enter;
		_this$props.exit;
		_this$props.timeout;
		_this$props.addEndListener;
		_this$props.onEnter;
		_this$props.onEntering;
		_this$props.onEntered;
		_this$props.onExit;
		_this$props.onExiting;
		_this$props.onExited;
		_this$props.nodeRef;
		var childProps = _objectWithoutPropertiesLoose(_this$props, [
			"children",
			"in",
			"mountOnEnter",
			"unmountOnExit",
			"appear",
			"enter",
			"exit",
			"timeout",
			"addEndListener",
			"onEnter",
			"onEntering",
			"onEntered",
			"onExit",
			"onExiting",
			"onExited",
			"nodeRef"
		]);
		return /* @__PURE__ */ import_react.createElement(TransitionGroupContext_default.Provider, { value: null }, typeof children === "function" ? children(status, childProps) : import_react.cloneElement(import_react.Children.only(children), childProps));
	};
	return Transition$1;
}(import_react.Component);
Transition.contextType = TransitionGroupContext_default;
Transition.propTypes = {};
function noop$1() {}
Transition.defaultProps = {
	in: false,
	mountOnEnter: false,
	unmountOnExit: false,
	appear: false,
	enter: true,
	exit: true,
	onEnter: noop$1,
	onEntering: noop$1,
	onEntered: noop$1,
	onExit: noop$1,
	onExiting: noop$1,
	onExited: noop$1
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
var Transition_default = Transition;
function _assertThisInitialized(e$1) {
	if (void 0 === e$1) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e$1;
}
function getChildMapping(children, mapFn) {
	var mapper = function mapper$1(child) {
		return mapFn && (0, import_react.isValidElement)(child) ? mapFn(child) : child;
	};
	var result = Object.create(null);
	if (children) import_react.Children.map(children, function(c$1) {
		return c$1;
	}).forEach(function(child) {
		result[child.key] = mapper(child);
	});
	return result;
}
function mergeChildMappings(prev$1, next$1) {
	prev$1 = prev$1 || {};
	next$1 = next$1 || {};
	function getValueForKey(key) {
		return key in next$1 ? next$1[key] : prev$1[key];
	}
	var nextKeysPending = Object.create(null);
	var pendingKeys = [];
	for (var prevKey in prev$1) if (prevKey in next$1) {
		if (pendingKeys.length) {
			nextKeysPending[prevKey] = pendingKeys;
			pendingKeys = [];
		}
	} else pendingKeys.push(prevKey);
	var i;
	var childMapping = {};
	for (var nextKey in next$1) {
		if (nextKeysPending[nextKey]) for (i = 0; i < nextKeysPending[nextKey].length; i++) {
			var pendingNextKey = nextKeysPending[nextKey][i];
			childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
		}
		childMapping[nextKey] = getValueForKey(nextKey);
	}
	for (i = 0; i < pendingKeys.length; i++) childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
	return childMapping;
}
function getProp(child, prop, props) {
	return props[prop] != null ? props[prop] : child.props[prop];
}
function getInitialChildMapping(props, onExited) {
	return getChildMapping(props.children, function(child) {
		return (0, import_react.cloneElement)(child, {
			onExited: onExited.bind(null, child),
			in: true,
			appear: getProp(child, "appear", props),
			enter: getProp(child, "enter", props),
			exit: getProp(child, "exit", props)
		});
	});
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
	var nextChildMapping = getChildMapping(nextProps.children);
	var children = mergeChildMappings(prevChildMapping, nextChildMapping);
	Object.keys(children).forEach(function(key) {
		var child = children[key];
		if (!(0, import_react.isValidElement)(child)) return;
		var hasPrev = key in prevChildMapping;
		var hasNext = key in nextChildMapping;
		var prevChild = prevChildMapping[key];
		var isLeaving = (0, import_react.isValidElement)(prevChild) && !prevChild.props.in;
		if (hasNext && (!hasPrev || isLeaving)) children[key] = (0, import_react.cloneElement)(child, {
			onExited: onExited.bind(null, child),
			in: true,
			exit: getProp(child, "exit", nextProps),
			enter: getProp(child, "enter", nextProps)
		});
		else if (!hasNext && hasPrev && !isLeaving) children[key] = (0, import_react.cloneElement)(child, { in: false });
		else if (hasNext && hasPrev && (0, import_react.isValidElement)(prevChild)) children[key] = (0, import_react.cloneElement)(child, {
			onExited: onExited.bind(null, child),
			in: prevChild.props.in,
			exit: getProp(child, "exit", nextProps),
			enter: getProp(child, "enter", nextProps)
		});
	});
	return children;
}
var values = Object.values || function(obj) {
	return Object.keys(obj).map(function(k$1) {
		return obj[k$1];
	});
};
var defaultProps = {
	component: "div",
	childFactory: function childFactory(child) {
		return child;
	}
};
var TransitionGroup = /* @__PURE__ */ function(_React$Component) {
	_inheritsLoose(TransitionGroup$1, _React$Component);
	function TransitionGroup$1(props, context) {
		var _this = _React$Component.call(this, props, context) || this;
		_this.state = {
			contextValue: { isMounting: true },
			handleExited: _this.handleExited.bind(_assertThisInitialized(_this)),
			firstRender: true
		};
		return _this;
	}
	var _proto = TransitionGroup$1.prototype;
	_proto.componentDidMount = function componentDidMount() {
		this.mounted = true;
		this.setState({ contextValue: { isMounting: false } });
	};
	_proto.componentWillUnmount = function componentWillUnmount() {
		this.mounted = false;
	};
	TransitionGroup$1.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
		var prevChildMapping = _ref.children, handleExited = _ref.handleExited;
		return {
			children: _ref.firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
			firstRender: false
		};
	};
	_proto.handleExited = function handleExited(child, node$1) {
		var currentChildMapping = getChildMapping(this.props.children);
		if (child.key in currentChildMapping) return;
		if (child.props.onExited) child.props.onExited(node$1);
		if (this.mounted) this.setState(function(state) {
			var children = _extends({}, state.children);
			delete children[child.key];
			return { children };
		});
	};
	_proto.render = function render() {
		var _this$props = this.props, Component$1 = _this$props.component, childFactory = _this$props.childFactory, props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);
		var contextValue = this.state.contextValue;
		var children = values(this.state.children).map(childFactory);
		delete props.appear;
		delete props.enter;
		delete props.exit;
		if (Component$1 === null) return /* @__PURE__ */ import_react.createElement(TransitionGroupContext_default.Provider, { value: contextValue }, children);
		return /* @__PURE__ */ import_react.createElement(TransitionGroupContext_default.Provider, { value: contextValue }, /* @__PURE__ */ import_react.createElement(Component$1, props, children));
	};
	return TransitionGroup$1;
}(import_react.Component);
TransitionGroup.propTypes = {};
TransitionGroup.defaultProps = defaultProps;
var TransitionGroup_default = TransitionGroup;
var UNINITIALIZED = {};
function useLazyRef(init, initArg) {
	const ref = import_react.useRef(UNINITIALIZED);
	if (ref.current === UNINITIALIZED) ref.current = init(initArg);
	return ref;
}
var EMPTY = [];
function useOnMount(fn) {
	import_react.useEffect(fn, EMPTY);
}
var Timeout = class Timeout {
	static create() {
		return new Timeout();
	}
	currentId = null;
	start(delay, fn) {
		this.clear();
		this.currentId = setTimeout(() => {
			this.currentId = null;
			fn();
		}, delay);
	}
	clear = () => {
		if (this.currentId !== null) {
			clearTimeout(this.currentId);
			this.currentId = null;
		}
	};
	disposeEffect = () => {
		return this.clear;
	};
};
function useTimeout() {
	const timeout = useLazyRef(Timeout.create).current;
	useOnMount(timeout.disposeEffect);
	return timeout;
}
const reflow = (node$1) => node$1.scrollTop;
function getTransitionProps(props, options) {
	const { timeout, easing: easing$1, style: style$3 = {} } = props;
	return {
		duration: style$3.transitionDuration ?? (typeof timeout === "number" ? timeout : timeout[options.mode] || 0),
		easing: style$3.transitionTimingFunction ?? (typeof easing$1 === "object" ? easing$1[options.mode] : easing$1),
		delay: style$3.transitionDelay
	};
}
function isHostComponent(element) {
	return typeof element === "string";
}
var isHostComponent_default = isHostComponent;
function appendOwnerState(elementType, otherProps, ownerState) {
	if (elementType === void 0 || isHostComponent_default(elementType)) return otherProps;
	return {
		...otherProps,
		ownerState: {
			...otherProps.ownerState,
			...ownerState
		}
	};
}
var appendOwnerState_default = appendOwnerState;
function resolveComponentProps(componentProps, ownerState, slotState) {
	if (typeof componentProps === "function") return componentProps(ownerState, slotState);
	return componentProps;
}
var resolveComponentProps_default = resolveComponentProps;
function extractEventHandlers(object, excludeKeys = []) {
	if (object === void 0) return {};
	const result = {};
	Object.keys(object).filter((prop) => prop.match(/^on[A-Z]/) && typeof object[prop] === "function" && !excludeKeys.includes(prop)).forEach((prop) => {
		result[prop] = object[prop];
	});
	return result;
}
var extractEventHandlers_default = extractEventHandlers;
function omitEventHandlers(object) {
	if (object === void 0) return {};
	const result = {};
	Object.keys(object).filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === "function")).forEach((prop) => {
		result[prop] = object[prop];
	});
	return result;
}
var omitEventHandlers_default = omitEventHandlers;
function mergeSlotProps$1(parameters) {
	const { getSlotProps, additionalProps, externalSlotProps, externalForwardedProps, className } = parameters;
	if (!getSlotProps) {
		const joinedClasses$1 = clsx_default(additionalProps?.className, className, externalForwardedProps?.className, externalSlotProps?.className);
		const mergedStyle$1 = {
			...additionalProps?.style,
			...externalForwardedProps?.style,
			...externalSlotProps?.style
		};
		const props$1 = {
			...additionalProps,
			...externalForwardedProps,
			...externalSlotProps
		};
		if (joinedClasses$1.length > 0) props$1.className = joinedClasses$1;
		if (Object.keys(mergedStyle$1).length > 0) props$1.style = mergedStyle$1;
		return {
			props: props$1,
			internalRef: void 0
		};
	}
	const eventHandlers = extractEventHandlers_default({
		...externalForwardedProps,
		...externalSlotProps
	});
	const componentsPropsWithoutEventHandlers = omitEventHandlers_default(externalSlotProps);
	const otherPropsWithoutEventHandlers = omitEventHandlers_default(externalForwardedProps);
	const internalSlotProps = getSlotProps(eventHandlers);
	const joinedClasses = clsx_default(internalSlotProps?.className, additionalProps?.className, className, externalForwardedProps?.className, externalSlotProps?.className);
	const mergedStyle = {
		...internalSlotProps?.style,
		...additionalProps?.style,
		...externalForwardedProps?.style,
		...externalSlotProps?.style
	};
	const props = {
		...internalSlotProps,
		...additionalProps,
		...otherPropsWithoutEventHandlers,
		...componentsPropsWithoutEventHandlers
	};
	if (joinedClasses.length > 0) props.className = joinedClasses;
	if (Object.keys(mergedStyle).length > 0) props.style = mergedStyle;
	return {
		props,
		internalRef: internalSlotProps.ref
	};
}
var mergeSlotProps_default = mergeSlotProps$1;
function useSlot(name, parameters) {
	const { className, elementType: initialElementType, ownerState, externalForwardedProps, internalForwardedProps, shouldForwardComponentProp = false,...useSlotPropsParams } = parameters;
	const { component: rootComponent, slots = { [name]: void 0 }, slotProps = { [name]: void 0 },...other } = externalForwardedProps;
	const elementType = slots[name] || initialElementType;
	const resolvedComponentsProps = resolveComponentProps_default(slotProps[name], ownerState);
	const { props: { component: slotComponent,...mergedProps }, internalRef } = mergeSlotProps_default({
		className,
		...useSlotPropsParams,
		externalForwardedProps: name === "root" ? other : void 0,
		externalSlotProps: resolvedComponentsProps
	});
	const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.ref);
	const LeafComponent = name === "root" ? slotComponent || rootComponent : slotComponent;
	const props = appendOwnerState_default(elementType, {
		...name === "root" && !rootComponent && !slots[name] && internalForwardedProps,
		...name !== "root" && !slots[name] && internalForwardedProps,
		...mergedProps,
		...LeafComponent && !shouldForwardComponentProp && { as: LeafComponent },
		...LeafComponent && shouldForwardComponentProp && { component: LeafComponent },
		ref
	}, ownerState);
	return [elementType, props];
}
function getPaperUtilityClass(slot) {
	return generateUtilityClass("MuiPaper", slot);
}
generateUtilityClasses("MuiPaper", [
	"root",
	"rounded",
	"outlined",
	"elevation",
	"elevation0",
	"elevation1",
	"elevation2",
	"elevation3",
	"elevation4",
	"elevation5",
	"elevation6",
	"elevation7",
	"elevation8",
	"elevation9",
	"elevation10",
	"elevation11",
	"elevation12",
	"elevation13",
	"elevation14",
	"elevation15",
	"elevation16",
	"elevation17",
	"elevation18",
	"elevation19",
	"elevation20",
	"elevation21",
	"elevation22",
	"elevation23",
	"elevation24"
]);
var useUtilityClasses$35 = (ownerState) => {
	const { square, elevation, variant, classes } = ownerState;
	const slots = { root: [
		"root",
		variant,
		!square && "rounded",
		variant === "elevation" && `elevation${elevation}`
	] };
	return composeClasses(slots, getPaperUtilityClass, classes);
};
var PaperRoot = styled_default("div", {
	name: "MuiPaper",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.root,
			styles$4[ownerState.variant],
			!ownerState.square && styles$4.rounded,
			ownerState.variant === "elevation" && styles$4[`elevation${ownerState.elevation}`]
		];
	}
})(memoTheme_default(({ theme }) => ({
	backgroundColor: (theme.vars || theme).palette.background.paper,
	color: (theme.vars || theme).palette.text.primary,
	transition: theme.transitions.create("box-shadow"),
	variants: [
		{
			props: ({ ownerState }) => !ownerState.square,
			style: { borderRadius: theme.shape.borderRadius }
		},
		{
			props: { variant: "outlined" },
			style: { border: `1px solid ${(theme.vars || theme).palette.divider}` }
		},
		{
			props: { variant: "elevation" },
			style: {
				boxShadow: "var(--Paper-shadow)",
				backgroundImage: "var(--Paper-overlay)"
			}
		}
	]
})));
var Paper_default = /* @__PURE__ */ import_react.forwardRef(function Paper$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiPaper"
	});
	const theme = useTheme();
	const { className, component = "div", elevation = 1, square = false, variant = "elevation",...other } = props;
	const ownerState = {
		...props,
		component,
		elevation,
		square,
		variant
	};
	const classes = useUtilityClasses$35(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaperRoot, {
		as: component,
		ownerState,
		className: clsx_default(classes.root, className),
		ref,
		...other,
		style: {
			...variant === "elevation" && {
				"--Paper-shadow": (theme.vars || theme).shadows[elevation],
				...theme.vars && { "--Paper-overlay": theme.vars.overlays?.[elevation] },
				...!theme.vars && theme.palette.mode === "dark" && { "--Paper-overlay": `linear-gradient(${alpha("#fff", getOverlayAlpha(elevation))}, ${alpha("#fff", getOverlayAlpha(elevation))})` }
			},
			...other.style
		}
	});
});
function isFocusVisible(element) {
	try {
		return element.matches(":focus-visible");
	} catch (error) {}
	return false;
}
var LazyRipple = class LazyRipple {
	static create() {
		return new LazyRipple();
	}
	static use() {
		const ripple = useLazyRef(LazyRipple.create).current;
		const [shouldMount, setShouldMount] = import_react.useState(false);
		ripple.shouldMount = shouldMount;
		ripple.setShouldMount = setShouldMount;
		import_react.useEffect(ripple.mountEffect, [shouldMount]);
		return ripple;
	}
	constructor() {
		this.ref = { current: null };
		this.mounted = null;
		this.didMount = false;
		this.shouldMount = false;
		this.setShouldMount = null;
	}
	mount() {
		if (!this.mounted) {
			this.mounted = createControlledPromise();
			this.shouldMount = true;
			this.setShouldMount(this.shouldMount);
		}
		return this.mounted;
	}
	mountEffect = () => {
		if (this.shouldMount && !this.didMount) {
			if (this.ref.current !== null) {
				this.didMount = true;
				this.mounted.resolve();
			}
		}
	};
	start(...args) {
		this.mount().then(() => this.ref.current?.start(...args));
	}
	stop(...args) {
		this.mount().then(() => this.ref.current?.stop(...args));
	}
	pulsate(...args) {
		this.mount().then(() => this.ref.current?.pulsate(...args));
	}
};
function useLazyRipple() {
	return LazyRipple.use();
}
function createControlledPromise() {
	let resolve;
	let reject;
	const p$1 = new Promise((resolveFn, rejectFn) => {
		resolve = resolveFn;
		reject = rejectFn;
	});
	p$1.resolve = resolve;
	p$1.reject = reject;
	return p$1;
}
function Ripple(props) {
	const { className, classes, pulsate = false, rippleX, rippleY, rippleSize, in: inProp, onExited, timeout } = props;
	const [leaving, setLeaving] = import_react.useState(false);
	const rippleClassName = clsx_default(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
	const rippleStyles = {
		width: rippleSize,
		height: rippleSize,
		top: -(rippleSize / 2) + rippleY,
		left: -(rippleSize / 2) + rippleX
	};
	const childClassName = clsx_default(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
	if (!inProp && !leaving) setLeaving(true);
	import_react.useEffect(() => {
		if (!inProp && onExited != null) {
			const timeoutId = setTimeout(onExited, timeout);
			return () => {
				clearTimeout(timeoutId);
			};
		}
	}, [
		onExited,
		inProp,
		timeout
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: rippleClassName,
		style: rippleStyles,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: childClassName })
	});
}
var Ripple_default = Ripple;
var touchRippleClasses_default = generateUtilityClasses("MuiTouchRipple", [
	"root",
	"ripple",
	"rippleVisible",
	"ripplePulsate",
	"child",
	"childLeaving",
	"childPulsate"
]);
var DURATION = 550;
var enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;
var exitKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;
var pulsateKeyframe = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;
const TouchRippleRoot = styled_default("span", {
	name: "MuiTouchRipple",
	slot: "Root"
})({
	overflow: "hidden",
	pointerEvents: "none",
	position: "absolute",
	zIndex: 0,
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	borderRadius: "inherit"
});
const TouchRippleRipple = styled_default(Ripple_default, {
	name: "MuiTouchRipple",
	slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${touchRippleClasses_default.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${enterKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({ theme }) => theme.transitions.easing.easeInOut};
  }

  &.${touchRippleClasses_default.ripplePulsate} {
    animation-duration: ${({ theme }) => theme.transitions.duration.shorter}ms;
  }

  & .${touchRippleClasses_default.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${touchRippleClasses_default.childLeaving} {
    opacity: 0;
    animation-name: ${exitKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({ theme }) => theme.transitions.easing.easeInOut};
  }

  & .${touchRippleClasses_default.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${pulsateKeyframe};
    animation-duration: 2500ms;
    animation-timing-function: ${({ theme }) => theme.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`;
var TouchRipple_default = /* @__PURE__ */ import_react.forwardRef(function TouchRipple$1(inProps, ref) {
	const { center: centerProp = false, classes = {}, className,...other } = useDefaultProps({
		props: inProps,
		name: "MuiTouchRipple"
	});
	const [ripples, setRipples] = import_react.useState([]);
	const nextKey = import_react.useRef(0);
	const rippleCallback = import_react.useRef(null);
	import_react.useEffect(() => {
		if (rippleCallback.current) {
			rippleCallback.current();
			rippleCallback.current = null;
		}
	}, [ripples]);
	const ignoringMouseDown = import_react.useRef(false);
	const startTimer = useTimeout();
	const startTimerCommit = import_react.useRef(null);
	const container = import_react.useRef(null);
	const startCommit = import_react.useCallback((params) => {
		const { pulsate: pulsate$1, rippleX, rippleY, rippleSize, cb } = params;
		setRipples((oldRipples) => [...oldRipples, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchRippleRipple, {
			classes: {
				ripple: clsx_default(classes.ripple, touchRippleClasses_default.ripple),
				rippleVisible: clsx_default(classes.rippleVisible, touchRippleClasses_default.rippleVisible),
				ripplePulsate: clsx_default(classes.ripplePulsate, touchRippleClasses_default.ripplePulsate),
				child: clsx_default(classes.child, touchRippleClasses_default.child),
				childLeaving: clsx_default(classes.childLeaving, touchRippleClasses_default.childLeaving),
				childPulsate: clsx_default(classes.childPulsate, touchRippleClasses_default.childPulsate)
			},
			timeout: DURATION,
			pulsate: pulsate$1,
			rippleX,
			rippleY,
			rippleSize
		}, nextKey.current)]);
		nextKey.current += 1;
		rippleCallback.current = cb;
	}, [classes]);
	const start = import_react.useCallback((event = {}, options = {}, cb = () => {}) => {
		const { pulsate: pulsate$1 = false, center = centerProp || options.pulsate, fakeElement = false } = options;
		if (event?.type === "mousedown" && ignoringMouseDown.current) {
			ignoringMouseDown.current = false;
			return;
		}
		if (event?.type === "touchstart") ignoringMouseDown.current = true;
		const element = fakeElement ? null : container.current;
		const rect = element ? element.getBoundingClientRect() : {
			width: 0,
			height: 0,
			left: 0,
			top: 0
		};
		let rippleX;
		let rippleY;
		let rippleSize;
		if (center || event === void 0 || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
			rippleX = Math.round(rect.width / 2);
			rippleY = Math.round(rect.height / 2);
		} else {
			const { clientX, clientY } = event.touches && event.touches.length > 0 ? event.touches[0] : event;
			rippleX = Math.round(clientX - rect.left);
			rippleY = Math.round(clientY - rect.top);
		}
		if (center) {
			rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
			if (rippleSize % 2 === 0) rippleSize += 1;
		} else {
			const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
			const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
			rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
		}
		if (event?.touches) {
			if (startTimerCommit.current === null) {
				startTimerCommit.current = () => {
					startCommit({
						pulsate: pulsate$1,
						rippleX,
						rippleY,
						rippleSize,
						cb
					});
				};
				startTimer.start(80, () => {
					if (startTimerCommit.current) {
						startTimerCommit.current();
						startTimerCommit.current = null;
					}
				});
			}
		} else startCommit({
			pulsate: pulsate$1,
			rippleX,
			rippleY,
			rippleSize,
			cb
		});
	}, [
		centerProp,
		startCommit,
		startTimer
	]);
	const pulsate = import_react.useCallback(() => {
		start({}, { pulsate: true });
	}, [start]);
	const stop = import_react.useCallback((event, cb) => {
		startTimer.clear();
		if (event?.type === "touchend" && startTimerCommit.current) {
			startTimerCommit.current();
			startTimerCommit.current = null;
			startTimer.start(0, () => {
				stop(event, cb);
			});
			return;
		}
		startTimerCommit.current = null;
		setRipples((oldRipples) => {
			if (oldRipples.length > 0) return oldRipples.slice(1);
			return oldRipples;
		});
		rippleCallback.current = cb;
	}, [startTimer]);
	import_react.useImperativeHandle(ref, () => ({
		pulsate,
		start,
		stop
	}), [
		pulsate,
		start,
		stop
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchRippleRoot, {
		className: clsx_default(touchRippleClasses_default.root, classes.root, className),
		ref: container,
		...other,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionGroup_default, {
			component: null,
			exit: true,
			children: ripples
		})
	});
});
function getButtonBaseUtilityClass(slot) {
	return generateUtilityClass("MuiButtonBase", slot);
}
var buttonBaseClasses_default = generateUtilityClasses("MuiButtonBase", [
	"root",
	"disabled",
	"focusVisible"
]);
var useUtilityClasses$34 = (ownerState) => {
	const { disabled, focusVisible, focusVisibleClassName, classes } = ownerState;
	const composedClasses = composeClasses({ root: [
		"root",
		disabled && "disabled",
		focusVisible && "focusVisible"
	] }, getButtonBaseUtilityClass, classes);
	if (focusVisible && focusVisibleClassName) composedClasses.root += ` ${focusVisibleClassName}`;
	return composedClasses;
};
const ButtonBaseRoot = styled_default("button", {
	name: "MuiButtonBase",
	slot: "Root"
})({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	boxSizing: "border-box",
	WebkitTapHighlightColor: "transparent",
	backgroundColor: "transparent",
	outline: 0,
	border: 0,
	margin: 0,
	borderRadius: 0,
	padding: 0,
	cursor: "pointer",
	userSelect: "none",
	verticalAlign: "middle",
	MozAppearance: "none",
	WebkitAppearance: "none",
	textDecoration: "none",
	color: "inherit",
	"&::-moz-focus-inner": { borderStyle: "none" },
	[`&.${buttonBaseClasses_default.disabled}`]: {
		pointerEvents: "none",
		cursor: "default"
	},
	"@media print": { colorAdjust: "exact" }
});
var ButtonBase = /* @__PURE__ */ import_react.forwardRef(function ButtonBase$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiButtonBase"
	});
	const { action, centerRipple = false, children, className, component = "button", disabled = false, disableRipple = false, disableTouchRipple = false, focusRipple = false, focusVisibleClassName, LinkComponent = "a", onBlur, onClick, onContextMenu, onDragLeave, onFocus, onFocusVisible, onKeyDown, onKeyUp, onMouseDown, onMouseLeave, onMouseUp, onTouchEnd, onTouchMove, onTouchStart, tabIndex = 0, TouchRippleProps, touchRippleRef, type,...other } = props;
	const buttonRef = import_react.useRef(null);
	const ripple = useLazyRipple();
	const handleRippleRef = useForkRef_default(ripple.ref, touchRippleRef);
	const [focusVisible, setFocusVisible] = import_react.useState(false);
	if (disabled && focusVisible) setFocusVisible(false);
	import_react.useImperativeHandle(action, () => ({ focusVisible: () => {
		setFocusVisible(true);
		buttonRef.current.focus();
	} }), []);
	const enableTouchRipple = ripple.shouldMount && !disableRipple && !disabled;
	import_react.useEffect(() => {
		if (focusVisible && focusRipple && !disableRipple) ripple.pulsate();
	}, [
		disableRipple,
		focusRipple,
		focusVisible,
		ripple
	]);
	const handleMouseDown = useRippleHandler(ripple, "start", onMouseDown, disableTouchRipple);
	const handleContextMenu = useRippleHandler(ripple, "stop", onContextMenu, disableTouchRipple);
	const handleDragLeave = useRippleHandler(ripple, "stop", onDragLeave, disableTouchRipple);
	const handleMouseUp = useRippleHandler(ripple, "stop", onMouseUp, disableTouchRipple);
	const handleMouseLeave = useRippleHandler(ripple, "stop", (event) => {
		if (focusVisible) event.preventDefault();
		if (onMouseLeave) onMouseLeave(event);
	}, disableTouchRipple);
	const handleTouchStart = useRippleHandler(ripple, "start", onTouchStart, disableTouchRipple);
	const handleTouchEnd = useRippleHandler(ripple, "stop", onTouchEnd, disableTouchRipple);
	const handleTouchMove = useRippleHandler(ripple, "stop", onTouchMove, disableTouchRipple);
	const handleBlur = useRippleHandler(ripple, "stop", (event) => {
		if (!isFocusVisible(event.target)) setFocusVisible(false);
		if (onBlur) onBlur(event);
	}, false);
	const handleFocus = useEventCallback_default$1((event) => {
		if (!buttonRef.current) buttonRef.current = event.currentTarget;
		if (isFocusVisible(event.target)) {
			setFocusVisible(true);
			if (onFocusVisible) onFocusVisible(event);
		}
		if (onFocus) onFocus(event);
	});
	const isNonNativeButton = () => {
		const button = buttonRef.current;
		return component && component !== "button" && !(button.tagName === "A" && button.href);
	};
	const handleKeyDown = useEventCallback_default$1((event) => {
		if (focusRipple && !event.repeat && focusVisible && event.key === " ") ripple.stop(event, () => {
			ripple.start(event);
		});
		if (event.target === event.currentTarget && isNonNativeButton() && event.key === " ") event.preventDefault();
		if (onKeyDown) onKeyDown(event);
		if (event.target === event.currentTarget && isNonNativeButton() && event.key === "Enter" && !disabled) {
			event.preventDefault();
			if (onClick) onClick(event);
		}
	});
	const handleKeyUp = useEventCallback_default$1((event) => {
		if (focusRipple && event.key === " " && focusVisible && !event.defaultPrevented) ripple.stop(event, () => {
			ripple.pulsate(event);
		});
		if (onKeyUp) onKeyUp(event);
		if (onClick && event.target === event.currentTarget && isNonNativeButton() && event.key === " " && !event.defaultPrevented) onClick(event);
	});
	let ComponentProp = component;
	if (ComponentProp === "button" && (other.href || other.to)) ComponentProp = LinkComponent;
	const buttonProps = {};
	if (ComponentProp === "button") {
		buttonProps.type = type === void 0 ? "button" : type;
		buttonProps.disabled = disabled;
	} else {
		if (!other.href && !other.to) buttonProps.role = "button";
		if (disabled) buttonProps["aria-disabled"] = disabled;
	}
	const handleRef = useForkRef_default(ref, buttonRef);
	const ownerState = {
		...props,
		centerRipple,
		component,
		disabled,
		disableRipple,
		disableTouchRipple,
		focusRipple,
		tabIndex,
		focusVisible
	};
	const classes = useUtilityClasses$34(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonBaseRoot, {
		as: ComponentProp,
		className: clsx_default(classes.root, className),
		ownerState,
		onBlur: handleBlur,
		onClick,
		onContextMenu: handleContextMenu,
		onFocus: handleFocus,
		onKeyDown: handleKeyDown,
		onKeyUp: handleKeyUp,
		onMouseDown: handleMouseDown,
		onMouseLeave: handleMouseLeave,
		onMouseUp: handleMouseUp,
		onDragLeave: handleDragLeave,
		onTouchEnd: handleTouchEnd,
		onTouchMove: handleTouchMove,
		onTouchStart: handleTouchStart,
		ref: handleRef,
		tabIndex: disabled ? -1 : tabIndex,
		type,
		...buttonProps,
		...other,
		children: [children, enableTouchRipple ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchRipple_default, {
			ref: handleRippleRef,
			center: centerRipple,
			...TouchRippleProps
		}) : null]
	});
});
function useRippleHandler(ripple, rippleAction, eventCallback, skipRippleAction = false) {
	return useEventCallback_default$1((event) => {
		if (eventCallback) eventCallback(event);
		if (!skipRippleAction) ripple[rippleAction](event);
		return true;
	});
}
var ButtonBase_default = ButtonBase;
function hasCorrectMainProperty(obj) {
	return typeof obj.main === "string";
}
function checkSimplePaletteColorValues(obj, additionalPropertiesToCheck = []) {
	if (!hasCorrectMainProperty(obj)) return false;
	for (const value of additionalPropertiesToCheck) if (!obj.hasOwnProperty(value) || typeof obj[value] !== "string") return false;
	return true;
}
function createSimplePaletteValueFilter(additionalPropertiesToCheck = []) {
	return ([, value]) => value && checkSimplePaletteColorValues(value, additionalPropertiesToCheck);
}
function getAlertUtilityClass(slot) {
	return generateUtilityClass("MuiAlert", slot);
}
var alertClasses_default = generateUtilityClasses("MuiAlert", [
	"root",
	"action",
	"icon",
	"message",
	"filled",
	"colorSuccess",
	"colorInfo",
	"colorWarning",
	"colorError",
	"filledSuccess",
	"filledInfo",
	"filledWarning",
	"filledError",
	"outlined",
	"outlinedSuccess",
	"outlinedInfo",
	"outlinedWarning",
	"outlinedError",
	"standard",
	"standardSuccess",
	"standardInfo",
	"standardWarning",
	"standardError"
]);
function getCircularProgressUtilityClass(slot) {
	return generateUtilityClass("MuiCircularProgress", slot);
}
generateUtilityClasses("MuiCircularProgress", [
	"root",
	"determinate",
	"indeterminate",
	"colorPrimary",
	"colorSecondary",
	"svg",
	"track",
	"circle",
	"circleDeterminate",
	"circleIndeterminate",
	"circleDisableShrink"
]);
var SIZE = 44;
var circularRotateKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;
var circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`;
var rotateAnimation = typeof circularRotateKeyframe !== "string" ? css`
        animation: ${circularRotateKeyframe} 1.4s linear infinite;
      ` : null;
var dashAnimation = typeof circularDashKeyframe !== "string" ? css`
        animation: ${circularDashKeyframe} 1.4s ease-in-out infinite;
      ` : null;
var useUtilityClasses$33 = (ownerState) => {
	const { classes, variant, color: color$1, disableShrink } = ownerState;
	const slots = {
		root: [
			"root",
			variant,
			`color${capitalize_default(color$1)}`
		],
		svg: ["svg"],
		track: ["track"],
		circle: [
			"circle",
			`circle${capitalize_default(variant)}`,
			disableShrink && "circleDisableShrink"
		]
	};
	return composeClasses(slots, getCircularProgressUtilityClass, classes);
};
var CircularProgressRoot = styled_default("span", {
	name: "MuiCircularProgress",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.root,
			styles$4[ownerState.variant],
			styles$4[`color${capitalize_default(ownerState.color)}`]
		];
	}
})(memoTheme_default(({ theme }) => ({
	display: "inline-block",
	variants: [
		{
			props: { variant: "determinate" },
			style: { transition: theme.transitions.create("transform") }
		},
		{
			props: { variant: "indeterminate" },
			style: rotateAnimation || { animation: `${circularRotateKeyframe} 1.4s linear infinite` }
		},
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color$1]) => ({
			props: { color: color$1 },
			style: { color: (theme.vars || theme).palette[color$1].main }
		}))
	]
})));
var CircularProgressSVG = styled_default("svg", {
	name: "MuiCircularProgress",
	slot: "Svg"
})({ display: "block" });
var CircularProgressCircle = styled_default("circle", {
	name: "MuiCircularProgress",
	slot: "Circle",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.circle,
			styles$4[`circle${capitalize_default(ownerState.variant)}`],
			ownerState.disableShrink && styles$4.circleDisableShrink
		];
	}
})(memoTheme_default(({ theme }) => ({
	stroke: "currentColor",
	variants: [
		{
			props: { variant: "determinate" },
			style: { transition: theme.transitions.create("stroke-dashoffset") }
		},
		{
			props: { variant: "indeterminate" },
			style: {
				strokeDasharray: "80px, 200px",
				strokeDashoffset: 0
			}
		},
		{
			props: ({ ownerState }) => ownerState.variant === "indeterminate" && !ownerState.disableShrink,
			style: dashAnimation || { animation: `${circularDashKeyframe} 1.4s ease-in-out infinite` }
		}
	]
})));
var CircularProgressTrack = styled_default("circle", {
	name: "MuiCircularProgress",
	slot: "Track"
})(memoTheme_default(({ theme }) => ({
	stroke: "currentColor",
	opacity: (theme.vars || theme).palette.action.activatedOpacity
})));
var CircularProgress_default = /* @__PURE__ */ import_react.forwardRef(function CircularProgress$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiCircularProgress"
	});
	const { className, color: color$1 = "primary", disableShrink = false, enableTrackSlot = false, size = 40, style: style$3, thickness = 3.6, value = 0, variant = "indeterminate",...other } = props;
	const ownerState = {
		...props,
		color: color$1,
		disableShrink,
		size,
		thickness,
		value,
		variant,
		enableTrackSlot
	};
	const classes = useUtilityClasses$33(ownerState);
	const circleStyle = {};
	const rootStyle = {};
	const rootProps = {};
	if (variant === "determinate") {
		const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
		circleStyle.strokeDasharray = circumference.toFixed(3);
		rootProps["aria-valuenow"] = Math.round(value);
		circleStyle.strokeDashoffset = `${((100 - value) / 100 * circumference).toFixed(3)}px`;
		rootStyle.transform = "rotate(-90deg)";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgressRoot, {
		className: clsx_default(classes.root, className),
		style: {
			width: size,
			height: size,
			...rootStyle,
			...style$3
		},
		ownerState,
		ref,
		role: "progressbar",
		...rootProps,
		...other,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CircularProgressSVG, {
			className: classes.svg,
			ownerState,
			viewBox: `${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`,
			children: [enableTrackSlot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgressTrack, {
				className: classes.track,
				ownerState,
				cx: SIZE,
				cy: SIZE,
				r: (SIZE - thickness) / 2,
				fill: "none",
				strokeWidth: thickness,
				"aria-hidden": "true"
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgressCircle, {
				className: classes.circle,
				style: circleStyle,
				ownerState,
				cx: SIZE,
				cy: SIZE,
				r: (SIZE - thickness) / 2,
				fill: "none",
				strokeWidth: thickness
			})]
		})
	});
});
function getIconButtonUtilityClass(slot) {
	return generateUtilityClass("MuiIconButton", slot);
}
var iconButtonClasses_default = generateUtilityClasses("MuiIconButton", [
	"root",
	"disabled",
	"colorInherit",
	"colorPrimary",
	"colorSecondary",
	"colorError",
	"colorInfo",
	"colorSuccess",
	"colorWarning",
	"edgeStart",
	"edgeEnd",
	"sizeSmall",
	"sizeMedium",
	"sizeLarge",
	"loading",
	"loadingIndicator",
	"loadingWrapper"
]);
var useUtilityClasses$32 = (ownerState) => {
	const { classes, disabled, color: color$1, edge, size, loading } = ownerState;
	const slots = {
		root: [
			"root",
			loading && "loading",
			disabled && "disabled",
			color$1 !== "default" && `color${capitalize_default(color$1)}`,
			edge && `edge${capitalize_default(edge)}`,
			`size${capitalize_default(size)}`
		],
		loadingIndicator: ["loadingIndicator"],
		loadingWrapper: ["loadingWrapper"]
	};
	return composeClasses(slots, getIconButtonUtilityClass, classes);
};
var IconButtonRoot = styled_default(ButtonBase_default, {
	name: "MuiIconButton",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.root,
			ownerState.loading && styles$4.loading,
			ownerState.color !== "default" && styles$4[`color${capitalize_default(ownerState.color)}`],
			ownerState.edge && styles$4[`edge${capitalize_default(ownerState.edge)}`],
			styles$4[`size${capitalize_default(ownerState.size)}`]
		];
	}
})(memoTheme_default(({ theme }) => ({
	textAlign: "center",
	flex: "0 0 auto",
	fontSize: theme.typography.pxToRem(24),
	padding: 8,
	borderRadius: "50%",
	color: (theme.vars || theme).palette.action.active,
	transition: theme.transitions.create("background-color", { duration: theme.transitions.duration.shortest }),
	variants: [
		{
			props: (props) => !props.disableRipple,
			style: {
				"--IconButton-hoverBg": theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity),
				"&:hover": {
					backgroundColor: "var(--IconButton-hoverBg)",
					"@media (hover: none)": { backgroundColor: "transparent" }
				}
			}
		},
		{
			props: { edge: "start" },
			style: { marginLeft: -12 }
		},
		{
			props: {
				edge: "start",
				size: "small"
			},
			style: { marginLeft: -3 }
		},
		{
			props: { edge: "end" },
			style: { marginRight: -12 }
		},
		{
			props: {
				edge: "end",
				size: "small"
			},
			style: { marginRight: -3 }
		}
	]
})), memoTheme_default(({ theme }) => ({
	variants: [
		{
			props: { color: "inherit" },
			style: { color: "inherit" }
		},
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color$1]) => ({
			props: { color: color$1 },
			style: { color: (theme.vars || theme).palette[color$1].main }
		})),
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color$1]) => ({
			props: { color: color$1 },
			style: { "--IconButton-hoverBg": theme.alpha((theme.vars || theme).palette[color$1].main, (theme.vars || theme).palette.action.hoverOpacity) }
		})),
		{
			props: { size: "small" },
			style: {
				padding: 5,
				fontSize: theme.typography.pxToRem(18)
			}
		},
		{
			props: { size: "large" },
			style: {
				padding: 12,
				fontSize: theme.typography.pxToRem(28)
			}
		}
	],
	[`&.${iconButtonClasses_default.disabled}`]: {
		backgroundColor: "transparent",
		color: (theme.vars || theme).palette.action.disabled
	},
	[`&.${iconButtonClasses_default.loading}`]: { color: "transparent" }
})));
var IconButtonLoadingIndicator = styled_default("span", {
	name: "MuiIconButton",
	slot: "LoadingIndicator"
})(({ theme }) => ({
	display: "none",
	position: "absolute",
	visibility: "visible",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	color: (theme.vars || theme).palette.action.disabled,
	variants: [{
		props: { loading: true },
		style: { display: "flex" }
	}]
}));
var IconButton_default = /* @__PURE__ */ import_react.forwardRef(function IconButton$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiIconButton"
	});
	const { edge = false, children, className, color: color$1 = "default", disabled = false, disableFocusRipple = false, size = "medium", id: idProp, loading = null, loadingIndicator: loadingIndicatorProp,...other } = props;
	const loadingId = useId_default(idProp);
	const loadingIndicator = loadingIndicatorProp ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress_default, {
		"aria-labelledby": loadingId,
		color: "inherit",
		size: 16
	});
	const ownerState = {
		...props,
		edge,
		color: color$1,
		disabled,
		disableFocusRipple,
		loading,
		loadingIndicator,
		size
	};
	const classes = useUtilityClasses$32(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(IconButtonRoot, {
		id: loading ? loadingId : idProp,
		className: clsx_default(classes.root, className),
		centerRipple: true,
		focusRipple: !disableFocusRipple,
		disabled: disabled || loading,
		ref,
		...other,
		ownerState,
		children: [typeof loading === "boolean" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: classes.loadingWrapper,
			style: { display: "contents" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButtonLoadingIndicator, {
				className: classes.loadingIndicator,
				ownerState,
				children: loading && loadingIndicator
			})
		}), children]
	});
});
var SuccessOutlined_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" }), "SuccessOutlined");
var ReportProblemOutlined_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" }), "ReportProblemOutlined");
var ErrorOutline_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }), "ErrorOutline");
var InfoOutlined_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z" }), "InfoOutlined");
var Close_default$1 = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }), "Close");
var useUtilityClasses$31 = (ownerState) => {
	const { variant, color: color$1, severity, classes } = ownerState;
	const slots = {
		root: [
			"root",
			`color${capitalize_default(color$1 || severity)}`,
			`${variant}${capitalize_default(color$1 || severity)}`,
			`${variant}`
		],
		icon: ["icon"],
		message: ["message"],
		action: ["action"]
	};
	return composeClasses(slots, getAlertUtilityClass, classes);
};
var AlertRoot = styled_default(Paper_default, {
	name: "MuiAlert",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.root,
			styles$4[ownerState.variant],
			styles$4[`${ownerState.variant}${capitalize_default(ownerState.color || ownerState.severity)}`]
		];
	}
})(memoTheme_default(({ theme }) => {
	const getColor = theme.palette.mode === "light" ? theme.darken : theme.lighten;
	const getBackgroundColor = theme.palette.mode === "light" ? theme.lighten : theme.darken;
	return {
		...theme.typography.body2,
		backgroundColor: "transparent",
		display: "flex",
		padding: "6px 16px",
		variants: [
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["light"])).map(([color$1]) => ({
				props: {
					colorSeverity: color$1,
					variant: "standard"
				},
				style: {
					color: theme.vars ? theme.vars.palette.Alert[`${color$1}Color`] : getColor(theme.palette[color$1].light, .6),
					backgroundColor: theme.vars ? theme.vars.palette.Alert[`${color$1}StandardBg`] : getBackgroundColor(theme.palette[color$1].light, .9),
					[`& .${alertClasses_default.icon}`]: theme.vars ? { color: theme.vars.palette.Alert[`${color$1}IconColor`] } : { color: theme.palette[color$1].main }
				}
			})),
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["light"])).map(([color$1]) => ({
				props: {
					colorSeverity: color$1,
					variant: "outlined"
				},
				style: {
					color: theme.vars ? theme.vars.palette.Alert[`${color$1}Color`] : getColor(theme.palette[color$1].light, .6),
					border: `1px solid ${(theme.vars || theme).palette[color$1].light}`,
					[`& .${alertClasses_default.icon}`]: theme.vars ? { color: theme.vars.palette.Alert[`${color$1}IconColor`] } : { color: theme.palette[color$1].main }
				}
			})),
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["dark"])).map(([color$1]) => ({
				props: {
					colorSeverity: color$1,
					variant: "filled"
				},
				style: {
					fontWeight: theme.typography.fontWeightMedium,
					...theme.vars ? {
						color: theme.vars.palette.Alert[`${color$1}FilledColor`],
						backgroundColor: theme.vars.palette.Alert[`${color$1}FilledBg`]
					} : {
						backgroundColor: theme.palette.mode === "dark" ? theme.palette[color$1].dark : theme.palette[color$1].main,
						color: theme.palette.getContrastText(theme.palette[color$1].main)
					}
				}
			}))
		]
	};
}));
var AlertIcon = styled_default("div", {
	name: "MuiAlert",
	slot: "Icon"
})({
	marginRight: 12,
	padding: "7px 0",
	display: "flex",
	fontSize: 22,
	opacity: .9
});
var AlertMessage = styled_default("div", {
	name: "MuiAlert",
	slot: "Message"
})({
	padding: "8px 0",
	minWidth: 0,
	overflow: "auto"
});
var AlertAction = styled_default("div", {
	name: "MuiAlert",
	slot: "Action"
})({
	display: "flex",
	alignItems: "flex-start",
	padding: "4px 0 0 16px",
	marginLeft: "auto",
	marginRight: -8
});
var defaultIconMapping = {
	success: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuccessOutlined_default, { fontSize: "inherit" }),
	warning: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportProblemOutlined_default, { fontSize: "inherit" }),
	error: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorOutline_default, { fontSize: "inherit" }),
	info: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoOutlined_default, { fontSize: "inherit" })
};
var Alert_default = /* @__PURE__ */ import_react.forwardRef(function Alert$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiAlert"
	});
	const { action, children, className, closeText = "Close", color: color$1, components = {}, componentsProps = {}, icon, iconMapping = defaultIconMapping, onClose, role = "alert", severity = "success", slotProps = {}, slots = {}, variant = "standard",...other } = props;
	const ownerState = {
		...props,
		color: color$1,
		severity,
		variant,
		colorSeverity: color$1 || severity
	};
	const classes = useUtilityClasses$31(ownerState);
	const externalForwardedProps = {
		slots: {
			closeButton: components.CloseButton,
			closeIcon: components.CloseIcon,
			...slots
		},
		slotProps: {
			...componentsProps,
			...slotProps
		}
	};
	const [RootSlot, rootSlotProps] = useSlot("root", {
		ref,
		shouldForwardComponentProp: true,
		className: clsx_default(classes.root, className),
		elementType: AlertRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other
		},
		ownerState,
		additionalProps: {
			role,
			elevation: 0
		}
	});
	const [IconSlot, iconSlotProps] = useSlot("icon", {
		className: classes.icon,
		elementType: AlertIcon,
		externalForwardedProps,
		ownerState
	});
	const [MessageSlot, messageSlotProps] = useSlot("message", {
		className: classes.message,
		elementType: AlertMessage,
		externalForwardedProps,
		ownerState
	});
	const [ActionSlot, actionSlotProps] = useSlot("action", {
		className: classes.action,
		elementType: AlertAction,
		externalForwardedProps,
		ownerState
	});
	const [CloseButtonSlot, closeButtonProps] = useSlot("closeButton", {
		elementType: IconButton_default,
		externalForwardedProps,
		ownerState
	});
	const [CloseIconSlot, closeIconProps] = useSlot("closeIcon", {
		elementType: Close_default$1,
		externalForwardedProps,
		ownerState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
		...rootSlotProps,
		children: [
			icon !== false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSlot, {
				...iconSlotProps,
				children: icon || iconMapping[severity] || defaultIconMapping[severity]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSlot, {
				...messageSlotProps,
				children
			}),
			action != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionSlot, {
				...actionSlotProps,
				children: action
			}) : null,
			action == null && onClose ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionSlot, {
				...actionSlotProps,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseButtonSlot, {
					size: "small",
					"aria-label": closeText,
					title: closeText,
					color: "inherit",
					onClick: onClose,
					...closeButtonProps,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIconSlot, {
						fontSize: "small",
						...closeIconProps
					})
				})
			}) : null
		]
	});
});
function getTypographyUtilityClass(slot) {
	return generateUtilityClass("MuiTypography", slot);
}
generateUtilityClasses("MuiTypography", [
	"root",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"subtitle1",
	"subtitle2",
	"body1",
	"body2",
	"inherit",
	"button",
	"caption",
	"overline",
	"alignLeft",
	"alignRight",
	"alignCenter",
	"alignJustify",
	"noWrap",
	"gutterBottom",
	"paragraph"
]);
var v6Colors$1 = {
	primary: true,
	secondary: true,
	error: true,
	info: true,
	success: true,
	warning: true,
	textPrimary: true,
	textSecondary: true,
	textDisabled: true
};
var extendSxProp = internal_createExtendSxProp();
var useUtilityClasses$30 = (ownerState) => {
	const { align, gutterBottom, noWrap, paragraph, variant, classes } = ownerState;
	const slots = { root: [
		"root",
		variant,
		ownerState.align !== "inherit" && `align${capitalize_default(align)}`,
		gutterBottom && "gutterBottom",
		noWrap && "noWrap",
		paragraph && "paragraph"
	] };
	return composeClasses(slots, getTypographyUtilityClass, classes);
};
const TypographyRoot = styled_default("span", {
	name: "MuiTypography",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.root,
			ownerState.variant && styles$4[ownerState.variant],
			ownerState.align !== "inherit" && styles$4[`align${capitalize_default(ownerState.align)}`],
			ownerState.noWrap && styles$4.noWrap,
			ownerState.gutterBottom && styles$4.gutterBottom,
			ownerState.paragraph && styles$4.paragraph
		];
	}
})(memoTheme_default(({ theme }) => ({
	margin: 0,
	variants: [
		{
			props: { variant: "inherit" },
			style: {
				font: "inherit",
				lineHeight: "inherit",
				letterSpacing: "inherit"
			}
		},
		...Object.entries(theme.typography).filter(([variant, value]) => variant !== "inherit" && value && typeof value === "object").map(([variant, value]) => ({
			props: { variant },
			style: value
		})),
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color$1]) => ({
			props: { color: color$1 },
			style: { color: (theme.vars || theme).palette[color$1].main }
		})),
		...Object.entries(theme.palette?.text || {}).filter(([, value]) => typeof value === "string").map(([color$1]) => ({
			props: { color: `text${capitalize_default(color$1)}` },
			style: { color: (theme.vars || theme).palette.text[color$1] }
		})),
		{
			props: ({ ownerState }) => ownerState.align !== "inherit",
			style: { textAlign: "var(--Typography-textAlign)" }
		},
		{
			props: ({ ownerState }) => ownerState.noWrap,
			style: {
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			}
		},
		{
			props: ({ ownerState }) => ownerState.gutterBottom,
			style: { marginBottom: "0.35em" }
		},
		{
			props: ({ ownerState }) => ownerState.paragraph,
			style: { marginBottom: 16 }
		}
	]
})));
var defaultVariantMapping = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
	subtitle1: "h6",
	subtitle2: "h6",
	body1: "p",
	body2: "p",
	inherit: "p"
};
var Typography_default = /* @__PURE__ */ import_react.forwardRef(function Typography$1(inProps, ref) {
	const { color: color$1,...themeProps } = useDefaultProps({
		props: inProps,
		name: "MuiTypography"
	});
	const isSxColor = !v6Colors$1[color$1];
	const props = extendSxProp({
		...themeProps,
		...isSxColor && { color: color$1 }
	});
	const { align = "inherit", className, component, gutterBottom = false, noWrap = false, paragraph = false, variant = "body1", variantMapping = defaultVariantMapping,...other } = props;
	const ownerState = {
		...props,
		align,
		color: color$1,
		className,
		component,
		gutterBottom,
		noWrap,
		paragraph,
		variant,
		variantMapping
	};
	const Component$1 = component || (paragraph ? "p" : variantMapping[variant] || defaultVariantMapping[variant]) || "span";
	const classes = useUtilityClasses$30(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypographyRoot, {
		as: Component$1,
		ref,
		className: clsx_default(classes.root, className),
		...other,
		ownerState,
		style: {
			...align !== "inherit" && { "--Typography-textAlign": align },
			...other.style
		}
	});
});
function useSlotProps(parameters) {
	const { elementType, externalSlotProps, ownerState, skipResolvingSlotProps = false,...other } = parameters;
	const resolvedComponentsProps = skipResolvingSlotProps ? {} : resolveComponentProps_default(externalSlotProps, ownerState);
	const { props: mergedProps, internalRef } = mergeSlotProps_default({
		...other,
		externalSlotProps: resolvedComponentsProps
	});
	const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.additionalProps?.ref);
	return appendOwnerState_default(elementType, {
		...mergedProps,
		ref
	}, ownerState);
}
var useSlotProps_default = useSlotProps;
function getReactElementRef(element) {
	if (parseInt("19.2.0", 10) >= 19) return element?.props?.ref || null;
	return element?.ref || null;
}
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
function getContainer$1(container) {
	return typeof container === "function" ? container() : container;
}
var Portal_default = /* @__PURE__ */ import_react.forwardRef(function Portal$1(props, forwardedRef) {
	const { children, container, disablePortal = false } = props;
	const [mountNode, setMountNode] = import_react.useState(null);
	const handleRef = useForkRef(/* @__PURE__ */ import_react.isValidElement(children) ? getReactElementRef(children) : null, forwardedRef);
	useEnhancedEffect_default$1(() => {
		if (!disablePortal) setMountNode(getContainer$1(container) || document.body);
	}, [container, disablePortal]);
	useEnhancedEffect_default$1(() => {
		if (mountNode && !disablePortal) {
			setRef(forwardedRef, mountNode);
			return () => {
				setRef(forwardedRef, null);
			};
		}
	}, [
		forwardedRef,
		mountNode,
		disablePortal
	]);
	if (disablePortal) {
		if (/* @__PURE__ */ import_react.isValidElement(children)) {
			const newProps = { ref: handleRef };
			return /* @__PURE__ */ import_react.cloneElement(children, newProps);
		}
		return children;
	}
	return mountNode ? /* @__PURE__ */ import_react_dom.createPortal(children, mountNode) : mountNode;
});
function getStyleValue(value) {
	return parseInt(value, 10) || 0;
}
var styles$3 = { shadow: {
	visibility: "hidden",
	position: "absolute",
	overflow: "hidden",
	height: 0,
	top: 0,
	left: 0,
	transform: "translateZ(0)"
} };
function isObjectEmpty(object) {
	for (const _ in object) return false;
	return true;
}
function isEmpty$1(obj) {
	return isObjectEmpty(obj) || obj.outerHeightStyle === 0 && !obj.overflowing;
}
var TextareaAutosize_default = /* @__PURE__ */ import_react.forwardRef(function TextareaAutosize$1(props, forwardedRef) {
	const { onChange, maxRows, minRows = 1, style: style$3, value,...other } = props;
	const { current: isControlled } = import_react.useRef(value != null);
	const textareaRef = import_react.useRef(null);
	const handleRef = useForkRef(forwardedRef, textareaRef);
	const heightRef = import_react.useRef(null);
	const hiddenTextareaRef = import_react.useRef(null);
	const calculateTextareaStyles = import_react.useCallback(() => {
		const textarea = textareaRef.current;
		const hiddenTextarea = hiddenTextareaRef.current;
		if (!textarea || !hiddenTextarea) return;
		const computedStyle = ownerWindow(textarea).getComputedStyle(textarea);
		if (computedStyle.width === "0px") return {
			outerHeightStyle: 0,
			overflowing: false
		};
		hiddenTextarea.style.width = computedStyle.width;
		hiddenTextarea.value = textarea.value || props.placeholder || "x";
		if (hiddenTextarea.value.slice(-1) === "\n") hiddenTextarea.value += " ";
		const boxSizing$1 = computedStyle.boxSizing;
		const padding$1 = getStyleValue(computedStyle.paddingBottom) + getStyleValue(computedStyle.paddingTop);
		const border$1 = getStyleValue(computedStyle.borderBottomWidth) + getStyleValue(computedStyle.borderTopWidth);
		const innerHeight = hiddenTextarea.scrollHeight;
		hiddenTextarea.value = "x";
		const singleRowHeight = hiddenTextarea.scrollHeight;
		let outerHeight = innerHeight;
		if (minRows) outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
		if (maxRows) outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
		outerHeight = Math.max(outerHeight, singleRowHeight);
		const outerHeightStyle = outerHeight + (boxSizing$1 === "border-box" ? padding$1 + border$1 : 0);
		const overflowing = Math.abs(outerHeight - innerHeight) <= 1;
		return {
			outerHeightStyle,
			overflowing
		};
	}, [
		maxRows,
		minRows,
		props.placeholder
	]);
	const didHeightChange = useEventCallback_default(() => {
		const textarea = textareaRef.current;
		const textareaStyles = calculateTextareaStyles();
		if (!textarea || !textareaStyles || isEmpty$1(textareaStyles)) return false;
		const outerHeightStyle = textareaStyles.outerHeightStyle;
		return heightRef.current != null && heightRef.current !== outerHeightStyle;
	});
	const syncHeight = import_react.useCallback(() => {
		const textarea = textareaRef.current;
		const textareaStyles = calculateTextareaStyles();
		if (!textarea || !textareaStyles || isEmpty$1(textareaStyles)) return;
		const outerHeightStyle = textareaStyles.outerHeightStyle;
		if (heightRef.current !== outerHeightStyle) {
			heightRef.current = outerHeightStyle;
			textarea.style.height = `${outerHeightStyle}px`;
		}
		textarea.style.overflow = textareaStyles.overflowing ? "hidden" : "";
	}, [calculateTextareaStyles]);
	const frameRef = import_react.useRef(-1);
	useEnhancedEffect_default$1(() => {
		const debouncedHandleResize = debounce(syncHeight);
		const textarea = textareaRef?.current;
		if (!textarea) return;
		const containerWindow = ownerWindow(textarea);
		containerWindow.addEventListener("resize", debouncedHandleResize);
		let resizeObserver;
		if (typeof ResizeObserver !== "undefined") {
			resizeObserver = new ResizeObserver(() => {
				if (didHeightChange()) {
					resizeObserver.unobserve(textarea);
					cancelAnimationFrame(frameRef.current);
					syncHeight();
					frameRef.current = requestAnimationFrame(() => {
						resizeObserver.observe(textarea);
					});
				}
			});
			resizeObserver.observe(textarea);
		}
		return () => {
			debouncedHandleResize.clear();
			cancelAnimationFrame(frameRef.current);
			containerWindow.removeEventListener("resize", debouncedHandleResize);
			if (resizeObserver) resizeObserver.disconnect();
		};
	}, [
		calculateTextareaStyles,
		syncHeight,
		didHeightChange
	]);
	useEnhancedEffect_default$1(() => {
		syncHeight();
	});
	const handleChange = (event) => {
		if (!isControlled) syncHeight();
		const textarea = event.target;
		const countOfCharacters = textarea.value.length;
		const isLastCharacterNewLine = textarea.value.endsWith("\n");
		const isEndOfTheLine = textarea.selectionStart === countOfCharacters;
		if (isLastCharacterNewLine && isEndOfTheLine) textarea.setSelectionRange(countOfCharacters, countOfCharacters);
		if (onChange) onChange(event);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		value,
		onChange: handleChange,
		ref: handleRef,
		rows: minRows,
		style: style$3,
		...other
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"aria-hidden": true,
		className: props.className,
		readOnly: true,
		ref: hiddenTextareaRef,
		tabIndex: -1,
		style: {
			...styles$3.shadow,
			...style$3,
			paddingTop: 0,
			paddingBottom: 0
		}
	})] });
});
function formControlState({ props, states, muiFormControl }) {
	return states.reduce((acc, state) => {
		acc[state] = props[state];
		if (muiFormControl) {
			if (typeof props[state] === "undefined") acc[state] = muiFormControl[state];
		}
		return acc;
	}, {});
}
var FormControlContext_default = /* @__PURE__ */ import_react.createContext(void 0);
function useFormControl() {
	return import_react.useContext(FormControlContext_default);
}
function hasValue(value) {
	return value != null && !(Array.isArray(value) && value.length === 0);
}
function isFilled(obj, SSR = false) {
	return obj && (hasValue(obj.value) && obj.value !== "" || SSR && hasValue(obj.defaultValue) && obj.defaultValue !== "");
}
function isAdornedStart(obj) {
	return obj.startAdornment;
}
function getInputBaseUtilityClass(slot) {
	return generateUtilityClass("MuiInputBase", slot);
}
var inputBaseClasses_default = generateUtilityClasses("MuiInputBase", [
	"root",
	"formControl",
	"focused",
	"disabled",
	"adornedStart",
	"adornedEnd",
	"error",
	"sizeSmall",
	"multiline",
	"colorSecondary",
	"fullWidth",
	"hiddenLabel",
	"readOnly",
	"input",
	"inputSizeSmall",
	"inputMultiline",
	"inputTypeSearch",
	"inputAdornedStart",
	"inputAdornedEnd",
	"inputHiddenLabel"
]);
var _InputGlobalStyles;
const rootOverridesResolver = (props, styles$4) => {
	const { ownerState } = props;
	return [
		styles$4.root,
		ownerState.formControl && styles$4.formControl,
		ownerState.startAdornment && styles$4.adornedStart,
		ownerState.endAdornment && styles$4.adornedEnd,
		ownerState.error && styles$4.error,
		ownerState.size === "small" && styles$4.sizeSmall,
		ownerState.multiline && styles$4.multiline,
		ownerState.color && styles$4[`color${capitalize_default(ownerState.color)}`],
		ownerState.fullWidth && styles$4.fullWidth,
		ownerState.hiddenLabel && styles$4.hiddenLabel
	];
};
const inputOverridesResolver = (props, styles$4) => {
	const { ownerState } = props;
	return [
		styles$4.input,
		ownerState.size === "small" && styles$4.inputSizeSmall,
		ownerState.multiline && styles$4.inputMultiline,
		ownerState.type === "search" && styles$4.inputTypeSearch,
		ownerState.startAdornment && styles$4.inputAdornedStart,
		ownerState.endAdornment && styles$4.inputAdornedEnd,
		ownerState.hiddenLabel && styles$4.inputHiddenLabel
	];
};
var useUtilityClasses$29 = (ownerState) => {
	const { classes, color: color$1, disabled, error, endAdornment, focused, formControl, fullWidth, hiddenLabel, multiline, readOnly, size, startAdornment, type } = ownerState;
	const slots = {
		root: [
			"root",
			`color${capitalize_default(color$1)}`,
			disabled && "disabled",
			error && "error",
			fullWidth && "fullWidth",
			focused && "focused",
			formControl && "formControl",
			size && size !== "medium" && `size${capitalize_default(size)}`,
			multiline && "multiline",
			startAdornment && "adornedStart",
			endAdornment && "adornedEnd",
			hiddenLabel && "hiddenLabel",
			readOnly && "readOnly"
		],
		input: [
			"input",
			disabled && "disabled",
			type === "search" && "inputTypeSearch",
			multiline && "inputMultiline",
			size === "small" && "inputSizeSmall",
			hiddenLabel && "inputHiddenLabel",
			startAdornment && "inputAdornedStart",
			endAdornment && "inputAdornedEnd",
			readOnly && "readOnly"
		]
	};
	return composeClasses(slots, getInputBaseUtilityClass, classes);
};
const InputBaseRoot = styled_default("div", {
	name: "MuiInputBase",
	slot: "Root",
	overridesResolver: rootOverridesResolver
})(memoTheme_default(({ theme }) => ({
	...theme.typography.body1,
	color: (theme.vars || theme).palette.text.primary,
	lineHeight: "1.4375em",
	boxSizing: "border-box",
	position: "relative",
	cursor: "text",
	display: "inline-flex",
	alignItems: "center",
	[`&.${inputBaseClasses_default.disabled}`]: {
		color: (theme.vars || theme).palette.text.disabled,
		cursor: "default"
	},
	variants: [
		{
			props: ({ ownerState }) => ownerState.multiline,
			style: { padding: "4px 0 5px" }
		},
		{
			props: ({ ownerState, size }) => ownerState.multiline && size === "small",
			style: { paddingTop: 1 }
		},
		{
			props: ({ ownerState }) => ownerState.fullWidth,
			style: { width: "100%" }
		}
	]
})));
const InputBaseInput = styled_default("input", {
	name: "MuiInputBase",
	slot: "Input",
	overridesResolver: inputOverridesResolver
})(memoTheme_default(({ theme }) => {
	const light$1 = theme.palette.mode === "light";
	const placeholder = {
		color: "currentColor",
		...theme.vars ? { opacity: theme.vars.opacity.inputPlaceholder } : { opacity: light$1 ? .42 : .5 },
		transition: theme.transitions.create("opacity", { duration: theme.transitions.duration.shorter })
	};
	const placeholderHidden = { opacity: "0 !important" };
	const placeholderVisible = theme.vars ? { opacity: theme.vars.opacity.inputPlaceholder } : { opacity: light$1 ? .42 : .5 };
	return {
		font: "inherit",
		letterSpacing: "inherit",
		color: "currentColor",
		padding: "4px 0 5px",
		border: 0,
		boxSizing: "content-box",
		background: "none",
		height: "1.4375em",
		margin: 0,
		WebkitTapHighlightColor: "transparent",
		display: "block",
		minWidth: 0,
		width: "100%",
		"&::-webkit-input-placeholder": placeholder,
		"&::-moz-placeholder": placeholder,
		"&::-ms-input-placeholder": placeholder,
		"&:focus": { outline: 0 },
		"&:invalid": { boxShadow: "none" },
		"&::-webkit-search-decoration": { WebkitAppearance: "none" },
		[`label[data-shrink=false] + .${inputBaseClasses_default.formControl} &`]: {
			"&::-webkit-input-placeholder": placeholderHidden,
			"&::-moz-placeholder": placeholderHidden,
			"&::-ms-input-placeholder": placeholderHidden,
			"&:focus::-webkit-input-placeholder": placeholderVisible,
			"&:focus::-moz-placeholder": placeholderVisible,
			"&:focus::-ms-input-placeholder": placeholderVisible
		},
		[`&.${inputBaseClasses_default.disabled}`]: {
			opacity: 1,
			WebkitTextFillColor: (theme.vars || theme).palette.text.disabled
		},
		variants: [
			{
				props: ({ ownerState }) => !ownerState.disableInjectingGlobalStyles,
				style: {
					animationName: "mui-auto-fill-cancel",
					animationDuration: "10ms",
					"&:-webkit-autofill": {
						animationDuration: "5000s",
						animationName: "mui-auto-fill"
					}
				}
			},
			{
				props: { size: "small" },
				style: { paddingTop: 1 }
			},
			{
				props: ({ ownerState }) => ownerState.multiline,
				style: {
					height: "auto",
					resize: "none",
					padding: 0,
					paddingTop: 0
				}
			},
			{
				props: { type: "search" },
				style: { MozAppearance: "textfield" }
			}
		]
	};
}));
var InputGlobalStyles = globalCss({
	"@keyframes mui-auto-fill": { from: { display: "block" } },
	"@keyframes mui-auto-fill-cancel": { from: { display: "block" } }
});
var InputBase_default = /* @__PURE__ */ import_react.forwardRef(function InputBase$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiInputBase"
	});
	const { "aria-describedby": ariaDescribedby, autoComplete, autoFocus, className, color: color$1, components = {}, componentsProps = {}, defaultValue, disabled, disableInjectingGlobalStyles, endAdornment, error, fullWidth = false, id, inputComponent = "input", inputProps: inputPropsProp = {}, inputRef: inputRefProp, margin: margin$1, maxRows, minRows, multiline = false, name, onBlur, onChange, onClick, onFocus, onKeyDown, onKeyUp, placeholder, readOnly, renderSuffix, rows, size, slotProps = {}, slots = {}, startAdornment, type = "text", value: valueProp,...other } = props;
	const value = inputPropsProp.value != null ? inputPropsProp.value : valueProp;
	const { current: isControlled } = import_react.useRef(value != null);
	const inputRef = import_react.useRef();
	const handleInputRefWarning = import_react.useCallback((instance) => {}, []);
	const handleInputRef = useForkRef_default(inputRef, inputRefProp, inputPropsProp.ref, handleInputRefWarning);
	const [focused, setFocused] = import_react.useState(false);
	const muiFormControl = useFormControl();
	const fcs = formControlState({
		props,
		muiFormControl,
		states: [
			"color",
			"disabled",
			"error",
			"hiddenLabel",
			"size",
			"required",
			"filled"
		]
	});
	fcs.focused = muiFormControl ? muiFormControl.focused : focused;
	import_react.useEffect(() => {
		if (!muiFormControl && disabled && focused) {
			setFocused(false);
			if (onBlur) onBlur();
		}
	}, [
		muiFormControl,
		disabled,
		focused,
		onBlur
	]);
	const onFilled = muiFormControl && muiFormControl.onFilled;
	const onEmpty = muiFormControl && muiFormControl.onEmpty;
	const checkDirty = import_react.useCallback((obj) => {
		if (isFilled(obj)) {
			if (onFilled) onFilled();
		} else if (onEmpty) onEmpty();
	}, [onFilled, onEmpty]);
	useEnhancedEffect_default(() => {
		if (isControlled) checkDirty({ value });
	}, [
		value,
		checkDirty,
		isControlled
	]);
	const handleFocus = (event) => {
		if (onFocus) onFocus(event);
		if (inputPropsProp.onFocus) inputPropsProp.onFocus(event);
		if (muiFormControl && muiFormControl.onFocus) muiFormControl.onFocus(event);
		else setFocused(true);
	};
	const handleBlur = (event) => {
		if (onBlur) onBlur(event);
		if (inputPropsProp.onBlur) inputPropsProp.onBlur(event);
		if (muiFormControl && muiFormControl.onBlur) muiFormControl.onBlur(event);
		else setFocused(false);
	};
	const handleChange = (event, ...args) => {
		if (!isControlled) {
			const element = event.target || inputRef.current;
			if (element == null) throw new Error(formatMuiErrorMessage(1));
			checkDirty({ value: element.value });
		}
		if (inputPropsProp.onChange) inputPropsProp.onChange(event, ...args);
		if (onChange) onChange(event, ...args);
	};
	import_react.useEffect(() => {
		checkDirty(inputRef.current);
	}, []);
	const handleClick = (event) => {
		if (inputRef.current && event.currentTarget === event.target) inputRef.current.focus();
		if (onClick) onClick(event);
	};
	let InputComponent = inputComponent;
	let inputProps = inputPropsProp;
	if (multiline && InputComponent === "input") {
		if (rows) inputProps = {
			type: void 0,
			minRows: rows,
			maxRows: rows,
			...inputProps
		};
		else inputProps = {
			type: void 0,
			maxRows,
			minRows,
			...inputProps
		};
		InputComponent = TextareaAutosize_default;
	}
	const handleAutoFill = (event) => {
		checkDirty(event.animationName === "mui-auto-fill-cancel" ? inputRef.current : { value: "x" });
	};
	import_react.useEffect(() => {
		if (muiFormControl) muiFormControl.setAdornedStart(Boolean(startAdornment));
	}, [muiFormControl, startAdornment]);
	const ownerState = {
		...props,
		color: fcs.color || "primary",
		disabled: fcs.disabled,
		endAdornment,
		error: fcs.error,
		focused: fcs.focused,
		formControl: muiFormControl,
		fullWidth,
		hiddenLabel: fcs.hiddenLabel,
		multiline,
		size: fcs.size,
		startAdornment,
		type
	};
	const classes = useUtilityClasses$29(ownerState);
	const Root = slots.root || components.Root || InputBaseRoot;
	const rootProps = slotProps.root || componentsProps.root || {};
	const Input$1 = slots.input || components.Input || InputBaseInput;
	inputProps = {
		...inputProps,
		...slotProps.input ?? componentsProps.input
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [!disableInjectingGlobalStyles && typeof InputGlobalStyles === "function" && (_InputGlobalStyles || (_InputGlobalStyles = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGlobalStyles, {}))), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
		...rootProps,
		ref,
		onClick: handleClick,
		...other,
		...!isHostComponent_default(Root) && { ownerState: {
			...ownerState,
			...rootProps.ownerState
		} },
		className: clsx_default(classes.root, rootProps.className, className, readOnly && "MuiInputBase-readOnly"),
		children: [
			startAdornment,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControlContext_default.Provider, {
				value: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					"aria-invalid": fcs.error,
					"aria-describedby": ariaDescribedby,
					autoComplete,
					autoFocus,
					defaultValue,
					disabled: fcs.disabled,
					id,
					onAnimationStart: handleAutoFill,
					name,
					placeholder,
					readOnly,
					required: fcs.required,
					rows,
					value,
					onKeyDown,
					onKeyUp,
					type,
					...inputProps,
					...!isHostComponent_default(Input$1) && {
						as: InputComponent,
						ownerState: {
							...ownerState,
							...inputProps.ownerState
						}
					},
					ref: handleInputRef,
					className: clsx_default(classes.input, inputProps.className, readOnly && "MuiInputBase-readOnly"),
					onBlur: handleBlur,
					onChange: handleChange,
					onFocus: handleFocus
				})
			}),
			endAdornment,
			renderSuffix ? renderSuffix({
				...fcs,
				startAdornment
			}) : null
		]
	})] });
});
function getInputUtilityClass(slot) {
	return generateUtilityClass("MuiInput", slot);
}
var inputClasses_default = {
	...inputBaseClasses_default,
	...generateUtilityClasses("MuiInput", [
		"root",
		"underline",
		"input"
	])
};
function getOutlinedInputUtilityClass(slot) {
	return generateUtilityClass("MuiOutlinedInput", slot);
}
var outlinedInputClasses_default = {
	...inputBaseClasses_default,
	...generateUtilityClasses("MuiOutlinedInput", [
		"root",
		"notchedOutline",
		"input"
	])
};
function getFilledInputUtilityClass(slot) {
	return generateUtilityClass("MuiFilledInput", slot);
}
var filledInputClasses_default = {
	...inputBaseClasses_default,
	...generateUtilityClasses("MuiFilledInput", [
		"root",
		"underline",
		"input",
		"adornedStart",
		"adornedEnd",
		"sizeSmall",
		"multiline",
		"hiddenLabel"
	])
};
var ArrowDropDown_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 10l5 5 5-5z" }), "ArrowDropDown");
var styles$2 = {
	entering: { opacity: 1 },
	entered: { opacity: 1 }
};
var Fade_default = /* @__PURE__ */ import_react.forwardRef(function Fade$1(props, ref) {
	const theme = useTheme();
	const defaultTimeout = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	};
	const { addEndListener, appear = true, children, easing: easing$1, in: inProp, onEnter, onEntered, onEntering, onExit, onExited, onExiting, style: style$3, timeout = defaultTimeout, TransitionComponent = Transition_default,...other } = props;
	const nodeRef = import_react.useRef(null);
	const handleRef = useForkRef_default(nodeRef, getReactElementRef(children), ref);
	const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
		if (callback) {
			const node$1 = nodeRef.current;
			if (maybeIsAppearing === void 0) callback(node$1);
			else callback(node$1, maybeIsAppearing);
		}
	};
	const handleEntering = normalizedTransitionCallback(onEntering);
	const handleEnter = normalizedTransitionCallback((node$1, isAppearing) => {
		reflow(node$1);
		const transitionProps = getTransitionProps({
			style: style$3,
			timeout,
			easing: easing$1
		}, { mode: "enter" });
		node$1.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
		node$1.style.transition = theme.transitions.create("opacity", transitionProps);
		if (onEnter) onEnter(node$1, isAppearing);
	});
	const handleEntered = normalizedTransitionCallback(onEntered);
	const handleExiting = normalizedTransitionCallback(onExiting);
	const handleExit = normalizedTransitionCallback((node$1) => {
		const transitionProps = getTransitionProps({
			style: style$3,
			timeout,
			easing: easing$1
		}, { mode: "exit" });
		node$1.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
		node$1.style.transition = theme.transitions.create("opacity", transitionProps);
		if (onExit) onExit(node$1);
	});
	const handleExited = normalizedTransitionCallback(onExited);
	const handleAddEndListener = (next$1) => {
		if (addEndListener) addEndListener(nodeRef.current, next$1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionComponent, {
		appear,
		in: inProp,
		nodeRef,
		onEnter: handleEnter,
		onEntered: handleEntered,
		onEntering: handleEntering,
		onExit: handleExit,
		onExited: handleExited,
		onExiting: handleExiting,
		addEndListener: handleAddEndListener,
		timeout,
		...other,
		children: (state, { ownerState,...restChildProps }) => {
			return /* @__PURE__ */ import_react.cloneElement(children, {
				style: {
					opacity: 0,
					visibility: state === "exited" && !inProp ? "hidden" : void 0,
					...styles$2[state],
					...style$3,
					...children.props.style
				},
				ref: handleRef,
				...restChildProps
			});
		}
	});
});
function getBackdropUtilityClass(slot) {
	return generateUtilityClass("MuiBackdrop", slot);
}
generateUtilityClasses("MuiBackdrop", ["root", "invisible"]);
var useUtilityClasses$28 = (ownerState) => {
	const { classes, invisible } = ownerState;
	return composeClasses({ root: ["root", invisible && "invisible"] }, getBackdropUtilityClass, classes);
};
var BackdropRoot = styled_default("div", {
	name: "MuiBackdrop",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [styles$4.root, ownerState.invisible && styles$4.invisible];
	}
})({
	position: "fixed",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	right: 0,
	bottom: 0,
	top: 0,
	left: 0,
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	WebkitTapHighlightColor: "transparent",
	variants: [{
		props: { invisible: true },
		style: { backgroundColor: "transparent" }
	}]
});
var Backdrop_default = /* @__PURE__ */ import_react.forwardRef(function Backdrop$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiBackdrop"
	});
	const { children, className, component = "div", invisible = false, open, components = {}, componentsProps = {}, slotProps = {}, slots = {}, TransitionComponent: TransitionComponentProp, transitionDuration,...other } = props;
	const ownerState = {
		...props,
		component,
		invisible
	};
	const classes = useUtilityClasses$28(ownerState);
	const backwardCompatibleSlots = {
		transition: TransitionComponentProp,
		root: components.Root,
		...slots
	};
	const backwardCompatibleSlotProps = {
		...componentsProps,
		...slotProps
	};
	const externalForwardedProps = {
		component,
		slots: backwardCompatibleSlots,
		slotProps: backwardCompatibleSlotProps
	};
	const [RootSlot, rootProps] = useSlot("root", {
		elementType: BackdropRoot,
		externalForwardedProps,
		className: clsx_default(classes.root, className),
		ownerState
	});
	const [TransitionSlot, transitionProps] = useSlot("transition", {
		elementType: Fade_default,
		externalForwardedProps,
		ownerState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionSlot, {
		in: open,
		timeout: transitionDuration,
		...other,
		...transitionProps,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootSlot, {
			"aria-hidden": true,
			...rootProps,
			classes,
			ref,
			children
		})
	});
});
var boxClasses_default = generateUtilityClasses("MuiBox", ["root"]);
var defaultTheme = createTheme();
var Box_default = createBox({
	themeId: identifier_default,
	defaultTheme,
	defaultClassName: boxClasses_default.root,
	generateClassName: ClassNameGenerator_default.generate
});
function getButtonUtilityClass(slot) {
	return generateUtilityClass("MuiButton", slot);
}
var buttonClasses_default = generateUtilityClasses("MuiButton", [
	"root",
	"text",
	"textInherit",
	"textPrimary",
	"textSecondary",
	"textSuccess",
	"textError",
	"textInfo",
	"textWarning",
	"outlined",
	"outlinedInherit",
	"outlinedPrimary",
	"outlinedSecondary",
	"outlinedSuccess",
	"outlinedError",
	"outlinedInfo",
	"outlinedWarning",
	"contained",
	"containedInherit",
	"containedPrimary",
	"containedSecondary",
	"containedSuccess",
	"containedError",
	"containedInfo",
	"containedWarning",
	"disableElevation",
	"focusVisible",
	"disabled",
	"colorInherit",
	"colorPrimary",
	"colorSecondary",
	"colorSuccess",
	"colorError",
	"colorInfo",
	"colorWarning",
	"textSizeSmall",
	"textSizeMedium",
	"textSizeLarge",
	"outlinedSizeSmall",
	"outlinedSizeMedium",
	"outlinedSizeLarge",
	"containedSizeSmall",
	"containedSizeMedium",
	"containedSizeLarge",
	"sizeMedium",
	"sizeSmall",
	"sizeLarge",
	"fullWidth",
	"startIcon",
	"endIcon",
	"icon",
	"iconSizeSmall",
	"iconSizeMedium",
	"iconSizeLarge",
	"loading",
	"loadingWrapper",
	"loadingIconPlaceholder",
	"loadingIndicator",
	"loadingPositionCenter",
	"loadingPositionStart",
	"loadingPositionEnd"
]);
var ButtonGroupContext_default = /* @__PURE__ */ import_react.createContext({});
var ButtonGroupButtonContext_default = /* @__PURE__ */ import_react.createContext(void 0);
var useUtilityClasses$27 = (ownerState) => {
	const { color: color$1, disableElevation, fullWidth, size, variant, loading, loadingPosition, classes } = ownerState;
	const slots = {
		root: [
			"root",
			loading && "loading",
			variant,
			`${variant}${capitalize_default(color$1)}`,
			`size${capitalize_default(size)}`,
			`${variant}Size${capitalize_default(size)}`,
			`color${capitalize_default(color$1)}`,
			disableElevation && "disableElevation",
			fullWidth && "fullWidth",
			loading && `loadingPosition${capitalize_default(loadingPosition)}`
		],
		startIcon: [
			"icon",
			"startIcon",
			`iconSize${capitalize_default(size)}`
		],
		endIcon: [
			"icon",
			"endIcon",
			`iconSize${capitalize_default(size)}`
		],
		loadingIndicator: ["loadingIndicator"],
		loadingWrapper: ["loadingWrapper"]
	};
	const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var commonIconStyles = [
	{
		props: { size: "small" },
		style: { "& > *:nth-of-type(1)": { fontSize: 18 } }
	},
	{
		props: { size: "medium" },
		style: { "& > *:nth-of-type(1)": { fontSize: 20 } }
	},
	{
		props: { size: "large" },
		style: { "& > *:nth-of-type(1)": { fontSize: 22 } }
	}
];
var ButtonRoot = styled_default(ButtonBase_default, {
	shouldForwardProp: (prop) => rootShouldForwardProp_default(prop) || prop === "classes",
	name: "MuiButton",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.root,
			styles$4[ownerState.variant],
			styles$4[`${ownerState.variant}${capitalize_default(ownerState.color)}`],
			styles$4[`size${capitalize_default(ownerState.size)}`],
			styles$4[`${ownerState.variant}Size${capitalize_default(ownerState.size)}`],
			ownerState.color === "inherit" && styles$4.colorInherit,
			ownerState.disableElevation && styles$4.disableElevation,
			ownerState.fullWidth && styles$4.fullWidth,
			ownerState.loading && styles$4.loading
		];
	}
})(memoTheme_default(({ theme }) => {
	const inheritContainedBackgroundColor = theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[800];
	const inheritContainedHoverBackgroundColor = theme.palette.mode === "light" ? theme.palette.grey.A100 : theme.palette.grey[700];
	return {
		...theme.typography.button,
		minWidth: 64,
		padding: "6px 16px",
		border: 0,
		borderRadius: (theme.vars || theme).shape.borderRadius,
		transition: theme.transitions.create([
			"background-color",
			"box-shadow",
			"border-color",
			"color"
		], { duration: theme.transitions.duration.short }),
		"&:hover": { textDecoration: "none" },
		[`&.${buttonClasses_default.disabled}`]: { color: (theme.vars || theme).palette.action.disabled },
		variants: [
			{
				props: { variant: "contained" },
				style: {
					color: `var(--variant-containedColor)`,
					backgroundColor: `var(--variant-containedBg)`,
					boxShadow: (theme.vars || theme).shadows[2],
					"&:hover": {
						boxShadow: (theme.vars || theme).shadows[4],
						"@media (hover: none)": { boxShadow: (theme.vars || theme).shadows[2] }
					},
					"&:active": { boxShadow: (theme.vars || theme).shadows[8] },
					[`&.${buttonClasses_default.focusVisible}`]: { boxShadow: (theme.vars || theme).shadows[6] },
					[`&.${buttonClasses_default.disabled}`]: {
						color: (theme.vars || theme).palette.action.disabled,
						boxShadow: (theme.vars || theme).shadows[0],
						backgroundColor: (theme.vars || theme).palette.action.disabledBackground
					}
				}
			},
			{
				props: { variant: "outlined" },
				style: {
					padding: "5px 15px",
					border: "1px solid currentColor",
					borderColor: `var(--variant-outlinedBorder, currentColor)`,
					backgroundColor: `var(--variant-outlinedBg)`,
					color: `var(--variant-outlinedColor)`,
					[`&.${buttonClasses_default.disabled}`]: { border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}` }
				}
			},
			{
				props: { variant: "text" },
				style: {
					padding: "6px 8px",
					color: `var(--variant-textColor)`,
					backgroundColor: `var(--variant-textBg)`
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color$1]) => ({
				props: { color: color$1 },
				style: {
					"--variant-textColor": (theme.vars || theme).palette[color$1].main,
					"--variant-outlinedColor": (theme.vars || theme).palette[color$1].main,
					"--variant-outlinedBorder": theme.alpha((theme.vars || theme).palette[color$1].main, .5),
					"--variant-containedColor": (theme.vars || theme).palette[color$1].contrastText,
					"--variant-containedBg": (theme.vars || theme).palette[color$1].main,
					"@media (hover: hover)": { "&:hover": {
						"--variant-containedBg": (theme.vars || theme).palette[color$1].dark,
						"--variant-textBg": theme.alpha((theme.vars || theme).palette[color$1].main, (theme.vars || theme).palette.action.hoverOpacity),
						"--variant-outlinedBorder": (theme.vars || theme).palette[color$1].main,
						"--variant-outlinedBg": theme.alpha((theme.vars || theme).palette[color$1].main, (theme.vars || theme).palette.action.hoverOpacity)
					} }
				}
			})),
			{
				props: { color: "inherit" },
				style: {
					color: "inherit",
					borderColor: "currentColor",
					"--variant-containedBg": theme.vars ? theme.vars.palette.Button.inheritContainedBg : inheritContainedBackgroundColor,
					"@media (hover: hover)": { "&:hover": {
						"--variant-containedBg": theme.vars ? theme.vars.palette.Button.inheritContainedHoverBg : inheritContainedHoverBackgroundColor,
						"--variant-textBg": theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.hoverOpacity),
						"--variant-outlinedBg": theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.hoverOpacity)
					} }
				}
			},
			{
				props: {
					size: "small",
					variant: "text"
				},
				style: {
					padding: "4px 5px",
					fontSize: theme.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "text"
				},
				style: {
					padding: "8px 11px",
					fontSize: theme.typography.pxToRem(15)
				}
			},
			{
				props: {
					size: "small",
					variant: "outlined"
				},
				style: {
					padding: "3px 9px",
					fontSize: theme.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "outlined"
				},
				style: {
					padding: "7px 21px",
					fontSize: theme.typography.pxToRem(15)
				}
			},
			{
				props: {
					size: "small",
					variant: "contained"
				},
				style: {
					padding: "4px 10px",
					fontSize: theme.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "contained"
				},
				style: {
					padding: "8px 22px",
					fontSize: theme.typography.pxToRem(15)
				}
			},
			{
				props: { disableElevation: true },
				style: {
					boxShadow: "none",
					"&:hover": { boxShadow: "none" },
					[`&.${buttonClasses_default.focusVisible}`]: { boxShadow: "none" },
					"&:active": { boxShadow: "none" },
					[`&.${buttonClasses_default.disabled}`]: { boxShadow: "none" }
				}
			},
			{
				props: { fullWidth: true },
				style: { width: "100%" }
			},
			{
				props: { loadingPosition: "center" },
				style: {
					transition: theme.transitions.create([
						"background-color",
						"box-shadow",
						"border-color"
					], { duration: theme.transitions.duration.short }),
					[`&.${buttonClasses_default.loading}`]: { color: "transparent" }
				}
			}
		]
	};
}));
var ButtonStartIcon = styled_default("span", {
	name: "MuiButton",
	slot: "StartIcon",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.startIcon,
			ownerState.loading && styles$4.startIconLoadingStart,
			styles$4[`iconSize${capitalize_default(ownerState.size)}`]
		];
	}
})(({ theme }) => ({
	display: "inherit",
	marginRight: 8,
	marginLeft: -4,
	variants: [
		{
			props: { size: "small" },
			style: { marginLeft: -2 }
		},
		{
			props: {
				loadingPosition: "start",
				loading: true
			},
			style: {
				transition: theme.transitions.create(["opacity"], { duration: theme.transitions.duration.short }),
				opacity: 0
			}
		},
		{
			props: {
				loadingPosition: "start",
				loading: true,
				fullWidth: true
			},
			style: { marginRight: -8 }
		},
		...commonIconStyles
	]
}));
var ButtonEndIcon = styled_default("span", {
	name: "MuiButton",
	slot: "EndIcon",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.endIcon,
			ownerState.loading && styles$4.endIconLoadingEnd,
			styles$4[`iconSize${capitalize_default(ownerState.size)}`]
		];
	}
})(({ theme }) => ({
	display: "inherit",
	marginRight: -4,
	marginLeft: 8,
	variants: [
		{
			props: { size: "small" },
			style: { marginRight: -2 }
		},
		{
			props: {
				loadingPosition: "end",
				loading: true
			},
			style: {
				transition: theme.transitions.create(["opacity"], { duration: theme.transitions.duration.short }),
				opacity: 0
			}
		},
		{
			props: {
				loadingPosition: "end",
				loading: true,
				fullWidth: true
			},
			style: { marginLeft: -8 }
		},
		...commonIconStyles
	]
}));
var ButtonLoadingIndicator = styled_default("span", {
	name: "MuiButton",
	slot: "LoadingIndicator"
})(({ theme }) => ({
	display: "none",
	position: "absolute",
	visibility: "visible",
	variants: [
		{
			props: { loading: true },
			style: { display: "flex" }
		},
		{
			props: { loadingPosition: "start" },
			style: { left: 14 }
		},
		{
			props: {
				loadingPosition: "start",
				size: "small"
			},
			style: { left: 10 }
		},
		{
			props: {
				variant: "text",
				loadingPosition: "start"
			},
			style: { left: 6 }
		},
		{
			props: { loadingPosition: "center" },
			style: {
				left: "50%",
				transform: "translate(-50%)",
				color: (theme.vars || theme).palette.action.disabled
			}
		},
		{
			props: { loadingPosition: "end" },
			style: { right: 14 }
		},
		{
			props: {
				loadingPosition: "end",
				size: "small"
			},
			style: { right: 10 }
		},
		{
			props: {
				variant: "text",
				loadingPosition: "end"
			},
			style: { right: 6 }
		},
		{
			props: {
				loadingPosition: "start",
				fullWidth: true
			},
			style: {
				position: "relative",
				left: -10
			}
		},
		{
			props: {
				loadingPosition: "end",
				fullWidth: true
			},
			style: {
				position: "relative",
				right: -10
			}
		}
	]
}));
var ButtonLoadingIconPlaceholder = styled_default("span", {
	name: "MuiButton",
	slot: "LoadingIconPlaceholder"
})({
	display: "inline-block",
	width: "1em",
	height: "1em"
});
var Button_default = /* @__PURE__ */ import_react.forwardRef(function Button$1(inProps, ref) {
	const contextProps = import_react.useContext(ButtonGroupContext_default);
	const buttonGroupButtonContextPositionClassName = import_react.useContext(ButtonGroupButtonContext_default);
	const resolvedProps = resolveProps(contextProps, inProps);
	const props = useDefaultProps({
		props: resolvedProps,
		name: "MuiButton"
	});
	const { children, color: color$1 = "primary", component = "button", className, disabled = false, disableElevation = false, disableFocusRipple = false, endIcon: endIconProp, focusVisibleClassName, fullWidth = false, id: idProp, loading = null, loadingIndicator: loadingIndicatorProp, loadingPosition = "center", size = "medium", startIcon: startIconProp, type, variant = "text",...other } = props;
	const loadingId = useId_default(idProp);
	const loadingIndicator = loadingIndicatorProp ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress_default, {
		"aria-labelledby": loadingId,
		color: "inherit",
		size: 16
	});
	const ownerState = {
		...props,
		color: color$1,
		component,
		disabled,
		disableElevation,
		disableFocusRipple,
		fullWidth,
		loading,
		loadingIndicator,
		loadingPosition,
		size,
		type,
		variant
	};
	const classes = useUtilityClasses$27(ownerState);
	const startIcon = (startIconProp || loading && loadingPosition === "start") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonStartIcon, {
		className: classes.startIcon,
		ownerState,
		children: startIconProp || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLoadingIconPlaceholder, {
			className: classes.loadingIconPlaceholder,
			ownerState
		})
	});
	const endIcon = (endIconProp || loading && loadingPosition === "end") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonEndIcon, {
		className: classes.endIcon,
		ownerState,
		children: endIconProp || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLoadingIconPlaceholder, {
			className: classes.loadingIconPlaceholder,
			ownerState
		})
	});
	const positionClassName = buttonGroupButtonContextPositionClassName || "";
	const loader = typeof loading === "boolean" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: classes.loadingWrapper,
		style: { display: "contents" },
		children: loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLoadingIndicator, {
			className: classes.loadingIndicator,
			ownerState,
			children: loadingIndicator
		})
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonRoot, {
		ownerState,
		className: clsx_default(contextProps.className, classes.root, className, positionClassName),
		component,
		disabled: disabled || loading,
		focusRipple: !disableFocusRipple,
		focusVisibleClassName: clsx_default(classes.focusVisible, focusVisibleClassName),
		ref,
		type,
		id: loading ? loadingId : idProp,
		...other,
		classes,
		children: [
			startIcon,
			loadingPosition !== "end" && loader,
			children,
			loadingPosition === "end" && loader,
			endIcon
		]
	});
});
function getSwitchBaseUtilityClass(slot) {
	return generateUtilityClass("PrivateSwitchBase", slot);
}
generateUtilityClasses("PrivateSwitchBase", [
	"root",
	"checked",
	"disabled",
	"input",
	"edgeStart",
	"edgeEnd"
]);
var useUtilityClasses$26 = (ownerState) => {
	const { classes, checked, disabled, edge } = ownerState;
	const slots = {
		root: [
			"root",
			checked && "checked",
			disabled && "disabled",
			edge && `edge${capitalize_default(edge)}`
		],
		input: ["input"]
	};
	return composeClasses(slots, getSwitchBaseUtilityClass, classes);
};
var SwitchBaseRoot = styled_default(ButtonBase_default, { name: "MuiSwitchBase" })({
	padding: 9,
	borderRadius: "50%",
	variants: [
		{
			props: {
				edge: "start",
				size: "small"
			},
			style: { marginLeft: -3 }
		},
		{
			props: ({ edge, ownerState }) => edge === "start" && ownerState.size !== "small",
			style: { marginLeft: -12 }
		},
		{
			props: {
				edge: "end",
				size: "small"
			},
			style: { marginRight: -3 }
		},
		{
			props: ({ edge, ownerState }) => edge === "end" && ownerState.size !== "small",
			style: { marginRight: -12 }
		}
	]
});
var SwitchBaseInput = styled_default("input", {
	name: "MuiSwitchBase",
	shouldForwardProp: rootShouldForwardProp_default
})({
	cursor: "inherit",
	position: "absolute",
	opacity: 0,
	width: "100%",
	height: "100%",
	top: 0,
	left: 0,
	margin: 0,
	padding: 0,
	zIndex: 1
});
var SwitchBase_default = /* @__PURE__ */ import_react.forwardRef(function SwitchBase$1(props, ref) {
	const { autoFocus, checked: checkedProp, checkedIcon, defaultChecked, disabled: disabledProp, disableFocusRipple = false, edge = false, icon, id, inputProps, inputRef, name, onBlur, onChange, onFocus, readOnly, required = false, tabIndex, type, value, slots = {}, slotProps = {},...other } = props;
	const [checked, setCheckedState] = useControlled_default({
		controlled: checkedProp,
		default: Boolean(defaultChecked),
		name: "SwitchBase",
		state: "checked"
	});
	const muiFormControl = useFormControl();
	const handleFocus = (event) => {
		if (onFocus) onFocus(event);
		if (muiFormControl && muiFormControl.onFocus) muiFormControl.onFocus(event);
	};
	const handleBlur = (event) => {
		if (onBlur) onBlur(event);
		if (muiFormControl && muiFormControl.onBlur) muiFormControl.onBlur(event);
	};
	const handleInputChange = (event) => {
		if (event.nativeEvent.defaultPrevented) return;
		const newChecked = event.target.checked;
		setCheckedState(newChecked);
		if (onChange) onChange(event, newChecked);
	};
	let disabled = disabledProp;
	if (muiFormControl) {
		if (typeof disabled === "undefined") disabled = muiFormControl.disabled;
	}
	const hasLabelFor = type === "checkbox" || type === "radio";
	const ownerState = {
		...props,
		checked,
		disabled,
		disableFocusRipple,
		edge
	};
	const classes = useUtilityClasses$26(ownerState);
	const externalForwardedProps = {
		slots,
		slotProps: {
			input: inputProps,
			...slotProps
		}
	};
	const [RootSlot, rootSlotProps] = useSlot("root", {
		ref,
		elementType: SwitchBaseRoot,
		className: classes.root,
		shouldForwardComponentProp: true,
		externalForwardedProps: {
			...externalForwardedProps,
			component: "span",
			...other
		},
		getSlotProps: (handlers) => ({
			...handlers,
			onFocus: (event) => {
				handlers.onFocus?.(event);
				handleFocus(event);
			},
			onBlur: (event) => {
				handlers.onBlur?.(event);
				handleBlur(event);
			}
		}),
		ownerState,
		additionalProps: {
			centerRipple: true,
			focusRipple: !disableFocusRipple,
			disabled,
			role: void 0,
			tabIndex: null
		}
	});
	const [InputSlot, inputSlotProps] = useSlot("input", {
		ref: inputRef,
		elementType: SwitchBaseInput,
		className: classes.input,
		externalForwardedProps,
		getSlotProps: (handlers) => ({
			...handlers,
			onChange: (event) => {
				handlers.onChange?.(event);
				handleInputChange(event);
			}
		}),
		ownerState,
		additionalProps: {
			autoFocus,
			checked: checkedProp,
			defaultChecked,
			disabled,
			id: hasLabelFor ? id : void 0,
			name,
			readOnly,
			required,
			tabIndex,
			type,
			...type === "checkbox" && value === void 0 ? {} : { value }
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
		...rootSlotProps,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputSlot, { ...inputSlotProps }), checked ? checkedIcon : icon]
	});
});
function mapEventPropToEvent(eventProp) {
	return eventProp.substring(2).toLowerCase();
}
function clickedRootScrollbar(event, doc) {
	return doc.documentElement.clientWidth < event.clientX || doc.documentElement.clientHeight < event.clientY;
}
function ClickAwayListener(props) {
	const { children, disableReactTree = false, mouseEvent = "onClick", onClickAway, touchEvent = "onTouchEnd" } = props;
	const movedRef = import_react.useRef(false);
	const nodeRef = import_react.useRef(null);
	const activatedRef = import_react.useRef(false);
	const syntheticEventRef = import_react.useRef(false);
	import_react.useEffect(() => {
		setTimeout(() => {
			activatedRef.current = true;
		}, 0);
		return () => {
			activatedRef.current = false;
		};
	}, []);
	const handleRef = useForkRef(getReactElementRef(children), nodeRef);
	const handleClickAway = useEventCallback_default((event) => {
		const insideReactTree = syntheticEventRef.current;
		syntheticEventRef.current = false;
		const doc = ownerDocument(nodeRef.current);
		if (!activatedRef.current || !nodeRef.current || "clientX" in event && clickedRootScrollbar(event, doc)) return;
		if (movedRef.current) {
			movedRef.current = false;
			return;
		}
		let insideDOM;
		if (event.composedPath) insideDOM = event.composedPath().includes(nodeRef.current);
		else insideDOM = !doc.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
		if (!insideDOM && (disableReactTree || !insideReactTree)) onClickAway(event);
	});
	const createHandleSynthetic = (handlerName) => (event) => {
		syntheticEventRef.current = true;
		const childrenPropsHandler = children.props[handlerName];
		if (childrenPropsHandler) childrenPropsHandler(event);
	};
	const childrenProps = { ref: handleRef };
	if (touchEvent !== false) childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
	import_react.useEffect(() => {
		if (touchEvent !== false) {
			const mappedTouchEvent = mapEventPropToEvent(touchEvent);
			const doc = ownerDocument(nodeRef.current);
			const handleTouchMove = () => {
				movedRef.current = true;
			};
			doc.addEventListener(mappedTouchEvent, handleClickAway);
			doc.addEventListener("touchmove", handleTouchMove);
			return () => {
				doc.removeEventListener(mappedTouchEvent, handleClickAway);
				doc.removeEventListener("touchmove", handleTouchMove);
			};
		}
	}, [handleClickAway, touchEvent]);
	if (mouseEvent !== false) childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
	import_react.useEffect(() => {
		if (mouseEvent !== false) {
			const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
			const doc = ownerDocument(nodeRef.current);
			doc.addEventListener(mappedMouseEvent, handleClickAway);
			return () => {
				doc.removeEventListener(mappedMouseEvent, handleClickAway);
			};
		}
	}, [handleClickAway, mouseEvent]);
	return /* @__PURE__ */ import_react.cloneElement(children, childrenProps);
}
var Container_default = createContainer({
	createStyledComponent: styled_default("div", {
		name: "MuiContainer",
		slot: "Root",
		overridesResolver: (props, styles$4) => {
			const { ownerState } = props;
			return [
				styles$4.root,
				styles$4[`maxWidth${capitalize_default(String(ownerState.maxWidth))}`],
				ownerState.fixed && styles$4.fixed,
				ownerState.disableGutters && styles$4.disableGutters
			];
		}
	}),
	useThemeProps: (inProps) => useDefaultProps({
		props: inProps,
		name: "MuiContainer"
	})
});
var isDynamicSupport = typeof globalCss({}) === "function";
const html = (theme, enableColorScheme) => ({
	WebkitFontSmoothing: "antialiased",
	MozOsxFontSmoothing: "grayscale",
	boxSizing: "border-box",
	WebkitTextSizeAdjust: "100%",
	...enableColorScheme && !theme.vars && { colorScheme: theme.palette.mode }
});
const body = (theme) => ({
	color: (theme.vars || theme).palette.text.primary,
	...theme.typography.body1,
	backgroundColor: (theme.vars || theme).palette.background.default,
	"@media print": { backgroundColor: (theme.vars || theme).palette.common.white }
});
const styles$1 = (theme, enableColorScheme = false) => {
	const colorSchemeStyles = {};
	if (enableColorScheme && theme.colorSchemes && typeof theme.getColorSchemeSelector === "function") Object.entries(theme.colorSchemes).forEach(([key, scheme]) => {
		const selector = theme.getColorSchemeSelector(key);
		if (selector.startsWith("@")) colorSchemeStyles[selector] = { ":root": { colorScheme: scheme.palette?.mode } };
		else colorSchemeStyles[selector.replace(/\s*&/, "")] = { colorScheme: scheme.palette?.mode };
	});
	let defaultStyles = {
		html: html(theme, enableColorScheme),
		"*, *::before, *::after": { boxSizing: "inherit" },
		"strong, b": { fontWeight: theme.typography.fontWeightBold },
		body: {
			margin: 0,
			...body(theme),
			"&::backdrop": { backgroundColor: (theme.vars || theme).palette.background.default }
		},
		...colorSchemeStyles
	};
	const themeOverrides = theme.components?.MuiCssBaseline?.styleOverrides;
	if (themeOverrides) defaultStyles = [defaultStyles, themeOverrides];
	return defaultStyles;
};
var SELECTOR = "mui-ecs";
var staticStyles = (theme) => {
	const result = styles$1(theme, false);
	const baseStyles = Array.isArray(result) ? result[0] : result;
	if (!theme.vars && baseStyles) baseStyles.html[`:root:has(${SELECTOR})`] = { colorScheme: theme.palette.mode };
	if (theme.colorSchemes) Object.entries(theme.colorSchemes).forEach(([key, scheme]) => {
		const selector = theme.getColorSchemeSelector(key);
		if (selector.startsWith("@")) baseStyles[selector] = { [`:root:not(:has(.${SELECTOR}))`]: { colorScheme: scheme.palette?.mode } };
		else baseStyles[selector.replace(/\s*&/, "")] = { [`&:not(:has(.${SELECTOR}))`]: { colorScheme: scheme.palette?.mode } };
	});
	return result;
};
var GlobalStyles = globalCss(isDynamicSupport ? ({ theme, enableColorScheme }) => styles$1(theme, enableColorScheme) : ({ theme }) => staticStyles(theme));
function CssBaseline(inProps) {
	const { children, enableColorScheme = false } = useDefaultProps({
		props: inProps,
		name: "MuiCssBaseline"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
		isDynamicSupport && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalStyles, { enableColorScheme }),
		!isDynamicSupport && !enableColorScheme && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: SELECTOR,
			style: { display: "none" }
		}),
		children
	] });
}
var CssBaseline_default = CssBaseline;
function getScrollbarSize(win = window) {
	const documentWidth = win.document.documentElement.clientWidth;
	return win.innerWidth - documentWidth;
}
function isOverflowing(container) {
	const doc = ownerDocument(container);
	if (doc.body === container) return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
	return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, hide) {
	if (hide) element.setAttribute("aria-hidden", "true");
	else element.removeAttribute("aria-hidden");
}
function getPaddingRight(element) {
	return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
}
function isAriaHiddenForbiddenOnElement(element) {
	const isForbiddenTagName = [
		"TEMPLATE",
		"SCRIPT",
		"STYLE",
		"LINK",
		"MAP",
		"META",
		"NOSCRIPT",
		"PICTURE",
		"COL",
		"COLGROUP",
		"PARAM",
		"SLOT",
		"SOURCE",
		"TRACK"
	].includes(element.tagName);
	const isInputHidden = element.tagName === "INPUT" && element.getAttribute("type") === "hidden";
	return isForbiddenTagName || isInputHidden;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude, hide) {
	const blacklist = [
		mountElement,
		currentElement,
		...elementsToExclude
	];
	[].forEach.call(container.children, (element) => {
		const isNotExcludedElement = !blacklist.includes(element);
		const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);
		if (isNotExcludedElement && isNotForbiddenElement) ariaHidden(element, hide);
	});
}
function findIndexOf(items, callback) {
	let idx = -1;
	items.some((item, index) => {
		if (callback(item)) {
			idx = index;
			return true;
		}
		return false;
	});
	return idx;
}
function handleContainer(containerInfo, props) {
	const restoreStyle = [];
	const container = containerInfo.container;
	if (!props.disableScrollLock) {
		if (isOverflowing(container)) {
			const scrollbarSize = getScrollbarSize(ownerWindow(container));
			restoreStyle.push({
				value: container.style.paddingRight,
				property: "padding-right",
				el: container
			});
			container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
			const fixedElements$1 = ownerDocument(container).querySelectorAll(".mui-fixed");
			[].forEach.call(fixedElements$1, (element) => {
				restoreStyle.push({
					value: element.style.paddingRight,
					property: "padding-right",
					el: element
				});
				element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
			});
		}
		let scrollContainer;
		if (container.parentNode instanceof DocumentFragment) scrollContainer = ownerDocument(container).body;
		else {
			const parent = container.parentElement;
			const containerWindow = ownerWindow(container);
			scrollContainer = parent?.nodeName === "HTML" && containerWindow.getComputedStyle(parent).overflowY === "scroll" ? parent : container;
		}
		restoreStyle.push({
			value: scrollContainer.style.overflow,
			property: "overflow",
			el: scrollContainer
		}, {
			value: scrollContainer.style.overflowX,
			property: "overflow-x",
			el: scrollContainer
		}, {
			value: scrollContainer.style.overflowY,
			property: "overflow-y",
			el: scrollContainer
		});
		scrollContainer.style.overflow = "hidden";
	}
	const restore = () => {
		restoreStyle.forEach(({ value, el, property }) => {
			if (value) el.style.setProperty(property, value);
			else el.style.removeProperty(property);
		});
	};
	return restore;
}
function getHiddenSiblings(container) {
	const hiddenSiblings = [];
	[].forEach.call(container.children, (element) => {
		if (element.getAttribute("aria-hidden") === "true") hiddenSiblings.push(element);
	});
	return hiddenSiblings;
}
var ModalManager = class {
	constructor() {
		this.modals = [];
		this.containers = [];
	}
	add(modal, container) {
		let modalIndex = this.modals.indexOf(modal);
		if (modalIndex !== -1) return modalIndex;
		modalIndex = this.modals.length;
		this.modals.push(modal);
		if (modal.modalRef) ariaHidden(modal.modalRef, false);
		const hiddenSiblings = getHiddenSiblings(container);
		ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
		const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
		if (containerIndex !== -1) {
			this.containers[containerIndex].modals.push(modal);
			return modalIndex;
		}
		this.containers.push({
			modals: [modal],
			container,
			restore: null,
			hiddenSiblings
		});
		return modalIndex;
	}
	mount(modal, props) {
		const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
		const containerInfo = this.containers[containerIndex];
		if (!containerInfo.restore) containerInfo.restore = handleContainer(containerInfo, props);
	}
	remove(modal, ariaHiddenState = true) {
		const modalIndex = this.modals.indexOf(modal);
		if (modalIndex === -1) return modalIndex;
		const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
		const containerInfo = this.containers[containerIndex];
		containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
		this.modals.splice(modalIndex, 1);
		if (containerInfo.modals.length === 0) {
			if (containerInfo.restore) containerInfo.restore();
			if (modal.modalRef) ariaHidden(modal.modalRef, ariaHiddenState);
			ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
			this.containers.splice(containerIndex, 1);
		} else {
			const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
			if (nextTop.modalRef) ariaHidden(nextTop.modalRef, false);
		}
		return modalIndex;
	}
	isTopModal(modal) {
		return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
	}
};
var candidatesSelector = [
	"input",
	"select",
	"textarea",
	"a[href]",
	"button",
	"[tabindex]",
	"audio[controls]",
	"video[controls]",
	"[contenteditable]:not([contenteditable=\"false\"])"
].join(",");
function getTabIndex(node$1) {
	const tabindexAttr = parseInt(node$1.getAttribute("tabindex") || "", 10);
	if (!Number.isNaN(tabindexAttr)) return tabindexAttr;
	if (node$1.contentEditable === "true" || (node$1.nodeName === "AUDIO" || node$1.nodeName === "VIDEO" || node$1.nodeName === "DETAILS") && node$1.getAttribute("tabindex") === null) return 0;
	return node$1.tabIndex;
}
function isNonTabbableRadio(node$1) {
	if (node$1.tagName !== "INPUT" || node$1.type !== "radio") return false;
	if (!node$1.name) return false;
	const getRadio = (selector) => node$1.ownerDocument.querySelector(`input[type="radio"]${selector}`);
	let roving = getRadio(`[name="${node$1.name}"]:checked`);
	if (!roving) roving = getRadio(`[name="${node$1.name}"]`);
	return roving !== node$1;
}
function isNodeMatchingSelectorFocusable(node$1) {
	if (node$1.disabled || node$1.tagName === "INPUT" && node$1.type === "hidden" || isNonTabbableRadio(node$1)) return false;
	return true;
}
function defaultGetTabbable(root) {
	const regularTabNodes = [];
	const orderedTabNodes = [];
	Array.from(root.querySelectorAll(candidatesSelector)).forEach((node$1, i) => {
		const nodeTabIndex = getTabIndex(node$1);
		if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node$1)) return;
		if (nodeTabIndex === 0) regularTabNodes.push(node$1);
		else orderedTabNodes.push({
			documentOrder: i,
			tabIndex: nodeTabIndex,
			node: node$1
		});
	});
	return orderedTabNodes.sort((a, b$1) => a.tabIndex === b$1.tabIndex ? a.documentOrder - b$1.documentOrder : a.tabIndex - b$1.tabIndex).map((a) => a.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
	return true;
}
function FocusTrap(props) {
	const { children, disableAutoFocus = false, disableEnforceFocus = false, disableRestoreFocus = false, getTabbable = defaultGetTabbable, isEnabled = defaultIsEnabled, open } = props;
	const ignoreNextEnforceFocus = import_react.useRef(false);
	const sentinelStart = import_react.useRef(null);
	const sentinelEnd = import_react.useRef(null);
	const nodeToRestore = import_react.useRef(null);
	const reactFocusEventTarget = import_react.useRef(null);
	const activated = import_react.useRef(false);
	const rootRef = import_react.useRef(null);
	const handleRef = useForkRef(getReactElementRef(children), rootRef);
	const lastKeydown = import_react.useRef(null);
	import_react.useEffect(() => {
		if (!open || !rootRef.current) return;
		activated.current = !disableAutoFocus;
	}, [disableAutoFocus, open]);
	import_react.useEffect(() => {
		if (!open || !rootRef.current) return;
		const doc = ownerDocument(rootRef.current);
		if (!rootRef.current.contains(doc.activeElement)) {
			if (!rootRef.current.hasAttribute("tabIndex")) rootRef.current.setAttribute("tabIndex", "-1");
			if (activated.current) rootRef.current.focus();
		}
		return () => {
			if (!disableRestoreFocus) {
				if (nodeToRestore.current && nodeToRestore.current.focus) {
					ignoreNextEnforceFocus.current = true;
					nodeToRestore.current.focus();
				}
				nodeToRestore.current = null;
			}
		};
	}, [open]);
	import_react.useEffect(() => {
		if (!open || !rootRef.current) return;
		const doc = ownerDocument(rootRef.current);
		const loopFocus = (nativeEvent) => {
			lastKeydown.current = nativeEvent;
			if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== "Tab") return;
			if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
				ignoreNextEnforceFocus.current = true;
				if (sentinelEnd.current) sentinelEnd.current.focus();
			}
		};
		const contain = () => {
			const rootElement = rootRef.current;
			if (rootElement === null) return;
			if (!doc.hasFocus() || !isEnabled() || ignoreNextEnforceFocus.current) {
				ignoreNextEnforceFocus.current = false;
				return;
			}
			if (rootElement.contains(doc.activeElement)) return;
			if (disableEnforceFocus && doc.activeElement !== sentinelStart.current && doc.activeElement !== sentinelEnd.current) return;
			if (doc.activeElement !== reactFocusEventTarget.current) reactFocusEventTarget.current = null;
			else if (reactFocusEventTarget.current !== null) return;
			if (!activated.current) return;
			let tabbable = [];
			if (doc.activeElement === sentinelStart.current || doc.activeElement === sentinelEnd.current) tabbable = getTabbable(rootRef.current);
			if (tabbable.length > 0) {
				const isShiftTab = Boolean(lastKeydown.current?.shiftKey && lastKeydown.current?.key === "Tab");
				const focusNext = tabbable[0];
				const focusPrevious = tabbable[tabbable.length - 1];
				if (typeof focusNext !== "string" && typeof focusPrevious !== "string") if (isShiftTab) focusPrevious.focus();
				else focusNext.focus();
			} else rootElement.focus();
		};
		doc.addEventListener("focusin", contain);
		doc.addEventListener("keydown", loopFocus, true);
		const interval = setInterval(() => {
			if (doc.activeElement && doc.activeElement.tagName === "BODY") contain();
		}, 50);
		return () => {
			clearInterval(interval);
			doc.removeEventListener("focusin", contain);
			doc.removeEventListener("keydown", loopFocus, true);
		};
	}, [
		disableAutoFocus,
		disableEnforceFocus,
		disableRestoreFocus,
		isEnabled,
		open,
		getTabbable
	]);
	const onFocus = (event) => {
		if (nodeToRestore.current === null) nodeToRestore.current = event.relatedTarget;
		activated.current = true;
		reactFocusEventTarget.current = event.target;
		const childrenPropsHandler = children.props.onFocus;
		if (childrenPropsHandler) childrenPropsHandler(event);
	};
	const handleFocusSentinel = (event) => {
		if (nodeToRestore.current === null) nodeToRestore.current = event.relatedTarget;
		activated.current = true;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			tabIndex: open ? 0 : -1,
			onFocus: handleFocusSentinel,
			ref: sentinelStart,
			"data-testid": "sentinelStart"
		}),
		/* @__PURE__ */ import_react.cloneElement(children, {
			ref: handleRef,
			onFocus
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			tabIndex: open ? 0 : -1,
			onFocus: handleFocusSentinel,
			ref: sentinelEnd,
			"data-testid": "sentinelEnd"
		})
	] });
}
var FocusTrap_default = FocusTrap;
function getContainer(container) {
	return typeof container === "function" ? container() : container;
}
function getHasTransition(children) {
	return children ? children.props.hasOwnProperty("in") : false;
}
var noop = () => {};
var manager = new ModalManager();
function useModal(parameters) {
	const { container, disableEscapeKeyDown = false, disableScrollLock = false, closeAfterTransition = false, onTransitionEnter, onTransitionExited, children, onClose, open, rootRef } = parameters;
	const modal = import_react.useRef({});
	const mountNodeRef = import_react.useRef(null);
	const modalRef = import_react.useRef(null);
	const handleRef = useForkRef(modalRef, rootRef);
	const [exited, setExited] = import_react.useState(!open);
	const hasTransition = getHasTransition(children);
	let ariaHiddenProp = true;
	if (parameters["aria-hidden"] === "false" || parameters["aria-hidden"] === false) ariaHiddenProp = false;
	const getDoc = () => ownerDocument(mountNodeRef.current);
	const getModal = () => {
		modal.current.modalRef = modalRef.current;
		modal.current.mount = mountNodeRef.current;
		return modal.current;
	};
	const handleMounted = () => {
		manager.mount(getModal(), { disableScrollLock });
		if (modalRef.current) modalRef.current.scrollTop = 0;
	};
	const handleOpen = useEventCallback_default(() => {
		const resolvedContainer = getContainer(container) || getDoc().body;
		manager.add(getModal(), resolvedContainer);
		if (modalRef.current) handleMounted();
	});
	const isTopModal = () => manager.isTopModal(getModal());
	const handlePortalRef = useEventCallback_default((node$1) => {
		mountNodeRef.current = node$1;
		if (!node$1) return;
		if (open && isTopModal()) handleMounted();
		else if (modalRef.current) ariaHidden(modalRef.current, ariaHiddenProp);
	});
	const handleClose = import_react.useCallback(() => {
		manager.remove(getModal(), ariaHiddenProp);
	}, [ariaHiddenProp]);
	import_react.useEffect(() => {
		return () => {
			handleClose();
		};
	}, [handleClose]);
	import_react.useEffect(() => {
		if (open) handleOpen();
		else if (!hasTransition || !closeAfterTransition) handleClose();
	}, [
		open,
		handleClose,
		hasTransition,
		closeAfterTransition,
		handleOpen
	]);
	const createHandleKeyDown = (otherHandlers) => (event) => {
		otherHandlers.onKeyDown?.(event);
		if (event.key !== "Escape" || event.which === 229 || !isTopModal()) return;
		if (!disableEscapeKeyDown) {
			event.stopPropagation();
			if (onClose) onClose(event, "escapeKeyDown");
		}
	};
	const createHandleBackdropClick = (otherHandlers) => (event) => {
		otherHandlers.onClick?.(event);
		if (event.target !== event.currentTarget) return;
		if (onClose) onClose(event, "backdropClick");
	};
	const getRootProps = (otherHandlers = {}) => {
		const propsEventHandlers = extractEventHandlers_default(parameters);
		delete propsEventHandlers.onTransitionEnter;
		delete propsEventHandlers.onTransitionExited;
		const externalEventHandlers = {
			...propsEventHandlers,
			...otherHandlers
		};
		return {
			role: "presentation",
			...externalEventHandlers,
			onKeyDown: createHandleKeyDown(externalEventHandlers),
			ref: handleRef
		};
	};
	const getBackdropProps = (otherHandlers = {}) => {
		const externalEventHandlers = otherHandlers;
		return {
			"aria-hidden": true,
			...externalEventHandlers,
			onClick: createHandleBackdropClick(externalEventHandlers),
			open
		};
	};
	const getTransitionProps$1 = () => {
		const handleEnter = () => {
			setExited(false);
			if (onTransitionEnter) onTransitionEnter();
		};
		const handleExited = () => {
			setExited(true);
			if (onTransitionExited) onTransitionExited();
			if (closeAfterTransition) handleClose();
		};
		return {
			onEnter: createChainedFunction(handleEnter, children?.props.onEnter ?? noop),
			onExited: createChainedFunction(handleExited, children?.props.onExited ?? noop)
		};
	};
	return {
		getRootProps,
		getBackdropProps,
		getTransitionProps: getTransitionProps$1,
		rootRef: handleRef,
		portalRef: handlePortalRef,
		isTopModal,
		exited,
		hasTransition
	};
}
var useModal_default = useModal;
function getModalUtilityClass(slot) {
	return generateUtilityClass("MuiModal", slot);
}
generateUtilityClasses("MuiModal", [
	"root",
	"hidden",
	"backdrop"
]);
var useUtilityClasses$25 = (ownerState) => {
	const { open, exited, classes } = ownerState;
	return composeClasses({
		root: ["root", !open && exited && "hidden"],
		backdrop: ["backdrop"]
	}, getModalUtilityClass, classes);
};
var ModalRoot = styled_default("div", {
	name: "MuiModal",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [styles$4.root, !ownerState.open && ownerState.exited && styles$4.hidden];
	}
})(memoTheme_default(({ theme }) => ({
	position: "fixed",
	zIndex: (theme.vars || theme).zIndex.modal,
	right: 0,
	bottom: 0,
	top: 0,
	left: 0,
	variants: [{
		props: ({ ownerState }) => !ownerState.open && ownerState.exited,
		style: { visibility: "hidden" }
	}]
})));
var ModalBackdrop = styled_default(Backdrop_default, {
	name: "MuiModal",
	slot: "Backdrop"
})({ zIndex: -1 });
var Modal_default = /* @__PURE__ */ import_react.forwardRef(function Modal$1(inProps, ref) {
	const props = useDefaultProps({
		name: "MuiModal",
		props: inProps
	});
	const { BackdropComponent = ModalBackdrop, BackdropProps, classes: classesProp, className, closeAfterTransition = false, children, container, component, components = {}, componentsProps = {}, disableAutoFocus = false, disableEnforceFocus = false, disableEscapeKeyDown = false, disablePortal = false, disableRestoreFocus = false, disableScrollLock = false, hideBackdrop = false, keepMounted = false, onClose, onTransitionEnter, onTransitionExited, open, slotProps = {}, slots = {}, theme,...other } = props;
	const propsWithDefaults = {
		...props,
		closeAfterTransition,
		disableAutoFocus,
		disableEnforceFocus,
		disableEscapeKeyDown,
		disablePortal,
		disableRestoreFocus,
		disableScrollLock,
		hideBackdrop,
		keepMounted
	};
	const { getRootProps, getBackdropProps, getTransitionProps: getTransitionProps$1, portalRef, isTopModal, exited, hasTransition } = useModal_default({
		...propsWithDefaults,
		rootRef: ref
	});
	const ownerState = {
		...propsWithDefaults,
		exited
	};
	const classes = useUtilityClasses$25(ownerState);
	const childProps = {};
	if (children.props.tabIndex === void 0) childProps.tabIndex = "-1";
	if (hasTransition) {
		const { onEnter, onExited } = getTransitionProps$1();
		childProps.onEnter = onEnter;
		childProps.onExited = onExited;
	}
	const externalForwardedProps = {
		slots: {
			root: components.Root,
			backdrop: components.Backdrop,
			...slots
		},
		slotProps: {
			...componentsProps,
			...slotProps
		}
	};
	const [RootSlot, rootProps] = useSlot("root", {
		ref,
		elementType: ModalRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other,
			component
		},
		getSlotProps: getRootProps,
		ownerState,
		className: clsx_default(className, classes?.root, !ownerState.open && ownerState.exited && classes?.hidden)
	});
	const [BackdropSlot, backdropProps] = useSlot("backdrop", {
		ref: BackdropProps?.ref,
		elementType: BackdropComponent,
		externalForwardedProps,
		shouldForwardComponentProp: true,
		additionalProps: BackdropProps,
		getSlotProps: (otherHandlers) => {
			return getBackdropProps({
				...otherHandlers,
				onClick: (event) => {
					if (otherHandlers?.onClick) otherHandlers.onClick(event);
				}
			});
		},
		className: clsx_default(BackdropProps?.className, classes?.backdrop),
		ownerState
	});
	if (!keepMounted && !open && (!hasTransition || exited)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal_default, {
		ref: portalRef,
		container,
		disablePortal,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
			...rootProps,
			children: [!hideBackdrop && BackdropComponent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackdropSlot, { ...backdropProps }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusTrap_default, {
				disableEnforceFocus,
				disableAutoFocus,
				disableRestoreFocus,
				isEnabled: isTopModal,
				open,
				children: /* @__PURE__ */ import_react.cloneElement(children, childProps)
			})]
		})
	});
});
var dividerClasses_default = generateUtilityClasses("MuiDivider", [
	"root",
	"absolute",
	"fullWidth",
	"inset",
	"middle",
	"flexItem",
	"light",
	"vertical",
	"withChildren",
	"withChildrenVertical",
	"textAlignRight",
	"textAlignLeft",
	"wrapper",
	"wrapperVertical"
]);
function getTranslateValue(direction, node$1, resolvedContainer) {
	const rect = node$1.getBoundingClientRect();
	const containerRect = resolvedContainer && resolvedContainer.getBoundingClientRect();
	const containerWindow = ownerWindow_default(node$1);
	let transform;
	if (node$1.fakeTransform) transform = node$1.fakeTransform;
	else {
		const computedStyle = containerWindow.getComputedStyle(node$1);
		transform = computedStyle.getPropertyValue("-webkit-transform") || computedStyle.getPropertyValue("transform");
	}
	let offsetX = 0;
	let offsetY = 0;
	if (transform && transform !== "none" && typeof transform === "string") {
		const transformValues = transform.split("(")[1].split(")")[0].split(",");
		offsetX = parseInt(transformValues[4], 10);
		offsetY = parseInt(transformValues[5], 10);
	}
	if (direction === "left") {
		if (containerRect) return `translateX(${containerRect.right + offsetX - rect.left}px)`;
		return `translateX(${containerWindow.innerWidth + offsetX - rect.left}px)`;
	}
	if (direction === "right") {
		if (containerRect) return `translateX(-${rect.right - containerRect.left - offsetX}px)`;
		return `translateX(-${rect.left + rect.width - offsetX}px)`;
	}
	if (direction === "up") {
		if (containerRect) return `translateY(${containerRect.bottom + offsetY - rect.top}px)`;
		return `translateY(${containerWindow.innerHeight + offsetY - rect.top}px)`;
	}
	if (containerRect) return `translateY(-${rect.top - containerRect.top + rect.height - offsetY}px)`;
	return `translateY(-${rect.top + rect.height - offsetY}px)`;
}
function resolveContainer(containerPropProp) {
	return typeof containerPropProp === "function" ? containerPropProp() : containerPropProp;
}
function setTranslateValue(direction, node$1, containerProp) {
	const resolvedContainer = resolveContainer(containerProp);
	const transform = getTranslateValue(direction, node$1, resolvedContainer);
	if (transform) {
		node$1.style.webkitTransform = transform;
		node$1.style.transform = transform;
	}
}
var Slide_default = /* @__PURE__ */ import_react.forwardRef(function Slide$1(props, ref) {
	const theme = useTheme();
	const defaultEasing = {
		enter: theme.transitions.easing.easeOut,
		exit: theme.transitions.easing.sharp
	};
	const defaultTimeout = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	};
	const { addEndListener, appear = true, children, container: containerProp, direction = "down", easing: easingProp = defaultEasing, in: inProp, onEnter, onEntered, onEntering, onExit, onExited, onExiting, style: style$3, timeout = defaultTimeout, TransitionComponent = Transition_default,...other } = props;
	const childrenRef = import_react.useRef(null);
	const handleRef = useForkRef_default(getReactElementRef(children), childrenRef, ref);
	const normalizedTransitionCallback = (callback) => (isAppearing) => {
		if (callback) if (isAppearing === void 0) callback(childrenRef.current);
		else callback(childrenRef.current, isAppearing);
	};
	const handleEnter = normalizedTransitionCallback((node$1, isAppearing) => {
		setTranslateValue(direction, node$1, containerProp);
		reflow(node$1);
		if (onEnter) onEnter(node$1, isAppearing);
	});
	const handleEntering = normalizedTransitionCallback((node$1, isAppearing) => {
		const transitionProps = getTransitionProps({
			timeout,
			style: style$3,
			easing: easingProp
		}, { mode: "enter" });
		node$1.style.webkitTransition = theme.transitions.create("-webkit-transform", { ...transitionProps });
		node$1.style.transition = theme.transitions.create("transform", { ...transitionProps });
		node$1.style.webkitTransform = "none";
		node$1.style.transform = "none";
		if (onEntering) onEntering(node$1, isAppearing);
	});
	const handleEntered = normalizedTransitionCallback(onEntered);
	const handleExiting = normalizedTransitionCallback(onExiting);
	const handleExit = normalizedTransitionCallback((node$1) => {
		const transitionProps = getTransitionProps({
			timeout,
			style: style$3,
			easing: easingProp
		}, { mode: "exit" });
		node$1.style.webkitTransition = theme.transitions.create("-webkit-transform", transitionProps);
		node$1.style.transition = theme.transitions.create("transform", transitionProps);
		setTranslateValue(direction, node$1, containerProp);
		if (onExit) onExit(node$1);
	});
	const handleExited = normalizedTransitionCallback((node$1) => {
		node$1.style.webkitTransition = "";
		node$1.style.transition = "";
		if (onExited) onExited(node$1);
	});
	const handleAddEndListener = (next$1) => {
		if (addEndListener) addEndListener(childrenRef.current, next$1);
	};
	const updatePosition = import_react.useCallback(() => {
		if (childrenRef.current) setTranslateValue(direction, childrenRef.current, containerProp);
	}, [direction, containerProp]);
	import_react.useEffect(() => {
		if (inProp || direction === "down" || direction === "right") return;
		const handleResize = debounce_default(() => {
			if (childrenRef.current) setTranslateValue(direction, childrenRef.current, containerProp);
		});
		const containerWindow = ownerWindow_default(childrenRef.current);
		containerWindow.addEventListener("resize", handleResize);
		return () => {
			handleResize.clear();
			containerWindow.removeEventListener("resize", handleResize);
		};
	}, [
		direction,
		inProp,
		containerProp
	]);
	import_react.useEffect(() => {
		if (!inProp) updatePosition();
	}, [inProp, updatePosition]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionComponent, {
		nodeRef: childrenRef,
		onEnter: handleEnter,
		onEntered: handleEntered,
		onEntering: handleEntering,
		onExit: handleExit,
		onExited: handleExited,
		onExiting: handleExiting,
		addEndListener: handleAddEndListener,
		appear,
		in: inProp,
		timeout,
		...other,
		children: (state, { ownerState,...restChildProps }) => {
			return /* @__PURE__ */ import_react.cloneElement(children, {
				ref: handleRef,
				style: {
					visibility: state === "exited" && !inProp ? "hidden" : void 0,
					...style$3,
					...children.props.style
				},
				...restChildProps
			});
		}
	});
});
function getDrawerUtilityClass(slot) {
	return generateUtilityClass("MuiDrawer", slot);
}
generateUtilityClasses("MuiDrawer", [
	"root",
	"docked",
	"paper",
	"anchorLeft",
	"anchorRight",
	"anchorTop",
	"anchorBottom",
	"paperAnchorLeft",
	"paperAnchorRight",
	"paperAnchorTop",
	"paperAnchorBottom",
	"paperAnchorDockedLeft",
	"paperAnchorDockedRight",
	"paperAnchorDockedTop",
	"paperAnchorDockedBottom",
	"modal"
]);
var overridesResolver$1 = (props, styles$4) => {
	const { ownerState } = props;
	return [
		styles$4.root,
		(ownerState.variant === "permanent" || ownerState.variant === "persistent") && styles$4.docked,
		styles$4.modal
	];
};
var useUtilityClasses$24 = (ownerState) => {
	const { classes, anchor, variant } = ownerState;
	const slots = {
		root: ["root", `anchor${capitalize_default(anchor)}`],
		docked: [(variant === "permanent" || variant === "persistent") && "docked"],
		modal: ["modal"],
		paper: [
			"paper",
			`paperAnchor${capitalize_default(anchor)}`,
			variant !== "temporary" && `paperAnchorDocked${capitalize_default(anchor)}`
		]
	};
	return composeClasses(slots, getDrawerUtilityClass, classes);
};
var DrawerRoot = styled_default(Modal_default, {
	name: "MuiDrawer",
	slot: "Root",
	overridesResolver: overridesResolver$1
})(memoTheme_default(({ theme }) => ({ zIndex: (theme.vars || theme).zIndex.drawer })));
var DrawerDockedRoot = styled_default("div", {
	shouldForwardProp: rootShouldForwardProp_default,
	name: "MuiDrawer",
	slot: "Docked",
	skipVariantsResolver: false,
	overridesResolver: overridesResolver$1
})({ flex: "0 0 auto" });
var DrawerPaper = styled_default(Paper_default, {
	name: "MuiDrawer",
	slot: "Paper",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.paper,
			styles$4[`paperAnchor${capitalize_default(ownerState.anchor)}`],
			ownerState.variant !== "temporary" && styles$4[`paperAnchorDocked${capitalize_default(ownerState.anchor)}`]
		];
	}
})(memoTheme_default(({ theme }) => ({
	overflowY: "auto",
	display: "flex",
	flexDirection: "column",
	height: "100%",
	flex: "1 0 auto",
	zIndex: (theme.vars || theme).zIndex.drawer,
	WebkitOverflowScrolling: "touch",
	position: "fixed",
	top: 0,
	outline: 0,
	variants: [
		{
			props: { anchor: "left" },
			style: { left: 0 }
		},
		{
			props: { anchor: "top" },
			style: {
				top: 0,
				left: 0,
				right: 0,
				height: "auto",
				maxHeight: "100%"
			}
		},
		{
			props: { anchor: "right" },
			style: { right: 0 }
		},
		{
			props: { anchor: "bottom" },
			style: {
				top: "auto",
				left: 0,
				bottom: 0,
				right: 0,
				height: "auto",
				maxHeight: "100%"
			}
		},
		{
			props: ({ ownerState }) => ownerState.anchor === "left" && ownerState.variant !== "temporary",
			style: { borderRight: `1px solid ${(theme.vars || theme).palette.divider}` }
		},
		{
			props: ({ ownerState }) => ownerState.anchor === "top" && ownerState.variant !== "temporary",
			style: { borderBottom: `1px solid ${(theme.vars || theme).palette.divider}` }
		},
		{
			props: ({ ownerState }) => ownerState.anchor === "right" && ownerState.variant !== "temporary",
			style: { borderLeft: `1px solid ${(theme.vars || theme).palette.divider}` }
		},
		{
			props: ({ ownerState }) => ownerState.anchor === "bottom" && ownerState.variant !== "temporary",
			style: { borderTop: `1px solid ${(theme.vars || theme).palette.divider}` }
		}
	]
})));
var oppositeDirection = {
	left: "right",
	right: "left",
	top: "down",
	bottom: "up"
};
function isHorizontal(anchor) {
	return ["left", "right"].includes(anchor);
}
function getAnchor({ direction }, anchor) {
	return direction === "rtl" && isHorizontal(anchor) ? oppositeDirection[anchor] : anchor;
}
var Drawer_default = /* @__PURE__ */ import_react.forwardRef(function Drawer$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiDrawer"
	});
	const theme = useTheme();
	const isRtl = useRtl();
	const defaultTransitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	};
	const { anchor: anchorProp = "left", BackdropProps, children, className, elevation = 16, hideBackdrop = false, ModalProps: { BackdropProps: BackdropPropsProp,...ModalProps } = {}, onClose, open = false, PaperProps = {}, SlideProps, TransitionComponent, transitionDuration = defaultTransitionDuration, variant = "temporary", slots = {}, slotProps = {},...other } = props;
	const mounted = import_react.useRef(false);
	import_react.useEffect(() => {
		mounted.current = true;
	}, []);
	const anchorInvariant = getAnchor({ direction: isRtl ? "rtl" : "ltr" }, anchorProp);
	const anchor = anchorProp;
	const ownerState = {
		...props,
		anchor,
		elevation,
		open,
		variant,
		...other
	};
	const classes = useUtilityClasses$24(ownerState);
	const externalForwardedProps = {
		slots: {
			transition: TransitionComponent,
			...slots
		},
		slotProps: {
			paper: PaperProps,
			transition: SlideProps,
			...slotProps,
			backdrop: mergeSlotProps(slotProps.backdrop || {
				...BackdropProps,
				...BackdropPropsProp
			}, { transitionDuration })
		}
	};
	const [RootSlot, rootSlotProps] = useSlot("root", {
		ref,
		elementType: DrawerRoot,
		className: clsx_default(classes.root, classes.modal, className),
		shouldForwardComponentProp: true,
		ownerState,
		externalForwardedProps: {
			...externalForwardedProps,
			...other,
			...ModalProps
		},
		additionalProps: {
			open,
			onClose,
			hideBackdrop,
			slots: { backdrop: externalForwardedProps.slots.backdrop },
			slotProps: { backdrop: externalForwardedProps.slotProps.backdrop }
		}
	});
	const [PaperSlot, paperSlotProps] = useSlot("paper", {
		elementType: DrawerPaper,
		shouldForwardComponentProp: true,
		className: clsx_default(classes.paper, PaperProps.className),
		ownerState,
		externalForwardedProps,
		additionalProps: {
			elevation: variant === "temporary" ? elevation : 0,
			square: true,
			...variant === "temporary" && {
				role: "dialog",
				"aria-modal": "true"
			}
		}
	});
	const [DockedSlot, dockedSlotProps] = useSlot("docked", {
		elementType: DrawerDockedRoot,
		ref,
		className: clsx_default(classes.root, classes.docked, className),
		ownerState,
		externalForwardedProps,
		additionalProps: other
	});
	const [TransitionSlot, transitionSlotProps] = useSlot("transition", {
		elementType: Slide_default,
		ownerState,
		externalForwardedProps,
		additionalProps: {
			in: open,
			direction: oppositeDirection[anchorInvariant],
			timeout: transitionDuration,
			appear: mounted.current
		}
	});
	const drawer = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaperSlot, {
		...paperSlotProps,
		children
	});
	if (variant === "permanent") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockedSlot, {
		...dockedSlotProps,
		children: drawer
	});
	const slidingDrawer = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionSlot, {
		...transitionSlotProps,
		children: drawer
	});
	if (variant === "persistent") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockedSlot, {
		...dockedSlotProps,
		children: slidingDrawer
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootSlot, {
		...rootSlotProps,
		children: slidingDrawer
	});
});
var useUtilityClasses$23 = (ownerState) => {
	const { classes, disableUnderline, startAdornment, endAdornment, size, hiddenLabel, multiline } = ownerState;
	const slots = {
		root: [
			"root",
			!disableUnderline && "underline",
			startAdornment && "adornedStart",
			endAdornment && "adornedEnd",
			size === "small" && `size${capitalize_default(size)}`,
			hiddenLabel && "hiddenLabel",
			multiline && "multiline"
		],
		input: ["input"]
	};
	const composedClasses = composeClasses(slots, getFilledInputUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var FilledInputRoot = styled_default(InputBaseRoot, {
	shouldForwardProp: (prop) => rootShouldForwardProp_default(prop) || prop === "classes",
	name: "MuiFilledInput",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [...rootOverridesResolver(props, styles$4), !ownerState.disableUnderline && styles$4.underline];
	}
})(memoTheme_default(({ theme }) => {
	const light$1 = theme.palette.mode === "light";
	const bottomLineColor = light$1 ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
	const backgroundColor$1 = light$1 ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)";
	const hoverBackground = light$1 ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)";
	const disabledBackground = light$1 ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
	return {
		position: "relative",
		backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor$1,
		borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
		borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
		transition: theme.transitions.create("background-color", {
			duration: theme.transitions.duration.shorter,
			easing: theme.transitions.easing.easeOut
		}),
		"&:hover": {
			backgroundColor: theme.vars ? theme.vars.palette.FilledInput.hoverBg : hoverBackground,
			"@media (hover: none)": { backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor$1 }
		},
		[`&.${filledInputClasses_default.focused}`]: { backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor$1 },
		[`&.${filledInputClasses_default.disabled}`]: { backgroundColor: theme.vars ? theme.vars.palette.FilledInput.disabledBg : disabledBackground },
		variants: [
			{
				props: ({ ownerState }) => !ownerState.disableUnderline,
				style: {
					"&::after": {
						left: 0,
						bottom: 0,
						content: "\"\"",
						position: "absolute",
						right: 0,
						transform: "scaleX(0)",
						transition: theme.transitions.create("transform", {
							duration: theme.transitions.duration.shorter,
							easing: theme.transitions.easing.easeOut
						}),
						pointerEvents: "none"
					},
					[`&.${filledInputClasses_default.focused}:after`]: { transform: "scaleX(1) translateX(0)" },
					[`&.${filledInputClasses_default.error}`]: { "&::before, &::after": { borderBottomColor: (theme.vars || theme).palette.error.main } },
					"&::before": {
						borderBottom: `1px solid ${theme.vars ? theme.alpha(theme.vars.palette.common.onBackground, theme.vars.opacity.inputUnderline) : bottomLineColor}`,
						left: 0,
						bottom: 0,
						content: "\"\\00a0\"",
						position: "absolute",
						right: 0,
						transition: theme.transitions.create("border-bottom-color", { duration: theme.transitions.duration.shorter }),
						pointerEvents: "none"
					},
					[`&:hover:not(.${filledInputClasses_default.disabled}, .${filledInputClasses_default.error}):before`]: { borderBottom: `1px solid ${(theme.vars || theme).palette.text.primary}` },
					[`&.${filledInputClasses_default.disabled}:before`]: { borderBottomStyle: "dotted" }
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color$1]) => ({
				props: {
					disableUnderline: false,
					color: color$1
				},
				style: { "&::after": { borderBottom: `2px solid ${(theme.vars || theme).palette[color$1]?.main}` } }
			})),
			{
				props: ({ ownerState }) => ownerState.startAdornment,
				style: { paddingLeft: 12 }
			},
			{
				props: ({ ownerState }) => ownerState.endAdornment,
				style: { paddingRight: 12 }
			},
			{
				props: ({ ownerState }) => ownerState.multiline,
				style: { padding: "25px 12px 8px" }
			},
			{
				props: ({ ownerState, size }) => ownerState.multiline && size === "small",
				style: {
					paddingTop: 21,
					paddingBottom: 4
				}
			},
			{
				props: ({ ownerState }) => ownerState.multiline && ownerState.hiddenLabel,
				style: {
					paddingTop: 16,
					paddingBottom: 17
				}
			},
			{
				props: ({ ownerState }) => ownerState.multiline && ownerState.hiddenLabel && ownerState.size === "small",
				style: {
					paddingTop: 8,
					paddingBottom: 9
				}
			}
		]
	};
}));
var FilledInputInput = styled_default(InputBaseInput, {
	name: "MuiFilledInput",
	slot: "Input",
	overridesResolver: inputOverridesResolver
})(memoTheme_default(({ theme }) => ({
	paddingTop: 25,
	paddingRight: 12,
	paddingBottom: 8,
	paddingLeft: 12,
	...!theme.vars && { "&:-webkit-autofill": {
		WebkitBoxShadow: theme.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
		WebkitTextFillColor: theme.palette.mode === "light" ? null : "#fff",
		caretColor: theme.palette.mode === "light" ? null : "#fff",
		borderTopLeftRadius: "inherit",
		borderTopRightRadius: "inherit"
	} },
	...theme.vars && {
		"&:-webkit-autofill": {
			borderTopLeftRadius: "inherit",
			borderTopRightRadius: "inherit"
		},
		[theme.getColorSchemeSelector("dark")]: { "&:-webkit-autofill": {
			WebkitBoxShadow: "0 0 0 100px #266798 inset",
			WebkitTextFillColor: "#fff",
			caretColor: "#fff"
		} }
	},
	variants: [
		{
			props: { size: "small" },
			style: {
				paddingTop: 21,
				paddingBottom: 4
			}
		},
		{
			props: ({ ownerState }) => ownerState.hiddenLabel,
			style: {
				paddingTop: 16,
				paddingBottom: 17
			}
		},
		{
			props: ({ ownerState }) => ownerState.startAdornment,
			style: { paddingLeft: 0 }
		},
		{
			props: ({ ownerState }) => ownerState.endAdornment,
			style: { paddingRight: 0 }
		},
		{
			props: ({ ownerState }) => ownerState.hiddenLabel && ownerState.size === "small",
			style: {
				paddingTop: 8,
				paddingBottom: 9
			}
		},
		{
			props: ({ ownerState }) => ownerState.multiline,
			style: {
				paddingTop: 0,
				paddingBottom: 0,
				paddingLeft: 0,
				paddingRight: 0
			}
		}
	]
})));
var FilledInput = /* @__PURE__ */ import_react.forwardRef(function FilledInput$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFilledInput"
	});
	const { disableUnderline = false, components = {}, componentsProps: componentsPropsProp, fullWidth = false, hiddenLabel, inputComponent = "input", multiline = false, slotProps, slots = {}, type = "text",...other } = props;
	const ownerState = {
		...props,
		disableUnderline,
		fullWidth,
		inputComponent,
		multiline,
		type
	};
	const classes = useUtilityClasses$23(props);
	const filledInputComponentsProps = {
		root: { ownerState },
		input: { ownerState }
	};
	const componentsProps = slotProps ?? componentsPropsProp ? deepmerge(filledInputComponentsProps, slotProps ?? componentsPropsProp) : filledInputComponentsProps;
	const RootSlot = slots.root ?? components.Root ?? FilledInputRoot;
	const InputSlot = slots.input ?? components.Input ?? FilledInputInput;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputBase_default, {
		slots: {
			root: RootSlot,
			input: InputSlot
		},
		slotProps: componentsProps,
		fullWidth,
		inputComponent,
		multiline,
		ref,
		type,
		...other,
		classes
	});
});
FilledInput.muiName = "Input";
var FilledInput_default = FilledInput;
function getFormControlUtilityClasses(slot) {
	return generateUtilityClass("MuiFormControl", slot);
}
generateUtilityClasses("MuiFormControl", [
	"root",
	"marginNone",
	"marginNormal",
	"marginDense",
	"fullWidth",
	"disabled"
]);
var useUtilityClasses$22 = (ownerState) => {
	const { classes, margin: margin$1, fullWidth } = ownerState;
	const slots = { root: [
		"root",
		margin$1 !== "none" && `margin${capitalize_default(margin$1)}`,
		fullWidth && "fullWidth"
	] };
	return composeClasses(slots, getFormControlUtilityClasses, classes);
};
var FormControlRoot = styled_default("div", {
	name: "MuiFormControl",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.root,
			styles$4[`margin${capitalize_default(ownerState.margin)}`],
			ownerState.fullWidth && styles$4.fullWidth
		];
	}
})({
	display: "inline-flex",
	flexDirection: "column",
	position: "relative",
	minWidth: 0,
	padding: 0,
	margin: 0,
	border: 0,
	verticalAlign: "top",
	variants: [
		{
			props: { margin: "normal" },
			style: {
				marginTop: 16,
				marginBottom: 8
			}
		},
		{
			props: { margin: "dense" },
			style: {
				marginTop: 8,
				marginBottom: 4
			}
		},
		{
			props: { fullWidth: true },
			style: { width: "100%" }
		}
	]
});
var FormControl_default = /* @__PURE__ */ import_react.forwardRef(function FormControl$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFormControl"
	});
	const { children, className, color: color$1 = "primary", component = "div", disabled = false, error = false, focused: visuallyFocused, fullWidth = false, hiddenLabel = false, margin: margin$1 = "none", required = false, size = "medium", variant = "outlined",...other } = props;
	const ownerState = {
		...props,
		color: color$1,
		component,
		disabled,
		error,
		fullWidth,
		hiddenLabel,
		margin: margin$1,
		required,
		size,
		variant
	};
	const classes = useUtilityClasses$22(ownerState);
	const [adornedStart, setAdornedStart] = import_react.useState(() => {
		let initialAdornedStart = false;
		if (children) import_react.Children.forEach(children, (child) => {
			if (!isMuiElement_default(child, ["Input", "Select"])) return;
			const input = isMuiElement_default(child, ["Select"]) ? child.props.input : child;
			if (input && isAdornedStart(input.props)) initialAdornedStart = true;
		});
		return initialAdornedStart;
	});
	const [filled, setFilled] = import_react.useState(() => {
		let initialFilled = false;
		if (children) import_react.Children.forEach(children, (child) => {
			if (!isMuiElement_default(child, ["Input", "Select"])) return;
			if (isFilled(child.props, true) || isFilled(child.props.inputProps, true)) initialFilled = true;
		});
		return initialFilled;
	});
	const [focusedState, setFocused] = import_react.useState(false);
	if (disabled && focusedState) setFocused(false);
	const focused = visuallyFocused !== void 0 && !disabled ? visuallyFocused : focusedState;
	let registerEffect;
	import_react.useRef(false);
	const onFilled = import_react.useCallback(() => {
		setFilled(true);
	}, []);
	const onEmpty = import_react.useCallback(() => {
		setFilled(false);
	}, []);
	const childContext = import_react.useMemo(() => {
		return {
			adornedStart,
			setAdornedStart,
			color: color$1,
			disabled,
			error,
			filled,
			focused,
			fullWidth,
			hiddenLabel,
			size,
			onBlur: () => {
				setFocused(false);
			},
			onFocus: () => {
				setFocused(true);
			},
			onEmpty,
			onFilled,
			registerEffect,
			required,
			variant
		};
	}, [
		adornedStart,
		color$1,
		disabled,
		error,
		filled,
		focused,
		fullWidth,
		hiddenLabel,
		registerEffect,
		onEmpty,
		onFilled,
		required,
		size,
		variant
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControlContext_default.Provider, {
		value: childContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControlRoot, {
			as: component,
			ownerState,
			className: clsx_default(classes.root, className),
			ref,
			...other,
			children
		})
	});
});
function getFormControlLabelUtilityClasses(slot) {
	return generateUtilityClass("MuiFormControlLabel", slot);
}
var formControlLabelClasses_default = generateUtilityClasses("MuiFormControlLabel", [
	"root",
	"labelPlacementStart",
	"labelPlacementTop",
	"labelPlacementBottom",
	"disabled",
	"label",
	"error",
	"required",
	"asterisk"
]);
var useUtilityClasses$21 = (ownerState) => {
	const { classes, disabled, labelPlacement, error, required } = ownerState;
	const slots = {
		root: [
			"root",
			disabled && "disabled",
			`labelPlacement${capitalize_default(labelPlacement)}`,
			error && "error",
			required && "required"
		],
		label: ["label", disabled && "disabled"],
		asterisk: ["asterisk", error && "error"]
	};
	return composeClasses(slots, getFormControlLabelUtilityClasses, classes);
};
const FormControlLabelRoot = styled_default("label", {
	name: "MuiFormControlLabel",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			{ [`& .${formControlLabelClasses_default.label}`]: styles$4.label },
			styles$4.root,
			styles$4[`labelPlacement${capitalize_default(ownerState.labelPlacement)}`]
		];
	}
})(memoTheme_default(({ theme }) => ({
	display: "inline-flex",
	alignItems: "center",
	cursor: "pointer",
	verticalAlign: "middle",
	WebkitTapHighlightColor: "transparent",
	marginLeft: -11,
	marginRight: 16,
	[`&.${formControlLabelClasses_default.disabled}`]: { cursor: "default" },
	[`& .${formControlLabelClasses_default.label}`]: { [`&.${formControlLabelClasses_default.disabled}`]: { color: (theme.vars || theme).palette.text.disabled } },
	variants: [
		{
			props: { labelPlacement: "start" },
			style: {
				flexDirection: "row-reverse",
				marginRight: -11
			}
		},
		{
			props: { labelPlacement: "top" },
			style: { flexDirection: "column-reverse" }
		},
		{
			props: { labelPlacement: "bottom" },
			style: { flexDirection: "column" }
		},
		{
			props: ({ labelPlacement }) => labelPlacement === "start" || labelPlacement === "top" || labelPlacement === "bottom",
			style: { marginLeft: 16 }
		}
	]
})));
var AsteriskComponent$1 = styled_default("span", {
	name: "MuiFormControlLabel",
	slot: "Asterisk"
})(memoTheme_default(({ theme }) => ({ [`&.${formControlLabelClasses_default.error}`]: { color: (theme.vars || theme).palette.error.main } })));
var FormControlLabel_default = /* @__PURE__ */ import_react.forwardRef(function FormControlLabel$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFormControlLabel"
	});
	const { checked, className, componentsProps = {}, control, disabled: disabledProp, disableTypography, inputRef, label: labelProp, labelPlacement = "end", name, onChange, required: requiredProp, slots = {}, slotProps = {}, value,...other } = props;
	const muiFormControl = useFormControl();
	const disabled = disabledProp ?? control.props.disabled ?? muiFormControl?.disabled;
	const required = requiredProp ?? control.props.required;
	const controlProps = {
		disabled,
		required
	};
	[
		"checked",
		"name",
		"onChange",
		"value",
		"inputRef"
	].forEach((key) => {
		if (typeof control.props[key] === "undefined" && typeof props[key] !== "undefined") controlProps[key] = props[key];
	});
	const fcs = formControlState({
		props,
		muiFormControl,
		states: ["error"]
	});
	const ownerState = {
		...props,
		disabled,
		labelPlacement,
		required,
		error: fcs.error
	};
	const classes = useUtilityClasses$21(ownerState);
	const externalForwardedProps = {
		slots,
		slotProps: {
			...componentsProps,
			...slotProps
		}
	};
	const [TypographySlot, typographySlotProps] = useSlot("typography", {
		elementType: Typography_default,
		externalForwardedProps,
		ownerState
	});
	let label = labelProp;
	if (label != null && label.type !== Typography_default && !disableTypography) label = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypographySlot, {
		component: "span",
		...typographySlotProps,
		className: clsx_default(classes.label, typographySlotProps?.className),
		children: label
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormControlLabelRoot, {
		className: clsx_default(classes.root, className),
		ownerState,
		ref,
		...other,
		children: [/* @__PURE__ */ import_react.cloneElement(control, controlProps), required ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AsteriskComponent$1, {
			ownerState,
			"aria-hidden": true,
			className: classes.asterisk,
			children: [" ", "*"]
		})] }) : label]
	});
});
function getFormLabelUtilityClasses(slot) {
	return generateUtilityClass("MuiFormLabel", slot);
}
var formLabelClasses_default = generateUtilityClasses("MuiFormLabel", [
	"root",
	"colorSecondary",
	"focused",
	"disabled",
	"error",
	"filled",
	"required",
	"asterisk"
]);
var useUtilityClasses$20 = (ownerState) => {
	const { classes, color: color$1, focused, disabled, error, filled, required } = ownerState;
	const slots = {
		root: [
			"root",
			`color${capitalize_default(color$1)}`,
			disabled && "disabled",
			error && "error",
			filled && "filled",
			focused && "focused",
			required && "required"
		],
		asterisk: ["asterisk", error && "error"]
	};
	return composeClasses(slots, getFormLabelUtilityClasses, classes);
};
const FormLabelRoot = styled_default("label", {
	name: "MuiFormLabel",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.root,
			ownerState.color === "secondary" && styles$4.colorSecondary,
			ownerState.filled && styles$4.filled
		];
	}
})(memoTheme_default(({ theme }) => ({
	color: (theme.vars || theme).palette.text.secondary,
	...theme.typography.body1,
	lineHeight: "1.4375em",
	padding: 0,
	position: "relative",
	variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color$1]) => ({
		props: { color: color$1 },
		style: { [`&.${formLabelClasses_default.focused}`]: { color: (theme.vars || theme).palette[color$1].main } }
	})), {
		props: {},
		style: {
			[`&.${formLabelClasses_default.disabled}`]: { color: (theme.vars || theme).palette.text.disabled },
			[`&.${formLabelClasses_default.error}`]: { color: (theme.vars || theme).palette.error.main }
		}
	}]
})));
var AsteriskComponent = styled_default("span", {
	name: "MuiFormLabel",
	slot: "Asterisk"
})(memoTheme_default(({ theme }) => ({ [`&.${formLabelClasses_default.error}`]: { color: (theme.vars || theme).palette.error.main } })));
var FormLabel_default = /* @__PURE__ */ import_react.forwardRef(function FormLabel$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFormLabel"
	});
	const { children, className, color: color$1, component = "label", disabled, error, filled, focused, required,...other } = props;
	const muiFormControl = useFormControl();
	const fcs = formControlState({
		props,
		muiFormControl,
		states: [
			"color",
			"required",
			"focused",
			"disabled",
			"error",
			"filled"
		]
	});
	const ownerState = {
		...props,
		color: fcs.color || "primary",
		component,
		disabled: fcs.disabled,
		error: fcs.error,
		filled: fcs.filled,
		focused: fcs.focused,
		required: fcs.required
	};
	const classes = useUtilityClasses$20(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabelRoot, {
		as: component,
		ownerState,
		className: clsx_default(classes.root, className),
		ref,
		...other,
		children: [children, fcs.required && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AsteriskComponent, {
			ownerState,
			"aria-hidden": true,
			className: classes.asterisk,
			children: [" ", "*"]
		})]
	});
});
function getScale(value) {
	return `scale(${value}, ${value ** 2})`;
}
var styles = {
	entering: {
		opacity: 1,
		transform: getScale(1)
	},
	entered: {
		opacity: 1,
		transform: "none"
	}
};
var isWebKit154 = typeof navigator !== "undefined" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent);
var Grow = /* @__PURE__ */ import_react.forwardRef(function Grow$1(props, ref) {
	const { addEndListener, appear = true, children, easing: easing$1, in: inProp, onEnter, onEntered, onEntering, onExit, onExited, onExiting, style: style$3, timeout = "auto", TransitionComponent = Transition_default,...other } = props;
	const timer = useTimeout();
	const autoTimeout = import_react.useRef();
	const theme = useTheme();
	const nodeRef = import_react.useRef(null);
	const handleRef = useForkRef_default(nodeRef, getReactElementRef(children), ref);
	const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
		if (callback) {
			const node$1 = nodeRef.current;
			if (maybeIsAppearing === void 0) callback(node$1);
			else callback(node$1, maybeIsAppearing);
		}
	};
	const handleEntering = normalizedTransitionCallback(onEntering);
	const handleEnter = normalizedTransitionCallback((node$1, isAppearing) => {
		reflow(node$1);
		const { duration: transitionDuration, delay, easing: transitionTimingFunction } = getTransitionProps({
			style: style$3,
			timeout,
			easing: easing$1
		}, { mode: "enter" });
		let duration$1;
		if (timeout === "auto") {
			duration$1 = theme.transitions.getAutoHeightDuration(node$1.clientHeight);
			autoTimeout.current = duration$1;
		} else duration$1 = transitionDuration;
		node$1.style.transition = [theme.transitions.create("opacity", {
			duration: duration$1,
			delay
		}), theme.transitions.create("transform", {
			duration: isWebKit154 ? duration$1 : duration$1 * .666,
			delay,
			easing: transitionTimingFunction
		})].join(",");
		if (onEnter) onEnter(node$1, isAppearing);
	});
	const handleEntered = normalizedTransitionCallback(onEntered);
	const handleExiting = normalizedTransitionCallback(onExiting);
	const handleExit = normalizedTransitionCallback((node$1) => {
		const { duration: transitionDuration, delay, easing: transitionTimingFunction } = getTransitionProps({
			style: style$3,
			timeout,
			easing: easing$1
		}, { mode: "exit" });
		let duration$1;
		if (timeout === "auto") {
			duration$1 = theme.transitions.getAutoHeightDuration(node$1.clientHeight);
			autoTimeout.current = duration$1;
		} else duration$1 = transitionDuration;
		node$1.style.transition = [theme.transitions.create("opacity", {
			duration: duration$1,
			delay
		}), theme.transitions.create("transform", {
			duration: isWebKit154 ? duration$1 : duration$1 * .666,
			delay: isWebKit154 ? delay : delay || duration$1 * .333,
			easing: transitionTimingFunction
		})].join(",");
		node$1.style.opacity = 0;
		node$1.style.transform = getScale(.75);
		if (onExit) onExit(node$1);
	});
	const handleExited = normalizedTransitionCallback(onExited);
	const handleAddEndListener = (next$1) => {
		if (timeout === "auto") timer.start(autoTimeout.current || 0, next$1);
		if (addEndListener) addEndListener(nodeRef.current, next$1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionComponent, {
		appear,
		in: inProp,
		nodeRef,
		onEnter: handleEnter,
		onEntered: handleEntered,
		onEntering: handleEntering,
		onExit: handleExit,
		onExited: handleExited,
		onExiting: handleExiting,
		addEndListener: handleAddEndListener,
		timeout: timeout === "auto" ? null : timeout,
		...other,
		children: (state, { ownerState,...restChildProps }) => {
			return /* @__PURE__ */ import_react.cloneElement(children, {
				style: {
					opacity: 0,
					transform: getScale(.75),
					visibility: state === "exited" && !inProp ? "hidden" : void 0,
					...styles[state],
					...style$3,
					...children.props.style
				},
				ref: handleRef,
				...restChildProps
			});
		}
	});
});
if (Grow) Grow.muiSupportAuto = true;
var Grow_default = Grow;
var useUtilityClasses$19 = (ownerState) => {
	const { classes, disableUnderline } = ownerState;
	const composedClasses = composeClasses({
		root: ["root", !disableUnderline && "underline"],
		input: ["input"]
	}, getInputUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var InputRoot = styled_default(InputBaseRoot, {
	shouldForwardProp: (prop) => rootShouldForwardProp_default(prop) || prop === "classes",
	name: "MuiInput",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [...rootOverridesResolver(props, styles$4), !ownerState.disableUnderline && styles$4.underline];
	}
})(memoTheme_default(({ theme }) => {
	let bottomLineColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
	if (theme.vars) bottomLineColor = theme.alpha(theme.vars.palette.common.onBackground, theme.vars.opacity.inputUnderline);
	return {
		position: "relative",
		variants: [
			{
				props: ({ ownerState }) => ownerState.formControl,
				style: { "label + &": { marginTop: 16 } }
			},
			{
				props: ({ ownerState }) => !ownerState.disableUnderline,
				style: {
					"&::after": {
						left: 0,
						bottom: 0,
						content: "\"\"",
						position: "absolute",
						right: 0,
						transform: "scaleX(0)",
						transition: theme.transitions.create("transform", {
							duration: theme.transitions.duration.shorter,
							easing: theme.transitions.easing.easeOut
						}),
						pointerEvents: "none"
					},
					[`&.${inputClasses_default.focused}:after`]: { transform: "scaleX(1) translateX(0)" },
					[`&.${inputClasses_default.error}`]: { "&::before, &::after": { borderBottomColor: (theme.vars || theme).palette.error.main } },
					"&::before": {
						borderBottom: `1px solid ${bottomLineColor}`,
						left: 0,
						bottom: 0,
						content: "\"\\00a0\"",
						position: "absolute",
						right: 0,
						transition: theme.transitions.create("border-bottom-color", { duration: theme.transitions.duration.shorter }),
						pointerEvents: "none"
					},
					[`&:hover:not(.${inputClasses_default.disabled}, .${inputClasses_default.error}):before`]: {
						borderBottom: `2px solid ${(theme.vars || theme).palette.text.primary}`,
						"@media (hover: none)": { borderBottom: `1px solid ${bottomLineColor}` }
					},
					[`&.${inputClasses_default.disabled}:before`]: { borderBottomStyle: "dotted" }
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color$1]) => ({
				props: {
					color: color$1,
					disableUnderline: false
				},
				style: { "&::after": { borderBottom: `2px solid ${(theme.vars || theme).palette[color$1].main}` } }
			}))
		]
	};
}));
var InputInput = styled_default(InputBaseInput, {
	name: "MuiInput",
	slot: "Input",
	overridesResolver: inputOverridesResolver
})({});
var Input = /* @__PURE__ */ import_react.forwardRef(function Input$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiInput"
	});
	const { disableUnderline = false, components = {}, componentsProps: componentsPropsProp, fullWidth = false, inputComponent = "input", multiline = false, slotProps, slots = {}, type = "text",...other } = props;
	const classes = useUtilityClasses$19(props);
	const inputComponentsProps = { root: { ownerState: { disableUnderline } } };
	const componentsProps = slotProps ?? componentsPropsProp ? deepmerge(slotProps ?? componentsPropsProp, inputComponentsProps) : inputComponentsProps;
	const RootSlot = slots.root ?? components.Root ?? InputRoot;
	const InputSlot = slots.input ?? components.Input ?? InputInput;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputBase_default, {
		slots: {
			root: RootSlot,
			input: InputSlot
		},
		slotProps: componentsProps,
		fullWidth,
		inputComponent,
		multiline,
		ref,
		type,
		...other,
		classes
	});
});
Input.muiName = "Input";
var Input_default = Input;
function getInputLabelUtilityClasses(slot) {
	return generateUtilityClass("MuiInputLabel", slot);
}
generateUtilityClasses("MuiInputLabel", [
	"root",
	"focused",
	"disabled",
	"error",
	"required",
	"asterisk",
	"formControl",
	"sizeSmall",
	"shrink",
	"animated",
	"standard",
	"filled",
	"outlined"
]);
var useUtilityClasses$18 = (ownerState) => {
	const { classes, formControl, size, shrink, disableAnimation, variant, required } = ownerState;
	const slots = {
		root: [
			"root",
			formControl && "formControl",
			!disableAnimation && "animated",
			shrink && "shrink",
			size && size !== "medium" && `size${capitalize_default(size)}`,
			variant
		],
		asterisk: [required && "asterisk"]
	};
	const composedClasses = composeClasses(slots, getInputLabelUtilityClasses, classes);
	return {
		...classes,
		...composedClasses
	};
};
var InputLabelRoot = styled_default(FormLabel_default, {
	shouldForwardProp: (prop) => rootShouldForwardProp_default(prop) || prop === "classes",
	name: "MuiInputLabel",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			{ [`& .${formLabelClasses_default.asterisk}`]: styles$4.asterisk },
			styles$4.root,
			ownerState.formControl && styles$4.formControl,
			ownerState.size === "small" && styles$4.sizeSmall,
			ownerState.shrink && styles$4.shrink,
			!ownerState.disableAnimation && styles$4.animated,
			ownerState.focused && styles$4.focused,
			styles$4[ownerState.variant]
		];
	}
})(memoTheme_default(({ theme }) => ({
	display: "block",
	transformOrigin: "top left",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
	maxWidth: "100%",
	variants: [
		{
			props: ({ ownerState }) => ownerState.formControl,
			style: {
				position: "absolute",
				left: 0,
				top: 0,
				transform: "translate(0, 20px) scale(1)"
			}
		},
		{
			props: { size: "small" },
			style: { transform: "translate(0, 17px) scale(1)" }
		},
		{
			props: ({ ownerState }) => ownerState.shrink,
			style: {
				transform: "translate(0, -1.5px) scale(0.75)",
				transformOrigin: "top left",
				maxWidth: "133%"
			}
		},
		{
			props: ({ ownerState }) => !ownerState.disableAnimation,
			style: { transition: theme.transitions.create([
				"color",
				"transform",
				"max-width"
			], {
				duration: theme.transitions.duration.shorter,
				easing: theme.transitions.easing.easeOut
			}) }
		},
		{
			props: { variant: "filled" },
			style: {
				zIndex: 1,
				pointerEvents: "none",
				transform: "translate(12px, 16px) scale(1)",
				maxWidth: "calc(100% - 24px)"
			}
		},
		{
			props: {
				variant: "filled",
				size: "small"
			},
			style: { transform: "translate(12px, 13px) scale(1)" }
		},
		{
			props: ({ variant, ownerState }) => variant === "filled" && ownerState.shrink,
			style: {
				userSelect: "none",
				pointerEvents: "auto",
				transform: "translate(12px, 7px) scale(0.75)",
				maxWidth: "calc(133% - 24px)"
			}
		},
		{
			props: ({ variant, ownerState, size }) => variant === "filled" && ownerState.shrink && size === "small",
			style: { transform: "translate(12px, 4px) scale(0.75)" }
		},
		{
			props: { variant: "outlined" },
			style: {
				zIndex: 1,
				pointerEvents: "none",
				transform: "translate(14px, 16px) scale(1)",
				maxWidth: "calc(100% - 24px)"
			}
		},
		{
			props: {
				variant: "outlined",
				size: "small"
			},
			style: { transform: "translate(14px, 9px) scale(1)" }
		},
		{
			props: ({ variant, ownerState }) => variant === "outlined" && ownerState.shrink,
			style: {
				userSelect: "none",
				pointerEvents: "auto",
				maxWidth: "calc(133% - 32px)",
				transform: "translate(14px, -9px) scale(0.75)"
			}
		}
	]
})));
var InputLabel_default = /* @__PURE__ */ import_react.forwardRef(function InputLabel$1(inProps, ref) {
	const props = useDefaultProps({
		name: "MuiInputLabel",
		props: inProps
	});
	const { disableAnimation = false, margin: margin$1, shrink: shrinkProp, variant, className,...other } = props;
	const muiFormControl = useFormControl();
	let shrink = shrinkProp;
	if (typeof shrink === "undefined" && muiFormControl) shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
	const fcs = formControlState({
		props,
		muiFormControl,
		states: [
			"size",
			"variant",
			"required",
			"focused"
		]
	});
	const ownerState = {
		...props,
		disableAnimation,
		formControl: muiFormControl,
		shrink,
		size: fcs.size,
		variant: fcs.variant,
		required: fcs.required,
		focused: fcs.focused
	};
	const classes = useUtilityClasses$18(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputLabelRoot, {
		"data-shrink": shrink,
		ref,
		className: clsx_default(classes.root, className),
		...other,
		ownerState,
		classes
	});
});
function getLinkUtilityClass(slot) {
	return generateUtilityClass("MuiLink", slot);
}
var linkClasses_default = generateUtilityClasses("MuiLink", [
	"root",
	"underlineNone",
	"underlineHover",
	"underlineAlways",
	"button",
	"focusVisible"
]);
var getTextDecoration = ({ theme, ownerState }) => {
	const transformedColor = ownerState.color;
	if ("colorSpace" in theme && theme.colorSpace) {
		const color$2 = getPath(theme, `palette.${transformedColor}.main`) || getPath(theme, `palette.${transformedColor}`) || ownerState.color;
		return theme.alpha(color$2, .4);
	}
	const color$1 = getPath(theme, `palette.${transformedColor}.main`, false) || getPath(theme, `palette.${transformedColor}`, false) || ownerState.color;
	const channelColor = getPath(theme, `palette.${transformedColor}.mainChannel`) || getPath(theme, `palette.${transformedColor}Channel`);
	if ("vars" in theme && channelColor) return `rgba(${channelColor} / 0.4)`;
	return alpha(color$1, .4);
};
var getTextDecoration_default = getTextDecoration;
var v6Colors = {
	primary: true,
	secondary: true,
	error: true,
	info: true,
	success: true,
	warning: true,
	textPrimary: true,
	textSecondary: true,
	textDisabled: true
};
var useUtilityClasses$17 = (ownerState) => {
	const { classes, component, focusVisible, underline } = ownerState;
	const slots = { root: [
		"root",
		`underline${capitalize_default(underline)}`,
		component === "button" && "button",
		focusVisible && "focusVisible"
	] };
	return composeClasses(slots, getLinkUtilityClass, classes);
};
var LinkRoot = styled_default(Typography_default, {
	name: "MuiLink",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.root,
			styles$4[`underline${capitalize_default(ownerState.underline)}`],
			ownerState.component === "button" && styles$4.button
		];
	}
})(memoTheme_default(({ theme }) => {
	return { variants: [
		{
			props: { underline: "none" },
			style: { textDecoration: "none" }
		},
		{
			props: { underline: "hover" },
			style: {
				textDecoration: "none",
				"&:hover": { textDecoration: "underline" }
			}
		},
		{
			props: { underline: "always" },
			style: {
				textDecoration: "underline",
				"&:hover": { textDecorationColor: "inherit" }
			}
		},
		{
			props: ({ underline, ownerState }) => underline === "always" && ownerState.color !== "inherit",
			style: { textDecorationColor: "var(--Link-underlineColor)" }
		},
		{
			props: ({ underline, ownerState }) => underline === "always" && ownerState.color === "inherit",
			style: theme.colorSpace ? { textDecorationColor: theme.alpha("currentColor", .4) } : null
		},
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color$1]) => ({
			props: {
				underline: "always",
				color: color$1
			},
			style: { "--Link-underlineColor": theme.alpha((theme.vars || theme).palette[color$1].main, .4) }
		})),
		{
			props: {
				underline: "always",
				color: "textPrimary"
			},
			style: { "--Link-underlineColor": theme.alpha((theme.vars || theme).palette.text.primary, .4) }
		},
		{
			props: {
				underline: "always",
				color: "textSecondary"
			},
			style: { "--Link-underlineColor": theme.alpha((theme.vars || theme).palette.text.secondary, .4) }
		},
		{
			props: {
				underline: "always",
				color: "textDisabled"
			},
			style: { "--Link-underlineColor": (theme.vars || theme).palette.text.disabled }
		},
		{
			props: { component: "button" },
			style: {
				position: "relative",
				WebkitTapHighlightColor: "transparent",
				backgroundColor: "transparent",
				outline: 0,
				border: 0,
				margin: 0,
				borderRadius: 0,
				padding: 0,
				cursor: "pointer",
				userSelect: "none",
				verticalAlign: "middle",
				MozAppearance: "none",
				WebkitAppearance: "none",
				"&::-moz-focus-inner": { borderStyle: "none" },
				[`&.${linkClasses_default.focusVisible}`]: { outline: "auto" }
			}
		}
	] };
}));
var Link_default = /* @__PURE__ */ import_react.forwardRef(function Link$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiLink"
	});
	const theme = useTheme();
	const { className, color: color$1 = "primary", component = "a", onBlur, onFocus, TypographyClasses, underline = "always", variant = "inherit", sx,...other } = props;
	const [focusVisible, setFocusVisible] = import_react.useState(false);
	const handleBlur = (event) => {
		if (!isFocusVisible(event.target)) setFocusVisible(false);
		if (onBlur) onBlur(event);
	};
	const handleFocus = (event) => {
		if (isFocusVisible(event.target)) setFocusVisible(true);
		if (onFocus) onFocus(event);
	};
	const ownerState = {
		...props,
		color: color$1,
		component,
		focusVisible,
		underline,
		variant
	};
	const classes = useUtilityClasses$17(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkRoot, {
		color: color$1,
		className: clsx_default(classes.root, className),
		classes: TypographyClasses,
		component,
		onBlur: handleBlur,
		onFocus: handleFocus,
		ref,
		ownerState,
		variant,
		...other,
		sx: [...v6Colors[color$1] === void 0 ? [{ color: color$1 }] : [], ...Array.isArray(sx) ? sx : [sx]],
		style: {
			...other.style,
			...underline === "always" && color$1 !== "inherit" && !v6Colors[color$1] && { "--Link-underlineColor": getTextDecoration_default({
				theme,
				ownerState
			}) }
		}
	});
});
var ListContext_default = /* @__PURE__ */ import_react.createContext({});
function getListUtilityClass(slot) {
	return generateUtilityClass("MuiList", slot);
}
generateUtilityClasses("MuiList", [
	"root",
	"padding",
	"dense",
	"subheader"
]);
var useUtilityClasses$16 = (ownerState) => {
	const { classes, disablePadding, dense, subheader } = ownerState;
	return composeClasses({ root: [
		"root",
		!disablePadding && "padding",
		dense && "dense",
		subheader && "subheader"
	] }, getListUtilityClass, classes);
};
var ListRoot = styled_default("ul", {
	name: "MuiList",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.root,
			!ownerState.disablePadding && styles$4.padding,
			ownerState.dense && styles$4.dense,
			ownerState.subheader && styles$4.subheader
		];
	}
})({
	listStyle: "none",
	margin: 0,
	padding: 0,
	position: "relative",
	variants: [{
		props: ({ ownerState }) => !ownerState.disablePadding,
		style: {
			paddingTop: 8,
			paddingBottom: 8
		}
	}, {
		props: ({ ownerState }) => ownerState.subheader,
		style: { paddingTop: 0 }
	}]
});
var List_default = /* @__PURE__ */ import_react.forwardRef(function List$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiList"
	});
	const { children, className, component = "ul", dense = false, disablePadding = false, subheader,...other } = props;
	const context = import_react.useMemo(() => ({ dense }), [dense]);
	const ownerState = {
		...props,
		component,
		dense,
		disablePadding
	};
	const classes = useUtilityClasses$16(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListContext_default.Provider, {
		value: context,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListRoot, {
			as: component,
			className: clsx_default(classes.root, className),
			ref,
			ownerState,
			...other,
			children: [subheader, children]
		})
	});
});
var listItemIconClasses_default = generateUtilityClasses("MuiListItemIcon", ["root", "alignItemsFlexStart"]);
var listItemTextClasses_default = generateUtilityClasses("MuiListItemText", [
	"root",
	"multiline",
	"dense",
	"inset",
	"primary",
	"secondary"
]);
var getScrollbarSize_default = getScrollbarSize;
function nextItem(list, item, disableListWrap) {
	if (list === item) return list.firstChild;
	if (item && item.nextElementSibling) return item.nextElementSibling;
	return disableListWrap ? null : list.firstChild;
}
function previousItem(list, item, disableListWrap) {
	if (list === item) return disableListWrap ? list.firstChild : list.lastChild;
	if (item && item.previousElementSibling) return item.previousElementSibling;
	return disableListWrap ? null : list.lastChild;
}
function textCriteriaMatches(nextFocus, textCriteria) {
	if (textCriteria === void 0) return true;
	let text = nextFocus.innerText;
	if (text === void 0) text = nextFocus.textContent;
	text = text.trim().toLowerCase();
	if (text.length === 0) return false;
	if (textCriteria.repeating) return text[0] === textCriteria.keys[0];
	return text.startsWith(textCriteria.keys.join(""));
}
function moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, traversalFunction, textCriteria) {
	let wrappedOnce = false;
	let nextFocus = traversalFunction(list, currentFocus, currentFocus ? disableListWrap : false);
	while (nextFocus) {
		if (nextFocus === list.firstChild) {
			if (wrappedOnce) return false;
			wrappedOnce = true;
		}
		const nextFocusDisabled = disabledItemsFocusable ? false : nextFocus.disabled || nextFocus.getAttribute("aria-disabled") === "true";
		if (!nextFocus.hasAttribute("tabindex") || !textCriteriaMatches(nextFocus, textCriteria) || nextFocusDisabled) nextFocus = traversalFunction(list, nextFocus, disableListWrap);
		else {
			nextFocus.focus();
			return true;
		}
	}
	return false;
}
var MenuList_default = /* @__PURE__ */ import_react.forwardRef(function MenuList$1(props, ref) {
	const { actions, autoFocus = false, autoFocusItem = false, children, className, disabledItemsFocusable = false, disableListWrap = false, onKeyDown, variant = "selectedMenu",...other } = props;
	const listRef = import_react.useRef(null);
	const textCriteriaRef = import_react.useRef({
		keys: [],
		repeating: true,
		previousKeyMatched: true,
		lastTime: null
	});
	useEnhancedEffect_default(() => {
		if (autoFocus) listRef.current.focus();
	}, [autoFocus]);
	import_react.useImperativeHandle(actions, () => ({ adjustStyleForScrollbar: (containerElement, { direction }) => {
		const noExplicitWidth = !listRef.current.style.width;
		if (containerElement.clientHeight < listRef.current.clientHeight && noExplicitWidth) {
			const scrollbarSize = `${getScrollbarSize_default(ownerWindow_default(containerElement))}px`;
			listRef.current.style[direction === "rtl" ? "paddingLeft" : "paddingRight"] = scrollbarSize;
			listRef.current.style.width = `calc(100% + ${scrollbarSize})`;
		}
		return listRef.current;
	} }), []);
	const handleKeyDown = (event) => {
		const list = listRef.current;
		const key = event.key;
		if (event.ctrlKey || event.metaKey || event.altKey) {
			if (onKeyDown) onKeyDown(event);
			return;
		}
		const currentFocus = ownerDocument_default(list).activeElement;
		if (key === "ArrowDown") {
			event.preventDefault();
			moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, nextItem);
		} else if (key === "ArrowUp") {
			event.preventDefault();
			moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, previousItem);
		} else if (key === "Home") {
			event.preventDefault();
			moveFocus(list, null, disableListWrap, disabledItemsFocusable, nextItem);
		} else if (key === "End") {
			event.preventDefault();
			moveFocus(list, null, disableListWrap, disabledItemsFocusable, previousItem);
		} else if (key.length === 1) {
			const criteria = textCriteriaRef.current;
			const lowerKey = key.toLowerCase();
			const currTime = performance.now();
			if (criteria.keys.length > 0) {
				if (currTime - criteria.lastTime > 500) {
					criteria.keys = [];
					criteria.repeating = true;
					criteria.previousKeyMatched = true;
				} else if (criteria.repeating && lowerKey !== criteria.keys[0]) criteria.repeating = false;
			}
			criteria.lastTime = currTime;
			criteria.keys.push(lowerKey);
			const keepFocusOnCurrent = currentFocus && !criteria.repeating && textCriteriaMatches(currentFocus, criteria);
			if (criteria.previousKeyMatched && (keepFocusOnCurrent || moveFocus(list, currentFocus, false, disabledItemsFocusable, nextItem, criteria))) event.preventDefault();
			else criteria.previousKeyMatched = false;
		}
		if (onKeyDown) onKeyDown(event);
	};
	const handleRef = useForkRef_default(listRef, ref);
	let activeItemIndex = -1;
	import_react.Children.forEach(children, (child, index) => {
		if (!/* @__PURE__ */ import_react.isValidElement(child)) {
			if (activeItemIndex === index) {
				activeItemIndex += 1;
				if (activeItemIndex >= children.length) activeItemIndex = -1;
			}
			return;
		}
		if (!child.props.disabled) {
			if (variant === "selectedMenu" && child.props.selected) activeItemIndex = index;
			else if (activeItemIndex === -1) activeItemIndex = index;
		}
		if (activeItemIndex === index && (child.props.disabled || child.props.muiSkipListHighlight || child.type.muiSkipListHighlight)) {
			activeItemIndex += 1;
			if (activeItemIndex >= children.length) activeItemIndex = -1;
		}
	});
	const items = import_react.Children.map(children, (child, index) => {
		if (index === activeItemIndex) {
			const newChildProps = {};
			if (autoFocusItem) newChildProps.autoFocus = true;
			if (child.props.tabIndex === void 0 && variant === "selectedMenu") newChildProps.tabIndex = 0;
			return /* @__PURE__ */ import_react.cloneElement(child, newChildProps);
		}
		return child;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List_default, {
		role: "menu",
		ref: handleRef,
		className,
		onKeyDown: handleKeyDown,
		tabIndex: autoFocus ? 0 : -1,
		...other,
		children: items
	});
});
function getPopoverUtilityClass(slot) {
	return generateUtilityClass("MuiPopover", slot);
}
generateUtilityClasses("MuiPopover", ["root", "paper"]);
function getOffsetTop(rect, vertical) {
	let offset = 0;
	if (typeof vertical === "number") offset = vertical;
	else if (vertical === "center") offset = rect.height / 2;
	else if (vertical === "bottom") offset = rect.height;
	return offset;
}
function getOffsetLeft(rect, horizontal) {
	let offset = 0;
	if (typeof horizontal === "number") offset = horizontal;
	else if (horizontal === "center") offset = rect.width / 2;
	else if (horizontal === "right") offset = rect.width;
	return offset;
}
function getTransformOriginValue(transformOrigin) {
	return [transformOrigin.horizontal, transformOrigin.vertical].map((n$1) => typeof n$1 === "number" ? `${n$1}px` : n$1).join(" ");
}
function resolveAnchorEl(anchorEl) {
	return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
var useUtilityClasses$15 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({
		root: ["root"],
		paper: ["paper"]
	}, getPopoverUtilityClass, classes);
};
const PopoverRoot = styled_default(Modal_default, {
	name: "MuiPopover",
	slot: "Root"
})({});
const PopoverPaper = styled_default(Paper_default, {
	name: "MuiPopover",
	slot: "Paper"
})({
	position: "absolute",
	overflowY: "auto",
	overflowX: "hidden",
	minWidth: 16,
	minHeight: 16,
	maxWidth: "calc(100% - 32px)",
	maxHeight: "calc(100% - 32px)",
	outline: 0
});
var Popover_default = /* @__PURE__ */ import_react.forwardRef(function Popover$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiPopover"
	});
	const { action, anchorEl, anchorOrigin = {
		vertical: "top",
		horizontal: "left"
	}, anchorPosition, anchorReference = "anchorEl", children, className, container: containerProp, elevation = 8, marginThreshold = 16, open, PaperProps: PaperPropsProp = {}, slots = {}, slotProps = {}, transformOrigin = {
		vertical: "top",
		horizontal: "left"
	}, TransitionComponent, transitionDuration: transitionDurationProp = "auto", TransitionProps = {}, disableScrollLock = false,...other } = props;
	const paperRef = import_react.useRef();
	const ownerState = {
		...props,
		anchorOrigin,
		anchorReference,
		elevation,
		marginThreshold,
		transformOrigin,
		TransitionComponent,
		transitionDuration: transitionDurationProp,
		TransitionProps
	};
	const classes = useUtilityClasses$15(ownerState);
	const getAnchorOffset = import_react.useCallback(() => {
		if (anchorReference === "anchorPosition") return anchorPosition;
		const resolvedAnchorEl = resolveAnchorEl(anchorEl);
		const anchorRect = (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1 ? resolvedAnchorEl : ownerDocument_default(paperRef.current).body).getBoundingClientRect();
		return {
			top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
			left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal)
		};
	}, [
		anchorEl,
		anchorOrigin.horizontal,
		anchorOrigin.vertical,
		anchorPosition,
		anchorReference
	]);
	const getTransformOrigin = import_react.useCallback((elemRect) => {
		return {
			vertical: getOffsetTop(elemRect, transformOrigin.vertical),
			horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal)
		};
	}, [transformOrigin.horizontal, transformOrigin.vertical]);
	const getPositioningStyle = import_react.useCallback((element) => {
		const elemRect = {
			width: element.offsetWidth,
			height: element.offsetHeight
		};
		const elemTransformOrigin = getTransformOrigin(elemRect);
		if (anchorReference === "none") return {
			top: null,
			left: null,
			transformOrigin: getTransformOriginValue(elemTransformOrigin)
		};
		const anchorOffset = getAnchorOffset();
		let top = anchorOffset.top - elemTransformOrigin.vertical;
		let left = anchorOffset.left - elemTransformOrigin.horizontal;
		const bottom = top + elemRect.height;
		const right = left + elemRect.width;
		const containerWindow = ownerWindow_default(resolveAnchorEl(anchorEl));
		const heightThreshold = containerWindow.innerHeight - marginThreshold;
		const widthThreshold = containerWindow.innerWidth - marginThreshold;
		if (marginThreshold !== null && top < marginThreshold) {
			const diff = top - marginThreshold;
			top -= diff;
			elemTransformOrigin.vertical += diff;
		} else if (marginThreshold !== null && bottom > heightThreshold) {
			const diff = bottom - heightThreshold;
			top -= diff;
			elemTransformOrigin.vertical += diff;
		}
		if (marginThreshold !== null && left < marginThreshold) {
			const diff = left - marginThreshold;
			left -= diff;
			elemTransformOrigin.horizontal += diff;
		} else if (right > widthThreshold) {
			const diff = right - widthThreshold;
			left -= diff;
			elemTransformOrigin.horizontal += diff;
		}
		return {
			top: `${Math.round(top)}px`,
			left: `${Math.round(left)}px`,
			transformOrigin: getTransformOriginValue(elemTransformOrigin)
		};
	}, [
		anchorEl,
		anchorReference,
		getAnchorOffset,
		getTransformOrigin,
		marginThreshold
	]);
	const [isPositioned, setIsPositioned] = import_react.useState(open);
	const setPositioningStyles = import_react.useCallback(() => {
		const element = paperRef.current;
		if (!element) return;
		const positioning = getPositioningStyle(element);
		if (positioning.top !== null) element.style.setProperty("top", positioning.top);
		if (positioning.left !== null) element.style.left = positioning.left;
		element.style.transformOrigin = positioning.transformOrigin;
		setIsPositioned(true);
	}, [getPositioningStyle]);
	import_react.useEffect(() => {
		if (disableScrollLock) window.addEventListener("scroll", setPositioningStyles);
		return () => window.removeEventListener("scroll", setPositioningStyles);
	}, [
		anchorEl,
		disableScrollLock,
		setPositioningStyles
	]);
	const handleEntering = () => {
		setPositioningStyles();
	};
	const handleExited = () => {
		setIsPositioned(false);
	};
	import_react.useEffect(() => {
		if (open) setPositioningStyles();
	});
	import_react.useImperativeHandle(action, () => open ? { updatePosition: () => {
		setPositioningStyles();
	} } : null, [open, setPositioningStyles]);
	import_react.useEffect(() => {
		if (!open) return;
		const handleResize = debounce_default(() => {
			setPositioningStyles();
		});
		const containerWindow = ownerWindow_default(resolveAnchorEl(anchorEl));
		containerWindow.addEventListener("resize", handleResize);
		return () => {
			handleResize.clear();
			containerWindow.removeEventListener("resize", handleResize);
		};
	}, [
		anchorEl,
		open,
		setPositioningStyles
	]);
	let transitionDuration = transitionDurationProp;
	const externalForwardedProps = {
		slots: {
			transition: TransitionComponent,
			...slots
		},
		slotProps: {
			transition: TransitionProps,
			paper: PaperPropsProp,
			...slotProps
		}
	};
	const [TransitionSlot, transitionSlotProps] = useSlot("transition", {
		elementType: Grow_default,
		externalForwardedProps,
		ownerState,
		getSlotProps: (handlers) => ({
			...handlers,
			onEntering: (element, isAppearing) => {
				handlers.onEntering?.(element, isAppearing);
				handleEntering();
			},
			onExited: (element) => {
				handlers.onExited?.(element);
				handleExited();
			}
		}),
		additionalProps: {
			appear: true,
			in: open
		}
	});
	if (transitionDurationProp === "auto" && !TransitionSlot.muiSupportAuto) transitionDuration = void 0;
	const container = containerProp || (anchorEl ? ownerDocument_default(resolveAnchorEl(anchorEl)).body : void 0);
	const [RootSlot, { slots: rootSlotsProp, slotProps: rootSlotPropsProp,...rootProps }] = useSlot("root", {
		ref,
		elementType: PopoverRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other
		},
		shouldForwardComponentProp: true,
		additionalProps: {
			slots: { backdrop: slots.backdrop },
			slotProps: { backdrop: mergeSlotProps(typeof slotProps.backdrop === "function" ? slotProps.backdrop(ownerState) : slotProps.backdrop, { invisible: true }) },
			container,
			open
		},
		ownerState,
		className: clsx_default(classes.root, className)
	});
	const [PaperSlot, paperProps] = useSlot("paper", {
		ref: paperRef,
		className: classes.paper,
		elementType: PopoverPaper,
		externalForwardedProps,
		shouldForwardComponentProp: true,
		additionalProps: {
			elevation,
			style: isPositioned ? void 0 : { opacity: 0 }
		},
		ownerState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootSlot, {
		...rootProps,
		...!isHostComponent_default(RootSlot) && {
			slots: rootSlotsProp,
			slotProps: rootSlotPropsProp,
			disableScrollLock
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionSlot, {
			...transitionSlotProps,
			timeout: transitionDuration,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaperSlot, {
				...paperProps,
				children
			})
		})
	});
});
function getMenuUtilityClass(slot) {
	return generateUtilityClass("MuiMenu", slot);
}
generateUtilityClasses("MuiMenu", [
	"root",
	"paper",
	"list"
]);
var RTL_ORIGIN = {
	vertical: "top",
	horizontal: "right"
};
var LTR_ORIGIN = {
	vertical: "top",
	horizontal: "left"
};
var useUtilityClasses$14 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({
		root: ["root"],
		paper: ["paper"],
		list: ["list"]
	}, getMenuUtilityClass, classes);
};
var MenuRoot = styled_default(Popover_default, {
	shouldForwardProp: (prop) => rootShouldForwardProp_default(prop) || prop === "classes",
	name: "MuiMenu",
	slot: "Root"
})({});
const MenuPaper = styled_default(PopoverPaper, {
	name: "MuiMenu",
	slot: "Paper"
})({
	maxHeight: "calc(100% - 96px)",
	WebkitOverflowScrolling: "touch"
});
var MenuMenuList = styled_default(MenuList_default, {
	name: "MuiMenu",
	slot: "List"
})({ outline: 0 });
var Menu_default$1 = /* @__PURE__ */ import_react.forwardRef(function Menu$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiMenu"
	});
	const { autoFocus = true, children, className, disableAutoFocusItem = false, MenuListProps = {}, onClose, open, PaperProps = {}, PopoverClasses, transitionDuration = "auto", TransitionProps: { onEntering,...TransitionProps } = {}, variant = "selectedMenu", slots = {}, slotProps = {},...other } = props;
	const isRtl = useRtl();
	const ownerState = {
		...props,
		autoFocus,
		disableAutoFocusItem,
		MenuListProps,
		onEntering,
		PaperProps,
		transitionDuration,
		TransitionProps,
		variant
	};
	const classes = useUtilityClasses$14(ownerState);
	const autoFocusItem = autoFocus && !disableAutoFocusItem && open;
	const menuListActionsRef = import_react.useRef(null);
	const handleEntering = (element, isAppearing) => {
		if (menuListActionsRef.current) menuListActionsRef.current.adjustStyleForScrollbar(element, { direction: isRtl ? "rtl" : "ltr" });
		if (onEntering) onEntering(element, isAppearing);
	};
	const handleListKeyDown = (event) => {
		if (event.key === "Tab") {
			event.preventDefault();
			if (onClose) onClose(event, "tabKeyDown");
		}
	};
	let activeItemIndex = -1;
	import_react.Children.map(children, (child, index) => {
		if (!/* @__PURE__ */ import_react.isValidElement(child)) return;
		if (!child.props.disabled) {
			if (variant === "selectedMenu" && child.props.selected) activeItemIndex = index;
			else if (activeItemIndex === -1) activeItemIndex = index;
		}
	});
	const externalForwardedProps = {
		slots,
		slotProps: {
			list: MenuListProps,
			transition: TransitionProps,
			paper: PaperProps,
			...slotProps
		}
	};
	const rootSlotProps = useSlotProps_default({
		elementType: slots.root,
		externalSlotProps: slotProps.root,
		ownerState,
		className: [classes.root, className]
	});
	const [PaperSlot, paperSlotProps] = useSlot("paper", {
		className: classes.paper,
		elementType: MenuPaper,
		externalForwardedProps,
		shouldForwardComponentProp: true,
		ownerState
	});
	const [ListSlot, listSlotProps] = useSlot("list", {
		className: clsx_default(classes.list, MenuListProps.className),
		elementType: MenuMenuList,
		shouldForwardComponentProp: true,
		externalForwardedProps,
		getSlotProps: (handlers) => ({
			...handlers,
			onKeyDown: (event) => {
				handleListKeyDown(event);
				handlers.onKeyDown?.(event);
			}
		}),
		ownerState
	});
	const resolvedTransitionProps = typeof externalForwardedProps.slotProps.transition === "function" ? externalForwardedProps.slotProps.transition(ownerState) : externalForwardedProps.slotProps.transition;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRoot, {
		onClose,
		anchorOrigin: {
			vertical: "bottom",
			horizontal: isRtl ? "right" : "left"
		},
		transformOrigin: isRtl ? RTL_ORIGIN : LTR_ORIGIN,
		slots: {
			root: slots.root,
			paper: PaperSlot,
			backdrop: slots.backdrop,
			...slots.transition && { transition: slots.transition }
		},
		slotProps: {
			root: rootSlotProps,
			paper: paperSlotProps,
			backdrop: typeof slotProps.backdrop === "function" ? slotProps.backdrop(ownerState) : slotProps.backdrop,
			transition: {
				...resolvedTransitionProps,
				onEntering: (...args) => {
					handleEntering(...args);
					resolvedTransitionProps?.onEntering?.(...args);
				}
			}
		},
		open,
		ref,
		transitionDuration,
		ownerState,
		...other,
		classes: PopoverClasses,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSlot, {
			actions: menuListActionsRef,
			autoFocus: autoFocus && (activeItemIndex === -1 || disableAutoFocusItem),
			autoFocusItem,
			variant,
			...listSlotProps,
			children
		})
	});
});
function getMenuItemUtilityClass(slot) {
	return generateUtilityClass("MuiMenuItem", slot);
}
var menuItemClasses_default = generateUtilityClasses("MuiMenuItem", [
	"root",
	"focusVisible",
	"dense",
	"disabled",
	"divider",
	"gutters",
	"selected"
]);
const overridesResolver = (props, styles$4) => {
	const { ownerState } = props;
	return [
		styles$4.root,
		ownerState.dense && styles$4.dense,
		ownerState.divider && styles$4.divider,
		!ownerState.disableGutters && styles$4.gutters
	];
};
var useUtilityClasses$13 = (ownerState) => {
	const { disabled, dense, divider, disableGutters, selected, classes } = ownerState;
	const composedClasses = composeClasses({ root: [
		"root",
		dense && "dense",
		disabled && "disabled",
		!disableGutters && "gutters",
		divider && "divider",
		selected && "selected"
	] }, getMenuItemUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var MenuItemRoot = styled_default(ButtonBase_default, {
	shouldForwardProp: (prop) => rootShouldForwardProp_default(prop) || prop === "classes",
	name: "MuiMenuItem",
	slot: "Root",
	overridesResolver
})(memoTheme_default(({ theme }) => ({
	...theme.typography.body1,
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	position: "relative",
	textDecoration: "none",
	minHeight: 48,
	paddingTop: 6,
	paddingBottom: 6,
	boxSizing: "border-box",
	whiteSpace: "nowrap",
	"&:hover": {
		textDecoration: "none",
		backgroundColor: (theme.vars || theme).palette.action.hover,
		"@media (hover: none)": { backgroundColor: "transparent" }
	},
	[`&.${menuItemClasses_default.selected}`]: {
		backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.selectedOpacity),
		[`&.${menuItemClasses_default.focusVisible}`]: { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`) }
	},
	[`&.${menuItemClasses_default.selected}:hover`]: {
		backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`),
		"@media (hover: none)": { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.selectedOpacity) }
	},
	[`&.${menuItemClasses_default.focusVisible}`]: { backgroundColor: (theme.vars || theme).palette.action.focus },
	[`&.${menuItemClasses_default.disabled}`]: { opacity: (theme.vars || theme).palette.action.disabledOpacity },
	[`& + .${dividerClasses_default.root}`]: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	[`& + .${dividerClasses_default.inset}`]: { marginLeft: 52 },
	[`& .${listItemTextClasses_default.root}`]: {
		marginTop: 0,
		marginBottom: 0
	},
	[`& .${listItemTextClasses_default.inset}`]: { paddingLeft: 36 },
	[`& .${listItemIconClasses_default.root}`]: { minWidth: 36 },
	variants: [
		{
			props: ({ ownerState }) => !ownerState.disableGutters,
			style: {
				paddingLeft: 16,
				paddingRight: 16
			}
		},
		{
			props: ({ ownerState }) => ownerState.divider,
			style: {
				borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
				backgroundClip: "padding-box"
			}
		},
		{
			props: ({ ownerState }) => !ownerState.dense,
			style: { [theme.breakpoints.up("sm")]: { minHeight: "auto" } }
		},
		{
			props: ({ ownerState }) => ownerState.dense,
			style: {
				minHeight: 32,
				paddingTop: 4,
				paddingBottom: 4,
				...theme.typography.body2,
				[`& .${listItemIconClasses_default.root} svg`]: { fontSize: "1.25rem" }
			}
		}
	]
})));
var MenuItem_default = /* @__PURE__ */ import_react.forwardRef(function MenuItem$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiMenuItem"
	});
	const { autoFocus = false, component = "li", dense = false, divider = false, disableGutters = false, focusVisibleClassName, role = "menuitem", tabIndex: tabIndexProp, className,...other } = props;
	const context = import_react.useContext(ListContext_default);
	const childContext = import_react.useMemo(() => ({
		dense: dense || context.dense || false,
		disableGutters
	}), [
		context.dense,
		dense,
		disableGutters
	]);
	const menuItemRef = import_react.useRef(null);
	useEnhancedEffect_default(() => {
		if (autoFocus) {
			if (menuItemRef.current) menuItemRef.current.focus();
		}
	}, [autoFocus]);
	const ownerState = {
		...props,
		dense: childContext.dense,
		divider,
		disableGutters
	};
	const classes = useUtilityClasses$13(props);
	const handleRef = useForkRef_default(menuItemRef, ref);
	let tabIndex;
	if (!props.disabled) tabIndex = tabIndexProp !== void 0 ? tabIndexProp : -1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListContext_default.Provider, {
		value: childContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItemRoot, {
			ref: handleRef,
			role,
			tabIndex,
			component,
			focusVisibleClassName: clsx_default(classes.focusVisible, focusVisibleClassName),
			className: clsx_default(classes.root, className),
			...other,
			ownerState,
			classes
		})
	});
});
function getNativeSelectUtilityClasses(slot) {
	return generateUtilityClass("MuiNativeSelect", slot);
}
var nativeSelectClasses_default = generateUtilityClasses("MuiNativeSelect", [
	"root",
	"select",
	"multiple",
	"filled",
	"outlined",
	"standard",
	"disabled",
	"icon",
	"iconOpen",
	"iconFilled",
	"iconOutlined",
	"iconStandard",
	"nativeInput",
	"error"
]);
var useUtilityClasses$12 = (ownerState) => {
	const { classes, variant, disabled, multiple, open, error } = ownerState;
	const slots = {
		select: [
			"select",
			variant,
			disabled && "disabled",
			multiple && "multiple",
			error && "error"
		],
		icon: [
			"icon",
			`icon${capitalize_default(variant)}`,
			open && "iconOpen",
			disabled && "disabled"
		]
	};
	return composeClasses(slots, getNativeSelectUtilityClasses, classes);
};
const StyledSelectSelect = styled_default("select", { name: "MuiNativeSelect" })(({ theme }) => ({
	MozAppearance: "none",
	WebkitAppearance: "none",
	userSelect: "none",
	borderRadius: 0,
	cursor: "pointer",
	"&:focus": { borderRadius: 0 },
	[`&.${nativeSelectClasses_default.disabled}`]: { cursor: "default" },
	"&[multiple]": { height: "auto" },
	"&:not([multiple]) option, &:not([multiple]) optgroup": { backgroundColor: (theme.vars || theme).palette.background.paper },
	variants: [
		{
			props: ({ ownerState }) => ownerState.variant !== "filled" && ownerState.variant !== "outlined",
			style: { "&&&": {
				paddingRight: 24,
				minWidth: 16
			} }
		},
		{
			props: { variant: "filled" },
			style: { "&&&": { paddingRight: 32 } }
		},
		{
			props: { variant: "outlined" },
			style: {
				borderRadius: (theme.vars || theme).shape.borderRadius,
				"&:focus": { borderRadius: (theme.vars || theme).shape.borderRadius },
				"&&&": { paddingRight: 32 }
			}
		}
	]
}));
var NativeSelectSelect = styled_default(StyledSelectSelect, {
	name: "MuiNativeSelect",
	slot: "Select",
	shouldForwardProp: rootShouldForwardProp_default,
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.select,
			styles$4[ownerState.variant],
			ownerState.error && styles$4.error,
			{ [`&.${nativeSelectClasses_default.multiple}`]: styles$4.multiple }
		];
	}
})({});
const StyledSelectIcon = styled_default("svg", { name: "MuiNativeSelect" })(({ theme }) => ({
	position: "absolute",
	right: 0,
	top: "calc(50% - .5em)",
	pointerEvents: "none",
	color: (theme.vars || theme).palette.action.active,
	[`&.${nativeSelectClasses_default.disabled}`]: { color: (theme.vars || theme).palette.action.disabled },
	variants: [
		{
			props: ({ ownerState }) => ownerState.open,
			style: { transform: "rotate(180deg)" }
		},
		{
			props: { variant: "filled" },
			style: { right: 7 }
		},
		{
			props: { variant: "outlined" },
			style: { right: 7 }
		}
	]
}));
var NativeSelectIcon = styled_default(StyledSelectIcon, {
	name: "MuiNativeSelect",
	slot: "Icon",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.icon,
			ownerState.variant && styles$4[`icon${capitalize_default(ownerState.variant)}`],
			ownerState.open && styles$4.iconOpen
		];
	}
})({});
var NativeSelectInput_default = /* @__PURE__ */ import_react.forwardRef(function NativeSelectInput$1(props, ref) {
	const { className, disabled, error, IconComponent, inputRef, variant = "standard",...other } = props;
	const ownerState = {
		...props,
		disabled,
		variant,
		error
	};
	const classes = useUtilityClasses$12(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectSelect, {
		ownerState,
		className: clsx_default(classes.select, className),
		disabled,
		ref: inputRef || ref,
		...other
	}), props.multiple ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectIcon, {
		as: IconComponent,
		ownerState,
		className: classes.icon
	})] });
});
var _span$1;
var NotchedOutlineRoot$1 = styled_default("fieldset", {
	name: "MuiNotchedOutlined",
	shouldForwardProp: rootShouldForwardProp_default
})({
	textAlign: "left",
	position: "absolute",
	bottom: 0,
	right: 0,
	top: -5,
	left: 0,
	margin: 0,
	padding: "0 8px",
	pointerEvents: "none",
	borderRadius: "inherit",
	borderStyle: "solid",
	borderWidth: 1,
	overflow: "hidden",
	minWidth: "0%"
});
var NotchedOutlineLegend = styled_default("legend", {
	name: "MuiNotchedOutlined",
	shouldForwardProp: rootShouldForwardProp_default
})(memoTheme_default(({ theme }) => ({
	float: "unset",
	width: "auto",
	overflow: "hidden",
	variants: [
		{
			props: ({ ownerState }) => !ownerState.withLabel,
			style: {
				padding: 0,
				lineHeight: "11px",
				transition: theme.transitions.create("width", {
					duration: 150,
					easing: theme.transitions.easing.easeOut
				})
			}
		},
		{
			props: ({ ownerState }) => ownerState.withLabel,
			style: {
				display: "block",
				padding: 0,
				height: 11,
				fontSize: "0.75em",
				visibility: "hidden",
				maxWidth: .01,
				transition: theme.transitions.create("max-width", {
					duration: 50,
					easing: theme.transitions.easing.easeOut
				}),
				whiteSpace: "nowrap",
				"& > span": {
					paddingLeft: 5,
					paddingRight: 5,
					display: "inline-block",
					opacity: 0,
					visibility: "visible"
				}
			}
		},
		{
			props: ({ ownerState }) => ownerState.withLabel && ownerState.notched,
			style: {
				maxWidth: "100%",
				transition: theme.transitions.create("max-width", {
					duration: 100,
					easing: theme.transitions.easing.easeOut,
					delay: 50
				})
			}
		}
	]
})));
function NotchedOutline(props) {
	const { children, classes, className, label, notched,...other } = props;
	const withLabel = label != null && label !== "";
	const ownerState = {
		...props,
		notched,
		withLabel
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotchedOutlineRoot$1, {
		"aria-hidden": true,
		className,
		ownerState,
		...other,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotchedOutlineLegend, {
			ownerState,
			children: withLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }) : _span$1 || (_span$1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "notranslate",
				"aria-hidden": true,
				children: "​"
			}))
		})
	});
}
var useUtilityClasses$11 = (ownerState) => {
	const { classes } = ownerState;
	const composedClasses = composeClasses({
		root: ["root"],
		notchedOutline: ["notchedOutline"],
		input: ["input"]
	}, getOutlinedInputUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var OutlinedInputRoot = styled_default(InputBaseRoot, {
	shouldForwardProp: (prop) => rootShouldForwardProp_default(prop) || prop === "classes",
	name: "MuiOutlinedInput",
	slot: "Root",
	overridesResolver: rootOverridesResolver
})(memoTheme_default(({ theme }) => {
	const borderColor$1 = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
	return {
		position: "relative",
		borderRadius: (theme.vars || theme).shape.borderRadius,
		[`&:hover .${outlinedInputClasses_default.notchedOutline}`]: { borderColor: (theme.vars || theme).palette.text.primary },
		"@media (hover: none)": { [`&:hover .${outlinedInputClasses_default.notchedOutline}`]: { borderColor: theme.vars ? theme.alpha(theme.vars.palette.common.onBackground, .23) : borderColor$1 } },
		[`&.${outlinedInputClasses_default.focused} .${outlinedInputClasses_default.notchedOutline}`]: { borderWidth: 2 },
		variants: [
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color$1]) => ({
				props: { color: color$1 },
				style: { [`&.${outlinedInputClasses_default.focused} .${outlinedInputClasses_default.notchedOutline}`]: { borderColor: (theme.vars || theme).palette[color$1].main } }
			})),
			{
				props: {},
				style: {
					[`&.${outlinedInputClasses_default.error} .${outlinedInputClasses_default.notchedOutline}`]: { borderColor: (theme.vars || theme).palette.error.main },
					[`&.${outlinedInputClasses_default.disabled} .${outlinedInputClasses_default.notchedOutline}`]: { borderColor: (theme.vars || theme).palette.action.disabled }
				}
			},
			{
				props: ({ ownerState }) => ownerState.startAdornment,
				style: { paddingLeft: 14 }
			},
			{
				props: ({ ownerState }) => ownerState.endAdornment,
				style: { paddingRight: 14 }
			},
			{
				props: ({ ownerState }) => ownerState.multiline,
				style: { padding: "16.5px 14px" }
			},
			{
				props: ({ ownerState, size }) => ownerState.multiline && size === "small",
				style: { padding: "8.5px 14px" }
			}
		]
	};
}));
var NotchedOutlineRoot = styled_default(NotchedOutline, {
	name: "MuiOutlinedInput",
	slot: "NotchedOutline"
})(memoTheme_default(({ theme }) => {
	const borderColor$1 = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
	return { borderColor: theme.vars ? theme.alpha(theme.vars.palette.common.onBackground, .23) : borderColor$1 };
}));
var OutlinedInputInput = styled_default(InputBaseInput, {
	name: "MuiOutlinedInput",
	slot: "Input",
	overridesResolver: inputOverridesResolver
})(memoTheme_default(({ theme }) => ({
	padding: "16.5px 14px",
	...!theme.vars && { "&:-webkit-autofill": {
		WebkitBoxShadow: theme.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
		WebkitTextFillColor: theme.palette.mode === "light" ? null : "#fff",
		caretColor: theme.palette.mode === "light" ? null : "#fff",
		borderRadius: "inherit"
	} },
	...theme.vars && {
		"&:-webkit-autofill": { borderRadius: "inherit" },
		[theme.getColorSchemeSelector("dark")]: { "&:-webkit-autofill": {
			WebkitBoxShadow: "0 0 0 100px #266798 inset",
			WebkitTextFillColor: "#fff",
			caretColor: "#fff"
		} }
	},
	variants: [
		{
			props: { size: "small" },
			style: { padding: "8.5px 14px" }
		},
		{
			props: ({ ownerState }) => ownerState.multiline,
			style: { padding: 0 }
		},
		{
			props: ({ ownerState }) => ownerState.startAdornment,
			style: { paddingLeft: 0 }
		},
		{
			props: ({ ownerState }) => ownerState.endAdornment,
			style: { paddingRight: 0 }
		}
	]
})));
var OutlinedInput = /* @__PURE__ */ import_react.forwardRef(function OutlinedInput$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiOutlinedInput"
	});
	const { components = {}, fullWidth = false, inputComponent = "input", label, multiline = false, notched, slots = {}, slotProps = {}, type = "text",...other } = props;
	const classes = useUtilityClasses$11(props);
	const muiFormControl = useFormControl();
	const fcs = formControlState({
		props,
		muiFormControl,
		states: [
			"color",
			"disabled",
			"error",
			"focused",
			"hiddenLabel",
			"size",
			"required"
		]
	});
	const ownerState = {
		...props,
		color: fcs.color || "primary",
		disabled: fcs.disabled,
		error: fcs.error,
		focused: fcs.focused,
		formControl: muiFormControl,
		fullWidth,
		hiddenLabel: fcs.hiddenLabel,
		multiline,
		size: fcs.size,
		type
	};
	const RootSlot = slots.root ?? components.Root ?? OutlinedInputRoot;
	const InputSlot = slots.input ?? components.Input ?? OutlinedInputInput;
	const [NotchedSlot, notchedProps] = useSlot("notchedOutline", {
		elementType: NotchedOutlineRoot,
		className: classes.notchedOutline,
		shouldForwardComponentProp: true,
		ownerState,
		externalForwardedProps: {
			slots,
			slotProps
		},
		additionalProps: { label: label != null && label !== "" && fcs.required ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
			label,
			" ",
			"*"
		] }) : label }
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputBase_default, {
		slots: {
			root: RootSlot,
			input: InputSlot
		},
		slotProps,
		renderSuffix: (state) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotchedSlot, {
			...notchedProps,
			notched: typeof notched !== "undefined" ? notched : Boolean(state.startAdornment || state.filled || state.focused)
		}),
		fullWidth,
		inputComponent,
		multiline,
		ref,
		type,
		...other,
		classes: {
			...classes,
			notchedOutline: null
		}
	});
});
OutlinedInput.muiName = "Input";
var OutlinedInput_default = OutlinedInput;
function getSelectUtilityClasses(slot) {
	return generateUtilityClass("MuiSelect", slot);
}
var selectClasses_default = generateUtilityClasses("MuiSelect", [
	"root",
	"select",
	"multiple",
	"filled",
	"outlined",
	"standard",
	"disabled",
	"focused",
	"icon",
	"iconOpen",
	"iconFilled",
	"iconOutlined",
	"iconStandard",
	"nativeInput",
	"error"
]);
var _span;
var SelectSelect = styled_default(StyledSelectSelect, {
	name: "MuiSelect",
	slot: "Select",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			{ [`&.${selectClasses_default.select}`]: styles$4.select },
			{ [`&.${selectClasses_default.select}`]: styles$4[ownerState.variant] },
			{ [`&.${selectClasses_default.error}`]: styles$4.error },
			{ [`&.${selectClasses_default.multiple}`]: styles$4.multiple }
		];
	}
})({ [`&.${selectClasses_default.select}`]: {
	height: "auto",
	minHeight: "1.4375em",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	overflow: "hidden"
} });
var SelectIcon = styled_default(StyledSelectIcon, {
	name: "MuiSelect",
	slot: "Icon",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.icon,
			ownerState.variant && styles$4[`icon${capitalize_default(ownerState.variant)}`],
			ownerState.open && styles$4.iconOpen
		];
	}
})({});
var SelectNativeInput = styled_default("input", {
	shouldForwardProp: (prop) => slotShouldForwardProp_default(prop) && prop !== "classes",
	name: "MuiSelect",
	slot: "NativeInput"
})({
	bottom: 0,
	left: 0,
	position: "absolute",
	opacity: 0,
	pointerEvents: "none",
	width: "100%",
	boxSizing: "border-box"
});
function areEqualValues(a, b$1) {
	if (typeof b$1 === "object" && b$1 !== null) return a === b$1;
	return String(a) === String(b$1);
}
function isEmpty(display) {
	return display == null || typeof display === "string" && !display.trim();
}
var useUtilityClasses$10 = (ownerState) => {
	const { classes, variant, disabled, multiple, open, error } = ownerState;
	const slots = {
		select: [
			"select",
			variant,
			disabled && "disabled",
			multiple && "multiple",
			error && "error"
		],
		icon: [
			"icon",
			`icon${capitalize_default(variant)}`,
			open && "iconOpen",
			disabled && "disabled"
		],
		nativeInput: ["nativeInput"]
	};
	return composeClasses(slots, getSelectUtilityClasses, classes);
};
var SelectInput_default = /* @__PURE__ */ import_react.forwardRef(function SelectInput$1(props, ref) {
	const { "aria-describedby": ariaDescribedby, "aria-label": ariaLabel, autoFocus, autoWidth, children, className, defaultOpen, defaultValue, disabled, displayEmpty, error = false, IconComponent, inputRef: inputRefProp, labelId, MenuProps = {}, multiple, name, onBlur, onChange, onClose, onFocus, onOpen, open: openProp, readOnly, renderValue, required, SelectDisplayProps = {}, tabIndex: tabIndexProp, type, value: valueProp, variant = "standard",...other } = props;
	const [value, setValueState] = useControlled_default({
		controlled: valueProp,
		default: defaultValue,
		name: "Select"
	});
	const [openState, setOpenState] = useControlled_default({
		controlled: openProp,
		default: defaultOpen,
		name: "Select"
	});
	const inputRef = import_react.useRef(null);
	const displayRef = import_react.useRef(null);
	const [displayNode, setDisplayNode] = import_react.useState(null);
	const { current: isOpenControlled } = import_react.useRef(openProp != null);
	const [menuMinWidthState, setMenuMinWidthState] = import_react.useState();
	const handleRef = useForkRef_default(ref, inputRefProp);
	const handleDisplayRef = import_react.useCallback((node$1) => {
		displayRef.current = node$1;
		if (node$1) setDisplayNode(node$1);
	}, []);
	const anchorElement = displayNode?.parentNode;
	import_react.useImperativeHandle(handleRef, () => ({
		focus: () => {
			displayRef.current.focus();
		},
		node: inputRef.current,
		value
	}), [value]);
	import_react.useEffect(() => {
		if (defaultOpen && openState && displayNode && !isOpenControlled) {
			setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
			displayRef.current.focus();
		}
	}, [displayNode, autoWidth]);
	import_react.useEffect(() => {
		if (autoFocus) displayRef.current.focus();
	}, [autoFocus]);
	import_react.useEffect(() => {
		if (!labelId) return;
		const label = ownerDocument_default(displayRef.current).getElementById(labelId);
		if (label) {
			const handler = () => {
				if (getSelection().isCollapsed) displayRef.current.focus();
			};
			label.addEventListener("click", handler);
			return () => {
				label.removeEventListener("click", handler);
			};
		}
	}, [labelId]);
	const update = (open$1, event) => {
		if (open$1) {
			if (onOpen) onOpen(event);
		} else if (onClose) onClose(event);
		if (!isOpenControlled) {
			setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
			setOpenState(open$1);
		}
	};
	const handleMouseDown = (event) => {
		if (event.button !== 0) return;
		event.preventDefault();
		displayRef.current.focus();
		update(true, event);
	};
	const handleClose = (event) => {
		update(false, event);
	};
	const childrenArray = import_react.Children.toArray(children);
	const handleChange = (event) => {
		const child = childrenArray.find((childItem) => childItem.props.value === event.target.value);
		if (child === void 0) return;
		setValueState(child.props.value);
		if (onChange) onChange(event, child);
	};
	const handleItemClick = (child) => (event) => {
		let newValue;
		if (!event.currentTarget.hasAttribute("tabindex")) return;
		if (multiple) {
			newValue = Array.isArray(value) ? value.slice() : [];
			const itemIndex = value.indexOf(child.props.value);
			if (itemIndex === -1) newValue.push(child.props.value);
			else newValue.splice(itemIndex, 1);
		} else newValue = child.props.value;
		if (child.props.onClick) child.props.onClick(event);
		if (value !== newValue) {
			setValueState(newValue);
			if (onChange) {
				const nativeEvent = event.nativeEvent || event;
				const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
				Object.defineProperty(clonedEvent, "target", {
					writable: true,
					value: {
						value: newValue,
						name
					}
				});
				onChange(clonedEvent, child);
			}
		}
		if (!multiple) update(false, event);
	};
	const handleKeyDown = (event) => {
		if (!readOnly) {
			if ([
				" ",
				"ArrowUp",
				"ArrowDown",
				"Enter"
			].includes(event.key)) {
				event.preventDefault();
				update(true, event);
			}
		}
	};
	const open = displayNode !== null && openState;
	const handleBlur = (event) => {
		if (!open && onBlur) {
			Object.defineProperty(event, "target", {
				writable: true,
				value: {
					value,
					name
				}
			});
			onBlur(event);
		}
	};
	delete other["aria-invalid"];
	let display;
	let displaySingle;
	const displayMultiple = [];
	let computeDisplay = false;
	if (isFilled({ value }) || displayEmpty) if (renderValue) display = renderValue(value);
	else computeDisplay = true;
	const items = childrenArray.map((child) => {
		if (!/* @__PURE__ */ import_react.isValidElement(child)) return null;
		let selected;
		if (multiple) {
			if (!Array.isArray(value)) throw new Error(formatMuiErrorMessage(2));
			selected = value.some((v$1) => areEqualValues(v$1, child.props.value));
			if (selected && computeDisplay) displayMultiple.push(child.props.children);
		} else {
			selected = areEqualValues(value, child.props.value);
			if (selected && computeDisplay) displaySingle = child.props.children;
		}
		if (selected);
		return /* @__PURE__ */ import_react.cloneElement(child, {
			"aria-selected": selected ? "true" : "false",
			onClick: handleItemClick(child),
			onKeyUp: (event) => {
				if (event.key === " ") event.preventDefault();
				if (child.props.onKeyUp) child.props.onKeyUp(event);
			},
			role: "option",
			selected,
			value: void 0,
			"data-value": child.props.value
		});
	});
	if (computeDisplay) if (multiple) if (displayMultiple.length === 0) display = null;
	else display = displayMultiple.reduce((output, child, index) => {
		output.push(child);
		if (index < displayMultiple.length - 1) output.push(", ");
		return output;
	}, []);
	else display = displaySingle;
	let menuMinWidth = menuMinWidthState;
	if (!autoWidth && isOpenControlled && displayNode) menuMinWidth = anchorElement.clientWidth;
	let tabIndex;
	if (typeof tabIndexProp !== "undefined") tabIndex = tabIndexProp;
	else tabIndex = disabled ? null : 0;
	const buttonId = SelectDisplayProps.id || (name ? `mui-component-select-${name}` : void 0);
	const ownerState = {
		...props,
		variant,
		value,
		open,
		error
	};
	const classes = useUtilityClasses$10(ownerState);
	const paperProps = {
		...MenuProps.PaperProps,
		...typeof MenuProps.slotProps?.paper === "function" ? MenuProps.slotProps.paper(ownerState) : MenuProps.slotProps?.paper
	};
	const listProps = {
		...MenuProps.MenuListProps,
		...typeof MenuProps.slotProps?.list === "function" ? MenuProps.slotProps.list(ownerState) : MenuProps.slotProps?.list
	};
	const listboxId = useId();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSelect, {
			as: "div",
			ref: handleDisplayRef,
			tabIndex,
			role: "combobox",
			"aria-controls": open ? listboxId : void 0,
			"aria-disabled": disabled ? "true" : void 0,
			"aria-expanded": open ? "true" : "false",
			"aria-haspopup": "listbox",
			"aria-label": ariaLabel,
			"aria-labelledby": [labelId, buttonId].filter(Boolean).join(" ") || void 0,
			"aria-describedby": ariaDescribedby,
			"aria-required": required ? "true" : void 0,
			"aria-invalid": error ? "true" : void 0,
			onKeyDown: handleKeyDown,
			onMouseDown: disabled || readOnly ? null : handleMouseDown,
			onBlur: handleBlur,
			onFocus,
			...SelectDisplayProps,
			ownerState,
			className: clsx_default(SelectDisplayProps.className, classes.select, className),
			id: buttonId,
			children: isEmpty(display) ? _span || (_span = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "notranslate",
				"aria-hidden": true,
				children: "​"
			})) : display
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectNativeInput, {
			"aria-invalid": error,
			value: Array.isArray(value) ? value.join(",") : value,
			name,
			ref: inputRef,
			"aria-hidden": true,
			onChange: handleChange,
			tabIndex: -1,
			disabled,
			className: classes.nativeInput,
			autoFocus,
			required,
			...other,
			ownerState
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
			as: IconComponent,
			className: classes.icon,
			ownerState
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu_default$1, {
			id: `menu-${name || ""}`,
			anchorEl: anchorElement,
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
			...MenuProps,
			slotProps: {
				...MenuProps.slotProps,
				list: {
					"aria-labelledby": labelId,
					role: "listbox",
					"aria-multiselectable": multiple ? "true" : void 0,
					disableListWrap: true,
					id: listboxId,
					...listProps
				},
				paper: {
					...paperProps,
					style: {
						minWidth: menuMinWidth,
						...paperProps != null ? paperProps.style : null
					}
				}
			},
			children: items
		})
	] });
});
var useUtilityClasses$9 = (ownerState) => {
	const { classes } = ownerState;
	const composedClasses = composeClasses({ root: ["root"] }, getSelectUtilityClasses, classes);
	return {
		...classes,
		...composedClasses
	};
};
var styledRootConfig = {
	name: "MuiSelect",
	slot: "Root",
	shouldForwardProp: (prop) => rootShouldForwardProp_default(prop) && prop !== "variant"
};
var StyledInput = styled_default(Input_default, styledRootConfig)("");
var StyledOutlinedInput = styled_default(OutlinedInput_default, styledRootConfig)("");
var StyledFilledInput = styled_default(FilledInput_default, styledRootConfig)("");
var Select = /* @__PURE__ */ import_react.forwardRef(function Select$1(inProps, ref) {
	const props = useDefaultProps({
		name: "MuiSelect",
		props: inProps
	});
	const { autoWidth = false, children, classes: classesProp = {}, className, defaultOpen = false, displayEmpty = false, IconComponent = ArrowDropDown_default, id, input, inputProps, label, labelId, MenuProps, multiple = false, native = false, onClose, onOpen, open, renderValue, SelectDisplayProps, variant: variantProp = "outlined",...other } = props;
	const inputComponent = native ? NativeSelectInput_default : SelectInput_default;
	const muiFormControl = useFormControl();
	const fcs = formControlState({
		props,
		muiFormControl,
		states: ["variant", "error"]
	});
	const variant = fcs.variant || variantProp;
	const ownerState = {
		...props,
		variant,
		classes: classesProp
	};
	const classes = useUtilityClasses$9(ownerState);
	const { root,...restOfClasses } = classes;
	const InputComponent = input || {
		standard: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyledInput, { ownerState }),
		outlined: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyledOutlinedInput, {
			label,
			ownerState
		}),
		filled: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyledFilledInput, { ownerState })
	}[variant];
	const inputComponentRef = useForkRef_default(ref, getReactElementRef(InputComponent));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: /* @__PURE__ */ import_react.cloneElement(InputComponent, {
		inputComponent,
		inputProps: {
			children,
			error: fcs.error,
			IconComponent,
			variant,
			type: void 0,
			multiple,
			...native ? { id } : {
				autoWidth,
				defaultOpen,
				displayEmpty,
				labelId,
				MenuProps,
				onClose,
				onOpen,
				open,
				renderValue,
				SelectDisplayProps: {
					id,
					...SelectDisplayProps
				}
			},
			...inputProps,
			classes: inputProps ? deepmerge(restOfClasses, inputProps.classes) : restOfClasses,
			...input ? input.props.inputProps : {}
		},
		...(multiple && native || displayEmpty) && variant === "outlined" ? { notched: true } : {},
		ref: inputComponentRef,
		className: clsx_default(InputComponent.props.className, className, classes.root),
		...!input && { variant },
		...other
	}) });
});
Select.muiName = "Select";
var Select_default = Select;
function useSnackbar(parameters = {}) {
	const { autoHideDuration = null, disableWindowBlurListener = false, onClose, open, resumeHideDuration } = parameters;
	const timerAutoHide = useTimeout();
	import_react.useEffect(() => {
		if (!open) return;
		function handleKeyDown(nativeEvent) {
			if (!nativeEvent.defaultPrevented) {
				if (nativeEvent.key === "Escape") onClose?.(nativeEvent, "escapeKeyDown");
			}
		}
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [open, onClose]);
	const handleClose = useEventCallback_default((event, reason) => {
		onClose?.(event, reason);
	});
	const setAutoHideTimer = useEventCallback_default((autoHideDurationParam) => {
		if (!onClose || autoHideDurationParam == null) return;
		timerAutoHide.start(autoHideDurationParam, () => {
			handleClose(null, "timeout");
		});
	});
	import_react.useEffect(() => {
		if (open) setAutoHideTimer(autoHideDuration);
		return timerAutoHide.clear;
	}, [
		open,
		autoHideDuration,
		setAutoHideTimer,
		timerAutoHide
	]);
	const handleClickAway = (event) => {
		onClose?.(event, "clickaway");
	};
	const handlePause = timerAutoHide.clear;
	const handleResume = import_react.useCallback(() => {
		if (autoHideDuration != null) setAutoHideTimer(resumeHideDuration != null ? resumeHideDuration : autoHideDuration * .5);
	}, [
		autoHideDuration,
		resumeHideDuration,
		setAutoHideTimer
	]);
	const createHandleBlur = (otherHandlers) => (event) => {
		const onBlurCallback = otherHandlers.onBlur;
		onBlurCallback?.(event);
		handleResume();
	};
	const createHandleFocus = (otherHandlers) => (event) => {
		const onFocusCallback = otherHandlers.onFocus;
		onFocusCallback?.(event);
		handlePause();
	};
	const createMouseEnter = (otherHandlers) => (event) => {
		const onMouseEnterCallback = otherHandlers.onMouseEnter;
		onMouseEnterCallback?.(event);
		handlePause();
	};
	const createMouseLeave = (otherHandlers) => (event) => {
		const onMouseLeaveCallback = otherHandlers.onMouseLeave;
		onMouseLeaveCallback?.(event);
		handleResume();
	};
	import_react.useEffect(() => {
		if (!disableWindowBlurListener && open) {
			window.addEventListener("focus", handleResume);
			window.addEventListener("blur", handlePause);
			return () => {
				window.removeEventListener("focus", handleResume);
				window.removeEventListener("blur", handlePause);
			};
		}
	}, [
		disableWindowBlurListener,
		open,
		handleResume,
		handlePause
	]);
	const getRootProps = (externalProps = {}) => {
		const externalEventHandlers = {
			...extractEventHandlers_default(parameters),
			...extractEventHandlers_default(externalProps)
		};
		return {
			role: "presentation",
			...externalProps,
			...externalEventHandlers,
			onBlur: createHandleBlur(externalEventHandlers),
			onFocus: createHandleFocus(externalEventHandlers),
			onMouseEnter: createMouseEnter(externalEventHandlers),
			onMouseLeave: createMouseLeave(externalEventHandlers)
		};
	};
	return {
		getRootProps,
		onClickAway: handleClickAway
	};
}
var useSnackbar_default = useSnackbar;
function getSnackbarContentUtilityClass(slot) {
	return generateUtilityClass("MuiSnackbarContent", slot);
}
generateUtilityClasses("MuiSnackbarContent", [
	"root",
	"message",
	"action"
]);
var useUtilityClasses$8 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({
		root: ["root"],
		action: ["action"],
		message: ["message"]
	}, getSnackbarContentUtilityClass, classes);
};
var SnackbarContentRoot = styled_default(Paper_default, {
	name: "MuiSnackbarContent",
	slot: "Root"
})(memoTheme_default(({ theme }) => {
	const emphasis = theme.palette.mode === "light" ? .8 : .98;
	return {
		...theme.typography.body2,
		color: theme.vars ? theme.vars.palette.SnackbarContent.color : theme.palette.getContrastText(emphasize(theme.palette.background.default, emphasis)),
		backgroundColor: theme.vars ? theme.vars.palette.SnackbarContent.bg : emphasize(theme.palette.background.default, emphasis),
		display: "flex",
		alignItems: "center",
		flexWrap: "wrap",
		padding: "6px 16px",
		flexGrow: 1,
		[theme.breakpoints.up("sm")]: {
			flexGrow: "initial",
			minWidth: 288
		}
	};
}));
var SnackbarContentMessage = styled_default("div", {
	name: "MuiSnackbarContent",
	slot: "Message"
})({ padding: "8px 0" });
var SnackbarContentAction = styled_default("div", {
	name: "MuiSnackbarContent",
	slot: "Action"
})({
	display: "flex",
	alignItems: "center",
	marginLeft: "auto",
	paddingLeft: 16,
	marginRight: -8
});
var SnackbarContent_default = /* @__PURE__ */ import_react.forwardRef(function SnackbarContent$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiSnackbarContent"
	});
	const { action, className, message, role = "alert",...other } = props;
	const ownerState = props;
	const classes = useUtilityClasses$8(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SnackbarContentRoot, {
		role,
		elevation: 6,
		className: clsx_default(classes.root, className),
		ownerState,
		ref,
		...other,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SnackbarContentMessage, {
			className: classes.message,
			ownerState,
			children: message
		}), action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SnackbarContentAction, {
			className: classes.action,
			ownerState,
			children: action
		}) : null]
	});
});
function getSnackbarUtilityClass(slot) {
	return generateUtilityClass("MuiSnackbar", slot);
}
generateUtilityClasses("MuiSnackbar", [
	"root",
	"anchorOriginTopCenter",
	"anchorOriginBottomCenter",
	"anchorOriginTopRight",
	"anchorOriginBottomRight",
	"anchorOriginTopLeft",
	"anchorOriginBottomLeft"
]);
var useUtilityClasses$7 = (ownerState) => {
	const { classes, anchorOrigin } = ownerState;
	const slots = { root: ["root", `anchorOrigin${capitalize_default(anchorOrigin.vertical)}${capitalize_default(anchorOrigin.horizontal)}`] };
	return composeClasses(slots, getSnackbarUtilityClass, classes);
};
var SnackbarRoot = styled_default("div", {
	name: "MuiSnackbar",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [styles$4.root, styles$4[`anchorOrigin${capitalize_default(ownerState.anchorOrigin.vertical)}${capitalize_default(ownerState.anchorOrigin.horizontal)}`]];
	}
})(memoTheme_default(({ theme }) => ({
	zIndex: (theme.vars || theme).zIndex.snackbar,
	position: "fixed",
	display: "flex",
	left: 8,
	right: 8,
	justifyContent: "center",
	alignItems: "center",
	variants: [
		{
			props: ({ ownerState }) => ownerState.anchorOrigin.vertical === "top",
			style: {
				top: 8,
				[theme.breakpoints.up("sm")]: { top: 24 }
			}
		},
		{
			props: ({ ownerState }) => ownerState.anchorOrigin.vertical !== "top",
			style: {
				bottom: 8,
				[theme.breakpoints.up("sm")]: { bottom: 24 }
			}
		},
		{
			props: ({ ownerState }) => ownerState.anchorOrigin.horizontal === "left",
			style: {
				justifyContent: "flex-start",
				[theme.breakpoints.up("sm")]: {
					left: 24,
					right: "auto"
				}
			}
		},
		{
			props: ({ ownerState }) => ownerState.anchorOrigin.horizontal === "right",
			style: {
				justifyContent: "flex-end",
				[theme.breakpoints.up("sm")]: {
					right: 24,
					left: "auto"
				}
			}
		},
		{
			props: ({ ownerState }) => ownerState.anchorOrigin.horizontal === "center",
			style: { [theme.breakpoints.up("sm")]: {
				left: "50%",
				right: "auto",
				transform: "translateX(-50%)"
			} }
		}
	]
})));
var Snackbar_default = /* @__PURE__ */ import_react.forwardRef(function Snackbar$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiSnackbar"
	});
	const theme = useTheme();
	const defaultTransitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	};
	const { action, anchorOrigin: { vertical, horizontal } = {
		vertical: "bottom",
		horizontal: "left"
	}, autoHideDuration = null, children, className, ClickAwayListenerProps: ClickAwayListenerPropsProp, ContentProps: ContentPropsProp, disableWindowBlurListener = false, message, onBlur, onClose, onFocus, onMouseEnter, onMouseLeave, open, resumeHideDuration, slots = {}, slotProps = {}, TransitionComponent: TransitionComponentProp, transitionDuration = defaultTransitionDuration, TransitionProps: { onEnter, onExited,...TransitionPropsProp } = {},...other } = props;
	const ownerState = {
		...props,
		anchorOrigin: {
			vertical,
			horizontal
		},
		autoHideDuration,
		disableWindowBlurListener,
		TransitionComponent: TransitionComponentProp,
		transitionDuration
	};
	const classes = useUtilityClasses$7(ownerState);
	const { getRootProps, onClickAway } = useSnackbar_default({ ...ownerState });
	const [exited, setExited] = import_react.useState(true);
	const handleExited = (node$1) => {
		setExited(true);
		if (onExited) onExited(node$1);
	};
	const handleEnter = (node$1, isAppearing) => {
		setExited(false);
		if (onEnter) onEnter(node$1, isAppearing);
	};
	const externalForwardedProps = {
		slots: {
			transition: TransitionComponentProp,
			...slots
		},
		slotProps: {
			content: ContentPropsProp,
			clickAwayListener: ClickAwayListenerPropsProp,
			transition: TransitionPropsProp,
			...slotProps
		}
	};
	const [Root, rootProps] = useSlot("root", {
		ref,
		className: [classes.root, className],
		elementType: SnackbarRoot,
		getSlotProps: getRootProps,
		externalForwardedProps: {
			...externalForwardedProps,
			...other
		},
		ownerState
	});
	const [ClickAwaySlot, { ownerState: clickAwayOwnerStateProp,...clickAwayListenerProps }] = useSlot("clickAwayListener", {
		elementType: ClickAwayListener,
		externalForwardedProps,
		getSlotProps: (handlers) => ({ onClickAway: (...params) => {
			const event = params[0];
			handlers.onClickAway?.(...params);
			if (event?.defaultMuiPrevented) return;
			onClickAway(...params);
		} }),
		ownerState
	});
	const [ContentSlot, contentSlotProps] = useSlot("content", {
		elementType: SnackbarContent_default,
		shouldForwardComponentProp: true,
		externalForwardedProps,
		additionalProps: {
			message,
			action
		},
		ownerState
	});
	const [TransitionSlot, transitionProps] = useSlot("transition", {
		elementType: Grow_default,
		externalForwardedProps,
		getSlotProps: (handlers) => ({
			onEnter: (...params) => {
				handlers.onEnter?.(...params);
				handleEnter(...params);
			},
			onExited: (...params) => {
				handlers.onExited?.(...params);
				handleExited(...params);
			}
		}),
		additionalProps: {
			appear: true,
			in: open,
			timeout: transitionDuration,
			direction: vertical === "top" ? "down" : "up"
		},
		ownerState
	});
	if (!open && exited) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClickAwaySlot, {
		...clickAwayListenerProps,
		...slots.clickAwayListener && { ownerState: clickAwayOwnerStateProp },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
			...rootProps,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionSlot, {
				...transitionProps,
				children: children || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentSlot, { ...contentSlotProps })
			})
		})
	});
});
var Stack_default = createStack({
	createStyledComponent: styled_default("div", {
		name: "MuiStack",
		slot: "Root"
	}),
	useThemeProps: (inProps) => useDefaultProps({
		props: inProps,
		name: "MuiStack"
	})
});
function getSwitchUtilityClass(slot) {
	return generateUtilityClass("MuiSwitch", slot);
}
var switchClasses_default = generateUtilityClasses("MuiSwitch", [
	"root",
	"edgeStart",
	"edgeEnd",
	"switchBase",
	"colorPrimary",
	"colorSecondary",
	"sizeSmall",
	"sizeMedium",
	"checked",
	"disabled",
	"input",
	"thumb",
	"track"
]);
var useUtilityClasses$6 = (ownerState) => {
	const { classes, edge, size, color: color$1, checked, disabled } = ownerState;
	const slots = {
		root: [
			"root",
			edge && `edge${capitalize_default(edge)}`,
			`size${capitalize_default(size)}`
		],
		switchBase: [
			"switchBase",
			`color${capitalize_default(color$1)}`,
			checked && "checked",
			disabled && "disabled"
		],
		thumb: ["thumb"],
		track: ["track"],
		input: ["input"]
	};
	const composedClasses = composeClasses(slots, getSwitchUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var SwitchRoot = styled_default("span", {
	name: "MuiSwitch",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.root,
			ownerState.edge && styles$4[`edge${capitalize_default(ownerState.edge)}`],
			styles$4[`size${capitalize_default(ownerState.size)}`]
		];
	}
})({
	display: "inline-flex",
	width: 58,
	height: 38,
	overflow: "hidden",
	padding: 12,
	boxSizing: "border-box",
	position: "relative",
	flexShrink: 0,
	zIndex: 0,
	verticalAlign: "middle",
	"@media print": { colorAdjust: "exact" },
	variants: [
		{
			props: { edge: "start" },
			style: { marginLeft: -8 }
		},
		{
			props: { edge: "end" },
			style: { marginRight: -8 }
		},
		{
			props: { size: "small" },
			style: {
				width: 40,
				height: 24,
				padding: 7,
				[`& .${switchClasses_default.thumb}`]: {
					width: 16,
					height: 16
				},
				[`& .${switchClasses_default.switchBase}`]: {
					padding: 4,
					[`&.${switchClasses_default.checked}`]: { transform: "translateX(16px)" }
				}
			}
		}
	]
});
var SwitchSwitchBase = styled_default(SwitchBase_default, {
	name: "MuiSwitch",
	slot: "SwitchBase",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.switchBase,
			{ [`& .${switchClasses_default.input}`]: styles$4.input },
			ownerState.color !== "default" && styles$4[`color${capitalize_default(ownerState.color)}`]
		];
	}
})(memoTheme_default(({ theme }) => ({
	position: "absolute",
	top: 0,
	left: 0,
	zIndex: 1,
	color: theme.vars ? theme.vars.palette.Switch.defaultColor : `${theme.palette.mode === "light" ? theme.palette.common.white : theme.palette.grey[300]}`,
	transition: theme.transitions.create(["left", "transform"], { duration: theme.transitions.duration.shortest }),
	[`&.${switchClasses_default.checked}`]: { transform: "translateX(20px)" },
	[`&.${switchClasses_default.disabled}`]: { color: theme.vars ? theme.vars.palette.Switch.defaultDisabledColor : `${theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600]}` },
	[`&.${switchClasses_default.checked} + .${switchClasses_default.track}`]: { opacity: .5 },
	[`&.${switchClasses_default.disabled} + .${switchClasses_default.track}`]: { opacity: theme.vars ? theme.vars.opacity.switchTrackDisabled : `${theme.palette.mode === "light" ? .12 : .2}` },
	[`& .${switchClasses_default.input}`]: {
		left: "-100%",
		width: "300%"
	}
})), memoTheme_default(({ theme }) => ({
	"&:hover": {
		backgroundColor: theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity),
		"@media (hover: none)": { backgroundColor: "transparent" }
	},
	variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["light"])).map(([color$1]) => ({
		props: { color: color$1 },
		style: {
			[`&.${switchClasses_default.checked}`]: {
				color: (theme.vars || theme).palette[color$1].main,
				"&:hover": {
					backgroundColor: theme.alpha((theme.vars || theme).palette[color$1].main, (theme.vars || theme).palette.action.hoverOpacity),
					"@media (hover: none)": { backgroundColor: "transparent" }
				},
				[`&.${switchClasses_default.disabled}`]: { color: theme.vars ? theme.vars.palette.Switch[`${color$1}DisabledColor`] : `${theme.palette.mode === "light" ? theme.lighten(theme.palette[color$1].main, .62) : theme.darken(theme.palette[color$1].main, .55)}` }
			},
			[`&.${switchClasses_default.checked} + .${switchClasses_default.track}`]: { backgroundColor: (theme.vars || theme).palette[color$1].main }
		}
	}))]
})));
var SwitchTrack = styled_default("span", {
	name: "MuiSwitch",
	slot: "Track"
})(memoTheme_default(({ theme }) => ({
	height: "100%",
	width: "100%",
	borderRadius: 14 / 2,
	zIndex: -1,
	transition: theme.transitions.create(["opacity", "background-color"], { duration: theme.transitions.duration.shortest }),
	backgroundColor: theme.vars ? theme.vars.palette.common.onBackground : `${theme.palette.mode === "light" ? theme.palette.common.black : theme.palette.common.white}`,
	opacity: theme.vars ? theme.vars.opacity.switchTrack : `${theme.palette.mode === "light" ? .38 : .3}`
})));
var SwitchThumb = styled_default("span", {
	name: "MuiSwitch",
	slot: "Thumb"
})(memoTheme_default(({ theme }) => ({
	boxShadow: (theme.vars || theme).shadows[1],
	backgroundColor: "currentColor",
	width: 20,
	height: 20,
	borderRadius: "50%"
})));
var Switch_default = /* @__PURE__ */ import_react.forwardRef(function Switch$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiSwitch"
	});
	const { className, color: color$1 = "primary", edge = false, size = "medium", sx, slots = {}, slotProps = {},...other } = props;
	const ownerState = {
		...props,
		color: color$1,
		edge,
		size
	};
	const classes = useUtilityClasses$6(ownerState);
	const externalForwardedProps = {
		slots,
		slotProps
	};
	const [RootSlot, rootSlotProps] = useSlot("root", {
		className: clsx_default(classes.root, className),
		elementType: SwitchRoot,
		externalForwardedProps,
		ownerState,
		additionalProps: { sx }
	});
	const [ThumbSlot, thumbSlotProps] = useSlot("thumb", {
		className: classes.thumb,
		elementType: SwitchThumb,
		externalForwardedProps,
		ownerState
	});
	const icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbSlot, { ...thumbSlotProps });
	const [TrackSlot, trackSlotProps] = useSlot("track", {
		className: classes.track,
		elementType: SwitchTrack,
		externalForwardedProps,
		ownerState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
		...rootSlotProps,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchSwitchBase, {
			type: "checkbox",
			icon,
			checkedIcon: icon,
			ref,
			ownerState,
			...other,
			classes: {
				...classes,
				root: classes.switchBase
			},
			slots: {
				...slots.switchBase && { root: slots.switchBase },
				...slots.input && { input: slots.input }
			},
			slotProps: {
				...slotProps.switchBase && { root: typeof slotProps.switchBase === "function" ? slotProps.switchBase(ownerState) : slotProps.switchBase },
				input: { role: "switch" },
				...slotProps.input && { input: typeof slotProps.input === "function" ? slotProps.input(ownerState) : slotProps.input }
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackSlot, { ...trackSlotProps })]
	});
});
var TableContext_default = /* @__PURE__ */ import_react.createContext();
function getTableUtilityClass(slot) {
	return generateUtilityClass("MuiTable", slot);
}
generateUtilityClasses("MuiTable", ["root", "stickyHeader"]);
var useUtilityClasses$5 = (ownerState) => {
	const { classes, stickyHeader } = ownerState;
	return composeClasses({ root: ["root", stickyHeader && "stickyHeader"] }, getTableUtilityClass, classes);
};
var TableRoot = styled_default("table", {
	name: "MuiTable",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [styles$4.root, ownerState.stickyHeader && styles$4.stickyHeader];
	}
})(memoTheme_default(({ theme }) => ({
	display: "table",
	width: "100%",
	borderCollapse: "collapse",
	borderSpacing: 0,
	"& caption": {
		...theme.typography.body2,
		padding: theme.spacing(2),
		color: (theme.vars || theme).palette.text.secondary,
		textAlign: "left",
		captionSide: "bottom"
	},
	variants: [{
		props: ({ ownerState }) => ownerState.stickyHeader,
		style: { borderCollapse: "separate" }
	}]
})));
var defaultComponent$3 = "table";
var Table_default = /* @__PURE__ */ import_react.forwardRef(function Table$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTable"
	});
	const { className, component = defaultComponent$3, padding: padding$1 = "normal", size = "medium", stickyHeader = false,...other } = props;
	const ownerState = {
		...props,
		component,
		padding: padding$1,
		size,
		stickyHeader
	};
	const classes = useUtilityClasses$5(ownerState);
	const table = import_react.useMemo(() => ({
		padding: padding$1,
		size,
		stickyHeader
	}), [
		padding$1,
		size,
		stickyHeader
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableContext_default.Provider, {
		value: table,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRoot, {
			as: component,
			role: component === defaultComponent$3 ? null : "table",
			ref,
			className: clsx_default(classes.root, className),
			ownerState,
			...other
		})
	});
});
var Tablelvl2Context_default = /* @__PURE__ */ import_react.createContext();
function getTableBodyUtilityClass(slot) {
	return generateUtilityClass("MuiTableBody", slot);
}
generateUtilityClasses("MuiTableBody", ["root"]);
var useUtilityClasses$4 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({ root: ["root"] }, getTableBodyUtilityClass, classes);
};
var TableBodyRoot = styled_default("tbody", {
	name: "MuiTableBody",
	slot: "Root"
})({ display: "table-row-group" });
var tablelvl2$1 = { variant: "body" };
var defaultComponent$2 = "tbody";
var TableBody_default = /* @__PURE__ */ import_react.forwardRef(function TableBody$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTableBody"
	});
	const { className, component = defaultComponent$2,...other } = props;
	const ownerState = {
		...props,
		component
	};
	const classes = useUtilityClasses$4(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tablelvl2Context_default.Provider, {
		value: tablelvl2$1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBodyRoot, {
			className: clsx_default(classes.root, className),
			as: component,
			ref,
			role: component === defaultComponent$2 ? null : "rowgroup",
			ownerState,
			...other
		})
	});
});
function getTableCellUtilityClass(slot) {
	return generateUtilityClass("MuiTableCell", slot);
}
var tableCellClasses_default = generateUtilityClasses("MuiTableCell", [
	"root",
	"head",
	"body",
	"footer",
	"sizeSmall",
	"sizeMedium",
	"paddingCheckbox",
	"paddingNone",
	"alignLeft",
	"alignCenter",
	"alignRight",
	"alignJustify",
	"stickyHeader"
]);
var useUtilityClasses$3 = (ownerState) => {
	const { classes, variant, align, padding: padding$1, size, stickyHeader } = ownerState;
	const slots = { root: [
		"root",
		variant,
		stickyHeader && "stickyHeader",
		align !== "inherit" && `align${capitalize_default(align)}`,
		padding$1 !== "normal" && `padding${capitalize_default(padding$1)}`,
		`size${capitalize_default(size)}`
	] };
	return composeClasses(slots, getTableCellUtilityClass, classes);
};
var TableCellRoot = styled_default("td", {
	name: "MuiTableCell",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.root,
			styles$4[ownerState.variant],
			styles$4[`size${capitalize_default(ownerState.size)}`],
			ownerState.padding !== "normal" && styles$4[`padding${capitalize_default(ownerState.padding)}`],
			ownerState.align !== "inherit" && styles$4[`align${capitalize_default(ownerState.align)}`],
			ownerState.stickyHeader && styles$4.stickyHeader
		];
	}
})(memoTheme_default(({ theme }) => ({
	...theme.typography.body2,
	display: "table-cell",
	verticalAlign: "inherit",
	borderBottom: theme.vars ? `1px solid ${theme.vars.palette.TableCell.border}` : `1px solid
    ${theme.palette.mode === "light" ? theme.lighten(theme.alpha(theme.palette.divider, 1), .88) : theme.darken(theme.alpha(theme.palette.divider, 1), .68)}`,
	textAlign: "left",
	padding: 16,
	variants: [
		{
			props: { variant: "head" },
			style: {
				color: (theme.vars || theme).palette.text.primary,
				lineHeight: theme.typography.pxToRem(24),
				fontWeight: theme.typography.fontWeightMedium
			}
		},
		{
			props: { variant: "body" },
			style: { color: (theme.vars || theme).palette.text.primary }
		},
		{
			props: { variant: "footer" },
			style: {
				color: (theme.vars || theme).palette.text.secondary,
				lineHeight: theme.typography.pxToRem(21),
				fontSize: theme.typography.pxToRem(12)
			}
		},
		{
			props: { size: "small" },
			style: {
				padding: "6px 16px",
				[`&.${tableCellClasses_default.paddingCheckbox}`]: {
					width: 24,
					padding: "0 12px 0 16px",
					"& > *": { padding: 0 }
				}
			}
		},
		{
			props: { padding: "checkbox" },
			style: {
				width: 48,
				padding: "0 0 0 4px"
			}
		},
		{
			props: { padding: "none" },
			style: { padding: 0 }
		},
		{
			props: { align: "left" },
			style: { textAlign: "left" }
		},
		{
			props: { align: "center" },
			style: { textAlign: "center" }
		},
		{
			props: { align: "right" },
			style: {
				textAlign: "right",
				flexDirection: "row-reverse"
			}
		},
		{
			props: { align: "justify" },
			style: { textAlign: "justify" }
		},
		{
			props: ({ ownerState }) => ownerState.stickyHeader,
			style: {
				position: "sticky",
				top: 0,
				zIndex: 2,
				backgroundColor: (theme.vars || theme).palette.background.default
			}
		}
	]
})));
var TableCell_default = /* @__PURE__ */ import_react.forwardRef(function TableCell$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTableCell"
	});
	const { align = "inherit", className, component: componentProp, padding: paddingProp, scope: scopeProp, size: sizeProp, sortDirection, variant: variantProp,...other } = props;
	const table = import_react.useContext(TableContext_default);
	const tablelvl2$2 = import_react.useContext(Tablelvl2Context_default);
	const isHeadCell = tablelvl2$2 && tablelvl2$2.variant === "head";
	let component;
	if (componentProp) component = componentProp;
	else component = isHeadCell ? "th" : "td";
	let scope = scopeProp;
	if (component === "td") scope = void 0;
	else if (!scope && isHeadCell) scope = "col";
	const variant = variantProp || tablelvl2$2 && tablelvl2$2.variant;
	const ownerState = {
		...props,
		align,
		component,
		padding: paddingProp || (table && table.padding ? table.padding : "normal"),
		size: sizeProp || (table && table.size ? table.size : "medium"),
		sortDirection,
		stickyHeader: variant === "head" && table && table.stickyHeader,
		variant
	};
	const classes = useUtilityClasses$3(ownerState);
	let ariaSort = null;
	if (sortDirection) ariaSort = sortDirection === "asc" ? "ascending" : "descending";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCellRoot, {
		as: component,
		ref,
		className: clsx_default(classes.root, className),
		"aria-sort": ariaSort,
		scope,
		ownerState,
		...other
	});
});
function getTableContainerUtilityClass(slot) {
	return generateUtilityClass("MuiTableContainer", slot);
}
generateUtilityClasses("MuiTableContainer", ["root"]);
var useUtilityClasses$2 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({ root: ["root"] }, getTableContainerUtilityClass, classes);
};
var TableContainerRoot = styled_default("div", {
	name: "MuiTableContainer",
	slot: "Root"
})({
	width: "100%",
	overflowX: "auto"
});
var TableContainer_default = /* @__PURE__ */ import_react.forwardRef(function TableContainer$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTableContainer"
	});
	const { className, component = "div",...other } = props;
	const ownerState = {
		...props,
		component
	};
	const classes = useUtilityClasses$2(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableContainerRoot, {
		ref,
		as: component,
		className: clsx_default(classes.root, className),
		ownerState,
		...other
	});
});
function getTableHeadUtilityClass(slot) {
	return generateUtilityClass("MuiTableHead", slot);
}
generateUtilityClasses("MuiTableHead", ["root"]);
var useUtilityClasses$1 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({ root: ["root"] }, getTableHeadUtilityClass, classes);
};
var TableHeadRoot = styled_default("thead", {
	name: "MuiTableHead",
	slot: "Root"
})({ display: "table-header-group" });
var tablelvl2 = { variant: "head" };
var defaultComponent$1 = "thead";
var TableHead_default = /* @__PURE__ */ import_react.forwardRef(function TableHead$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTableHead"
	});
	const { className, component = defaultComponent$1,...other } = props;
	const ownerState = {
		...props,
		component
	};
	const classes = useUtilityClasses$1(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tablelvl2Context_default.Provider, {
		value: tablelvl2,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeadRoot, {
			as: component,
			className: clsx_default(classes.root, className),
			ref,
			role: component === defaultComponent$1 ? null : "rowgroup",
			ownerState,
			...other
		})
	});
});
function getTableRowUtilityClass(slot) {
	return generateUtilityClass("MuiTableRow", slot);
}
var tableRowClasses_default = generateUtilityClasses("MuiTableRow", [
	"root",
	"selected",
	"hover",
	"head",
	"footer"
]);
var useUtilityClasses = (ownerState) => {
	const { classes, selected, hover, head, footer } = ownerState;
	return composeClasses({ root: [
		"root",
		selected && "selected",
		hover && "hover",
		head && "head",
		footer && "footer"
	] }, getTableRowUtilityClass, classes);
};
var TableRowRoot = styled_default("tr", {
	name: "MuiTableRow",
	slot: "Root",
	overridesResolver: (props, styles$4) => {
		const { ownerState } = props;
		return [
			styles$4.root,
			ownerState.head && styles$4.head,
			ownerState.footer && styles$4.footer
		];
	}
})(memoTheme_default(({ theme }) => ({
	color: "inherit",
	display: "table-row",
	verticalAlign: "middle",
	outline: 0,
	[`&.${tableRowClasses_default.hover}:hover`]: { backgroundColor: (theme.vars || theme).palette.action.hover },
	[`&.${tableRowClasses_default.selected}`]: {
		backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.selectedOpacity),
		"&:hover": { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`) }
	}
})));
var defaultComponent = "tr";
var TableRow_default = /* @__PURE__ */ import_react.forwardRef(function TableRow$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTableRow"
	});
	const { className, component = defaultComponent, hover = false, selected = false,...other } = props;
	const tablelvl2$2 = import_react.useContext(Tablelvl2Context_default);
	const ownerState = {
		...props,
		component,
		hover,
		selected,
		head: tablelvl2$2 && tablelvl2$2.variant === "head",
		footer: tablelvl2$2 && tablelvl2$2.variant === "footer"
	};
	const classes = useUtilityClasses(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRowRoot, {
		as: component,
		ref,
		className: clsx_default(classes.root, className),
		role: component === defaultComponent ? null : "row",
		ownerState,
		...other
	});
});
var useMediaQuery_default = unstable_createUseMediaQuery({ themeId: identifier_default });
var Close_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }), "Close");
var ContentCopy_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z" }), "ContentCopy");
var Download_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z" }), "Download");
var ExpandMore_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" }), "ExpandMore");
var GitHub_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27" }), "GitHub");
var Language_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2m6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56M12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96M4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56m2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8M12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96M14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2m.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56M16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2z" }), "Language");
var LinkedIn_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" }), "LinkedIn");
var Menu_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z" }), "Menu");
var OpenInNew_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z" }), "OpenInNew");
var Twitter_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" }), "Twitter");
export { CssBaseline_default as A, ThemeProvider as B, Menu_default$1 as C, FormControlLabel_default as D, InputLabel_default as E, Typography_default as F, require_react as G, createTheme as H, Alert_default as I, IconButton_default as L, Button_default as M, Box_default as N, FormControl_default as O, Fade_default as P, CircularProgress_default as R, MenuItem_default as S, Link_default as T, require_jsx_runtime as U, useTheme as V, require_react_dom as W, Table_default as _, Language_default as a, Snackbar_default as b, Download_default as c, useMediaQuery_default as d, TableRow_default as f, TableBody_default as g, TableCell_default as h, LinkedIn_default as i, Container_default as j, Drawer_default as k, ContentCopy_default as l, TableContainer_default as m, OpenInNew_default as n, GitHub_default as o, TableHead_default as p, Menu_default as r, ExpandMore_default as s, Twitter_default as t, Close_default as u, Switch_default as v, List_default as w, Select_default as x, Stack_default as y, Paper_default as z };
