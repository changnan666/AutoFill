import { enable } from ".";
import adjustmentFloatWindiwPos from "./adjustmentFloatWindiwPos";

/** 创建方向控制器 */
const createDirectionController = (div: HTMLElement) => {};

/** 创建功能浮窗 */
export default (
  DOMRect: DOMRect,
  id: string,
  onRemember: (id: string) => void,
  onClear: (id: string) => void
) => {
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

  const remember = $(
    `<span style="margin-right: 10px;padding-right: 10px;border-right: 1px solid #ddd;cursor: pointer">记住</span>`
  ).on("click", () => onRemember(id));

  const clear = $(`<span style="cursor: pointer">清除</span>`).on("click", () =>
    onClear(id)
  );

  $(div).html("");
  $(div).append(remember, clear);

  enable && $(div).css({ display: "flex" });

  createDirectionController(div);
  adjustmentFloatWindiwPos(div, DOMRect);

  return div;
};
