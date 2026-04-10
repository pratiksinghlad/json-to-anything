import{a as e}from"./rolldown-runtime-B589uzA9.js";import{_t as t,at as n,ct as r,f as i,it as a,yt as o}from"./mui-vendor-DFtBpTA8.js";import{l as s}from"./react-vendor-CpWF0ttU.js";import{i as c,n as l,r as u,t as d}from"./useJsonEditorAccessibility-B0hcjdz-.js";import{t as f}from"./ValidationResults-gzFOZdp4.js";import{t as p}from"./parseJson-BV02aLOs.js";import{t as m}from"./isBlankInput-D2CVMpyH.js";import{n as h,t as g}from"./ajv-vendor-Bt5n0Z8L.js";var _=e(o(),1),v=e(h(),1),y=e(g(),1);function b(e,t){if(!t||t===``||t===`/`)return 1;let n=t.split(`/`).filter(e=>e!==``),r=0,i=1;for(let t of n){let n=t.replace(/\\/g,`\\\\`).replace(/"/g,`\\"`),a=-1,o=`"${n}"`;if(a=e.indexOf(o,r),a===-1&&/^\d+$/.test(t)&&(a=e.indexOf(t,r)),a!==-1){let t=e.substring(r,a).split(`
`);i+=t.length-1,r=a}else break}return i}function x(e,t,n){if(e==null)return{valid:!1,errors:[{path:``,message:`Input is null or undefined`,line:1}]};if(t==null)return{valid:!1,errors:[{path:``,message:`Schema is null or undefined`,line:1}]};if(typeof t!=`object`)return{valid:!1,errors:[{path:``,message:`Schema must be an object`,line:1}]};try{let r=n?.schemaDraft,i={allErrors:!0,verbose:!0,strict:!1};(r===`draft-04`||r===`draft-06`)&&(i={...i,validateSchema:!1});let a=new v.default(i);(0,y.default)(a);let o=a.compile(t);return o(e)?{valid:!0}:{valid:!1,errors:(o.errors||[]).map(e=>{let t=e.instancePath||``,r=n?.jsonString?b(n.jsonString,t):void 0;return{path:t,message:e.message||`Unknown validation error`,line:r}})}}catch(e){return{valid:!1,errors:[{path:``,message:e instanceof Error?e.message:String(e),line:1}]}}}var S=t(),C=`{
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
}`,T=()=>{let{t:e}=s(),[t,o]=(0,_.useState)(C),[h,g]=(0,_.useState)(w),[v,y]=(0,_.useState)(!1),[b,T]=(0,_.useState)([]),{leftPanelRef:E,rightPanelRef:D}=d();return(0,_.useEffect)(()=>{if(m(t)||m(h)){y(!1),T([]);return}let n=p(t);if(!n.success){y(!1),T([{path:``,message:`${e(`pages.validate.invalidJson`)}: ${n.error}`,line:n.line}]);return}let r=p(h);if(!r.success){y(!1),T([{path:``,message:`${e(`pages.validate.invalidSchema`)}: ${r.error}`,line:r.line}]);return}let i=x(n.data,r.data,{jsonString:t});y(i.valid),T(i.errors??[])},[t,h,e]),(0,S.jsx)(l,{leftPanel:(0,S.jsx)(c,{ref:E,title:e(`pages.validate.jsonData`),value:t,onChange:o,language:`json`}),centerPanel:(0,S.jsx)(u,{}),rightPanel:(0,S.jsx)(c,{ref:D,title:e(`pages.validate.jsonSchema`),value:h,onChange:g,language:`json`}),bottomPanel:(0,S.jsxs)(a,{sx:{p:2},children:[(0,S.jsx)(r,{variant:`h6`,sx:{mb:2},children:e(`pages.validate.results`)}),v&&b.length===0&&(0,S.jsx)(a,{sx:{display:`flex`,alignItems:`center`,gap:1,mb:2},children:(0,S.jsx)(n,{icon:(0,S.jsx)(i,{}),label:e(`pages.validate.valid`),color:`success`,variant:`filled`})}),(0,S.jsx)(f,{errors:b})]})})};export{T as default};