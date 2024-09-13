import{p as P,m as Z,n as G,q as z,s as E,e as a,t as se,v as ne,x as ie,y as re,z as ce,A as j,B as ue,C as de,D as fe,E as ge,G as ye,H as B,I as r,J as _e,f as $,K as q,L as A,M as we,r as W,N as ke,O as F,P as Ve,Q as Se,R as ve,S as Te,T as me,U as he,W as pe,X as xe,Y as Be,k as y,Z as Ie,_ as Ce,u as Ne,a as He,b as Le,i as Pe,c as Ae,o as i,d as N,w as o,h as k,j as p,$ as te,a0 as ae,l as S,a1 as je,F as H,g as U,a2 as w,a3 as Q,a4 as ze,a5 as Ee,a6 as Re,a7 as De,a8 as J}from"./index-DR4J8uSa.js";import{V as Y}from"./VContainer-N-qNy2n_.js";import{V as L}from"./VRow-CV4hNakP.js";import{V as v}from"./VCol-CNbG2IYV.js";import{u as Fe,a as le,V as M}from"./VList-CbmMDPoF.js";import{V as O}from"./VDivider-CyimJLSa.js";import{V as Ue,a as Me}from"./VNavigationDrawer-C8tWYMEt.js";const Oe=P({text:String,...Z(),...G()},"VToolbarTitle"),$e=z()({name:"VToolbarTitle",props:Oe(),setup(e,g){let{slots:t}=g;return E(()=>{const m=!!(t.default||t.text||e.text);return a(e.tag,{class:["v-toolbar-title",e.class],style:e.style},{default:()=>{var u;return[m&&a("div",{class:"v-toolbar-title__placeholder"},[t.text?t.text():e.text,(u=t.default)==null?void 0:u.call(t)])]}})}),{}}}),We=[null,"prominent","default","comfortable","compact"],be=P({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>We.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...se(),...Z(),...ne(),...ie(),...G({tag:"header"}),...re()},"VToolbar"),oe=z()({name:"VToolbar",props:be(),setup(e,g){var b;let{slots:t}=g;const{backgroundColorClasses:m,backgroundColorStyles:u}=ce(j(e,"color")),{borderClasses:s}=ue(e),{elevationClasses:d}=de(e),{roundedClasses:c}=fe(e),{themeClasses:_}=ge(e),{rtlClasses:V}=ye(),f=B(!!(e.extended||(b=t.extension)!=null&&b.call(t))),h=r(()=>parseInt(Number(e.height)+(e.density==="prominent"?Number(e.height):0)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0),10)),x=r(()=>f.value?parseInt(Number(e.extensionHeight)+(e.density==="prominent"?Number(e.extensionHeight):0)-(e.density==="comfortable"?4:0)-(e.density==="compact"?8:0),10):0);return _e({VBtn:{variant:"text"}}),E(()=>{var R;const l=!!(e.title||t.title),T=!!(t.image||e.image),C=(R=t.extension)==null?void 0:R.call(t);return f.value=!!(e.extended||C),a(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},m.value,s.value,d.value,c.value,_.value,V.value,e.class],style:[u.value,e.style]},{default:()=>[T&&a("div",{key:"image",class:"v-toolbar__image"},[t.image?a(q,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},t.image):a($,{key:"image-img",cover:!0,src:e.image},null)]),a(q,{defaults:{VTabs:{height:A(h.value)}}},{default:()=>{var D,n,I;return[a("div",{class:"v-toolbar__content",style:{height:A(h.value)}},[t.prepend&&a("div",{class:"v-toolbar__prepend"},[(D=t.prepend)==null?void 0:D.call(t)]),l&&a($e,{key:"title",text:e.title},{text:t.title}),(n=t.default)==null?void 0:n.call(t),t.append&&a("div",{class:"v-toolbar__append"},[(I=t.append)==null?void 0:I.call(t)])])]}}),a(q,{defaults:{VTabs:{height:A(x.value)}}},{default:()=>[a(we,null,{default:()=>[f.value&&a("div",{class:"v-toolbar__extension",style:{height:A(x.value)}},[C])]})]})]})}),{contentHeight:h,extensionHeight:x}}}),qe=P({scrollTarget:{type:String},scrollThreshold:{type:[String,Number],default:300}},"scroll");function Qe(e){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{canScroll:t}=g;let m=0,u=0;const s=W(null),d=B(0),c=B(0),_=B(0),V=B(!1),f=B(!1),h=r(()=>Number(e.scrollThreshold)),x=r(()=>ke((h.value-d.value)/h.value||0)),b=()=>{const l=s.value;if(!l||t&&!t.value)return;m=d.value,d.value="window"in l?l.pageYOffset:l.scrollTop;const T=l instanceof Window?document.documentElement.scrollHeight:l.scrollHeight;if(u!==T){u=T;return}f.value=d.value<m,_.value=Math.abs(d.value-h.value)};return F(f,()=>{c.value=c.value||d.value}),F(V,()=>{c.value=0}),Ve(()=>{F(()=>e.scrollTarget,l=>{var C;const T=l?document.querySelector(l):window;T&&T!==s.value&&((C=s.value)==null||C.removeEventListener("scroll",b),s.value=T,s.value.addEventListener("scroll",b,{passive:!0}))},{immediate:!0})}),Se(()=>{var l;(l=s.value)==null||l.removeEventListener("scroll",b)}),t&&F(t,b,{immediate:!0}),{scrollThreshold:h,currentScroll:d,currentThreshold:_,isScrollActive:V,scrollRatio:x,isScrollingUp:f,savedScroll:c}}const Ye=P({scrollBehavior:String,modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...be(),...ve(),...qe(),height:{type:[Number,String],default:64}},"VAppBar"),Ze=z()({name:"VAppBar",props:Ye(),emits:{"update:modelValue":e=>!0},setup(e,g){let{slots:t}=g;const m=W(),u=Te(e,"modelValue"),s=r(()=>{var I;const n=new Set(((I=e.scrollBehavior)==null?void 0:I.split(" "))??[]);return{hide:n.has("hide"),fullyHide:n.has("fully-hide"),inverted:n.has("inverted"),collapse:n.has("collapse"),elevate:n.has("elevate"),fadeImage:n.has("fade-image")}}),d=r(()=>{const n=s.value;return n.hide||n.fullyHide||n.inverted||n.collapse||n.elevate||n.fadeImage||!u.value}),{currentScroll:c,scrollThreshold:_,isScrollingUp:V,scrollRatio:f}=Qe(e,{canScroll:d}),h=r(()=>s.value.hide||s.value.fullyHide),x=r(()=>e.collapse||s.value.collapse&&(s.value.inverted?f.value>0:f.value===0)),b=r(()=>e.flat||s.value.fullyHide&&!u.value||s.value.elevate&&(s.value.inverted?c.value>0:c.value===0)),l=r(()=>s.value.fadeImage?s.value.inverted?1-f.value:f.value:void 0),T=r(()=>{var X,ee;const n=Number(((X=m.value)==null?void 0:X.contentHeight)??e.height),I=Number(((ee=m.value)==null?void 0:ee.extensionHeight)??0);return h.value?c.value<_.value||s.value.fullyHide?n+I:n:n+I});me(r(()=>!!e.scrollBehavior),()=>{xe(()=>{h.value?s.value.inverted?u.value=c.value>_.value:u.value=V.value||c.value<_.value:u.value=!0})});const{ssrBootStyles:C}=Fe(),{layoutItemStyles:R,layoutIsReady:D}=he({id:e.name,order:r(()=>parseInt(e.order,10)),position:j(e,"location"),layoutSize:T,elementSize:B(void 0),active:u,absolute:j(e,"absolute")});return E(()=>{const n=oe.filterProps(e);return a(oe,pe({ref:m,class:["v-app-bar",{"v-app-bar--bottom":e.location==="bottom"},e.class],style:[{...R.value,"--v-toolbar-image-opacity":l.value,height:void 0,...C.value},e.style]},n,{collapse:x.value,flat:b.value}),t)}),D}}),Ge=P({...Be({icon:"$menu",variant:"text"})},"VAppBarNavIcon"),Je=z()({name:"VAppBarNavIcon",props:Ge(),setup(e,g){let{slots:t}=g;return E(()=>a(y,pe(e,{class:["v-app-bar-nav-icon"]}),t)),{}}}),Ke=P({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...se(),...Z(),...ne(),...ve(),...ie(),...G({tag:"footer"}),...re()},"VFooter"),Xe=z()({name:"VFooter",props:Ke(),setup(e,g){let{slots:t}=g;const m=W(),u=B(),{themeClasses:s}=ge(e),{backgroundColorClasses:d,backgroundColorStyles:c}=ce(j(e,"color")),{borderClasses:_}=ue(e),{elevationClasses:V}=de(e),{roundedClasses:f}=fe(e),h=B(32),{resizeRef:x}=Ie(l=>{l.length&&(h.value=l[0].target.clientHeight)}),b=r(()=>e.height==="auto"?h.value:parseInt(e.height,10));return me(()=>e.app,()=>{const l=he({id:e.name,order:r(()=>parseInt(e.order,10)),position:r(()=>"bottom"),layoutSize:b,elementSize:r(()=>e.height==="auto"?void 0:b.value),active:r(()=>e.app),absolute:j(e,"absolute")});xe(()=>{m.value=l.layoutItemStyles.value,u.value=l.layoutIsReady})}),E(()=>a(e.tag,{ref:x,class:["v-footer",s.value,d.value,_.value,V.value,f.value,e.class],style:[c.value,e.app?m.value:{height:A(e.height)},e.style]},t)),e.app?u.value:{}}}),et=""+new URL("Dost_QRcode-_lffaLWz.png",import.meta.url).href,K=e=>(Re("data-v-d7a722db"),e=e(),De(),e),tt=K(()=>J("strong",null,"期末專題作業",-1)),at=K(()=>J("a",{href:"https://unsplash.com/",class:"text-decoration-none text-subtitle-1 font-weight-black acolor",target:"_blank"},"unsplash",-1)),lt=K(()=>J("a",{href:"https://www.freepik.com/",class:"text-decoration-none text-subtitle-1 font-weight-black acolor",target:"_blank"},"Freepik",-1)),ot={__name:"default",setup(e){const{mobile:g}=Ne(),t=He(),m=Le(),u=Pe(),s=W(!1),d=r(()=>({to:"/",img:new URL(""+new URL("Dost_logo-CIekf1rM.png",import.meta.url).href,import.meta.url).href})),c=r(()=>({to:"/cart",text:"購物車",icon:"mdi-cart-variant"})),_=r(()=>[{to:"/",text:"About Me",icon:"mdi-alpha-d-box",show:t.isLogin||!t.isLogin},{to:"/coolDogs",text:"帥氣狗狗",icon:"mdi-dog",show:t.isLogin||!t.isLogin},{to:"/booking",text:"預約時間",icon:"mdi-calendar-clock",show:t.isLogin||!t.isLogin},{to:"/test",text:"狗狗適性測驗",icon:"mdi-dog-side",show:t.isLogin||!t.isLogin},{to:"/shop",text:"寵物用品",icon:"mdi-store",show:t.isLogin||!t.isLogin},{to:"/userZone",text:"會員專區",icon:"mdi-account-box",show:t.isLogin&&!t.isAdmin},{to:"/admin",text:"管理區",icon:"mdi-account-tie",show:t.isLogin&&t.isAdmin}]),V=r(()=>[{to:"/register",text:"註冊",icon:"mdi-account-plus",show:!t.isLogin&&!t.isAdmin},{to:"/login",text:"登入",icon:"mdi-account-circle",show:!t.isLogin&&!t.isAdmin}]),f=async()=>(await t.logout(),u({text:"登出成功",snackbarProps:{color:"green"}}),m.push("/"));return(h,x)=>{const b=Ae("router-view");return i(),N(H,null,[a(Ze,{class:"bg-light-blue-darken-4 align-center",height:k(g)===!0?"120":"190"},{default:o(()=>[k(g)?(i(),p(Y,{key:0,class:"py-0 px-8"},{default:o(()=>[a(L,null,{default:o(()=>[a(v,{class:"d-flex justify-star align-center"},{default:o(()=>[a(y,{class:"bg-white rounded-circle",color:"white",to:d.value.to,variant:"text",ripple:!1,size:"60"},{default:o(()=>[a($,{src:d.value.img,width:"40"},null,8,["src"])]),_:1},8,["to"])]),_:1}),k(t).cart>0?(i(),p(y,{key:0,class:"",position:"fixed",location:"center",to:c.value.to,variant:"flat",ripple:!1,color:"transparent"},{default:o(()=>[c.value.to==="/cart"&&k(t).cart>0?(i(),p(te,{key:0,"offset-x":"2","offset-y":"2",color:"pink-lighten-1",content:k(t).cart},{default:o(()=>[a(ae,{class:"bg-white rounded-circle text-h5",size:"46",color:"pink-lighten-1",icon:c.value.icon},null,8,["icon"])]),_:1},8,["content"])):S("",!0)]),_:1},8,["to"])):S("",!0),a(v,{class:"d-flex justify-end align-center"},{default:o(()=>[a(Je,{onClick:x[0]||(x[0]=je(l=>s.value=!s.value,["stop"]))})]),_:1})]),_:1})]),_:1})):(i(),p(Y,{key:1,class:"pt-0 pa-0 w-100 h-100"},{default:o(()=>[a(L,{class:"pt-5 w-100"},{default:o(()=>[a(v,{class:"d-flex justify-center align-center"},{default:o(()=>[a(y,{class:"bg-white rounded-circle",color:"white",to:d.value.to,ripple:!1,size:"100"},{default:o(()=>[a($,{class:"opacity-100",src:d.value.img,width:"70",cover:""},null,8,["src"])]),_:1},8,["to"])]),_:1})]),_:1}),a(L,{class:"mt-5 ma-0 rounded flex-nowrap"},{default:o(()=>[a(v,{class:"pa-0 d-flex justify-center align-center"},{default:o(()=>[(i(!0),N(H,null,U(_.value,l=>(i(),N(H,{key:l.to},[l.show?(i(),p(y,{key:0,class:"px-0",width:"150","prepend-icon":l.icon,to:l.to,variant:"plain",ripple:!1},{default:o(()=>[w(Q(l.text),1)]),_:2},1032,["prepend-icon","to"])):S("",!0)],64))),128)),a(v,{class:"pa-0 d-flex d-flex justify-center align-center"},{default:o(()=>[w("|")]),_:1}),a(L,null,{default:o(()=>[a(v,{class:"pa-0 d-flex flex-nowrap justify-center align-center h-100",width:"100"},{default:o(()=>[(i(!0),N(H,null,U(V.value,l=>(i(),p(v,{key:l.to,class:"d-flex justify-center align-center pa-0 px-2"},{default:o(()=>[l.show?(i(),p(y,{key:0,"prepend-icon":l.icon,to:l.to,class:ze(["pa-0",l.text=="登入"?"bg-green text-light-green-lighten-5":"bg-white text-green"]),width:"100px",variant:" ",rounded:"",ripple:!1},{default:o(()=>[w(Q(l.text),1)]),_:2},1032,["prepend-icon","to","class"])):S("",!0)]),_:2},1024))),128))]),_:1})]),_:1}),k(t).isLogin?(i(),p(y,{key:0,class:"bg-deep-orange-darken-2","prepend-icon":"mdi-account-arrow-right",variant:" ",rounded:"",ripple:!1,onClick:f},{default:o(()=>[w("登出")]),_:1})):S("",!0)]),_:1})]),_:1}),k(t).cart>0?(i(),p(y,{key:0,class:"me-4",position:"fixed",location:"right",to:c.value.to,variant:"flat",ripple:!1,color:"transparent"},{default:o(()=>[c.value.to==="/cart"&&k(t).cart>0?(i(),p(te,{key:0,"offset-x":"2","offset-y":"2",color:"pink-lighten-1",content:k(t).cart},{default:o(()=>[a(ae,{class:"bg-white rounded-circle text-h5",size:"46",color:"pink-lighten-1",icon:c.value.icon},null,8,["icon"])]),_:1},8,["content"])):S("",!0)]),_:1},8,["to"])):S("",!0)]),_:1}))]),_:1},8,["height"]),k(g)?(i(),p(Ue,{key:0,modelValue:s.value,"onUpdate:modelValue":x[1]||(x[1]=l=>s.value=l)},{default:o(()=>[a(le,{nav:""},{default:o(()=>[(i(!0),N(H,null,U(_.value,l=>(i(),N(H,{key:l.to},[l.show?(i(),p(M,{key:0,class:"px-10","prepend-icon":l.icon,to:l.to,title:l.text},null,8,["prepend-icon","to","title"])):S("",!0)],64))),128)),a(O,{class:"my-4"}),a(L,null,{default:o(()=>[(i(!0),N(H,null,U(V.value,l=>(i(),p(v,{key:l.to,class:"d-flex justify-center align-center"},{default:o(()=>[l.show?(i(),p(y,{key:0,"prepend-icon":l.icon,to:l.to,variant:"plain",ripple:!1},{default:o(()=>[w(Q(l.text),1)]),_:2},1032,["prepend-icon","to"])):S("",!0)]),_:2},1024))),128))]),_:1}),a(v,{class:"d-flex justify-center"},{default:o(()=>[k(t).isLogin?(i(),p(y,{key:0,class:"bg-deep-orange-darken-2","prepend-icon":"mdi-account-arrow-right",variant:"outlined",rounded:"",ripple:!1,onClick:f},{default:o(()=>[w("登出")]),_:1})):S("",!0)]),_:1})]),_:1})]),_:1},8,["modelValue"])):S("",!0),a(Me,null,{default:o(()=>[a(b)]),_:1}),a(Xe,{class:"bg-light-blue-darken-4 flex-column flex-grow-0 px-10",height:k(g)===!0?"48%":"22%"},{default:o(()=>[a(Y,{class:"pa-0",fluid:""},{default:o(()=>[a(L,{class:"d-flex ma-0 mt-4 ga-6 ga-sm-0"},{default:o(()=>[a(v,{cols:"12",sm:"4",class:"d-flex justify-sm-start pa-0 px-xs-12"},{default:o(()=>[a(v,{cols:"3",class:"d-flex text-start text-subtitle-2 align-center pa-0",style:{"max-width":"80px"}},{default:o(()=>[a($,{src:et,class:"rounded-lg border-solid border-xl bg-white","max-width":"60px","max-height":"60px"})]),_:1}),a(v,{class:"text-subtitle-2 align-content-center pa-0"},{default:o(()=>[a(le,{class:"bg-transparent d-flex flex-column text-caption text-sm-start text-end"},{default:o(()=>[a(M,{class:"pa-0","min-height":"0"},{default:o(()=>[w("DOST")]),_:1}),a(M,{class:"pa-0","min-height":"0"},{default:o(()=>[w("02-1234 1234")]),_:1}),a(M,{class:"pa-0","min-height":"0"},{default:o(()=>[w("243新北市泰山區貴子里致遠新村55之1號")]),_:1})]),_:1})]),_:1})]),_:1}),a(v,{cols:"12",sm:"4",class:"text-end text-subtitle-2 d-flex align-content-center justify-space-around ga-7 gap-sm-1 pa-0 px-xs-12 px-sm-12"},{default:o(()=>[a(O,{class:"align-self-center d-sm-none cdivider"}),a(y,{class:"align-self-center",icon:"mdi-facebook",color:"light-blue"}),a(y,{class:"align-self-center",icon:"mdi-twitter",color:"light-blue"}),a(y,{class:"align-self-center",icon:"mdi-youtube",color:"light-blue"}),a(O,{class:"align-self-center d-sm-none cdivider"})]),_:1}),a(v,{cols:"12",sm:"4",class:"text-subtitle-2 justify-end align-content-center d-flex flex-nowrap pa-0 px-xs-12","max-width":"300px"},{default:o(()=>[a(Ee,{class:"ms-sm-10","max-width":"400px",placeholder:"Enter your e-mail to subscription",type:"input","prepend-inner-icon":"mdi-email",clearable:""}),a(y,{class:"align-self-center ms-5"},{default:o(()=>[w("訂閱")]),_:1})]),_:1})]),_:1}),a(O,{class:"w-100 my-4"}),a(L,{class:"text-center ma-0"},{default:o(()=>[a(v,{class:"text-subtitle-2 align-content-center pa-0 text-sm-start",cols:"12",sm:"6"},{default:o(()=>[w(" 2024 / 8 / 27　前端網頁設計課程 — "),tt]),_:1}),a(v,{class:"text-subtitle-2 align-content-center pa-0 text-sm-end",cols:"12",sm:"6"},{default:o(()=>[w(" 資料、圖片、影片來源： "),at,w(" ｜ "),lt]),_:1})]),_:1})]),_:1})]),_:1},8,["height"])],64)}}},ft=Ce(ot,[["__scopeId","data-v-d7a722db"]]);export{ft as default};