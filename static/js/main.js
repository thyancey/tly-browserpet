!function(n){function t(t){for(var r,c,a=t[0],u=t[1],l=t[2],s=0,f=[];s<a.length;s++)c=a[s],Object.prototype.hasOwnProperty.call(o,c)&&o[c]&&f.push(o[c][0]),o[c]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(n[r]=u[r]);for(d&&d(t);f.length;)f.shift()();return i.push.apply(i,l||[]),e()}function e(){for(var n,t=0;t<i.length;t++){for(var e=i[t],r=!0,a=1;a<e.length;a++){var u=e[a];0!==o[u]&&(r=!1)}r&&(i.splice(t--,1),n=c(c.s=e[0]))}return n}var r={},o={2:0},i=[];function c(t){if(r[t])return r[t].exports;var e=r[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,c),e.l=!0,e.exports}c.e=function(n){var t=[],e=o[n];if(0!==e)if(e)t.push(e[2]);else{var r=new Promise((function(t,r){e=o[n]=[t,r]}));t.push(e[2]=r);var i,a=document.createElement("script");a.charset="utf-8",a.timeout=120,c.nc&&a.setAttribute("nonce",c.nc),a.src=function(n){return c.p+"static/js/"+({}[n]||n)+"."+{4:"d9fcdca6"}[n]+".chunk.js"}(n);var u=new Error;i=function(t){a.onerror=a.onload=null,clearTimeout(l);var e=o[n];if(0!==e){if(e){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;u.message="Loading chunk "+n+" failed.\n("+r+": "+i+")",u.name="ChunkLoadError",u.type=r,u.request=i,e[1](u)}o[n]=void 0}};var l=setTimeout((function(){i({type:"timeout",target:a})}),12e4);a.onerror=a.onload=i,document.head.appendChild(a)}return Promise.all(t)},c.m=n,c.c=r,c.d=function(n,t,e){c.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:e})},c.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},c.t=function(n,t){if(1&t&&(n=c(n)),8&t)return n;if(4&t&&"object"===typeof n&&n&&n.__esModule)return n;var e=Object.create(null);if(c.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var r in n)c.d(e,r,function(t){return n[t]}.bind(null,r));return e},c.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return c.d(t,"a",t),t},c.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},c.p="./",c.oe=function(n){throw console.error(n),n};var a=this["webpackJsonptly-browserpet"]=this["webpackJsonptly-browserpet"]||[],u=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var d=u;i.push([63,3]),e()}({105:function(n,t,e){},107:function(n,t,e){"use strict";e.r(t);var r=e(1),o=e(0),i=e.n(o),c=e(31),a=e.n(c),u=e(5),l=e(8),d=e(2),s=e(3);function f(){var n=Object(d.a)(["\n    ","\n    border-color: ",";\n    color: ",";\n    background-color: ",";\n  "]);return f=function(){return n},n}function b(){var n=Object(d.a)(["\n    border-radius:2rem;\n    border: .5rem solid;\n  "]);return b=function(){return n},n}function v(){var n=Object(d.a)(["\n  *{\n    margin: 0;\n    padding: 0;\n    outline:0;\n    box-sizing:border-box;\n  }\n\n  /* prevent text selection */\n  * {\n    -webkit-touch-callout: none; /* iOS Safari */\n      -webkit-user-select: none; /* Safari */\n      -khtml-user-select: none; /* Konqueror HTML */\n        -moz-user-select: none; /* Firefox */\n          -ms-user-select: none; /* Internet Explorer/Edge */\n              user-select: none; /* Non-prefixed version, currently\n                                    supported by Chrome and Opera */\n    -webkit-tap-highlight-color: rgba(0,0,0,0);\n    -webkit-tap-highlight-color: transparent;\n  }\n  \n  #root{\n    margin:0 auto;\n    /* for chrome extension */\n    min-width:35rem;\n    min-height:65rem;\n  }\n  h1, h2, h3, h4, h5, h6{\n    font-family: 'Bevan', cursive;\n  }\n  a, p, span {\n    font-family: 'Cabin', sans-serif;\n  }\n  h1{\n    font-size: 5rem;\n  }\n  h2{\n    font-size: 4rem;\n  }\n  h3{\n    font-size: 3.5rem;\n  }\n  h4{\n    font-size: 2.5rem;\n  }\n  h5{\n    font-size: 1.5rem;\n  }\n  p, span{\n    font-size:1.5rem;\n    line-height: 1.5rem;\n  }\n\n  html{\n    font-size: 62.5%;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    font-family: 'Cabin', sans-serif;\n    background-color: black;\n    color: white;\n  }\n  \n  code {\n    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;\n  }\n"]);return v=function(){return n},n}var h=Object(s.a)(v()),j=function(n){return p.colors[n]},m=function(n,t){var e=g[n]||n,r=parseInt(e.substring(1,3),16),o=parseInt(e.substring(3,5),16),i=parseInt(e.substring(5,7),16);return r=Math.round(r*(100+t)/100),o=(o=Math.round(o*(100+t)/100))<255?o:255,i=(i=Math.round(i*(100+t)/100))<255?i:255,"#"+(1===(r=r<255?r:255).toString(16).length?"0"+r.toString(16):r.toString(16))+(1===o.toString(16).length?"0"+o.toString(16):o.toString(16))+(1===i.toString(16).length?"0"+i.toString(16):i.toString(16))},g={black:"#000000",grey:"#373737",grey_light:"#A39F8E",white:"#fef8dd",blue:"#1fb9f3",green:"#51f249",yellow:"#fff249",red:"#F55658",purple:"#6b1ff3"},p={colors:g,shadows:{z1:"-0.1rem 0.1rem .25rem .1rem rgba(0,0,0,0.16)",z2:"-0.1rem 0.1rem .25rem .1rem rgba(0,0,0,0.36)",z3:"-.2rem .5rem 1rem .2rem rgba(0,0,0,.36)"},breakpoints:{mobile_tiny:"300px",mobile_medium:"400px",mobile_large:"500px",tablet:"768px",desktop:"1024px"}},O=function(){return Object(s.b)(b())},x=e(4);function w(){var n=Object(d.a)(["\n  border:0;\n  margin:0;\n  font-size:2rem;\n  padding:.5rem 1rem;\n  background-color: ",";\n  border: .5rem solid ",";\n  border-radius: 1rem;\n\n  margin-top:2rem;\n  text-align:center;\n  cursor:pointer;\n"]);return w=function(){return n},n}function y(){var n=Object(d.a)(["\n  font-size:2rem;\n  text-align:left;\n"]);return y=function(){return n},n}function k(){var n=Object(d.a)(["\n  padding:1rem;\n  color: ",";\n  min-width:30rem;\n"]);return k=function(){return n},n}var S=s.c.div(k(),j("blue")),P=s.c.h1(y()),I=s.c.button(w(),j("green"),j("white")),E=function(){var n=Object(l.f)().push,t=Object(u.c)();return Object(r.jsxs)(S,{children:[Object(r.jsx)(P,{children:"About BrowserPet"}),Object(r.jsx)("p",{children:"\xa9 Tom Yancey 2022"}),Object(r.jsx)(I,{onClick:function(){n("/")},children:"BACK"}),Object(r.jsx)(I,{onClick:function(){t(Object(x.b)())},children:"Clear Save"})]})},z=e(15),A=e(16),C=e.n(A),T=e(24),M=e(44);var D=function(n,t,e){var r=Object(o.useRef)();Object(o.useEffect)((function(){var o=(null===e||void 0===e?void 0:e.current)||window;if(o&&o.addEventListener){r.current!==t&&(r.current=t);var i=function(n){(null===r||void 0===r?void 0:r.current)&&r.current(n)};return o.addEventListener(n,i),function(){o.removeEventListener(n,i)}}}),[n,e,t])};var U=function(n,t){var e=function(){if("undefined"===typeof window)return t;try{var e=window.localStorage.getItem(n);return e?function(n){try{return"undefined"===n?void 0:JSON.parse(null!==n&&void 0!==n?n:"")}catch(t){return void console.log("parsing error on",{value:n})}}(e):t}catch(r){return console.warn("Error reading localStorage key \u201c".concat(n,"\u201d:"),r),t}},r=Object(o.useState)(e),i=Object(z.a)(r,2),c=i[0],a=i[1];Object(o.useEffect)((function(){a(e())}),[]);var u=function(){a(e())};return D("storage",u),D("local-storage",u),[c,function(t){"undefined"==typeof window&&console.warn("Tried setting localStorage key \u201c".concat(n,"\u201d even though environment is not a client"));try{var e=t instanceof Function?t(c):t;window.localStorage.setItem(n,JSON.stringify(e)),a(e),window.dispatchEvent(new Event("local-storage"))}catch(r){console.warn("Error setting localStorage key \u201c".concat(n,"\u201d:"),r)}}]};var F=e(23),L=e(61),R=Object(F.b)({name:"ui",initialState:{},reducers:{}});Object(L.a)(R.actions);var N=R.reducer,_=Object(F.a)({reducer:{petStore:x.d,ui:N}}),B={config:{activePet:"",lastSaved:-1},interactions:[],pets:[]},J=e(6),Y=function(){var n=Object(T.a)(C.a.mark((function n(t,e,r){var o,i;return C.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return Object(J.d)("\n\nfdfdfdfdfdfddfdf\n"),Object(J.d)("-------fetchAllData----------"),n.next=4,q(t);case 4:return o=n.sent,Object(J.d)("fetchAllData: received pets",o),n.next=8,H(o);case 8:i=n.sent,Object(J.d)("fetchAllData: received jsonParsedPets",i),G(i,e,r),Object(J.d)("\n\n\n");case 12:case"end":return n.stop()}}),n)})));return function(t,e,r){return n.apply(this,arguments)}}(),q=function(){var n=Object(T.a)(C.a.mark((function n(t){var e;return C.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return Object(J.d)("readManifest: reading manifest from ".concat(t)),n.next=3,X(t).then((function(n){return Object(J.d)("readManifest: fetched:",n),n.pets.map((function(n){return{id:n.id,baseUrl:n.baseUrl}}))}));case 3:return e=n.sent,n.abrupt("return",e.filter((function(n){return!!n})));case 5:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}(),X=function(){var n=Object(T.a)(C.a.mark((function n(t){var e,r;return C.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,fetch(t,{mode:"cors"});case 3:if((e=n.sent).ok){n.next=6;break}return n.abrupt("return",null);case 6:return n.next=8,e.text();case 8:return r=n.sent,n.abrupt("return",M.jsonc.parse(r));case 12:return n.prev=12,n.t0=n.catch(0),console.error("Error fetching or parsing manifest from ".concat(t),n.t0),n.abrupt("return",null);case 16:case"end":return n.stop()}}),n,null,[[0,12]])})));return function(t){return n.apply(this,arguments)}}(),H=function(){var n=Object(T.a)(C.a.mark((function n(t){var e,r;return C.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e=[],t.forEach((function(n){return e.push(K(n))})),n.next=4,Promise.all(e);case 4:return r=n.sent,n.abrupt("return",r.filter((function(n){return!!n})));case 6:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}(),K=function(n){return new Promise((function(t){return t(W(n))}))},W=function(){var n=Object(T.a)(C.a.mark((function n(t){var e,r,o;return C.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e=t.baseUrl+"/data.jsonc",n.prev=1,n.next=4,fetch(e,{mode:"cors"});case 4:if((r=n.sent).ok){n.next=8;break}return console.error("bad response from ".concat(e)),n.abrupt("return",null);case 8:return n.t0=M.jsonc,n.next=11,r.text();case 11:return n.t1=n.sent,(o=n.t0.parse.call(n.t0,n.t1)).baseUrl=t.baseUrl,n.abrupt("return",o);case 17:return n.prev=17,n.t2=n.catch(1),console.error("Error fetching or parsing pet manifest from ".concat(e),n.t2),n.abrupt("return",null);case 21:case"end":return n.stop()}}),n,null,[[1,17]])})));return function(t){return n.apply(this,arguments)}}(),G=function(n,t,e){var r=(new Date).getTime();Object(J.d)("JSON definitions parsed successfully",n),Object(J.d)("LocalStorage was read successfully",e);var o="";e.config.activePet&&(o=e.config.activePet),n.forEach((function(n){var r=(null===e||void 0===e?void 0:e.pets.find((function(t){return t.id===n.id})))||null;!o&&r&&e.config.activePet===r.id&&(o=r.id),t(Object(x.c)({isActive:o===(null===r||void 0===r?void 0:r.id),petDefinition:n,initialState:r}))})),t(o?Object(x.q)(o):Object(x.r)(0)),e.interactions.filter((function(n){return n.endAt>r})).forEach((function(n){t((function(t){t(Object(x.g)(n)),window.setTimeout((function(){t(Object(x.f)(n.id))}),n.endAt-r)}))}))},V=function(){var n=Object(u.c)(),t=Object(o.useState)(!1),e=Object(z.a)(t,2),r=e[0],i=e[1],c=U("browserpet",B),a=Object(z.a)(c,1)[0];return Object(o.useEffect)((function(){r||(i(!0),Y("assets/pet-manifest.jsonc",n,a))}),[r,a,i,n]),null};var Q=function(n,t){var e=Object(o.useRef)(n);Object(o.useLayoutEffect)((function(){e.current=n}),[n]),Object(o.useEffect)((function(){if(t||0===t){var n=setInterval((function(){return e.current()}),t);return function(){return clearInterval(n)}}}),[t])},Z=function(){var n=Object(o.useState)(0),t=Object(z.a)(n,2),e=t[0],r=t[1],i=Object(u.c)();return Q((function(){var n=(new Date).getTime(),t=e+1;r(t),2e3*t%2e3===0?(Object(J.d)("----SAVE: ".concat(t,"------- ")),i(Object(x.e)({time:n,doSave:!0}))):(Object(J.d)("----PING: ".concat(t,"------- ")),i(Object(x.e)({time:n,doSave:!1})))}),2e3),null},$=0,nn=function(){var n=U("browserpet",B),t=Object(z.a)(n,2)[1],e=Object(u.d)(x.n),r=Object(u.c)();return Object(o.useEffect)((function(){e&&e.config.activePet&&(t((function(){return e})),$!==e.config.lastSaved&&($=e.config.lastSaved,r(Object(x.s)(e))))}),[e,r,t]),null},tn=function(){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(nn,{}),Object(r.jsx)(V,{}),Object(r.jsx)(Z,{})]})};function en(){var n=Object(d.a)(["\n  position:absolute;\n  top:0;\n  left:0;\n  height:100%; \n  transition: width .3s ease-in-out, background-color .5s ease-in-out;\n  background-color: ",";\n"]);return en=function(){return n},n}function rn(){var n=Object(d.a)(["\n  position: relative;\n  font-size: 1.5rem;\n  font-weight: bold;\n  z-index:1;\n"]);return rn=function(){return n},n}function on(){var n=Object(d.a)(["\n  position:relative;\n  border:.5rem solid ",";\n  border-radius: 1rem;\n  overflow:hidden;\n  padding:.25rem .5rem;\n  text-align:center;\n  background-color: ",";\n\n  box-shadow: 0px -2px 4px ",";\n"]);return on=function(){return n},n}function cn(){var n=Object(d.a)(["\n  font-size: 1rem;\n"]);return cn=function(){return n},n}function an(){var n=Object(d.a)(["\n  display:inline-block;\n  width:calc(50% - 1rem);\n  margin-right:1rem;\n"]);return an=function(){return n},n}var un=s.c.div(an()),ln=s.c.h4(cn()),dn=s.c.div(on(),j("white"),j("white"),m("white",-40)),sn=s.c.span(rn()),fn=s.c.div(en(),j("blue")),bn=function(n){var t=n.label,e=n.max,o=n.value,i=n.hideStats,c=void 0!==i&&i,a=Math.round(o/e*1e3)/10;return Object(r.jsxs)(un,{children:[Object(r.jsx)(ln,{children:t.toLocaleUpperCase()}),Object(r.jsxs)(dn,{children:[Object(r.jsx)(sn,{children:!c&&"".concat(Object(J.e)(o)," / ").concat(e," (").concat(a,"%)")}),Object(r.jsx)(fn,{style:{width:"".concat(a,"%")}})]})]})};function vn(){var n=Object(d.a)(["\n  width:100%;\n"]);return vn=function(){return n},n}var hn=s.c.div(vn()),jn=function(){var n=Object(u.d)(x.p);return Object(r.jsx)(hn,{children:n.map((function(n,t){return Object(r.jsx)(bn,{label:n.label,max:n.max,value:n.value},t)}))})};function mn(){var n=Object(d.a)(["\n  background-color:",";\n  position:absolute;\n  height:100%;\n  left:0;\n  width: ",";\n\n  &.full{\n    width:100% !important;\n    background-color: ",";\n  }\n  z-index:1;\n"]);return mn=function(){return n},n}function gn(){var n=Object(d.a)(["\n  background-color:",";\n  position:absolute;\n  left:0;\n  top:0;\n  right:0;\n  bottom:0;\n"]);return gn=function(){return n},n}function pn(){var n=Object(d.a)(["\n  position:absolute;\n  left:0;\n  bottom:0;\n  height:100%;\n  width:100%;\n"]);return pn=function(){return n},n}var On=s.c.div(pn()),xn=s.c.div(gn(),j("white")),wn=s.c.div(mn(),j("red"),(function(n){return n.startWidth}),j("blue")),yn=function(n){var t=n.startProgress,e=n.duration,i=Object(o.useState)(!1),c=Object(z.a)(i,2),a=c[0],u=c[1];return Object(o.useEffect)((function(){a||window.setTimeout((function(){return u(!0)}),1)}),[a,u]),Object(r.jsxs)(On,{children:[Object(r.jsx)(wn,{startWidth:"".concat(100*t,"%"),className:a?"full":"",style:{transition:"all ".concat(e,"s linear")}}),Object(r.jsx)(xn,{})]})};function kn(){var n=Object(d.a)(["\n  display:block;\n  position:relative;\n  z-index:2;\n  font-size: 2rem;\n"]);return kn=function(){return n},n}function Sn(){var n=Object(d.a)(["\n  background-color: ",";\n  border-color: ",";\n  color: ",";\n\n  cursor:not-allowed;\n"]);return Sn=function(){return n},n}function Pn(){var n=Object(d.a)(["\n  font-weight:bold;\n  font-size: 2rem;\n\n  padding:1rem 1.5rem;\n\n  position:relative;\n  overflow: hidden;\n  cursor:pointer;\n\n  \n  background-color: ",";\n  color: ",";\n  border: .5rem solid ",";\n  border-radius: 1rem;\n"]);return Pn=function(){return n},n}function In(){var n=Object(d.a)(["\n  text-align:center;\n"]);return In=function(){return n},n}var En=s.c.li(In()),zn=s.c.div(Pn(),j("blue"),j("white"),j("white")),An=Object(s.c)(zn)(Sn(),j("red"),j("white"),j("white")),Cn=s.c.p(kn()),Tn=function(n){var t=n.activeStatus,e=n.interaction,o=n.onClickHandler;if(t){var i=t.endAt-t.startAt,c=(i-(t.endAt-(new Date).getTime()))/i,a=(t.endAt-(new Date).getTime())/1e3;return Object(r.jsx)(En,{children:Object(r.jsxs)(An,{children:[Object(r.jsx)(Cn,{children:e.label}),Object(r.jsx)(yn,{startProgress:c,duration:a})]})})}return Object(r.jsx)(En,{onClick:function(){return o&&o()},children:Object(r.jsx)(zn,{children:Object(r.jsx)(Cn,{children:"".concat(e.label)})})})};function Mn(){var n=Object(d.a)(["\n  border-bottom: .25rem dashed black;\n  display: flex;\n  flex-wrap: wrap;\n\n  >li{\n    margin:.5rem;\n    margin-left: .25rem;\n    &:first-child{\n      margin-left: .5rem;\n    }\n    flex: 1;\n    list-style:none;\n  }\n"]);return Mn=function(){return n},n}var Dn=s.c.ul(Mn()),Un=function(){var n=Object(u.d)(x.k,u.b),t=Object(u.d)(x.l,u.b),e=Object(u.c)();return Object(r.jsx)(Dn,{children:n.map((function(n,o){return Object(r.jsx)(Tn,{activeStatus:t.find((function(t){return t.id===n.id})),interaction:n,onClickHandler:function(){return function(n){var t=(new Date).getTime();e((function(e){e(Object(x.a)({interaction:n,time:t})),n.cooldown&&window.setTimeout((function(){e(Object(x.f)(n.id))}),n.cooldown)}))}(n)}},n.id)}))})};function Fn(){var n=Object(d.a)(["\n  min-height:5rem;\n  width:100%;\n"]);return Fn=function(){return n},n}function Ln(){var n=Object(d.a)(["\n  margin-top:1rem;\n  padding-left:1rem;\n"]);return Ln=function(){return n},n}function Rn(){var n=Object(d.a)(["\n  margin-top:1rem;\n  margin-bottom:.5rem;\n"]);return Rn=function(){return n},n}function Nn(){var n=Object(d.a)(["\n  width:100%;\n"]);return Nn=function(){return n},n}function _n(){var n=Object(d.a)(["\n  width:100%;\n  height:16rem;\n\n  font-size: 1.5rem;\n  line-height: 1.5rem;\n  padding: 0.25rem .5rem .5rem .5rem;\n  font-weight:500;\n  padding:2rem;\n  \n  color: black;\n  \n\n  overflow-y:auto;\n\n  hr{\n    border-color:",";\n    border-style:dashed;\n    margin-top:.5rem;\n    margin-bottom:.5rem;\n\n    margin-left:10%;\n    width:80%;\n  }\n"]);return _n=function(){return n},n}function Bn(){var n=Object(d.a)(["\n  position:absolute;\n  left:0;\n  right:0;\n  top:-.5rem;\n  bottom:0;\n\n  background-color:",";\n  border:.5rem solid ",";\n  border-radius:2rem;\n  overflow:hidden;\n\n  box-shadow: .25rem .25rem .55rem .45rem ",";\n"]);return Bn=function(){return n},n}var Jn=s.c.div(Bn(),j("green"),j("white"),j("grey")),Yn=s.c.div(_n(),j("blue")),qn=s.c.div(Nn()),Xn=s.c.h4(Rn()),Hn=s.c.p(Ln()),Kn=s.c.div(Fn()),Wn=function(){var n=Object(u.d)(x.j);return n?Object(r.jsxs)(Jn,{children:[Object(r.jsx)(Kn,{children:Object(r.jsx)(Un,{})}),Object(r.jsxs)(Yn,{children:[Object(r.jsx)(jn,{}),Object(r.jsx)("hr",{}),Object(r.jsxs)(qn,{children:[Object(r.jsx)(Xn,{children:"Description"}),Object(r.jsx)(Hn,{children:n.bio})]})]})]}):null};function Gn(){var n=Object(d.a)(["\n  /* display:inline-block; */\n  white-space:nowrap;\n  text-align:right;\n  z-index:1;\n  \n  list-style:none;\n  color:black;\n  margin-top: -.5rem;\n  margin-right: -1rem;\n  font-weight:bold;\n  font-size: 2rem;\n\n  /* border-top-left-radius: 0; */\n  border-bottom-right-radius: 0;\n  padding:.5rem 1rem;\n\n  position:absolute;\n  bottom:0;\n  right:0;\n\n  /* transition: transform .2s ease-in-out, bottom .2s ease-out; */\n  -webkit-transition: all 0.2s cubic-bezier(.72,1.79,.4,.8);\n  transition: all 0.2s cubic-bezier(.72,1.79,.4,.8);\n  ","\n"]);return Gn=function(){return n},n}function Vn(){var n=Object(d.a)(["\n  max-width: 14rem;\n  text-align: right;\n"]);return Vn=function(){return n},n}function Qn(){var n=Object(d.a)(["\n  color:",";\n  position:absolute;\n  right:0;\n  bottom:1rem;\n  z-index:1;\n"]);return Qn=function(){return n},n}var Zn=s.c.div(Qn(),j("black")),$n=s.c.ul(Vn()),nt=s.c.li(Gn(),(function(n){return function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"white";return Object(s.b)(f(),O(),j(t),j(t),j(n))}(n.bubbleColors[0],n.bubbleColors[1])})),tt=function(n){switch(n){case"alert":return["red","yellow"];case"warning":return["yellow","red"];case"reward":return["green","white"];default:return["white","red"]}},et=function(){var n=Object(u.d)(x.m,u.b);return Object(r.jsx)(Zn,{children:Object(r.jsx)($n,{children:n.map((function(n,t){return Object(r.jsx)(nt,{id:n.id,bubbleColors:tt(n.alertType),style:{bottom:(e=t,35*e),transform:"rotate(".concat(5*Math.random()-5,"deg)")},children:n.label},n.id);var e}))})})};function rt(){var n=Object(d.a)(["\n  font-size:2rem;\n  color:",";\n  opacity: .5;\n\n  position:absolute;\n  top:1rem;\n  right:1rem;\n"]);return rt=function(){return n},n}function ot(){var n=Object(d.a)(["\n  background-size:contain;\n  background-repeat:no-repeat;\n  background-position:center;\n  width:100%;\n  height:100%;\n  text-align:center;\n\n  position:absolute;\n  bottom:0;\n  left:0;\n"]);return ot=function(){return n},n}function it(){var n=Object(d.a)(["\n    background-size:cover;\n    background-position: center;\n    background-image:url(",");\n  "]);return it=function(){return n},n}function ct(){var n=Object(d.a)(["\n  position:absolute;\n  left:0;\n  right:0;\n  top:-2rem;\n  padding-top:2rem;\n  bottom:-2rem;\n  padding-bottom:2rem;\n  background-color: ",";\n  border:.5rem solid ",";\n\n  ","\n"]);return ct=function(){return n},n}var at=s.c.div(ct(),j("blue"),j("white"),(function(n){return n.bgImageUrl&&Object(s.b)(it(),n.bgImageUrl)})),ut=s.c.div(ot()),lt=s.c.p(rt(),j("white")),dt=function(){var n=Object(u.d)(x.h,u.b),t=Object(u.d)(x.i,u.b),e=t.imageUrl,o=t.backgroundColor;if(!n)return Object(r.jsx)(at,{bgImageUrl:e});var i={backgroundImage:"url(".concat(n.imageUrl,")"),backgroundPosition:"".concat(n.position),left:"".concat(n.offsetX,"px"),bottom:"".concat(n.offsetY,"px")};return o&&(i.backgroundColor=o),Object(r.jsx)(at,{bgImageUrl:e,children:Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(lt,{children:"behavior: ".concat(n.id)}),Object(r.jsx)(et,{}),Object(r.jsx)(ut,{style:i})]})})};function st(){var n=Object(d.a)(["\n  \n"]);return st=function(){return n},n}function ft(){var n=Object(d.a)(["\n  text-align:left;\n  display:inline-block;\n  flex:1;\n"]);return ft=function(){return n},n}function bt(){var n=Object(d.a)(["\n  text-align:right;\n  color: ",";\n  \n  >h4{\n    margin:0;\n    line-height: 5rem;\n  }\n"]);return bt=function(){return n},n}function vt(){var n=Object(d.a)(["\n  flex:1;\n\n  >p{\n    font-style:italic;\n  }\n\n  >h4{\n    margin-top:-.5rem;\n    margin-bottom: -.5rem;\n  }\n"]);return vt=function(){return n},n}function ht(){var n=Object(d.a)(["\n  width:100%;\n  height:100%;\n  \n  color:",";\n  background-color: ",";\n  border:.5rem solid ",";\n  border-radius: 1rem;\n  position:relative;\n  padding:0rem 1rem;\n\n  display:flex;\n  box-shadow: .25rem .25rem .25rem .05rem ",";\n\n  >div{\n    display:inline-block;\n    vertical-align:middle;\n    height:100%;\n  }\n"]);return ht=function(){return n},n}var jt=s.c.div(ht(),j("white"),j("blue"),j("white"),j("grey")),mt=s.c.div(vt()),gt=s.c.div(bt(),j("white")),pt=s.c.h4(ft()),Ot=s.c.p(st()),xt=function(){var n,t=Object(u.d)(x.j);return Object(r.jsx)(jt,{children:t&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)(mt,{children:[Object(r.jsx)(pt,{children:t.name}),Object(r.jsx)(Ot,{children:"born on: ".concat((n=t.bornOn,n?new Date(n).toLocaleString("en-us"):null))})]}),Object(r.jsx)(gt,{children:Object(r.jsx)("h4",{children:"Level: ".concat(t.level)})})]})})};function wt(){var n=Object(d.a)(["\n    background-color:",";\n    padding-bottom: .5rem;\n    padding-top: .5rem;\n    transition: padding .2s ease-out, background-color .2s ease-out;\n\n    &:hover{\n      background-color:",";\n    }\n  "]);return wt=function(){return n},n}function yt(){var n=Object(d.a)(["\n  list-style:none;\n  margin:none;\n  \n  display:inline-block;\n  vertical-align:bottom;\n  background-color:white;\n  color: black;\n\n  font-size:2rem;\n  line-height:2rem;\n  font-weight:bold;\n  padding: .25rem 1rem;\n  padding-bottom: 0rem;\n  margin-right:.25rem;\n  margin-bottom: -.25rem;\n\n  border:.5rem solid ",";\n  border-radius:1rem 1rem 0 0;\n\n  background-color:",";\n  border-bottom-color: ",";\n  color:",";\n  transition: padding-bottom .1s ease-in-out, background-color .1s ease-in-out;\n\n  &:hover{\n    background-color:",";\n  }\n  \n  ",";\n\n  cursor:pointer;\n"]);return yt=function(){return n},n}function kt(){var n=Object(d.a)(["\n  position:absolute;\n  width:100%; \n  padding-left:1rem;\n  left:0;\n  bottom:-.5rem;\n"]);return kt=function(){return n},n}var St=s.c.ul(kt()),Pt=s.c.li(yt(),j("white"),j("blue"),j("white"),j("black"),m("blue",20),(function(n){return n.isActive&&Object(s.b)(wt(),j("green"),m("green",40))})),It=function(){var n=Object(u.d)(x.o),t=Object(u.c)();return Object(r.jsx)(St,{children:n.map((function(n,e){return Object(r.jsx)(Pt,{onClick:function(){return t(Object(x.r)(e))},isActive:n.isActive,children:e+1},e)}))})};function Et(){var n=Object(d.a)(["\n  display:flex;\n  flex-direction:row;\n\n  >div{\n    flex:1;\n    position:relative;\n  }\n"]);return Et=function(){return n},n}function zt(){var n=Object(d.a)(["\n  font-size:2rem;\n  text-align:right;\n  margin-right:8rem;\n  margin-bottom:-.5rem;\n"]);return zt=function(){return n},n}function At(){var n=Object(d.a)(["\n  position:absolute;\n  right:0rem;\n  bottom:-.5rem;\n  width:7rem;\n  height:3rem;\n\n  border-radius:1rem 1rem 0 0;\n  background-color: ",";\n  color: ",";\n\n  font-size:1.5rem;\n  font-weight:bold;\n  text-align:center;\n  line-height:2rem;\n  text-shadow:1px 1px 1px ",";\n  border:.5rem solid ",";\n\n  cursor:pointer;\n  &:hover{\n    background-color: ",";\n  }\n"]);return At=function(){return n},n}var Ct=s.c.div(At(),j("red"),j("white"),j("black"),j("white"),m("red",40)),Tt=s.c.h1(zt()),Mt=s.c.div(Et()),Dt=function(){var n=Object(u.c)();return Object(r.jsxs)(Mt,{children:[Object(r.jsx)("div",{children:Object(r.jsx)(It,{})}),Object(r.jsxs)("div",{children:[Object(r.jsx)(Tt,{children:"Browser Pet"}),Object(r.jsx)(Ct,{onClick:function(){return n(Object(x.b)())},children:"RESET"})]})]})};function Ut(){var n=Object(d.a)(["\n  flex: 1;\n"]);return Ut=function(){return n},n}function Ft(){var n=Object(d.a)(["\n  flex: 0 0 2rem;\n"]);return Ft=function(){return n},n}function Lt(){var n=Object(d.a)(["\n  position: relative;\n  height:8rem;\n  z-index:1;\n\n  display:flex;\n  flex-direction:column;\n"]);return Lt=function(){return n},n}var Rt=s.c.header(Lt()),Nt=s.c.div(Ft()),_t=s.c.div(Ut()),Bt=function(){return Object(r.jsxs)(Rt,{children:[Object(r.jsx)(Nt,{children:Object(r.jsx)(Dt,{})}),Object(r.jsx)(_t,{children:Object(r.jsx)(xt,{})})]})};function Jt(){var n=Object(d.a)(["\n  grid-area: footer;\n"]);return Jt=function(){return n},n}function Yt(){var n=Object(d.a)(["\n  grid-area: body;\n"]);return Yt=function(){return n},n}function qt(){var n=Object(d.a)(["\n  grid-area: header;\n"]);return qt=function(){return n},n}function Xt(){var n=Object(d.a)(["\n  padding:1rem;\n  color: ",';\n  position:absolute;\n  left:0;\n  right:0;\n  top:0;\n  bottom:0;\n  min-width:30rem;\n  min-height:55rem;\n\n  display:grid;\n  grid-template-columns: auto;\n  grid-template-rows: 10rem auto 20rem;\n  grid-template-areas:\n    "header"\n    "body"\n    "footer";\n\n  >div{\n    position:relative;\n  }\n']);return Xt=function(){return n},n}var Ht=s.c.div(Xt(),j("blue")),Kt=s.c.div(qt()),Wt=s.c.div(Yt()),Gt=s.c.div(Jt()),Vt=function(){return Object(r.jsxs)(Ht,{children:[Object(r.jsx)(tn,{}),Object(r.jsx)(Kt,{children:Object(r.jsx)(Bt,{})}),Object(r.jsx)(Wt,{children:Object(r.jsx)(dt,{})}),Object(r.jsx)(Gt,{children:Object(r.jsx)(Wn,{})})]})},Qt=function(){return Object(r.jsxs)(l.c,{children:[Object(r.jsx)(l.a,{path:"/about",children:Object(r.jsx)(E,{})}),Object(r.jsx)(l.a,{path:"/",children:Object(r.jsx)(Vt,{})})]})},Zt=function(n){n&&n instanceof Function&&e.e(4).then(e.bind(null,109)).then((function(t){var e=t.getCLS,r=t.getFID,o=t.getFCP,i=t.getLCP,c=t.getTTFB;e(n),r(n),o(n),i(n),c(n)}))},$t=e(32);e(105);a.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(u.a,{store:_,children:Object(r.jsxs)($t.a,{children:[Object(r.jsx)(Qt,{}),Object(r.jsx)(h,{})]})})}),document.getElementById("root")),Zt()},28:function(n,t,e){"use strict";e.d(t,"a",(function(){return r})),e.d(t,"b",(function(){return o})),e.d(t,"c",(function(){return i}));var r=function(n,t,e){return n.when.find((function(n){return!u(n,t,e)}))?null:n.then[Math.floor(Math.random()*n.then.length)]},o=function(n,t){return n.when.find((function(n){return-1===t.indexOf(n)}))?null:n.then[Math.floor(Math.random()*n.then.length)]},i=function(n,t){return"statuses"===t?n.map((function(n){return{when:"string"===typeof n.when?[n.when]:n.when,then:"string"===typeof n.then?[n.then]:n.then}})):"stats"===t&&n?n.map((function(n){return{when:("string"===typeof n.when?[n.when]:n.when).map((function(n){return a(n)})).filter((function(n){return null!==n})),then:"string"===typeof n.then?[n.then]:n.then}})):[]},c={"=":function(n,t){return n===t},"<":function(n,t){return n<t},"<=":function(n,t){return n<=t},">":function(n,t){return n>t},">=":function(n,t){return n>=t}},a=function(n){try{var t=n.split("_"),e=t[0],r=t[1].split("%");return c[e]?{condition:e,criteria:Number(r[0]),isPercent:r.length>1}:(console.error('parseExpressionString(): invalid condition "'.concat(e,'" from expressionString "').concat(n,'"')),null)}catch(o){return console.error('could not parse expressionString "'.concat(n,'", expressionStrings must use one \n    of the following operators: [<=,<,=,>,>=] and follow a format like "<=_10%"')),null}},u=function(n,t,e){try{var r=n.isPercent?Math.round(t/e*100):t;return c[n.condition](r,n.criteria)}catch(o){return console.log('could not evaluate "whenNumber:'.concat(n,'", "reference:').concat(t,'", "referenceMax:').concat(t,'"')),null}}},4:function(n,t,e){"use strict";(function(n){e.d(t,"e",(function(){return p})),e.d(t,"c",(function(){return O})),e.d(t,"r",(function(){return x})),e.d(t,"q",(function(){return w})),e.d(t,"b",(function(){return y})),e.d(t,"s",(function(){return k})),e.d(t,"a",(function(){return S})),e.d(t,"g",(function(){return P})),e.d(t,"f",(function(){return I})),e.d(t,"k",(function(){return F})),e.d(t,"i",(function(){return N})),e.d(t,"j",(function(){return J})),e.d(t,"l",(function(){return Y})),e.d(t,"p",(function(){return X})),e.d(t,"m",(function(){return K})),e.d(t,"h",(function(){return W})),e.d(t,"o",(function(){return G})),e.d(t,"n",(function(){return Q}));var r=e(62),o=e(10),i=e(23),c=e(7),a=e(6),u=e(28),l={config:{activePet:"",lastSaved:-1},interactions:[],pets:[]},d={activeIdx:-1,pets:[],interactions:[],cachedPets:[],lastRendered:(new Date).getTime(),lastSaved:(new Date).getTime()},s=function(n,t){return n.map((function(n){return Object(o.a)(Object(o.a)({},n),{},{imageUrl:n.image?"".concat(t,"/").concat(n.image):n.imageUrl||"",position:n.position?n.position:"center",offsetX:n.offsetX?n.offsetX:0,offsetY:n.offsetY?n.offsetY:0})}))},f=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return n.map((function(n){return{statId:n.statId,value:n.value||0}}))},b=function(n,t){return n?n.map((function(n){return{id:n.id,label:n.label,cooldown:n.cooldown,changeStats:f(n.changeStats)}})):[]},v=function(n,t){return n.map((function(n){var e=null===t||void 0===t?void 0:t.stats.find((function(t){return t.id===n.id})),r=Object(u.c)(n.statEffects,"stats");return e?Object(o.a)(Object(o.a)({},n),{},{value:e.value,statEffects:r}):Object(o.a)(Object(o.a)({},n),{},{statEffects:r})}))},h=function(n,t,e){var r=function(n,t,e){var r,o=e.find((function(t){return t.statId===n.id}));if(!o)return n.value;var i=n.value+o.value,c=null===(r=t.find((function(t){return n.id===t.id})))||void 0===r?void 0:r.max;return c?Object(a.a)(i,0,c):i>0?i:0};return n.map((function(n){return{id:n.id,value:r(n,t,e)}}))},j=function(n,t){var e=void 0!==t?t:(new Date).getTime();n.lastSaved=e,n.lastRendered=e},m=Object(i.b)({name:"petStore",initialState:d,reducers:{pingStore:function(n,t){var e=t.payload.time;n.lastRendered=e,t.payload.doSave&&(n.lastSaved=e)},clearSave:function(t){n.localStorage.clear(),n.location.reload()},setActiveId:function(n,t){var e=n.pets.findIndex((function(n){return n.id===t.payload}));-1===e?(console.log('Cannot find pet with id "'.concat(t.payload,'"')),n.activeIdx=0,j(n)):(n.activeIdx=e,j(n))},setActiveIdx:function(n,t){n.activeIdx=t.payload,j(n)},setCachedPayload:function(n,t){var e=t.payload;n.cachedPets=e.pets},restoreInteractionFromSave:function(n,t){var e=t.payload;n.interactions.find((function(n){return n.id===e.id}))||(console.log("restoreInteractionFromSave ".concat(e.id," with ").concat((e.endAt-(new Date).getTime())/1e3," secs left")),n.interactions.push(e))},addNewInteractionEvent:function(n,t){var e=t.payload,r=e.interaction,i=e.time,c=!1;if(r.cooldown&&(c=!0,n.interactions.find((function(n){return n.id===r.id}))||n.interactions.push({id:r.id,startAt:i,endAt:i+(r.cooldown||0)})),r.changeStats.length>0){c=!0;var a=n.pets[n.activeIdx],u=n.cachedPets.findIndex((function(n){return n.id===a.id}));if(u>-1){var l,d=(null===(l=n.cachedPets[u])||void 0===l?void 0:l.stats)||[],s=a.logic.stats;n.cachedPets[u]=Object(o.a)(Object(o.a)({},n.cachedPets[u]),{},{stats:h(d,s,r.changeStats)})}}c&&j(n,i)},removeInteractionEvent:function(n,t){var e=t.payload;n.interactions=n.interactions.filter((function(n){return n.id!==e}))},createPet:function(n,t){Object(a.d)("\n\ncreatePet",t.payload);var e=t.payload,i=e.petDefinition,c=e.initialState,l=e.isActive,d=n.pets.find((function(n){return n.id===i.id})),f=(new Date).getTime(),h=function(n,t){return{stats:v(n.logic.stats,t),statuses:n.logic.statuses||[],behaviorRules:Object(u.c)(n.logic.behaviorRules,"statuses"),behaviors:s(n.logic.behaviors||[],n.baseUrl),interactions:b(n.logic.interactions,t)}}(i,c);Object(a.d)(">> createPet: ".concat(i.id,", isActive? ").concat(l,", beingTracked? ").concat(null===c||void 0===c?void 0:c.beingTracked)),c?Object(a.d)("initial state:",c):Object(a.d)("no initial state found.");var j=Object(o.a)(Object(o.a)({},i),{},{logic:h,bornOn:(null===c||void 0===c?void 0:c.bornOn)||f,bgImage:i.backgroundImage?"".concat(i.baseUrl,"/").concat(i.backgroundImage):null,bgColor:i.backgroundColor||null});d?n.pets=n.pets.map((function(n){return n.id===i.id?j:n})):n.pets.push(j),c&&(n.cachedPets.find((function(n){return n.id===(null===c||void 0===c?void 0:c.id)}))||(n.cachedPets=[].concat(Object(r.a)(n.cachedPets),[Object(o.a)(Object(o.a)({},c),{},{lastSaved:(null===c||void 0===c?void 0:c.lastSaved)||f})])))}}}),g=m.actions,p=g.pingStore,O=g.createPet,x=g.setActiveIdx,w=g.setActiveId,y=g.clearSave,k=g.setCachedPayload,S=g.addNewInteractionEvent,P=g.restoreInteractionFromSave,I=g.removeInteractionEvent,E=function(n){return n.petStore.activeIdx},z=function(n){return n.petStore.pets},A=function(n){return n.petStore.cachedPets},C=Object(c.a)([function(n){return n.petStore.lastSaved}],(function(n){return n})),T=Object(c.a)([function(n){return n.petStore.lastRendered}],(function(n){return n})),M=Object(c.a)([z,E],(function(n,t){return n[t]||null})),D=Object(c.a)([M],(function(n){var t;return(null===n||void 0===n||null===(t=n.logic)||void 0===t?void 0:t.stats)||[]})),U=Object(c.a)([M],(function(n){var t;return(null===n||void 0===n||null===(t=n.logic)||void 0===t?void 0:t.statuses)||[]})),F=Object(c.a)([M],(function(n){var t;return(null===n||void 0===n||null===(t=n.logic)||void 0===t?void 0:t.interactions)||[]})),L=Object(c.a)([M],(function(n){var t;return(null===n||void 0===n||null===(t=n.logic)||void 0===t?void 0:t.behaviorRules)||[]})),R=Object(c.a)([M],(function(n){var t;return(null===n||void 0===n||null===(t=n.logic)||void 0===t?void 0:t.behaviors)||[]})),N=Object(c.a)([M],(function(n){return{imageUrl:null===n||void 0===n?void 0:n.bgImage,backgroundColor:null===n||void 0===n?void 0:n.bgColor}})),_=Object(c.a)([A],(function(n){return n})),B=(Object(c.a)([A],(function(n){return n.map((function(n){return n.stats}))})),Object(c.a)([A,M],(function(n,t){var e;return t&&(null===(e=n.find((function(n){return n.id===t.id})))||void 0===e?void 0:e.stats)||[]}))),J=Object(c.a)([M],(function(n){return n?{id:n.id,name:n.name,level:n.level,bio:n.bio,bornOn:n.bornOn}:null})),Y=Object(c.a)([function(n){return n.petStore.interactions}],(function(n){return n})),q=Object(c.a)([A,M],(function(n,t){var e;return t&&(null===(e=n.find((function(n){return n.id===t.id})))||void 0===e?void 0:e.lastSaved)||0})),X=Object(c.a)([D,B,q,T],(function(n,t,e,r){return Object(a.c)(n,t,e,r)})),H=(Object(c.a)([F,Y],(function(n,t){return n.map((function(n){var e,r;return{id:n.id,label:n.label,startAt:(null===(e=t.find((function(t){return t.id===n.id})))||void 0===e?void 0:e.startAt)||0,endAt:(null===(r=t.find((function(t){return t.id===n.id})))||void 0===r?void 0:r.endAt)||0}}))})),Object(c.a)([X,D],(function(n,t){for(var e=function(t){return n.find((function(n){return n.id===t}))},r=[],o=0;o<t.length;o++){var i=e(t[o].id);if(i)for(var c=0;c<t[o].statEffects.length;c++){var a=Object(u.a)(t[o].statEffects[c],i.value,i.max);a&&-1===r.indexOf(a)&&r.push(a)}}return r.map((function(n,t){return n})).reverse()}))),K=Object(c.a)([H,U],(function(n,t){return n.map((function(n){return t.find((function(t){return t.id===n}))})).filter((function(n){return!!n}))})),W=Object(c.a)([H,L,R],(function(n,t,e){for(var r=function(r){var o=Object(u.b)(t[r],n);if(o){var i=e.find((function(n){return n.id===o}));return i?{v:i}:(console.log('ERROR: invalid behaviorId: "'.concat(o,'"')),{v:null})}},o=0;o<t.length;o++){var i=r(o);if("object"===typeof i)return i.v}return null})),G=Object(c.a)([z,E],(function(n,t){return n.map((function(n,e){return{name:n.name,id:n.id,isActive:e===t}}))})),V=Object(c.a)([D,B,q,C],(function(n,t,e,r){return e===r?null:Object(a.b)(n,t,e,r)})),Q=(Object(c.a)([function(){try{return function(){try{return JSON.parse(n.localStorage.getItem("browserpet"))}catch(t){return console.log('no localStorage entry found for "browserpet"'),null}}().pets}catch(t){return[]}}],(function(n){return n})),Object(c.a)([C,V,M,Y,_],(function(n,t,e,r,i){if(!t)return null;if(!e)return l;var c=[];return c=i.findIndex((function(n){return n.id===e.id}))>-1?i.map((function(r){if(r.id===e.id){var i=r.beingTracked?t:r.stats;return{id:e.id,stats:i,bornOn:e.bornOn,lastSaved:n,beingTracked:!0}}return Object(o.a)(Object(o.a)({},r),{},{beingTracked:!1})})):i.concat([{id:e.id,stats:t,bornOn:e.bornOn,lastSaved:n,beingTracked:!1}]),{config:{activePet:(null===e||void 0===e?void 0:e.id)||"",lastSaved:n},interactions:r,pets:c}})));t.d=m.reducer}).call(this,e(17))},6:function(n,t,e){"use strict";e.d(t,"e",(function(){return r})),e.d(t,"a",(function(){return o})),e.d(t,"c",(function(){return c})),e.d(t,"b",(function(){return a})),e.d(t,"d",(function(){return u}));var r=function(n,t){if(!t)return Math.round(n);var e=Math.pow(10,t);return Math.round(n*e)/e},o=function(n,t,e){return Math.min(Math.max(n,t),e)},i=function(n,t,e,r){var i,c=null===(i=t.find((function(t){return t.id===n.id})))||void 0===i?void 0:i.value;return void 0===c&&(c=n.value),r?c:Math.round(100*o(c+n.perSecond*e,0,n.max))/100},c=function(n,t,e,r){var o=(r-e)/1e3;return o<=0?n.map((function(n){return{id:n.id,value:i(n,t,o,!0),max:n.max,label:n.label}})):n.map((function(n){return{id:n.id,value:i(n,t,o),max:n.max,label:n.label}}))},a=function(n,t,e,r){var o=r&&e?(r-e)/1e3:0;return n.map((function(n){return{id:n.id,value:i(n,t,o)}}))},u=function(){}},63:function(n,t,e){n.exports=e(107)},89:function(n,t){},91:function(n,t){}});
//# sourceMappingURL=main.js.map