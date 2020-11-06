import { enable } from ".";
import { setCache } from "./utils";

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
  const { metaKey, ctrlKey, key, shiftKey } = e;
  if (metaKey || ctrlKey) {
    if (metaKey && shiftKey && key.toLocaleLowerCase() === "f") {
      e.preventDefault();
      toggleTrigger(trigger);
    }
  }
};
