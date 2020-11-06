export const setCache = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};

export const getCache = (key: string) => {
  return localStorage.getItem(key);
};

export const clearCache = (key: string) => {
  return localStorage.removeItem(key);
};

export const rightFormElement = (ele: HTMLElement) => {
  if (ele.tagName === "A" || ele.tagName === "P") return false;
  return FORMELEMENT.indexOf(ele.tagName.toLocaleLowerCase()) !== -1;
};

/** 给下一个兄弟元素注入索引 */
export const injectPathForNextElement = (
  ele: HTMLElement,
  path: string,
  paths: string[]
) => {
  if (!ele) return;

  if (rightFormElement(ele)) {
    let lastPath = Number(path.slice(-1)) + 1;
    let finalPath = path.slice(0, -1) + lastPath;
    paths.push(finalPath);
    ele.dataset.autofillPath = finalPath;
  }

  injectPathForNextElement(ele.nextElementSibling as HTMLElement, path, paths);
};

/** 给所有表单元素注入 dom 层级索引 */
export const injectPathForFormElement = (
  children: HTMLElement[],
  path: string = "",
  paths: string[] = []
) => {
  Array.from(children).forEach((item, i) => {
    const { children: itemChild } = item;
    let finalPath = path === "" ? i + "" : path + "-" + i;

    if (itemChild && itemChild.length) {
      injectPathForFormElement(itemChild as any, finalPath, paths);
    }

    if (!item.dataset.autofillPath) {
      if (rightFormElement(item)) {
        paths.push(finalPath);
        item.dataset.autofillPath = finalPath;
      }
    }

    injectPathForNextElement(
      item.nextElementSibling as HTMLElement,
      finalPath,
      paths
    );
  });

  return paths;
};
