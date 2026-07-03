import{a as e}from"./rolldown-runtime-CNC7AqOf.js";import{at as t,gt as n,mt as r,nt as i,tt as a,u as o}from"./mui-vendor-IcNf0f7x.js";import{l as s}from"./react-vendor-Cp7TehZY.js";import{a as c,c as l,i as u,n as d,o as f,r as p,s as m}from"./index-oQpmG7NZ.js";import{n as h,t as g}from"./ajv-vendor-DJDeLPLY.js";var _=e(n(),1),v=e(h(),1),y=e(g(),1);function b(e,t){if(!t||t===``||t===`/`)return 1;let n=t.split(`/`).filter(e=>e!==``),r=0,i=1;for(let t of n){let n=t.replace(/\\/g,`\\\\`).replace(/"/g,`\\"`),a=-1,o=`"${n}"`;if(a=e.indexOf(o,r),a===-1&&/^\d+$/.test(t)&&(a=e.indexOf(t,r)),a!==-1){let t=e.substring(r,a).split(`
`);i+=t.length-1,r=a}else break}return i}function x(e,t,n){if(e==null)return{valid:!1,errors:[{path:``,message:`Input is null or undefined`,line:1}]};if(t==null)return{valid:!1,errors:[{path:``,message:`Schema is null or undefined`,line:1}]};if(typeof t!=`object`)return{valid:!1,errors:[{path:``,message:`Schema must be an object`,line:1}]};try{let r=n?.schemaDraft,i={allErrors:!0,verbose:!0,strict:!1};(r===`draft-04`||r===`draft-06`)&&(i={...i,validateSchema:!1});let a=new v.default(i);(0,y.default)(a);let o=a.compile(t);return o(e)?{valid:!0}:{valid:!1,errors:(o.errors||[]).map(e=>{let t=e.instancePath||``,r=n?.jsonString?b(n.jsonString,t):void 0;return{path:t,message:e.message||`Unknown validation error`,line:r}}).sort((e,t)=>e.path&&!t.path?-1:!e.path&&t.path?1:(e.line??2**53-1)-(t.line??2**53-1))}}catch(e){return{valid:!1,errors:[{path:``,message:e instanceof Error?e.message:String(e),line:1}]}}}var S=r(),C=`{
  "name": "Alice Example",
  "age": 30,
  "email": "alice@example.com",
  "isActive": true
}`,w=`{
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
}`,T=()=>{let{t:e}=s(),[n,r]=(0,_.useState)(C),[h,g]=(0,_.useState)(w),{leftPanelRef:v,rightPanelRef:y}=p(),{isValid:b,errors:T}=(0,_.useMemo)(()=>{if(u(n)||u(h))return{isValid:!1,errors:[]};let t=d(n);if(!t.success)return{isValid:!1,errors:[{path:``,message:`${e(`pages.validate.invalidJson`)}: ${t.error}`,line:t.line}]};let r=d(h);if(!r.success)return{isValid:!1,errors:[{path:``,message:`${e(`pages.validate.invalidSchema`)}: ${r.error}`,line:r.line}]};let i=x(t.data,r.data,{jsonString:n});return{isValid:i.valid,errors:i.errors??[]}},[n,h,e]);return(0,S.jsx)(f,{leftPanel:(0,S.jsx)(l,{ref:v,title:e(`pages.validate.jsonData`),value:n,onChange:r,language:`json`,showMarkdownCopy:!0}),centerPanel:(0,S.jsx)(m,{}),rightPanel:(0,S.jsx)(l,{ref:y,title:e(`pages.validate.jsonSchema`),value:h,onChange:g,language:`json`,showMarkdownCopy:!0}),bottomPanel:(0,S.jsxs)(a,{sx:{p:2},children:[(0,S.jsx)(t,{variant:`h6`,sx:{mb:2},children:e(`pages.validate.results`)}),b&&T.length===0&&(0,S.jsx)(a,{sx:{display:`flex`,alignItems:`center`,gap:1,mb:2},children:(0,S.jsx)(i,{icon:(0,S.jsx)(o,{}),label:e(`pages.validate.valid`),color:`success`,variant:`filled`})}),(0,S.jsx)(c,{errors:T})]})})};export{T as default};