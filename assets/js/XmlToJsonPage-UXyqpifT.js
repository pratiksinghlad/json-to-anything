import{a as e}from"./rolldown-runtime-CaomFzHi.js";import{$ as t,L as n,M as r,W as i,Z as a,z as o}from"./mui-vendor-gRKrnwp_.js";import{c as s}from"./react-vendor-B_HR4xDK.js";import"./Header-CCc8uwyn.js";import{n as c,r as l,t as u}from"./JsonEditorLayout-DreqIIfW.js";import{i as d}from"./vendor-Dhg1wUZS.js";var f=e(t());function p(e,t){if(!e||e.trim()===``)return{ok:!1,error:`Input is empty`};let n=t?.parseAttributes??!0,r=t?.explicitArray??!1,i=t?.coerceTypes??!0;try{let t={ignoreAttributes:!n,attributeNamePrefix:`@_`,textNodeName:`#text`,parseTagValue:i,parseAttributeValue:i,trimValues:!0,processEntities:!0,allowBooleanAttributes:!0};return r&&(t.isArray=()=>!0),{ok:!0,output:new d(t).parse(e)}}catch(e){if(e instanceof Error){let t=e.message.match(/at line (\d+)/i);return t?{ok:!1,error:`Parse error at line ${t[1]}: ${e.message}`}:{ok:!1,error:e.message}}return{ok:!1,error:String(e)}}}var m=e(a()),h=`<?xml version="1.0" encoding="UTF-8"?>
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
</root>`,g=()=>{let{t:e}=s(),[t,a]=(0,f.useState)(h),[d,g]=(0,f.useState)(``),[_,v]=(0,f.useState)(),[y,b]=(0,f.useState)(!0),[x,S]=(0,f.useState)(!1),[C,w]=(0,f.useState)(!0);return(0,f.useEffect)(()=>{let e=p(t,{parseAttributes:y,explicitArray:x,coerceTypes:C});e.ok?(g(JSON.stringify(e.output,null,2)),v(void 0)):(g(``),v(e.error))},[t,y,x,C]),(0,m.jsx)(u,{leftPanel:(0,m.jsx)(l,{title:e(`common.xml`),value:t,onChange:a,language:`xml`}),centerPanel:(0,m.jsx)(c,{}),rightPanel:(0,m.jsx)(l,{title:e(`common.json`),value:d,language:`json`,readOnly:!0}),bottomPanel:(0,m.jsxs)(o,{sx:{p:2},children:[(0,m.jsxs)(o,{sx:{display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:[(0,m.jsx)(r,{control:(0,m.jsx)(n,{checked:y,onChange:e=>b(e.target.checked)}),label:e(`pages.xmlToJson.parseAttributes`)}),(0,m.jsx)(r,{control:(0,m.jsx)(n,{checked:x,onChange:e=>S(e.target.checked)}),label:e(`pages.xmlToJson.explicitArray`)}),(0,m.jsx)(r,{control:(0,m.jsx)(n,{checked:C,onChange:e=>w(e.target.checked)}),label:e(`pages.xmlToJson.coerceTypes`)})]}),_&&(0,m.jsx)(i,{severity:`error`,sx:{mt:2},children:_})]})})};export{g as default};