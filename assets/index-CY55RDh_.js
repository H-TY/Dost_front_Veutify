import{_ as y,I as j,o as i,j as h,w as e,e as t,f as a,d as x,F as v,h as L,a9 as w,u as D,V as o,as as S,a3 as f,a2 as l,g as V,l as k,at as A,X as M,au as P,a0 as I,a4 as $,a7 as F,a8 as Y,r as z,av as O}from"./index-BAIVBLcN.js";import{S as T,a as Z,P as q,N as Q}from"./pagination-eUp9WDdP.js";import{V as N,a as C}from"./VRow-RbgkkUBJ.js";import{V as g}from"./VCol-Dz4HUTzj.js";import{V as X}from"./VDivider-BSQRZDT2.js";const J=""+new URL("01_Dog_1280x720-DLOWzt7J.mp4",import.meta.url).href,K=["src"],W={__name:"bannerSwiper",setup(c){const r=[q,Q],u=j(()=>[{img:new URL(""+new URL("banner_01-DlQ9u58i.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("banner_02-DXK87R_v.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("banner_03-B65Ugju1.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("banner_04-h6dbNUSC.jpg",import.meta.url).href,import.meta.url).href}]);return(b,n)=>(i(),h(N,{fluid:"",class:"pa-0"},{default:e(()=>[t(a(T),{pagination:{dynamicBullets:!0},navigation:!0,modules:r,class:"mySwiper"},{default:e(()=>[(i(!0),x(v,null,L(a(u),(m,s)=>(i(),h(a(Z),{key:s},{default:e(()=>[w("img",{src:m.img},null,8,K)]),_:2},1024))),128))]),_:1})]),_:1}))}},E=y(W,[["__scopeId","data-v-feb66a39"]]),G={__name:"awardCard",props:["index"],setup(c){const{mobile:r}=D(),u=n=>{if(n===0)return"shadowColorA";if(n===1)return"shadowColorB";if(n===2)return"shadowColorC"},b=n=>{if(n===0)return"borderColorA";if(n===1)return"borderColorB";if(n===2)return"borderColorC"};return(n,m)=>(i(),h(o,{class:"bg-transparent pa-6"},{default:e(()=>[t(o,{class:"bg-transparent position-relative d-flex flex-column align-center justify-center cssSet"},{default:e(()=>[t(o,{class:"bg-transparent mb-1"},{default:e(()=>[S(n.$slots,"icon",{},()=>[f("預設 icon 位置")],!0)]),_:3}),t(o,{class:"bg-transparent overflow-hidden rounded-circle cssZindex",width:a(r)?220:300,height:a(r)?220:300},{default:e(()=>[S(n.$slots,"img",{},()=>[f("預設 img 位置")],!0)]),_:3},8,["width","height"]),t(o,{class:l(["shadowPosition",u(c.index)]),width:a(r)?102:120,height:a(r)?102:120},{default:e(()=>[t(o,{class:"bg-transparent namePosition"},{default:e(()=>[S(n.$slots,"dogName",{},()=>[f("預設 dogName 位置")],!0)]),_:3})]),_:3},8,["class","width","height"]),t(o,{class:l(["bg-transparent borderPosition",b(c.index)]),width:a(r)?250:330,height:a(r)?250:330},null,8,["class","width","height"])]),_:3})]),_:3}))}},H=y(G,[["__scopeId","data-v-07948a20"]]),ee={__name:"photoCard",setup(c){const r=[{cols:4},{cols:8,children:[{cols:12},{cols:12}]},{cols:6}],u=j(()=>[{img:new URL(""+new URL("active_img 01-Bz7SFT7j.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("active_img 02-hYyCyg7d.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("active_img 03-D2q59F3q.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("active_img 04-B_d9MgzD.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("active_img 05-BQvh8v9C.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("active_img 06-C6fu74SZ.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("active_img 07-TRcsYeIV.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("active_img 08-COA2VM9N.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("active_img 09-y6MZLhRn.jpg",import.meta.url).href,import.meta.url).href}]);return(b,n)=>(i(),h(C,{dense:""},{default:e(()=>[(i(),x(v,null,L(r,(m,s)=>(i(),x(v,{key:s},[t(g,{cols:m.cols,width:"500px",height:"300px"},{default:e(()=>[t(V,{src:a(u)[s].img,width:"100%",height:"100%",rounded:"lg",cover:""},null,8,["src"])]),_:2},1032,["cols"]),m.children?(i(),h(g,{key:0,class:"d-flex flex-column",cols:"6"},{default:e(()=>[t(C,{dense:""},{default:e(()=>[(i(!0),x(v,null,L(m.children,(R,p)=>(i(),h(g,{key:p,cols:R.cols,width:"500px",height:"300px"},{default:e(()=>[t(V,{src:a(u)[s+p+4].img,width:"100%",rounded:"lg",cover:""},null,8,["src"])]),_:2},1032,["cols"]))),128))]),_:2},1024)]),_:2},1024)):k("",!0)],64))),64))]),_:1}))}},te=c=>(F("data-v-eade4945"),c=c(),Y(),c),re=["src"],ae=te(()=>w("video",{class:"w-100 rounded-xl",controls:""},[w("source",{src:J,type:"video/mp4"}),f(" Your browser does not support the video tag. ")],-1)),se={__name:"index",setup(c){const{mobile:r}=D(),{backApi:u}=O(),b=A([]);M(async()=>{try{const s=z(new Date),R=j(()=>{const _=s.value.getFullYear().toString(),U=(s.value.getMonth()+1).toString().length>1?(s.value.getMonth()+1).toString():(s.value.getMonth()+1).toString().toString().padStart(2,"0");return _+U}),{data:p}=await u.get("/order/topOrder",{params:{reNowDate:R.value}},{timeout:10});console.log("data.result",p.result);const d=p.result.map(_=>({dogName:_.dogName,img:_.image,counter:_.counter})).sort((_,U)=>U.counter-_.counter),[B]=d.splice(1,1);d.unshift(B),b.push(...d)}catch(s){console.log("請求訂單最多的前 3 名狗狗_error",s)}});const n=s=>{if(s===0)return"crownColorA";if(s===1)return"crownColorB";if(s===2)return"crownColorC"},m=s=>s===1?"mobileCrownPositionA":"mobileCrownPositionB";return(s,R)=>(i(),h(N,{fluid:"",class:"pa-0"},{default:e(()=>[t(o,{class:"bg-transparent"},{default:e(()=>[t(E)]),_:1}),t(o,{class:"justify-center bg-transparent my-12 px-10"},{default:e(()=>[t(o,{class:l(["text-center font-weight-black bg-transparent my-12",a(r)?"text-h4":"text-h3"])},{default:e(()=>[f("人氣狗狗大集合！")]),_:1},8,["class"]),t(C,{class:l(a(r)?"":"mt-5")},{default:e(()=>[(i(!0),x(v,null,L(b,(p,d)=>(i(),h(g,{class:l(["d-flex justify-center",a(r)?"my-5":""]),key:d},{default:e(()=>[t(H,{index:d},{icon:e(()=>[t(I,{class:l([n(d),a(r)?m(d):""]),icon:"mdi-crown"},null,8,["class"])]),dogName:e(()=>[w("p",{class:l(["awardTextCss",a(r)?"text-h6":"text-h5"])},$(p.dogName),3)]),img:e(()=>[w("img",{src:p.img,class:"h-100"},null,8,re)]),_:2},1032,["index"])]),_:2},1032,["class"]))),128))]),_:1},8,["class"])]),_:1}),t(X,{class:"my-10 w-80 mx-auto"}),t(o,{class:"bg-transparent px-10"},{default:e(()=>[t(o,{class:l(["text-center font-weight-black bg-transparent my-12",a(r)?"text-h4":"text-h3"])},{default:e(()=>[f(" 狗狗生活札記 ")]),_:1},8,["class"]),t(o,{class:"bg-transparent d-flex pa-0"},{default:e(()=>[t(C,null,{default:e(()=>[t(g,{cols:"12",sm:"5",class:l(["pa-0 d-flex",a(r)?"pa-3 justify-center":"pa-0 pe-7 align-center"])},{default:e(()=>[t(o,{class:"bg-transparent d-flex flex-column"},{default:e(()=>[w("h1",{class:l(["mb-3 text-center",a(r)?"text-h5":"text-h4"])},"可愛影片～療癒身心～",2),f(" 大等西加，走突這不一說害遠雲然我看急行政足沒，氣專陽們藝來接怎出工力；下去那從立，後它家備。我易預完麼關全不態花內手智列手古衣的三實人是爸選聲。線政裡開到何法成去步全度車商己能親國一這使愛樂題有了……配來怎！間的光你？玩用節子集講初般情來界法引！ ")]),_:1})]),_:1},8,["class"]),t(g,{cols:"12",sm:"7",class:"pa-0"},{default:e(()=>[t(P,{"aspect-ratio":"16/9"},{default:e(()=>[ae]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),t(o,{class:"bg-transparent px-10 my-13"},{default:e(()=>[t(C,{class:l(["d-flex",a(r)?"flex-column-reverse":""])},{default:e(()=>[t(g,{cols:"12",sm:"7",class:"pa-0"},{default:e(()=>[t(o,{class:"bg-transparent"},{default:e(()=>[t(ee)]),_:1})]),_:1}),t(g,{cols:"12",sm:"5",class:l(["position-relative pa-0 d-flex mt-5",a(r)?"pa-3 justify-center":"pa-0 ps-7 align-center"])},{default:e(()=>[t(o,{class:"bg-transparent d-flex flex-column"},{default:e(()=>[w("h1",{class:l(["mb-3 text-center",a(r)?"text-h5":"text-h4"])},"滿滿的精采歡樂回憶！",2),f(" 大等西加，走突這不一說害遠雲然我看急行政足沒，氣專陽們藝來接怎出工力；下去那從立，後它家備。我易預完麼關全不態花內手智列手古衣的三實人是爸選聲。線政裡開到何法成去步全度車商己能親國一這使愛樂題有了……配來怎！間的光你？玩用節子集講初般情來界法引！ ")]),_:1})]),_:1},8,["class"])]),_:1},8,["class"])]),_:1})]),_:1}))}},ue=y(se,[["__scopeId","data-v-eade4945"]]);export{ue as default};