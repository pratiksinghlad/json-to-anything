import{a as e}from"./rolldown-runtime-B589uzA9.js";import{J as t,X as n,at as r,f as i,q as a,st as o}from"./mui-vendor-C8SM3Xjj.js";import{l as s}from"./react-vendor-DTrGPlSO.js";import{n as c,r as l,t as u}from"./JsonEditorLayout-DS_LdOWy.js";import{t as d}from"./ValidationResults-FZZUigPN.js";import{t as f}from"./parseJson-DIS0zLKv.js";import{t as p}from"./isBlankInput-BFuadj8S.js";import{n as m,t as h}from"./ajv-vendor-f2G4sHTK.js";var g=e(o(),1),_=e(m(),1),v=e(h(),1);function y(e,t){if(!t||t===``||t===`/`)return 1;let n=t.split(`/`).filter(e=>e!==``),r=0,i=1;for(let t of n){let n=t.replace(/\\/g,`\\\\`).replace(/"/g,`\\"`),a=-1,o=`"${n}"`;if(a=e.indexOf(o,r),a===-1&&/^\d+$/.test(t)&&(a=e.indexOf(t,r)),a!==-1){let t=e.substring(r,a).split(`
`);i+=t.length-1,r=a}else break}return i}function b(e,t,n){if(e==null)return{valid:!1,errors:[{path:``,message:`Input is null or undefined`,line:1}]};if(t==null)return{valid:!1,errors:[{path:``,message:`Schema is null or undefined`,line:1}]};if(typeof t!=`object`)return{valid:!1,errors:[{path:``,message:`Schema must be an object`,line:1}]};try{let r=n?.schemaDraft,i={allErrors:!0,verbose:!0,strict:!1};(r===`draft-04`||r===`draft-06`)&&(i={...i,validateSchema:!1});let a=new _.default(i);(0,v.default)(a);let o=a.compile(t);return o(e)?{valid:!0}:{valid:!1,errors:(o.errors||[]).map(e=>{let t=e.instancePath||``,r=n?.jsonString?y(n.jsonString,t):void 0;return{path:t,message:e.message||`Unknown validation error`,line:r}})}}catch(e){return{valid:!1,errors:[{path:``,message:e instanceof Error?e.message:String(e),line:1}]}}}var x=r(),S=`{
  "name": "Alice Example",
  "age": 30,
  "email": "alice@example.com",
  "isActive": true
}`,C=`{
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
}`,w=()=>{let{t:e}=s(),[r,o]=(0,g.useState)(S),[m,h]=(0,g.useState)(C),[_,v]=(0,g.useState)(!1),[y,w]=(0,g.useState)([]);return(0,g.useEffect)(()=>{if(p(r)||p(m)){v(!1),w([]);return}let t=f(r);if(!t.success){v(!1),w([{path:``,message:`${e(`pages.validate.invalidJson`)}: ${t.error}`,line:t.line}]);return}let n=f(m);if(!n.success){v(!1),w([{path:``,message:`${e(`pages.validate.invalidSchema`)}: ${n.error}`,line:n.line}]);return}let i=b(t.data,n.data,{jsonString:r});v(i.valid),w(i.errors??[])},[r,m,e]),(0,x.jsx)(u,{leftPanel:(0,x.jsx)(l,{title:e(`pages.validate.jsonData`),value:r,onChange:o,language:`json`}),centerPanel:(0,x.jsx)(c,{}),rightPanel:(0,x.jsx)(l,{title:e(`pages.validate.jsonSchema`),value:m,onChange:h,language:`json`}),bottomPanel:(0,x.jsxs)(a,{sx:{p:2},children:[(0,x.jsx)(n,{variant:`h6`,sx:{mb:2},children:e(`pages.validate.results`)}),_&&y.length===0&&(0,x.jsx)(a,{sx:{display:`flex`,alignItems:`center`,gap:1,mb:2},children:(0,x.jsx)(t,{icon:(0,x.jsx)(i,{}),label:e(`pages.validate.valid`),color:`success`,variant:`filled`})}),(0,x.jsx)(d,{errors:y})]})})};export{w as default};