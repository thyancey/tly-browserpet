!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/tly-browserpet/",n(n.s=101)}({101:function(e,t,n){"use strict";var o;n.r(t),function(e){e[e.React=0]="React",e[e.Content=1]="Content"}(o||(o={}));var r=function(e,t,n){var r=function(e,t){return console.log("validateSender",t),t.id===chrome.runtime.id&&e.from===o.React}(e,t);if(console.log("got message",e.message),r&&"Hello from React"===e.message&&n("Hello from content.js"),r&&"delete logo"===e.message){var l,u=document.getElementById("hplogo");null===u||void 0===u||null===(l=u.parentElement)||void 0===l||l.removeChild(u)}};console.log("[content.ts] Main"),chrome.runtime.onMessage.addListener(r)}});
//# sourceMappingURL=content.js.map