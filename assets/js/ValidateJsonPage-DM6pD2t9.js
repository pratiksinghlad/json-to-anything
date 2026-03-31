import{a as e}from"./rolldown-runtime-B589uzA9.js";import{et as t,f as n,ft as r,mt as i,rt as a,tt as o}from"./mui-vendor-BI8racdd.js";import{l as s}from"./react-vendor-DltAUd6l.js";import{i as c,n as l,r as u,t as d}from"./useJsonEditorAccessibility-BFROvSAF.js";import{t as f}from"./ValidationResults-DFseO2jX.js";import{t as p}from"./parseJson-DIS0zLKv.js";import{t as m}from"./isBlankInput-BFuadj8S.js";import{n as h,t as g}from"./ajv-vendor-f2G4sHTK.js";var _=e(i(),1),v=e(h(),1),y=e(g(),1);function b(e,t){if(!t||t===``||t===`/`)return 1;let n=t.split(`/`).filter(e=>e!==``),r=0,i=1;for(let t of n){let n=t.replace(/\\/g,`\\\\`).replace(/"/g,`\\"`),a=-1,o=`"${n}"`;if(a=e.indexOf(o,r),a===-1&&/^\d+$/.test(t)&&(a=e.indexOf(t,r)),a!==-1){let t=e.substring(r,a).split(`
`);i+=t.length-1,r=a}else break}return i}function x(e,t,n){if(e==null)return{valid:!1,errors:[{path:``,message:`Input is null or undefined`,line:1}]};if(t==null)return{valid:!1,errors:[{path:``,message:`Schema is null or undefined`,line:1}]};if(typeof t!=`object`)return{valid:!1,errors:[{path:``,message:`Schema must be an object`,line:1}]};try{let r=n?.schemaDraft,i={allErrors:!0,verbose:!0,strict:!1};(r===`draft-04`||r===`draft-06`)&&(i={...i,validateSchema:!1});let a=new v.default(i);(0,y.default)(a);let o=a.compile(t);return o(e)?{valid:!0}:{valid:!1,errors:(o.errors||[]).map(e=>{let t=e.instancePath||``,r=n?.jsonString?b(n.jsonString,t):void 0;return{path:t,message:e.message||`Unknown validation error`,line:r}})}}catch(e){return{valid:!1,errors:[{path:``,message:e instanceof Error?e.message:String(e),line:1}]}}}var S=r(),C=`{
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
}`,T=()=>{let{t:e}=s(),[r,i]=(0,_.useState)(C),[h,g]=(0,_.useState)(w),[v,y]=(0,_.useState)(!1),[b,T]=(0,_.useState)([]),{leftPanelRef:E,rightPanelRef:D}=d();return(0,_.useEffect)(()=>{if(m(r)||m(h)){y(!1),T([]);return}let t=p(r);if(!t.success){y(!1),T([{path:``,message:`${e(`pages.validate.invalidJson`)}: ${t.error}`,line:t.line}]);return}let n=p(h);if(!n.success){y(!1),T([{path:``,message:`${e(`pages.validate.invalidSchema`)}: ${n.error}`,line:n.line}]);return}let i=x(t.data,n.data,{jsonString:r});y(i.valid),T(i.errors??[])},[r,h,e]),(0,S.jsx)(l,{leftPanel:(0,S.jsx)(c,{ref:E,title:e(`pages.validate.jsonData`),value:r,onChange:i,language:`json`}),centerPanel:(0,S.jsx)(u,{}),rightPanel:(0,S.jsx)(c,{ref:D,title:e(`pages.validate.jsonSchema`),value:h,onChange:g,language:`json`}),bottomPanel:(0,S.jsxs)(t,{sx:{p:2},children:[(0,S.jsx)(a,{variant:`h6`,sx:{mb:2},children:e(`pages.validate.results`)}),v&&b.length===0&&(0,S.jsx)(t,{sx:{display:`flex`,alignItems:`center`,gap:1,mb:2},children:(0,S.jsx)(o,{icon:(0,S.jsx)(n,{}),label:e(`pages.validate.valid`),color:`success`,variant:`filled`})}),(0,S.jsx)(f,{errors:b})]})})};export{T as default};