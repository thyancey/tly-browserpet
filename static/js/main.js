!function(n){function e(e){for(var r,c,a=e[0],u=e[1],s=e[2],d=0,f=[];d<a.length;d++)c=a[d],Object.prototype.hasOwnProperty.call(o,c)&&o[c]&&f.push(o[c][0]),o[c]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(n[r]=u[r]);for(l&&l(e);f.length;)f.shift()();return i.push.apply(i,s||[]),t()}function t(){for(var n,e=0;e<i.length;e++){for(var t=i[e],r=!0,a=1;a<t.length;a++){var u=t[a];0!==o[u]&&(r=!1)}r&&(i.splice(e--,1),n=c(c.s=t[0]))}return n}var r={},o={2:0},i=[];function c(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,c),t.l=!0,t.exports}c.e=function(n){var e=[],t=o[n];if(0!==t)if(t)e.push(t[2]);else{var r=new Promise((function(e,r){t=o[n]=[e,r]}));e.push(t[2]=r);var i,a=document.createElement("script");a.charset="utf-8",a.timeout=120,c.nc&&a.setAttribute("nonce",c.nc),a.src=function(n){return c.p+"static/js/"+({}[n]||n)+"."+{4:"f9b24604"}[n]+".chunk.js"}(n);var u=new Error;i=function(e){a.onerror=a.onload=null,clearTimeout(s);var t=o[n];if(0!==t){if(t){var r=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;u.message="Loading chunk "+n+" failed.\n("+r+": "+i+")",u.name="ChunkLoadError",u.type=r,u.request=i,t[1](u)}o[n]=void 0}};var s=setTimeout((function(){i({type:"timeout",target:a})}),12e4);a.onerror=a.onload=i,document.head.appendChild(a)}return Promise.all(e)},c.m=n,c.c=r,c.d=function(n,e,t){c.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},c.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},c.t=function(n,e){if(1&e&&(n=c(n)),8&e)return n;if(4&e&&"object"===typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(c.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)c.d(t,r,function(e){return n[e]}.bind(null,r));return t},c.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return c.d(e,"a",e),e},c.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},c.p="./",c.oe=function(n){throw console.error(n),n};var a=this["webpackJsonptly-browserpet"]=this["webpackJsonptly-browserpet"]||[],u=a.push.bind(a);a.push=e,a=a.slice();for(var s=0;s<a.length;s++)e(a[s]);var l=u;i.push([57,3]),t()}({100:function(n,e,t){"use strict";t.r(e);var r=t(1),o=t(0),i=t.n(o),c=t(29),a=t.n(c),u=t(26),s=t(4),l=t(2),d=t(3);function f(){var n=Object(l.a)(["\n  *{\n    margin: 0;\n    padding: 0;\n    outline:0;\n    box-sizing:border-box;\n  }\n\n  /* prevent text selection */\n  * {\n    -webkit-touch-callout: none; /* iOS Safari */\n      -webkit-user-select: none; /* Safari */\n      -khtml-user-select: none; /* Konqueror HTML */\n        -moz-user-select: none; /* Firefox */\n          -ms-user-select: none; /* Internet Explorer/Edge */\n              user-select: none; /* Non-prefixed version, currently\n                                    supported by Chrome and Opera */\n    -webkit-tap-highlight-color: rgba(0,0,0,0);\n    -webkit-tap-highlight-color: transparent;\n  }\n  \n  #root{\n    margin:0 auto;\n  }\n  h1, h2, h3, h4{\n    font-family: 'Bevan', cursive;\n  }\n  a, p, span, h5, h6{\n    font-family: 'Cabin', sans-serif;\n  }\n  h1{\n    font-size: 5rem;\n  }\n  h2{\n    font-size: 4rem;\n  }\n  h3{\n    font-size: 3.5rem;\n  }\n  h4{\n    font-size: 2.5rem;\n  }\n  h5{\n    font-size: 2rem;\n  }\n  p, span{\n    font-size:1.5rem;\n    line-height: 1.5rem;\n  }\n\n  html{\n    font-size: 62.5%;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    font-family: 'Cabin', sans-serif;\n    background-color: black;\n    color: white;\n  }\n  \n  code {\n    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;\n  }\n"]);return f=function(){return n},n}var b=Object(d.a)(f()),h=function(n){return g.colors[n]},m=function(n,e){var t=p[n]||n,r=parseInt(t.substring(1,3),16),o=parseInt(t.substring(3,5),16),i=parseInt(t.substring(5,7),16);return r=Math.round(r*(100+e)/100),o=(o=Math.round(o*(100+e)/100))<255?o:255,i=(i=Math.round(i*(100+e)/100))<255?i:255,"#"+(1===(r=r<255?r:255).toString(16).length?"0"+r.toString(16):r.toString(16))+(1===o.toString(16).length?"0"+o.toString(16):o.toString(16))+(1===i.toString(16).length?"0"+i.toString(16):i.toString(16))},p={black:"#000000",grey:"#373737",grey_light:"#A39F8E",white:"#fef8dd",blue:"#1fb9f3",green:"#51f249",yellow:"#fff249",red:"#F55658",purple:"#6b1ff3"},g={colors:p,shadows:{z1:"-0.1rem 0.1rem .25rem .1rem rgba(0,0,0,0.16)",z2:"-0.1rem 0.1rem .25rem .1rem rgba(0,0,0,0.36)",z3:"-.2rem .5rem 1rem .2rem rgba(0,0,0,.36)"},breakpoints:{mobile_tiny:"300px",mobile_medium:"400px",mobile_large:"500px",tablet:"768px",desktop:"1024px"}};function j(){var n=Object(l.a)(["\n  border:0;\n  margin:0;\n  font-size:2rem;\n  padding:.5rem 1rem;\n  background-color: ",";\n  border: .5rem solid ",";\n  border-radius: 1rem;\n\n  margin-top:2rem;\n  text-align:center;\n  cursor:pointer;\n"]);return j=function(){return n},n}function v(){var n=Object(l.a)(["\n  font-size:2rem;\n  text-align:left;\n"]);return v=function(){return n},n}function O(){var n=Object(l.a)(["\n  padding:1rem;\n  color: ",";\n  min-width:30rem;\n"]);return O=function(){return n},n}var x=d.c.div(O(),h("blue")),w=d.c.h1(v()),y=d.c.button(j(),h("green"),h("white")),k=function(){var n=Object(s.f)().push;return Object(r.jsxs)(x,{children:[Object(r.jsx)(w,{children:"About BrowserPet"}),Object(r.jsx)("p",{children:"\xa9 Tom Yancey 2022"}),Object(r.jsx)(y,{onClick:function(){n("/")},children:"BACK"})]})},S=function(){return Object(u.b)()},E=u.c,z=t(5),I=t(25);function P(){var n=Object(l.a)(["\n  position:absolute;\n  top:0;\n  left:0;\n  height:100%; \n  transition: width .3s ease-in-out, background-color .5s ease-in-out;\n  background-color: ",";\n"]);return P=function(){return n},n}function C(){var n=Object(l.a)(["\n  position: relative;\n  font-size: 1.5rem;\n  font-weight: bold;\n  z-index:1;\n"]);return C=function(){return n},n}function M(){var n=Object(l.a)(["\n  position:relative;\n  border:.5rem solid ",";\n  border-radius: 1rem;\n  overflow:hidden;\n  padding:.25rem .5rem;\n  text-align:center;\n  background-color: ",";\n\n  box-shadow: 0px -2px 4px ",";\n"]);return M=function(){return n},n}function A(){var n=Object(l.a)(["\n  font-size: 1rem;\n"]);return A=function(){return n},n}function L(){var n=Object(l.a)(["\n  display:inline-block;\n  width:calc(50% - 1rem);\n  margin-right:1rem;\n"]);return L=function(){return n},n}var T=d.c.div(L()),F=d.c.h4(A()),_=d.c.div(M(),h("white"),h("white"),m("white",-40)),D=d.c.span(C()),B=d.c.div(P(),h("blue")),V=function(n){var e=n.label,t=n.max,o=n.value,i=Math.round(o/t*1e3)/10;return Object(r.jsxs)(T,{children:[Object(r.jsx)(F,{children:e.toLocaleUpperCase()}),Object(r.jsxs)(_,{children:[Object(r.jsx)(D,{children:"".concat(Object(I.b)(o)," / ").concat(t)}),Object(r.jsx)(B,{style:{width:"".concat(i,"%")}})]})]})};function J(){var n=Object(l.a)(["\n  width:100%;\n"]);return J=function(){return n},n}var N=d.c.div(J()),R=function(){var n=E(z.d);return Object(r.jsx)(N,{children:n.map((function(n,e){return Object(r.jsx)(V,{label:n.label,max:n.max,value:n.currentValue},e)}))})};function q(){var n=Object(l.a)(["\n  text-align:right;\n  color: ",";\n"]);return q=function(){return n},n}function K(){var n=Object(l.a)(["\n  text-align:left;\n  display:inline-block;\n  flex:1;\n"]);return K=function(){return n},n}function H(){var n=Object(l.a)(["\n  color: ",";\n  width:100%;\n  display:flex;\n  flex-direction: row;\n\n  h4{\n    margin-top:1rem;\n    margin-bottom:.5rem;\n  }\n"]);return H=function(){return n},n}function U(){var n=Object(l.a)(["\n  margin-top:1rem;\n  padding-left:1rem;\n"]);return U=function(){return n},n}function Y(){var n=Object(l.a)(["\n  margin-top:1rem;\n  margin-bottom:.5rem;\n"]);return Y=function(){return n},n}function G(){var n=Object(l.a)(["\n  width:100%;\n"]);return G=function(){return n},n}function Q(){var n=Object(l.a)(["\n  width:100%;\n  height:16rem;\n\n  font-size: 1.5rem;\n  line-height: 1.5rem;\n  padding: 0.25rem .5rem .5rem .5rem;\n  font-weight:500;\n  \n  background-color:",";\n  color: black;\n  \n  border:.5rem solid ",";\n  border-radius:1rem;\n\n  overflow-y:auto;\n\n  hr{\n    border-color:",";\n    border-style:dashed;\n    margin-top:.5rem;\n    margin-bottom:.5rem;\n\n    margin-left:10%;\n    width:80%;\n  }\n\n"]);return Q=function(){return n},n}var W=d.c.div(Q(),h("green"),h("white"),h("blue")),X=d.c.div(G()),Z=d.c.h4(Y()),$=d.c.p(U()),nn=d.c.div(H(),h("black")),en=d.c.h4(K()),tn=d.c.div(q(),h("black")),rn=function(){var n=E(z.c)||{};return Object(r.jsxs)(W,{children:[Object(r.jsxs)(nn,{children:[Object(r.jsx)(en,{children:n.name}),Object(r.jsx)(tn,{children:Object(r.jsx)("h4",{children:"L-".concat(n.level)})})]}),Object(r.jsx)("hr",{}),Object(r.jsx)(R,{}),Object(r.jsx)("hr",{}),Object(r.jsxs)(X,{children:[Object(r.jsx)(Z,{children:"Description"}),Object(r.jsx)($,{children:n.info})]})]})};function on(){var n=Object(l.a)(["\n    background-color:",";\n    padding-bottom: .75rem;\n    padding-top: .5rem;\n    transition: padding .2s ease-out, background-color .2s ease-out;\n\n    &:hover{\n      background-color:",";\n    }\n  "]);return on=function(){return n},n}function cn(){var n=Object(l.a)(["\n  list-style:none;\n  margin:none;\n  \n  display:inline-block;\n  vertical-align:bottom;\n  background-color:white;\n  color: black;\n\n  font-size:2rem;\n  line-height:2rem;\n  font-weight:bold;\n  padding: .25rem 1rem;\n  padding-bottom: 0rem;\n  margin-right:.25rem;\n\n  border:.5rem solid ",";\n  border-radius:1rem 1rem 0 0;\n\n  background-color:",";\n  border-bottom-color: ",";\n  color:",";\n  transition: padding-bottom .1s ease-in-out, background-color .1s ease-in-out;\n\n  &:hover{\n    background-color:",";\n  }\n  \n  ",";\n\n  cursor:pointer;\n"]);return cn=function(){return n},n}function an(){var n=Object(l.a)(["\n  width:100%;\n  margin-bottom:-.5rem;\n  padding-left:1rem;\n  position:absolute;\n  left:0;\n  bottom:100%;\n"]);return an=function(){return n},n}function un(){var n=Object(l.a)(["\n  margin-top: -1rem;\n  position:relative;\n"]);return un=function(){return n},n}var sn=d.c.div(un()),ln=d.c.ul(an()),dn=d.c.li(cn(),h("white"),h("blue"),h("white"),h("black"),m("blue",20),(function(n){return n.isActive&&Object(d.b)(on(),h("green"),m("green",40))})),fn=function(){var n=E(z.e),e=S();return Object(r.jsxs)(sn,{children:[Object(r.jsx)(ln,{children:n.map((function(n,t){return Object(r.jsx)(dn,{onClick:function(){return e(Object(z.h)(t))},isActive:n.isActive,children:t+1},t)}))}),Object(r.jsx)(rn,{})]})},bn=t(12),hn=t(56);var mn=function(n,e,t){var r=Object(o.useRef)();Object(o.useEffect)((function(){var o=(null===t||void 0===t?void 0:t.current)||window;if(o&&o.addEventListener){r.current!==e&&(r.current=e);var i=function(n){(null===r||void 0===r?void 0:r.current)&&r.current(n)};return o.addEventListener(n,i),function(){o.removeEventListener(n,i)}}}),[n,t,e])};var pn=function(n,e){var t=function(){if("undefined"===typeof window)return e;try{var t=window.localStorage.getItem(n);return t?function(n){try{return"undefined"===n?void 0:JSON.parse(null!==n&&void 0!==n?n:"")}catch(e){return void console.log("parsing error on",{value:n})}}(t):e}catch(r){return console.warn("Error reading localStorage key \u201c".concat(n,"\u201d:"),r),e}},r=Object(o.useState)(t),i=Object(bn.a)(r,2),c=i[0],a=i[1];Object(o.useEffect)((function(){a(t())}),[]);var u=function(){a(t())};return mn("storage",u),mn("local-storage",u),[c,function(e){"undefined"==typeof window&&console.warn("Tried setting localStorage key \u201c".concat(n,"\u201d even though environment is not a client"));try{var t=e instanceof Function?e(c):e;window.localStorage.setItem(n,JSON.stringify(t)),a(t),window.dispatchEvent(new Event("local-storage"))}catch(r){console.warn("Error setting localStorage key \u201c".concat(n,"\u201d:"),r)}}]};var gn=t(21),jn=t(20),vn=Object(gn.a)({reducer:{petStore:z.b,ui:jn.a}}),On={config:{},pets:[]},xn=function(){var n=S(),e=Object(o.useState)(!1),t=Object(bn.a)(e,2),r=t[0],i=t[1],c=pn("browserpet",On),a=Object(bn.a)(c,1)[0];return Object(o.useEffect)((function(){r||(i(!0),function(n,e){var t="assets/data.jsonc";fetch(t,{mode:"cors"}).then((function(n){return n.text()})).then((function(n){return hn.jsonc.parse(n)}),(function(n){console.error("Error fretching item from ".concat(t),n)})).then((function(t){return console.log("data was read successfully",t),console.log("saved data was read successfully",e),t.forEach((function(t){var r=(null===e||void 0===e?void 0:e.pets.find((function(n){return n.id===t.id})))||null;n(Object(z.i)({petDefinition:t,initialState:r}))})),e.config.activePet&&n(Object(z.g)(e.config.activePet)),!0}),(function(n){console.error("Error parsing (the url (".concat(t,") was bad), skipping"),(null===n||void 0===n?void 0:n.stack)||n)}))}(n,a))}),[r,a,i]),null};var wn=function(n,e){var t=Object(o.useRef)(n);Object(o.useLayoutEffect)((function(){t.current=n}),[n]),Object(o.useEffect)((function(){if(e||0===e){var n=setInterval((function(){return t.current()}),e);return function(){return clearInterval(n)}}}),[e])},yn=function(){var n=i.a.useState(0),e=Object(bn.a)(n,2),t=e[0],r=e[1],o=S();return wn((function(){r(t+1),o(Object(jn.b)()),1e3*(t+1)%5e3===0&&o(Object(z.j)())}),1e3),null},kn=function(){var n=pn("browserpet",On),e=Object(bn.a)(n,2),t=(e[0],e[1]),r=E(z.f);return Object(o.useEffect)((function(){r.config.activePet&&(console.log("(saving)",r),t((function(){return r})))}),[r]),null},Sn=function(){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(kn,{}),Object(r.jsx)(xn,{}),Object(r.jsx)(yn,{})]})};function En(){var n=Object(l.a)(["\n  position: absolute;\n  right: 12.5rem;\n\n  background-color: ",";\n  border:.5rem solid ",";\n  border-radius:2rem 0 0 0;\n\n  padding: 0.5rem 2rem 0rem;\n  bottom: -0.5rem;\n\n  color: ",";\n  text-shadow: 1px 1px 1px ",";\n\n  font-size:1.5rem;\n  line-height:2rem;\n  font-weight:bold;\n  cursor: pointer;\n  &:hover{\n    background-color: ",";\n  }\n"]);return En=function(){return n},n}function zn(){var n=Object(l.a)(["\n  position: absolute;\n  right: 1.5rem;\n\n  background-color: ",";\n  border:.5rem solid ",";\n  border-radius:2rem 0 0 0;\n\n  padding: 0.5rem 2rem 0rem;\n  bottom: -0.5rem;\n\n  color: ",";\n  text-shadow: 1px 1px 1px ",";\n\n  font-size:1.5rem;\n  line-height:2rem;\n  font-weight:bold;\n  cursor: pointer;\n  &:hover{\n    background-color: ",";\n  }\n"]);return zn=function(){return n},n}function In(){var n=Object(l.a)(["\n  background-size:contain;\n  background-repeat:no-repeat;\n  background-position:center;\n  width:100%;\n  height:100%;\n  text-align:center;\n"]);return In=function(){return n},n}function Pn(){var n=Object(l.a)(["\n  background-color: ",";\n  border:.5rem solid ",";\n  border-radius:1rem 0 0 0;\n  width: 100%;\n  height: 30rem;\n\n  padding-bottom: 1rem;\n"]);return Pn=function(){return n},n}function Cn(){var n=Object(l.a)(["\n  font-size:2rem;\n  text-align:left;\n"]);return Cn=function(){return n},n}function Mn(){var n=Object(l.a)(["\n  position:absolute;\n  right:0rem;\n  bottom:-.5rem;\n  width:3rem;\n  height:3rem;\n\n  border-radius:2rem 2rem 0 0;\n  background-color: ",";\n  color: ",";\n\n  font-size:1.5rem;\n  font-weight:bold;\n  text-align:center;\n  line-height:2rem;\n  text-shadow: 1px 1px 1px ",";\n  border: .5rem solid ",";\n\n  cursor:pointer;\n  &:hover{\n    background-color: ",";\n  }\n"]);return Mn=function(){return n},n}function An(){var n=Object(l.a)(["\n  padding:1rem;\n  color: ",";\n  min-width:30rem;\n"]);return An=function(){return n},n}function Ln(){var n=Object(l.a)(["\n  position: relative;  \n"]);return Ln=function(){return n},n}var Tn=d.c.header(Ln()),Fn=d.c.div(An(),h("blue")),_n=d.c.div(Mn(),h("blue"),h("white"),h("black"),h("white"),m("blue",20)),Dn=d.c.h1(Cn()),Bn=d.c.div(Pn(),h("blue"),h("white")),Vn=d.c.div(In()),Jn=d.c.button(zn(),h("blue"),h("white"),h("white"),h("black"),m("blue",20)),Nn=d.c.button(En(),h("red"),h("white"),h("white"),h("black"),m("red",40)),Rn=function(){var n=Object(s.f)().push,e=E(z.c)||{},t=S();return Object(r.jsxs)(Fn,{children:[Object(r.jsxs)(Tn,{children:[Object(r.jsx)(Sn,{}),Object(r.jsx)(Dn,{children:"Browser Pet"}),Object(r.jsx)(Nn,{onClick:function(){t(Object(z.a)())},children:Object(r.jsx)("p",{children:"CLEAR SAVE"})}),Object(r.jsx)(Jn,{onClick:function(){t(Object(z.j)())},children:Object(r.jsx)("p",{children:"FORCE SAVE"})}),Object(r.jsx)(_n,{onClick:function(){n("/about")},children:"?"})]}),Object(r.jsx)(Bn,{children:Object(r.jsx)(Vn,{style:{backgroundImage:"url(".concat(e.image,")")}})}),Object(r.jsx)(fn,{})]})},qn=function(){return Object(r.jsxs)(s.c,{children:[Object(r.jsx)(s.a,{path:"/about",children:Object(r.jsx)(k,{})}),Object(r.jsx)(s.a,{path:"/",children:Object(r.jsx)(Rn,{})})]})},Kn=function(n){n&&n instanceof Function&&t.e(4).then(t.bind(null,102)).then((function(e){var t=e.getCLS,r=e.getFID,o=e.getFCP,i=e.getLCP,c=e.getTTFB;t(n),r(n),o(n),i(n),c(n)}))},Hn=t(23);t(98);a.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(u.a,{store:vn,children:Object(r.jsxs)(Hn.a,{children:[Object(r.jsx)(qn,{}),Object(r.jsx)(b,{})]})})}),document.getElementById("root")),Kn()},20:function(n,e,t){"use strict";t.d(e,"b",(function(){return i})),t.d(e,"c",(function(){return c}));var r=t(21),o=Object(r.b)({name:"ui",initialState:{pingIdx:0,lastSaved:-1},reducers:{pingStore:function(n){n.pingIdx++}}}),i=o.actions.pingStore,c=function(n){return n.ui.pingIdx};e.a=o.reducer},25:function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"a",(function(){return i}));var r=t(14),o=function(n,e){if(!e)return Math.round(n);var t=Math.pow(10,e);return Math.round(n*t)/t},i=function(n,e,t){var o=(t-e)/1e3;return n.map((function(n){return Object(r.a)(Object(r.a)({},n),{},{currentValue:Math.round((e=n.value+n.perSecond*o,t=0,i=n.max,Math.min(Math.max(e,t),i)))});var e,t,i}))}},5:function(n,e,t){"use strict";(function(n){t.d(e,"i",(function(){return l})),t.d(e,"h",(function(){return d})),t.d(e,"g",(function(){return f})),t.d(e,"j",(function(){return b})),t.d(e,"a",(function(){return h})),t.d(e,"f",(function(){return g})),t.d(e,"c",(function(){return j})),t.d(e,"d",(function(){return v})),t.d(e,"e",(function(){return O}));var r=t(14),o=t(21),i=t(16),c=t(25),a=t(20),u=Object(o.b)({name:"petStore",initialState:{activeIdx:0,pets:[],lastSaved:0,savePayload:{config:{activePet:""},pets:[]}},reducers:{triggerSave:function(n){var e,t=(new Date).getTime(),r={config:{activePet:(null===(e=n.pets[n.activeIdx])||void 0===e?void 0:e.id)||""},pets:[]};n.pets.forEach((function(n){var e=Object(c.a)(n.stats,n.timestamp,t).map((function(n){return{id:n.id,value:n.currentValue}}));r.pets.push({id:n.id,stats:e,lastSaved:t})})),n.lastSaved=t,n.savePayload=r},clearSave:function(){n.localStorage.clear(),n.location.reload()},setActiveId:function(n,e){var t=n.pets.findIndex((function(n){return n.id===e.payload}));if(-1===t)throw'Cannot find pet with id "'.concat(e.payload,'"');n.activeIdx=t},setActiveIdx:function(n,e){n.activeIdx=e.payload},setPet:function(n,e){var t=e.payload,o=t.petDefinition,i=t.initialState,c=n.pets.find((function(n){return n.id===o.id})),a=(new Date).getTime(),u=Object(r.a)(Object(r.a)({},o),{},{stats:o.stats.map((function(n){var e=null===i||void 0===i?void 0:i.stats.find((function(e){return e.id===n.id}));return e?Object(r.a)(Object(r.a)({},n),{},{value:e.value}):n})),timestamp:a});c?n.pets=n.pets.map((function(n){return n.id===o.id?u:n})):n.pets.push(u)}}}),s=u.actions,l=s.setPet,d=s.setActiveIdx,f=s.setActiveId,b=s.triggerSave,h=s.clearSave,m=function(n){return n.petStore.activeIdx},p=function(n){return n.petStore.pets},g=function(n){return n.petStore.savePayload},j=Object(i.a)([p,m],(function(n,e){return n[e]})),v=Object(i.a)([j,a.c],(function(n,e){return n&&n.stats?Object(c.a)(n.stats,n.timestamp,(new Date).getTime()):[]})),O=Object(i.a)([p,m],(function(n,e){return n.map((function(n,t){return{name:n.name,id:n.id,isActive:t===e}}))}));e.b=u.reducer}).call(this,t(11))},57:function(n,e,t){n.exports=t(100)},82:function(n,e){},84:function(n,e){},98:function(n,e,t){}});
//# sourceMappingURL=main.js.map