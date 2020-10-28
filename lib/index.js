"use strict";
/*
 * @version: v0.0.1
 */
// 全局变量
const FORMELEMENT = "input,textarea,select,radio";
const ua = navigator.userAgent;
const isMac = /Mac/i.test(ua);
const isWin = /windows/i.test(ua);
let enable = false;
let trigger;
// 全局方法
// @ts-ignore
const v1 = uuid.v1;
const rightFormElement = (ele) => {
    if (ele.tagName === "A" || ele.tagName === "P")
        return false;
    return FORMELEMENT.indexOf(ele.tagName.toLocaleLowerCase()) !== -1;
};
const setCache = (key, value) => {
    return localStorage.setItem(key, value);
};
const getCache = (key) => {
    return localStorage.getItem(key);
};
const clearCache = (key) => {
    return localStorage.removeItem(key);
};
// ----------------------------------------------------------------------------------------------------------------
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
/** 恢复数据 */
const restoreDataFromStorage = (paths) => {
    const eventTarget = new Event("input", { bubbles: true });
    paths.forEach((path) => {
        const target = document.querySelector(`[data-autofill-path="${path}"]`);
        if (target) {
            let cache = getCache(path);
            if (cache) {
                // @ts-ignore
                target.value = cache;
                target.dispatchEvent(eventTarget);
            }
        }
    });
};
/** 创建触发器 */
const createTrigger = () => {
    const display = getCache("autoFill") || "block";
    const div = document.createElement("div");
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
    document.body.append(div);
    return div;
};
/** 点击记住 */
const onRemember = (id) => {
    const target = document.querySelector(`[data-autofill="${id}"]`);
    if (target) {
        const key = target.dataset.autofillPath;
        // @ts-ignore
        setCache(key, target.value);
        $(`#${id}`).css("display", "none");
    }
};
/** 点击清除 */
const onClear = (id) => {
    const target = document.querySelector(`[data-autofill="${id}"]`);
    if (target) {
        const key = target.dataset.autofillPath;
        if (key) {
            clearCache(key);
        }
        $(`#${id}`).css("display", "none");
    }
};
// 点击触发器
const onClick = (e) => {
    // @ts-ignore
    e.target.style.backgroundColor = (enable = !enable) ? "blue" : "gray";
};
/** 自动调整浮窗的位置 */
const adjustmentFloatWindiwPos = (ele, DOMRect) => {
    const { y } = ele.getBoundingClientRect();
    const { height, y: baseY } = DOMRect;
    // 顶部被挡住了
    if (y < 0) {
        $(ele).css({ top: height + baseY });
    }
};
/** 创建浮窗 */
const createFloatWindow = (DOMRect, id) => {
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
    adjustmentFloatWindiwPos(div, DOMRect);
    return div;
};
/** 创建浮窗 */
const readyCreate = () => {
    const allForm = [...document.querySelectorAll(FORMELEMENT)]
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
            enable && $(`#${id}`).css("display", "flex");
        });
        createFloatWindow(DOMRect, id);
    });
};
const toggleTrigger = () => {
    const status = $(trigger).css("display");
    const display = status === "block" ? "none" : "block";
    $(trigger).css({ display });
    setCache("autoFill", display);
    if (display === "none" && enable) {
        $(trigger).css({ backgroundColor: "gray" });
    }
};
// [ctrl/command] + shift + key
const keydown = (e) => {
    if (isMac) {
        const { metaKey, key, shiftKey } = e;
        if (metaKey && shiftKey && key.toLocaleLowerCase() === "f") {
            e.preventDefault();
            toggleTrigger();
        }
    }
    if (isWin) {
        const { ctrlKey, key, shiftKey } = e;
        if (ctrlKey && shiftKey && key.toLocaleLowerCase() === "f") {
            e.preventDefault();
            toggleTrigger();
        }
    }
};
const start = () => {
    const paths = injectPathForFormElement(document.body.children);
    restoreDataFromStorage(paths);
    readyCreate();
    trigger = createTrigger();
    trigger.addEventListener("click", onClick);
    window.addEventListener("keydown", keydown);
};
const support = (url) => {
    const isExists = url.some((item) => item.startsWith(location.origin));
    if (isExists)
        start();
};
if (chrome.storage) {
    chrome.storage.sync.get("autofill", ({ autofill }) => {
        if (autofill) {
            const urls = autofill
                .split(/[\s\n]/)
                .filter(Boolean)
                .map((item) => item.trim());
            support(urls);
        }
    });
}
if (location.origin === "http://127.0.0.1:5500")
    start();
//# sourceMappingURL=index.js.map