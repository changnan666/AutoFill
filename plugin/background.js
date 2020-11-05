"use strict";
let timer = null;
chrome.tabs.onUpdated.addListener((id) => {
    if (timer)
        clearTimeout(timer);
    timer = setTimeout(() => {
        chrome.tabs.sendMessage(id, {
            type: "pageUpdate",
        });
    }, 300);
});
