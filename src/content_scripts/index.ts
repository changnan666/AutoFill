import createFloatWindow from "./createFloatWindow";
import { createTrigger } from "./createTrigger";
import { keydown } from "./hotKey";
import restoreDataFromStorage from "./restoreDataFromStorage";
import { clearCache, injectPathForFormElement, setCache } from "./utils";
import uuid from "uuid";
import adjustmentFloatWindiwPos from "./adjustmentFloatWindiwPos";

let enable = false;
let trigger: HTMLElement;
let currFocusId: string = "";
let supportUrls: string[] = [];
const v1 = uuid.v1;

/** 点击记住 */
const onRemember = (id: string) => {
  const target = document.querySelector(
    `[data-autofill="${id}"]`
  ) as HTMLElement;
  if (target) {
    const key = target.dataset.autofillPath;
    // @ts-ignore
    setCache(key, target.value);

    $(`#${id}`).css("display", "none");
  }
};

/** 点击清除 */
const onClear = (id: string) => {
  const target = document.querySelector(
    `[data-autofill="${id}"]`
  ) as HTMLElement;
  if (target) {
    const key = target.dataset.autofillPath;

    if (key) {
      clearCache(key);
    }

    $(`#${id}`).css("display", "none");
  }
};

// 点击触发器
const onClick = (e: MouseEvent) => {
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
const onFocus = (id: string, ele: HTMLElement) => {
  currFocusId = id;
  enable && $(`#${id}`).css("display", "flex");

  const div = document.getElementById(id) as HTMLElement;
  adjustmentFloatWindiwPos(div, ele.getBoundingClientRect());
};

/** 准备创建浮窗 */
const readyCreate = () => {
  const allForm = [...document.querySelectorAll(FORMELEMENT)]
    .filter((ele: any) => ele.type !== "submit")
    .map((ele: any) => {
      if (!ele.dataset.autofill) {
        ele.dataset.autofill = v1();
      }

      return ele;
    }) as HTMLElement[];

  allForm.forEach((ele) => {
    const id = ele.dataset.autofill;
    const DOMRect = ele.getBoundingClientRect();

    ele.addEventListener("focus", () => {
      onFocus(id!, ele);
    });

    createFloatWindow(DOMRect, id!, onRemember, onClear);
  });
};

const onKeydown = (e: KeyboardEvent) => {
  keydown(e, trigger);
};

const start = () => {
  const paths = injectPathForFormElement(document.body.children as any);
  restoreDataFromStorage(paths);

  readyCreate();

  if (enable) {
    trigger && trigger.click();
  }

  trigger = createTrigger();

  trigger.removeEventListener("click", onClick);
  trigger.addEventListener("click", onClick);

  window.removeEventListener("keydown", onKeydown);
  window.addEventListener("keydown", onKeydown);

  window.removeEventListener("resize", readyCreate);
  window.addEventListener("resize", readyCreate);
};

const support = (url: string[]) => {
  const isExists = url.some((item) => item.startsWith(location.origin));
  if (isExists) start();
};

chrome.storage.sync.get("autofill", ({ autofill }) => {
  if (autofill) {
    const urls = autofill
      .split(/[\r\n]/)
      .filter(Boolean)
      .filter((item: string) => !item.startsWith("#"))
      .map((item: string) => item.trim());

    supportUrls = urls;
    support(urls);
  }
});

chrome.runtime.onMessage.addListener((data: MessageProps) => {
  const { type } = data;
  if (type === "pageUpdate") {
    support(supportUrls);
  }
});

export { enable };
