import{a as e}from"./rolldown-runtime-B0Z9INg1.js";import{T as t,U as n,at as r,et as i,gt as a,m as o,mt as s,nt as c,tt as l}from"./mui-vendor-Cx_p4akf.js";import{l as u}from"./react-vendor-BkPiWVaM.js";import{n as d,r as f,t as p}from"./parseJson--dXvnxen.js";import{a as m,i as h,n as g,r as _}from"./index-0RQY4e_x.js";import{n as v,t as y}from"./ajv-vendor-CWD-WC7x.js";var b=e(a(),1),x=e(v(),1),S=e(y(),1);function C(e,t){if(!t||t===``||t===`/`)return 1;let n=t.split(`/`).filter(e=>e!==``),r=0,i=1;for(let t of n){let n=t.replace(/\\/g,`\\\\`).replace(/"/g,`\\"`),a=-1,o=`"${n}"`;if(a=e.indexOf(o,r),a===-1&&/^\d+$/.test(t)&&(a=e.indexOf(t,r)),a!==-1){let t=e.substring(r,a).split(`
`);i+=t.length-1,r=a}else break}return i}function w(e,t,n){if(e==null)return{valid:!1,errors:[{path:``,message:`Input is null or undefined`,line:1}]};if(t==null)return{valid:!1,errors:[{path:``,message:`Schema is null or undefined`,line:1}]};if(typeof t!=`object`)return{valid:!1,errors:[{path:``,message:`Schema must be an object`,line:1}]};try{let r=n?.schemaDraft,i={allErrors:!0,verbose:!0,strict:!1};(r===`draft-04`||r===`draft-06`)&&(i={...i,validateSchema:!1});let a=new x.default(i);(0,S.default)(a);let o=a.compile(t);return o(e)?{valid:!0}:{valid:!1,errors:(o.errors||[]).map(e=>{let t=e.instancePath||``,r=n?.jsonString?C(n.jsonString,t):void 0;return{path:t,message:e.message||`Unknown validation error`,line:r}}).sort((e,t)=>e.path&&!t.path?-1:!e.path&&t.path?1:(e.line??2**53-1)-(t.line??2**53-1))}}catch(e){return{valid:!1,errors:[{path:``,message:e instanceof Error?e.message:String(e),line:1}]}}}function T(e){if(e===null)return{type:`null`};if(Array.isArray(e))return e.length===0?{type:`array`,items:{}}:{type:`array`,items:T(e[0])};if(typeof e==`object`){let t={},n=[],r=Object.entries(e).sort((e,t)=>e[0].localeCompare(t[0]));for(let[e,i]of r)t[e]=T(i),n.push(e);let i={type:`object`,properties:t};return n.length>0&&(i.required=n),i}if(typeof e==`number`)return{type:Number.isInteger(e)?`integer`:`number`};if(typeof e==`boolean`)return{type:`boolean`};if(typeof e==`string`){let t=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),n=!isNaN(Date.parse(e))&&e.includes(`T`)&&e.includes(`:`),r={type:`string`};return t?r.format=`email`:n&&(r.format=`date-time`),r}return{}}var E=s(),D=`{
  "name": "Alice Example",
  "age": 30,
  "email": "alice@example.com",
  "isActive": true
}`,O=`{
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
}`,k=()=>{let{t:e}=u(),[a,s]=(0,b.useState)(D),[v,y]=(0,b.useState)(O),[x,S]=(0,b.useState)(!0),{leftPanelRef:C,rightPanelRef:k}=g();(0,b.useEffect)(()=>{if(!x)return;let e=p(a);if(e.success){let t=T(e.data),n=JSON.stringify(t,null,2);n!==v&&y(n)}},[a,x,v]);let{isValid:A,errors:j,validationType:M,isJsonSyntaxValid:N}=(0,b.useMemo)(()=>{if(d(a))return{isValid:!1,errors:[],validationType:`syntax`,isJsonSyntaxValid:!1};let t=p(a);if(!t.success)return{isValid:!1,errors:[{path:``,message:`${e(`pages.validate.invalidJson`)}: ${t.error}`,line:t.line}],validationType:`syntax`,isJsonSyntaxValid:!1};if(d(v))return{isValid:!0,errors:[],validationType:`syntax`,isJsonSyntaxValid:!0};let n=p(v);if(!n.success)return{isValid:!1,errors:[{path:``,message:`${e(`pages.validate.invalidSchema`)}: ${n.error}`,line:n.line}],validationType:`schema`,isJsonSyntaxValid:!0};let r=w(t.data,n.data,{jsonString:a});return{isValid:r.valid,errors:r.errors??[],validationType:`schema`,isJsonSyntaxValid:!0}},[a,v,e]);return(0,E.jsx)(_,{leftPanel:(0,E.jsx)(m,{ref:C,title:e(`pages.validate.jsonData`),value:a,onChange:s,language:`json`,showMarkdownCopy:!0}),centerPanel:(0,E.jsx)(h,{}),rightPanel:(0,E.jsx)(m,{ref:k,title:e(`pages.validate.jsonSchema`),value:v,onChange:e=>{y(e),S(!1)},language:`json`,showMarkdownCopy:!0}),bottomPanel:(0,E.jsxs)(l,{sx:{p:2},children:[(0,E.jsx)(r,{variant:`h6`,sx:{mb:2},children:e(`pages.validate.results`)}),(0,E.jsxs)(l,{sx:{display:`flex`,gap:3,alignItems:`center`,mb:2,flexWrap:`wrap`},children:[A&&j.length===0&&(0,E.jsx)(c,{icon:(0,E.jsx)(o,{}),label:M===`syntax`?e(`pages.validate.validSyntax`,`Valid JSON Syntax`):e(`pages.validate.validSchemaMatch`,`Valid against Schema`),color:`success`,variant:`filled`}),(0,E.jsx)(n,{control:(0,E.jsx)(t,{checked:x,onChange:e=>S(e.target.checked),color:`primary`,size:`small`}),label:(0,E.jsx)(r,{variant:`body2`,sx:{fontWeight:500},children:e(`pages.validate.autoSyncSchema`,`Auto-generate Schema`)})}),!x&&(0,E.jsx)(i,{variant:`outlined`,color:`primary`,size:`small`,onClick:()=>{let e=p(a);if(e.success){let t=T(e.data);y(JSON.stringify(t,null,2))}},disabled:!N,sx:{textTransform:`none`},children:e(`pages.validate.generateSchema`,`Generate Schema`)})]}),(0,E.jsx)(f,{errors:j,hideTitle:!0})]})})};export{k as default};