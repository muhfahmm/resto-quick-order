function jd(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const l in r)if(l!=="default"&&!(l in e)){const o=Object.getOwnPropertyDescriptor(r,l);o&&Object.defineProperty(e,l,o.get?o:{enumerable:!0,get:()=>r[l]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerPolicy&&(o.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?o.credentials="include":l.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}})();function Nd(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Xa={exports:{}},$l={},Ja={exports:{}},I={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _r=Symbol.for("react.element"),Sd=Symbol.for("react.portal"),Cd=Symbol.for("react.fragment"),Ed=Symbol.for("react.strict_mode"),_d=Symbol.for("react.profiler"),Pd=Symbol.for("react.provider"),zd=Symbol.for("react.context"),Ld=Symbol.for("react.forward_ref"),Td=Symbol.for("react.suspense"),Rd=Symbol.for("react.memo"),Md=Symbol.for("react.lazy"),Rs=Symbol.iterator;function Od(e){return e===null||typeof e!="object"?null:(e=Rs&&e[Rs]||e["@@iterator"],typeof e=="function"?e:null)}var Za={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},eu=Object.assign,tu={};function Dn(e,t,n){this.props=e,this.context=t,this.refs=tu,this.updater=n||Za}Dn.prototype.isReactComponent={};Dn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Dn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function nu(){}nu.prototype=Dn.prototype;function Di(e,t,n){this.props=e,this.context=t,this.refs=tu,this.updater=n||Za}var Ii=Di.prototype=new nu;Ii.constructor=Di;eu(Ii,Dn.prototype);Ii.isPureReactComponent=!0;var Ms=Array.isArray,ru=Object.prototype.hasOwnProperty,Fi={current:null},lu={key:!0,ref:!0,__self:!0,__source:!0};function ou(e,t,n){var r,l={},o=null,s=null;if(t!=null)for(r in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(o=""+t.key),t)ru.call(t,r)&&!lu.hasOwnProperty(r)&&(l[r]=t[r]);var a=arguments.length-2;if(a===1)l.children=n;else if(1<a){for(var u=Array(a),c=0;c<a;c++)u[c]=arguments[c+2];l.children=u}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)l[r]===void 0&&(l[r]=a[r]);return{$$typeof:_r,type:e,key:o,ref:s,props:l,_owner:Fi.current}}function Dd(e,t){return{$$typeof:_r,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Ui(e){return typeof e=="object"&&e!==null&&e.$$typeof===_r}function Id(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Os=/\/+/g;function mo(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Id(""+e.key):t.toString(36)}function ll(e,t,n,r,l){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case _r:case Sd:s=!0}}if(s)return s=e,l=l(s),e=r===""?"."+mo(s,0):r,Ms(l)?(n="",e!=null&&(n=e.replace(Os,"$&/")+"/"),ll(l,t,n,"",function(c){return c})):l!=null&&(Ui(l)&&(l=Dd(l,n+(!l.key||s&&s.key===l.key?"":(""+l.key).replace(Os,"$&/")+"/")+e)),t.push(l)),1;if(s=0,r=r===""?".":r+":",Ms(e))for(var a=0;a<e.length;a++){o=e[a];var u=r+mo(o,a);s+=ll(o,t,n,u,l)}else if(u=Od(e),typeof u=="function")for(e=u.call(e),a=0;!(o=e.next()).done;)o=o.value,u=r+mo(o,a++),s+=ll(o,t,n,u,l);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function Ar(e,t,n){if(e==null)return e;var r=[],l=0;return ll(e,r,"","",function(o){return t.call(n,o,l++)}),r}function Fd(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var xe={current:null},ol={transition:null},Ud={ReactCurrentDispatcher:xe,ReactCurrentBatchConfig:ol,ReactCurrentOwner:Fi};function iu(){throw Error("act(...) is not supported in production builds of React.")}I.Children={map:Ar,forEach:function(e,t,n){Ar(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Ar(e,function(){t++}),t},toArray:function(e){return Ar(e,function(t){return t})||[]},only:function(e){if(!Ui(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};I.Component=Dn;I.Fragment=Cd;I.Profiler=_d;I.PureComponent=Di;I.StrictMode=Ed;I.Suspense=Td;I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ud;I.act=iu;I.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=eu({},e.props),l=e.key,o=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,s=Fi.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(u in t)ru.call(t,u)&&!lu.hasOwnProperty(u)&&(r[u]=t[u]===void 0&&a!==void 0?a[u]:t[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){a=Array(u);for(var c=0;c<u;c++)a[c]=arguments[c+2];r.children=a}return{$$typeof:_r,type:e.type,key:l,ref:o,props:r,_owner:s}};I.createContext=function(e){return e={$$typeof:zd,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Pd,_context:e},e.Consumer=e};I.createElement=ou;I.createFactory=function(e){var t=ou.bind(null,e);return t.type=e,t};I.createRef=function(){return{current:null}};I.forwardRef=function(e){return{$$typeof:Ld,render:e}};I.isValidElement=Ui;I.lazy=function(e){return{$$typeof:Md,_payload:{_status:-1,_result:e},_init:Fd}};I.memo=function(e,t){return{$$typeof:Rd,type:e,compare:t===void 0?null:t}};I.startTransition=function(e){var t=ol.transition;ol.transition={};try{e()}finally{ol.transition=t}};I.unstable_act=iu;I.useCallback=function(e,t){return xe.current.useCallback(e,t)};I.useContext=function(e){return xe.current.useContext(e)};I.useDebugValue=function(){};I.useDeferredValue=function(e){return xe.current.useDeferredValue(e)};I.useEffect=function(e,t){return xe.current.useEffect(e,t)};I.useId=function(){return xe.current.useId()};I.useImperativeHandle=function(e,t,n){return xe.current.useImperativeHandle(e,t,n)};I.useInsertionEffect=function(e,t){return xe.current.useInsertionEffect(e,t)};I.useLayoutEffect=function(e,t){return xe.current.useLayoutEffect(e,t)};I.useMemo=function(e,t){return xe.current.useMemo(e,t)};I.useReducer=function(e,t,n){return xe.current.useReducer(e,t,n)};I.useRef=function(e){return xe.current.useRef(e)};I.useState=function(e){return xe.current.useState(e)};I.useSyncExternalStore=function(e,t,n){return xe.current.useSyncExternalStore(e,t,n)};I.useTransition=function(){return xe.current.useTransition()};I.version="18.3.1";Ja.exports=I;var x=Ja.exports;const su=Nd(x),$d=jd({__proto__:null,default:su},[x]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ad=x,Bd=Symbol.for("react.element"),Wd=Symbol.for("react.fragment"),Vd=Object.prototype.hasOwnProperty,Qd=Ad.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Hd={key:!0,ref:!0,__self:!0,__source:!0};function au(e,t,n){var r,l={},o=null,s=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(s=t.ref);for(r in t)Vd.call(t,r)&&!Hd.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)l[r]===void 0&&(l[r]=t[r]);return{$$typeof:Bd,type:e,key:o,ref:s,props:l,_owner:Qd.current}}$l.Fragment=Wd;$l.jsx=au;$l.jsxs=au;Xa.exports=$l;var i=Xa.exports,Ao={},uu={exports:{}},Le={},cu={exports:{}},du={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(E,O){var M=E.length;E.push(O);e:for(;0<M;){var W=M-1>>>1,U=E[W];if(0<l(U,O))E[W]=O,E[M]=U,M=W;else break e}}function n(E){return E.length===0?null:E[0]}function r(E){if(E.length===0)return null;var O=E[0],M=E.pop();if(M!==O){E[0]=M;e:for(var W=0,U=E.length,Ve=U>>>1;W<Ve;){var Me=2*(W+1)-1,xt=E[Me],Ne=Me+1,Ze=E[Ne];if(0>l(xt,M))Ne<U&&0>l(Ze,xt)?(E[W]=Ze,E[Ne]=M,W=Ne):(E[W]=xt,E[Me]=M,W=Me);else if(Ne<U&&0>l(Ze,M))E[W]=Ze,E[Ne]=M,W=Ne;else break e}}return O}function l(E,O){var M=E.sortIndex-O.sortIndex;return M!==0?M:E.id-O.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var s=Date,a=s.now();e.unstable_now=function(){return s.now()-a}}var u=[],c=[],p=1,d=null,h=3,y=!1,w=!1,b=!1,j=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(E){for(var O=n(c);O!==null;){if(O.callback===null)r(c);else if(O.startTime<=E)r(c),O.sortIndex=O.expirationTime,t(u,O);else break;O=n(c)}}function k(E){if(b=!1,g(E),!w)if(n(u)!==null)w=!0,We(C);else{var O=n(c);O!==null&&it(k,O.startTime-E)}}function C(E,O){w=!1,b&&(b=!1,m(T),T=-1),y=!0;var M=h;try{for(g(O),d=n(u);d!==null&&(!(d.expirationTime>O)||E&&!ue());){var W=d.callback;if(typeof W=="function"){d.callback=null,h=d.priorityLevel;var U=W(d.expirationTime<=O);O=e.unstable_now(),typeof U=="function"?d.callback=U:d===n(u)&&r(u),g(O)}else r(u);d=n(u)}if(d!==null)var Ve=!0;else{var Me=n(c);Me!==null&&it(k,Me.startTime-O),Ve=!1}return Ve}finally{d=null,h=M,y=!1}}var z=!1,P=null,T=-1,B=5,D=-1;function ue(){return!(e.unstable_now()-D<B)}function Re(){if(P!==null){var E=e.unstable_now();D=E;var O=!0;try{O=P(!0,E)}finally{O?Be():(z=!1,P=null)}}else z=!1}var Be;if(typeof f=="function")Be=function(){f(Re)};else if(typeof MessageChannel<"u"){var ot=new MessageChannel,ln=ot.port2;ot.port1.onmessage=Re,Be=function(){ln.postMessage(null)}}else Be=function(){j(Re,0)};function We(E){P=E,z||(z=!0,Be())}function it(E,O){T=j(function(){E(e.unstable_now())},O)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(E){E.callback=null},e.unstable_continueExecution=function(){w||y||(w=!0,We(C))},e.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<E?Math.floor(1e3/E):5},e.unstable_getCurrentPriorityLevel=function(){return h},e.unstable_getFirstCallbackNode=function(){return n(u)},e.unstable_next=function(E){switch(h){case 1:case 2:case 3:var O=3;break;default:O=h}var M=h;h=O;try{return E()}finally{h=M}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(E,O){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var M=h;h=E;try{return O()}finally{h=M}},e.unstable_scheduleCallback=function(E,O,M){var W=e.unstable_now();switch(typeof M=="object"&&M!==null?(M=M.delay,M=typeof M=="number"&&0<M?W+M:W):M=W,E){case 1:var U=-1;break;case 2:U=250;break;case 5:U=1073741823;break;case 4:U=1e4;break;default:U=5e3}return U=M+U,E={id:p++,callback:O,priorityLevel:E,startTime:M,expirationTime:U,sortIndex:-1},M>W?(E.sortIndex=M,t(c,E),n(u)===null&&E===n(c)&&(b?(m(T),T=-1):b=!0,it(k,M-W))):(E.sortIndex=U,t(u,E),w||y||(w=!0,We(C))),E},e.unstable_shouldYield=ue,e.unstable_wrapCallback=function(E){var O=h;return function(){var M=h;h=O;try{return E.apply(this,arguments)}finally{h=M}}}})(du);cu.exports=du;var Kd=cu.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qd=x,ze=Kd;function N(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var fu=new Set,ur={};function nn(e,t){Pn(e,t),Pn(e+"Capture",t)}function Pn(e,t){for(ur[e]=t,e=0;e<t.length;e++)fu.add(t[e])}var ft=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Bo=Object.prototype.hasOwnProperty,Yd=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ds={},Is={};function Gd(e){return Bo.call(Is,e)?!0:Bo.call(Ds,e)?!1:Yd.test(e)?Is[e]=!0:(Ds[e]=!0,!1)}function Xd(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Jd(e,t,n,r){if(t===null||typeof t>"u"||Xd(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ve(e,t,n,r,l,o,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=s}var ae={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ae[e]=new ve(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ae[t]=new ve(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ae[e]=new ve(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ae[e]=new ve(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ae[e]=new ve(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ae[e]=new ve(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ae[e]=new ve(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ae[e]=new ve(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ae[e]=new ve(e,5,!1,e.toLowerCase(),null,!1,!1)});var $i=/[\-:]([a-z])/g;function Ai(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace($i,Ai);ae[t]=new ve(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace($i,Ai);ae[t]=new ve(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace($i,Ai);ae[t]=new ve(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ae[e]=new ve(e,1,!1,e.toLowerCase(),null,!1,!1)});ae.xlinkHref=new ve("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ae[e]=new ve(e,1,!1,e.toLowerCase(),null,!0,!0)});function Bi(e,t,n,r){var l=ae.hasOwnProperty(t)?ae[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Jd(t,n,l,r)&&(n=null),r||l===null?Gd(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var gt=qd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Br=Symbol.for("react.element"),dn=Symbol.for("react.portal"),fn=Symbol.for("react.fragment"),Wi=Symbol.for("react.strict_mode"),Wo=Symbol.for("react.profiler"),pu=Symbol.for("react.provider"),mu=Symbol.for("react.context"),Vi=Symbol.for("react.forward_ref"),Vo=Symbol.for("react.suspense"),Qo=Symbol.for("react.suspense_list"),Qi=Symbol.for("react.memo"),bt=Symbol.for("react.lazy"),hu=Symbol.for("react.offscreen"),Fs=Symbol.iterator;function Bn(e){return e===null||typeof e!="object"?null:(e=Fs&&e[Fs]||e["@@iterator"],typeof e=="function"?e:null)}var X=Object.assign,ho;function Gn(e){if(ho===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);ho=t&&t[1]||""}return`
`+ho+e}var go=!1;function xo(e,t){if(!e||go)return"";go=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var l=c.stack.split(`
`),o=r.stack.split(`
`),s=l.length-1,a=o.length-1;1<=s&&0<=a&&l[s]!==o[a];)a--;for(;1<=s&&0<=a;s--,a--)if(l[s]!==o[a]){if(s!==1||a!==1)do if(s--,a--,0>a||l[s]!==o[a]){var u=`
`+l[s].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=s&&0<=a);break}}}finally{go=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Gn(e):""}function Zd(e){switch(e.tag){case 5:return Gn(e.type);case 16:return Gn("Lazy");case 13:return Gn("Suspense");case 19:return Gn("SuspenseList");case 0:case 2:case 15:return e=xo(e.type,!1),e;case 11:return e=xo(e.type.render,!1),e;case 1:return e=xo(e.type,!0),e;default:return""}}function Ho(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case fn:return"Fragment";case dn:return"Portal";case Wo:return"Profiler";case Wi:return"StrictMode";case Vo:return"Suspense";case Qo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case mu:return(e.displayName||"Context")+".Consumer";case pu:return(e._context.displayName||"Context")+".Provider";case Vi:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Qi:return t=e.displayName||null,t!==null?t:Ho(e.type)||"Memo";case bt:t=e._payload,e=e._init;try{return Ho(e(t))}catch{}}return null}function ef(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ho(t);case 8:return t===Wi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Dt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function gu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function tf(e){var t=gu(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(s){r=""+s,o.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(s){r=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Wr(e){e._valueTracker||(e._valueTracker=tf(e))}function xu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=gu(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function gl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ko(e,t){var n=t.checked;return X({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Us(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Dt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function vu(e,t){t=t.checked,t!=null&&Bi(e,"checked",t,!1)}function qo(e,t){vu(e,t);var n=Dt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Yo(e,t.type,n):t.hasOwnProperty("defaultValue")&&Yo(e,t.type,Dt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function $s(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Yo(e,t,n){(t!=="number"||gl(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Xn=Array.isArray;function jn(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Dt(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Go(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(N(91));return X({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function As(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(N(92));if(Xn(n)){if(1<n.length)throw Error(N(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Dt(n)}}function yu(e,t){var n=Dt(t.value),r=Dt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Bs(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function wu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Xo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?wu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Vr,bu=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Vr=Vr||document.createElement("div"),Vr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Vr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function cr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var er={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},nf=["Webkit","ms","Moz","O"];Object.keys(er).forEach(function(e){nf.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),er[t]=er[e]})});function ku(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||er.hasOwnProperty(e)&&er[e]?(""+t).trim():t+"px"}function ju(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=ku(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var rf=X({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Jo(e,t){if(t){if(rf[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(N(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(N(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(N(61))}if(t.style!=null&&typeof t.style!="object")throw Error(N(62))}}function Zo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ei=null;function Hi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ti=null,Nn=null,Sn=null;function Ws(e){if(e=Lr(e)){if(typeof ti!="function")throw Error(N(280));var t=e.stateNode;t&&(t=Ql(t),ti(e.stateNode,e.type,t))}}function Nu(e){Nn?Sn?Sn.push(e):Sn=[e]:Nn=e}function Su(){if(Nn){var e=Nn,t=Sn;if(Sn=Nn=null,Ws(e),t)for(e=0;e<t.length;e++)Ws(t[e])}}function Cu(e,t){return e(t)}function Eu(){}var vo=!1;function _u(e,t,n){if(vo)return e(t,n);vo=!0;try{return Cu(e,t,n)}finally{vo=!1,(Nn!==null||Sn!==null)&&(Eu(),Su())}}function dr(e,t){var n=e.stateNode;if(n===null)return null;var r=Ql(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(N(231,t,typeof n));return n}var ni=!1;if(ft)try{var Wn={};Object.defineProperty(Wn,"passive",{get:function(){ni=!0}}),window.addEventListener("test",Wn,Wn),window.removeEventListener("test",Wn,Wn)}catch{ni=!1}function lf(e,t,n,r,l,o,s,a,u){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(p){this.onError(p)}}var tr=!1,xl=null,vl=!1,ri=null,of={onError:function(e){tr=!0,xl=e}};function sf(e,t,n,r,l,o,s,a,u){tr=!1,xl=null,lf.apply(of,arguments)}function af(e,t,n,r,l,o,s,a,u){if(sf.apply(this,arguments),tr){if(tr){var c=xl;tr=!1,xl=null}else throw Error(N(198));vl||(vl=!0,ri=c)}}function rn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Pu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Vs(e){if(rn(e)!==e)throw Error(N(188))}function uf(e){var t=e.alternate;if(!t){if(t=rn(e),t===null)throw Error(N(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var o=l.alternate;if(o===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===o.child){for(o=l.child;o;){if(o===n)return Vs(l),e;if(o===r)return Vs(l),t;o=o.sibling}throw Error(N(188))}if(n.return!==r.return)n=l,r=o;else{for(var s=!1,a=l.child;a;){if(a===n){s=!0,n=l,r=o;break}if(a===r){s=!0,r=l,n=o;break}a=a.sibling}if(!s){for(a=o.child;a;){if(a===n){s=!0,n=o,r=l;break}if(a===r){s=!0,r=o,n=l;break}a=a.sibling}if(!s)throw Error(N(189))}}if(n.alternate!==r)throw Error(N(190))}if(n.tag!==3)throw Error(N(188));return n.stateNode.current===n?e:t}function zu(e){return e=uf(e),e!==null?Lu(e):null}function Lu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Lu(e);if(t!==null)return t;e=e.sibling}return null}var Tu=ze.unstable_scheduleCallback,Qs=ze.unstable_cancelCallback,cf=ze.unstable_shouldYield,df=ze.unstable_requestPaint,Z=ze.unstable_now,ff=ze.unstable_getCurrentPriorityLevel,Ki=ze.unstable_ImmediatePriority,Ru=ze.unstable_UserBlockingPriority,yl=ze.unstable_NormalPriority,pf=ze.unstable_LowPriority,Mu=ze.unstable_IdlePriority,Al=null,rt=null;function mf(e){if(rt&&typeof rt.onCommitFiberRoot=="function")try{rt.onCommitFiberRoot(Al,e,void 0,(e.current.flags&128)===128)}catch{}}var Ge=Math.clz32?Math.clz32:xf,hf=Math.log,gf=Math.LN2;function xf(e){return e>>>=0,e===0?32:31-(hf(e)/gf|0)|0}var Qr=64,Hr=4194304;function Jn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function wl(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,o=e.pingedLanes,s=n&268435455;if(s!==0){var a=s&~l;a!==0?r=Jn(a):(o&=s,o!==0&&(r=Jn(o)))}else s=n&~l,s!==0?r=Jn(s):o!==0&&(r=Jn(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&l)&&(l=r&-r,o=t&-t,l>=o||l===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ge(t),l=1<<n,r|=e[n],t&=~l;return r}function vf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function yf(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,o=e.pendingLanes;0<o;){var s=31-Ge(o),a=1<<s,u=l[s];u===-1?(!(a&n)||a&r)&&(l[s]=vf(a,t)):u<=t&&(e.expiredLanes|=a),o&=~a}}function li(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ou(){var e=Qr;return Qr<<=1,!(Qr&4194240)&&(Qr=64),e}function yo(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Pr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ge(t),e[t]=n}function wf(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-Ge(n),o=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~o}}function qi(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ge(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var A=0;function Du(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Iu,Yi,Fu,Uu,$u,oi=!1,Kr=[],_t=null,Pt=null,zt=null,fr=new Map,pr=new Map,jt=[],bf="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Hs(e,t){switch(e){case"focusin":case"focusout":_t=null;break;case"dragenter":case"dragleave":Pt=null;break;case"mouseover":case"mouseout":zt=null;break;case"pointerover":case"pointerout":fr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":pr.delete(t.pointerId)}}function Vn(e,t,n,r,l,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[l]},t!==null&&(t=Lr(t),t!==null&&Yi(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function kf(e,t,n,r,l){switch(t){case"focusin":return _t=Vn(_t,e,t,n,r,l),!0;case"dragenter":return Pt=Vn(Pt,e,t,n,r,l),!0;case"mouseover":return zt=Vn(zt,e,t,n,r,l),!0;case"pointerover":var o=l.pointerId;return fr.set(o,Vn(fr.get(o)||null,e,t,n,r,l)),!0;case"gotpointercapture":return o=l.pointerId,pr.set(o,Vn(pr.get(o)||null,e,t,n,r,l)),!0}return!1}function Au(e){var t=Qt(e.target);if(t!==null){var n=rn(t);if(n!==null){if(t=n.tag,t===13){if(t=Pu(n),t!==null){e.blockedOn=t,$u(e.priority,function(){Fu(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function il(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=ii(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);ei=r,n.target.dispatchEvent(r),ei=null}else return t=Lr(n),t!==null&&Yi(t),e.blockedOn=n,!1;t.shift()}return!0}function Ks(e,t,n){il(e)&&n.delete(t)}function jf(){oi=!1,_t!==null&&il(_t)&&(_t=null),Pt!==null&&il(Pt)&&(Pt=null),zt!==null&&il(zt)&&(zt=null),fr.forEach(Ks),pr.forEach(Ks)}function Qn(e,t){e.blockedOn===t&&(e.blockedOn=null,oi||(oi=!0,ze.unstable_scheduleCallback(ze.unstable_NormalPriority,jf)))}function mr(e){function t(l){return Qn(l,e)}if(0<Kr.length){Qn(Kr[0],e);for(var n=1;n<Kr.length;n++){var r=Kr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(_t!==null&&Qn(_t,e),Pt!==null&&Qn(Pt,e),zt!==null&&Qn(zt,e),fr.forEach(t),pr.forEach(t),n=0;n<jt.length;n++)r=jt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<jt.length&&(n=jt[0],n.blockedOn===null);)Au(n),n.blockedOn===null&&jt.shift()}var Cn=gt.ReactCurrentBatchConfig,bl=!0;function Nf(e,t,n,r){var l=A,o=Cn.transition;Cn.transition=null;try{A=1,Gi(e,t,n,r)}finally{A=l,Cn.transition=o}}function Sf(e,t,n,r){var l=A,o=Cn.transition;Cn.transition=null;try{A=4,Gi(e,t,n,r)}finally{A=l,Cn.transition=o}}function Gi(e,t,n,r){if(bl){var l=ii(e,t,n,r);if(l===null)Po(e,t,r,kl,n),Hs(e,r);else if(kf(l,e,t,n,r))r.stopPropagation();else if(Hs(e,r),t&4&&-1<bf.indexOf(e)){for(;l!==null;){var o=Lr(l);if(o!==null&&Iu(o),o=ii(e,t,n,r),o===null&&Po(e,t,r,kl,n),o===l)break;l=o}l!==null&&r.stopPropagation()}else Po(e,t,r,null,n)}}var kl=null;function ii(e,t,n,r){if(kl=null,e=Hi(r),e=Qt(e),e!==null)if(t=rn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Pu(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return kl=e,null}function Bu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ff()){case Ki:return 1;case Ru:return 4;case yl:case pf:return 16;case Mu:return 536870912;default:return 16}default:return 16}}var St=null,Xi=null,sl=null;function Wu(){if(sl)return sl;var e,t=Xi,n=t.length,r,l="value"in St?St.value:St.textContent,o=l.length;for(e=0;e<n&&t[e]===l[e];e++);var s=n-e;for(r=1;r<=s&&t[n-r]===l[o-r];r++);return sl=l.slice(e,1<r?1-r:void 0)}function al(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function qr(){return!0}function qs(){return!1}function Te(e){function t(n,r,l,o,s){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=o,this.target=s,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(o):o[a]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?qr:qs,this.isPropagationStopped=qs,this}return X(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=qr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=qr)},persist:function(){},isPersistent:qr}),t}var In={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ji=Te(In),zr=X({},In,{view:0,detail:0}),Cf=Te(zr),wo,bo,Hn,Bl=X({},zr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Zi,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Hn&&(Hn&&e.type==="mousemove"?(wo=e.screenX-Hn.screenX,bo=e.screenY-Hn.screenY):bo=wo=0,Hn=e),wo)},movementY:function(e){return"movementY"in e?e.movementY:bo}}),Ys=Te(Bl),Ef=X({},Bl,{dataTransfer:0}),_f=Te(Ef),Pf=X({},zr,{relatedTarget:0}),ko=Te(Pf),zf=X({},In,{animationName:0,elapsedTime:0,pseudoElement:0}),Lf=Te(zf),Tf=X({},In,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Rf=Te(Tf),Mf=X({},In,{data:0}),Gs=Te(Mf),Of={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Df={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},If={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ff(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=If[e])?!!t[e]:!1}function Zi(){return Ff}var Uf=X({},zr,{key:function(e){if(e.key){var t=Of[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=al(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Df[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Zi,charCode:function(e){return e.type==="keypress"?al(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?al(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),$f=Te(Uf),Af=X({},Bl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Xs=Te(Af),Bf=X({},zr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Zi}),Wf=Te(Bf),Vf=X({},In,{propertyName:0,elapsedTime:0,pseudoElement:0}),Qf=Te(Vf),Hf=X({},Bl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Kf=Te(Hf),qf=[9,13,27,32],es=ft&&"CompositionEvent"in window,nr=null;ft&&"documentMode"in document&&(nr=document.documentMode);var Yf=ft&&"TextEvent"in window&&!nr,Vu=ft&&(!es||nr&&8<nr&&11>=nr),Js=" ",Zs=!1;function Qu(e,t){switch(e){case"keyup":return qf.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Hu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var pn=!1;function Gf(e,t){switch(e){case"compositionend":return Hu(t);case"keypress":return t.which!==32?null:(Zs=!0,Js);case"textInput":return e=t.data,e===Js&&Zs?null:e;default:return null}}function Xf(e,t){if(pn)return e==="compositionend"||!es&&Qu(e,t)?(e=Wu(),sl=Xi=St=null,pn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Vu&&t.locale!=="ko"?null:t.data;default:return null}}var Jf={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ea(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Jf[e.type]:t==="textarea"}function Ku(e,t,n,r){Nu(r),t=jl(t,"onChange"),0<t.length&&(n=new Ji("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var rr=null,hr=null;function Zf(e){lc(e,0)}function Wl(e){var t=gn(e);if(xu(t))return e}function ep(e,t){if(e==="change")return t}var qu=!1;if(ft){var jo;if(ft){var No="oninput"in document;if(!No){var ta=document.createElement("div");ta.setAttribute("oninput","return;"),No=typeof ta.oninput=="function"}jo=No}else jo=!1;qu=jo&&(!document.documentMode||9<document.documentMode)}function na(){rr&&(rr.detachEvent("onpropertychange",Yu),hr=rr=null)}function Yu(e){if(e.propertyName==="value"&&Wl(hr)){var t=[];Ku(t,hr,e,Hi(e)),_u(Zf,t)}}function tp(e,t,n){e==="focusin"?(na(),rr=t,hr=n,rr.attachEvent("onpropertychange",Yu)):e==="focusout"&&na()}function np(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Wl(hr)}function rp(e,t){if(e==="click")return Wl(t)}function lp(e,t){if(e==="input"||e==="change")return Wl(t)}function op(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Je=typeof Object.is=="function"?Object.is:op;function gr(e,t){if(Je(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!Bo.call(t,l)||!Je(e[l],t[l]))return!1}return!0}function ra(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function la(e,t){var n=ra(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ra(n)}}function Gu(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Gu(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Xu(){for(var e=window,t=gl();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=gl(e.document)}return t}function ts(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function ip(e){var t=Xu(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Gu(n.ownerDocument.documentElement,n)){if(r!==null&&ts(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,o=Math.min(r.start,l);r=r.end===void 0?o:Math.min(r.end,l),!e.extend&&o>r&&(l=r,r=o,o=l),l=la(n,o);var s=la(n,r);l&&s&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var sp=ft&&"documentMode"in document&&11>=document.documentMode,mn=null,si=null,lr=null,ai=!1;function oa(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ai||mn==null||mn!==gl(r)||(r=mn,"selectionStart"in r&&ts(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),lr&&gr(lr,r)||(lr=r,r=jl(si,"onSelect"),0<r.length&&(t=new Ji("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=mn)))}function Yr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var hn={animationend:Yr("Animation","AnimationEnd"),animationiteration:Yr("Animation","AnimationIteration"),animationstart:Yr("Animation","AnimationStart"),transitionend:Yr("Transition","TransitionEnd")},So={},Ju={};ft&&(Ju=document.createElement("div").style,"AnimationEvent"in window||(delete hn.animationend.animation,delete hn.animationiteration.animation,delete hn.animationstart.animation),"TransitionEvent"in window||delete hn.transitionend.transition);function Vl(e){if(So[e])return So[e];if(!hn[e])return e;var t=hn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ju)return So[e]=t[n];return e}var Zu=Vl("animationend"),ec=Vl("animationiteration"),tc=Vl("animationstart"),nc=Vl("transitionend"),rc=new Map,ia="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ft(e,t){rc.set(e,t),nn(t,[e])}for(var Co=0;Co<ia.length;Co++){var Eo=ia[Co],ap=Eo.toLowerCase(),up=Eo[0].toUpperCase()+Eo.slice(1);Ft(ap,"on"+up)}Ft(Zu,"onAnimationEnd");Ft(ec,"onAnimationIteration");Ft(tc,"onAnimationStart");Ft("dblclick","onDoubleClick");Ft("focusin","onFocus");Ft("focusout","onBlur");Ft(nc,"onTransitionEnd");Pn("onMouseEnter",["mouseout","mouseover"]);Pn("onMouseLeave",["mouseout","mouseover"]);Pn("onPointerEnter",["pointerout","pointerover"]);Pn("onPointerLeave",["pointerout","pointerover"]);nn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));nn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));nn("onBeforeInput",["compositionend","keypress","textInput","paste"]);nn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));nn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));nn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Zn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),cp=new Set("cancel close invalid load scroll toggle".split(" ").concat(Zn));function sa(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,af(r,t,void 0,e),e.currentTarget=null}function lc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var s=r.length-1;0<=s;s--){var a=r[s],u=a.instance,c=a.currentTarget;if(a=a.listener,u!==o&&l.isPropagationStopped())break e;sa(l,a,c),o=u}else for(s=0;s<r.length;s++){if(a=r[s],u=a.instance,c=a.currentTarget,a=a.listener,u!==o&&l.isPropagationStopped())break e;sa(l,a,c),o=u}}}if(vl)throw e=ri,vl=!1,ri=null,e}function Q(e,t){var n=t[pi];n===void 0&&(n=t[pi]=new Set);var r=e+"__bubble";n.has(r)||(oc(t,e,2,!1),n.add(r))}function _o(e,t,n){var r=0;t&&(r|=4),oc(n,e,r,t)}var Gr="_reactListening"+Math.random().toString(36).slice(2);function xr(e){if(!e[Gr]){e[Gr]=!0,fu.forEach(function(n){n!=="selectionchange"&&(cp.has(n)||_o(n,!1,e),_o(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Gr]||(t[Gr]=!0,_o("selectionchange",!1,t))}}function oc(e,t,n,r){switch(Bu(t)){case 1:var l=Nf;break;case 4:l=Sf;break;default:l=Gi}n=l.bind(null,t,n,e),l=void 0,!ni||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function Po(e,t,n,r,l){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var a=r.stateNode.containerInfo;if(a===l||a.nodeType===8&&a.parentNode===l)break;if(s===4)for(s=r.return;s!==null;){var u=s.tag;if((u===3||u===4)&&(u=s.stateNode.containerInfo,u===l||u.nodeType===8&&u.parentNode===l))return;s=s.return}for(;a!==null;){if(s=Qt(a),s===null)return;if(u=s.tag,u===5||u===6){r=o=s;continue e}a=a.parentNode}}r=r.return}_u(function(){var c=o,p=Hi(n),d=[];e:{var h=rc.get(e);if(h!==void 0){var y=Ji,w=e;switch(e){case"keypress":if(al(n)===0)break e;case"keydown":case"keyup":y=$f;break;case"focusin":w="focus",y=ko;break;case"focusout":w="blur",y=ko;break;case"beforeblur":case"afterblur":y=ko;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=Ys;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=_f;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=Wf;break;case Zu:case ec:case tc:y=Lf;break;case nc:y=Qf;break;case"scroll":y=Cf;break;case"wheel":y=Kf;break;case"copy":case"cut":case"paste":y=Rf;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=Xs}var b=(t&4)!==0,j=!b&&e==="scroll",m=b?h!==null?h+"Capture":null:h;b=[];for(var f=c,g;f!==null;){g=f;var k=g.stateNode;if(g.tag===5&&k!==null&&(g=k,m!==null&&(k=dr(f,m),k!=null&&b.push(vr(f,k,g)))),j)break;f=f.return}0<b.length&&(h=new y(h,w,null,n,p),d.push({event:h,listeners:b}))}}if(!(t&7)){e:{if(h=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",h&&n!==ei&&(w=n.relatedTarget||n.fromElement)&&(Qt(w)||w[pt]))break e;if((y||h)&&(h=p.window===p?p:(h=p.ownerDocument)?h.defaultView||h.parentWindow:window,y?(w=n.relatedTarget||n.toElement,y=c,w=w?Qt(w):null,w!==null&&(j=rn(w),w!==j||w.tag!==5&&w.tag!==6)&&(w=null)):(y=null,w=c),y!==w)){if(b=Ys,k="onMouseLeave",m="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(b=Xs,k="onPointerLeave",m="onPointerEnter",f="pointer"),j=y==null?h:gn(y),g=w==null?h:gn(w),h=new b(k,f+"leave",y,n,p),h.target=j,h.relatedTarget=g,k=null,Qt(p)===c&&(b=new b(m,f+"enter",w,n,p),b.target=g,b.relatedTarget=j,k=b),j=k,y&&w)t:{for(b=y,m=w,f=0,g=b;g;g=an(g))f++;for(g=0,k=m;k;k=an(k))g++;for(;0<f-g;)b=an(b),f--;for(;0<g-f;)m=an(m),g--;for(;f--;){if(b===m||m!==null&&b===m.alternate)break t;b=an(b),m=an(m)}b=null}else b=null;y!==null&&aa(d,h,y,b,!1),w!==null&&j!==null&&aa(d,j,w,b,!0)}}e:{if(h=c?gn(c):window,y=h.nodeName&&h.nodeName.toLowerCase(),y==="select"||y==="input"&&h.type==="file")var C=ep;else if(ea(h))if(qu)C=lp;else{C=np;var z=tp}else(y=h.nodeName)&&y.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(C=rp);if(C&&(C=C(e,c))){Ku(d,C,n,p);break e}z&&z(e,h,c),e==="focusout"&&(z=h._wrapperState)&&z.controlled&&h.type==="number"&&Yo(h,"number",h.value)}switch(z=c?gn(c):window,e){case"focusin":(ea(z)||z.contentEditable==="true")&&(mn=z,si=c,lr=null);break;case"focusout":lr=si=mn=null;break;case"mousedown":ai=!0;break;case"contextmenu":case"mouseup":case"dragend":ai=!1,oa(d,n,p);break;case"selectionchange":if(sp)break;case"keydown":case"keyup":oa(d,n,p)}var P;if(es)e:{switch(e){case"compositionstart":var T="onCompositionStart";break e;case"compositionend":T="onCompositionEnd";break e;case"compositionupdate":T="onCompositionUpdate";break e}T=void 0}else pn?Qu(e,n)&&(T="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(T="onCompositionStart");T&&(Vu&&n.locale!=="ko"&&(pn||T!=="onCompositionStart"?T==="onCompositionEnd"&&pn&&(P=Wu()):(St=p,Xi="value"in St?St.value:St.textContent,pn=!0)),z=jl(c,T),0<z.length&&(T=new Gs(T,e,null,n,p),d.push({event:T,listeners:z}),P?T.data=P:(P=Hu(n),P!==null&&(T.data=P)))),(P=Yf?Gf(e,n):Xf(e,n))&&(c=jl(c,"onBeforeInput"),0<c.length&&(p=new Gs("onBeforeInput","beforeinput",null,n,p),d.push({event:p,listeners:c}),p.data=P))}lc(d,t)})}function vr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function jl(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,o=l.stateNode;l.tag===5&&o!==null&&(l=o,o=dr(e,n),o!=null&&r.unshift(vr(e,o,l)),o=dr(e,t),o!=null&&r.push(vr(e,o,l))),e=e.return}return r}function an(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function aa(e,t,n,r,l){for(var o=t._reactName,s=[];n!==null&&n!==r;){var a=n,u=a.alternate,c=a.stateNode;if(u!==null&&u===r)break;a.tag===5&&c!==null&&(a=c,l?(u=dr(n,o),u!=null&&s.unshift(vr(n,u,a))):l||(u=dr(n,o),u!=null&&s.push(vr(n,u,a)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var dp=/\r\n?/g,fp=/\u0000|\uFFFD/g;function ua(e){return(typeof e=="string"?e:""+e).replace(dp,`
`).replace(fp,"")}function Xr(e,t,n){if(t=ua(t),ua(e)!==t&&n)throw Error(N(425))}function Nl(){}var ui=null,ci=null;function di(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var fi=typeof setTimeout=="function"?setTimeout:void 0,pp=typeof clearTimeout=="function"?clearTimeout:void 0,ca=typeof Promise=="function"?Promise:void 0,mp=typeof queueMicrotask=="function"?queueMicrotask:typeof ca<"u"?function(e){return ca.resolve(null).then(e).catch(hp)}:fi;function hp(e){setTimeout(function(){throw e})}function zo(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),mr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);mr(t)}function Lt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function da(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Fn=Math.random().toString(36).slice(2),nt="__reactFiber$"+Fn,yr="__reactProps$"+Fn,pt="__reactContainer$"+Fn,pi="__reactEvents$"+Fn,gp="__reactListeners$"+Fn,xp="__reactHandles$"+Fn;function Qt(e){var t=e[nt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[pt]||n[nt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=da(e);e!==null;){if(n=e[nt])return n;e=da(e)}return t}e=n,n=e.parentNode}return null}function Lr(e){return e=e[nt]||e[pt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function gn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(N(33))}function Ql(e){return e[yr]||null}var mi=[],xn=-1;function Ut(e){return{current:e}}function H(e){0>xn||(e.current=mi[xn],mi[xn]=null,xn--)}function V(e,t){xn++,mi[xn]=e.current,e.current=t}var It={},me=Ut(It),be=Ut(!1),Xt=It;function zn(e,t){var n=e.type.contextTypes;if(!n)return It;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},o;for(o in n)l[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function ke(e){return e=e.childContextTypes,e!=null}function Sl(){H(be),H(me)}function fa(e,t,n){if(me.current!==It)throw Error(N(168));V(me,t),V(be,n)}function ic(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(N(108,ef(e)||"Unknown",l));return X({},n,r)}function Cl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||It,Xt=me.current,V(me,e),V(be,be.current),!0}function pa(e,t,n){var r=e.stateNode;if(!r)throw Error(N(169));n?(e=ic(e,t,Xt),r.__reactInternalMemoizedMergedChildContext=e,H(be),H(me),V(me,e)):H(be),V(be,n)}var at=null,Hl=!1,Lo=!1;function sc(e){at===null?at=[e]:at.push(e)}function vp(e){Hl=!0,sc(e)}function $t(){if(!Lo&&at!==null){Lo=!0;var e=0,t=A;try{var n=at;for(A=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}at=null,Hl=!1}catch(l){throw at!==null&&(at=at.slice(e+1)),Tu(Ki,$t),l}finally{A=t,Lo=!1}}return null}var vn=[],yn=0,El=null,_l=0,De=[],Ie=0,Jt=null,ut=1,ct="";function Wt(e,t){vn[yn++]=_l,vn[yn++]=El,El=e,_l=t}function ac(e,t,n){De[Ie++]=ut,De[Ie++]=ct,De[Ie++]=Jt,Jt=e;var r=ut;e=ct;var l=32-Ge(r)-1;r&=~(1<<l),n+=1;var o=32-Ge(t)+l;if(30<o){var s=l-l%5;o=(r&(1<<s)-1).toString(32),r>>=s,l-=s,ut=1<<32-Ge(t)+l|n<<l|r,ct=o+e}else ut=1<<o|n<<l|r,ct=e}function ns(e){e.return!==null&&(Wt(e,1),ac(e,1,0))}function rs(e){for(;e===El;)El=vn[--yn],vn[yn]=null,_l=vn[--yn],vn[yn]=null;for(;e===Jt;)Jt=De[--Ie],De[Ie]=null,ct=De[--Ie],De[Ie]=null,ut=De[--Ie],De[Ie]=null}var Pe=null,_e=null,q=!1,Ye=null;function uc(e,t){var n=Fe(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function ma(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Pe=e,_e=Lt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Pe=e,_e=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Jt!==null?{id:ut,overflow:ct}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Fe(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Pe=e,_e=null,!0):!1;default:return!1}}function hi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function gi(e){if(q){var t=_e;if(t){var n=t;if(!ma(e,t)){if(hi(e))throw Error(N(418));t=Lt(n.nextSibling);var r=Pe;t&&ma(e,t)?uc(r,n):(e.flags=e.flags&-4097|2,q=!1,Pe=e)}}else{if(hi(e))throw Error(N(418));e.flags=e.flags&-4097|2,q=!1,Pe=e}}}function ha(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Pe=e}function Jr(e){if(e!==Pe)return!1;if(!q)return ha(e),q=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!di(e.type,e.memoizedProps)),t&&(t=_e)){if(hi(e))throw cc(),Error(N(418));for(;t;)uc(e,t),t=Lt(t.nextSibling)}if(ha(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(N(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){_e=Lt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}_e=null}}else _e=Pe?Lt(e.stateNode.nextSibling):null;return!0}function cc(){for(var e=_e;e;)e=Lt(e.nextSibling)}function Ln(){_e=Pe=null,q=!1}function ls(e){Ye===null?Ye=[e]:Ye.push(e)}var yp=gt.ReactCurrentBatchConfig;function Kn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(N(309));var r=n.stateNode}if(!r)throw Error(N(147,e));var l=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(s){var a=l.refs;s===null?delete a[o]:a[o]=s},t._stringRef=o,t)}if(typeof e!="string")throw Error(N(284));if(!n._owner)throw Error(N(290,e))}return e}function Zr(e,t){throw e=Object.prototype.toString.call(t),Error(N(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function ga(e){var t=e._init;return t(e._payload)}function dc(e){function t(m,f){if(e){var g=m.deletions;g===null?(m.deletions=[f],m.flags|=16):g.push(f)}}function n(m,f){if(!e)return null;for(;f!==null;)t(m,f),f=f.sibling;return null}function r(m,f){for(m=new Map;f!==null;)f.key!==null?m.set(f.key,f):m.set(f.index,f),f=f.sibling;return m}function l(m,f){return m=Ot(m,f),m.index=0,m.sibling=null,m}function o(m,f,g){return m.index=g,e?(g=m.alternate,g!==null?(g=g.index,g<f?(m.flags|=2,f):g):(m.flags|=2,f)):(m.flags|=1048576,f)}function s(m){return e&&m.alternate===null&&(m.flags|=2),m}function a(m,f,g,k){return f===null||f.tag!==6?(f=Fo(g,m.mode,k),f.return=m,f):(f=l(f,g),f.return=m,f)}function u(m,f,g,k){var C=g.type;return C===fn?p(m,f,g.props.children,k,g.key):f!==null&&(f.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===bt&&ga(C)===f.type)?(k=l(f,g.props),k.ref=Kn(m,f,g),k.return=m,k):(k=hl(g.type,g.key,g.props,null,m.mode,k),k.ref=Kn(m,f,g),k.return=m,k)}function c(m,f,g,k){return f===null||f.tag!==4||f.stateNode.containerInfo!==g.containerInfo||f.stateNode.implementation!==g.implementation?(f=Uo(g,m.mode,k),f.return=m,f):(f=l(f,g.children||[]),f.return=m,f)}function p(m,f,g,k,C){return f===null||f.tag!==7?(f=Yt(g,m.mode,k,C),f.return=m,f):(f=l(f,g),f.return=m,f)}function d(m,f,g){if(typeof f=="string"&&f!==""||typeof f=="number")return f=Fo(""+f,m.mode,g),f.return=m,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Br:return g=hl(f.type,f.key,f.props,null,m.mode,g),g.ref=Kn(m,null,f),g.return=m,g;case dn:return f=Uo(f,m.mode,g),f.return=m,f;case bt:var k=f._init;return d(m,k(f._payload),g)}if(Xn(f)||Bn(f))return f=Yt(f,m.mode,g,null),f.return=m,f;Zr(m,f)}return null}function h(m,f,g,k){var C=f!==null?f.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return C!==null?null:a(m,f,""+g,k);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Br:return g.key===C?u(m,f,g,k):null;case dn:return g.key===C?c(m,f,g,k):null;case bt:return C=g._init,h(m,f,C(g._payload),k)}if(Xn(g)||Bn(g))return C!==null?null:p(m,f,g,k,null);Zr(m,g)}return null}function y(m,f,g,k,C){if(typeof k=="string"&&k!==""||typeof k=="number")return m=m.get(g)||null,a(f,m,""+k,C);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Br:return m=m.get(k.key===null?g:k.key)||null,u(f,m,k,C);case dn:return m=m.get(k.key===null?g:k.key)||null,c(f,m,k,C);case bt:var z=k._init;return y(m,f,g,z(k._payload),C)}if(Xn(k)||Bn(k))return m=m.get(g)||null,p(f,m,k,C,null);Zr(f,k)}return null}function w(m,f,g,k){for(var C=null,z=null,P=f,T=f=0,B=null;P!==null&&T<g.length;T++){P.index>T?(B=P,P=null):B=P.sibling;var D=h(m,P,g[T],k);if(D===null){P===null&&(P=B);break}e&&P&&D.alternate===null&&t(m,P),f=o(D,f,T),z===null?C=D:z.sibling=D,z=D,P=B}if(T===g.length)return n(m,P),q&&Wt(m,T),C;if(P===null){for(;T<g.length;T++)P=d(m,g[T],k),P!==null&&(f=o(P,f,T),z===null?C=P:z.sibling=P,z=P);return q&&Wt(m,T),C}for(P=r(m,P);T<g.length;T++)B=y(P,m,T,g[T],k),B!==null&&(e&&B.alternate!==null&&P.delete(B.key===null?T:B.key),f=o(B,f,T),z===null?C=B:z.sibling=B,z=B);return e&&P.forEach(function(ue){return t(m,ue)}),q&&Wt(m,T),C}function b(m,f,g,k){var C=Bn(g);if(typeof C!="function")throw Error(N(150));if(g=C.call(g),g==null)throw Error(N(151));for(var z=C=null,P=f,T=f=0,B=null,D=g.next();P!==null&&!D.done;T++,D=g.next()){P.index>T?(B=P,P=null):B=P.sibling;var ue=h(m,P,D.value,k);if(ue===null){P===null&&(P=B);break}e&&P&&ue.alternate===null&&t(m,P),f=o(ue,f,T),z===null?C=ue:z.sibling=ue,z=ue,P=B}if(D.done)return n(m,P),q&&Wt(m,T),C;if(P===null){for(;!D.done;T++,D=g.next())D=d(m,D.value,k),D!==null&&(f=o(D,f,T),z===null?C=D:z.sibling=D,z=D);return q&&Wt(m,T),C}for(P=r(m,P);!D.done;T++,D=g.next())D=y(P,m,T,D.value,k),D!==null&&(e&&D.alternate!==null&&P.delete(D.key===null?T:D.key),f=o(D,f,T),z===null?C=D:z.sibling=D,z=D);return e&&P.forEach(function(Re){return t(m,Re)}),q&&Wt(m,T),C}function j(m,f,g,k){if(typeof g=="object"&&g!==null&&g.type===fn&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case Br:e:{for(var C=g.key,z=f;z!==null;){if(z.key===C){if(C=g.type,C===fn){if(z.tag===7){n(m,z.sibling),f=l(z,g.props.children),f.return=m,m=f;break e}}else if(z.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===bt&&ga(C)===z.type){n(m,z.sibling),f=l(z,g.props),f.ref=Kn(m,z,g),f.return=m,m=f;break e}n(m,z);break}else t(m,z);z=z.sibling}g.type===fn?(f=Yt(g.props.children,m.mode,k,g.key),f.return=m,m=f):(k=hl(g.type,g.key,g.props,null,m.mode,k),k.ref=Kn(m,f,g),k.return=m,m=k)}return s(m);case dn:e:{for(z=g.key;f!==null;){if(f.key===z)if(f.tag===4&&f.stateNode.containerInfo===g.containerInfo&&f.stateNode.implementation===g.implementation){n(m,f.sibling),f=l(f,g.children||[]),f.return=m,m=f;break e}else{n(m,f);break}else t(m,f);f=f.sibling}f=Uo(g,m.mode,k),f.return=m,m=f}return s(m);case bt:return z=g._init,j(m,f,z(g._payload),k)}if(Xn(g))return w(m,f,g,k);if(Bn(g))return b(m,f,g,k);Zr(m,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,f!==null&&f.tag===6?(n(m,f.sibling),f=l(f,g),f.return=m,m=f):(n(m,f),f=Fo(g,m.mode,k),f.return=m,m=f),s(m)):n(m,f)}return j}var Tn=dc(!0),fc=dc(!1),Pl=Ut(null),zl=null,wn=null,os=null;function is(){os=wn=zl=null}function ss(e){var t=Pl.current;H(Pl),e._currentValue=t}function xi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function En(e,t){zl=e,os=wn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(we=!0),e.firstContext=null)}function $e(e){var t=e._currentValue;if(os!==e)if(e={context:e,memoizedValue:t,next:null},wn===null){if(zl===null)throw Error(N(308));wn=e,zl.dependencies={lanes:0,firstContext:e}}else wn=wn.next=e;return t}var Ht=null;function as(e){Ht===null?Ht=[e]:Ht.push(e)}function pc(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,as(t)):(n.next=l.next,l.next=n),t.interleaved=n,mt(e,r)}function mt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var kt=!1;function us(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function mc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function dt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Tt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,F&2){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,mt(e,n)}return l=r.interleaved,l===null?(t.next=t,as(r)):(t.next=l.next,l.next=t),r.interleaved=t,mt(e,n)}function ul(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,qi(e,n)}}function xa(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?l=o=s:o=o.next=s,n=n.next}while(n!==null);o===null?l=o=t:o=o.next=t}else l=o=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Ll(e,t,n,r){var l=e.updateQueue;kt=!1;var o=l.firstBaseUpdate,s=l.lastBaseUpdate,a=l.shared.pending;if(a!==null){l.shared.pending=null;var u=a,c=u.next;u.next=null,s===null?o=c:s.next=c,s=u;var p=e.alternate;p!==null&&(p=p.updateQueue,a=p.lastBaseUpdate,a!==s&&(a===null?p.firstBaseUpdate=c:a.next=c,p.lastBaseUpdate=u))}if(o!==null){var d=l.baseState;s=0,p=c=u=null,a=o;do{var h=a.lane,y=a.eventTime;if((r&h)===h){p!==null&&(p=p.next={eventTime:y,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var w=e,b=a;switch(h=t,y=n,b.tag){case 1:if(w=b.payload,typeof w=="function"){d=w.call(y,d,h);break e}d=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=b.payload,h=typeof w=="function"?w.call(y,d,h):w,h==null)break e;d=X({},d,h);break e;case 2:kt=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,h=l.effects,h===null?l.effects=[a]:h.push(a))}else y={eventTime:y,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},p===null?(c=p=y,u=d):p=p.next=y,s|=h;if(a=a.next,a===null){if(a=l.shared.pending,a===null)break;h=a,a=h.next,h.next=null,l.lastBaseUpdate=h,l.shared.pending=null}}while(!0);if(p===null&&(u=d),l.baseState=u,l.firstBaseUpdate=c,l.lastBaseUpdate=p,t=l.shared.interleaved,t!==null){l=t;do s|=l.lane,l=l.next;while(l!==t)}else o===null&&(l.shared.lanes=0);en|=s,e.lanes=s,e.memoizedState=d}}function va(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(N(191,l));l.call(r)}}}var Tr={},lt=Ut(Tr),wr=Ut(Tr),br=Ut(Tr);function Kt(e){if(e===Tr)throw Error(N(174));return e}function cs(e,t){switch(V(br,t),V(wr,e),V(lt,Tr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Xo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Xo(t,e)}H(lt),V(lt,t)}function Rn(){H(lt),H(wr),H(br)}function hc(e){Kt(br.current);var t=Kt(lt.current),n=Xo(t,e.type);t!==n&&(V(wr,e),V(lt,n))}function ds(e){wr.current===e&&(H(lt),H(wr))}var Y=Ut(0);function Tl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var To=[];function fs(){for(var e=0;e<To.length;e++)To[e]._workInProgressVersionPrimary=null;To.length=0}var cl=gt.ReactCurrentDispatcher,Ro=gt.ReactCurrentBatchConfig,Zt=0,G=null,ne=null,le=null,Rl=!1,or=!1,kr=0,wp=0;function ce(){throw Error(N(321))}function ps(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Je(e[n],t[n]))return!1;return!0}function ms(e,t,n,r,l,o){if(Zt=o,G=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,cl.current=e===null||e.memoizedState===null?Np:Sp,e=n(r,l),or){o=0;do{if(or=!1,kr=0,25<=o)throw Error(N(301));o+=1,le=ne=null,t.updateQueue=null,cl.current=Cp,e=n(r,l)}while(or)}if(cl.current=Ml,t=ne!==null&&ne.next!==null,Zt=0,le=ne=G=null,Rl=!1,t)throw Error(N(300));return e}function hs(){var e=kr!==0;return kr=0,e}function tt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return le===null?G.memoizedState=le=e:le=le.next=e,le}function Ae(){if(ne===null){var e=G.alternate;e=e!==null?e.memoizedState:null}else e=ne.next;var t=le===null?G.memoizedState:le.next;if(t!==null)le=t,ne=e;else{if(e===null)throw Error(N(310));ne=e,e={memoizedState:ne.memoizedState,baseState:ne.baseState,baseQueue:ne.baseQueue,queue:ne.queue,next:null},le===null?G.memoizedState=le=e:le=le.next=e}return le}function jr(e,t){return typeof t=="function"?t(e):t}function Mo(e){var t=Ae(),n=t.queue;if(n===null)throw Error(N(311));n.lastRenderedReducer=e;var r=ne,l=r.baseQueue,o=n.pending;if(o!==null){if(l!==null){var s=l.next;l.next=o.next,o.next=s}r.baseQueue=l=o,n.pending=null}if(l!==null){o=l.next,r=r.baseState;var a=s=null,u=null,c=o;do{var p=c.lane;if((Zt&p)===p)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var d={lane:p,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(a=u=d,s=r):u=u.next=d,G.lanes|=p,en|=p}c=c.next}while(c!==null&&c!==o);u===null?s=r:u.next=a,Je(r,t.memoizedState)||(we=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do o=l.lane,G.lanes|=o,en|=o,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Oo(e){var t=Ae(),n=t.queue;if(n===null)throw Error(N(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,o=t.memoizedState;if(l!==null){n.pending=null;var s=l=l.next;do o=e(o,s.action),s=s.next;while(s!==l);Je(o,t.memoizedState)||(we=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function gc(){}function xc(e,t){var n=G,r=Ae(),l=t(),o=!Je(r.memoizedState,l);if(o&&(r.memoizedState=l,we=!0),r=r.queue,gs(wc.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||le!==null&&le.memoizedState.tag&1){if(n.flags|=2048,Nr(9,yc.bind(null,n,r,l,t),void 0,null),oe===null)throw Error(N(349));Zt&30||vc(n,t,l)}return l}function vc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=G.updateQueue,t===null?(t={lastEffect:null,stores:null},G.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function yc(e,t,n,r){t.value=n,t.getSnapshot=r,bc(t)&&kc(e)}function wc(e,t,n){return n(function(){bc(t)&&kc(e)})}function bc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Je(e,n)}catch{return!0}}function kc(e){var t=mt(e,1);t!==null&&Xe(t,e,1,-1)}function ya(e){var t=tt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:jr,lastRenderedState:e},t.queue=e,e=e.dispatch=jp.bind(null,G,e),[t.memoizedState,e]}function Nr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=G.updateQueue,t===null?(t={lastEffect:null,stores:null},G.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function jc(){return Ae().memoizedState}function dl(e,t,n,r){var l=tt();G.flags|=e,l.memoizedState=Nr(1|t,n,void 0,r===void 0?null:r)}function Kl(e,t,n,r){var l=Ae();r=r===void 0?null:r;var o=void 0;if(ne!==null){var s=ne.memoizedState;if(o=s.destroy,r!==null&&ps(r,s.deps)){l.memoizedState=Nr(t,n,o,r);return}}G.flags|=e,l.memoizedState=Nr(1|t,n,o,r)}function wa(e,t){return dl(8390656,8,e,t)}function gs(e,t){return Kl(2048,8,e,t)}function Nc(e,t){return Kl(4,2,e,t)}function Sc(e,t){return Kl(4,4,e,t)}function Cc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ec(e,t,n){return n=n!=null?n.concat([e]):null,Kl(4,4,Cc.bind(null,t,e),n)}function xs(){}function _c(e,t){var n=Ae();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&ps(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Pc(e,t){var n=Ae();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&ps(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function zc(e,t,n){return Zt&21?(Je(n,t)||(n=Ou(),G.lanes|=n,en|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,we=!0),e.memoizedState=n)}function bp(e,t){var n=A;A=n!==0&&4>n?n:4,e(!0);var r=Ro.transition;Ro.transition={};try{e(!1),t()}finally{A=n,Ro.transition=r}}function Lc(){return Ae().memoizedState}function kp(e,t,n){var r=Mt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Tc(e))Rc(t,n);else if(n=pc(e,t,n,r),n!==null){var l=ge();Xe(n,e,r,l),Mc(n,t,r)}}function jp(e,t,n){var r=Mt(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Tc(e))Rc(t,l);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var s=t.lastRenderedState,a=o(s,n);if(l.hasEagerState=!0,l.eagerState=a,Je(a,s)){var u=t.interleaved;u===null?(l.next=l,as(t)):(l.next=u.next,u.next=l),t.interleaved=l;return}}catch{}finally{}n=pc(e,t,l,r),n!==null&&(l=ge(),Xe(n,e,r,l),Mc(n,t,r))}}function Tc(e){var t=e.alternate;return e===G||t!==null&&t===G}function Rc(e,t){or=Rl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Mc(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,qi(e,n)}}var Ml={readContext:$e,useCallback:ce,useContext:ce,useEffect:ce,useImperativeHandle:ce,useInsertionEffect:ce,useLayoutEffect:ce,useMemo:ce,useReducer:ce,useRef:ce,useState:ce,useDebugValue:ce,useDeferredValue:ce,useTransition:ce,useMutableSource:ce,useSyncExternalStore:ce,useId:ce,unstable_isNewReconciler:!1},Np={readContext:$e,useCallback:function(e,t){return tt().memoizedState=[e,t===void 0?null:t],e},useContext:$e,useEffect:wa,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,dl(4194308,4,Cc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return dl(4194308,4,e,t)},useInsertionEffect:function(e,t){return dl(4,2,e,t)},useMemo:function(e,t){var n=tt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=tt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=kp.bind(null,G,e),[r.memoizedState,e]},useRef:function(e){var t=tt();return e={current:e},t.memoizedState=e},useState:ya,useDebugValue:xs,useDeferredValue:function(e){return tt().memoizedState=e},useTransition:function(){var e=ya(!1),t=e[0];return e=bp.bind(null,e[1]),tt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=G,l=tt();if(q){if(n===void 0)throw Error(N(407));n=n()}else{if(n=t(),oe===null)throw Error(N(349));Zt&30||vc(r,t,n)}l.memoizedState=n;var o={value:n,getSnapshot:t};return l.queue=o,wa(wc.bind(null,r,o,e),[e]),r.flags|=2048,Nr(9,yc.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=tt(),t=oe.identifierPrefix;if(q){var n=ct,r=ut;n=(r&~(1<<32-Ge(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=kr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=wp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Sp={readContext:$e,useCallback:_c,useContext:$e,useEffect:gs,useImperativeHandle:Ec,useInsertionEffect:Nc,useLayoutEffect:Sc,useMemo:Pc,useReducer:Mo,useRef:jc,useState:function(){return Mo(jr)},useDebugValue:xs,useDeferredValue:function(e){var t=Ae();return zc(t,ne.memoizedState,e)},useTransition:function(){var e=Mo(jr)[0],t=Ae().memoizedState;return[e,t]},useMutableSource:gc,useSyncExternalStore:xc,useId:Lc,unstable_isNewReconciler:!1},Cp={readContext:$e,useCallback:_c,useContext:$e,useEffect:gs,useImperativeHandle:Ec,useInsertionEffect:Nc,useLayoutEffect:Sc,useMemo:Pc,useReducer:Oo,useRef:jc,useState:function(){return Oo(jr)},useDebugValue:xs,useDeferredValue:function(e){var t=Ae();return ne===null?t.memoizedState=e:zc(t,ne.memoizedState,e)},useTransition:function(){var e=Oo(jr)[0],t=Ae().memoizedState;return[e,t]},useMutableSource:gc,useSyncExternalStore:xc,useId:Lc,unstable_isNewReconciler:!1};function Ke(e,t){if(e&&e.defaultProps){t=X({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function vi(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:X({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ql={isMounted:function(e){return(e=e._reactInternals)?rn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ge(),l=Mt(e),o=dt(r,l);o.payload=t,n!=null&&(o.callback=n),t=Tt(e,o,l),t!==null&&(Xe(t,e,l,r),ul(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ge(),l=Mt(e),o=dt(r,l);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Tt(e,o,l),t!==null&&(Xe(t,e,l,r),ul(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ge(),r=Mt(e),l=dt(n,r);l.tag=2,t!=null&&(l.callback=t),t=Tt(e,l,r),t!==null&&(Xe(t,e,r,n),ul(t,e,r))}};function ba(e,t,n,r,l,o,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,s):t.prototype&&t.prototype.isPureReactComponent?!gr(n,r)||!gr(l,o):!0}function Oc(e,t,n){var r=!1,l=It,o=t.contextType;return typeof o=="object"&&o!==null?o=$e(o):(l=ke(t)?Xt:me.current,r=t.contextTypes,o=(r=r!=null)?zn(e,l):It),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ql,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=o),t}function ka(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ql.enqueueReplaceState(t,t.state,null)}function yi(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},us(e);var o=t.contextType;typeof o=="object"&&o!==null?l.context=$e(o):(o=ke(t)?Xt:me.current,l.context=zn(e,o)),l.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(vi(e,t,o,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&ql.enqueueReplaceState(l,l.state,null),Ll(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function Mn(e,t){try{var n="",r=t;do n+=Zd(r),r=r.return;while(r);var l=n}catch(o){l=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:l,digest:null}}function Do(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function wi(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Ep=typeof WeakMap=="function"?WeakMap:Map;function Dc(e,t,n){n=dt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Dl||(Dl=!0,zi=r),wi(e,t)},n}function Ic(e,t,n){n=dt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){wi(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){wi(e,t),typeof r!="function"&&(Rt===null?Rt=new Set([this]):Rt.add(this));var s=t.stack;this.componentDidCatch(t.value,{componentStack:s!==null?s:""})}),n}function ja(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Ep;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=Ap.bind(null,e,t,n),t.then(e,e))}function Na(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Sa(e,t,n,r,l){return e.mode&1?(e.flags|=65536,e.lanes=l,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=dt(-1,1),t.tag=2,Tt(n,t,1))),n.lanes|=1),e)}var _p=gt.ReactCurrentOwner,we=!1;function he(e,t,n,r){t.child=e===null?fc(t,null,n,r):Tn(t,e.child,n,r)}function Ca(e,t,n,r,l){n=n.render;var o=t.ref;return En(t,l),r=ms(e,t,n,r,o,l),n=hs(),e!==null&&!we?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,ht(e,t,l)):(q&&n&&ns(t),t.flags|=1,he(e,t,r,l),t.child)}function Ea(e,t,n,r,l){if(e===null){var o=n.type;return typeof o=="function"&&!Ss(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Fc(e,t,o,r,l)):(e=hl(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&l)){var s=o.memoizedProps;if(n=n.compare,n=n!==null?n:gr,n(s,r)&&e.ref===t.ref)return ht(e,t,l)}return t.flags|=1,e=Ot(o,r),e.ref=t.ref,e.return=t,t.child=e}function Fc(e,t,n,r,l){if(e!==null){var o=e.memoizedProps;if(gr(o,r)&&e.ref===t.ref)if(we=!1,t.pendingProps=r=o,(e.lanes&l)!==0)e.flags&131072&&(we=!0);else return t.lanes=e.lanes,ht(e,t,l)}return bi(e,t,n,r,l)}function Uc(e,t,n){var r=t.pendingProps,l=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},V(kn,Ee),Ee|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,V(kn,Ee),Ee|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,V(kn,Ee),Ee|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,V(kn,Ee),Ee|=r;return he(e,t,l,n),t.child}function $c(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function bi(e,t,n,r,l){var o=ke(n)?Xt:me.current;return o=zn(t,o),En(t,l),n=ms(e,t,n,r,o,l),r=hs(),e!==null&&!we?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,ht(e,t,l)):(q&&r&&ns(t),t.flags|=1,he(e,t,n,l),t.child)}function _a(e,t,n,r,l){if(ke(n)){var o=!0;Cl(t)}else o=!1;if(En(t,l),t.stateNode===null)fl(e,t),Oc(t,n,r),yi(t,n,r,l),r=!0;else if(e===null){var s=t.stateNode,a=t.memoizedProps;s.props=a;var u=s.context,c=n.contextType;typeof c=="object"&&c!==null?c=$e(c):(c=ke(n)?Xt:me.current,c=zn(t,c));var p=n.getDerivedStateFromProps,d=typeof p=="function"||typeof s.getSnapshotBeforeUpdate=="function";d||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==r||u!==c)&&ka(t,s,r,c),kt=!1;var h=t.memoizedState;s.state=h,Ll(t,r,s,l),u=t.memoizedState,a!==r||h!==u||be.current||kt?(typeof p=="function"&&(vi(t,n,p,r),u=t.memoizedState),(a=kt||ba(t,n,a,r,h,u,c))?(d||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),s.props=r,s.state=u,s.context=c,r=a):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{s=t.stateNode,mc(e,t),a=t.memoizedProps,c=t.type===t.elementType?a:Ke(t.type,a),s.props=c,d=t.pendingProps,h=s.context,u=n.contextType,typeof u=="object"&&u!==null?u=$e(u):(u=ke(n)?Xt:me.current,u=zn(t,u));var y=n.getDerivedStateFromProps;(p=typeof y=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==d||h!==u)&&ka(t,s,r,u),kt=!1,h=t.memoizedState,s.state=h,Ll(t,r,s,l);var w=t.memoizedState;a!==d||h!==w||be.current||kt?(typeof y=="function"&&(vi(t,n,y,r),w=t.memoizedState),(c=kt||ba(t,n,c,r,h,w,u)||!1)?(p||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,w,u),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,w,u)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=w),s.props=r,s.state=w,s.context=u,r=c):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),r=!1)}return ki(e,t,n,r,o,l)}function ki(e,t,n,r,l,o){$c(e,t);var s=(t.flags&128)!==0;if(!r&&!s)return l&&pa(t,n,!1),ht(e,t,o);r=t.stateNode,_p.current=t;var a=s&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&s?(t.child=Tn(t,e.child,null,o),t.child=Tn(t,null,a,o)):he(e,t,a,o),t.memoizedState=r.state,l&&pa(t,n,!0),t.child}function Ac(e){var t=e.stateNode;t.pendingContext?fa(e,t.pendingContext,t.pendingContext!==t.context):t.context&&fa(e,t.context,!1),cs(e,t.containerInfo)}function Pa(e,t,n,r,l){return Ln(),ls(l),t.flags|=256,he(e,t,n,r),t.child}var ji={dehydrated:null,treeContext:null,retryLane:0};function Ni(e){return{baseLanes:e,cachePool:null,transitions:null}}function Bc(e,t,n){var r=t.pendingProps,l=Y.current,o=!1,s=(t.flags&128)!==0,a;if((a=s)||(a=e!==null&&e.memoizedState===null?!1:(l&2)!==0),a?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),V(Y,l&1),e===null)return gi(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(s=r.children,e=r.fallback,o?(r=t.mode,o=t.child,s={mode:"hidden",children:s},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=s):o=Xl(s,r,0,null),e=Yt(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=Ni(n),t.memoizedState=ji,e):vs(t,s));if(l=e.memoizedState,l!==null&&(a=l.dehydrated,a!==null))return Pp(e,t,s,r,a,l,n);if(o){o=r.fallback,s=t.mode,l=e.child,a=l.sibling;var u={mode:"hidden",children:r.children};return!(s&1)&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=Ot(l,u),r.subtreeFlags=l.subtreeFlags&14680064),a!==null?o=Ot(a,o):(o=Yt(o,s,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,s=e.child.memoizedState,s=s===null?Ni(n):{baseLanes:s.baseLanes|n,cachePool:null,transitions:s.transitions},o.memoizedState=s,o.childLanes=e.childLanes&~n,t.memoizedState=ji,r}return o=e.child,e=o.sibling,r=Ot(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function vs(e,t){return t=Xl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function el(e,t,n,r){return r!==null&&ls(r),Tn(t,e.child,null,n),e=vs(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Pp(e,t,n,r,l,o,s){if(n)return t.flags&256?(t.flags&=-257,r=Do(Error(N(422))),el(e,t,s,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,l=t.mode,r=Xl({mode:"visible",children:r.children},l,0,null),o=Yt(o,l,s,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&Tn(t,e.child,null,s),t.child.memoizedState=Ni(s),t.memoizedState=ji,o);if(!(t.mode&1))return el(e,t,s,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var a=r.dgst;return r=a,o=Error(N(419)),r=Do(o,r,void 0),el(e,t,s,r)}if(a=(s&e.childLanes)!==0,we||a){if(r=oe,r!==null){switch(s&-s){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=l&(r.suspendedLanes|s)?0:l,l!==0&&l!==o.retryLane&&(o.retryLane=l,mt(e,l),Xe(r,e,l,-1))}return Ns(),r=Do(Error(N(421))),el(e,t,s,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Bp.bind(null,e),l._reactRetry=t,null):(e=o.treeContext,_e=Lt(l.nextSibling),Pe=t,q=!0,Ye=null,e!==null&&(De[Ie++]=ut,De[Ie++]=ct,De[Ie++]=Jt,ut=e.id,ct=e.overflow,Jt=t),t=vs(t,r.children),t.flags|=4096,t)}function za(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),xi(e.return,t,n)}function Io(e,t,n,r,l){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=l)}function Wc(e,t,n){var r=t.pendingProps,l=r.revealOrder,o=r.tail;if(he(e,t,r.children,n),r=Y.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&za(e,n,t);else if(e.tag===19)za(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(V(Y,r),!(t.mode&1))t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&Tl(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),Io(t,!1,l,n,o);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&Tl(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}Io(t,!0,n,null,o);break;case"together":Io(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function fl(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function ht(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),en|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(N(153));if(t.child!==null){for(e=t.child,n=Ot(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ot(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function zp(e,t,n){switch(t.tag){case 3:Ac(t),Ln();break;case 5:hc(t);break;case 1:ke(t.type)&&Cl(t);break;case 4:cs(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;V(Pl,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(V(Y,Y.current&1),t.flags|=128,null):n&t.child.childLanes?Bc(e,t,n):(V(Y,Y.current&1),e=ht(e,t,n),e!==null?e.sibling:null);V(Y,Y.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Wc(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),V(Y,Y.current),r)break;return null;case 22:case 23:return t.lanes=0,Uc(e,t,n)}return ht(e,t,n)}var Vc,Si,Qc,Hc;Vc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Si=function(){};Qc=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,Kt(lt.current);var o=null;switch(n){case"input":l=Ko(e,l),r=Ko(e,r),o=[];break;case"select":l=X({},l,{value:void 0}),r=X({},r,{value:void 0}),o=[];break;case"textarea":l=Go(e,l),r=Go(e,r),o=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Nl)}Jo(n,r);var s;n=null;for(c in l)if(!r.hasOwnProperty(c)&&l.hasOwnProperty(c)&&l[c]!=null)if(c==="style"){var a=l[c];for(s in a)a.hasOwnProperty(s)&&(n||(n={}),n[s]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(ur.hasOwnProperty(c)?o||(o=[]):(o=o||[]).push(c,null));for(c in r){var u=r[c];if(a=l!=null?l[c]:void 0,r.hasOwnProperty(c)&&u!==a&&(u!=null||a!=null))if(c==="style")if(a){for(s in a)!a.hasOwnProperty(s)||u&&u.hasOwnProperty(s)||(n||(n={}),n[s]="");for(s in u)u.hasOwnProperty(s)&&a[s]!==u[s]&&(n||(n={}),n[s]=u[s])}else n||(o||(o=[]),o.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,a=a?a.__html:void 0,u!=null&&a!==u&&(o=o||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(o=o||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(ur.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&Q("scroll",e),o||a===u||(o=[])):(o=o||[]).push(c,u))}n&&(o=o||[]).push("style",n);var c=o;(t.updateQueue=c)&&(t.flags|=4)}};Hc=function(e,t,n,r){n!==r&&(t.flags|=4)};function qn(e,t){if(!q)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function de(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Lp(e,t,n){var r=t.pendingProps;switch(rs(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return de(t),null;case 1:return ke(t.type)&&Sl(),de(t),null;case 3:return r=t.stateNode,Rn(),H(be),H(me),fs(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Jr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ye!==null&&(Ri(Ye),Ye=null))),Si(e,t),de(t),null;case 5:ds(t);var l=Kt(br.current);if(n=t.type,e!==null&&t.stateNode!=null)Qc(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(N(166));return de(t),null}if(e=Kt(lt.current),Jr(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[nt]=t,r[yr]=o,e=(t.mode&1)!==0,n){case"dialog":Q("cancel",r),Q("close",r);break;case"iframe":case"object":case"embed":Q("load",r);break;case"video":case"audio":for(l=0;l<Zn.length;l++)Q(Zn[l],r);break;case"source":Q("error",r);break;case"img":case"image":case"link":Q("error",r),Q("load",r);break;case"details":Q("toggle",r);break;case"input":Us(r,o),Q("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},Q("invalid",r);break;case"textarea":As(r,o),Q("invalid",r)}Jo(n,o),l=null;for(var s in o)if(o.hasOwnProperty(s)){var a=o[s];s==="children"?typeof a=="string"?r.textContent!==a&&(o.suppressHydrationWarning!==!0&&Xr(r.textContent,a,e),l=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(o.suppressHydrationWarning!==!0&&Xr(r.textContent,a,e),l=["children",""+a]):ur.hasOwnProperty(s)&&a!=null&&s==="onScroll"&&Q("scroll",r)}switch(n){case"input":Wr(r),$s(r,o,!0);break;case"textarea":Wr(r),Bs(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Nl)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{s=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=wu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=s.createElement(n,{is:r.is}):(e=s.createElement(n),n==="select"&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,n),e[nt]=t,e[yr]=r,Vc(e,t,!1,!1),t.stateNode=e;e:{switch(s=Zo(n,r),n){case"dialog":Q("cancel",e),Q("close",e),l=r;break;case"iframe":case"object":case"embed":Q("load",e),l=r;break;case"video":case"audio":for(l=0;l<Zn.length;l++)Q(Zn[l],e);l=r;break;case"source":Q("error",e),l=r;break;case"img":case"image":case"link":Q("error",e),Q("load",e),l=r;break;case"details":Q("toggle",e),l=r;break;case"input":Us(e,r),l=Ko(e,r),Q("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=X({},r,{value:void 0}),Q("invalid",e);break;case"textarea":As(e,r),l=Go(e,r),Q("invalid",e);break;default:l=r}Jo(n,l),a=l;for(o in a)if(a.hasOwnProperty(o)){var u=a[o];o==="style"?ju(e,u):o==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&bu(e,u)):o==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&cr(e,u):typeof u=="number"&&cr(e,""+u):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(ur.hasOwnProperty(o)?u!=null&&o==="onScroll"&&Q("scroll",e):u!=null&&Bi(e,o,u,s))}switch(n){case"input":Wr(e),$s(e,r,!1);break;case"textarea":Wr(e),Bs(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Dt(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?jn(e,!!r.multiple,o,!1):r.defaultValue!=null&&jn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=Nl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return de(t),null;case 6:if(e&&t.stateNode!=null)Hc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(N(166));if(n=Kt(br.current),Kt(lt.current),Jr(t)){if(r=t.stateNode,n=t.memoizedProps,r[nt]=t,(o=r.nodeValue!==n)&&(e=Pe,e!==null))switch(e.tag){case 3:Xr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Xr(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[nt]=t,t.stateNode=r}return de(t),null;case 13:if(H(Y),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(q&&_e!==null&&t.mode&1&&!(t.flags&128))cc(),Ln(),t.flags|=98560,o=!1;else if(o=Jr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(N(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(N(317));o[nt]=t}else Ln(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;de(t),o=!1}else Ye!==null&&(Ri(Ye),Ye=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||Y.current&1?re===0&&(re=3):Ns())),t.updateQueue!==null&&(t.flags|=4),de(t),null);case 4:return Rn(),Si(e,t),e===null&&xr(t.stateNode.containerInfo),de(t),null;case 10:return ss(t.type._context),de(t),null;case 17:return ke(t.type)&&Sl(),de(t),null;case 19:if(H(Y),o=t.memoizedState,o===null)return de(t),null;if(r=(t.flags&128)!==0,s=o.rendering,s===null)if(r)qn(o,!1);else{if(re!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=Tl(e),s!==null){for(t.flags|=128,qn(o,!1),r=s.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,s=o.alternate,s===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=s.childLanes,o.lanes=s.lanes,o.child=s.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=s.memoizedProps,o.memoizedState=s.memoizedState,o.updateQueue=s.updateQueue,o.type=s.type,e=s.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return V(Y,Y.current&1|2),t.child}e=e.sibling}o.tail!==null&&Z()>On&&(t.flags|=128,r=!0,qn(o,!1),t.lanes=4194304)}else{if(!r)if(e=Tl(s),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),qn(o,!0),o.tail===null&&o.tailMode==="hidden"&&!s.alternate&&!q)return de(t),null}else 2*Z()-o.renderingStartTime>On&&n!==1073741824&&(t.flags|=128,r=!0,qn(o,!1),t.lanes=4194304);o.isBackwards?(s.sibling=t.child,t.child=s):(n=o.last,n!==null?n.sibling=s:t.child=s,o.last=s)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Z(),t.sibling=null,n=Y.current,V(Y,r?n&1|2:n&1),t):(de(t),null);case 22:case 23:return js(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Ee&1073741824&&(de(t),t.subtreeFlags&6&&(t.flags|=8192)):de(t),null;case 24:return null;case 25:return null}throw Error(N(156,t.tag))}function Tp(e,t){switch(rs(t),t.tag){case 1:return ke(t.type)&&Sl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Rn(),H(be),H(me),fs(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return ds(t),null;case 13:if(H(Y),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(N(340));Ln()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return H(Y),null;case 4:return Rn(),null;case 10:return ss(t.type._context),null;case 22:case 23:return js(),null;case 24:return null;default:return null}}var tl=!1,pe=!1,Rp=typeof WeakSet=="function"?WeakSet:Set,_=null;function bn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){J(e,t,r)}else n.current=null}function Ci(e,t,n){try{n()}catch(r){J(e,t,r)}}var La=!1;function Mp(e,t){if(ui=bl,e=Xu(),ts(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var s=0,a=-1,u=-1,c=0,p=0,d=e,h=null;t:for(;;){for(var y;d!==n||l!==0&&d.nodeType!==3||(a=s+l),d!==o||r!==0&&d.nodeType!==3||(u=s+r),d.nodeType===3&&(s+=d.nodeValue.length),(y=d.firstChild)!==null;)h=d,d=y;for(;;){if(d===e)break t;if(h===n&&++c===l&&(a=s),h===o&&++p===r&&(u=s),(y=d.nextSibling)!==null)break;d=h,h=d.parentNode}d=y}n=a===-1||u===-1?null:{start:a,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(ci={focusedElem:e,selectionRange:n},bl=!1,_=t;_!==null;)if(t=_,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,_=e;else for(;_!==null;){t=_;try{var w=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var b=w.memoizedProps,j=w.memoizedState,m=t.stateNode,f=m.getSnapshotBeforeUpdate(t.elementType===t.type?b:Ke(t.type,b),j);m.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(N(163))}}catch(k){J(t,t.return,k)}if(e=t.sibling,e!==null){e.return=t.return,_=e;break}_=t.return}return w=La,La=!1,w}function ir(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var o=l.destroy;l.destroy=void 0,o!==void 0&&Ci(t,n,o)}l=l.next}while(l!==r)}}function Yl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Ei(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Kc(e){var t=e.alternate;t!==null&&(e.alternate=null,Kc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[nt],delete t[yr],delete t[pi],delete t[gp],delete t[xp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function qc(e){return e.tag===5||e.tag===3||e.tag===4}function Ta(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||qc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function _i(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Nl));else if(r!==4&&(e=e.child,e!==null))for(_i(e,t,n),e=e.sibling;e!==null;)_i(e,t,n),e=e.sibling}function Pi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Pi(e,t,n),e=e.sibling;e!==null;)Pi(e,t,n),e=e.sibling}var ie=null,qe=!1;function wt(e,t,n){for(n=n.child;n!==null;)Yc(e,t,n),n=n.sibling}function Yc(e,t,n){if(rt&&typeof rt.onCommitFiberUnmount=="function")try{rt.onCommitFiberUnmount(Al,n)}catch{}switch(n.tag){case 5:pe||bn(n,t);case 6:var r=ie,l=qe;ie=null,wt(e,t,n),ie=r,qe=l,ie!==null&&(qe?(e=ie,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ie.removeChild(n.stateNode));break;case 18:ie!==null&&(qe?(e=ie,n=n.stateNode,e.nodeType===8?zo(e.parentNode,n):e.nodeType===1&&zo(e,n),mr(e)):zo(ie,n.stateNode));break;case 4:r=ie,l=qe,ie=n.stateNode.containerInfo,qe=!0,wt(e,t,n),ie=r,qe=l;break;case 0:case 11:case 14:case 15:if(!pe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var o=l,s=o.destroy;o=o.tag,s!==void 0&&(o&2||o&4)&&Ci(n,t,s),l=l.next}while(l!==r)}wt(e,t,n);break;case 1:if(!pe&&(bn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){J(n,t,a)}wt(e,t,n);break;case 21:wt(e,t,n);break;case 22:n.mode&1?(pe=(r=pe)||n.memoizedState!==null,wt(e,t,n),pe=r):wt(e,t,n);break;default:wt(e,t,n)}}function Ra(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Rp),t.forEach(function(r){var l=Wp.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function He(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var o=e,s=t,a=s;e:for(;a!==null;){switch(a.tag){case 5:ie=a.stateNode,qe=!1;break e;case 3:ie=a.stateNode.containerInfo,qe=!0;break e;case 4:ie=a.stateNode.containerInfo,qe=!0;break e}a=a.return}if(ie===null)throw Error(N(160));Yc(o,s,l),ie=null,qe=!1;var u=l.alternate;u!==null&&(u.return=null),l.return=null}catch(c){J(l,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Gc(t,e),t=t.sibling}function Gc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(He(t,e),et(e),r&4){try{ir(3,e,e.return),Yl(3,e)}catch(b){J(e,e.return,b)}try{ir(5,e,e.return)}catch(b){J(e,e.return,b)}}break;case 1:He(t,e),et(e),r&512&&n!==null&&bn(n,n.return);break;case 5:if(He(t,e),et(e),r&512&&n!==null&&bn(n,n.return),e.flags&32){var l=e.stateNode;try{cr(l,"")}catch(b){J(e,e.return,b)}}if(r&4&&(l=e.stateNode,l!=null)){var o=e.memoizedProps,s=n!==null?n.memoizedProps:o,a=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{a==="input"&&o.type==="radio"&&o.name!=null&&vu(l,o),Zo(a,s);var c=Zo(a,o);for(s=0;s<u.length;s+=2){var p=u[s],d=u[s+1];p==="style"?ju(l,d):p==="dangerouslySetInnerHTML"?bu(l,d):p==="children"?cr(l,d):Bi(l,p,d,c)}switch(a){case"input":qo(l,o);break;case"textarea":yu(l,o);break;case"select":var h=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!o.multiple;var y=o.value;y!=null?jn(l,!!o.multiple,y,!1):h!==!!o.multiple&&(o.defaultValue!=null?jn(l,!!o.multiple,o.defaultValue,!0):jn(l,!!o.multiple,o.multiple?[]:"",!1))}l[yr]=o}catch(b){J(e,e.return,b)}}break;case 6:if(He(t,e),et(e),r&4){if(e.stateNode===null)throw Error(N(162));l=e.stateNode,o=e.memoizedProps;try{l.nodeValue=o}catch(b){J(e,e.return,b)}}break;case 3:if(He(t,e),et(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{mr(t.containerInfo)}catch(b){J(e,e.return,b)}break;case 4:He(t,e),et(e);break;case 13:He(t,e),et(e),l=e.child,l.flags&8192&&(o=l.memoizedState!==null,l.stateNode.isHidden=o,!o||l.alternate!==null&&l.alternate.memoizedState!==null||(bs=Z())),r&4&&Ra(e);break;case 22:if(p=n!==null&&n.memoizedState!==null,e.mode&1?(pe=(c=pe)||p,He(t,e),pe=c):He(t,e),et(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!p&&e.mode&1)for(_=e,p=e.child;p!==null;){for(d=_=p;_!==null;){switch(h=_,y=h.child,h.tag){case 0:case 11:case 14:case 15:ir(4,h,h.return);break;case 1:bn(h,h.return);var w=h.stateNode;if(typeof w.componentWillUnmount=="function"){r=h,n=h.return;try{t=r,w.props=t.memoizedProps,w.state=t.memoizedState,w.componentWillUnmount()}catch(b){J(r,n,b)}}break;case 5:bn(h,h.return);break;case 22:if(h.memoizedState!==null){Oa(d);continue}}y!==null?(y.return=h,_=y):Oa(d)}p=p.sibling}e:for(p=null,d=e;;){if(d.tag===5){if(p===null){p=d;try{l=d.stateNode,c?(o=l.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(a=d.stateNode,u=d.memoizedProps.style,s=u!=null&&u.hasOwnProperty("display")?u.display:null,a.style.display=ku("display",s))}catch(b){J(e,e.return,b)}}}else if(d.tag===6){if(p===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(b){J(e,e.return,b)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===e)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===e)break e;for(;d.sibling===null;){if(d.return===null||d.return===e)break e;p===d&&(p=null),d=d.return}p===d&&(p=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:He(t,e),et(e),r&4&&Ra(e);break;case 21:break;default:He(t,e),et(e)}}function et(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(qc(n)){var r=n;break e}n=n.return}throw Error(N(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(cr(l,""),r.flags&=-33);var o=Ta(e);Pi(e,o,l);break;case 3:case 4:var s=r.stateNode.containerInfo,a=Ta(e);_i(e,a,s);break;default:throw Error(N(161))}}catch(u){J(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Op(e,t,n){_=e,Xc(e)}function Xc(e,t,n){for(var r=(e.mode&1)!==0;_!==null;){var l=_,o=l.child;if(l.tag===22&&r){var s=l.memoizedState!==null||tl;if(!s){var a=l.alternate,u=a!==null&&a.memoizedState!==null||pe;a=tl;var c=pe;if(tl=s,(pe=u)&&!c)for(_=l;_!==null;)s=_,u=s.child,s.tag===22&&s.memoizedState!==null?Da(l):u!==null?(u.return=s,_=u):Da(l);for(;o!==null;)_=o,Xc(o),o=o.sibling;_=l,tl=a,pe=c}Ma(e)}else l.subtreeFlags&8772&&o!==null?(o.return=l,_=o):Ma(e)}}function Ma(e){for(;_!==null;){var t=_;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:pe||Yl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!pe)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:Ke(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&va(t,o,r);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}va(t,s,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var p=c.memoizedState;if(p!==null){var d=p.dehydrated;d!==null&&mr(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(N(163))}pe||t.flags&512&&Ei(t)}catch(h){J(t,t.return,h)}}if(t===e){_=null;break}if(n=t.sibling,n!==null){n.return=t.return,_=n;break}_=t.return}}function Oa(e){for(;_!==null;){var t=_;if(t===e){_=null;break}var n=t.sibling;if(n!==null){n.return=t.return,_=n;break}_=t.return}}function Da(e){for(;_!==null;){var t=_;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Yl(4,t)}catch(u){J(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(u){J(t,l,u)}}var o=t.return;try{Ei(t)}catch(u){J(t,o,u)}break;case 5:var s=t.return;try{Ei(t)}catch(u){J(t,s,u)}}}catch(u){J(t,t.return,u)}if(t===e){_=null;break}var a=t.sibling;if(a!==null){a.return=t.return,_=a;break}_=t.return}}var Dp=Math.ceil,Ol=gt.ReactCurrentDispatcher,ys=gt.ReactCurrentOwner,Ue=gt.ReactCurrentBatchConfig,F=0,oe=null,ee=null,se=0,Ee=0,kn=Ut(0),re=0,Sr=null,en=0,Gl=0,ws=0,sr=null,ye=null,bs=0,On=1/0,st=null,Dl=!1,zi=null,Rt=null,nl=!1,Ct=null,Il=0,ar=0,Li=null,pl=-1,ml=0;function ge(){return F&6?Z():pl!==-1?pl:pl=Z()}function Mt(e){return e.mode&1?F&2&&se!==0?se&-se:yp.transition!==null?(ml===0&&(ml=Ou()),ml):(e=A,e!==0||(e=window.event,e=e===void 0?16:Bu(e.type)),e):1}function Xe(e,t,n,r){if(50<ar)throw ar=0,Li=null,Error(N(185));Pr(e,n,r),(!(F&2)||e!==oe)&&(e===oe&&(!(F&2)&&(Gl|=n),re===4&&Nt(e,se)),je(e,r),n===1&&F===0&&!(t.mode&1)&&(On=Z()+500,Hl&&$t()))}function je(e,t){var n=e.callbackNode;yf(e,t);var r=wl(e,e===oe?se:0);if(r===0)n!==null&&Qs(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Qs(n),t===1)e.tag===0?vp(Ia.bind(null,e)):sc(Ia.bind(null,e)),mp(function(){!(F&6)&&$t()}),n=null;else{switch(Du(r)){case 1:n=Ki;break;case 4:n=Ru;break;case 16:n=yl;break;case 536870912:n=Mu;break;default:n=yl}n=od(n,Jc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Jc(e,t){if(pl=-1,ml=0,F&6)throw Error(N(327));var n=e.callbackNode;if(_n()&&e.callbackNode!==n)return null;var r=wl(e,e===oe?se:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Fl(e,r);else{t=r;var l=F;F|=2;var o=ed();(oe!==e||se!==t)&&(st=null,On=Z()+500,qt(e,t));do try{Up();break}catch(a){Zc(e,a)}while(!0);is(),Ol.current=o,F=l,ee!==null?t=0:(oe=null,se=0,t=re)}if(t!==0){if(t===2&&(l=li(e),l!==0&&(r=l,t=Ti(e,l))),t===1)throw n=Sr,qt(e,0),Nt(e,r),je(e,Z()),n;if(t===6)Nt(e,r);else{if(l=e.current.alternate,!(r&30)&&!Ip(l)&&(t=Fl(e,r),t===2&&(o=li(e),o!==0&&(r=o,t=Ti(e,o))),t===1))throw n=Sr,qt(e,0),Nt(e,r),je(e,Z()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(N(345));case 2:Vt(e,ye,st);break;case 3:if(Nt(e,r),(r&130023424)===r&&(t=bs+500-Z(),10<t)){if(wl(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){ge(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=fi(Vt.bind(null,e,ye,st),t);break}Vt(e,ye,st);break;case 4:if(Nt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var s=31-Ge(r);o=1<<s,s=t[s],s>l&&(l=s),r&=~o}if(r=l,r=Z()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Dp(r/1960))-r,10<r){e.timeoutHandle=fi(Vt.bind(null,e,ye,st),r);break}Vt(e,ye,st);break;case 5:Vt(e,ye,st);break;default:throw Error(N(329))}}}return je(e,Z()),e.callbackNode===n?Jc.bind(null,e):null}function Ti(e,t){var n=sr;return e.current.memoizedState.isDehydrated&&(qt(e,t).flags|=256),e=Fl(e,t),e!==2&&(t=ye,ye=n,t!==null&&Ri(t)),e}function Ri(e){ye===null?ye=e:ye.push.apply(ye,e)}function Ip(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],o=l.getSnapshot;l=l.value;try{if(!Je(o(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Nt(e,t){for(t&=~ws,t&=~Gl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ge(t),r=1<<n;e[n]=-1,t&=~r}}function Ia(e){if(F&6)throw Error(N(327));_n();var t=wl(e,0);if(!(t&1))return je(e,Z()),null;var n=Fl(e,t);if(e.tag!==0&&n===2){var r=li(e);r!==0&&(t=r,n=Ti(e,r))}if(n===1)throw n=Sr,qt(e,0),Nt(e,t),je(e,Z()),n;if(n===6)throw Error(N(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Vt(e,ye,st),je(e,Z()),null}function ks(e,t){var n=F;F|=1;try{return e(t)}finally{F=n,F===0&&(On=Z()+500,Hl&&$t())}}function tn(e){Ct!==null&&Ct.tag===0&&!(F&6)&&_n();var t=F;F|=1;var n=Ue.transition,r=A;try{if(Ue.transition=null,A=1,e)return e()}finally{A=r,Ue.transition=n,F=t,!(F&6)&&$t()}}function js(){Ee=kn.current,H(kn)}function qt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,pp(n)),ee!==null)for(n=ee.return;n!==null;){var r=n;switch(rs(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Sl();break;case 3:Rn(),H(be),H(me),fs();break;case 5:ds(r);break;case 4:Rn();break;case 13:H(Y);break;case 19:H(Y);break;case 10:ss(r.type._context);break;case 22:case 23:js()}n=n.return}if(oe=e,ee=e=Ot(e.current,null),se=Ee=t,re=0,Sr=null,ws=Gl=en=0,ye=sr=null,Ht!==null){for(t=0;t<Ht.length;t++)if(n=Ht[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,o=n.pending;if(o!==null){var s=o.next;o.next=l,r.next=s}n.pending=r}Ht=null}return e}function Zc(e,t){do{var n=ee;try{if(is(),cl.current=Ml,Rl){for(var r=G.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}Rl=!1}if(Zt=0,le=ne=G=null,or=!1,kr=0,ys.current=null,n===null||n.return===null){re=1,Sr=t,ee=null;break}e:{var o=e,s=n.return,a=n,u=t;if(t=se,a.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,p=a,d=p.tag;if(!(p.mode&1)&&(d===0||d===11||d===15)){var h=p.alternate;h?(p.updateQueue=h.updateQueue,p.memoizedState=h.memoizedState,p.lanes=h.lanes):(p.updateQueue=null,p.memoizedState=null)}var y=Na(s);if(y!==null){y.flags&=-257,Sa(y,s,a,o,t),y.mode&1&&ja(o,c,t),t=y,u=c;var w=t.updateQueue;if(w===null){var b=new Set;b.add(u),t.updateQueue=b}else w.add(u);break e}else{if(!(t&1)){ja(o,c,t),Ns();break e}u=Error(N(426))}}else if(q&&a.mode&1){var j=Na(s);if(j!==null){!(j.flags&65536)&&(j.flags|=256),Sa(j,s,a,o,t),ls(Mn(u,a));break e}}o=u=Mn(u,a),re!==4&&(re=2),sr===null?sr=[o]:sr.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var m=Dc(o,u,t);xa(o,m);break e;case 1:a=u;var f=o.type,g=o.stateNode;if(!(o.flags&128)&&(typeof f.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Rt===null||!Rt.has(g)))){o.flags|=65536,t&=-t,o.lanes|=t;var k=Ic(o,a,t);xa(o,k);break e}}o=o.return}while(o!==null)}nd(n)}catch(C){t=C,ee===n&&n!==null&&(ee=n=n.return);continue}break}while(!0)}function ed(){var e=Ol.current;return Ol.current=Ml,e===null?Ml:e}function Ns(){(re===0||re===3||re===2)&&(re=4),oe===null||!(en&268435455)&&!(Gl&268435455)||Nt(oe,se)}function Fl(e,t){var n=F;F|=2;var r=ed();(oe!==e||se!==t)&&(st=null,qt(e,t));do try{Fp();break}catch(l){Zc(e,l)}while(!0);if(is(),F=n,Ol.current=r,ee!==null)throw Error(N(261));return oe=null,se=0,re}function Fp(){for(;ee!==null;)td(ee)}function Up(){for(;ee!==null&&!cf();)td(ee)}function td(e){var t=ld(e.alternate,e,Ee);e.memoizedProps=e.pendingProps,t===null?nd(e):ee=t,ys.current=null}function nd(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Tp(n,t),n!==null){n.flags&=32767,ee=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{re=6,ee=null;return}}else if(n=Lp(n,t,Ee),n!==null){ee=n;return}if(t=t.sibling,t!==null){ee=t;return}ee=t=e}while(t!==null);re===0&&(re=5)}function Vt(e,t,n){var r=A,l=Ue.transition;try{Ue.transition=null,A=1,$p(e,t,n,r)}finally{Ue.transition=l,A=r}return null}function $p(e,t,n,r){do _n();while(Ct!==null);if(F&6)throw Error(N(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(N(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(wf(e,o),e===oe&&(ee=oe=null,se=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||nl||(nl=!0,od(yl,function(){return _n(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=Ue.transition,Ue.transition=null;var s=A;A=1;var a=F;F|=4,ys.current=null,Mp(e,n),Gc(n,e),ip(ci),bl=!!ui,ci=ui=null,e.current=n,Op(n),df(),F=a,A=s,Ue.transition=o}else e.current=n;if(nl&&(nl=!1,Ct=e,Il=l),o=e.pendingLanes,o===0&&(Rt=null),mf(n.stateNode),je(e,Z()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(Dl)throw Dl=!1,e=zi,zi=null,e;return Il&1&&e.tag!==0&&_n(),o=e.pendingLanes,o&1?e===Li?ar++:(ar=0,Li=e):ar=0,$t(),null}function _n(){if(Ct!==null){var e=Du(Il),t=Ue.transition,n=A;try{if(Ue.transition=null,A=16>e?16:e,Ct===null)var r=!1;else{if(e=Ct,Ct=null,Il=0,F&6)throw Error(N(331));var l=F;for(F|=4,_=e.current;_!==null;){var o=_,s=o.child;if(_.flags&16){var a=o.deletions;if(a!==null){for(var u=0;u<a.length;u++){var c=a[u];for(_=c;_!==null;){var p=_;switch(p.tag){case 0:case 11:case 15:ir(8,p,o)}var d=p.child;if(d!==null)d.return=p,_=d;else for(;_!==null;){p=_;var h=p.sibling,y=p.return;if(Kc(p),p===c){_=null;break}if(h!==null){h.return=y,_=h;break}_=y}}}var w=o.alternate;if(w!==null){var b=w.child;if(b!==null){w.child=null;do{var j=b.sibling;b.sibling=null,b=j}while(b!==null)}}_=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,_=s;else e:for(;_!==null;){if(o=_,o.flags&2048)switch(o.tag){case 0:case 11:case 15:ir(9,o,o.return)}var m=o.sibling;if(m!==null){m.return=o.return,_=m;break e}_=o.return}}var f=e.current;for(_=f;_!==null;){s=_;var g=s.child;if(s.subtreeFlags&2064&&g!==null)g.return=s,_=g;else e:for(s=f;_!==null;){if(a=_,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Yl(9,a)}}catch(C){J(a,a.return,C)}if(a===s){_=null;break e}var k=a.sibling;if(k!==null){k.return=a.return,_=k;break e}_=a.return}}if(F=l,$t(),rt&&typeof rt.onPostCommitFiberRoot=="function")try{rt.onPostCommitFiberRoot(Al,e)}catch{}r=!0}return r}finally{A=n,Ue.transition=t}}return!1}function Fa(e,t,n){t=Mn(n,t),t=Dc(e,t,1),e=Tt(e,t,1),t=ge(),e!==null&&(Pr(e,1,t),je(e,t))}function J(e,t,n){if(e.tag===3)Fa(e,e,n);else for(;t!==null;){if(t.tag===3){Fa(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Rt===null||!Rt.has(r))){e=Mn(n,e),e=Ic(t,e,1),t=Tt(t,e,1),e=ge(),t!==null&&(Pr(t,1,e),je(t,e));break}}t=t.return}}function Ap(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ge(),e.pingedLanes|=e.suspendedLanes&n,oe===e&&(se&n)===n&&(re===4||re===3&&(se&130023424)===se&&500>Z()-bs?qt(e,0):ws|=n),je(e,t)}function rd(e,t){t===0&&(e.mode&1?(t=Hr,Hr<<=1,!(Hr&130023424)&&(Hr=4194304)):t=1);var n=ge();e=mt(e,t),e!==null&&(Pr(e,t,n),je(e,n))}function Bp(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),rd(e,n)}function Wp(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(N(314))}r!==null&&r.delete(t),rd(e,n)}var ld;ld=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||be.current)we=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return we=!1,zp(e,t,n);we=!!(e.flags&131072)}else we=!1,q&&t.flags&1048576&&ac(t,_l,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;fl(e,t),e=t.pendingProps;var l=zn(t,me.current);En(t,n),l=ms(null,t,r,e,l,n);var o=hs();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ke(r)?(o=!0,Cl(t)):o=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,us(t),l.updater=ql,t.stateNode=l,l._reactInternals=t,yi(t,r,e,n),t=ki(null,t,r,!0,o,n)):(t.tag=0,q&&o&&ns(t),he(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(fl(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=Qp(r),e=Ke(r,e),l){case 0:t=bi(null,t,r,e,n);break e;case 1:t=_a(null,t,r,e,n);break e;case 11:t=Ca(null,t,r,e,n);break e;case 14:t=Ea(null,t,r,Ke(r.type,e),n);break e}throw Error(N(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Ke(r,l),bi(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Ke(r,l),_a(e,t,r,l,n);case 3:e:{if(Ac(t),e===null)throw Error(N(387));r=t.pendingProps,o=t.memoizedState,l=o.element,mc(e,t),Ll(t,r,null,n);var s=t.memoizedState;if(r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){l=Mn(Error(N(423)),t),t=Pa(e,t,r,n,l);break e}else if(r!==l){l=Mn(Error(N(424)),t),t=Pa(e,t,r,n,l);break e}else for(_e=Lt(t.stateNode.containerInfo.firstChild),Pe=t,q=!0,Ye=null,n=fc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ln(),r===l){t=ht(e,t,n);break e}he(e,t,r,n)}t=t.child}return t;case 5:return hc(t),e===null&&gi(t),r=t.type,l=t.pendingProps,o=e!==null?e.memoizedProps:null,s=l.children,di(r,l)?s=null:o!==null&&di(r,o)&&(t.flags|=32),$c(e,t),he(e,t,s,n),t.child;case 6:return e===null&&gi(t),null;case 13:return Bc(e,t,n);case 4:return cs(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Tn(t,null,r,n):he(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Ke(r,l),Ca(e,t,r,l,n);case 7:return he(e,t,t.pendingProps,n),t.child;case 8:return he(e,t,t.pendingProps.children,n),t.child;case 12:return he(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,o=t.memoizedProps,s=l.value,V(Pl,r._currentValue),r._currentValue=s,o!==null)if(Je(o.value,s)){if(o.children===l.children&&!be.current){t=ht(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var a=o.dependencies;if(a!==null){s=o.child;for(var u=a.firstContext;u!==null;){if(u.context===r){if(o.tag===1){u=dt(-1,n&-n),u.tag=2;var c=o.updateQueue;if(c!==null){c=c.shared;var p=c.pending;p===null?u.next=u:(u.next=p.next,p.next=u),c.pending=u}}o.lanes|=n,u=o.alternate,u!==null&&(u.lanes|=n),xi(o.return,n,t),a.lanes|=n;break}u=u.next}}else if(o.tag===10)s=o.type===t.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(N(341));s.lanes|=n,a=s.alternate,a!==null&&(a.lanes|=n),xi(s,n,t),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===t){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}he(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,En(t,n),l=$e(l),r=r(l),t.flags|=1,he(e,t,r,n),t.child;case 14:return r=t.type,l=Ke(r,t.pendingProps),l=Ke(r.type,l),Ea(e,t,r,l,n);case 15:return Fc(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Ke(r,l),fl(e,t),t.tag=1,ke(r)?(e=!0,Cl(t)):e=!1,En(t,n),Oc(t,r,l),yi(t,r,l,n),ki(null,t,r,!0,e,n);case 19:return Wc(e,t,n);case 22:return Uc(e,t,n)}throw Error(N(156,t.tag))};function od(e,t){return Tu(e,t)}function Vp(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Fe(e,t,n,r){return new Vp(e,t,n,r)}function Ss(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Qp(e){if(typeof e=="function")return Ss(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Vi)return 11;if(e===Qi)return 14}return 2}function Ot(e,t){var n=e.alternate;return n===null?(n=Fe(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function hl(e,t,n,r,l,o){var s=2;if(r=e,typeof e=="function")Ss(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case fn:return Yt(n.children,l,o,t);case Wi:s=8,l|=8;break;case Wo:return e=Fe(12,n,t,l|2),e.elementType=Wo,e.lanes=o,e;case Vo:return e=Fe(13,n,t,l),e.elementType=Vo,e.lanes=o,e;case Qo:return e=Fe(19,n,t,l),e.elementType=Qo,e.lanes=o,e;case hu:return Xl(n,l,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case pu:s=10;break e;case mu:s=9;break e;case Vi:s=11;break e;case Qi:s=14;break e;case bt:s=16,r=null;break e}throw Error(N(130,e==null?e:typeof e,""))}return t=Fe(s,n,t,l),t.elementType=e,t.type=r,t.lanes=o,t}function Yt(e,t,n,r){return e=Fe(7,e,r,t),e.lanes=n,e}function Xl(e,t,n,r){return e=Fe(22,e,r,t),e.elementType=hu,e.lanes=n,e.stateNode={isHidden:!1},e}function Fo(e,t,n){return e=Fe(6,e,null,t),e.lanes=n,e}function Uo(e,t,n){return t=Fe(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Hp(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=yo(0),this.expirationTimes=yo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=yo(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function Cs(e,t,n,r,l,o,s,a,u){return e=new Hp(e,t,n,a,u),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Fe(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},us(o),e}function Kp(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:dn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function id(e){if(!e)return It;e=e._reactInternals;e:{if(rn(e)!==e||e.tag!==1)throw Error(N(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ke(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(N(171))}if(e.tag===1){var n=e.type;if(ke(n))return ic(e,n,t)}return t}function sd(e,t,n,r,l,o,s,a,u){return e=Cs(n,r,!0,e,l,o,s,a,u),e.context=id(null),n=e.current,r=ge(),l=Mt(n),o=dt(r,l),o.callback=t??null,Tt(n,o,l),e.current.lanes=l,Pr(e,l,r),je(e,r),e}function Jl(e,t,n,r){var l=t.current,o=ge(),s=Mt(l);return n=id(n),t.context===null?t.context=n:t.pendingContext=n,t=dt(o,s),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Tt(l,t,s),e!==null&&(Xe(e,l,s,o),ul(e,l,s)),s}function Ul(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Ua(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Es(e,t){Ua(e,t),(e=e.alternate)&&Ua(e,t)}function qp(){return null}var ad=typeof reportError=="function"?reportError:function(e){console.error(e)};function _s(e){this._internalRoot=e}Zl.prototype.render=_s.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(N(409));Jl(e,t,null,null)};Zl.prototype.unmount=_s.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;tn(function(){Jl(null,e,null,null)}),t[pt]=null}};function Zl(e){this._internalRoot=e}Zl.prototype.unstable_scheduleHydration=function(e){if(e){var t=Uu();e={blockedOn:null,target:e,priority:t};for(var n=0;n<jt.length&&t!==0&&t<jt[n].priority;n++);jt.splice(n,0,e),n===0&&Au(e)}};function Ps(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function eo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function $a(){}function Yp(e,t,n,r,l){if(l){if(typeof r=="function"){var o=r;r=function(){var c=Ul(s);o.call(c)}}var s=sd(t,r,e,0,null,!1,!1,"",$a);return e._reactRootContainer=s,e[pt]=s.current,xr(e.nodeType===8?e.parentNode:e),tn(),s}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var a=r;r=function(){var c=Ul(u);a.call(c)}}var u=Cs(e,0,!1,null,null,!1,!1,"",$a);return e._reactRootContainer=u,e[pt]=u.current,xr(e.nodeType===8?e.parentNode:e),tn(function(){Jl(t,u,n,r)}),u}function to(e,t,n,r,l){var o=n._reactRootContainer;if(o){var s=o;if(typeof l=="function"){var a=l;l=function(){var u=Ul(s);a.call(u)}}Jl(t,s,e,l)}else s=Yp(n,t,e,l,r);return Ul(s)}Iu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Jn(t.pendingLanes);n!==0&&(qi(t,n|1),je(t,Z()),!(F&6)&&(On=Z()+500,$t()))}break;case 13:tn(function(){var r=mt(e,1);if(r!==null){var l=ge();Xe(r,e,1,l)}}),Es(e,1)}};Yi=function(e){if(e.tag===13){var t=mt(e,134217728);if(t!==null){var n=ge();Xe(t,e,134217728,n)}Es(e,134217728)}};Fu=function(e){if(e.tag===13){var t=Mt(e),n=mt(e,t);if(n!==null){var r=ge();Xe(n,e,t,r)}Es(e,t)}};Uu=function(){return A};$u=function(e,t){var n=A;try{return A=e,t()}finally{A=n}};ti=function(e,t,n){switch(t){case"input":if(qo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=Ql(r);if(!l)throw Error(N(90));xu(r),qo(r,l)}}}break;case"textarea":yu(e,n);break;case"select":t=n.value,t!=null&&jn(e,!!n.multiple,t,!1)}};Cu=ks;Eu=tn;var Gp={usingClientEntryPoint:!1,Events:[Lr,gn,Ql,Nu,Su,ks]},Yn={findFiberByHostInstance:Qt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Xp={bundleType:Yn.bundleType,version:Yn.version,rendererPackageName:Yn.rendererPackageName,rendererConfig:Yn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:gt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=zu(e),e===null?null:e.stateNode},findFiberByHostInstance:Yn.findFiberByHostInstance||qp,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var rl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!rl.isDisabled&&rl.supportsFiber)try{Al=rl.inject(Xp),rt=rl}catch{}}Le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Gp;Le.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ps(t))throw Error(N(200));return Kp(e,t,null,n)};Le.createRoot=function(e,t){if(!Ps(e))throw Error(N(299));var n=!1,r="",l=ad;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=Cs(e,1,!1,null,null,n,!1,r,l),e[pt]=t.current,xr(e.nodeType===8?e.parentNode:e),new _s(t)};Le.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(N(188)):(e=Object.keys(e).join(","),Error(N(268,e)));return e=zu(t),e=e===null?null:e.stateNode,e};Le.flushSync=function(e){return tn(e)};Le.hydrate=function(e,t,n){if(!eo(t))throw Error(N(200));return to(null,e,t,!0,n)};Le.hydrateRoot=function(e,t,n){if(!Ps(e))throw Error(N(405));var r=n!=null&&n.hydratedSources||null,l=!1,o="",s=ad;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=sd(t,null,e,1,n??null,l,!1,o,s),e[pt]=t.current,xr(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Zl(t)};Le.render=function(e,t,n){if(!eo(t))throw Error(N(200));return to(null,e,t,!1,n)};Le.unmountComponentAtNode=function(e){if(!eo(e))throw Error(N(40));return e._reactRootContainer?(tn(function(){to(null,null,e,!1,function(){e._reactRootContainer=null,e[pt]=null})}),!0):!1};Le.unstable_batchedUpdates=ks;Le.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!eo(n))throw Error(N(200));if(e==null||e._reactInternals===void 0)throw Error(N(38));return to(e,t,n,!1,r)};Le.version="18.3.1-next-f1338f8080-20240426";function ud(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ud)}catch(e){console.error(e)}}ud(),uu.exports=Le;var Jp=uu.exports,Aa=Jp;Ao.createRoot=Aa.createRoot,Ao.hydrateRoot=Aa.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Cr(){return Cr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Cr.apply(this,arguments)}var Et;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Et||(Et={}));const Ba="popstate";function Zp(e){e===void 0&&(e={});function t(r,l){let{pathname:o,search:s,hash:a}=r.location;return Mi("",{pathname:o,search:s,hash:a},l.state&&l.state.usr||null,l.state&&l.state.key||"default")}function n(r,l){return typeof l=="string"?l:cd(l)}return tm(t,n,null,e)}function te(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function zs(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function em(){return Math.random().toString(36).substr(2,8)}function Wa(e,t){return{usr:e.state,key:e.key,idx:t}}function Mi(e,t,n,r){return n===void 0&&(n=null),Cr({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Un(t):t,{state:n,key:t&&t.key||r||em()})}function cd(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Un(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function tm(e,t,n,r){r===void 0&&(r={});let{window:l=document.defaultView,v5Compat:o=!1}=r,s=l.history,a=Et.Pop,u=null,c=p();c==null&&(c=0,s.replaceState(Cr({},s.state,{idx:c}),""));function p(){return(s.state||{idx:null}).idx}function d(){a=Et.Pop;let j=p(),m=j==null?null:j-c;c=j,u&&u({action:a,location:b.location,delta:m})}function h(j,m){a=Et.Push;let f=Mi(b.location,j,m);c=p()+1;let g=Wa(f,c),k=b.createHref(f);try{s.pushState(g,"",k)}catch(C){if(C instanceof DOMException&&C.name==="DataCloneError")throw C;l.location.assign(k)}o&&u&&u({action:a,location:b.location,delta:1})}function y(j,m){a=Et.Replace;let f=Mi(b.location,j,m);c=p();let g=Wa(f,c),k=b.createHref(f);s.replaceState(g,"",k),o&&u&&u({action:a,location:b.location,delta:0})}function w(j){let m=l.location.origin!=="null"?l.location.origin:l.location.href,f=typeof j=="string"?j:cd(j);return f=f.replace(/ $/,"%20"),te(m,"No window.location.(origin|href) available to create URL for href: "+f),new URL(f,m)}let b={get action(){return a},get location(){return e(l,s)},listen(j){if(u)throw new Error("A history only accepts one active listener");return l.addEventListener(Ba,d),u=j,()=>{l.removeEventListener(Ba,d),u=null}},createHref(j){return t(l,j)},createURL:w,encodeLocation(j){let m=w(j);return{pathname:m.pathname,search:m.search,hash:m.hash}},push:h,replace:y,go(j){return s.go(j)}};return b}var Va;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Va||(Va={}));function nm(e,t,n){return n===void 0&&(n="/"),rm(e,t,n)}function rm(e,t,n,r){let l=typeof t=="string"?Un(t):t,o=pd(l.pathname||"/",n);if(o==null)return null;let s=dd(e);lm(s);let a=null;for(let u=0;a==null&&u<s.length;++u){let c=gm(o);a=pm(s[u],c)}return a}function dd(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let l=(o,s,a)=>{let u={relativePath:a===void 0?o.path||"":a,caseSensitive:o.caseSensitive===!0,childrenIndex:s,route:o};u.relativePath.startsWith("/")&&(te(u.relativePath.startsWith(r),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(r.length));let c=Gt([r,u.relativePath]),p=n.concat(u);o.children&&o.children.length>0&&(te(o.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),dd(o.children,t,p,c)),!(o.path==null&&!o.index)&&t.push({path:c,score:dm(c,o.index),routesMeta:p})};return e.forEach((o,s)=>{var a;if(o.path===""||!((a=o.path)!=null&&a.includes("?")))l(o,s);else for(let u of fd(o.path))l(o,s,u)}),t}function fd(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,l=n.endsWith("?"),o=n.replace(/\?$/,"");if(r.length===0)return l?[o,""]:[o];let s=fd(r.join("/")),a=[];return a.push(...s.map(u=>u===""?o:[o,u].join("/"))),l&&a.push(...s),a.map(u=>e.startsWith("/")&&u===""?"/":u)}function lm(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:fm(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const om=/^:[\w-]+$/,im=3,sm=2,am=1,um=10,cm=-2,Qa=e=>e==="*";function dm(e,t){let n=e.split("/"),r=n.length;return n.some(Qa)&&(r+=cm),t&&(r+=sm),n.filter(l=>!Qa(l)).reduce((l,o)=>l+(om.test(o)?im:o===""?am:um),r)}function fm(e,t){return e.length===t.length&&e.slice(0,-1).every((r,l)=>r===t[l])?e[e.length-1]-t[t.length-1]:0}function pm(e,t,n){let{routesMeta:r}=e,l={},o="/",s=[];for(let a=0;a<r.length;++a){let u=r[a],c=a===r.length-1,p=o==="/"?t:t.slice(o.length)||"/",d=mm({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},p),h=u.route;if(!d)return null;Object.assign(l,d.params),s.push({params:l,pathname:Gt([o,d.pathname]),pathnameBase:bm(Gt([o,d.pathnameBase])),route:h}),d.pathnameBase!=="/"&&(o=Gt([o,d.pathnameBase]))}return s}function mm(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=hm(e.path,e.caseSensitive,e.end),l=t.match(n);if(!l)return null;let o=l[0],s=o.replace(/(.)\/+$/,"$1"),a=l.slice(1);return{params:r.reduce((c,p,d)=>{let{paramName:h,isOptional:y}=p;if(h==="*"){let b=a[d]||"";s=o.slice(0,o.length-b.length).replace(/(.)\/+$/,"$1")}const w=a[d];return y&&!w?c[h]=void 0:c[h]=(w||"").replace(/%2F/g,"/"),c},{}),pathname:o,pathnameBase:s,pattern:e}}function hm(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),zs(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],l="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(s,a,u)=>(r.push({paramName:a,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),l+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?l+="\\/*$":e!==""&&e!=="/"&&(l+="(?:(?=\\/|$))"),[new RegExp(l,t?void 0:"i"),r]}function gm(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return zs(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function pd(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}const xm=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,vm=e=>xm.test(e);function ym(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:l=""}=typeof e=="string"?Un(e):e,o;if(n)if(vm(n))o=n;else{if(n.includes("//")){let s=n;n=n.replace(/\/\/+/g,"/"),zs(!1,"Pathnames cannot have embedded double slashes - normalizing "+(s+" -> "+n))}n.startsWith("/")?o=Ha(n.substring(1),"/"):o=Ha(n,t)}else o=t;return{pathname:o,search:km(r),hash:jm(l)}}function Ha(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(l=>{l===".."?n.length>1&&n.pop():l!=="."&&n.push(l)}),n.length>1?n.join("/"):"/"}function $o(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function wm(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function md(e,t){let n=wm(e);return t?n.map((r,l)=>l===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function hd(e,t,n,r){r===void 0&&(r=!1);let l;typeof e=="string"?l=Un(e):(l=Cr({},e),te(!l.pathname||!l.pathname.includes("?"),$o("?","pathname","search",l)),te(!l.pathname||!l.pathname.includes("#"),$o("#","pathname","hash",l)),te(!l.search||!l.search.includes("#"),$o("#","search","hash",l)));let o=e===""||l.pathname==="",s=o?"/":l.pathname,a;if(s==null)a=n;else{let d=t.length-1;if(!r&&s.startsWith("..")){let h=s.split("/");for(;h[0]==="..";)h.shift(),d-=1;l.pathname=h.join("/")}a=d>=0?t[d]:"/"}let u=ym(l,a),c=s&&s!=="/"&&s.endsWith("/"),p=(o||s===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||p)&&(u.pathname+="/"),u}const Gt=e=>e.join("/").replace(/\/\/+/g,"/"),bm=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),km=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,jm=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Nm(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const gd=["post","put","patch","delete"];new Set(gd);const Sm=["get",...gd];new Set(Sm);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Er(){return Er=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Er.apply(this,arguments)}const Ls=x.createContext(null),Cm=x.createContext(null),Rr=x.createContext(null),no=x.createContext(null),At=x.createContext({outlet:null,matches:[],isDataRoute:!1}),xd=x.createContext(null);function Mr(){return x.useContext(no)!=null}function Ts(){return Mr()||te(!1),x.useContext(no).location}function vd(e){x.useContext(Rr).static||x.useLayoutEffect(e)}function ro(){let{isDataRoute:e}=x.useContext(At);return e?$m():Em()}function Em(){Mr()||te(!1);let e=x.useContext(Ls),{basename:t,future:n,navigator:r}=x.useContext(Rr),{matches:l}=x.useContext(At),{pathname:o}=Ts(),s=JSON.stringify(md(l,n.v7_relativeSplatPath)),a=x.useRef(!1);return vd(()=>{a.current=!0}),x.useCallback(function(c,p){if(p===void 0&&(p={}),!a.current)return;if(typeof c=="number"){r.go(c);return}let d=hd(c,JSON.parse(s),o,p.relative==="path");e==null&&t!=="/"&&(d.pathname=d.pathname==="/"?t:Gt([t,d.pathname])),(p.replace?r.replace:r.push)(d,p.state,p)},[t,r,s,o,e])}function _m(){let{matches:e}=x.useContext(At),t=e[e.length-1];return t?t.params:{}}function Pm(e,t){return zm(e,t)}function zm(e,t,n,r){Mr()||te(!1);let{navigator:l}=x.useContext(Rr),{matches:o}=x.useContext(At),s=o[o.length-1],a=s?s.params:{};s&&s.pathname;let u=s?s.pathnameBase:"/";s&&s.route;let c=Ts(),p;if(t){var d;let j=typeof t=="string"?Un(t):t;u==="/"||(d=j.pathname)!=null&&d.startsWith(u)||te(!1),p=j}else p=c;let h=p.pathname||"/",y=h;if(u!=="/"){let j=u.replace(/^\//,"").split("/");y="/"+h.replace(/^\//,"").split("/").slice(j.length).join("/")}let w=nm(e,{pathname:y}),b=Om(w&&w.map(j=>Object.assign({},j,{params:Object.assign({},a,j.params),pathname:Gt([u,l.encodeLocation?l.encodeLocation(j.pathname).pathname:j.pathname]),pathnameBase:j.pathnameBase==="/"?u:Gt([u,l.encodeLocation?l.encodeLocation(j.pathnameBase).pathname:j.pathnameBase])})),o,n,r);return t&&b?x.createElement(no.Provider,{value:{location:Er({pathname:"/",search:"",hash:"",state:null,key:"default"},p),navigationType:Et.Pop}},b):b}function Lm(){let e=Um(),t=Nm(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,l={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return x.createElement(x.Fragment,null,x.createElement("h2",null,"Unexpected Application Error!"),x.createElement("h3",{style:{fontStyle:"italic"}},t),n?x.createElement("pre",{style:l},n):null,null)}const Tm=x.createElement(Lm,null);class Rm extends x.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?x.createElement(At.Provider,{value:this.props.routeContext},x.createElement(xd.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Mm(e){let{routeContext:t,match:n,children:r}=e,l=x.useContext(Ls);return l&&l.static&&l.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(l.staticContext._deepestRenderedBoundaryId=n.route.id),x.createElement(At.Provider,{value:t},r)}function Om(e,t,n,r){var l;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var o;if(!n)return null;if(n.errors)e=n.matches;else if((o=r)!=null&&o.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let s=e,a=(l=n)==null?void 0:l.errors;if(a!=null){let p=s.findIndex(d=>d.route.id&&(a==null?void 0:a[d.route.id])!==void 0);p>=0||te(!1),s=s.slice(0,Math.min(s.length,p+1))}let u=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let p=0;p<s.length;p++){let d=s[p];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(c=p),d.route.id){let{loaderData:h,errors:y}=n,w=d.route.loader&&h[d.route.id]===void 0&&(!y||y[d.route.id]===void 0);if(d.route.lazy||w){u=!0,c>=0?s=s.slice(0,c+1):s=[s[0]];break}}}return s.reduceRight((p,d,h)=>{let y,w=!1,b=null,j=null;n&&(y=a&&d.route.id?a[d.route.id]:void 0,b=d.route.errorElement||Tm,u&&(c<0&&h===0?(Am("route-fallback"),w=!0,j=null):c===h&&(w=!0,j=d.route.hydrateFallbackElement||null)));let m=t.concat(s.slice(0,h+1)),f=()=>{let g;return y?g=b:w?g=j:d.route.Component?g=x.createElement(d.route.Component,null):d.route.element?g=d.route.element:g=p,x.createElement(Mm,{match:d,routeContext:{outlet:p,matches:m,isDataRoute:n!=null},children:g})};return n&&(d.route.ErrorBoundary||d.route.errorElement||h===0)?x.createElement(Rm,{location:n.location,revalidation:n.revalidation,component:b,error:y,children:f(),routeContext:{outlet:null,matches:m,isDataRoute:!0}}):f()},null)}var yd=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(yd||{}),wd=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(wd||{});function Dm(e){let t=x.useContext(Ls);return t||te(!1),t}function Im(e){let t=x.useContext(Cm);return t||te(!1),t}function Fm(e){let t=x.useContext(At);return t||te(!1),t}function bd(e){let t=Fm(),n=t.matches[t.matches.length-1];return n.route.id||te(!1),n.route.id}function Um(){var e;let t=x.useContext(xd),n=Im(),r=bd();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function $m(){let{router:e}=Dm(yd.UseNavigateStable),t=bd(wd.UseNavigateStable),n=x.useRef(!1);return vd(()=>{n.current=!0}),x.useCallback(function(l,o){o===void 0&&(o={}),n.current&&(typeof l=="number"?e.navigate(l):e.navigate(l,Er({fromRouteId:t},o)))},[e,t])}const Ka={};function Am(e,t,n){Ka[e]||(Ka[e]=!0)}function Bm(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Wm(e){let{to:t,replace:n,state:r,relative:l}=e;Mr()||te(!1);let{future:o,static:s}=x.useContext(Rr),{matches:a}=x.useContext(At),{pathname:u}=Ts(),c=ro(),p=hd(t,md(a,o.v7_relativeSplatPath),u,l==="path"),d=JSON.stringify(p);return x.useEffect(()=>c(JSON.parse(d),{replace:n,state:r,relative:l}),[c,d,l,n,r]),null}function cn(e){te(!1)}function Vm(e){let{basename:t="/",children:n=null,location:r,navigationType:l=Et.Pop,navigator:o,static:s=!1,future:a}=e;Mr()&&te(!1);let u=t.replace(/^\/*/,"/"),c=x.useMemo(()=>({basename:u,navigator:o,static:s,future:Er({v7_relativeSplatPath:!1},a)}),[u,a,o,s]);typeof r=="string"&&(r=Un(r));let{pathname:p="/",search:d="",hash:h="",state:y=null,key:w="default"}=r,b=x.useMemo(()=>{let j=pd(p,u);return j==null?null:{location:{pathname:j,search:d,hash:h,state:y,key:w},navigationType:l}},[u,p,d,h,y,w,l]);return b==null?null:x.createElement(Rr.Provider,{value:c},x.createElement(no.Provider,{children:n,value:b}))}function Qm(e){let{children:t,location:n}=e;return Pm(Oi(t),n)}new Promise(()=>{});function Oi(e,t){t===void 0&&(t=[]);let n=[];return x.Children.forEach(e,(r,l)=>{if(!x.isValidElement(r))return;let o=[...t,l];if(r.type===x.Fragment){n.push.apply(n,Oi(r.props.children,o));return}r.type!==cn&&te(!1),!r.props.index||!r.props.children||te(!1);let s={id:r.props.id||o.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(s.children=Oi(r.props.children,o)),n.push(s)}),n}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Hm="6";try{window.__reactRouterVersion=Hm}catch{}const Km="startTransition",qa=$d[Km];function qm(e){let{basename:t,children:n,future:r,window:l}=e,o=x.useRef();o.current==null&&(o.current=Zp({window:l,v5Compat:!0}));let s=o.current,[a,u]=x.useState({action:s.action,location:s.location}),{v7_startTransition:c}=r||{},p=x.useCallback(d=>{c&&qa?qa(()=>u(d)):u(d)},[u,c]);return x.useLayoutEffect(()=>s.listen(p),[s,p]),x.useEffect(()=>Bm(r),[r]),x.createElement(Vm,{basename:t,children:n,location:a.location,navigationType:a.action,navigator:s,future:r})}var Ya;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Ya||(Ya={}));var Ga;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Ga||(Ga={}));const kd=x.createContext();function Ym({children:e}){const[t,n]=x.useState([]),r=u=>{n(c=>c.find(d=>d.id===u.id)?c.map(d=>d.id===u.id?{...d,qty:d.qty+1}:d):[...c,{...u,qty:1}])},l=u=>{n(c=>c.map(p=>p.id===u?{...p,qty:p.qty+1}:p))},o=u=>{n(c=>c.reduce((p,d)=>{if(d.id!==u)return[...p,d];const h=d.qty-1;return h>0?[...p,{...d,qty:h}]:p},[]))},s=u=>{n(c=>c.filter(p=>p.id!==u))},a=()=>n([]);return i.jsx(kd.Provider,{value:{cart:t,addToCart:r,increaseQty:l,decreaseQty:o,removeFromCart:s,clearCart:a},children:e})}const Gm=()=>x.useContext(kd);function Xm({isOpen:e,cartItems:t,tableNumber:n,onClose:r,onRemove:l,onIncrease:o,onDecrease:s,onCheckout:a,checkoutState:u}){const c=t.reduce((p,d)=>p+d.qty*parseFloat(d.price||0),0);return i.jsxs("div",{className:`cart-backdrop ${e?"open":""}`,onClick:p=>{p.target===p.currentTarget&&r()},children:[i.jsx("style",{children:`
        .cart-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(15, 23, 42, 0.65);
          display: flex;
          justify-content: flex-end;
          z-index: 2000;
          padding: 1rem;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          box-sizing: border-box;
        }

        .cart-backdrop.open {
          opacity: 1;
          visibility: visible;
        }

        .cart-drawer {
          width: 100%;
          max-width: 420px;
          background-color: #ffffff;
          border-radius: 24px;
          box-shadow: 0 24px 80px rgba(15, 23, 42, 0.18);
          display: flex;
          flex-direction: column;
          max-height: calc(100vh - 2rem);
          transform: translateX(110%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          box-sizing: border-box;
        }

        .cart-backdrop.open .cart-drawer {
          transform: translateX(0);
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.5rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .cart-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .cart-subtitle {
          margin-top: 0.25rem;
          color: #64748b;
          font-size: 0.88rem;
          font-weight: 500;
        }

        .cart-close-btn {
          background: #f1f5f9;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
          line-height: 1;
        }

        .cart-close-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
          transform: rotate(90deg);
        }

        .cart-body {
          padding: 1.5rem;
          overflow-y: auto;
          flex: 1;
        }

        .cart-empty-state {
          color: #64748b;
          font-size: 0.95rem;
          text-align: center;
          margin-top: 3rem;
          font-weight: 500;
        }

        .cart-item-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cart-item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.85rem 1rem;
          border-radius: 18px;
          background-color: #f8fafc;
          border: 1px solid #f1f5f9;
          gap: 0.75rem;
        }

        .cart-item-image {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          object-fit: cover;
          background-color: #e2e8f0;
          border: 1px solid rgba(15, 23, 42, 0.05);
          flex-shrink: 0;
        }

        .cart-item-info {
          flex: 1;
          min-width: 0;
        }

        .cart-item-name {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.95rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cart-item-meta {
          margin-top: 0.25rem;
          color: #64748b;
          font-size: 0.82rem;
          font-weight: 500;
        }

        .cart-qty-controls {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-shrink: 0;
        }

        .cart-qty-btn {
          width: 26px;
          height: 26px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
          cursor: pointer;
          color: #475569;
          font-size: 0.9rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .cart-qty-btn:hover {
          background-color: #f1f5f9;
          color: #0f172a;
          border-color: #94a3b8;
        }

        .cart-qty-val {
          min-width: 18px;
          text-align: center;
          font-weight: 800;
          font-size: 0.9rem;
          color: #0f172a;
        }

        .cart-remove-btn {
          border: none;
          background: transparent;
          color: #ef4444;
          font-weight: 700;
          font-size: 0.82rem;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .cart-remove-btn:hover {
          background-color: #fef2f2;
        }

        .cart-footer {
          padding: 1.5rem;
          border-top: 1px solid #f1f5f9;
          background-color: #ffffff;
        }

        .cart-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .cart-total-label {
          color: #64748b;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .cart-total-val {
          font-size: 1.25rem;
          font-weight: 850;
          color: #0f766e;
        }

        .cart-checkout-btn {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          border: none;
          background-color: #0f766e;
          color: white;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(15, 118, 110, 0.15);
          transition: all 0.2s ease;
        }

        .cart-checkout-btn:hover:not(:disabled) {
          background-color: #0d655d;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(15, 118, 110, 0.25);
        }

        .cart-checkout-btn:disabled {
          background-color: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
        }

        .cart-error-text {
          color: #b91c1c;
          margin-bottom: 0.75rem;
          font-size: 0.88rem;
          font-weight: 600;
          background-color: #fef2f2;
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid #fecaca;
        }

        .cart-success-text {
          color: #15803d;
          margin-bottom: 0.75rem;
          font-size: 0.88rem;
          font-weight: 600;
          background-color: #f0fdf4;
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid #bbf7d0;
        }
      `}),i.jsxs("div",{className:"cart-drawer",onClick:p=>p.stopPropagation(),children:[i.jsxs("div",{className:"cart-header",children:[i.jsxs("div",{children:[i.jsx("h2",{className:"cart-title",children:"Keranjang Saya"}),i.jsx("div",{className:"cart-subtitle",children:n?`Meja ${n}`:"Tentukan nomor meja sebelum checkout"})]}),i.jsx("button",{className:"cart-close-btn",onClick:r,"aria-label":"Tutup keranjang",children:"×"})]}),i.jsx("div",{className:"cart-body",children:t.length===0?i.jsx("div",{className:"cart-empty-state",children:"Keranjang kosong. Tambahkan menu terlebih dahulu."}):i.jsx("div",{className:"cart-item-list",children:t.map(p=>i.jsxs("div",{className:"cart-item-row",children:[i.jsx("img",{src:p.image_url||"http://placehold.co/100x100?text=Menu",alt:p.name,className:"cart-item-image"}),i.jsxs("div",{className:"cart-item-info",children:[i.jsx("div",{className:"cart-item-name",children:p.name}),i.jsxs("div",{className:"cart-item-meta",children:["Rp ",Number(p.price).toLocaleString("id-ID")]})]}),i.jsxs("div",{className:"cart-qty-controls",children:[i.jsx("button",{className:"cart-qty-btn",onClick:()=>s(p.id),children:"-"}),i.jsx("span",{className:"cart-qty-val",children:p.qty}),i.jsx("button",{className:"cart-qty-btn",onClick:()=>o(p.id),children:"+"})]}),i.jsx("button",{className:"cart-remove-btn",onClick:()=>l(p.id),children:"Hapus"})]},p.id))})}),i.jsxs("div",{className:"cart-footer",children:[i.jsxs("div",{className:"cart-total-row",children:[i.jsx("span",{className:"cart-total-label",children:"Total"}),i.jsxs("span",{className:"cart-total-val",children:["Rp ",Number(c).toLocaleString("id-ID")]})]}),u&&i.jsx("div",{className:u.error?"cart-error-text":"cart-success-text",children:u.message}),i.jsx("button",{className:"cart-checkout-btn",onClick:a,disabled:t.length===0||!n||(u==null?void 0:u.loading),children:u!=null&&u.loading?"Memproses...":"Pesan & Checkout"})]})]})]})}function Jm({isOpen:e,onClose:t,cartItems:n,total:r,tableNumber:l,onConfirm:o,loading:s}){const[a,u]=x.useState("Dana");if(!e)return null;const c=[{id:"Dana",name:"DANA",icon:"👛",color:"#118ee9"},{id:"Ovo",name:"OVO",icon:"💜",color:"#4c2a86"},{id:"GoPay",name:"GoPay",icon:"📱",color:"#00a5cf"},{id:"Tunai",name:"Kasir (Tunai)",icon:"💵",color:"#10b981"}],p=()=>{o(a)};return i.jsxs("div",{className:"payment-backdrop",onClick:d=>{d.target===d.currentTarget&&!s&&t()},children:[i.jsx("style",{children:`
        .payment-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3000;
          padding: 1rem;
          box-sizing: border-box;
          animation: modalFadeIn 0.3s ease-out;
        }

        .payment-modal {
          width: 100%;
          max-width: 480px;
          background-color: #ffffff;
          border-radius: 28px;
          box-shadow: 0 30px 100px rgba(15, 23, 42, 0.25);
          display: flex;
          flex-direction: column;
          max-height: calc(100vh - 2rem);
          overflow: hidden;
          animation: modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(15, 23, 42, 0.05);
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideUp {
          from { transform: translateY(40px) scale(0.96); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .payment-header {
          padding: 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          text-align: center;
        }

        .payment-title {
          font-size: 1.35rem;
          font-weight: 850;
          color: #0f172a;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .payment-subtitle {
          margin-top: 0.35rem;
          color: #64748b;
          font-size: 0.88rem;
          font-weight: 600;
        }

        .payment-body {
          padding: 1.5rem;
          overflow-y: auto;
          flex: 1;
        }

        .section-label {
          font-size: 0.85rem;
          font-weight: 800;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
          display: block;
        }

        /* Order Items Summary List */
        .order-summary-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.75rem;
          background-color: #f8fafc;
          padding: 1rem;
          border-radius: 20px;
          border: 1px solid #f1f5f9;
        }

        .summary-item-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .summary-item-image {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          object-fit: cover;
          background-color: #e2e8f0;
          border: 1px solid rgba(15, 23, 42, 0.05);
        }

        .summary-item-info {
          flex: 1;
          min-width: 0;
        }

        .summary-item-name {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.9rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .summary-item-qty {
          margin-top: 0.2rem;
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 500;
        }

        .summary-item-subtotal {
          font-weight: 800;
          color: #0f172a;
          font-size: 0.9rem;
        }

        /* Payment Methods grid */
        .payment-methods-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 1.5rem;
        }

        .payment-card {
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background-color: #ffffff;
          user-select: none;
          position: relative;
          box-sizing: border-box;
        }

        .payment-card:hover:not(.disabled) {
          border-color: #cbd5e1;
          background-color: #f8fafc;
        }

        .payment-card.active {
          border-color: var(--brand-color);
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);
        }

        .payment-card.active::after {
          content: '✓';
          position: absolute;
          top: 8px;
          right: 8px;
          width: 18px;
          height: 18px;
          background-color: var(--brand-color);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: 800;
        }

        .payment-icon {
          font-size: 1.6rem;
          margin-bottom: 0.35rem;
        }

        .payment-name {
          font-weight: 800;
          font-size: 0.88rem;
          color: #0f172a;
        }

        .payment-footer {
          padding: 1.5rem;
          border-top: 1px solid #f1f5f9;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .bill-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .bill-label {
          color: #64748b;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .bill-total {
          font-size: 1.45rem;
          font-weight: 900;
          color: #0f766e;
        }

        .pay-confirm-btn {
          width: 100%;
          padding: 0.95rem 1rem;
          border-radius: 16px;
          border: none;
          background-color: #10b981;
          color: white;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.2);
          transition: all 0.25s ease;
        }

        .pay-confirm-btn:hover:not(:disabled) {
          background-color: #059669;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(16, 185, 129, 0.35);
        }

        .pay-confirm-btn:disabled {
          background-color: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
        }

        .pay-cancel-btn {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 16px;
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
          color: #475569;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pay-cancel-btn:hover:not(:disabled) {
          background-color: #f8fafc;
          color: #0f172a;
          border-color: #94a3b8;
        }
      `}),i.jsxs("div",{className:"payment-modal",onClick:d=>d.stopPropagation(),children:[i.jsxs("div",{className:"payment-header",children:[i.jsx("h2",{className:"payment-title",children:"Konfirmasi Pembayaran"}),i.jsxs("div",{className:"payment-subtitle",children:["Meja ",l]})]}),i.jsxs("div",{className:"payment-body",children:[i.jsx("span",{className:"section-label",children:"Ringkasan Pesanan"}),i.jsx("div",{className:"order-summary-list",children:n.map(d=>i.jsxs("div",{className:"summary-item-row",children:[i.jsx("img",{src:d.image_url||"http://placehold.co/100x100?text=Menu",alt:d.name,className:"summary-item-image"}),i.jsxs("div",{className:"summary-item-info",children:[i.jsx("div",{className:"summary-item-name",children:d.name}),i.jsxs("div",{className:"summary-item-qty",children:[d.qty," Porsi x Rp ",Number(d.price).toLocaleString("id-ID")]})]}),i.jsxs("div",{className:"summary-item-subtotal",children:["Rp ",Number(d.qty*parseFloat(d.price||0)).toLocaleString("id-ID")]})]},d.id))}),i.jsx("span",{className:"section-label",children:"Metode Pembayaran"}),i.jsx("div",{className:"payment-methods-grid",children:c.map(d=>i.jsxs("div",{className:`payment-card ${a===d.id?"active":""} ${s?"disabled":""}`,style:{"--brand-color":d.color},onClick:()=>{s||u(d.id)},children:[i.jsx("span",{className:"payment-icon",children:d.icon}),i.jsx("span",{className:"payment-name",children:d.name})]},d.id))})]}),i.jsxs("div",{className:"payment-footer",children:[i.jsxs("div",{className:"bill-summary",children:[i.jsx("span",{className:"bill-label",children:"Total Pembayaran"}),i.jsxs("span",{className:"bill-total",children:["Rp ",Number(r).toLocaleString("id-ID")]})]}),i.jsx("button",{className:"pay-confirm-btn",onClick:p,disabled:s||n.length===0,children:s?"Memproses Pesanan...":"Konfirmasi & Kirim Pesanan"}),i.jsx("button",{className:"pay-cancel-btn",onClick:t,disabled:s,children:"Kembali ke Keranjang"})]})]})]})}function Zm({isOpen:e,onClose:t}){return e?i.jsxs("div",{className:"success-modal-backdrop",onClick:t,children:[i.jsx("style",{children:`
        .success-modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4000;
          padding: 1.5rem;
          box-sizing: border-box;
          animation: successFadeIn 0.3s ease-out;
        }

        .success-modal-card {
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border-radius: 32px;
          box-shadow: 0 35px 120px rgba(16, 185, 129, 0.25), 0 10px 40px rgba(15, 23, 42, 0.15);
          padding: 2.5rem 2rem;
          text-align: center;
          box-sizing: border-box;
          animation: successSlideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(16, 185, 129, 0.1);
          position: relative;
          overflow: hidden;
        }

        /* Ambient glowing background */
        .success-modal-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
          pointer-events: none;
          z-index: 0;
        }

        @keyframes successFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes successSlideUp {
          from { transform: translateY(60px) scale(0.92); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .success-icon-wrapper {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background-color: #ecfdf5;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          position: relative;
          z-index: 1;
          box-shadow: 0 12px 30px rgba(16, 185, 129, 0.2);
          border: 2px solid #a7f3d0;
          animation: successPulse 2s infinite;
        }

        @keyframes successPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
          }
          70% {
            box-shadow: 0 0 0 18px rgba(16, 185, 129, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }

        .checkmark-svg {
          width: 48px;
          height: 48px;
          color: #10b981;
        }

        .checkmark-path {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawCheckmark 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards 0.2s;
        }

        @keyframes drawCheckmark {
          to { stroke-dashoffset: 0; }
        }

        .success-title {
          font-size: 1.45rem;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 0.75rem;
          letter-spacing: -0.025em;
          position: relative;
          z-index: 1;
        }

        .success-description {
          font-size: 0.98rem;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 2rem;
          font-weight: 600;
          position: relative;
          z-index: 1;
        }

        .success-description span {
          color: #10b981;
          font-weight: 800;
          display: block;
          margin-top: 0.25rem;
          font-size: 1.02rem;
        }

        .success-close-btn {
          width: 100%;
          padding: 1rem 2rem;
          border-radius: 18px;
          border: none;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          font-weight: 800;
          font-size: 0.98rem;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
          transition: all 0.25s ease;
          position: relative;
          z-index: 1;
          letter-spacing: 0.01em;
        }

        .success-close-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(16, 185, 129, 0.45);
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
        }

        .success-close-btn:active {
          transform: translateY(0);
        }
      `}),i.jsxs("div",{className:"success-modal-card",onClick:n=>n.stopPropagation(),children:[i.jsx("div",{className:"success-icon-wrapper",children:i.jsx("svg",{className:"checkmark-svg",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{className:"checkmark-path",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3.5",d:"M5 13l4 4L19 7"})})}),i.jsx("h2",{className:"success-title",children:"Pesanan Berhasil Dikirim!"}),i.jsxs("p",{className:"success-description",children:["Terima kasih telah memesan.",i.jsx("br",{}),i.jsx("span",{children:"Silakan tunggu di meja."})]}),i.jsx("button",{className:"success-close-btn",onClick:t,children:"Selesai & Tutup"})]})]}):null}const un=e=>e,eh=()=>{const[e,t]=x.useState([]),[n,r]=x.useState(!0),[l,o]=x.useState("Semua"),[s,a]=x.useState(""),[u,c]=x.useState(!1),[p,d]=x.useState(null),[h,y]=x.useState("menu"),[w,b]=x.useState([]),[j,m]=x.useState([]),[f,g]=x.useState("orders"),[k,C]=x.useState(!1),[z,P]=x.useState(!1),[T,B]=x.useState([]),[D,ue]=x.useState(!1),[Re,Be]=x.useState(""),[ot,ln]=x.useState(""),[We,it]=x.useState(null),[E,O]=x.useState(""),[M,W]=x.useState("18:00"),[U,Ve]=x.useState(null),[Me,xt]=x.useState([]),[Ne,Ze]=x.useState(!1),{cart:Qe,addToCart:Or,removeFromCart:lo,increaseQty:Dr,decreaseQty:Bt,clearCart:Ir}=Gm();x.useEffect(()=>{const R=new URLSearchParams(window.location.search).get("table");R&&a(R),Oe(),vt(),fetch(un("/api/menu")).then(S=>S.json()).then(S=>{t(S),r(!1)}).catch(S=>{console.error(S),r(!1)}),fetch(un("/api/qrcodes")).then(S=>S.json()).then(S=>{xt(S)}).catch(S=>{console.error(S)});const $=S=>{S.target.closest(".custom-dropdown-container")||Ze(!1)};return document.addEventListener("click",$),()=>{document.removeEventListener("click",$)}},[]);const Oe=()=>{const v=JSON.parse(localStorage.getItem("quickorder_history")||"[]");b(v)},on=v=>{localStorage.setItem("quickorder_history",JSON.stringify(v)),b(v)},vt=()=>{const v=JSON.parse(localStorage.getItem("quickorder_reservations")||"[]");m(v)},yt=v=>{localStorage.setItem("quickorder_reservations",JSON.stringify(v)),m(v)},$n=async()=>{if(w.length!==0)try{const R=await(await fetch(un("/api/orders"))).json(),$=Object.fromEntries(R.map(L=>[L.id,L.status])),S=w.map(L=>({...L,status:$[L.id]||L.status}));on(S)}catch(v){console.error(v)}},An=async()=>{if(j.length!==0)try{const R=await(await fetch(un("/api/reservations"))).json(),$=Object.fromEntries(R.map(L=>[L.id,L.status])),S=j.map(L=>({...L,status:$[L.id]||L.status}));yt(S)}catch(v){console.error(v)}},sn=()=>{y("history"),$n(),An()},oo=v=>{if(window.confirm("Apakah Anda yakin ingin menghapus pesanan ini dari riwayat Anda?")){const R=w.filter($=>$.id!==v);on(R)}},io=v=>{if(window.confirm("Apakah Anda yakin ingin membatalkan/menghapus reservasi tempat ini?")){const R=j.filter($=>$.id!==v);yt(R)}},so=async v=>{if(v.preventDefault(),!Re||!ot||!We||!E||!M){Ve({success:!1,message:"Semua kolom wajib diisi, termasuk memilih nomor meja."});return}Ve({loading:!0,message:"Mengirim permohonan reservasi..."});try{const R=await fetch(un("/api/reservations"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:Re,phone:ot,table_no:We,reservation_date:E,reservation_time:M})}),$=await R.json();if(!R.ok)throw new Error($.message||"Gagal membuat reservasi.");const L=[{id:$.reservation.id,name:Re,phone:ot,table_no:We,reservation_date:E,reservation_time:M,status:"pending",createdAt:new Date().toISOString()},...j];yt(L),Ve({success:!0,message:`Reservasi Meja ${We} sukses terkirim! Silakan tunggu konfirmasi admin.`}),Be(""),ln(""),it(null),O("")}catch(R){console.error(R),Ve({success:!1,message:R.message||"Gagal mengirim permohonan reservasi."})}},Fr=Qe.reduce((v,R)=>v+R.qty,0),ao=v=>{const R=Qe.find($=>$.id===v);return R?R.qty:0},Ur=v=>{const R=v.currentTarget.getBoundingClientRect(),$=R.left+R.width/2,S=R.top+R.height/2,L={id:Date.now()+Math.random(),x:$,y:S};B(K=>[...K,L]),setTimeout(()=>{ue(!0)},550),setTimeout(()=>{ue(!1)},850),setTimeout(()=>{B(K=>K.filter($r=>$r.id!==L.id))},800)},uo=(v,R)=>{if(!s){alert("Silakan scan QR Code meja atau pilih nomor meja Anda terlebih dahulu untuk mulai memesan."),window.scrollTo({top:0,behavior:"smooth"});return}Ur(v),Or({id:R.id,name:R.name,price:R.price,image_url:R.image_url}),d(null)},co=(v,R)=>{if(!s){alert("Silakan scan QR Code meja atau pilih nomor meja Anda terlebih dahulu untuk mulai memesan."),window.scrollTo({top:0,behavior:"smooth"});return}Ur(v),Dr(R)},fo=()=>{if(!s){d({error:!0,message:"Silakan gunakan parameter ?table= pada URL untuk memilih nomor meja sebelum checkout."});return}if(Qe.length===0){d({error:!0,message:"Keranjang masih kosong."});return}c(!1),C(!0)},po=async v=>{d({loading:!0,message:"Mengirim pesanan..."});try{const R=Qe.reduce((K,$r)=>K+$r.qty*parseFloat($r.price||0),0),$=await fetch(un("/api/orders"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tableNo:s,customerName:`Tamu Meja ${s}`,total:R,paymentMethod:v,items:Qe.map(K=>({id:K.id,qty:K.qty,name:K.name,price:K.price}))})}),S=await $.json();if(!$.ok)throw new Error(S.error||"Gagal mengirim pesanan.");const L={id:S.order.id,tableNo:s,total:R,items:Qe.map(K=>({id:K.id,name:K.name,qty:K.qty,price:K.price,image_url:K.image_url})),status:"pending",paymentMethod:v,createdAt:new Date().toISOString()};on([L,...w]),Ir(),C(!1),P(!0),d(null)}catch(R){console.error(R),d({error:!0,message:R.message||"Terjadi kesalahan saat checkout."})}};return i.jsxs("div",{className:"app-container",children:[i.jsx("style",{children:`
        .app-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: #f8fafc;
          min-height: 100vh;
          margin: 0;
          color: #1e293b;
          display: flex;
          flex-direction: column;
        }

        /* Modern Navbar Styling */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.95rem 6%;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
          border-bottom: 1px solid rgba(15, 23, 42, 0.05);
        }

        .brand {
          font-size: 1.45rem;
          font-weight: 800;
          color: #ff5722;
          letter-spacing: -0.03em;
          display: flex;
          align-items: center;
          gap: 6px;
          user-select: none;
        }

        .nav-desktop-links {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .nav-link-btn {
          border: none;
          background: transparent;
          color: #475569;
          font-weight: 600;
          font-size: 0.92rem;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 8px 16px;
          border-radius: 999px;
        }

        .nav-link-btn:hover {
          color: #ff5722;
          background-color: #fff3f0;
        }

        .nav-link-btn.active {
          color: #ff5722;
          background-color: #fff3f0;
        }

        /* Modern Cart Icon Button */
        .cart-button {
          border: none;
          background-color: #0f766e;
          color: #ffffff;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(15, 118, 110, 0.2);
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }

        .cart-button:hover {
          background-color: #0d655d;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(15, 118, 110, 0.3);
        }

        .cart-button svg {
          width: 22px;
          height: 22px;
        }

        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background-color: #ef4444;
          color: white;
          font-size: 0.72rem;
          font-weight: 800;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.35);
          border: 2px solid #ffffff;
          animation: badgePop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* Cart bump bounce micro-animation */
        .cart-bounce {
          animation: cartBump 0.3s ease-out;
        }

        @keyframes cartBump {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }

        @keyframes badgePop {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }

        /* Flying particle */
        .flying-particle {
          position: fixed;
          width: 24px;
          height: 24px;
          background-color: #ec4899;
          border-radius: 50%;
          z-index: 9999;
          pointer-events: none;
          box-shadow: 0 4px 14px rgba(236, 72, 153, 0.4);
          animation: flyToCart 0.75s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        @keyframes flyToCart {
          0% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 1;
          }
          40% {
            transform: translate(-50%, -50%) scale(1.4);
          }
          100% {
            left: calc(100vw - 60px);
            top: 25px;
            transform: translate(0, 0) scale(0.3);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          @keyframes flyToCart {
            0% {
              transform: translate(-50%, -50%) scale(1.1);
              opacity: 1;
            }
            100% {
              left: calc(100vw - 45px);
              top: 25px;
              transform: translate(0, 0) scale(0.3);
              opacity: 0;
            }
          }
        }

        /* Mobile Top Navbar Tweaks */
        @media (max-width: 768px) {
          .nav-desktop-links {
            display: none !important;
          }
          .navbar {
            padding: 0.8rem 5% !important;
          }
          .brand {
            font-size: 1.2rem !important;
          }
        }

        /* Premium Mobile Bottom Floating Navigation Bar */
        .mobile-bottom-nav {
          display: none;
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 92%;
          max-width: 380px;
          background-color: rgba(15, 23, 42, 0.94);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 6px 8px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
          z-index: 999;
          justify-content: space-around;
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 768px) {
          .mobile-bottom-nav {
            display: flex !important;
          }
        }

        .mobile-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          gap: 3px;
          transition: all 0.2s ease;
          padding: 8px 12px;
          border-radius: 20px;
          flex: 1;
        }

        .mobile-nav-item svg {
          width: 20px;
          height: 20px;
        }

        .mobile-nav-item.active {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.12);
        }

        /* Compact Spacesaving Menu Card grid */
        .menu-grid {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 24px !important;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .menu-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 16px !important;
          }
        }

        @media (max-width: 768px) {
          .menu-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
        }

        /* Compact Spacesaving Menu Card */
        .menu-card {
          background-color: white;
          border-radius: 20px;
          padding: 12px !important;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.03);
          border: 1px solid rgba(15, 23, 42, 0.04);
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .menu-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.06);
        }

        .menu-image {
          width: 100%;
          height: 140px !important;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 8px !important;
        }

        @media (max-width: 768px) {
          .menu-image {
            height: 100px !important;
          }
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px !important;
          gap: 4px;
        }

        .price-tag {
          font-size: 0.95rem !important;
          font-weight: 800;
          color: #10b981;
        }

        .menu-name {
          font-size: 1rem !important;
          font-weight: 700;
          margin: 0 0 4px 0 !important;
          color: #0f172a;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .order-btn {
          width: 100%;
          padding: 0.6rem !important;
          background-color: #ec4899;
          color: white;
          border: none;
          border-radius: 10px !important;
          font-size: 0.82rem !important;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(236, 72, 153, 0.15);
        }

        .order-btn:hover {
          background-color: #db2777;
          box-shadow: 0 6px 14px rgba(236, 72, 153, 0.25);
        }

        /* Tactile Quantity Selector Buttons */
        .qty-selector {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-top: auto;
          gap: 6px;
        }

        .qty-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: none;
          user-select: none;
        }

        .qty-btn:active {
          transform: scale(0.85);
        }

        .qty-btn-minus {
          background-color: #f1f5f9;
          color: #475569;
          border: 1px solid #cbd5e1;
        }

        .qty-btn-minus:hover {
          background-color: #e2e8f0;
          color: #0f172a;
        }

        .qty-btn-plus {
          background-color: #ec4899;
          color: white;
          box-shadow: 0 4px 10px rgba(236, 72, 153, 0.2);
        }

        .qty-btn-plus:hover {
          background-color: #db2777;
          box-shadow: 0 6px 14px rgba(236, 72, 153, 0.3);
        }

        .qty-text {
          font-weight: 800;
          font-size: 1.05rem;
          color: #0f172a;
          user-select: none;
        }

        /* Hero details optimization */
        .hero {
          min-height: 170px !important;
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1e293b;
          text-align: center;
          padding: 1.5rem !important;
        }

        .hero-title {
          font-size: 2.2rem !important;
          margin: 0 0 0.5rem 0 !important;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.25;
        }

        .hero-subtitle {
          font-size: 0.92rem !important;
          color: #475569;
          max-width: 600px;
          margin: 0 auto !important;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .hero {
            min-height: 130px !important;
            padding: 1rem !important;
          }
          .hero-title {
            font-size: 1.45rem !important;
          }
          .hero-subtitle {
            font-size: 0.78rem !important;
          }
        }

        .main-section {
          padding: 3rem 6%;
          max-width: 1200px;
          margin: 0 auto;
          flex-grow: 1;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .main-section {
            padding: 1.5rem 4% 7rem 4% !important;
          }
        }

        .section-title {
          font-size: 2rem !important;
          text-align: center;
          color: #1f2937;
          margin-bottom: 2rem !important;
          font-weight: 800;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 1.45rem !important;
            margin-bottom: 1.2rem !important;
          }
        }

        /* Banner Table */
        .table-banner {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          padding: 0.5rem 1rem !important;
          border-radius: 999px !important;
          background-color: #eff6ff;
          border: 1px solid #bfdbfe;
        }

        .table-label {
          font-size: 0.8rem !important;
          color: #2563eb;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 0.05em;
        }

        .table-number {
          font-size: 1.25rem !important;
          color: #1e3a8a;
          font-weight: 900;
        }

        .tabs-container {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: none;
        }
        .tabs-container::-webkit-scrollbar {
          display: none;
        }

        .tab-button {
          padding: 6px 14px !important;
          border-radius: 999px !important;
          border: 1px solid rgba(15, 23, 42, 0.06) !important;
          background: white;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem !important;
          color: #475569;
          box-shadow: 0 2px 6px rgba(15,23,42,0.02);
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .tab-active {
          background-color: #0ea5e9 !important;
          color: white !important;
          border-color: #0ea5e9 !important;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2) !important;
        }

        /* History sub tabs layout */
        .history-subtabs {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .subtab-button {
          padding: 8px 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background-color: #ffffff;
          font-size: 0.88rem;
          font-weight: 700;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .subtab-button.active {
          background-color: #0f766e;
          color: #ffffff;
          border-color: #0f766e;
          box-shadow: 0 4px 12px rgba(15, 118, 110, 0.15);
        }

        /* Modern Card-Based History Layout Styles (No Scroll) */
        .history-list-container {
          width: 100%;
        }

        .history-empty-state {
          text-align: center;
          padding: 3.5rem 1.5rem;
          color: #64748b;
          font-weight: 600;
          background-color: #ffffff;
          border-radius: 24px;
          border: 1px solid rgba(15, 23, 42, 0.05);
        }

        .history-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          width: 100%;
        }

        @media (max-width: 768px) {
          .history-cards-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .history-order-card {
          background-color: #ffffff;
          border-radius: 24px;
          padding: 1.25rem;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.01);
          border: 1px solid rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.25s ease;
        }

        .history-order-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 35px rgba(15, 23, 42, 0.04);
        }

        .history-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px dashed #e2e8f0;
          padding-bottom: 0.85rem;
          margin-bottom: 0.85rem;
        }

        .order-meta-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .order-id-label {
          font-size: 1.05rem;
          font-weight: 850;
          color: #0f172a;
          letter-spacing: -0.01em;
        }

        .order-table-badge {
          background-color: #eff6ff;
          color: #2563eb;
          padding: 2px 8px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .order-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .order-status-badge {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .order-status-badge.status-pending {
          background-color: #fef3c7;
          color: #b45309;
        }

        .order-status-badge.status-cooking,
        .order-status-badge.status-ready {
          background-color: #e0f2fe;
          color: #0369a1;
        }

        .order-status-badge.status-confirmed {
          background-color: #dcfce7;
          color: #15803d;
        }

        .order-status-badge.status-completed {
          background-color: #f1f5f9;
          color: #475569;
        }

        .order-status-badge.status-cancelled {
          background-color: #fde8e8;
          color: #9b1c1c;
        }

        .order-delete-btn {
          background: #fef2f2;
          color: #ef4444;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .order-delete-btn:hover {
          background: #fee2e2;
          transform: scale(1.05);
        }

        .order-delete-btn svg {
          width: 16px;
          height: 16px;
        }

        .history-card-body {
          flex: 1;
          margin-bottom: 0.85rem;
        }

        .history-items-title {
          font-size: 0.78rem;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.5rem;
        }

        .history-items-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .history-item-row-detail {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.88rem;
        }

        .history-item-left {
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
        }

        .history-item-qty-badge {
          background-color: #f1f5f9;
          color: #475569;
          padding: 1px 5px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 750;
        }

        .history-item-name-text {
          color: #334155;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .history-item-price-val {
          color: #1e293b;
          font-weight: 700;
        }

        .history-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #f8fafc;
          padding: 0.75rem 1rem;
          border-radius: 16px;
          border: 1px solid #f1f5f9;
        }

        .payment-method-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #475569;
        }

        .order-total-block {
          text-align: right;
        }

        .order-total-title {
          font-size: 0.7rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          display: block;
        }

        .order-total-value {
          font-size: 1.1rem;
          font-weight: 850;
          color: #0f766e;
        }

        .order-time-stamp {
          font-size: 0.72rem;
          color: #94a3b8;
          margin-top: 0.65rem;
          text-align: right;
          font-weight: 500;
        }

        /* Table Reservations Form Styling */
        .reservation-box {
          background-color: #ffffff;
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.03);
          border: 1px solid rgba(15, 23, 42, 0.05);
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .reservation-box {
            padding: 1.25rem;
          }
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 1.25rem;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 0.85rem;
          font-weight: 750;
          color: #475569;
        }

        .form-input {
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          border-color: #ff5722;
          box-shadow: 0 0 0 3px rgba(255, 87, 34, 0.12);
        }

        /* Interactive Table Grid Selector */
        .table-selector-section {
          margin-top: 1rem;
          margin-bottom: 1.5rem;
        }

        .table-select-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          margin-top: 8px;
        }

        @media (max-width: 768px) {
          .table-select-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }
        }

        .table-select-card {
          background-color: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 12px;
          text-align: center;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          transition: all 0.22s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .table-select-card:hover {
          background-color: #ffffff;
          border-color: #ff5722;
          transform: translateY(-2px);
        }

        .table-select-card.selected {
          background-color: #fff3f0;
          border-color: #ff5722;
          box-shadow: 0 6px 16px rgba(255, 87, 34, 0.15);
          transform: scale(1.05);
        }

        .table-select-card-num {
          font-size: 1.15rem;
          font-weight: 850;
          color: #0f172a;
        }

        .table-select-card.selected .table-select-card-num {
          color: #ff5722;
        }

        .table-select-card-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
        }

        .res-submit-btn {
          width: 100%;
          padding: 0.95rem;
          border-radius: 14px;
          border: none;
          background-color: #ff5722;
          color: white;
          font-weight: 750;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(255, 87, 34, 0.2);
          transition: all 0.2s ease;
        }

        .res-submit-btn:hover:not(:disabled) {
          background-color: #e64a19;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(255, 87, 34, 0.3);
        }

        .res-submit-btn:disabled {
          background-color: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
        }

        .res-status-banner {
          margin-top: 1rem;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 0.88rem;
          font-weight: 600;
          text-align: center;
        }

        .res-status-banner.success {
          background-color: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
        }

        .res-status-banner.error {
          background-color: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
        }

        /* Custom Time Dropdown Styling */
        .custom-dropdown-container {
          position: relative;
          width: 100%;
        }

        .custom-dropdown-trigger {
          width: 100%;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
          font-size: 0.95rem;
          font-weight: 600;
          color: #1e293b;
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.22s ease;
          outline: none;
        }

        .custom-dropdown-trigger:focus {
          border-color: #ff5722;
          box-shadow: 0 0 0 3px rgba(255, 87, 34, 0.12);
        }

        .dropdown-chevron {
          width: 16px;
          height: 16px;
          color: #64748b;
          transition: transform 0.2s ease;
        }

        .dropdown-chevron.open {
          transform: rotate(180deg);
          color: #ff5722;
        }

        .custom-dropdown-menu {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          width: 100%;
          background-color: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 16px;
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
          padding: 6px;
          animation: slideDownFade 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }

        .custom-dropdown-menu::-webkit-scrollbar {
          width: 6px;
        }
        .custom-dropdown-menu::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 99px;
        }

        @keyframes slideDownFade {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .custom-dropdown-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .custom-dropdown-item:hover {
          background-color: #fff3f0;
          color: #ff5722;
        }

        .custom-dropdown-item.active {
          background-color: #fff3f0;
          color: #ff5722;
        }

        .check-icon {
          width: 14px;
          height: 14px;
          color: #ff5722;
        }

        .footer {
          text-align: center;
          padding: 1.5rem !important;
          background-color: #0f172a;
          color: #94a3b8;
          font-size: 0.82rem !important;
        }
      `}),i.jsxs("nav",{className:"navbar",children:[i.jsx("div",{className:"brand",children:"🍽️ QuickOrder"}),i.jsxs("div",{className:"nav-desktop-links",children:[i.jsx("button",{type:"button",className:`nav-link-btn ${h==="menu"?"active":""}`,onClick:()=>y("menu"),children:"Menu"}),i.jsx("button",{type:"button",className:`nav-link-btn ${h==="reservation"?"active":""}`,onClick:()=>y("reservation"),children:"Reservasi"}),i.jsx("button",{type:"button",className:`nav-link-btn ${h==="history"?"active":""}`,onClick:sn,children:"History"})]}),i.jsx("div",{className:"nav-right",children:i.jsxs("button",{className:`cart-button ${D?"cart-bounce":""}`,onClick:()=>c(!0),children:[i.jsx("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2.5",d:"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"})}),Fr>0&&i.jsx("span",{className:"cart-badge",children:Fr})]})})]}),i.jsx("header",{className:"hero","aria-hidden":!0,children:i.jsxs("div",{style:{zIndex:1},children:[i.jsx("h1",{className:"hero-title",children:"Pesan makanan lebih cepat langsung dari meja"}),i.jsx("p",{className:"hero-subtitle",children:"Scan QR, pilih menu, kelola keranjang, dan pesan langsung ke dapur."})]})}),i.jsxs("main",{className:"main-section",children:[s&&h==="menu"&&i.jsx("div",{className:"table-banner",style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:i.jsxs("div",{children:[i.jsx("span",{className:"table-label",children:"Meja"}),i.jsx("span",{className:"table-number",children:s})]})}),!s&&h==="menu"&&i.jsxs("div",{className:"table-selector-card-container",style:{background:"white",borderRadius:"24px",padding:"2rem",boxShadow:"0 10px 30px rgba(15, 23, 42, 0.05)",border:"1px solid rgba(15, 23, 42, 0.05)",marginBottom:"2rem",textAlign:"center"},children:[i.jsx("h3",{style:{margin:"0 0 0.5rem 0",fontWeight:800,fontSize:"1.2rem",color:"#e11d48"},children:"⚠️ Meja Belum Terdeteksi"}),i.jsx("p",{style:{margin:"0",color:"#64748b",fontSize:"0.92rem",fontWeight:600,lineHeight:"1.5"},children:"Silakan pindai / scan QR Code yang ada di meja tempat Anda duduk untuk mulai menambahkan hidangan ke keranjang belanja."})]}),h==="reservation"&&i.jsxs(i.Fragment,{children:[i.jsx("h2",{className:"section-title",children:"Reservasi Tempat & Meja"}),i.jsx("div",{className:"reservation-box",children:i.jsxs("form",{onSubmit:so,children:[i.jsxs("div",{className:"form-row",children:[i.jsxs("div",{className:"form-group",children:[i.jsx("label",{className:"form-label",children:"Nama Lengkap"}),i.jsx("input",{type:"text",className:"form-input",placeholder:"Masukkan nama Anda",value:Re,onChange:v=>Be(v.target.value),required:!0})]}),i.jsxs("div",{className:"form-group",children:[i.jsx("label",{className:"form-label",children:"Nomor WhatsApp / HP"}),i.jsx("input",{type:"tel",className:"form-input",placeholder:"Contoh: 08123456789",value:ot,onChange:v=>ln(v.target.value),required:!0})]})]}),i.jsxs("div",{className:"form-row",children:[i.jsxs("div",{className:"form-group",children:[i.jsx("label",{className:"form-label",children:"Pilih Tanggal Reservasi"}),i.jsx("input",{type:"date",className:"form-input",value:E,onChange:v=>O(v.target.value),min:new Date().toISOString().split("T")[0],required:!0})]}),i.jsxs("div",{className:"form-group",children:[i.jsx("label",{className:"form-label",children:"Pilih Jam / Waktu"}),i.jsxs("div",{className:"custom-dropdown-container",children:[i.jsxs("button",{type:"button",className:"custom-dropdown-trigger",onClick:()=>Ze(!Ne),children:[i.jsxs("span",{children:["🕒 ",M," WIB"]}),i.jsx("svg",{className:`dropdown-chevron ${Ne?"open":""}`,fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2.5",d:"M19 9l-7 7-7-7"})})]}),Ne&&i.jsx("div",{className:"custom-dropdown-menu",children:["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"].map(v=>i.jsxs("div",{className:`custom-dropdown-item ${M===v?"active":""}`,onClick:()=>{W(v),Ze(!1)},children:[i.jsxs("span",{children:["🕒 ",v," WIB"]}),M===v&&i.jsx("svg",{className:"check-icon",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3",d:"M5 13l4 4L19 7"})})]},v))})]})]})]}),i.jsxs("div",{className:"table-selector-section",children:[i.jsx("label",{className:"form-label",children:"Pilih Meja Restoran"}),Me.length===0?i.jsx("div",{className:"res-status-banner error",style:{margin:"1rem 0",textAlign:"center"},children:"⚠️ Belum ada meja yang terdaftar untuk reservasi. Silakan hubungi admin."}):i.jsx("div",{className:"table-select-grid",children:Me.map(v=>v.table_no).filter(Boolean).sort((v,R)=>{const $=parseInt(v,10),S=parseInt(R,10);return!isNaN($)&&!isNaN(S)?$-S:String(v).localeCompare(String(R),void 0,{numeric:!0,sensitivity:"base"})}).map(v=>i.jsxs("div",{className:`table-select-card ${We===v?"selected":""}`,onClick:()=>it(v),children:[i.jsx("span",{style:{fontSize:"1.25rem"},children:"🪑"}),i.jsx("span",{className:"table-select-card-num",children:v}),i.jsx("span",{className:"table-select-card-label",children:"Meja"})]},v))})]}),i.jsx("button",{type:"submit",className:"res-submit-btn",disabled:U==null?void 0:U.loading,children:U!=null&&U.loading?"Mengirim permohonan...":"Kirim Reservasi Tempat"}),U&&!U.loading&&i.jsx("div",{className:`res-status-banner ${U.success?"success":"error"}`,children:U.message})]})})]}),h==="history"&&i.jsxs(i.Fragment,{children:[i.jsx("h2",{className:"section-title",children:"Riwayat Saya"}),i.jsxs("div",{className:"history-subtabs",children:[i.jsxs("button",{className:`subtab-button ${f==="orders"?"active":""}`,onClick:()=>g("orders"),children:["📋 Pesanan Makanan (",w.length,")"]}),i.jsxs("button",{className:`subtab-button ${f==="reservations"?"active":""}`,onClick:()=>g("reservations"),children:["🪑 Reservasi Meja (",j.length,")"]})]}),i.jsx("div",{className:"history-list-container",children:f==="orders"?w.length===0?i.jsxs("div",{className:"history-empty-state",children:[i.jsx("span",{style:{fontSize:"3rem",marginBottom:"1rem",display:"block"},children:"📋"}),i.jsx("p",{children:"Belum ada riwayat pesanan makanan."})]}):i.jsx("div",{className:"history-cards-grid",children:w.map(v=>i.jsxs("div",{className:"history-order-card",children:[i.jsxs("div",{className:"history-card-header",children:[i.jsxs("div",{className:"order-meta-info",children:[i.jsxs("span",{className:"order-id-label",children:["#",v.id]}),i.jsxs("span",{className:"order-table-badge",children:["Meja ",v.tableNo]})]}),i.jsxs("div",{className:"order-header-actions",children:[i.jsx("span",{className:`order-status-badge status-${v.status||"pending"}`,children:v.status==="pending"?"Menunggu Konfirmasi":v.status==="confirmed"?"Dikonfirmasi":v.status==="ready"?"Makanan Siap":v.status==="completed"?"Selesai":v.status}),i.jsx("button",{className:"order-delete-btn",onClick:()=>oo(v.id),title:"Hapus riwayat pesanan",children:i.jsx("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2.5",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]})]}),i.jsxs("div",{className:"history-card-body",children:[i.jsx("div",{className:"history-items-title",children:"Detail Item"}),i.jsx("div",{className:"history-items-list",children:v.items.map((R,$)=>i.jsxs("div",{className:"history-item-row-detail",children:[i.jsxs("div",{className:"history-item-left",children:[i.jsxs("span",{className:"history-item-qty-badge",children:[R.qty,"x"]}),i.jsx("span",{className:"history-item-name-text",children:R.name})]}),i.jsxs("span",{className:"history-item-price-val",children:["Rp ",Number(R.qty*parseFloat(R.price||0)).toLocaleString("id-ID")]})]},`${v.id}-${R.id}-${$}`))})]}),i.jsxs("div",{className:"history-card-footer",children:[i.jsxs("div",{className:"payment-method-pill",children:[i.jsx("span",{className:"payment-method-icon",children:v.paymentMethod==="Dana"?"👛":v.paymentMethod==="Ovo"?"💜":v.paymentMethod==="GoPay"?"📱":"💵"}),i.jsx("span",{className:"payment-method-name",children:v.paymentMethod||"Dana"})]}),i.jsxs("div",{className:"order-total-block",children:[i.jsx("span",{className:"order-total-title",children:"Total"}),i.jsxs("span",{className:"order-total-value",children:["Rp ",Number(v.total).toLocaleString("id-ID")]})]})]}),i.jsxs("div",{className:"order-time-stamp",children:["Dibuat pada: ",new Date(v.createdAt).toLocaleString("id-ID")]})]},v.id))}):j.length===0?i.jsxs("div",{className:"history-empty-state",children:[i.jsx("span",{style:{fontSize:"3rem",marginBottom:"1rem",display:"block"},children:"🪑"}),i.jsx("p",{children:"Belum ada riwayat booking meja."})]}):i.jsx("div",{className:"history-cards-grid",children:j.map(v=>i.jsxs("div",{className:"history-order-card",style:{borderLeft:"5px solid #ff5722"},children:[i.jsxs("div",{className:"history-card-header",children:[i.jsx("div",{className:"order-meta-info",children:i.jsxs("span",{className:"order-id-label",style:{color:"#ff5722"},children:["Meja ",v.table_no]})}),i.jsxs("div",{className:"order-header-actions",children:[i.jsx("span",{className:`order-status-badge status-${v.status||"pending"}`,children:v.status==="pending"?"Menunggu Konfirmasi":v.status==="confirmed"?"Dikonfirmasi":v.status==="cancelled"?"Dibatalkan":v.status}),i.jsx("button",{className:"order-delete-btn",onClick:()=>io(v.id),title:"Batalkan reservasi",children:i.jsx("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2.5",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]})]}),i.jsxs("div",{className:"history-card-body",children:[i.jsx("div",{className:"history-items-title",children:"Detail Reservasi"}),i.jsxs("div",{className:"history-items-list",style:{gap:"8px"},children:[i.jsxs("div",{className:"history-item-row-detail",children:[i.jsx("span",{style:{color:"#64748b",fontWeight:600},children:"Atas Nama"}),i.jsx("span",{style:{fontWeight:700,color:"#334155"},children:v.name})]}),i.jsxs("div",{className:"history-item-row-detail",children:[i.jsx("span",{style:{color:"#64748b",fontWeight:600},children:"Tanggal"}),i.jsx("span",{style:{fontWeight:750,color:"#1e293b"},children:v.reservation_date})]}),i.jsxs("div",{className:"history-item-row-detail",children:[i.jsx("span",{style:{color:"#64748b",fontWeight:600},children:"Waktu / Jam"}),i.jsxs("span",{style:{fontWeight:750,color:"#1e293b"},children:[v.reservation_time," WIB"]})]}),i.jsxs("div",{className:"history-item-row-detail",children:[i.jsx("span",{style:{color:"#64748b",fontWeight:600},children:"No. WhatsApp"}),i.jsx("span",{style:{fontWeight:700,color:"#334155"},children:v.phone})]})]})]}),i.jsxs("div",{className:"order-time-stamp",children:["Diajukan: ",new Date(v.createdAt).toLocaleString("id-ID")]})]},v.id))})})]}),h==="menu"&&i.jsxs(i.Fragment,{children:[i.jsx("h2",{className:"section-title",children:"Our Menu"}),n?i.jsx("p",{style:{textAlign:"center",color:"#64748b"},children:"Memuat menu..."}):i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"tabs-container",role:"tablist","aria-label":"Kategori menu",children:["Semua",...Array.from(new Set(e.map(v=>v.category_name).filter(Boolean)))].map(v=>i.jsx("button",{onClick:()=>o(v),"aria-pressed":l===v,className:`tab-button ${l===v?"tab-active":""}`,children:v},v))}),i.jsx("div",{className:"menu-grid",children:e.length>0?e.filter(v=>l==="Semua"||v.category_name===l).map(v=>{const R=ao(v.id);return i.jsxs("div",{className:"menu-card",children:[v.image_url&&i.jsx("img",{src:v.image_url,alt:v.name,className:"menu-image"}),i.jsx("div",{className:"card-header",children:i.jsxs("span",{className:"price-tag",children:["Rp ",Number(v.price).toLocaleString("id-ID")]})}),i.jsx("h3",{className:"menu-name",title:v.name,children:v.name}),R===0?i.jsx("button",{className:"order-btn",onClick:$=>uo($,v),children:"Tambah ke Keranjang"}):i.jsxs("div",{className:"qty-selector",children:[i.jsx("button",{onClick:()=>Bt(v.id),className:"qty-btn qty-btn-minus",children:"-"}),i.jsx("span",{className:"qty-text",children:R}),i.jsx("button",{onClick:$=>co($,v.id),className:"qty-btn qty-btn-plus",children:"+"})]})]},v.id)}):i.jsx("p",{style:{textAlign:"center",color:"#64748b",gridColumn:"1 / -1"},children:"Menu kosong. Silakan cek lagi nanti."})})]})]})]}),i.jsx("footer",{className:"footer",children:i.jsx("p",{children:"© 2026 Quick Order Restaurant. All Rights Reserved."})}),i.jsxs("div",{className:"mobile-bottom-nav",children:[i.jsxs("button",{onClick:()=>y("menu"),className:`mobile-nav-item ${h==="menu"?"active":""}`,children:[i.jsx("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2.5",d:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"})}),i.jsx("span",{children:"Menu"})]}),i.jsxs("button",{onClick:()=>y("reservation"),className:`mobile-nav-item ${h==="reservation"?"active":""}`,children:[i.jsx("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2.5",d:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"})}),i.jsx("span",{children:"Reservasi"})]}),i.jsxs("button",{onClick:sn,className:`mobile-nav-item ${h==="history"?"active":""}`,children:[i.jsx("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2.5",d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"})}),i.jsx("span",{children:"History"})]})]}),T.map(v=>i.jsx("div",{className:"flying-particle",style:{left:v.x,top:v.y}},v.id)),i.jsx(Xm,{isOpen:u,cartItems:Qe,tableNumber:s,onClose:()=>c(!1),onRemove:lo,onIncrease:Dr,onDecrease:Bt,onCheckout:fo,checkoutState:p}),i.jsx(Jm,{isOpen:k,onClose:()=>C(!1),cartItems:Qe,total:Qe.reduce((v,R)=>v+R.qty*parseFloat(R.price||0),0),tableNumber:s,onConfirm:po,loading:p==null?void 0:p.loading}),i.jsx(Zm,{isOpen:z,onClose:()=>P(!1)})]})},th=()=>{const[e,t]=x.useState(""),[n,r]=x.useState(""),l=ro();x.useEffect(()=>{localStorage.getItem("adminUser")&&l("/admin/dashboard")},[l]);const o=async s=>{s.preventDefault();try{const c=await(await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:n})})).json();c.success?(localStorage.setItem("adminUser",JSON.stringify(c.user)),alert("Login success"),l("/admin/dashboard")):alert(c.message||"Login failed")}catch{alert("Network error")}};return i.jsx("div",{style:Se.container,children:i.jsxs("div",{style:Se.card,children:[i.jsx("h2",{style:Se.title,children:"Admin Login"}),i.jsxs("form",{onSubmit:o,style:Se.form,children:[i.jsxs("div",{style:Se.inputGroup,children:[i.jsx("label",{style:Se.label,children:"Username"}),i.jsx("input",{type:"text",value:e,onChange:s=>t(s.target.value),style:Se.input,required:!0})]}),i.jsxs("div",{style:Se.inputGroup,children:[i.jsx("label",{style:Se.label,children:"Password"}),i.jsx("input",{type:"password",value:n,onChange:s=>r(s.target.value),style:Se.input,required:!0})]}),i.jsx("button",{type:"submit",style:Se.button,children:"Login"})]}),i.jsxs("p",{style:Se.footerText,children:["Don't have an account? ",i.jsx("span",{style:Se.link,onClick:()=>l("/admin/register"),children:"Register"})]})]})})},Se={container:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",backgroundColor:"#f5f5f5"},card:{padding:"2rem",backgroundColor:"white",borderRadius:"8px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",width:"100%",maxWidth:"400px"},title:{textAlign:"center",marginBottom:"1.5rem",color:"#333"},form:{display:"flex",flexDirection:"column"},inputGroup:{marginBottom:"1rem"},label:{display:"block",marginBottom:"0.5rem",color:"#666"},input:{width:"100%",padding:"0.75rem",border:"1px solid #ddd",borderRadius:"4px",fontSize:"1rem",boxSizing:"border-box"},button:{padding:"0.75rem",backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"4px",fontSize:"1rem",cursor:"pointer",marginTop:"1rem"},footerText:{textAlign:"center",marginTop:"1rem",color:"#666"},link:{color:"#007bff",cursor:"pointer",textDecoration:"underline"}},nh=()=>{const[e,t]=x.useState(""),[n,r]=x.useState(""),l=ro();x.useEffect(()=>{localStorage.getItem("adminUser")&&l("/admin/dashboard")},[l]);const o=async s=>{s.preventDefault();try{const c=await(await fetch("/api/admin/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:n})})).json();c.success?(alert("Registration successful! Please login."),l("/admin/login")):alert(c.message||"Registration failed")}catch{alert("Network error")}};return i.jsx("div",{style:Ce.container,children:i.jsxs("div",{style:Ce.card,children:[i.jsx("h2",{style:Ce.title,children:"Admin Register"}),i.jsxs("form",{onSubmit:o,style:Ce.form,children:[i.jsxs("div",{style:Ce.inputGroup,children:[i.jsx("label",{style:Ce.label,children:"Username"}),i.jsx("input",{type:"text",value:e,onChange:s=>t(s.target.value),style:Ce.input,required:!0})]}),i.jsxs("div",{style:Ce.inputGroup,children:[i.jsx("label",{style:Ce.label,children:"Password"}),i.jsx("input",{type:"password",value:n,onChange:s=>r(s.target.value),style:Ce.input,required:!0})]}),i.jsx("button",{type:"submit",style:Ce.button,children:"Register"})]}),i.jsxs("p",{style:Ce.footerText,children:["Already have an account? ",i.jsx("span",{style:Ce.link,onClick:()=>l("/admin/login"),children:"Login"})]})]})})},Ce={container:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",backgroundColor:"#f5f5f5"},card:{padding:"2rem",backgroundColor:"white",borderRadius:"8px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",width:"100%",maxWidth:"400px"},title:{textAlign:"center",marginBottom:"1.5rem",color:"#333"},form:{display:"flex",flexDirection:"column"},inputGroup:{marginBottom:"1rem"},label:{display:"block",marginBottom:"0.5rem",color:"#666"},input:{width:"100%",padding:"0.75rem",border:"1px solid #ddd",borderRadius:"4px",fontSize:"1rem",boxSizing:"border-box"},button:{padding:"0.75rem",backgroundColor:"#28a745",color:"white",border:"none",borderRadius:"4px",fontSize:"1rem",cursor:"pointer",marginTop:"1rem"},footerText:{textAlign:"center",marginTop:"1rem",color:"#666"},link:{color:"#007bff",cursor:"pointer",textDecoration:"underline"}},rh=({activeTab:e,setActiveTab:t,pendingOrdersCount:n=0,pendingReservationsCount:r=0})=>i.jsxs("aside",{className:"w-64 bg-white border-r border-slate-200 flex flex-col pt-4 shadow-sm",children:[i.jsx("button",{onClick:()=>t("products"),className:`px-8 py-4 text-left transition-all font-medium cursor-pointer ${e==="products"?"bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600":"text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"}`,children:"Manage Products"}),i.jsx("button",{onClick:()=>t("categories"),className:`px-8 py-4 text-left transition-all font-medium cursor-pointer ${e==="categories"?"bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600":"text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"}`,children:"Manage Categories"}),i.jsxs("button",{onClick:()=>t("orders"),className:`px-8 py-4 text-left transition-all font-medium cursor-pointer flex items-center justify-between ${e==="orders"?"bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600":"text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"}`,children:[i.jsx("span",{children:"Orders"}),n>0&&i.jsx("span",{className:"bg-rose-500 text-white text-[11px] px-2 py-0.5 rounded-full font-bold animate-pulse",children:n})]}),i.jsx("button",{onClick:()=>t("qrcodes"),className:`px-8 py-4 text-left transition-all font-medium cursor-pointer ${e==="qrcodes"?"bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600":"text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"}`,children:"QR Codes (Tables)"}),i.jsxs("button",{onClick:()=>t("reservations"),className:`px-8 py-4 text-left transition-all font-medium cursor-pointer flex items-center justify-between ${e==="reservations"?"bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600":"text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"}`,children:[i.jsx("span",{children:"Reservasi Meja"}),r>0&&i.jsx("span",{className:"bg-indigo-600 text-white text-[11px] px-2 py-0.5 rounded-full font-bold animate-pulse",children:r})]})]}),lh=({categories:e,newCategoryName:t,setNewCategoryName:n,handleAddCategory:r,onOpenEditModal:l,onOpenDeleteModal:o})=>i.jsxs("div",{className:"grid gap-8 w-full lg:grid-cols-[380px_1fr]",children:[i.jsx("div",{className:"flex-1 min-w-[300px] max-w-[400px]",children:i.jsxs("div",{className:"bg-white p-6 rounded-xl shadow-sm border border-slate-100",children:[i.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"Add New Category"}),i.jsxs("form",{onSubmit:r,className:"flex flex-col gap-4",children:[i.jsx("input",{type:"text",placeholder:"Category Name",value:t,onChange:s=>n(s.target.value),required:!0,className:"w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"}),i.jsx("button",{type:"submit",className:"w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer",children:"Add Category"})]})]})}),i.jsx("div",{className:"flex-1",children:i.jsxs("div",{className:"bg-white p-6 rounded-xl shadow-sm border border-slate-100",children:[i.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"Category List"}),i.jsx("div",{className:"overflow-x-auto",children:i.jsxs("table",{className:"w-full text-left border-collapse",children:[i.jsx("thead",{children:i.jsxs("tr",{className:"bg-slate-50 border-b border-slate-200 text-slate-600 text-sm",children:[i.jsx("th",{className:"py-3 px-6 font-semibold w-24",children:"ID"}),i.jsx("th",{className:"py-3 px-6 font-semibold",children:"Name"}),i.jsx("th",{className:"py-3 px-6 font-semibold w-40 text-right",children:"Actions"})]})}),i.jsxs("tbody",{children:[e.map(s=>i.jsxs("tr",{className:"border-b border-slate-100 hover:bg-slate-50 transition-colors",children:[i.jsxs("td",{className:"py-3 px-6 font-medium text-slate-500",children:["#",s.id]}),i.jsx("td",{className:"py-3 px-6 font-semibold text-slate-800",children:s.name}),i.jsx("td",{className:"py-3 px-6",children:i.jsxs("div",{className:"flex justify-end gap-2",children:[i.jsx("button",{onClick:()=>l(s),className:"text-amber-500 hover:text-amber-600 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer",children:"Edit"}),i.jsx("button",{onClick:()=>o(s),className:"text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer",children:"Delete"})]})})]},s.id)),e.length===0&&i.jsx("tr",{children:i.jsx("td",{colSpan:3,className:"py-8 text-center text-slate-500",children:"No categories found. Add one to get started!"})})]})]})})]})})]}),oh=({products:e,categories:t,formData:n,setFormData:r,imageFile:l,setImageFile:o,handleAddProduct:s,onOpenEditModal:a,onOpenDeleteModal:u,handleInputChange:c})=>i.jsxs("div",{className:"grid gap-8 w-full lg:grid-cols-[380px_1fr]",children:[i.jsx("div",{className:"flex-1 min-w-[300px] max-w-[400px]",children:i.jsxs("div",{className:"bg-white p-6 rounded-xl shadow-sm border border-slate-100",children:[i.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"Add New Product"}),i.jsxs("form",{onSubmit:s,className:"flex flex-col gap-4",children:[i.jsx("input",{type:"text",name:"name",placeholder:"Product Name",value:n.name,onChange:c,required:!0,className:"w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"}),i.jsx("input",{type:"number",name:"price",placeholder:"Price",step:"0.01",value:n.price,onChange:c,required:!0,className:"w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"}),i.jsxs("select",{name:"category_id",value:n.category_id,onChange:c,required:!0,className:"w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white",children:[i.jsx("option",{value:"",className:"text-slate-500",children:"Select Category"}),t.map(p=>i.jsx("option",{value:p.id,children:p.name},p.id))]}),i.jsx("input",{type:"file",name:"image",accept:"image/*",onChange:p=>{p.target.files&&p.target.files[0]?o(p.target.files[0]):o(null)},className:"w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer file:cursor-pointer"}),i.jsx("button",{type:"submit",className:"w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer",children:"Add Product"})]})]})}),i.jsx("div",{className:"flex-1",children:i.jsxs("div",{className:"bg-white p-6 rounded-xl shadow-sm border border-slate-100",children:[i.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"Product List"}),i.jsx("div",{className:"overflow-x-auto",children:i.jsxs("table",{className:"w-full text-left border-collapse",children:[i.jsx("thead",{children:i.jsxs("tr",{className:"bg-slate-50 border-b border-slate-200 text-slate-600 text-sm",children:[i.jsx("th",{className:"py-3 px-4 font-semibold w-20",children:"Image"}),i.jsx("th",{className:"py-3 px-4 font-semibold",children:"Name"}),i.jsx("th",{className:"py-3 px-4 font-semibold w-32",children:"Category"}),i.jsx("th",{className:"py-3 px-4 font-semibold w-32",children:"Price"}),i.jsx("th",{className:"py-3 px-4 font-semibold w-40 text-right",children:"Actions"})]})}),i.jsxs("tbody",{children:[e.map(p=>i.jsxs("tr",{className:"border-b border-slate-100 hover:bg-slate-50 transition-colors",children:[i.jsx("td",{className:"py-3 px-4",children:p.image_url?i.jsx("img",{src:p.image_url,alt:p.name,className:"w-12 h-12 object-cover rounded-lg shadow-sm"}):i.jsx("div",{className:"w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center text-xs text-slate-500",children:"No Img"})}),i.jsx("td",{className:"py-3 px-4 font-semibold text-slate-800",children:p.name}),i.jsx("td",{className:"py-3 px-4",children:i.jsx("span",{className:"bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-semibold",children:p.category_name||"Uncategorized"})}),i.jsxs("td",{className:"py-3 px-4 font-bold text-emerald-600",children:["Rp ",Number(p.price).toLocaleString("id-ID")]}),i.jsx("td",{className:"py-3 px-4",children:i.jsxs("div",{className:"flex justify-end gap-2",children:[i.jsx("button",{onClick:()=>a(p),className:"text-amber-500 hover:text-amber-600 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer",children:"Edit"}),i.jsx("button",{onClick:()=>u(p),className:"text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer",children:"Delete"})]})})]},p.id)),e.length===0&&i.jsx("tr",{children:i.jsx("td",{colSpan:5,className:"py-8 text-center text-slate-500",children:"No products found. Add one to get started!"})})]})]})})]})})]}),ih=({orders:e,updateOrderStatus:t,onOpenDeleteModal:n})=>{const r=Array.isArray(e)?e:[];return i.jsxs("div",{className:"w-full",children:[i.jsxs("div",{className:"bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8",children:[i.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"Order Summary"}),i.jsxs("div",{className:"grid gap-4 sm:grid-cols-3",children:[i.jsxs("div",{className:"rounded-3xl border border-slate-200 p-5 bg-slate-50",children:[i.jsx("div",{className:"text-xs uppercase tracking-[0.2em] text-slate-500 mb-3",children:"Total Orders"}),i.jsx("div",{className:"text-3xl font-semibold text-slate-900",children:r.length})]}),i.jsxs("div",{className:"rounded-3xl border border-slate-200 p-5 bg-slate-50",children:[i.jsx("div",{className:"text-xs uppercase tracking-[0.2em] text-slate-500 mb-3",children:"Meja Aktif"}),i.jsx("div",{className:"text-3xl font-semibold text-slate-900",children:[...new Set(r.map(l=>l.table_no))].length})]}),i.jsxs("div",{className:"rounded-3xl border border-slate-200 p-5 bg-slate-50",children:[i.jsx("div",{className:"text-xs uppercase tracking-[0.2em] text-slate-500 mb-3",children:"Pending"}),i.jsx("div",{className:"text-3xl font-semibold text-slate-900",children:r.filter(l=>l.status==="pending").length})]})]})]}),i.jsxs("div",{className:"bg-white p-6 rounded-xl shadow-sm border border-slate-100",children:[i.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"Recent Orders"}),r.length===0?i.jsx("p",{className:"text-slate-500",children:"Tidak ada pesanan saat ini."}):i.jsx("div",{className:"overflow-x-auto",children:i.jsxs("table",{className:"w-full text-left border-collapse",children:[i.jsx("thead",{children:i.jsxs("tr",{className:"bg-slate-50 border-b border-slate-200 text-slate-600 text-sm",children:[i.jsx("th",{className:"py-3 px-4 font-semibold",children:"Order ID"}),i.jsx("th",{className:"py-3 px-4 font-semibold",children:"Meja"}),i.jsx("th",{className:"py-3 px-4 font-semibold",children:"Items"}),i.jsx("th",{className:"py-3 px-4 font-semibold",children:"Total"}),i.jsx("th",{className:"py-3 px-4 font-semibold",children:"Status"}),i.jsx("th",{className:"py-3 px-4 font-semibold text-right",children:"Tindakan"}),i.jsx("th",{className:"py-3 px-4 font-semibold text-right",children:"Waktu"})]})}),i.jsx("tbody",{children:r.map(l=>i.jsxs("tr",{className:"border-b border-slate-100 hover:bg-slate-50 transition-colors",children:[i.jsx("td",{className:"py-3 px-4 font-medium text-slate-800",children:l.id}),i.jsx("td",{className:"py-3 px-4 font-semibold",children:l.table_no}),i.jsx("td",{className:"py-3 px-4",children:i.jsx("div",{className:"space-y-1 text-sm text-slate-700",children:(l.items||[]).map(o=>i.jsxs("div",{className:"flex justify-between gap-3",children:[i.jsxs("span",{children:[o.qty,"x ",o.name]}),i.jsxs("span",{className:"text-slate-500",children:["Rp ",Number(o.price).toLocaleString("id-ID")]})]},`${l.id}-${o.menu_id}`))})}),i.jsxs("td",{className:"py-3 px-4 font-bold text-emerald-600",children:["Rp ",Number(l.total_price).toLocaleString("id-ID")]}),i.jsx("td",{className:"py-3 px-4",children:i.jsx("span",{className:`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${l.status==="pending"?"bg-amber-100 text-amber-700":l.status==="confirmed"?"bg-emerald-100 text-emerald-700":l.status==="ready"?"bg-sky-100 text-sky-700":"bg-slate-100 text-slate-700"}`,children:l.status==="pending"?"Pending":l.status==="confirmed"?"Dikonfirmasi":l.status==="ready"?"Makanan Siap":l.status==="completed"?"Selesai":l.status})}),i.jsx("td",{className:"py-3 px-4",children:i.jsxs("div",{className:"flex justify-end gap-2 items-center",children:[l.status==="pending"&&i.jsx("button",{onClick:()=>t(l.id,"confirmed"),className:"bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer",children:"Konfirmasi"}),l.status==="confirmed"&&i.jsx("button",{onClick:()=>t(l.id,"ready"),className:"bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer",children:"Makanan Siap"}),l.status==="ready"&&i.jsx("button",{onClick:()=>t(l.id,"completed"),className:"bg-slate-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-slate-700 transition-colors cursor-pointer",children:"Selesai"}),l.status==="completed"&&i.jsx("span",{className:"text-slate-500 text-xs font-medium mr-2",children:"Selesai"}),i.jsx("button",{onClick:()=>n(l),className:"text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer",children:"Delete"})]})}),i.jsx("td",{className:"py-3 px-4 text-slate-500 text-sm text-right",children:new Date(l.created_at).toLocaleString()})]},l.id))})]})})]})]})},sh=({tableInput:e,setTableInput:t,qrItems:n,setQrItems:r,qrError:l,setQrError:o,qrcodes:s,fetchQrcodes:a,onOpenDeleteModal:u})=>i.jsx("div",{className:"w-full",children:i.jsxs("div",{className:"bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8",children:[i.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"Generate QR Codes for Tables"}),i.jsxs("p",{className:"text-sm text-slate-500 mb-4",children:["Masukkan meja seperti ",i.jsx("strong",{children:"1,2,3"})," atau rentang ",i.jsx("strong",{children:"1-5"}),". QR akan menautkan pelanggan ke frontend dengan parameter ",i.jsx("code",{children:"?table="}),"."]}),i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-[2.2fr_0.8fr] gap-3 mb-4",children:[i.jsx("input",{type:"text",value:e,onChange:c=>t(c.target.value),placeholder:"Contoh: 1,2,3 atau 1-5",className:"px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"}),i.jsx("button",{onClick:async()=>{if(e.trim()){o(null);try{const c=new Set,p=e.split(",").map(h=>h.trim()).filter(Boolean);for(const h of p)if(/^\d+-\d+$/.test(h)){const[y,w]=h.split("-").map(Number);if(y>w)throw new Error("Rentang meja harus naik, misal 1-5");for(let b=y;b<=w;b+=1)c.add(String(b))}else c.add(h);const d=h=>h;for(const h of Array.from(c)){const y=await fetch(d(`/api/qrcode/${encodeURIComponent(h)}`));if(!y.ok){const w=await y.json().catch(()=>({}));throw new Error(w.error||`Generate QR gagal untuk meja ${h}`)}}t(""),a()}catch(c){console.error(c),o(c.message||"Gagal membuat QR code.")}}},className:"bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg cursor-pointer",children:"Generate"})]}),l&&i.jsx("div",{className:"text-sm text-red-600 mb-4",children:l}),i.jsxs("div",{className:"mt-10",children:[i.jsx("h4",{className:"text-base font-semibold text-slate-800 mb-6",children:"Stored QR Codes"}),s.length>0?i.jsx("div",{className:"grid gap-6 xl:grid-cols-3 lg:grid-cols-2",children:s.map(c=>i.jsxs("div",{className:"bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm w-full",children:[i.jsxs("div",{className:"mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",children:[i.jsxs("div",{children:[i.jsxs("div",{className:"text-base font-semibold text-slate-800",children:["Meja ",c.table_no]}),i.jsx("div",{className:"text-xs text-slate-500",children:new Date(c.created_at).toLocaleString()})]}),i.jsx("a",{href:c.qr_image_path,target:"_blank",rel:"noreferrer",className:"text-xs text-indigo-600 hover:underline cursor-pointer font-semibold",children:"View"})]}),i.jsx("div",{className:"overflow-hidden rounded-[24px] bg-slate-100 p-4 flex justify-center",children:i.jsx("img",{src:c.qr_image_path,alt:`Saved QR meja ${c.table_no}`,className:"max-w-full max-h-[260px] object-contain"})}),i.jsxs("div",{className:"mt-4 flex flex-col gap-2",children:[i.jsxs("div",{className:"flex gap-2",children:[i.jsx("a",{href:`${window.location.origin}/?table=${encodeURIComponent(c.table_no)}`,target:"_blank",rel:"noreferrer",className:"flex-1 inline-flex justify-center items-center rounded-full border border-slate-300 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-center",children:"Lihat Meja"}),i.jsx("a",{href:c.qr_image_path,download:`qr_table_${c.table_no}.png`,className:"flex-1 inline-flex justify-center items-center rounded-full bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors cursor-pointer text-center",children:"Download"})]}),i.jsx("button",{onClick:()=>u(c),className:"w-full text-center rounded-full bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 py-2 text-sm font-semibold transition-colors cursor-pointer",children:"Delete QR Meja"})]})]},c.id))}):i.jsx("div",{className:"text-sm text-slate-400",children:"Belum ada QR code tersimpan di database."})]})]})}),ah=({reservations:e,updateReservationStatus:t,onDeleteReservation:n})=>{const[r,l]=x.useState("all"),o=Array.isArray(e)?e:[],s=o.filter(d=>r==="all"?!0:d.status===r),a=o.length,u=o.filter(d=>d.status==="pending").length,c=o.filter(d=>d.status==="confirmed").length,p=o.filter(d=>d.status==="cancelled").length;return i.jsxs("div",{className:"w-full",children:[i.jsxs("div",{className:"bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8",children:[i.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"Summary Reservasi"}),i.jsxs("div",{className:"grid gap-4 sm:grid-cols-4",children:[i.jsxs("div",{className:"rounded-3xl border border-slate-200 p-5 bg-slate-50",children:[i.jsx("div",{className:"text-xs uppercase tracking-[0.2em] text-slate-500 mb-3",children:"Total Reservasi"}),i.jsx("div",{className:"text-3xl font-semibold text-slate-900",children:a})]}),i.jsxs("div",{className:"rounded-3xl border border-slate-200 p-5 bg-amber-50/60 border-amber-200",children:[i.jsx("div",{className:"text-xs uppercase tracking-[0.2em] text-amber-600 mb-3",children:"Pending"}),i.jsx("div",{className:"text-3xl font-semibold text-amber-700",children:u})]}),i.jsxs("div",{className:"rounded-3xl border border-slate-200 p-5 bg-sky-50/60 border-sky-200",children:[i.jsx("div",{className:"text-xs uppercase tracking-[0.2em] text-sky-600 mb-3",children:"Dikonfirmasi"}),i.jsx("div",{className:"text-3xl font-semibold text-sky-700",children:c})]}),i.jsxs("div",{className:"rounded-3xl border border-slate-200 p-5 bg-rose-50/60 border-rose-200",children:[i.jsx("div",{className:"text-xs uppercase tracking-[0.2em] text-rose-600 mb-3",children:"Dibatalkan"}),i.jsx("div",{className:"text-3xl font-semibold text-rose-700",children:p})]})]})]}),i.jsxs("div",{className:"bg-white p-6 rounded-xl shadow-sm border border-slate-100",children:[i.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6",children:[i.jsx("h3",{className:"text-lg font-semibold text-slate-800",children:"Daftar Reservasi Tempat"}),i.jsx("div",{className:"flex bg-slate-100 p-1 rounded-xl",children:["all","pending","confirmed","cancelled"].map(d=>i.jsx("button",{onClick:()=>l(d),className:`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${r===d?"bg-white text-slate-800 shadow-sm":"text-slate-500 hover:text-slate-800"}`,children:d==="all"?"Semua":d},d))})]}),s.length===0?i.jsx("p",{className:"text-slate-500 text-center py-8",children:"Tidak ada reservasi dengan status ini saat ini."}):i.jsx("div",{className:"overflow-x-auto",children:i.jsxs("table",{className:"w-full text-left border-collapse",children:[i.jsx("thead",{children:i.jsxs("tr",{className:"bg-slate-50 border-b border-slate-200 text-slate-600 text-sm",children:[i.jsx("th",{className:"py-3 px-4 font-semibold",children:"ID"}),i.jsx("th",{className:"py-3 px-4 font-semibold",children:"Nama"}),i.jsx("th",{className:"py-3 px-4 font-semibold",children:"WhatsApp"}),i.jsx("th",{className:"py-3 px-4 font-semibold",children:"No Meja"}),i.jsx("th",{className:"py-3 px-4 font-semibold",children:"Tanggal"}),i.jsx("th",{className:"py-3 px-4 font-semibold",children:"Jam"}),i.jsx("th",{className:"py-3 px-4 font-semibold",children:"Status"}),i.jsx("th",{className:"py-3 px-4 font-semibold text-right",children:"Tindakan"})]})}),i.jsx("tbody",{children:s.map(d=>i.jsxs("tr",{className:"border-b border-slate-100 hover:bg-slate-50 transition-colors",children:[i.jsxs("td",{className:"py-3 px-4 font-semibold text-slate-500",children:["#",d.id]}),i.jsx("td",{className:"py-3 px-4 font-bold text-slate-800",children:d.name}),i.jsx("td",{className:"py-3 px-4",children:i.jsx("a",{href:`https://wa.me/${d.phone.replace(/[^0-9]/g,"")}`,target:"_blank",rel:"noreferrer",className:"text-indigo-600 hover:underline font-medium",children:d.phone})}),i.jsx("td",{className:"py-3 px-4 font-bold text-slate-900",children:i.jsxs("span",{className:"bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm",children:["Meja ",d.table_no]})}),i.jsx("td",{className:"py-3 px-4 text-slate-700 font-medium",children:d.reservation_date}),i.jsxs("td",{className:"py-3 px-4 text-slate-700 font-bold",children:[d.reservation_time," WIB"]}),i.jsx("td",{className:"py-3 px-4",children:i.jsx("span",{className:`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${d.status==="pending"?"bg-amber-100 text-amber-700":d.status==="confirmed"?"bg-sky-100 text-sky-700":"bg-rose-100 text-rose-700"}`,children:d.status})}),i.jsx("td",{className:"py-3 px-4",children:i.jsxs("div",{className:"flex justify-end gap-2 items-center",children:[d.status==="pending"&&i.jsxs(i.Fragment,{children:[i.jsx("button",{onClick:()=>t(d.id,"confirmed"),className:"bg-indigo-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors cursor-pointer",children:"✓ Konfirmasi"}),i.jsx("button",{onClick:()=>t(d.id,"cancelled"),className:"bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-slate-300 transition-colors cursor-pointer",children:"✕ Batal"})]}),d.status==="confirmed"&&i.jsx("button",{onClick:()=>t(d.id,"cancelled"),className:"bg-rose-100 text-rose-700 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-rose-200 transition-colors cursor-pointer",children:"✕ Batalkan"}),d.status==="cancelled"&&i.jsx("button",{onClick:()=>t(d.id,"confirmed"),className:"bg-sky-100 text-sky-700 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-sky-200 transition-colors cursor-pointer",children:"✓ Aktifkan Kembali"}),i.jsx("button",{onClick:()=>n(d.id),className:"bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors cursor-pointer ml-1",title:"Hapus Reservasi",children:i.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2.5",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]})})]},d.id))})]})})]})]})},uh=({isOpen:e,onClose:t,product:n,categories:r,onSave:l})=>{const[o,s]=x.useState(""),[a,u]=x.useState(""),[c,p]=x.useState(""),[d,h]=x.useState(null),[y,w]=x.useState("");if(x.useEffect(()=>{n&&(s(n.name||""),u(n.price||""),p(n.category_id||""),w(n.image_url||""),h(null))},[n,e]),!e)return null;const b=async j=>{j.preventDefault();try{const m=new FormData;m.append("name",o),m.append("price",a),m.append("category_id",c),d?m.append("image",d):y&&m.append("image_url",y),await l(n.id,m),t()}catch(m){console.error(m)}};return i.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm",children:i.jsxs("div",{className:"bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-100 animate-zoom-in m-4",children:[i.jsxs("div",{className:"flex justify-between items-center mb-6",children:[i.jsx("h3",{className:"text-xl font-bold text-slate-800",children:"Edit Product"}),i.jsx("button",{onClick:t,className:"text-slate-400 hover:text-slate-600 cursor-pointer p-1",children:i.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})})})]}),i.jsxs("form",{onSubmit:b,className:"flex flex-col gap-4",children:[i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-semibold text-slate-600 mb-1",children:"Product Name"}),i.jsx("input",{type:"text",value:o,onChange:j=>s(j.target.value),required:!0,className:"w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"})]}),i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-semibold text-slate-600 mb-1",children:"Price"}),i.jsx("input",{type:"number",step:"0.01",value:a,onChange:j=>u(j.target.value),required:!0,className:"w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"})]}),i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-semibold text-slate-600 mb-1",children:"Category"}),i.jsxs("select",{value:c,onChange:j=>p(j.target.value),required:!0,className:"w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white",children:[i.jsx("option",{value:"",children:"Select Category"}),r.map(j=>i.jsx("option",{value:j.id,children:j.name},j.id))]})]}),i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-semibold text-slate-600 mb-1",children:"Product Image"}),i.jsx("input",{type:"file",accept:"image/*",onChange:j=>{j.target.files&&j.target.files[0]&&h(j.target.files[0])},className:"w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer file:cursor-pointer"}),y&&!d&&i.jsxs("div",{className:"mt-2 text-xs text-slate-500 flex items-center gap-2",children:[i.jsx("span",{children:"Current Image:"}),i.jsx("a",{href:y,target:"_blank",rel:"noreferrer",className:"text-indigo-600 hover:underline cursor-pointer",children:"View Current"})]})]}),i.jsxs("div",{className:"flex gap-3 mt-4",children:[i.jsx("button",{type:"button",onClick:t,className:"flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 rounded-lg transition-colors cursor-pointer",children:"Cancel"}),i.jsx("button",{type:"submit",className:"flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer",children:"Save Changes"})]})]})]})})},ch=({isOpen:e,onClose:t,product:n,onConfirm:r})=>!e||!n?null:i.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm",children:i.jsx("div",{className:"bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 animate-zoom-in m-4",children:i.jsxs("div",{className:"flex flex-col items-center text-center",children:[i.jsx("div",{className:"bg-red-50 p-3 rounded-full mb-4",children:i.jsx("svg",{className:"w-10 h-10 text-red-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})})}),i.jsx("h3",{className:"text-xl font-bold text-slate-800 mb-2",children:"Delete Product"}),i.jsxs("p",{className:"text-sm text-slate-500 mb-6",children:["Are you sure you want to delete ",i.jsx("strong",{children:n.name}),"? This action cannot be undone."]}),i.jsxs("div",{className:"flex gap-3 w-full",children:[i.jsx("button",{onClick:t,className:"flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl transition-colors cursor-pointer",children:"Cancel"}),i.jsx("button",{onClick:()=>{r(n.id),t()},className:"flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl transition-colors cursor-pointer",children:"Delete"})]})]})})}),dh=({isOpen:e,onClose:t,category:n,onSave:r})=>{const[l,o]=x.useState("");if(x.useEffect(()=>{n&&o(n.name||"")},[n,e]),!e||!n)return null;const s=a=>{a.preventDefault(),l.trim()&&(r(n.id,l),t())};return i.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm",children:i.jsxs("div",{className:"bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 animate-zoom-in m-4",children:[i.jsxs("div",{className:"flex justify-between items-center mb-6",children:[i.jsx("h3",{className:"text-xl font-bold text-slate-800",children:"Edit Category"}),i.jsx("button",{onClick:t,className:"text-slate-400 hover:text-slate-600 cursor-pointer p-1",children:i.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})})})]}),i.jsxs("form",{onSubmit:s,className:"flex flex-col gap-4",children:[i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-semibold text-slate-600 mb-1",children:"Category Name"}),i.jsx("input",{type:"text",value:l,onChange:a=>o(a.target.value),required:!0,className:"w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"})]}),i.jsxs("div",{className:"flex gap-3 mt-2",children:[i.jsx("button",{type:"button",onClick:t,className:"flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-xl transition-colors cursor-pointer",children:"Cancel"}),i.jsx("button",{type:"submit",className:"flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition-colors cursor-pointer",children:"Update"})]})]})]})})},fh=({isOpen:e,onClose:t,category:n,onConfirm:r})=>!e||!n?null:i.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm",children:i.jsx("div",{className:"bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 animate-zoom-in m-4",children:i.jsxs("div",{className:"flex flex-col items-center text-center",children:[i.jsx("div",{className:"bg-red-50 p-3 rounded-full mb-4",children:i.jsx("svg",{className:"w-10 h-10 text-red-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})})}),i.jsx("h3",{className:"text-xl font-bold text-slate-800 mb-2",children:"Delete Category"}),i.jsxs("p",{className:"text-sm text-slate-500 mb-6 font-medium",children:["Are you sure you want to delete category ",i.jsx("strong",{children:n.name}),"?",i.jsx("span",{className:"block mt-2 text-xs text-red-500 font-bold uppercase",children:"⚠️ Warning: Products under this category will lose their reference!"})]}),i.jsxs("div",{className:"flex gap-3 w-full",children:[i.jsx("button",{onClick:t,className:"flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl transition-colors cursor-pointer",children:"Cancel"}),i.jsx("button",{onClick:()=>{r(n.id),t()},className:"flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl transition-colors cursor-pointer",children:"Delete"})]})]})})}),ph=({isOpen:e,onClose:t,order:n,onConfirm:r})=>!e||!n?null:i.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm",children:i.jsx("div",{className:"bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 animate-zoom-in m-4",children:i.jsxs("div",{className:"flex flex-col items-center text-center",children:[i.jsx("div",{className:"bg-red-50 p-3 rounded-full mb-4",children:i.jsx("svg",{className:"w-10 h-10 text-red-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})}),i.jsx("h3",{className:"text-xl font-bold text-slate-800 mb-2",children:"Delete Order"}),i.jsxs("p",{className:"text-sm text-slate-500 mb-6 font-medium",children:["Are you sure you want to delete order ",i.jsx("strong",{children:n.id}),"?",i.jsxs("span",{className:"block mt-1 text-xs text-slate-400",children:["Meja ",n.table_no," • Total Rp ",Number(n.total_price).toLocaleString("id-ID")]})]}),i.jsxs("div",{className:"flex gap-3 w-full",children:[i.jsx("button",{onClick:t,className:"flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl transition-colors cursor-pointer",children:"Cancel"}),i.jsx("button",{onClick:()=>{r(n.id),t()},className:"flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl transition-colors cursor-pointer",children:"Delete"})]})]})})}),mh=({isOpen:e,onClose:t,qrcode:n,onConfirm:r})=>!e||!n?null:i.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm",children:i.jsx("div",{className:"bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 animate-zoom-in m-4",children:i.jsxs("div",{className:"flex flex-col items-center text-center",children:[i.jsx("div",{className:"bg-red-50 p-3 rounded-full mb-4",children:i.jsx("svg",{className:"w-10 h-10 text-red-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})}),i.jsx("h3",{className:"text-xl font-bold text-slate-800 mb-2",children:"Delete Table QR Code"}),i.jsxs("p",{className:"text-sm text-slate-500 mb-6 font-medium",children:["Are you sure you want to delete the QR Code for ",i.jsxs("strong",{children:["Meja ",n.table_no]}),"?"]}),i.jsxs("div",{className:"flex gap-3 w-full",children:[i.jsx("button",{onClick:t,className:"flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl transition-colors cursor-pointer",children:"Cancel"}),i.jsx("button",{onClick:()=>{r(n.id),t()},className:"flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl transition-colors cursor-pointer",children:"Delete"})]})]})})}),fe=e=>e,hh=()=>{const e=ro(),{tab:t}=_m(),[n,r]=x.useState(()=>{const S=localStorage.getItem("adminUser");return S?JSON.parse(S):null}),[l,o]=x.useState([]),[s,a]=x.useState([]),[u,c]=x.useState([]),[p,d]=x.useState([]),[h,y]=x.useState([]),[w,b]=x.useState(""),[j,m]=x.useState({name:"",price:"",category_id:""}),[f,g]=x.useState(null),[k,C]=x.useState("1"),[z,P]=x.useState(null),[T,B]=x.useState(!1),[D,ue]=x.useState(null),[Re,Be]=x.useState(!1),[ot,ln]=x.useState(null),[We,it]=x.useState(!1),[E,O]=x.useState(null),[M,W]=x.useState(!1),[U,Ve]=x.useState(null),[Me,xt]=x.useState(!1),[Ne,Ze]=x.useState(null),[Qe,Or]=x.useState(!1),[lo,Dr]=x.useState(null),Bt={produk:"products",kategori:"categories",pesanan:"orders",qrcode:"qrcodes",reservasi:"reservations"},Ir={products:"produk",categories:"kategori",orders:"pesanan",qrcodes:"qrcode",reservations:"reservasi"},[Oe,on]=x.useState(()=>t&&Bt[t]?Bt[t]:localStorage.getItem("adminActiveTab")||"products");x.useEffect(()=>{if(!n){alert("Silakan login terlebih dahulu"),e("/admin/login");return}vt(),yt(),$n(),An(),sn()},[n,e]),x.useEffect(()=>{if(!n)return;localStorage.setItem("adminActiveTab",Oe);const S=Ir[Oe];t!==S&&e(`/admin/dashboard/${S}`,{replace:!0})},[Oe,t,e,n]),x.useEffect(()=>{if(n){if(t&&Bt[t])on(Bt[t]);else if(!t){const S=Ir[Oe];e(`/admin/dashboard/${S}`,{replace:!0})}}},[t,n]);const vt=async()=>{try{const L=await(await fetch(fe("/api/menu"))).json();o(L)}catch(S){console.error(S)}},yt=async()=>{try{const L=await(await fetch(fe("/api/category"))).json();a(L)}catch(S){console.error(S)}},$n=async()=>{try{const L=await(await fetch(fe("/api/qrcodes"))).json();d(L)}catch(S){console.error(S)}},An=async()=>{try{const L=await(await fetch(fe("/api/orders"))).json();c(L)}catch(S){console.error(S)}},sn=async()=>{try{const L=await(await fetch(fe("/api/reservations"))).json();y(L)}catch(S){console.error(S)}},oo=async(S,L)=>{try{await fetch(fe(`/api/orders/${S}/status`),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:L})}),An()}catch(K){console.error(K)}},io=async(S,L)=>{try{await fetch(fe(`/api/reservations/${S}/status`),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:L})}),sn()}catch(K){console.error(K)}},so=async S=>{if(window.confirm("Apakah Anda yakin ingin menghapus data reservasi ini secara permanen dari database?"))try{await fetch(fe(`/api/reservations/${S}`),{method:"DELETE"}),sn()}catch(L){console.error(L)}},Fr=async S=>{if(S.preventDefault(),!!w)try{await fetch(fe("/api/category"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:w})}),b(""),yt()}catch(L){console.error(L)}},ao=async S=>{S.preventDefault();try{const L=new FormData;L.append("name",j.name),L.append("price",j.price),L.append("category_id",j.category_id),f&&L.append("image",f),await fetch(fe("/api/menu"),{method:"POST",body:L}),m({name:"",price:"",category_id:""}),g(null),vt()}catch(L){console.error(L)}},Ur=async(S,L)=>{try{await fetch(fe(`/api/menu/${S}`),{method:"PUT",body:L}),vt()}catch(K){console.error(K)}},uo=async(S,L)=>{try{await fetch(fe(`/api/category/${S}`),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:L})}),yt(),vt()}catch(K){console.error(K)}},co=async S=>{try{await fetch(fe(`/api/menu/${S}`),{method:"DELETE"}),vt()}catch(L){console.error(L)}},fo=async S=>{try{await fetch(fe(`/api/category/${S}`),{method:"DELETE"}),yt(),vt()}catch(L){console.error(L)}},po=async S=>{try{await fetch(fe(`/api/orders/${S}`),{method:"DELETE"}),An()}catch(L){console.error(L)}},v=async S=>{try{await fetch(fe(`/api/qrcodes/${S}`),{method:"DELETE"}),$n()}catch(L){console.error(L)}},R=()=>{localStorage.removeItem("adminUser"),r(null),e("/admin/login")},$=S=>{m({...j,[S.target.name]:S.target.value})};return n?i.jsxs("div",{className:"min-h-screen bg-slate-50 font-sans text-slate-800",children:[i.jsxs("nav",{className:"flex justify-between items-center bg-slate-900 text-white px-8 py-4 shadow-md",children:[i.jsx("h2",{className:"text-xl font-bold tracking-tight",children:"Admin Dashboard"}),i.jsxs("div",{className:"flex items-center gap-4",children:[n&&i.jsxs("span",{className:"text-slate-300 font-medium",children:["Logged in as: ",i.jsx("strong",{className:"text-white",children:n.username})]}),i.jsx("button",{onClick:R,className:"bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer",children:"Logout"})]})]}),i.jsxs("div",{className:"flex",style:{minHeight:"calc(100vh - 64px)"},children:[i.jsx(rh,{activeTab:Oe,setActiveTab:on,pendingOrdersCount:u.filter(S=>S.status==="pending").length,pendingReservationsCount:h.filter(S=>S.status==="pending").length}),i.jsxs("div",{className:"p-8 flex-1",children:[Oe==="categories"&&i.jsx(lh,{categories:s,newCategoryName:w,setNewCategoryName:b,handleAddCategory:Fr,onOpenEditModal:S=>{O(S),it(!0)},onOpenDeleteModal:S=>{Ve(S),W(!0)}}),Oe==="products"&&i.jsx(oh,{products:l,categories:s,formData:j,setFormData:m,imageFile:f,setImageFile:g,handleAddProduct:ao,onOpenEditModal:S=>{ue(S),B(!0)},onOpenDeleteModal:S=>{ln(S),Be(!0)},handleInputChange:$}),Oe==="orders"&&i.jsx(ih,{orders:u,updateOrderStatus:oo,onOpenDeleteModal:S=>{Ze(S),xt(!0)}}),Oe==="qrcodes"&&i.jsx(sh,{tableInput:k,setTableInput:C,qrError:z,setQrError:P,qrcodes:p,fetchQrcodes:$n,onOpenDeleteModal:S=>{Dr(S),Or(!0)}}),Oe==="reservations"&&i.jsx(ah,{reservations:h,updateReservationStatus:io,onDeleteReservation:so})]})]}),i.jsx(uh,{isOpen:T,onClose:()=>B(!1),product:D,categories:s,onSave:Ur}),i.jsx(ch,{isOpen:Re,onClose:()=>Be(!1),product:ot,onConfirm:co}),i.jsx(dh,{isOpen:We,onClose:()=>it(!1),category:E,onSave:uo}),i.jsx(fh,{isOpen:M,onClose:()=>W(!1),category:U,onConfirm:fo}),i.jsx(ph,{isOpen:Me,onClose:()=>xt(!1),order:Ne,onConfirm:po}),i.jsx(mh,{isOpen:Qe,onClose:()=>Or(!1),qrcode:lo,onConfirm:v})]}):null};function gh(){return i.jsx(qm,{children:i.jsx("div",{className:"App",children:i.jsxs(Qm,{children:[i.jsx(cn,{path:"/",element:i.jsx(eh,{})}),i.jsx(cn,{path:"/admin/login",element:i.jsx(th,{})}),i.jsx(cn,{path:"/admin/register",element:i.jsx(nh,{})}),i.jsx(cn,{path:"/admin/dashboard/:tab?",element:i.jsx(hh,{})}),i.jsx(cn,{path:"*",element:i.jsx(Wm,{to:"/",replace:!0})})]})})})}Ao.createRoot(document.getElementById("root")).render(i.jsx(su.StrictMode,{children:i.jsx(Ym,{children:i.jsx(gh,{})})}));
