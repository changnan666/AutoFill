import { enable } from ".";
import { setCache } from "./utils";

const ua = navigator.userAgent;
const isMac = /Mac/i.test(ua);
const isWin = /windows/i.test(ua);

const toggleTrigger = (trigger: HTMLElement) => {
  const status = $(trigger).css("display");
  const display = status === "block" ? "none" : "block";

  $(trigger).css({ display });
  setCache("autoFill", display);

  if (display === "none" && enable) {
    trigger.click();
  }
};

// [ctrl/command] + shift + f
export const keydown = (e: KeyboardEvent, trigger: HTMLElement) => {
  if (isMac) {
    const { metaKey, key, shiftKey } = e;
    if (metaKey && shiftKey && key.toLocaleLowerCase() === "f") {
      e.preventDefault();
      toggleTrigger(trigger);
    }
  }

  if (isWin) {
    const { ctrlKey, key, shiftKey } = e;
    if (ctrlKey && shiftKey && key.toLocaleLowerCase() === "f") {
      e.preventDefault();
      toggleTrigger(trigger);
    }
  }
};
