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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL2FkanVzdG1lbnRGbG9hdFdpbmRpd1Bvcy50cyIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL2NyZWF0ZUZsb2F0V2luZG93LnRzIiwid2VicGFjazovL2F1dG8tZmlsbC8uL3NyYy9jb250ZW50X3NjcmlwdHMvY3JlYXRlVHJpZ2dlci50cyIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL2hvdEtleS50cyIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL2luZGV4LnRzIiwid2VicGFjazovL2F1dG8tZmlsbC8uL3NyYy9jb250ZW50X3NjcmlwdHMvcmVzdG9yZURhdGFGcm9tU3RvcmFnZS50cyIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL3V0aWxzLnRzIiwid2VicGFjazovL2F1dG8tZmlsbC9leHRlcm5hbCBcInV1aWRcIiIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXV0by1maWxsL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2F1dG8tZmlsbC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYXV0by1maWxsL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYXV0by1maWxsL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYXV0by1maWxsL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBZTtBQUNmLFdBQVcsSUFBSTtBQUNmLFdBQVcsbUJB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Q087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLGVBQWUsc0JBQXNCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM0NBLHNCOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IChlbGUsIERPTVJlY3QpID0+IHtcbiAgICBjb25zdCB7IHkgfSA9IGVsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB7IGhlaWdodCwgeTogYmFzZVkgfSA9IERPTVJlY3Q7XG4gICAgLy8g6aG26YOo6KKr5oyh5L2P5LqGXG4gICAgaWYgKHkgPCAwKSB7XG4gICAgICAgICQoZWxlKS5jc3MoeyB0b3A6IGhlaWdodCArIGJhc2VZIH0pO1xuICAgIH1cbn07XG4iLCIvKiog5Yib5bu65rWu56qXICovXG5leHBvcnQgZGVmYXVsdCAoRE9NUmVjdCwgaWQsIG9uUmVtZW1iZXIsIG9uQ2xlYXIpID0+IHtcbiAgICBjb25zdCB7IHgsIHkgfSA9IERPTVJlY3Q7XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZiAoIWRpdikge1xuICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZChkaXYpO1xuICAgIH1cbiAgICBkaXYuaWQgPSBpZDtcbiAgICBkaXYuc3R5bGUuY3NzVGV4dCA9IGBcblx0d2lkdGg6IDEwMHB4O1xuXHRoZWlnaHQ6XHQ0MHB4O1xuXHRkaXNwbGF5OiBub25lO1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHR6LWluZGV4OiA5OTk5OTk7XG5cdGxlZnQ6ICR7eH1weDtcblx0dG9wOiAke3kgLSA0MH1weDtcblx0YmFja2dyb3VuZDogYmx1ZTtcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm94LXNoYWRvdzogMCAwIDRweCBibHVlO1xuYDtcbiAgICBjb25zdCByZW1lbWJlciA9ICQoYDxzcGFuIHN0eWxlPVwibWFyZ2luLXJpZ2h0OiAxMHB4O3BhZGRpbmctcmlnaHQ6IDEwcHg7Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2RkZDtjdXJzb3I6IHBvaW50ZXJcIj7orrDkvY88L3NwYW4+YCkub24oXCJjbGlja1wiLCAoKSA9PiBvblJlbWVtYmVyKGlkKSk7XG4gICAgY29uc3QgY2xlYXIgPSAkKGA8c3BhbiBzdHlsZT1cImN1cnNvcjogcG9pbnRlclwiPua4hemZpDwvc3Bhbj5gKS5vbihcImNsaWNrXCIsICgpID0+IG9uQ2xlYXIoaWQpKTtcbiAgICAkKGRpdikuaHRtbChcIlwiKTtcbiAgICAkKGRpdikuYXBwZW5kKHJlbWVtYmVyLCBjbGVhcik7XG4gICAgcmV0dXJuIGRpdjtcbn07XG4iLCJpbXBvcnQgeyBnZXRDYWNoZSB9IGZyb20gXCIuL3V0aWxzXCI7XG4vKiog5Yib5bu66Kem5Y+R5ZmoICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJpZ2dlciA9ICgpID0+IHtcbiAgICBjb25zdCBkaXNwbGF5ID0gZ2V0Q2FjaGUoXCJhdXRvRmlsbFwiKSB8fCBcImJsb2NrXCI7XG4gICAgbGV0IGRpdiA9IG51bGw7XG4gICAgY29uc3QgZXhpc3RzVGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhdXRvRmlsbFRyaWdnZXJcIik7XG4gICAgaWYgKGV4aXN0c1RhcmdldCkge1xuICAgICAgICBkaXYgPSBleGlzdHNUYXJnZXQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBkaXYuaWQgPSBcImF1dG9GaWxsVHJpZ2dlclwiO1xuICAgICAgICBkaXYuaW5uZXJUZXh0ID0gXCJBdXRvRmlsbFwiO1xuICAgICAgICBkaXYuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogOTk5OTk5OTk7XG4gICAgcmlnaHQ6IDUwcHg7XG4gICAgYm90dG9tOiA1MHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBsaW5lLWhlaWdodDogODBweDtcbiAgICB3aWR0aDogODBweDtcbiAgICBoZWlnaHQ6IDgwcHg7XG4gICAgZGlzcGxheTogJHtkaXNwbGF5fTtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgYm94LXNoYWRvdzogcmdiKDEwMSA4MiAyNTUpIDAgMCAxMHB4O1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIGA7XG4gICAgfVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKGRpdik7XG4gICAgcmV0dXJuIGRpdjtcbn07XG4iLCJpbXBvcnQgeyBlbmFibGUgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgc2V0Q2FjaGUgfSBmcm9tIFwiLi91dGlsc1wiO1xuY29uc3QgdG9nZ2xlVHJpZ2dlciA9ICh0cmlnZ2VyKSA9PiB7XG4gICAgY29uc3Qgc3RhdHVzID0gJCh0cmlnZ2VyKS5jc3MoXCJkaXNwbGF5XCIpO1xuICAgIGNvbnN0IGRpc3BsYXkgPSBzdGF0dXMgPT09IFwiYmxvY2tcIiA/IFwibm9uZVwiIDogXCJibG9ja1wiO1xuICAgICQodHJpZ2dlcikuY3NzKHsgZGlzcGxheSB9KTtcbiAgICBzZXRDYWNoZShcImF1dG9GaWxsXCIsIGRpc3BsYXkpO1xuICAgIGlmIChkaXNwbGF5ID09PSBcIm5vbmVcIiAmJiBlbmFibGUpIHtcbiAgICAgICAgdHJpZ2dlci5jbGljaygpO1xuICAgIH1cbn07XG4vLyBbY3RybC9jb21tYW5kXSArIHNoaWZ0ICsgZlxuZXhwb3J0IGNvbnN0IGtleWRvd24gPSAoZSwgdHJpZ2dlcikgPT4ge1xuICAgIGNvbnN0IHsgbWV0YUtleSwgY3RybEtleSwga2V5LCBzaGlmdEtleSB9ID0gZTtcbiAgICBpZiAobWV0YUtleSB8fCBjdHJsS2V5KSB7XG4gICAgICAgIGlmIChtZXRhS2V5ICYmIHNoaWZ0S2V5ICYmIGtleS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSBcImZcIikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdG9nZ2xlVHJpZ2dlcih0cmlnZ2VyKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJpbXBvcnQgY3JlYXRlRmxvYXRXaW5kb3cgZnJvbSBcIi4vY3JlYXRlRmxvYXRXaW5kb3dcIjtcbmltcG9ydCB7IGNyZWF0ZVRyaWdnZXIgfSBmcm9tIFwiLi9jcmVhdGVUcmlnZ2VyXCI7XG5pbXBvcnQgeyBrZXlkb3duIH0gZnJvbSBcIi4vaG90S2V5XCI7XG5pbXBvcnQgcmVzdG9yZURhdGFGcm9tU3RvcmFnZSBmcm9tIFwiLi9yZXN0b3JlRGF0YUZyb21TdG9yYWdlXCI7XG5pbXBvcnQgeyBjbGVhckNhY2hlLCBpbmplY3RQYXRoRm9yRm9ybUVsZW1lbnQsIHNldENhY2hlIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB1dWlkIGZyb20gXCJ1dWlkXCI7XG5pbXBvcnQgYWRqdXN0bWVudEZsb2F0V2luZGl3UG9zIGZyb20gXCIuL2FkanVzdG1lbnRGbG9hdFdpbmRpd1Bvc1wiO1xubGV0IGVuYWJsZSA9IGZhbHNlO1xubGV0IHRyaWdnZXI7XG5sZXQgY3VyckZvY3VzSWQgPSBcIlwiO1xubGV0IHN1cHBvcnRVcmxzID0gW107XG5jb25zdCB2MSA9IHV1aWQudjE7XG4vKiog54K55Ye76K6w5L2PICovXG5jb25zdCBvblJlbWVtYmVyID0gKGlkKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtYXV0b2ZpbGw9XCIke2lkfVwiXWApO1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdGFyZ2V0LmRhdGFzZXQuYXV0b2ZpbGxQYXRoO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHNldENhY2hlKGtleSwgdGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgJChgIyR7aWR9YCkuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgfVxufTtcbi8qKiDngrnlh7vmuIXpmaQgKi9cbmNvbnN0IG9uQ2xlYXIgPSAoaWQpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hdXRvZmlsbD1cIiR7aWR9XCJdYCk7XG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgICBjb25zdCBrZXkgPSB0YXJnZXQuZGF0YXNldC5hdXRvZmlsbFBhdGg7XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgIGNsZWFyQ2FjaGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICAkKGAjJHtpZH1gKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICB9XG59O1xuLy8g54K55Ye76Kem5Y+R5ZmoXG5jb25zdCBvbkNsaWNrID0gKGUpID0+IHtcbiAgICBpZiAoY3VyckZvY3VzSWQgIT09IFwiXCIgJiYgZW5hYmxlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1cnJGb2N1c0lkKTtcbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGN1cnJGb2N1c0lkID0gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gKGVuYWJsZSA9ICFlbmFibGUpID8gXCJibHVlXCIgOiBcImdyYXlcIjtcbn07XG5jb25zdCBvbkZvY3VzID0gKGlkLCBlbGUpID0+IHtcbiAgICBjdXJyRm9jdXNJZCA9IGlkO1xuICAgIGVuYWJsZSAmJiAkKGAjJHtpZH1gKS5jc3MoXCJkaXNwbGF5XCIsIFwiZmxleFwiKTtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgYWRqdXN0bWVudEZsb2F0V2luZGl3UG9zKGRpdiwgZWxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbn07XG4vKiog5YeG5aSH5Yib5bu65rWu56qXICovXG5jb25zdCByZWFkeUNyZWF0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBhbGxGb3JtID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRk9STUVMRU1FTlQpXVxuICAgICAgICAuZmlsdGVyKChlbGUpID0+IGVsZS50eXBlICE9PSBcInN1Ym1pdFwiKVxuICAgICAgICAubWFwKChlbGUpID0+IHtcbiAgICAgICAgaWYgKCFlbGUuZGF0YXNldC5hdXRvZmlsbCkge1xuICAgICAgICAgICAgZWxlLmRhdGFzZXQuYXV0b2ZpbGwgPSB2MSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbGU7XG4gICAgfSk7XG4gICAgYWxsRm9ybS5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgY29uc3QgaWQgPSBlbGUuZGF0YXNldC5hdXRvZmlsbDtcbiAgICAgICAgY29uc3QgRE9NUmVjdCA9IGVsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgZWxlLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBvbkZvY3VzKGlkLCBlbGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgY3JlYXRlRmxvYXRXaW5kb3coRE9NUmVjdCwgaWQsIG9uUmVtZW1iZXIsIG9uQ2xlYXIpO1xuICAgIH0pO1xufTtcbmNvbnN0IG9uS2V5ZG93biA9IChlKSA9PiB7XG4gICAga2V5ZG93bihlLCB0cmlnZ2VyKTtcbn07XG5jb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICBjb25zdCBwYXRocyA9IGluamVjdFBhdGhGb3JGb3JtRWxlbWVudChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAgICByZXN0b3JlRGF0YUZyb21TdG9yYWdlKHBhdGhzKTtcbiAgICByZWFkeUNyZWF0ZSgpO1xuICAgIGlmIChlbmFibGUpIHtcbiAgICAgICAgdHJpZ2dlciAmJiB0cmlnZ2VyLmNsaWNrKCk7XG4gICAgfVxuICAgIHRyaWdnZXIgPSBjcmVhdGVUcmlnZ2VyKCk7XG4gICAgdHJpZ2dlci5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25DbGljayk7XG4gICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25DbGljayk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5ZG93bik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5ZG93bik7XG59O1xuY29uc3Qgc3VwcG9ydCA9ICh1cmwpID0+IHtcbiAgICBjb25zdCBpc0V4aXN0cyA9IHVybC5zb21lKChpdGVtKSA9PiBpdGVtLnN0YXJ0c1dpdGgobG9jYXRpb24ub3JpZ2luKSk7XG4gICAgaWYgKGlzRXhpc3RzKVxuICAgICAgICBzdGFydCgpO1xufTtcbmNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFwiYXV0b2ZpbGxcIiwgKHsgYXV0b2ZpbGwgfSkgPT4ge1xuICAgIGlmIChhdXRvZmlsbCkge1xuICAgICAgICBjb25zdCB1cmxzID0gYXV0b2ZpbGxcbiAgICAgICAgICAgIC5zcGxpdCgvW1xcclxcbl0vKVxuICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgLmZpbHRlcigoaXRlbSkgPT4gIWl0ZW0uc3RhcnRzV2l0aChcIiNcIikpXG4gICAgICAgICAgICAubWFwKChpdGVtKSA9PiBpdGVtLnRyaW0oKSk7XG4gICAgICAgIHN1cHBvcnRVcmxzID0gdXJscztcbiAgICAgICAgc3VwcG9ydCh1cmxzKTtcbiAgICB9XG59KTtcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigoZGF0YSkgPT4ge1xuICAgIGNvbnN0IHsgdHlwZSB9ID0gZGF0YTtcbiAgICBpZiAodHlwZSA9PT0gXCJwYWdlVXBkYXRlXCIpIHtcbiAgICAgICAgc3VwcG9ydChzdXBwb3J0VXJscyk7XG4gICAgfVxufSk7XG5leHBvcnQgeyBlbmFibGUgfTtcbiIsImltcG9ydCB7IGdldENhY2hlIH0gZnJvbSBcIi4vdXRpbHNcIjtcbi8qKiDmgaLlpI3mlbDmja4gKi9cbmV4cG9ydCBkZWZhdWx0IChwYXRocykgPT4ge1xuICAgIGNvbnN0IGV2ZW50VGFyZ2V0ID0gbmV3IEV2ZW50KFwiaW5wdXRcIiwgeyBidWJibGVzOiB0cnVlIH0pO1xuICAgIHBhdGhzLmZvckVhY2goKHBhdGgpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtYXV0b2ZpbGwtcGF0aD1cIiR7cGF0aH1cIl1gKTtcbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgbGV0IGNhY2hlID0gZ2V0Q2FjaGUocGF0aCk7XG4gICAgICAgICAgICBpZiAoY2FjaGUpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZhbHVlID0gY2FjaGU7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnRUYXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuIiwiZXhwb3J0IGNvbnN0IHNldENhY2hlID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG59O1xuZXhwb3J0IGNvbnN0IGdldENhY2hlID0gKGtleSkgPT4ge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xufTtcbmV4cG9ydCBjb25zdCBjbGVhckNhY2hlID0gKGtleSkgPT4ge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xufTtcbmV4cG9ydCBjb25zdCByaWdodEZvcm1FbGVtZW50ID0gKGVsZSkgPT4ge1xuICAgIGlmIChlbGUudGFnTmFtZSA9PT0gXCJBXCIgfHwgZWxlLnRhZ05hbWUgPT09IFwiUFwiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIEZPUk1FTEVNRU5ULmluZGV4T2YoZWxlLnRhZ05hbWUudG9Mb2NhbGVMb3dlckNhc2UoKSkgIT09IC0xO1xufTtcbi8qKiDnu5nkuIvkuIDkuKrlhYTlvJ/lhYPntKDms6jlhaXntKLlvJUgKi9cbmV4cG9ydCBjb25zdCBpbmplY3RQYXRoRm9yTmV4dEVsZW1lbnQgPSAoZWxlLCBwYXRoLCBwYXRocykgPT4ge1xuICAgIGlmICghZWxlKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKHJpZ2h0Rm9ybUVsZW1lbnQoZWxlKSkge1xuICAgICAgICBsZXQgbGFzdFBhdGggPSBOdW1iZXIocGF0aC5zbGljZSgtMSkpICsgMTtcbiAgICAgICAgbGV0IGZpbmFsUGF0aCA9IHBhdGguc2xpY2UoMCwgLTEpICsgbGFzdFBhdGg7XG4gICAgICAgIHBhdGhzLnB1c2goZmluYWxQYXRoKTtcbiAgICAgICAgZWxlLmRhdGFzZXQuYXV0b2ZpbGxQYXRoID0gZmluYWxQYXRoO1xuICAgIH1cbiAgICBpbmplY3RQYXRoRm9yTmV4dEVsZW1lbnQoZWxlLm5leHRFbGVtZW50U2libGluZywgcGF0aCwgcGF0aHMpO1xufTtcbi8qKiDnu5nmiYDmnInooajljZXlhYPntKDms6jlhaUgZG9tIOWxgue6p+e0ouW8lSAqL1xuZXhwb3J0IGNvbnN0IGluamVjdFBhdGhGb3JGb3JtRWxlbWVudCA9IChjaGlsZHJlbiwgcGF0aCA9IFwiXCIsIHBhdGhzID0gW10pID0+IHtcbiAgICBBcnJheS5mcm9tKGNoaWxkcmVuKS5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW46IGl0ZW1DaGlsZCB9ID0gaXRlbTtcbiAgICAgICAgbGV0IGZpbmFsUGF0aCA9IHBhdGggPT09IFwiXCIgPyBpICsgXCJcIiA6IHBhdGggKyBcIi1cIiArIGk7XG4gICAgICAgIGlmIChpdGVtQ2hpbGQgJiYgaXRlbUNoaWxkLmxlbmd0aCkge1xuICAgICAgICAgICAgaW5qZWN0UGF0aEZvckZvcm1FbGVtZW50KGl0ZW1DaGlsZCwgZmluYWxQYXRoLCBwYXRocyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpdGVtLmRhdGFzZXQuYXV0b2ZpbGxQYXRoKSB7XG4gICAgICAgICAgICBpZiAocmlnaHRGb3JtRWxlbWVudChpdGVtKSkge1xuICAgICAgICAgICAgICAgIHBhdGhzLnB1c2goZmluYWxQYXRoKTtcbiAgICAgICAgICAgICAgICBpdGVtLmRhdGFzZXQuYXV0b2ZpbGxQYXRoID0gZmluYWxQYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGluamVjdFBhdGhGb3JOZXh0RWxlbWVudChpdGVtLm5leHRFbGVtZW50U2libGluZywgZmluYWxQYXRoLCBwYXRocyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhdGhzO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gdXVpZDsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IG1vZHVsZVsnZGVmYXVsdCddIDpcblx0XHQoKSA9PiBtb2R1bGU7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvbnRlbnRfc2NyaXB0cy9pbmRleC50c1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=