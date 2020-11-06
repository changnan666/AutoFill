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
/** 自动调整浮窗位置 */
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
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/content_scripts/index.ts");
/* harmony import */ var _adjustmentFloatWindiwPos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adjustmentFloatWindiwPos */ "./src/content_scripts/adjustmentFloatWindiwPos.ts");
;

/** 创建方向控制器 */
const createDirectionController = (div) => { };
/** 创建功能浮窗 */
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
    ___WEBPACK_IMPORTED_MODULE_0__.enable && $(div).css({ display: "flex" });
    createDirectionController(div);
    (0,_adjustmentFloatWindiwPos__WEBPACK_IMPORTED_MODULE_1__.default)(div, DOMRect);
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
    window.removeEventListener("resize", readyCreate);
    window.addEventListener("resize", readyCreate);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL2FkanVzdG1lbnRGbG9hdFdpbmRpd1Bvcy50cyIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL2NyZWF0ZUZsb2F0V2luZG93LnRzIiwid2VicGFjazovL2F1dG8tZmlsbC8uL3NyYy9jb250ZW50X3NjcmlwdHMvY3JlYXRlVHJpZ2dlci50cyIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL2hvdEtleS50cyIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL2luZGV4LnRzIiwid2VicGFjazovL2F1dG8tZmlsbC8uL3NyYy9jb250ZW50X3NjcmlwdHMvcmVzdG9yZURhdGFGcm9tU3RvcmFnZS50cyIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvY29udGVudF9zY3JpcHRzL3V0aWxzLnRzIiwid2VicGFjazovL2F1dG8tZmlsbC9leHRlcm5hbCBcInV1aWRcIiIsIndlYnBhY2s6Ly9hdXRvLWZpbGwvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXV0by1maWxsL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2F1dG8tZmlsbC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYXV0by1maWxsL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYXV0by1maWxsL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYXV0by1maWxsL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLGlFQUFlO0FBQ2YsV0FBVyxJQUFJO0FBQ2YsV0FBVyxtQkFBbUI7QUFDOUI7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQSxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1JGLENBQTJCO0FBQ3VDO0FBQ2xFO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsaUVBQWU7QUFDZixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsRUFBRTtBQUNYLFFBQVEsT0FBTztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Qsb0JBQW9CLDZCQUE2QjtBQUN6RztBQUNBO0FBQ0E7QUFDQSxJQUFJLHFDQUFNLGdCQUFnQixrQkFBa0I7QUFDNUM7QUFDQSxJQUFJLGtFQUF3QjtBQUM1QjtBQUNBLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQ0YsQ0FBbUM7QUFDbkM7QUFDTztBQUNQLG9CQUFvQixnREFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakNBLENBQTJCO0FBQ1E7QUFDbkM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFVBQVU7QUFDOUIsSUFBSSxnREFBUTtBQUNaLDhCQUE4QixxQ0FBTTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsV0FBVyxrQ0FBa0M7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQSxDQUFvRDtBQUNKO0FBQ2I7QUFDMkI7QUFDVztBQUNqRDtBQUMwQztBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0RBQU87QUFDbEI7QUFDQTtBQUNBLDZEQUE2RCxHQUFHO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBLFFBQVEsZ0RBQVE7QUFDaEIsY0FBYyxHQUFHO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELEdBQUc7QUFDaEU7QUFDQTtBQUNBO0FBQ0EsWUFBWSxrREFBVTtBQUN0QjtBQUNBLGNBQWMsR0FBRztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLEdBQUc7QUFDdkI7QUFDQSxJQUFJLGtFQUF3QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsNkJBQVc7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsUUFBUSwyREFBaUI7QUFDekIsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJLGdEQUFPO0FBQ1g7QUFDQTtBQUNBLGtCQUFrQixnRUFBd0I7QUFDMUMsSUFBSSxnRUFBc0I7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDZEQUFhO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxXQUFXO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ2lCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9HbEIsQ0FBbUM7QUFDbkM7QUFDQSxpRUFBZTtBQUNmLDRDQUE0QyxnQkFBZ0I7QUFDNUQ7QUFDQSxzRUFBc0UsS0FBSztBQUMzRTtBQUNBLHdCQUF3QixnREFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZLO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLFdBQVcsNkJBQVc7QUFDdEI7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxlQUFlLHNCQUFzQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzNDQSxzQjs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxnQ0FBZ0MsWUFBWTtXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiog6Ieq5Yqo6LCD5pW05rWu56qX5L2N572uICovXG5leHBvcnQgZGVmYXVsdCAoZWxlLCBET01SZWN0KSA9PiB7XG4gICAgY29uc3QgeyB5IH0gPSBlbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeyBoZWlnaHQsIHk6IGJhc2VZIH0gPSBET01SZWN0O1xuICAgIC8vIOmhtumDqOiiq+aMoeS9j+S6hlxuICAgIGlmICh5IDwgMCkge1xuICAgICAgICAkKGVsZSkuY3NzKHsgdG9wOiBoZWlnaHQgKyBiYXNlWSB9KTtcbiAgICB9XG59O1xuIiwiaW1wb3J0IHsgZW5hYmxlIH0gZnJvbSBcIi5cIjtcbmltcG9ydCBhZGp1c3RtZW50RmxvYXRXaW5kaXdQb3MgZnJvbSBcIi4vYWRqdXN0bWVudEZsb2F0V2luZGl3UG9zXCI7XG4vKiog5Yib5bu65pa55ZCR5o6n5Yi25ZmoICovXG5jb25zdCBjcmVhdGVEaXJlY3Rpb25Db250cm9sbGVyID0gKGRpdikgPT4geyB9O1xuLyoqIOWIm+W7uuWKn+iDvea1rueqlyAqL1xuZXhwb3J0IGRlZmF1bHQgKERPTVJlY3QsIGlkLCBvblJlbWVtYmVyLCBvbkNsZWFyKSA9PiB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSBET01SZWN0O1xuICAgIGxldCBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgaWYgKCFkaXYpIHtcbiAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoZGl2KTtcbiAgICB9XG4gICAgZGl2LmlkID0gaWQ7XG4gICAgZGl2LnN0eWxlLmNzc1RleHQgPSBgXG5cdHdpZHRoOiAxMDBweDtcblx0aGVpZ2h0Olx0NDBweDtcblx0ZGlzcGxheTogbm9uZTtcblx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0ei1pbmRleDogOTk5OTk5O1xuXHRsZWZ0OiAke3h9cHg7XG5cdHRvcDogJHt5IC0gNDB9cHg7XG5cdGJhY2tncm91bmQ6IGJsdWU7XG4gIGNvbG9yOiAjZmZmO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJveC1zaGFkb3c6IDAgMCA0cHggYmx1ZTtcbmA7XG4gICAgY29uc3QgcmVtZW1iZXIgPSAkKGA8c3BhbiBzdHlsZT1cIm1hcmdpbi1yaWdodDogMTBweDtwYWRkaW5nLXJpZ2h0OiAxMHB4O2JvcmRlci1yaWdodDogMXB4IHNvbGlkICNkZGQ7Y3Vyc29yOiBwb2ludGVyXCI+6K6w5L2PPC9zcGFuPmApLm9uKFwiY2xpY2tcIiwgKCkgPT4gb25SZW1lbWJlcihpZCkpO1xuICAgIGNvbnN0IGNsZWFyID0gJChgPHNwYW4gc3R5bGU9XCJjdXJzb3I6IHBvaW50ZXJcIj7muIXpmaQ8L3NwYW4+YCkub24oXCJjbGlja1wiLCAoKSA9PiBvbkNsZWFyKGlkKSk7XG4gICAgJChkaXYpLmh0bWwoXCJcIik7XG4gICAgJChkaXYpLmFwcGVuZChyZW1lbWJlciwgY2xlYXIpO1xuICAgIGVuYWJsZSAmJiAkKGRpdikuY3NzKHsgZGlzcGxheTogXCJmbGV4XCIgfSk7XG4gICAgY3JlYXRlRGlyZWN0aW9uQ29udHJvbGxlcihkaXYpO1xuICAgIGFkanVzdG1lbnRGbG9hdFdpbmRpd1BvcyhkaXYsIERPTVJlY3QpO1xuICAgIHJldHVybiBkaXY7XG59O1xuIiwiaW1wb3J0IHsgZ2V0Q2FjaGUgfSBmcm9tIFwiLi91dGlsc1wiO1xuLyoqIOWIm+W7uuinpuWPkeWZqCAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyaWdnZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlzcGxheSA9IGdldENhY2hlKFwiYXV0b0ZpbGxcIikgfHwgXCJibG9ja1wiO1xuICAgIGxldCBkaXYgPSBudWxsO1xuICAgIGNvbnN0IGV4aXN0c1RhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXV0b0ZpbGxUcmlnZ2VyXCIpO1xuICAgIGlmIChleGlzdHNUYXJnZXQpIHtcbiAgICAgICAgZGl2ID0gZXhpc3RzVGFyZ2V0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZGl2LmlkID0gXCJhdXRvRmlsbFRyaWdnZXJcIjtcbiAgICAgICAgZGl2LmlubmVyVGV4dCA9IFwiQXV0b0ZpbGxcIjtcbiAgICAgICAgZGl2LnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6IDk5OTk5OTk5O1xuICAgIHJpZ2h0OiA1MHB4O1xuICAgIGJvdHRvbTogNTBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbGluZS1oZWlnaHQ6IDgwcHg7XG4gICAgd2lkdGg6IDgwcHg7XG4gICAgaGVpZ2h0OiA4MHB4O1xuICAgIGRpc3BsYXk6ICR7ZGlzcGxheX07XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJveC1zaGFkb3c6IHJnYigxMDEgODIgMjU1KSAwIDAgMTBweDtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICBgO1xuICAgIH1cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZChkaXYpO1xuICAgIHJldHVybiBkaXY7XG59O1xuIiwiaW1wb3J0IHsgZW5hYmxlIH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IHNldENhY2hlIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmNvbnN0IHRvZ2dsZVRyaWdnZXIgPSAodHJpZ2dlcikgPT4ge1xuICAgIGNvbnN0IHN0YXR1cyA9ICQodHJpZ2dlcikuY3NzKFwiZGlzcGxheVwiKTtcbiAgICBjb25zdCBkaXNwbGF5ID0gc3RhdHVzID09PSBcImJsb2NrXCIgPyBcIm5vbmVcIiA6IFwiYmxvY2tcIjtcbiAgICAkKHRyaWdnZXIpLmNzcyh7IGRpc3BsYXkgfSk7XG4gICAgc2V0Q2FjaGUoXCJhdXRvRmlsbFwiLCBkaXNwbGF5KTtcbiAgICBpZiAoZGlzcGxheSA9PT0gXCJub25lXCIgJiYgZW5hYmxlKSB7XG4gICAgICAgIHRyaWdnZXIuY2xpY2soKTtcbiAgICB9XG59O1xuLy8gW2N0cmwvY29tbWFuZF0gKyBzaGlmdCArIGZcbmV4cG9ydCBjb25zdCBrZXlkb3duID0gKGUsIHRyaWdnZXIpID0+IHtcbiAgICBjb25zdCB7IG1ldGFLZXksIGN0cmxLZXksIGtleSwgc2hpZnRLZXkgfSA9IGU7XG4gICAgaWYgKG1ldGFLZXkgfHwgY3RybEtleSkge1xuICAgICAgICBpZiAobWV0YUtleSAmJiBzaGlmdEtleSAmJiBrZXkudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gXCJmXCIpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRvZ2dsZVRyaWdnZXIodHJpZ2dlcik7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiaW1wb3J0IGNyZWF0ZUZsb2F0V2luZG93IGZyb20gXCIuL2NyZWF0ZUZsb2F0V2luZG93XCI7XG5pbXBvcnQgeyBjcmVhdGVUcmlnZ2VyIH0gZnJvbSBcIi4vY3JlYXRlVHJpZ2dlclwiO1xuaW1wb3J0IHsga2V5ZG93biB9IGZyb20gXCIuL2hvdEtleVwiO1xuaW1wb3J0IHJlc3RvcmVEYXRhRnJvbVN0b3JhZ2UgZnJvbSBcIi4vcmVzdG9yZURhdGFGcm9tU3RvcmFnZVwiO1xuaW1wb3J0IHsgY2xlYXJDYWNoZSwgaW5qZWN0UGF0aEZvckZvcm1FbGVtZW50LCBzZXRDYWNoZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgdXVpZCBmcm9tIFwidXVpZFwiO1xuaW1wb3J0IGFkanVzdG1lbnRGbG9hdFdpbmRpd1BvcyBmcm9tIFwiLi9hZGp1c3RtZW50RmxvYXRXaW5kaXdQb3NcIjtcbmxldCBlbmFibGUgPSBmYWxzZTtcbmxldCB0cmlnZ2VyO1xubGV0IGN1cnJGb2N1c0lkID0gXCJcIjtcbmxldCBzdXBwb3J0VXJscyA9IFtdO1xuY29uc3QgdjEgPSB1dWlkLnYxO1xuLyoqIOeCueWHu+iusOS9jyAqL1xuY29uc3Qgb25SZW1lbWJlciA9IChpZCkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWF1dG9maWxsPVwiJHtpZH1cIl1gKTtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHRhcmdldC5kYXRhc2V0LmF1dG9maWxsUGF0aDtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBzZXRDYWNoZShrZXksIHRhcmdldC52YWx1ZSk7XG4gICAgICAgICQoYCMke2lkfWApLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgIH1cbn07XG4vKiog54K55Ye75riF6ZmkICovXG5jb25zdCBvbkNsZWFyID0gKGlkKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtYXV0b2ZpbGw9XCIke2lkfVwiXWApO1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdGFyZ2V0LmRhdGFzZXQuYXV0b2ZpbGxQYXRoO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICBjbGVhckNhY2hlKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgJChgIyR7aWR9YCkuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgfVxufTtcbi8vIOeCueWHu+inpuWPkeWZqFxuY29uc3Qgb25DbGljayA9IChlKSA9PiB7XG4gICAgaWYgKGN1cnJGb2N1c0lkICE9PSBcIlwiICYmIGVuYWJsZSkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyRm9jdXNJZCk7XG4gICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBjdXJyRm9jdXNJZCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IChlbmFibGUgPSAhZW5hYmxlKSA/IFwiYmx1ZVwiIDogXCJncmF5XCI7XG59O1xuLyoqIOmhtemdouS4iuavj+S4quihqOWNleeahOiBmueEpuS6i+S7tiAqL1xuY29uc3Qgb25Gb2N1cyA9IChpZCwgZWxlKSA9PiB7XG4gICAgY3VyckZvY3VzSWQgPSBpZDtcbiAgICBlbmFibGUgJiYgJChgIyR7aWR9YCkuY3NzKFwiZGlzcGxheVwiLCBcImZsZXhcIik7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGFkanVzdG1lbnRGbG9hdFdpbmRpd1BvcyhkaXYsIGVsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG59O1xuLyoqIOWHhuWkh+WIm+W7uua1rueqlyAqL1xuY29uc3QgcmVhZHlDcmVhdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgYWxsRm9ybSA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKEZPUk1FTEVNRU5UKV1cbiAgICAgICAgLmZpbHRlcigoZWxlKSA9PiBlbGUudHlwZSAhPT0gXCJzdWJtaXRcIilcbiAgICAgICAgLm1hcCgoZWxlKSA9PiB7XG4gICAgICAgIGlmICghZWxlLmRhdGFzZXQuYXV0b2ZpbGwpIHtcbiAgICAgICAgICAgIGVsZS5kYXRhc2V0LmF1dG9maWxsID0gdjEoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlO1xuICAgIH0pO1xuICAgIGFsbEZvcm0uZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkID0gZWxlLmRhdGFzZXQuYXV0b2ZpbGw7XG4gICAgICAgIGNvbnN0IERPTVJlY3QgPSBlbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGVsZS5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgKCkgPT4ge1xuICAgICAgICAgICAgb25Gb2N1cyhpZCwgZWxlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNyZWF0ZUZsb2F0V2luZG93KERPTVJlY3QsIGlkLCBvblJlbWVtYmVyLCBvbkNsZWFyKTtcbiAgICB9KTtcbn07XG5jb25zdCBvbktleWRvd24gPSAoZSkgPT4ge1xuICAgIGtleWRvd24oZSwgdHJpZ2dlcik7XG59O1xuY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgY29uc3QgcGF0aHMgPSBpbmplY3RQYXRoRm9yRm9ybUVsZW1lbnQoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gICAgcmVzdG9yZURhdGFGcm9tU3RvcmFnZShwYXRocyk7XG4gICAgcmVhZHlDcmVhdGUoKTtcbiAgICBpZiAoZW5hYmxlKSB7XG4gICAgICAgIHRyaWdnZXIgJiYgdHJpZ2dlci5jbGljaygpO1xuICAgIH1cbiAgICB0cmlnZ2VyID0gY3JlYXRlVHJpZ2dlcigpO1xuICAgIHRyaWdnZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uQ2xpY2spO1xuICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uQ2xpY2spO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleWRvd24pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleWRvd24pO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlYWR5Q3JlYXRlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZWFkeUNyZWF0ZSk7XG59O1xuY29uc3Qgc3VwcG9ydCA9ICh1cmwpID0+IHtcbiAgICBjb25zdCBpc0V4aXN0cyA9IHVybC5zb21lKChpdGVtKSA9PiBpdGVtLnN0YXJ0c1dpdGgobG9jYXRpb24ub3JpZ2luKSk7XG4gICAgaWYgKGlzRXhpc3RzKVxuICAgICAgICBzdGFydCgpO1xufTtcbmNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFwiYXV0b2ZpbGxcIiwgKHsgYXV0b2ZpbGwgfSkgPT4ge1xuICAgIGlmIChhdXRvZmlsbCkge1xuICAgICAgICBjb25zdCB1cmxzID0gYXV0b2ZpbGxcbiAgICAgICAgICAgIC5zcGxpdCgvW1xcclxcbl0vKVxuICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgLmZpbHRlcigoaXRlbSkgPT4gIWl0ZW0uc3RhcnRzV2l0aChcIiNcIikpXG4gICAgICAgICAgICAubWFwKChpdGVtKSA9PiBpdGVtLnRyaW0oKSk7XG4gICAgICAgIHN1cHBvcnRVcmxzID0gdXJscztcbiAgICAgICAgc3VwcG9ydCh1cmxzKTtcbiAgICB9XG59KTtcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigoZGF0YSkgPT4ge1xuICAgIGNvbnN0IHsgdHlwZSB9ID0gZGF0YTtcbiAgICBpZiAodHlwZSA9PT0gXCJwYWdlVXBkYXRlXCIpIHtcbiAgICAgICAgc3VwcG9ydChzdXBwb3J0VXJscyk7XG4gICAgfVxufSk7XG5leHBvcnQgeyBlbmFibGUgfTtcbiIsImltcG9ydCB7IGdldENhY2hlIH0gZnJvbSBcIi4vdXRpbHNcIjtcbi8qKiDmgaLlpI3mlbDmja4gKi9cbmV4cG9ydCBkZWZhdWx0IChwYXRocykgPT4ge1xuICAgIGNvbnN0IGV2ZW50VGFyZ2V0ID0gbmV3IEV2ZW50KFwiaW5wdXRcIiwgeyBidWJibGVzOiB0cnVlIH0pO1xuICAgIHBhdGhzLmZvckVhY2goKHBhdGgpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtYXV0b2ZpbGwtcGF0aD1cIiR7cGF0aH1cIl1gKTtcbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgbGV0IGNhY2hlID0gZ2V0Q2FjaGUocGF0aCk7XG4gICAgICAgICAgICBpZiAoY2FjaGUpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZhbHVlID0gY2FjaGU7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnRUYXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuIiwiZXhwb3J0IGNvbnN0IHNldENhY2hlID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG59O1xuZXhwb3J0IGNvbnN0IGdldENhY2hlID0gKGtleSkgPT4ge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xufTtcbmV4cG9ydCBjb25zdCBjbGVhckNhY2hlID0gKGtleSkgPT4ge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xufTtcbmV4cG9ydCBjb25zdCByaWdodEZvcm1FbGVtZW50ID0gKGVsZSkgPT4ge1xuICAgIGlmIChlbGUudGFnTmFtZSA9PT0gXCJBXCIgfHwgZWxlLnRhZ05hbWUgPT09IFwiUFwiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIEZPUk1FTEVNRU5ULmluZGV4T2YoZWxlLnRhZ05hbWUudG9Mb2NhbGVMb3dlckNhc2UoKSkgIT09IC0xO1xufTtcbi8qKiDnu5nkuIvkuIDkuKrlhYTlvJ/lhYPntKDms6jlhaXntKLlvJUgKi9cbmV4cG9ydCBjb25zdCBpbmplY3RQYXRoRm9yTmV4dEVsZW1lbnQgPSAoZWxlLCBwYXRoLCBwYXRocykgPT4ge1xuICAgIGlmICghZWxlKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKHJpZ2h0Rm9ybUVsZW1lbnQoZWxlKSkge1xuICAgICAgICBsZXQgbGFzdFBhdGggPSBOdW1iZXIocGF0aC5zbGljZSgtMSkpICsgMTtcbiAgICAgICAgbGV0IGZpbmFsUGF0aCA9IHBhdGguc2xpY2UoMCwgLTEpICsgbGFzdFBhdGg7XG4gICAgICAgIHBhdGhzLnB1c2goZmluYWxQYXRoKTtcbiAgICAgICAgZWxlLmRhdGFzZXQuYXV0b2ZpbGxQYXRoID0gZmluYWxQYXRoO1xuICAgIH1cbiAgICBpbmplY3RQYXRoRm9yTmV4dEVsZW1lbnQoZWxlLm5leHRFbGVtZW50U2libGluZywgcGF0aCwgcGF0aHMpO1xufTtcbi8qKiDnu5nmiYDmnInooajljZXlhYPntKDms6jlhaUgZG9tIOWxgue6p+e0ouW8lSAqL1xuZXhwb3J0IGNvbnN0IGluamVjdFBhdGhGb3JGb3JtRWxlbWVudCA9IChjaGlsZHJlbiwgcGF0aCA9IFwiXCIsIHBhdGhzID0gW10pID0+IHtcbiAgICBBcnJheS5mcm9tKGNoaWxkcmVuKS5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW46IGl0ZW1DaGlsZCB9ID0gaXRlbTtcbiAgICAgICAgbGV0IGZpbmFsUGF0aCA9IHBhdGggPT09IFwiXCIgPyBpICsgXCJcIiA6IHBhdGggKyBcIi1cIiArIGk7XG4gICAgICAgIGlmIChpdGVtQ2hpbGQgJiYgaXRlbUNoaWxkLmxlbmd0aCkge1xuICAgICAgICAgICAgaW5qZWN0UGF0aEZvckZvcm1FbGVtZW50KGl0ZW1DaGlsZCwgZmluYWxQYXRoLCBwYXRocyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpdGVtLmRhdGFzZXQuYXV0b2ZpbGxQYXRoKSB7XG4gICAgICAgICAgICBpZiAocmlnaHRGb3JtRWxlbWVudChpdGVtKSkge1xuICAgICAgICAgICAgICAgIHBhdGhzLnB1c2goZmluYWxQYXRoKTtcbiAgICAgICAgICAgICAgICBpdGVtLmRhdGFzZXQuYXV0b2ZpbGxQYXRoID0gZmluYWxQYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGluamVjdFBhdGhGb3JOZXh0RWxlbWVudChpdGVtLm5leHRFbGVtZW50U2libGluZywgZmluYWxQYXRoLCBwYXRocyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhdGhzO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gdXVpZDsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IG1vZHVsZVsnZGVmYXVsdCddIDpcblx0XHQoKSA9PiBtb2R1bGU7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvbnRlbnRfc2NyaXB0cy9pbmRleC50c1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=