import { getCache } from "./utils";

/** 恢复数据 */
export default (paths: string[]) => {
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
