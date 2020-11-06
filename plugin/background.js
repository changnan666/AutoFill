/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*****************************************!*\
  !*** ./src/background_scripts/index.ts ***!
  \*****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hdXRvLWZpbGwvLi9zcmMvYmFja2dyb3VuZF9zY3JpcHRzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTCxDQUFDIiwiZmlsZSI6ImJhY2tncm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmxldCB0aW1lciA9IG51bGw7XG5jaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoKGlkKSA9PiB7XG4gICAgaWYgKHRpbWVyKVxuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGlkLCB7XG4gICAgICAgICAgICB0eXBlOiBcInBhZ2VVcGRhdGVcIixcbiAgICAgICAgfSk7XG4gICAgfSwgMzAwKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==