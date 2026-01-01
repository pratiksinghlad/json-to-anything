import{a as e}from"./rolldown-runtime-CaomFzHi.js";import{L as t,M as n,Q as r,U as i,X as a,z as o}from"./mui-vendor-BMrntdZB.js";import{c as s}from"./react-vendor-DK0IhpB5.js";import"./Header-C2z5NNfg.js";import{n as c,r as l,s as u,t as d}from"./JsonEditorLayout-C5u74KT0.js";import"./vendor-TprvYOfS.js";var f=e(r()),p=e(a()),m=`<?xml version="1.0" encoding="UTF-8"?>
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
</root>`,h=()=>{let{t:e}=s(),[r,a]=(0,f.useState)(m),[h,g]=(0,f.useState)(``),[_,v]=(0,f.useState)(),[y,b]=(0,f.useState)(!0),[x,S]=(0,f.useState)(!1),[C,w]=(0,f.useState)(!0);return(0,f.useEffect)(()=>{let e=u(r,{parseAttributes:y,explicitArray:x,coerceTypes:C});e.ok?(g(JSON.stringify(e.output,null,2)),v(void 0)):(g(``),v(e.error))},[r,y,x,C]),(0,p.jsx)(d,{leftPanel:(0,p.jsx)(l,{title:e(`common.xml`),value:r,onChange:a,language:`xml`}),centerPanel:(0,p.jsx)(c,{}),rightPanel:(0,p.jsx)(l,{title:e(`common.json`),value:h,language:`json`,readOnly:!0}),bottomPanel:(0,p.jsxs)(o,{sx:{p:2},children:[(0,p.jsxs)(o,{sx:{display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:[(0,p.jsx)(n,{control:(0,p.jsx)(t,{checked:y,onChange:e=>b(e.target.checked)}),label:e(`pages.xmlToJson.parseAttributes`)}),(0,p.jsx)(n,{control:(0,p.jsx)(t,{checked:x,onChange:e=>S(e.target.checked)}),label:e(`pages.xmlToJson.explicitArray`)}),(0,p.jsx)(n,{control:(0,p.jsx)(t,{checked:C,onChange:e=>w(e.target.checked)}),label:e(`pages.xmlToJson.coerceTypes`)})]}),_&&(0,p.jsx)(i,{severity:`error`,sx:{mt:2},children:_})]})})};export{h as default};