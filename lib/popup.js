"use strict";
let timer = null;
chrome.storage.sync.get("autofill", ({ autofill }) => {
    if (autofill) {
        $("textarea").val(autofill);
    }
});
$("textarea").on("input", (e) => {
    // @ts-ignore
    chrome.storage.sync.set({ autofill: e.target.value });
});
//# sourceMappingURL=popup.js.map