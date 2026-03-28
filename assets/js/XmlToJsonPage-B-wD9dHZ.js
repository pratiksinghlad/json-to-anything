import{a as e}from"./rolldown-runtime-B589uzA9.js";import{B as t,G as n,Z as r,at as i,q as a,st as o}from"./mui-vendor-C8SM3Xjj.js";import{l as s}from"./react-vendor-DTrGPlSO.js";import{n as c,o as l,r as u,t as d}from"./JsonEditorLayout-KkIsstB3.js";import{t as f}from"./isBlankInput-CAN9DdGX.js";var p=e(o(),1),m=i(),h=`<?xml version="1.0" encoding="UTF-8"?>
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
</root>`,g=()=>{let{t:e}=s(),[i,o]=(0,p.useState)(h),[g,_]=(0,p.useState)(``),[v,y]=(0,p.useState)(),[b,x]=(0,p.useState)(!0),[S,C]=(0,p.useState)(!1),[w,T]=(0,p.useState)(!0);return(0,p.useEffect)(()=>{if(f(i)){_(``),y(void 0);return}let e=l(i,{parseAttributes:b,explicitArray:S,coerceTypes:w});e.ok?(_(JSON.stringify(e.output,null,2)),y(void 0)):(_(``),y(e.error))},[i,b,S,w]),(0,m.jsx)(d,{leftPanel:(0,m.jsx)(u,{title:e(`common.xml`),value:i,onChange:o,language:`xml`}),centerPanel:(0,m.jsx)(c,{}),rightPanel:(0,m.jsx)(u,{title:e(`common.json`),value:g,language:`json`,readOnly:!0}),bottomPanel:(0,m.jsxs)(a,{sx:{p:2},children:[(0,m.jsxs)(a,{sx:{display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:[(0,m.jsx)(t,{control:(0,m.jsx)(n,{checked:b,onChange:e=>x(e.target.checked)}),label:e(`pages.xmlToJson.parseAttributes`)}),(0,m.jsx)(t,{control:(0,m.jsx)(n,{checked:S,onChange:e=>C(e.target.checked)}),label:e(`pages.xmlToJson.explicitArray`)}),(0,m.jsx)(t,{control:(0,m.jsx)(n,{checked:w,onChange:e=>T(e.target.checked)}),label:e(`pages.xmlToJson.coerceTypes`)})]}),v&&(0,m.jsx)(r,{severity:`error`,sx:{mt:2},children:v})]})})};export{g as default};