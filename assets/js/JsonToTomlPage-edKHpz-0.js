import{a as e}from"./rolldown-runtime-B589uzA9.js";import{et as t,ft as n,mt as r,rt as i,z as a}from"./mui-vendor-BI8racdd.js";import{l as o}from"./react-vendor-DltAUd6l.js";import{i as s,n as c,r as l,t as u}from"./useJsonEditorAccessibility-B3cpLX7Q.js";import{t as d}from"./ValidationResults-DFseO2jX.js";import{t as f}from"./isBlankInput-BFuadj8S.js";import{n as p}from"./jsonToCsv-DMJvoRcS.js";import{t as m}from"./useConverter-DtmCMhKP.js";var h=e(r(),1),g=n(),_=`{
  "server": {
    "host": "127.0.0.1",
    "port": 8080
  },
  "database": {
    "url": "postgres://user:pass@localhost/db",
    "max_connections": 100
  },
  "users": [
    {
      "id": 1,
      "name": "Pratik Singh Lad",
      "email": "pratik@example.com",
      "role": "engineer"
    },
    {
      "id": 2,
      "name": "Linus Torvalds",
      "email": "linus@example.com",
      "role": "creator"
    },
    {
      "id": 3,
      "name": "Alan Turing",
      "email": "alan@example.com",
      "role": "pioneer"
    }
  ]
}`,v=()=>{let{t:e}=o(),[n,r]=(0,h.useState)(_),[v,y]=(0,h.useState)(``),[b,x]=(0,h.useState)([]),{leftPanelRef:S,rightPanelRef:C}=u(),{convert:w,isProcessing:T}=m();return(0,h.useEffect)(()=>{if(f(n)){x([]),y(``);return}let e=!1;return(async()=>{try{JSON.parse(n)}catch(t){e||(x([{message:t instanceof Error?t.message:String(t)}]),y(``));return}let t=await w(n,`toml`);e||(t.ok?(y(t.output),x([])):(y(``),x([{message:t.error}])))})(),()=>{e=!0}},[n,w]),(0,g.jsx)(c,{leftPanel:(0,g.jsx)(s,{ref:S,title:e(`common.json`),value:n,onChange:r,language:`json`}),centerPanel:(0,g.jsx)(l,{}),rightPanel:(0,g.jsx)(s,{ref:C,title:`TOML`,value:v,language:`toml`,readOnly:!0}),bottomPanel:(0,g.jsxs)(t,{sx:{p:2},children:[T&&(0,g.jsxs)(t,{sx:{mb:2},children:[(0,g.jsx)(a,{}),(0,g.jsx)(i,{variant:`caption`,color:`text.secondary`,sx:{mt:.5},children:e(`pages.jsonToToon.processing`)})]}),(0,g.jsx)(d,{errors:b}),(0,g.jsx)(t,{sx:{mt:2,display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:(0,g.jsx)(p,{tomlData:v,jsonData:n,disabled:!v})})]})})};export{v as default};