import{a as e}from"./rolldown-runtime-B589uzA9.js";import{G as t,_t as n,it as r,lt as i,nt as a,yt as o}from"./mui-vendor-DFtBpTA8.js";import{l as s}from"./react-vendor-CpWF0ttU.js";import{i as c,n as l,r as u,s as d,t as f}from"./useJsonEditorAccessibility-B0hcjdz-.js";import{t as p}from"./isBlankInput-D2CVMpyH.js";var m=e(o(),1),h=n(),g=`<?xml version="1.0" encoding="UTF-8"?>
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
</root>`,_=()=>{let{t:e}=s(),[n,o]=(0,m.useState)(g),[_,v]=(0,m.useState)(``),[y,b]=(0,m.useState)(),[x,S]=(0,m.useState)(!0),[C,w]=(0,m.useState)(!1),[T,E]=(0,m.useState)(!0),{leftPanelRef:D,rightPanelRef:O}=f();return(0,m.useEffect)(()=>{if(p(n)){v(``),b(void 0);return}let e=d(n,{parseAttributes:x,explicitArray:C,coerceTypes:T});e.ok?(v(JSON.stringify(e.output,null,2)),b(void 0)):(v(``),b(e.error))},[n,x,C,T]),(0,h.jsx)(l,{leftPanel:(0,h.jsx)(c,{ref:D,title:e(`common.xml`),value:n,onChange:o,language:`xml`}),centerPanel:(0,h.jsx)(u,{}),rightPanel:(0,h.jsx)(c,{ref:O,title:e(`common.json`),value:_,language:`json`,readOnly:!0}),bottomPanel:(0,h.jsxs)(r,{sx:{p:2},children:[(0,h.jsxs)(r,{sx:{display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:[(0,h.jsx)(t,{control:(0,h.jsx)(a,{checked:x,onChange:e=>S(e.target.checked)}),label:e(`pages.xmlToJson.parseAttributes`)}),(0,h.jsx)(t,{control:(0,h.jsx)(a,{checked:C,onChange:e=>w(e.target.checked)}),label:e(`pages.xmlToJson.explicitArray`)}),(0,h.jsx)(t,{control:(0,h.jsx)(a,{checked:T,onChange:e=>E(e.target.checked)}),label:e(`pages.xmlToJson.coerceTypes`)})]}),y&&(0,h.jsx)(i,{severity:`error`,sx:{mt:2},children:y})]})})};export{_ as default};