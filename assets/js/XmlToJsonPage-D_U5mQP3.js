import{a as e}from"./rolldown-runtime-CaomFzHi.js";import{A as t,E as n,G as r,L as i,M as a,U as o}from"./mui-vendor-JnOqsSZ-.js";import{s}from"./react-vendor-C089BLRD.js";import"./Header-DG5SIJLi.js";import{n as c,r as l,t as u}from"./JsonEditorLayout-BIvsDBG4.js";import{i as d}from"./vendor-Dhg1wUZS.js";var f=e(r());function p(e,t){if(!e||e.trim()===``)return{ok:!1,error:`Input is empty`};let n=t?.parseAttributes??!0,r=t?.explicitArray??!1,i=t?.coerceTypes??!0;try{let t={ignoreAttributes:!n,attributeNamePrefix:`@_`,textNodeName:`#text`,parseTagValue:i,parseAttributeValue:i,trimValues:!0};return r&&(t.isArray=()=>!0),{ok:!0,output:new d(t).parse(e)}}catch(e){if(e instanceof Error){let t=e.message.match(/at line (\d+)/i);return t?{ok:!1,error:`Parse error at line ${t[1]}: ${e.message}`}:{ok:!1,error:e.message}}return{ok:!1,error:String(e)}}}var m=e(o()),h=`<?xml version="1.0" encoding="UTF-8"?>
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
</root>`,g=()=>{let{t:e}=s(),[r,o]=(0,f.useState)(h),[d,g]=(0,f.useState)(``),[_,v]=(0,f.useState)(),[y,b]=(0,f.useState)(!0),[x,S]=(0,f.useState)(!1),[C,w]=(0,f.useState)(!0);return(0,f.useEffect)(()=>{let e=p(r,{parseAttributes:y,explicitArray:x,coerceTypes:C});e.ok?(g(JSON.stringify(e.output,null,2)),v(void 0)):(g(``),v(e.error))},[r,y,x,C]),(0,m.jsx)(u,{leftPanel:(0,m.jsx)(l,{title:`XML`,value:r,onChange:o,language:`xml`}),centerPanel:(0,m.jsx)(c,{}),rightPanel:(0,m.jsx)(l,{title:`JSON`,value:d,language:`json`,readOnly:!0}),bottomPanel:(0,m.jsxs)(a,{sx:{p:2},children:[(0,m.jsxs)(a,{sx:{display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:[(0,m.jsx)(n,{control:(0,m.jsx)(t,{checked:y,onChange:e=>b(e.target.checked)}),label:e(`pages.xmlToJson.parseAttributes`)}),(0,m.jsx)(n,{control:(0,m.jsx)(t,{checked:x,onChange:e=>S(e.target.checked)}),label:e(`pages.xmlToJson.explicitArray`)}),(0,m.jsx)(n,{control:(0,m.jsx)(t,{checked:C,onChange:e=>w(e.target.checked)}),label:e(`pages.xmlToJson.coerceTypes`)})]}),_&&(0,m.jsx)(i,{severity:`error`,sx:{mt:2},children:_})]})})};export{g as default};