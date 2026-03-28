import{a as e}from"./rolldown-runtime-CaomFzHi.js";import{K as t,Y as n,at as r,p as i,q as a,rt as o}from"./mui-vendor-D233lL_0.js";import{l as s}from"./react-vendor-CCcdMWPY.js";import"./Header-CjZVUeQy.js";import{n as c,r as l,t as u}from"./JsonEditorLayout-C10F-1yM.js";import{n as d,t as f}from"./vendor-BKuhHPdh.js";import{n as p,t as m}from"./parseJson-DmFCVXrs.js";var h=e(r()),g=e(d()),_=e(f());function v(e,t){if(!t||t===``||t===`/`)return 1;let n=t.split(`/`).filter(e=>e!==``),r=0,i=1;for(let t of n){let n=t.replace(/\\/g,`\\\\`).replace(/"/g,`\\"`),a=-1,o=`"${n}"`;if(a=e.indexOf(o,r),a===-1&&/^\d+$/.test(t)&&(a=e.indexOf(t,r)),a!==-1){let t=e.substring(r,a).split(`
`);i+=t.length-1,r=a}else break}return i}function y(e,t,n){if(e==null)return{valid:!1,errors:[{path:``,message:`Input is null or undefined`,line:1}]};if(t==null)return{valid:!1,errors:[{path:``,message:`Schema is null or undefined`,line:1}]};if(typeof t!=`object`)return{valid:!1,errors:[{path:``,message:`Schema must be an object`,line:1}]};try{let r=n?.schemaDraft,i={allErrors:!0,verbose:!0,strict:!1};(r===`draft-04`||r===`draft-06`)&&(i={...i,validateSchema:!1});let a=new g.default(i);(0,_.default)(a);let o=a.compile(t);return o(e)?{valid:!0}:{valid:!1,errors:(o.errors||[]).map(e=>{let t=e.instancePath||``,r=n?.jsonString?v(n.jsonString,t):void 0;return{path:t,message:e.message||`Unknown validation error`,line:r}})}}catch(e){return{valid:!1,errors:[{path:``,message:e instanceof Error?e.message:String(e),line:1}]}}}var b=e(o()),x=`{
  "name": "Alice Example",
  "age": 30,
  "email": "alice@example.com",
  "isActive": true
}`,S=`{
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
}`,C=()=>{let{t:e}=s(),[r,o]=(0,h.useState)(x),[d,f]=(0,h.useState)(S),[g,_]=(0,h.useState)(!1),[v,C]=(0,h.useState)([]);return(0,h.useEffect)(()=>{let t=m(r);if(!t.success){_(!1),C([{path:``,message:`${e(`pages.validate.invalidJson`)}: ${t.error}`,line:t.line}]);return}let n=m(d);if(!n.success){_(!1),C([{path:``,message:`${e(`pages.validate.invalidSchema`)}: ${n.error}`,line:n.line}]);return}let i=y(t.data,n.data,{jsonString:r});_(i.valid),C(i.errors??[])},[r,d,e]),(0,b.jsx)(u,{leftPanel:(0,b.jsx)(l,{title:e(`pages.validate.jsonData`),value:r,onChange:o,language:`json`}),centerPanel:(0,b.jsx)(c,{}),rightPanel:(0,b.jsx)(l,{title:e(`pages.validate.jsonSchema`),value:d,onChange:f,language:`json`}),bottomPanel:(0,b.jsxs)(t,{sx:{p:2},children:[(0,b.jsx)(n,{variant:`h6`,sx:{mb:2},children:e(`pages.validate.results`)}),g&&v.length===0&&(0,b.jsx)(t,{sx:{display:`flex`,alignItems:`center`,gap:1,mb:2},children:(0,b.jsx)(a,{icon:(0,b.jsx)(i,{}),label:e(`pages.validate.valid`),color:`success`,variant:`filled`})}),(0,b.jsx)(p,{errors:v})]})})};export{C as default};