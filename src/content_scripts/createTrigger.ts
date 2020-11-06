import { getCache } from "./utils";

/** 创建触发器 */
export const createTrigger = () => {
  const display = getCache("autoFill") || "block";
  let div: HTMLDivElement | null = null;

  const existsTarget = document.getElementById(
    "autoFillTrigger"
  ) as HTMLDivElement;

  if (existsTarget) {
    div = existsTarget;
  } else {
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
