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
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
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
/* harmony import */ var _adjustmentFloatWindiwPos__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./adjustmentFloatWindiwPos */ "./src/content_scripts/adjustmentFloatWindiwPos.ts");
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
/** 页面上每个表单的聚焦事件 */
const onFocus = (id, ele) => {
    currFocusId = id;
    enable && $(`#${id}`).css("display", "flex");
    const div = document.getElementById(id);
    (0,_adjustmentFloatWindiwPos__WEBPACK_IMPORTED_MODULE_6__.default)(div, ele.getBoundingClientRect());
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
            onFocus(id, ele);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL2FkanVzdG1lbnRGbG9hdFdpbmRpd1Bvcy50cyIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL2NyZWF0ZUZsb2F0V2luZG93LnRzIiwid2VicGFjazovL2F1dG8tZmlsbC8uL3NyYy9jb250ZW50X3NjcmlwdHMvY3JlYXRlVHJpZ2dlci50cyIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL2hvdEtleS50cyIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL2luZGV4LnRzIiwid2VicGFjazovL2F1dG8tZmlsbC8uL3NyYy9jb250ZW50X3NjcmlwdHMvcmVzdG9yZURhdGFGcm9tU3RvcmFnZS50cyIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL3V0aWxzLnRzIiwid2VicGFjazovL2F1dG8tZmlsbC9leHRlcm5hbCBcInV1aWRcIiIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXV0by1maWxsL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2F1dG8tZmlsbC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYXV0by1maWxsL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYXV0by1maWxsL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYXV0by1maWxsL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBZTtBQUNmLFdBQVcsSUFBSTtBQUNmLFdBQVcsbUJB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Q0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EsZUFBZSxzQkFBc0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMzQ0Esc0I7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsZ0NBQWdDLFlBQVk7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgKGVsZSwgRE9NUmVjdCkgPT4ge1xuICAgIGNvbnN0IHsgeSB9ID0gZWxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHsgaGVpZ2h0LCB5OiBiYXNlWSB9ID0gRE9NUmVjdDtcbiAgICAvLyDpobbpg6jooqvmjKHkvY/kuoZcbiAgICBpZiAoeSA8IDApIHtcbiAgICAgICAgJChlbGUpLmNzcyh7IHRvcDogaGVpZ2h0ICsgYmFzZVkgfSk7XG4gICAgfVxufTtcbiIsIi8qKiDliJvlu7rmta7nqpcgKi9cbmV4cG9ydCBkZWZhdWx0IChET01SZWN0LCBpZCwgb25SZW1lbWJlciwgb25DbGVhcikgPT4ge1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gRE9NUmVjdDtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmICghZGl2KSB7XG4gICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKGRpdik7XG4gICAgfVxuICAgIGRpdi5pZCA9IGlkO1xuICAgIGRpdi5zdHlsZS5jc3NUZXh0ID0gYFxuXHR3aWR0aDogMTAwcHg7XG5cdGhlaWdodDpcdDQwcHg7XG5cdGRpc3BsYXk6IG5vbmU7XG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHotaW5kZXg6IDk5OTk5OTtcblx0bGVmdDogJHt4fXB4O1xuXHR0b3A6ICR7eSAtIDQwfXB4O1xuXHRiYWNrZ3JvdW5kOiBibHVlO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBib3gtc2hhZG93OiAwIDAgNHB4IGJsdWU7XG5gO1xuICAgIGNvbnN0IHJlbWVtYmVyID0gJChgPHNwYW4gc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDEwcHg7cGFkZGluZy1yaWdodDogMTBweDtib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZGRkO2N1cnNvcjogcG9pbnRlclwiPuiusOS9jzwvc3Bhbj5gKS5vbihcImNsaWNrXCIsICgpID0+IG9uUmVtZW1iZXIoaWQpKTtcbiAgICBjb25zdCBjbGVhciA9ICQoYDxzcGFuIHN0eWxlPVwiY3Vyc29yOiBwb2ludGVyXCI+5riF6ZmkPC9zcGFuPmApLm9uKFwiY2xpY2tcIiwgKCkgPT4gb25DbGVhcihpZCkpO1xuICAgICQoZGl2KS5odG1sKFwiXCIpO1xuICAgICQoZGl2KS5hcHBlbmQocmVtZW1iZXIsIGNsZWFyKTtcbiAgICByZXR1cm4gZGl2O1xufTtcbiIsImltcG9ydCB7IGdldENhY2hlIH0gZnJvbSBcIi4vdXRpbHNcIjtcbi8qKiDliJvlu7rop6blj5HlmaggKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmlnZ2VyID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXkgPSBnZXRDYWNoZShcImF1dG9GaWxsXCIpIHx8IFwiYmxvY2tcIjtcbiAgICBsZXQgZGl2ID0gbnVsbDtcbiAgICBjb25zdCBleGlzdHNUYXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImF1dG9GaWxsVHJpZ2dlclwiKTtcbiAgICBpZiAoZXhpc3RzVGFyZ2V0KSB7XG4gICAgICAgIGRpdiA9IGV4aXN0c1RhcmdldDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGRpdi5pZCA9IFwiYXV0b0ZpbGxUcmlnZ2VyXCI7XG4gICAgICAgIGRpdi5pbm5lclRleHQgPSBcIkF1dG9GaWxsXCI7XG4gICAgICAgIGRpdi5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB6LWluZGV4OiA5OTk5OTk5OTtcbiAgICByaWdodDogNTBweDtcbiAgICBib3R0b206IDUwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGxpbmUtaGVpZ2h0OiA4MHB4O1xuICAgIHdpZHRoOiA4MHB4O1xuICAgIGhlaWdodDogODBweDtcbiAgICBkaXNwbGF5OiAke2Rpc3BsYXl9O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBib3gtc2hhZG93OiByZ2IoMTAxIDgyIDI1NSkgMCAwIDEwcHg7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgYDtcbiAgICB9XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoZGl2KTtcbiAgICByZXR1cm4gZGl2O1xufTtcbiIsImltcG9ydCB7IGVuYWJsZSB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBzZXRDYWNoZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5jb25zdCB0b2dnbGVUcmlnZ2VyID0gKHRyaWdnZXIpID0+IHtcbiAgICBjb25zdCBzdGF0dXMgPSAkKHRyaWdnZXIpLmNzcyhcImRpc3BsYXlcIik7XG4gICAgY29uc3QgZGlzcGxheSA9IHN0YXR1cyA9PT0gXCJibG9ja1wiID8gXCJub25lXCIgOiBcImJsb2NrXCI7XG4gICAgJCh0cmlnZ2VyKS5jc3MoeyBkaXNwbGF5IH0pO1xuICAgIHNldENhY2hlKFwiYXV0b0ZpbGxcIiwgZGlzcGxheSk7XG4gICAgaWYgKGRpc3BsYXkgPT09IFwibm9uZVwiICYmIGVuYWJsZSkge1xuICAgICAgICB0cmlnZ2VyLmNsaWNrKCk7XG4gICAgfVxufTtcbi8vIFtjdHJsL2NvbW1hbmRdICsgc2hpZnQgKyBmXG5leHBvcnQgY29uc3Qga2V5ZG93biA9IChlLCB0cmlnZ2VyKSA9PiB7XG4gICAgY29uc3QgeyBtZXRhS2V5LCBjdHJsS2V5LCBrZXksIHNoaWZ0S2V5IH0gPSBlO1xuICAgIGlmIChtZXRhS2V5IHx8IGN0cmxLZXkpIHtcbiAgICAgICAgaWYgKG1ldGFLZXkgJiYgc2hpZnRLZXkgJiYga2V5LnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09IFwiZlwiKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0b2dnbGVUcmlnZ2VyKHRyaWdnZXIpO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsImltcG9ydCBjcmVhdGVGbG9hdFdpbmRvdyBmcm9tIFwiLi9jcmVhdGVGbG9hdFdpbmRvd1wiO1xuaW1wb3J0IHsgY3JlYXRlVHJpZ2dlciB9IGZyb20gXCIuL2NyZWF0ZVRyaWdnZXJcIjtcbmltcG9ydCB7IGtleWRvd24gfSBmcm9tIFwiLi9ob3RLZXlcIjtcbmltcG9ydCByZXN0b3JlRGF0YUZyb21TdG9yYWdlIGZyb20gXCIuL3Jlc3RvcmVEYXRhRnJvbVN0b3JhZ2VcIjtcbmltcG9ydCB7IGNsZWFyQ2FjaGUsIGluamVjdFBhdGhGb3JGb3JtRWxlbWVudCwgc2V0Q2FjaGUgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHV1aWQgZnJvbSBcInV1aWRcIjtcbmltcG9ydCBhZGp1c3RtZW50RmxvYXRXaW5kaXdQb3MgZnJvbSBcIi4vYWRqdXN0bWVudEZsb2F0V2luZGl3UG9zXCI7XG5sZXQgZW5hYmxlID0gZmFsc2U7XG5sZXQgdHJpZ2dlcjtcbmxldCBjdXJyRm9jdXNJZCA9IFwiXCI7XG5sZXQgc3VwcG9ydFVybHMgPSBbXTtcbmNvbnN0IHYxID0gdXVpZC52MTtcbi8qKiDngrnlh7vorrDkvY8gKi9cbmNvbnN0IG9uUmVtZW1iZXIgPSAoaWQpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hdXRvZmlsbD1cIiR7aWR9XCJdYCk7XG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgICBjb25zdCBrZXkgPSB0YXJnZXQuZGF0YXNldC5hdXRvZmlsbFBhdGg7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgc2V0Q2FjaGUoa2V5LCB0YXJnZXQudmFsdWUpO1xuICAgICAgICAkKGAjJHtpZH1gKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICB9XG59O1xuLyoqIOeCueWHu+a4hemZpCAqL1xuY29uc3Qgb25DbGVhciA9IChpZCkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWF1dG9maWxsPVwiJHtpZH1cIl1gKTtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHRhcmdldC5kYXRhc2V0LmF1dG9maWxsUGF0aDtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgY2xlYXJDYWNoZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgICQoYCMke2lkfWApLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgIH1cbn07XG4vLyDngrnlh7vop6blj5HlmahcbmNvbnN0IG9uQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGlmIChjdXJyRm9jdXNJZCAhPT0gXCJcIiAmJiBlbmFibGUpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3VyckZvY3VzSWQpO1xuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgY3VyckZvY3VzSWQgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAoZW5hYmxlID0gIWVuYWJsZSkgPyBcImJsdWVcIiA6IFwiZ3JheVwiO1xufTtcbi8qKiDpobXpnaLkuIrmr4/kuKrooajljZXnmoTogZrnhKbkuovku7YgKi9cbmNvbnN0IG9uRm9jdXMgPSAoaWQsIGVsZSkgPT4ge1xuICAgIGN1cnJGb2N1c0lkID0gaWQ7XG4gICAgZW5hYmxlICYmICQoYCMke2lkfWApLmNzcyhcImRpc3BsYXlcIiwgXCJmbGV4XCIpO1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBhZGp1c3RtZW50RmxvYXRXaW5kaXdQb3MoZGl2LCBlbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xufTtcbi8qKiDlh4blpIfliJvlu7rmta7nqpcgKi9cbmNvbnN0IHJlYWR5Q3JlYXRlID0gKCkgPT4ge1xuICAgIGNvbnN0IGFsbEZvcm0gPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChGT1JNRUxFTUVOVCldXG4gICAgICAgIC5maWx0ZXIoKGVsZSkgPT4gZWxlLnR5cGUgIT09IFwic3VibWl0XCIpXG4gICAgICAgIC5tYXAoKGVsZSkgPT4ge1xuICAgICAgICBpZiAoIWVsZS5kYXRhc2V0LmF1dG9maWxsKSB7XG4gICAgICAgICAgICBlbGUuZGF0YXNldC5hdXRvZmlsbCA9IHYxKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZTtcbiAgICB9KTtcbiAgICBhbGxGb3JtLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IGVsZS5kYXRhc2V0LmF1dG9maWxsO1xuICAgICAgICBjb25zdCBET01SZWN0ID0gZWxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBlbGUuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsICgpID0+IHtcbiAgICAgICAgICAgIG9uRm9jdXMoaWQsIGVsZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjcmVhdGVGbG9hdFdpbmRvdyhET01SZWN0LCBpZCwgb25SZW1lbWJlciwgb25DbGVhcik7XG4gICAgfSk7XG59O1xuY29uc3Qgb25LZXlkb3duID0gKGUpID0+IHtcbiAgICBrZXlkb3duKGUsIHRyaWdnZXIpO1xufTtcbmNvbnN0IHN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHBhdGhzID0gaW5qZWN0UGF0aEZvckZvcm1FbGVtZW50KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICAgIHJlc3RvcmVEYXRhRnJvbVN0b3JhZ2UocGF0aHMpO1xuICAgIHJlYWR5Q3JlYXRlKCk7XG4gICAgaWYgKGVuYWJsZSkge1xuICAgICAgICB0cmlnZ2VyICYmIHRyaWdnZXIuY2xpY2soKTtcbiAgICB9XG4gICAgdHJpZ2dlciA9IGNyZWF0ZVRyaWdnZXIoKTtcbiAgICB0cmlnZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvbkNsaWNrKTtcbiAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvbkNsaWNrKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlkb3duKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlkb3duKTtcbn07XG5jb25zdCBzdXBwb3J0ID0gKHVybCkgPT4ge1xuICAgIGNvbnN0IGlzRXhpc3RzID0gdXJsLnNvbWUoKGl0ZW0pID0+IGl0ZW0uc3RhcnRzV2l0aChsb2NhdGlvbi5vcmlnaW4pKTtcbiAgICBpZiAoaXNFeGlzdHMpXG4gICAgICAgIHN0YXJ0KCk7XG59O1xuY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoXCJhdXRvZmlsbFwiLCAoeyBhdXRvZmlsbCB9KSA9PiB7XG4gICAgaWYgKGF1dG9maWxsKSB7XG4gICAgICAgIGNvbnN0IHVybHMgPSBhdXRvZmlsbFxuICAgICAgICAgICAgLnNwbGl0KC9bXFxyXFxuXS8pXG4gICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAuZmlsdGVyKChpdGVtKSA9PiAhaXRlbS5zdGFydHNXaXRoKFwiI1wiKSlcbiAgICAgICAgICAgIC5tYXAoKGl0ZW0pID0+IGl0ZW0udHJpbSgpKTtcbiAgICAgICAgc3VwcG9ydFVybHMgPSB1cmxzO1xuICAgICAgICBzdXBwb3J0KHVybHMpO1xuICAgIH1cbn0pO1xuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChkYXRhKSA9PiB7XG4gICAgY29uc3QgeyB0eXBlIH0gPSBkYXRhO1xuICAgIGlmICh0eXBlID09PSBcInBhZ2VVcGRhdGVcIikge1xuICAgICAgICBzdXBwb3J0KHN1cHBvcnRVcmxzKTtcbiAgICB9XG59KTtcbmV4cG9ydCB7IGVuYWJsZSB9O1xuIiwiaW1wb3J0IHsgZ2V0Q2FjaGUgfSBmcm9tIFwiLi91dGlsc1wiO1xuLyoqIOaBouWkjeaVsOaNriAqL1xuZXhwb3J0IGRlZmF1bHQgKHBhdGhzKSA9PiB7XG4gICAgY29uc3QgZXZlbnRUYXJnZXQgPSBuZXcgRXZlbnQoXCJpbnB1dFwiLCB7IGJ1YmJsZXM6IHRydWUgfSk7XG4gICAgcGF0aHMuZm9yRWFjaCgocGF0aCkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hdXRvZmlsbC1wYXRoPVwiJHtwYXRofVwiXWApO1xuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICBsZXQgY2FjaGUgPSBnZXRDYWNoZShwYXRoKTtcbiAgICAgICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICB0YXJnZXQudmFsdWUgPSBjYWNoZTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudFRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG4iLCJleHBvcnQgY29uc3Qgc2V0Q2FjaGUgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbn07XG5leHBvcnQgY29uc3QgZ2V0Q2FjaGUgPSAoa2V5KSA9PiB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG59O1xuZXhwb3J0IGNvbnN0IGNsZWFyQ2FjaGUgPSAoa2V5KSA9PiB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG59O1xuZXhwb3J0IGNvbnN0IHJpZ2h0Rm9ybUVsZW1lbnQgPSAoZWxlKSA9PiB7XG4gICAgaWYgKGVsZS50YWdOYW1lID09PSBcIkFcIiB8fCBlbGUudGFnTmFtZSA9PT0gXCJQXCIpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gRk9STUVMRU1FTlQuaW5kZXhPZihlbGUudGFnTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpKSAhPT0gLTE7XG59O1xuLyoqIOe7meS4i+S4gOS4quWFhOW8n+WFg+e0oOazqOWFpee0ouW8lSAqL1xuZXhwb3J0IGNvbnN0IGluamVjdFBhdGhGb3JOZXh0RWxlbWVudCA9IChlbGUsIHBhdGgsIHBhdGhzKSA9PiB7XG4gICAgaWYgKCFlbGUpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAocmlnaHRGb3JtRWxlbWVudChlbGUpKSB7XG4gICAgICAgIGxldCBsYXN0UGF0aCA9IE51bWJlcihwYXRoLnNsaWNlKC0xKSkgKyAxO1xuICAgICAgICBsZXQgZmluYWxQYXRoID0gcGF0aC5zbGljZSgwLCAtMSkgKyBsYXN0UGF0aDtcbiAgICAgICAgcGF0aHMucHVzaChmaW5hbFBhdGgpO1xuICAgICAgICBlbGUuZGF0YXNldC5hdXRvZmlsbFBhdGggPSBmaW5hbFBhdGg7XG4gICAgfVxuICAgIGluamVjdFBhdGhGb3JOZXh0RWxlbWVudChlbGUubmV4dEVsZW1lbnRTaWJsaW5nLCBwYXRoLCBwYXRocyk7XG59O1xuLyoqIOe7meaJgOacieihqOWNleWFg+e0oOazqOWFpSBkb20g5bGC57qn57Si5byVICovXG5leHBvcnQgY29uc3QgaW5qZWN0UGF0aEZvckZvcm1FbGVtZW50ID0gKGNoaWxkcmVuLCBwYXRoID0gXCJcIiwgcGF0aHMgPSBbXSkgPT4ge1xuICAgIEFycmF5LmZyb20oY2hpbGRyZW4pLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbjogaXRlbUNoaWxkIH0gPSBpdGVtO1xuICAgICAgICBsZXQgZmluYWxQYXRoID0gcGF0aCA9PT0gXCJcIiA/IGkgKyBcIlwiIDogcGF0aCArIFwiLVwiICsgaTtcbiAgICAgICAgaWYgKGl0ZW1DaGlsZCAmJiBpdGVtQ2hpbGQubGVuZ3RoKSB7XG4gICAgICAgICAgICBpbmplY3RQYXRoRm9yRm9ybUVsZW1lbnQoaXRlbUNoaWxkLCBmaW5hbFBhdGgsIHBhdGhzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWl0ZW0uZGF0YXNldC5hdXRvZmlsbFBhdGgpIHtcbiAgICAgICAgICAgIGlmIChyaWdodEZvcm1FbGVtZW50KGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgcGF0aHMucHVzaChmaW5hbFBhdGgpO1xuICAgICAgICAgICAgICAgIGl0ZW0uZGF0YXNldC5hdXRvZmlsbFBhdGggPSBmaW5hbFBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaW5qZWN0UGF0aEZvck5leHRFbGVtZW50KGl0ZW0ubmV4dEVsZW1lbnRTaWJsaW5nLCBmaW5hbFBhdGgsIHBhdGhzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcGF0aHM7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB1dWlkOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gbW9kdWxlWydkZWZhdWx0J10gOlxuXHRcdCgpID0+IG1vZHVsZTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvY29udGVudF9zY3JpcHRzL2luZGV4LnRzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==