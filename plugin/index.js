/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content_scripts/adjustmentFloatWindiwPos.ts":
/*!*********************************************************!*\
  !*** ./src/content_scripts/adjustmentFloatWindiwPos.ts ***!
  \*********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((ele, DOMRect) => {
    const { y } = ele.getBoundingClientRect();
    const { height, y: baseY } = DOMRect;
    // 顶部被挡住了
    if (y < 0) {
        $(ele).css({ top: height + baseY });
    }
});


/***/ }),

/***/ "./src/content_scripts/createFloatWindow.ts":
/*!**************************************************!*\
  !*** ./src/content_scripts/createFloatWindow.ts ***!
  \**************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _adjustmentFloatWindiwPos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adjustmentFloatWindiwPos */ "./src/content_scripts/adjustmentFloatWindiwPos.ts");
;
/** 创建浮窗 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((DOMRect, id, onRemember, onClear) => {
    const { x, y } = DOMRect;
    let div = document.getElementById(id);
    if (!div) {
        div = document.createElement("div");
        document.body.append(div);
    }
    div.id = id;
    div.style.cssText = `
	width: 100px;
	height:	40px;
	display: none;
	justify-content: center;
	align-items: center;
	position: absolute;
	z-index: 999999;
	left: ${x}px;
	top: ${y - 40}px;
	background: blue;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 4px blue;
`;
    const remember = $(`<span style="margin-right: 10px;padding-right: 10px;border-right: 1px solid #ddd;cursor: pointer">记住</span>`).on("click", () => onRemember(id));
    const clear = $(`<span style="cursor: pointer">清除</span>`).on("click", () => onClear(id));
    $(div).html("");
    $(div).append(remember, clear);
    (0,_adjustmentFloatWindiwPos__WEBPACK_IMPORTED_MODULE_0__.default)(div, DOMRect);
    return div;
});


/***/ }),

/***/ "./src/content_scripts/createTrigger.ts":
/*!**********************************************!*\
  !*** ./src/content_scripts/createTrigger.ts ***!
  \**********************************************/
/*! namespace exports */
/*! export createTrigger [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTrigger": () => /* binding */ createTrigger
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/content_scripts/utils.ts");
;
/** 创建触发器 */
const createTrigger = () => {
    const display = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getCache)("autoFill") || "block";
    let div = null;
    const existsTarget = document.getElementById("autoFillTrigger");
    if (existsTarget) {
        div = existsTarget;
    }
    else {
        div = document.createElement("div");
        div.id = "autoFillTrigger";
        div.innerText = "AutoFill";
        div.style.cssText = `
    position: fixed;
    z-index: 99999999;
    right: 50px;
    bottom: 50px;
    text-align: center;
    line-height: 80px;
    width: 80px;
    height: 80px;
    display: ${display};
    border-radius: 50%;
    background-color: gray;
    color: #fff;
    cursor: pointer;
    box-shadow: rgb(101 82 255) 0 0 10px;
    user-select: none;
    `;
    }
    document.body.append(div);
    return div;
};


/***/ }),

/***/ "./src/content_scripts/hotKey.ts":
/*!***************************************!*\
  !*** ./src/content_scripts/hotKey.ts ***!
  \***************************************/
/*! namespace exports */
/*! export keydown [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "keydown": () => /* binding */ keydown
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/content_scripts/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/content_scripts/utils.ts");
;

const toggleTrigger = (trigger) => {
    const status = $(trigger).css("display");
    const display = status === "block" ? "none" : "block";
    $(trigger).css({ display });
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.setCache)("autoFill", display);
    if (display === "none" && ___WEBPACK_IMPORTED_MODULE_0__.enable) {
        trigger.click();
    }
};
// [ctrl/command] + shift + f
const keydown = (e, trigger) => {
    const { metaKey, ctrlKey, key, shiftKey } = e;
    if (metaKey || ctrlKey) {
        if (metaKey && shiftKey && key.toLocaleLowerCase() === "f") {
            e.preventDefault();
            toggleTrigger(trigger);
        }
    }
};


/***/ }),

/***/ "./src/content_scripts/index.ts":
/*!**************************************!*\
  !*** ./src/content_scripts/index.ts ***!
  \**************************************/
/*! namespace exports */
/*! export enable [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enable": () => /* binding */ enable
/* harmony export */ });
/* harmony import */ var _createFloatWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createFloatWindow */ "./src/content_scripts/createFloatWindow.ts");
/* harmony import */ var _createTrigger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createTrigger */ "./src/content_scripts/createTrigger.ts");
/* harmony import */ var _hotKey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hotKey */ "./src/content_scripts/hotKey.ts");
/* harmony import */ var _restoreDataFromStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./restoreDataFromStorage */ "./src/content_scripts/restoreDataFromStorage.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/content_scripts/utils.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "uuid");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_5__);
;





let enable = false;
let trigger;
let currFocusId = "";
let supportUrls = [];
const v1 = (uuid__WEBPACK_IMPORTED_MODULE_5___default().v1);
/** 点击记住 */
const onRemember = (id) => {
    const target = document.querySelector(`[data-autofill="${id}"]`);
    if (target) {
        const key = target.dataset.autofillPath;
        // @ts-ignore
        (0,_utils__WEBPACK_IMPORTED_MODULE_4__.setCache)(key, target.value);
        $(`#${id}`).css("display", "none");
    }
};
/** 点击清除 */
const onClear = (id) => {
    const target = document.querySelector(`[data-autofill="${id}"]`);
    if (target) {
        const key = target.dataset.autofillPath;
        if (key) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_4__.clearCache)(key);
        }
        $(`#${id}`).css("display", "none");
    }
};
// 点击触发器
const onClick = (e) => {
    if (currFocusId !== "" && enable) {
        const target = document.getElementById(currFocusId);
        if (target) {
            target.style.display = "none";
            currFocusId = "";
        }
    }
    // @ts-ignore
    e.target.style.backgroundColor = (enable = !enable) ? "blue" : "gray";
};
/** 准备创建浮窗 */
const readyCreate = () => {
    const allForm = [...document.querySelectorAll("input,textarea,select,radio")]
        .filter((ele) => ele.type !== "submit")
        .map((ele) => {
        if (!ele.dataset.autofill) {
            ele.dataset.autofill = v1();
        }
        return ele;
    });
    allForm.forEach((ele) => {
        const id = ele.dataset.autofill;
        const DOMRect = ele.getBoundingClientRect();
        ele.addEventListener("focus", () => {
            currFocusId = id;
            enable && $(`#${id}`).css("display", "flex");
        });
        (0,_createFloatWindow__WEBPACK_IMPORTED_MODULE_0__.default)(DOMRect, id, onRemember, onClear);
    });
};
const onKeydown = (e) => {
    (0,_hotKey__WEBPACK_IMPORTED_MODULE_2__.keydown)(e, trigger);
};
const start = () => {
    const paths = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.injectPathForFormElement)(document.body.children);
    (0,_restoreDataFromStorage__WEBPACK_IMPORTED_MODULE_3__.default)(paths);
    readyCreate();
    if (enable) {
        trigger && trigger.click();
    }
    trigger = (0,_createTrigger__WEBPACK_IMPORTED_MODULE_1__.createTrigger)();
    trigger.removeEventListener("click", onClick);
    trigger.addEventListener("click", onClick);
    window.removeEventListener("keydown", onKeydown);
    window.addEventListener("keydown", onKeydown);
};
const support = (url) => {
    const isExists = url.some((item) => item.startsWith(location.origin));
    if (isExists)
        start();
};
chrome.storage.sync.get("autofill", ({ autofill }) => {
    if (autofill) {
        const urls = autofill
            .split(/[\r\n]/)
            .filter(Boolean)
            .filter((item) => !item.startsWith("#"))
            .map((item) => item.trim());
        supportUrls = urls;
        support(urls);
    }
});
chrome.runtime.onMessage.addListener((data) => {
    const { type } = data;
    if (type === "pageUpdate") {
        support(supportUrls);
    }
});



/***/ }),

/***/ "./src/content_scripts/restoreDataFromStorage.ts":
/*!*******************************************************!*\
  !*** ./src/content_scripts/restoreDataFromStorage.ts ***!
  \*******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/content_scripts/utils.ts");
;
/** 恢复数据 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((paths) => {
    const eventTarget = new Event("input", { bubbles: true });
    paths.forEach((path) => {
        const target = document.querySelector(`[data-autofill-path="${path}"]`);
        if (target) {
            let cache = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getCache)(path);
            if (cache) {
                // @ts-ignore
                target.value = cache;
                target.dispatchEvent(eventTarget);
            }
        }
    });
});


/***/ }),

/***/ "./src/content_scripts/utils.ts":
/*!**************************************!*\
  !*** ./src/content_scripts/utils.ts ***!
  \**************************************/
/*! namespace exports */
/*! export clearCache [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getCache [provided] [no usage info] [missing usage info prevents renaming] */
/*! export injectPathForFormElement [provided] [no usage info] [missing usage info prevents renaming] */
/*! export injectPathForNextElement [provided] [no usage info] [missing usage info prevents renaming] */
/*! export rightFormElement [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setCache [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setCache": () => /* binding */ setCache,
/* harmony export */   "getCache": () => /* binding */ getCache,
/* harmony export */   "clearCache": () => /* binding */ clearCache,
/* harmony export */   "rightFormElement": () => /* binding */ rightFormElement,
/* harmony export */   "injectPathForNextElement": () => /* binding */ injectPathForNextElement,
/* harmony export */   "injectPathForFormElement": () => /* binding */ injectPathForFormElement
/* harmony export */ });
const setCache = (key, value) => {
    return localStorage.setItem(key, value);
};
const getCache = (key) => {
    return localStorage.getItem(key);
};
const clearCache = (key) => {
    return localStorage.removeItem(key);
};
const rightFormElement = (ele) => {
    if (ele.tagName === "A" || ele.tagName === "P")
        return false;
    return "input,textarea,select,radio".indexOf(ele.tagName.toLocaleLowerCase()) !== -1;
};
/** 给下一个兄弟元素注入索引 */
const injectPathForNextElement = (ele, path, paths) => {
    if (!ele)
        return;
    if (rightFormElement(ele)) {
        let lastPath = Number(path.slice(-1)) + 1;
        let finalPath = path.slice(0, -1) + lastPath;
        paths.push(finalPath);
        ele.dataset.autofillPath = finalPath;
    }
    injectPathForNextElement(ele.nextElementSibling, path, paths);
};
/** 给所有表单元素注入 dom 层级索引 */
const injectPathForFormElement = (children, path = "", paths = []) => {
    Array.from(children).forEach((item, i) => {
        const { children: itemChild } = item;
        let finalPath = path === "" ? i + "" : path + "-" + i;
        if (itemChild && itemChild.length) {
            injectPathForFormElement(itemChild, finalPath, paths);
        }
        if (!item.dataset.autofillPath) {
            if (rightFormElement(item)) {
                paths.push(finalPath);
                item.dataset.autofillPath = finalPath;
            }
        }
        injectPathForNextElement(item.nextElementSibling, finalPath, paths);
    });
    return paths;
};


/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = uuid;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/content_scripts/index.ts");
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL2FkanVzdG1lbnRGbG9hdFdpbmRpd1Bvcy50cyIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL2NyZWF0ZUZsb2F0V2luZG93LnRzIiwid2VicGFjazovL2F1dG8tZmlsbC8uL3NyYy9jb250ZW50X3NjcmlwdHMvY3JlYXRlVHJpZ2dlci50cyIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL2hvdEtleS50cyIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL2luZGV4LnRzIiwid2VicGFjazovL2F1dG8tZmlsbC8uL3NyYy9jb250ZW50X3NjcmlwdHMvcmVzdG9yZURhdGFGcm9tU3RvcmFnZS50cyIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL3V0aWxzLnRzIiwid2VicGFjazovL2F1dG8tZmlsbC9leHRlcm5hbCBcInV1aWRcIiIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXV0by1maWxsL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2F1dG8tZmlsbC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYXV0by1maWxsL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYXV0by1maWxsL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYXV0by1maWxsL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBZTtBQUNmLFdBQVcsSUFBSTtBQUNmLFdBQVcsbUJB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxlQUFlLHNCQUFzQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzNDQSxzQjs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxnQ0FBZ0MsWUFBWTtXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAoZWxlLCBET01SZWN0KSA9PiB7XG4gICAgY29uc3QgeyB5IH0gPSBlbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeyBoZWlnaHQsIHk6IGJhc2VZIH0gPSBET01SZWN0O1xuICAgIC8vIOmhtumDqOiiq+aMoeS9j+S6hlxuICAgIGlmICh5IDwgMCkge1xuICAgICAgICAkKGVsZSkuY3NzKHsgdG9wOiBoZWlnaHQgKyBiYXNlWSB9KTtcbiAgICB9XG59O1xuIiwiaW1wb3J0IGFkanVzdG1lbnRGbG9hdFdpbmRpd1BvcyBmcm9tIFwiLi9hZGp1c3RtZW50RmxvYXRXaW5kaXdQb3NcIjtcbi8qKiDliJvlu7rmta7nqpcgKi9cbmV4cG9ydCBkZWZhdWx0IChET01SZWN0LCBpZCwgb25SZW1lbWJlciwgb25DbGVhcikgPT4ge1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gRE9NUmVjdDtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmICghZGl2KSB7XG4gICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKGRpdik7XG4gICAgfVxuICAgIGRpdi5pZCA9IGlkO1xuICAgIGRpdi5zdHlsZS5jc3NUZXh0ID0gYFxuXHR3aWR0aDogMTAwcHg7XG5cdGhlaWdodDpcdDQwcHg7XG5cdGRpc3BsYXk6IG5vbmU7XG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHotaW5kZXg6IDk5OTk5OTtcblx0bGVmdDogJHt4fXB4O1xuXHR0b3A6ICR7eSAtIDQwfXB4O1xuXHRiYWNrZ3JvdW5kOiBibHVlO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBib3gtc2hhZG93OiAwIDAgNHB4IGJsdWU7XG5gO1xuICAgIGNvbnN0IHJlbWVtYmVyID0gJChgPHNwYW4gc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDEwcHg7cGFkZGluZy1yaWdodDogMTBweDtib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZGRkO2N1cnNvcjogcG9pbnRlclwiPuiusOS9jzwvc3Bhbj5gKS5vbihcImNsaWNrXCIsICgpID0+IG9uUmVtZW1iZXIoaWQpKTtcbiAgICBjb25zdCBjbGVhciA9ICQoYDxzcGFuIHN0eWxlPVwiY3Vyc29yOiBwb2ludGVyXCI+5riF6ZmkPC9zcGFuPmApLm9uKFwiY2xpY2tcIiwgKCkgPT4gb25DbGVhcihpZCkpO1xuICAgICQoZGl2KS5odG1sKFwiXCIpO1xuICAgICQoZGl2KS5hcHBlbmQocmVtZW1iZXIsIGNsZWFyKTtcbiAgICBhZGp1c3RtZW50RmxvYXRXaW5kaXdQb3MoZGl2LCBET01SZWN0KTtcbiAgICByZXR1cm4gZGl2O1xufTtcbiIsImltcG9ydCB7IGdldENhY2hlIH0gZnJvbSBcIi4vdXRpbHNcIjtcbi8qKiDliJvlu7rop6blj5HlmaggKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmlnZ2VyID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXkgPSBnZXRDYWNoZShcImF1dG9GaWxsXCIpIHx8IFwiYmxvY2tcIjtcbiAgICBsZXQgZGl2ID0gbnVsbDtcbiAgICBjb25zdCBleGlzdHNUYXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImF1dG9GaWxsVHJpZ2dlclwiKTtcbiAgICBpZiAoZXhpc3RzVGFyZ2V0KSB7XG4gICAgICAgIGRpdiA9IGV4aXN0c1RhcmdldDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGRpdi5pZCA9IFwiYXV0b0ZpbGxUcmlnZ2VyXCI7XG4gICAgICAgIGRpdi5pbm5lclRleHQgPSBcIkF1dG9GaWxsXCI7XG4gICAgICAgIGRpdi5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB6LWluZGV4OiA5OTk5OTk5OTtcbiAgICByaWdodDogNTBweDtcbiAgICBib3R0b206IDUwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGxpbmUtaGVpZ2h0OiA4MHB4O1xuICAgIHdpZHRoOiA4MHB4O1xuICAgIGhlaWdodDogODBweDtcbiAgICBkaXNwbGF5OiAke2Rpc3BsYXl9O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBib3gtc2hhZG93OiByZ2IoMTAxIDgyIDI1NSkgMCAwIDEwcHg7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgYDtcbiAgICB9XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoZGl2KTtcbiAgICByZXR1cm4gZGl2O1xufTtcbiIsImltcG9ydCB7IGVuYWJsZSB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBzZXRDYWNoZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5jb25zdCB0b2dnbGVUcmlnZ2VyID0gKHRyaWdnZXIpID0+IHtcbiAgICBjb25zdCBzdGF0dXMgPSAkKHRyaWdnZXIpLmNzcyhcImRpc3BsYXlcIik7XG4gICAgY29uc3QgZGlzcGxheSA9IHN0YXR1cyA9PT0gXCJibG9ja1wiID8gXCJub25lXCIgOiBcImJsb2NrXCI7XG4gICAgJCh0cmlnZ2VyKS5jc3MoeyBkaXNwbGF5IH0pO1xuICAgIHNldENhY2hlKFwiYXV0b0ZpbGxcIiwgZGlzcGxheSk7XG4gICAgaWYgKGRpc3BsYXkgPT09IFwibm9uZVwiICYmIGVuYWJsZSkge1xuICAgICAgICB0cmlnZ2VyLmNsaWNrKCk7XG4gICAgfVxufTtcbi8vIFtjdHJsL2NvbW1hbmRdICsgc2hpZnQgKyBmXG5leHBvcnQgY29uc3Qga2V5ZG93biA9IChlLCB0cmlnZ2VyKSA9PiB7XG4gICAgY29uc3QgeyBtZXRhS2V5LCBjdHJsS2V5LCBrZXksIHNoaWZ0S2V5IH0gPSBlO1xuICAgIGlmIChtZXRhS2V5IHx8IGN0cmxLZXkpIHtcbiAgICAgICAgaWYgKG1ldGFLZXkgJiYgc2hpZnRLZXkgJiYga2V5LnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09IFwiZlwiKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0b2dnbGVUcmlnZ2VyKHRyaWdnZXIpO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsImltcG9ydCBjcmVhdGVGbG9hdFdpbmRvdyBmcm9tIFwiLi9jcmVhdGVGbG9hdFdpbmRvd1wiO1xuaW1wb3J0IHsgY3JlYXRlVHJpZ2dlciB9IGZyb20gXCIuL2NyZWF0ZVRyaWdnZXJcIjtcbmltcG9ydCB7IGtleWRvd24gfSBmcm9tIFwiLi9ob3RLZXlcIjtcbmltcG9ydCByZXN0b3JlRGF0YUZyb21TdG9yYWdlIGZyb20gXCIuL3Jlc3RvcmVEYXRhRnJvbVN0b3JhZ2VcIjtcbmltcG9ydCB7IGNsZWFyQ2FjaGUsIGluamVjdFBhdGhGb3JGb3JtRWxlbWVudCwgc2V0Q2FjaGUgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHV1aWQgZnJvbSBcInV1aWRcIjtcbmxldCBlbmFibGUgPSBmYWxzZTtcbmxldCB0cmlnZ2VyO1xubGV0IGN1cnJGb2N1c0lkID0gXCJcIjtcbmxldCBzdXBwb3J0VXJscyA9IFtdO1xuY29uc3QgdjEgPSB1dWlkLnYxO1xuLyoqIOeCueWHu+iusOS9jyAqL1xuY29uc3Qgb25SZW1lbWJlciA9IChpZCkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWF1dG9maWxsPVwiJHtpZH1cIl1gKTtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHRhcmdldC5kYXRhc2V0LmF1dG9maWxsUGF0aDtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBzZXRDYWNoZShrZXksIHRhcmdldC52YWx1ZSk7XG4gICAgICAgICQoYCMke2lkfWApLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgIH1cbn07XG4vKiog54K55Ye75riF6ZmkICovXG5jb25zdCBvbkNsZWFyID0gKGlkKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtYXV0b2ZpbGw9XCIke2lkfVwiXWApO1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdGFyZ2V0LmRhdGFzZXQuYXV0b2ZpbGxQYXRoO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICBjbGVhckNhY2hlKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgJChgIyR7aWR9YCkuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgfVxufTtcbi8vIOeCueWHu+inpuWPkeWZqFxuY29uc3Qgb25DbGljayA9IChlKSA9PiB7XG4gICAgaWYgKGN1cnJGb2N1c0lkICE9PSBcIlwiICYmIGVuYWJsZSkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyRm9jdXNJZCk7XG4gICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBjdXJyRm9jdXNJZCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IChlbmFibGUgPSAhZW5hYmxlKSA/IFwiYmx1ZVwiIDogXCJncmF5XCI7XG59O1xuLyoqIOWHhuWkh+WIm+W7uua1rueqlyAqL1xuY29uc3QgcmVhZHlDcmVhdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgYWxsRm9ybSA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKEZPUk1FTEVNRU5UKV1cbiAgICAgICAgLmZpbHRlcigoZWxlKSA9PiBlbGUudHlwZSAhPT0gXCJzdWJtaXRcIilcbiAgICAgICAgLm1hcCgoZWxlKSA9PiB7XG4gICAgICAgIGlmICghZWxlLmRhdGFzZXQuYXV0b2ZpbGwpIHtcbiAgICAgICAgICAgIGVsZS5kYXRhc2V0LmF1dG9maWxsID0gdjEoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlO1xuICAgIH0pO1xuICAgIGFsbEZvcm0uZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkID0gZWxlLmRhdGFzZXQuYXV0b2ZpbGw7XG4gICAgICAgIGNvbnN0IERPTVJlY3QgPSBlbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGVsZS5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY3VyckZvY3VzSWQgPSBpZDtcbiAgICAgICAgICAgIGVuYWJsZSAmJiAkKGAjJHtpZH1gKS5jc3MoXCJkaXNwbGF5XCIsIFwiZmxleFwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNyZWF0ZUZsb2F0V2luZG93KERPTVJlY3QsIGlkLCBvblJlbWVtYmVyLCBvbkNsZWFyKTtcbiAgICB9KTtcbn07XG5jb25zdCBvbktleWRvd24gPSAoZSkgPT4ge1xuICAgIGtleWRvd24oZSwgdHJpZ2dlcik7XG59O1xuY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgY29uc3QgcGF0aHMgPSBpbmplY3RQYXRoRm9yRm9ybUVsZW1lbnQoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gICAgcmVzdG9yZURhdGFGcm9tU3RvcmFnZShwYXRocyk7XG4gICAgcmVhZHlDcmVhdGUoKTtcbiAgICBpZiAoZW5hYmxlKSB7XG4gICAgICAgIHRyaWdnZXIgJiYgdHJpZ2dlci5jbGljaygpO1xuICAgIH1cbiAgICB0cmlnZ2VyID0gY3JlYXRlVHJpZ2dlcigpO1xuICAgIHRyaWdnZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uQ2xpY2spO1xuICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uQ2xpY2spO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleWRvd24pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleWRvd24pO1xufTtcbmNvbnN0IHN1cHBvcnQgPSAodXJsKSA9PiB7XG4gICAgY29uc3QgaXNFeGlzdHMgPSB1cmwuc29tZSgoaXRlbSkgPT4gaXRlbS5zdGFydHNXaXRoKGxvY2F0aW9uLm9yaWdpbikpO1xuICAgIGlmIChpc0V4aXN0cylcbiAgICAgICAgc3RhcnQoKTtcbn07XG5jaHJvbWUuc3RvcmFnZS5zeW5jLmdldChcImF1dG9maWxsXCIsICh7IGF1dG9maWxsIH0pID0+IHtcbiAgICBpZiAoYXV0b2ZpbGwpIHtcbiAgICAgICAgY29uc3QgdXJscyA9IGF1dG9maWxsXG4gICAgICAgICAgICAuc3BsaXQoL1tcXHJcXG5dLylcbiAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+ICFpdGVtLnN0YXJ0c1dpdGgoXCIjXCIpKVxuICAgICAgICAgICAgLm1hcCgoaXRlbSkgPT4gaXRlbS50cmltKCkpO1xuICAgICAgICBzdXBwb3J0VXJscyA9IHVybHM7XG4gICAgICAgIHN1cHBvcnQodXJscyk7XG4gICAgfVxufSk7XG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKGRhdGEpID0+IHtcbiAgICBjb25zdCB7IHR5cGUgfSA9IGRhdGE7XG4gICAgaWYgKHR5cGUgPT09IFwicGFnZVVwZGF0ZVwiKSB7XG4gICAgICAgIHN1cHBvcnQoc3VwcG9ydFVybHMpO1xuICAgIH1cbn0pO1xuZXhwb3J0IHsgZW5hYmxlIH07XG4iLCJpbXBvcnQgeyBnZXRDYWNoZSB9IGZyb20gXCIuL3V0aWxzXCI7XG4vKiog5oGi5aSN5pWw5o2uICovXG5leHBvcnQgZGVmYXVsdCAocGF0aHMpID0+IHtcbiAgICBjb25zdCBldmVudFRhcmdldCA9IG5ldyBFdmVudChcImlucHV0XCIsIHsgYnViYmxlczogdHJ1ZSB9KTtcbiAgICBwYXRocy5mb3JFYWNoKChwYXRoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWF1dG9maWxsLXBhdGg9XCIke3BhdGh9XCJdYCk7XG4gICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgIGxldCBjYWNoZSA9IGdldENhY2hlKHBhdGgpO1xuICAgICAgICAgICAgaWYgKGNhY2hlKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHRhcmdldC52YWx1ZSA9IGNhY2hlO1xuICAgICAgICAgICAgICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KGV2ZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufTtcbiIsImV4cG9ydCBjb25zdCBzZXRDYWNoZSA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xufTtcbmV4cG9ydCBjb25zdCBnZXRDYWNoZSA9IChrZXkpID0+IHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbn07XG5leHBvcnQgY29uc3QgY2xlYXJDYWNoZSA9IChrZXkpID0+IHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbn07XG5leHBvcnQgY29uc3QgcmlnaHRGb3JtRWxlbWVudCA9IChlbGUpID0+IHtcbiAgICBpZiAoZWxlLnRhZ05hbWUgPT09IFwiQVwiIHx8IGVsZS50YWdOYW1lID09PSBcIlBcIilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBGT1JNRUxFTUVOVC5pbmRleE9mKGVsZS50YWdOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkpICE9PSAtMTtcbn07XG4vKiog57uZ5LiL5LiA5Liq5YWE5byf5YWD57Sg5rOo5YWl57Si5byVICovXG5leHBvcnQgY29uc3QgaW5qZWN0UGF0aEZvck5leHRFbGVtZW50ID0gKGVsZSwgcGF0aCwgcGF0aHMpID0+IHtcbiAgICBpZiAoIWVsZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChyaWdodEZvcm1FbGVtZW50KGVsZSkpIHtcbiAgICAgICAgbGV0IGxhc3RQYXRoID0gTnVtYmVyKHBhdGguc2xpY2UoLTEpKSArIDE7XG4gICAgICAgIGxldCBmaW5hbFBhdGggPSBwYXRoLnNsaWNlKDAsIC0xKSArIGxhc3RQYXRoO1xuICAgICAgICBwYXRocy5wdXNoKGZpbmFsUGF0aCk7XG4gICAgICAgIGVsZS5kYXRhc2V0LmF1dG9maWxsUGF0aCA9IGZpbmFsUGF0aDtcbiAgICB9XG4gICAgaW5qZWN0UGF0aEZvck5leHRFbGVtZW50KGVsZS5uZXh0RWxlbWVudFNpYmxpbmcsIHBhdGgsIHBhdGhzKTtcbn07XG4vKiog57uZ5omA5pyJ6KGo5Y2V5YWD57Sg5rOo5YWlIGRvbSDlsYLnuqfntKLlvJUgKi9cbmV4cG9ydCBjb25zdCBpbmplY3RQYXRoRm9yRm9ybUVsZW1lbnQgPSAoY2hpbGRyZW4sIHBhdGggPSBcIlwiLCBwYXRocyA9IFtdKSA9PiB7XG4gICAgQXJyYXkuZnJvbShjaGlsZHJlbikuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICBjb25zdCB7IGNoaWxkcmVuOiBpdGVtQ2hpbGQgfSA9IGl0ZW07XG4gICAgICAgIGxldCBmaW5hbFBhdGggPSBwYXRoID09PSBcIlwiID8gaSArIFwiXCIgOiBwYXRoICsgXCItXCIgKyBpO1xuICAgICAgICBpZiAoaXRlbUNoaWxkICYmIGl0ZW1DaGlsZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGluamVjdFBhdGhGb3JGb3JtRWxlbWVudChpdGVtQ2hpbGQsIGZpbmFsUGF0aCwgcGF0aHMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXRlbS5kYXRhc2V0LmF1dG9maWxsUGF0aCkge1xuICAgICAgICAgICAgaWYgKHJpZ2h0Rm9ybUVsZW1lbnQoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBwYXRocy5wdXNoKGZpbmFsUGF0aCk7XG4gICAgICAgICAgICAgICAgaXRlbS5kYXRhc2V0LmF1dG9maWxsUGF0aCA9IGZpbmFsUGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpbmplY3RQYXRoRm9yTmV4dEVsZW1lbnQoaXRlbS5uZXh0RWxlbWVudFNpYmxpbmcsIGZpbmFsUGF0aCwgcGF0aHMpO1xuICAgIH0pO1xuICAgIHJldHVybiBwYXRocztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHV1aWQ7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiBtb2R1bGVbJ2RlZmF1bHQnXSA6XG5cdFx0KCkgPT4gbW9kdWxlO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9jb250ZW50X3NjcmlwdHMvaW5kZXgudHNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9