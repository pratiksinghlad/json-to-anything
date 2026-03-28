import{a as e}from"./rolldown-runtime-CaomFzHi.js";import{K as t,W as n,X as r,at as i,rt as a,z as o}from"./mui-vendor-D233lL_0.js";import{l as s}from"./react-vendor-CCcdMWPY.js";import"./Header-CjZVUeQy.js";import{n as c,o as l,r as u,t as d}from"./JsonEditorLayout-C10F-1yM.js";import"./vendor-BKuhHPdh.js";var f=e(i()),p=e(a()),m=`<?xml version="1.0" encoding="UTF-8"?>
<root>
  <person id="1">
    <name>Alice Example</name>
    <age>30</age>
    <address>
      <street>123 Demo Street</street>
      <city>Sample City</city>
      <zip>00000</zip>
    </address>
    <hobbies>
      <hobby>reading</hobby>
      <hobby>gaming</hobby>
      <hobby>coding</hobby>
    </hobbies>
  </person>
</root>`,h=()=>{let{t:e}=s(),[i,a]=(0,f.useState)(m),[h,g]=(0,f.useState)(``),[_,v]=(0,f.useState)(),[y,b]=(0,f.useState)(!0),[x,S]=(0,f.useState)(!1),[C,w]=(0,f.useState)(!0);return(0,f.useEffect)(()=>{let e=l(i,{parseAttributes:y,explicitArray:x,coerceTypes:C});e.ok?(g(JSON.stringify(e.output,null,2)),v(void 0)):(g(``),v(e.error))},[i,y,x,C]),(0,p.jsx)(d,{leftPanel:(0,p.jsx)(u,{title:e(`common.xml`),value:i,onChange:a,language:`xml`}),centerPanel:(0,p.jsx)(c,{}),rightPanel:(0,p.jsx)(u,{title:e(`common.json`),value:h,language:`json`,readOnly:!0}),bottomPanel:(0,p.jsxs)(t,{sx:{p:2},children:[(0,p.jsxs)(t,{sx:{display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:[(0,p.jsx)(o,{control:(0,p.jsx)(n,{checked:y,onChange:e=>b(e.target.checked)}),label:e(`pages.xmlToJson.parseAttributes`)}),(0,p.jsx)(o,{control:(0,p.jsx)(n,{checked:x,onChange:e=>S(e.target.checked)}),label:e(`pages.xmlToJson.explicitArray`)}),(0,p.jsx)(o,{control:(0,p.jsx)(n,{checked:C,onChange:e=>w(e.target.checked)}),label:e(`pages.xmlToJson.coerceTypes`)})]}),_&&(0,p.jsx)(r,{severity:`error`,sx:{mt:2},children:_})]})})};export{h as default};