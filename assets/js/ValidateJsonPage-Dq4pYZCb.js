import{a as e}from"./rolldown-runtime-CaomFzHi.js";import{A as t,G as n,N as r,W as i,f as a,j as o,q as s,rt as c,s as l,tt as u}from"./mui-vendor-Ddt1bepO.js";import{c as d}from"./react-vendor-D1lzJujb.js";import"./Header-DBm1wvbw.js";import{n as f,r as p,t as m}from"./JsonEditorLayout-C0YASu5v.js";import{n as h,t as g}from"./vendor-BDOsHKQ3.js";import{t as _}from"./parseJson-DAoaeXnB.js";var v=e(c()),y=e(h()),b=e(g());function x(e,t){if(!t||t===``||t===`/`)return 1;let n=t.split(`/`).filter(e=>e!==``),r=0,i=1;for(let t of n){let n=t.replace(/"/g,`\\"`),a=-1,o=`"${n}"`;if(a=e.indexOf(o,r),a===-1&&/^\d+$/.test(t)&&(a=e.indexOf(t,r)),a!==-1){let t=e.substring(r,a).split(`
`);i+=t.length-1,r=a}else break}return i}function S(e,t,n){if(e==null)return{valid:!1,errors:[{path:``,message:`Input is null or undefined`,line:1}]};if(t==null)return{valid:!1,errors:[{path:``,message:`Schema is null or undefined`,line:1}]};if(typeof t!=`object`)return{valid:!1,errors:[{path:``,message:`Schema must be an object`,line:1}]};try{let r=n?.schemaDraft,i={allErrors:!0,verbose:!0,strict:!1};(r===`draft-04`||r===`draft-06`)&&(i={...i,validateSchema:!1});let a=new y.default(i);(0,b.default)(a);let o=a.compile(t);return o(e)?{valid:!0}:{valid:!1,errors:(o.errors||[]).map(e=>{let t=e.instancePath||``,r=n?.jsonString?x(n.jsonString,t):void 0;return{path:t,message:e.message||`Unknown validation error`,line:r}})}}catch(e){return{valid:!1,errors:[{path:``,message:e instanceof Error?e.message:String(e),line:1}]}}}var C=e(u()),w=`{
  "name": "Alice Example",
  "age": 30,
  "email": "alice@example.com",
  "isActive": true
}`,T=`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "integer",
      "minimum": 0
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "isActive": {
      "type": "boolean"
    }
  },
  "required": ["name", "age", "email"]
}`,E=()=>{let{t:e}=d(),[c,u]=(0,v.useState)(w),[h,g]=(0,v.useState)(T),[y,b]=(0,v.useState)(null);return(0,v.useEffect)(()=>{let t=_(c);if(!t.success){b({valid:!1,errors:[{path:``,message:`${e(`pages.validate.invalidJson`)}: ${t.error}`,line:t.line}]});return}let n=_(h);if(!n.success){b({valid:!1,errors:[{path:``,message:`${e(`pages.validate.invalidSchema`)}: ${n.error}`,line:n.line}]});return}let r=S(t.data,n.data,{jsonString:c});b(r)},[c,h,e]),(0,C.jsx)(m,{leftPanel:(0,C.jsx)(p,{title:e(`pages.validate.jsonData`),value:c,onChange:u,language:`json`}),centerPanel:(0,C.jsx)(f,{}),rightPanel:(0,C.jsx)(p,{title:e(`pages.validate.jsonSchema`),value:h,onChange:g,language:`json`}),bottomPanel:(0,C.jsxs)(i,{sx:{p:2},children:[(0,C.jsx)(s,{variant:`h6`,sx:{mb:2},children:e(`pages.validate.results`)}),y&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(i,{sx:{display:`flex`,alignItems:`center`,gap:1,mb:2},children:y.valid?(0,C.jsx)(n,{icon:(0,C.jsx)(a,{}),label:e(`pages.validate.valid`),color:`success`,variant:`filled`}):(0,C.jsx)(n,{icon:(0,C.jsx)(l,{}),label:e(`pages.validate.invalid`),color:`error`,variant:`filled`})}),!y.valid&&y.errors&&(0,C.jsxs)(i,{sx:{mt:2},children:[(0,C.jsx)(s,{variant:`subtitle2`,sx:{mb:1,color:`error.main`},children:e(`pages.validate.errorsFound`,{count:y.errors.length})}),(0,C.jsx)(r,{dense:!0,sx:{bgcolor:`rgba(211, 47, 47, 0.05)`,borderRadius:1,border:`1px solid rgba(211, 47, 47, 0.2)`},children:y.errors.map((n,r)=>(0,C.jsx)(o,{sx:{borderBottom:r<(y.errors?.length||0)-1?`1px solid rgba(211, 47, 47, 0.1)`:`none`},children:(0,C.jsx)(t,{primary:(0,C.jsxs)(s,{variant:`body2`,sx:{color:`error.main`,fontWeight:500},children:[n.line&&(0,C.jsxs)(i,{component:`span`,sx:{mr:1,fontWeight:`bold`},children:[`[`,e(`pages.validate.line`),` `,n.line,`]`]}),n.message]}),secondary:n.path?(0,C.jsxs)(s,{variant:`caption`,sx:{color:`text.secondary`},children:[e(`pages.validate.path`),`: `,(0,C.jsx)(`strong`,{children:n.path})]}):null})},r))})]})]})]})})};export{E as default};