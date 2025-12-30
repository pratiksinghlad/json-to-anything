import{a as e}from"./rolldown-runtime-CaomFzHi.js";import{$ as t,D as n,E as r,U as i,V as a,W as o,Z as s,c,i as l,k as u,z as d}from"./mui-vendor-gRKrnwp_.js";import{c as f}from"./react-vendor-B_HR4xDK.js";import"./Header-CRk8FizJ.js";import{n as p,r as m,t as h}from"./JsonEditorLayout-CEhafT6c.js";import{n as g,t as _}from"./vendor-Dhg1wUZS.js";import{t as v}from"./parseJson-M88Op6kn.js";var y=e(t()),b=e(g()),x=e(_());function S(e,t,n){if(e==null)return{valid:!1,errors:[{path:``,message:`Input is null or undefined`}]};if(t==null)return{valid:!1,errors:[{path:``,message:`Schema is null or undefined`}]};if(typeof t!=`object`)return{valid:!1,errors:[{path:``,message:`Schema must be an object`}]};try{let r=n?.schemaDraft,i={allErrors:!0,verbose:!0,strict:!1};(r===`draft-04`||r===`draft-06`)&&(i={...i,validateSchema:!1});let a=new b.default(i);(0,x.default)(a);let o=a.compile(t);return o(e)?{valid:!0}:{valid:!1,errors:(o.errors||[]).map(e=>({path:e.instancePath||``,message:e.message||`Unknown validation error`}))}}catch(e){return{valid:!1,errors:[{path:``,message:e instanceof Error?e.message:String(e)}]}}}var C=e(s()),w=`{
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
}`,E=()=>{let{t:e}=f(),[t,s]=(0,y.useState)(w),[g,_]=(0,y.useState)(T),[b,x]=(0,y.useState)(null),[E,D]=(0,y.useState)();return(0,y.useEffect)(()=>{let n=v(t);if(!n.success){D(e(`pages.validate.invalidJson`)),x(null);return}let r=v(g);if(!r.success){D(e(`pages.validate.invalidSchema`)),x(null);return}D(void 0);let i=S(n.data,r.data);x(i)},[t,g,e]),(0,C.jsx)(h,{leftPanel:(0,C.jsx)(m,{title:e(`pages.validate.jsonData`),value:t,onChange:s,language:`json`}),centerPanel:(0,C.jsx)(p,{}),rightPanel:(0,C.jsx)(m,{title:e(`pages.validate.jsonSchema`),value:g,onChange:_,language:`json`}),bottomPanel:(0,C.jsxs)(d,{sx:{p:2},children:[(0,C.jsx)(i,{variant:`h6`,sx:{mb:2},children:e(`pages.validate.results`)}),E&&(0,C.jsx)(o,{severity:`error`,sx:{mb:2},children:E}),b&&!E&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(d,{sx:{display:`flex`,alignItems:`center`,gap:1,mb:2},children:b.valid?(0,C.jsx)(a,{icon:(0,C.jsx)(c,{}),label:e(`pages.validate.valid`),color:`success`,variant:`filled`}):(0,C.jsx)(a,{icon:(0,C.jsx)(l,{}),label:e(`pages.validate.invalid`),color:`error`,variant:`filled`})}),!b.valid&&b.errors&&(0,C.jsxs)(d,{sx:{mt:2},children:[(0,C.jsx)(i,{variant:`subtitle2`,sx:{mb:1},children:e(`pages.validate.errorsFound`,{count:b.errors.length})}),(0,C.jsx)(u,{dense:!0,sx:{bgcolor:`background.paper`,borderRadius:1},children:b.errors.map((e,t)=>(0,C.jsx)(n,{sx:{borderBottom:`1px solid #eee`},children:(0,C.jsx)(r,{primary:(0,C.jsxs)(i,{variant:`body2`,component:`span`,children:[(0,C.jsx)(`strong`,{children:e.path||`/`}),`: `,e.message]})})},t))})]})]})]})})};export{E as default};