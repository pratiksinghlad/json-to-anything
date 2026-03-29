import{a as e}from"./rolldown-runtime-B589uzA9.js";import{R as t,X as n,at as r,q as i,st as a}from"./mui-vendor-C8SM3Xjj.js";import{l as o}from"./react-vendor-DTrGPlSO.js";import{n as s,r as c,t as l}from"./JsonEditorLayout-DS_LdOWy.js";import{t as u}from"./ValidationResults-FZZUigPN.js";import{t as d}from"./isBlankInput-BFuadj8S.js";import{n as f}from"./jsonToCsv-BwqvIeCs.js";import{t as p}from"./useConverter-CwqLyhGl.js";var m=e(a(),1),h=r(),g=`{
  "person": {
    "name": "Jane",
    "age": 28,
    "address": {
      "city": "London",
      "country": "UK"
    },
    "skills": ["JavaScript", "Rust", "React"]
  }
}`,_=()=>{let{t:e}=o(),[r,a]=(0,m.useState)(g),[_,v]=(0,m.useState)(``),[y,b]=(0,m.useState)([]),{convert:x,isProcessing:S}=p();return(0,m.useEffect)(()=>{if(d(r)){b([]),v(``);return}let e=!1;return(async()=>{try{JSON.parse(r)}catch(t){e||(b([{message:t instanceof Error?t.message:String(t)}]),v(``));return}let t=await x(r,`yaml`);e||(t.ok?(v(t.output),b([])):(v(``),b([{message:t.error}])))})(),()=>{e=!0}},[r,x]),(0,h.jsx)(l,{leftPanel:(0,h.jsx)(c,{title:e(`common.json`),value:r,onChange:a,language:`json`}),centerPanel:(0,h.jsx)(s,{}),rightPanel:(0,h.jsx)(c,{title:`YAML`,value:_,language:`yaml`,readOnly:!0}),bottomPanel:(0,h.jsxs)(i,{sx:{p:2},children:[S&&(0,h.jsxs)(i,{sx:{mb:2},children:[(0,h.jsx)(t,{}),(0,h.jsx)(n,{variant:`caption`,color:`text.secondary`,sx:{mt:.5},children:e(`pages.jsonToToon.processing`)})]}),(0,h.jsx)(u,{errors:y}),(0,h.jsx)(i,{sx:{mt:2,display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:(0,h.jsx)(f,{yamlData:_,jsonData:r,disabled:!_})})]})})};export{_ as default};