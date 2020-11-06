/** 自动调整浮窗位置 */
export default (ele: HTMLElement, DOMRect: DOMRect) => {
  const { y } = ele.getBoundingClientRect();
  const { height, y: baseY } = DOMRect;

  // 顶部被挡住了
  if (y < 0) {
    $(ele).css({ top: height + baseY });
  }
};
