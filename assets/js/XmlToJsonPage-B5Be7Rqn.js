import{a as e}from"./rolldown-runtime-CaomFzHi.js";import{H as t,J as n,L as r,W as i,rt as a,tt as o}from"./mui-vendor-Ddt1bepO.js";import{c as s}from"./react-vendor-D1lzJujb.js";import"./Header-DBm1wvbw.js";import{n as c,o as l,r as u,t as d}from"./JsonEditorLayout-C0YASu5v.js";import"./vendor-BDOsHKQ3.js";var f=e(a()),p=e(o()),m=`<?xml version="1.0" encoding="UTF-8"?>
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
</root>`,h=()=>{let{t:e}=s(),[a,o]=(0,f.useState)(m),[h,g]=(0,f.useState)(``),[_,v]=(0,f.useState)(),[y,b]=(0,f.useState)(!0),[x,S]=(0,f.useState)(!1),[C,w]=(0,f.useState)(!0);return(0,f.useEffect)(()=>{let e=l(a,{parseAttributes:y,explicitArray:x,coerceTypes:C});e.ok?(g(JSON.stringify(e.output,null,2)),v(void 0)):(g(``),v(e.error))},[a,y,x,C]),(0,p.jsx)(d,{leftPanel:(0,p.jsx)(u,{title:e(`common.xml`),value:a,onChange:o,language:`xml`}),centerPanel:(0,p.jsx)(c,{}),rightPanel:(0,p.jsx)(u,{title:e(`common.json`),value:h,language:`json`,readOnly:!0}),bottomPanel:(0,p.jsxs)(i,{sx:{p:2},children:[(0,p.jsxs)(i,{sx:{display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:[(0,p.jsx)(r,{control:(0,p.jsx)(t,{checked:y,onChange:e=>b(e.target.checked)}),label:e(`pages.xmlToJson.parseAttributes`)}),(0,p.jsx)(r,{control:(0,p.jsx)(t,{checked:x,onChange:e=>S(e.target.checked)}),label:e(`pages.xmlToJson.explicitArray`)}),(0,p.jsx)(r,{control:(0,p.jsx)(t,{checked:C,onChange:e=>w(e.target.checked)}),label:e(`pages.xmlToJson.coerceTypes`)})]}),_&&(0,p.jsx)(n,{severity:`error`,sx:{mt:2},children:_})]})})};export{h as default};