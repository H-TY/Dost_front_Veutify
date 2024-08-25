import{p as L,n as Q,q as X,s as z,t as M,e as l,v as ae,x as le,y as oe,z as ne,A as se,B as $,C as re,D as ie,E as ue,G as ce,H as de,I as N,J as u,K as ve,g as q,L as R,M as j,N as fe,r as O,O as ge,w as D,P as me,Q as he,R as pe,S as ye,T as xe,U as be,W as ee,X as _e,Y as ke,l as w,_ as we,u as Ve,a as Se,b as Te,i as Be,c as Ce,o as r,d as C,f as o,j as b,k as f,Z,$ as G,m as _,a0 as Ie,F as I,h as U,a1 as P,a2 as F,a3 as Ne}from"./index-Bo41hmNo.js";import{V as J}from"./VContainer-Bgf_6l1B.js";import{V as H}from"./VRow-gZ5tCjm5.js";import{V as S}from"./VCol-Cz6DkMcF.js";import{u as Pe,a as He,V as Le}from"./VList-BDrd91hs.js";import{V as Ae}from"./VDivider-Bbq3jSFh.js";import{V as Ee,a as je}from"./VNavigationDrawer-Ba8Dx2Am.js";const De=L({text:String,...Q(),...X()},"VToolbarTitle"),Ue=z()({name:"VToolbarTitle",props:De(),setup(t,g){let{slots:e}=g;return M(()=>{const m=!!(e.default||e.text||t.text);return l(t.tag,{class:["v-toolbar-title",t.class],style:t.style},{default:()=>{var c;return[m&&l("div",{class:"v-toolbar-title__placeholder"},[e.text?e.text():t.text,(c=e.default)==null?void 0:c.call(e)])]}})}),{}}}),ze=[null,"prominent","default","comfortable","compact"],te=L({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:t=>ze.includes(t)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...ae(),...Q(),...le(),...oe(),...X({tag:"header"}),...ne()},"VToolbar"),K=z()({name:"VToolbar",props:te(),setup(t,g){var x;let{slots:e}=g;const{backgroundColorClasses:m,backgroundColorStyles:c}=se($(t,"color")),{borderClasses:n}=re(t),{elevationClasses:d}=ie(t),{roundedClasses:i}=ue(t),{themeClasses:y}=ce(t),{rtlClasses:V}=de(),v=N(!!(t.extended||(x=e.extension)!=null&&x.call(e))),h=u(()=>parseInt(Number(t.height)+(t.density==="prominent"?Number(t.height):0)-(t.density==="comfortable"?8:0)-(t.density==="compact"?16:0),10)),p=u(()=>v.value?parseInt(Number(t.extensionHeight)+(t.density==="prominent"?Number(t.extensionHeight):0)-(t.density==="comfortable"?4:0)-(t.density==="compact"?8:0),10):0);return ve({VBtn:{variant:"text"}}),M(()=>{var A;const a=!!(t.title||e.title),k=!!(e.image||t.image),B=(A=e.extension)==null?void 0:A.call(e);return v.value=!!(t.extended||B),l(t.tag,{class:["v-toolbar",{"v-toolbar--absolute":t.absolute,"v-toolbar--collapse":t.collapse,"v-toolbar--flat":t.flat,"v-toolbar--floating":t.floating,[`v-toolbar--density-${t.density}`]:!0},m.value,n.value,d.value,i.value,y.value,V.value,t.class],style:[c.value,t.style]},{default:()=>[k&&l("div",{key:"image",class:"v-toolbar__image"},[e.image?l(R,{key:"image-defaults",disabled:!t.image,defaults:{VImg:{cover:!0,src:t.image}}},e.image):l(q,{key:"image-img",cover:!0,src:t.image},null)]),l(R,{defaults:{VTabs:{height:j(h.value)}}},{default:()=>{var E,s,T;return[l("div",{class:"v-toolbar__content",style:{height:j(h.value)}},[e.prepend&&l("div",{class:"v-toolbar__prepend"},[(E=e.prepend)==null?void 0:E.call(e)]),a&&l(Ue,{key:"title",text:t.title},{text:e.title}),(s=e.default)==null?void 0:s.call(e),e.append&&l("div",{class:"v-toolbar__append"},[(T=e.append)==null?void 0:T.call(e)])])]}}),l(R,{defaults:{VTabs:{height:j(p.value)}}},{default:()=>[l(fe,null,{default:()=>[v.value&&l("div",{class:"v-toolbar__extension",style:{height:j(p.value)}},[B])]})]})]})}),{contentHeight:h,extensionHeight:p}}}),Me=L({scrollTarget:{type:String},scrollThreshold:{type:[String,Number],default:300}},"scroll");function Re(t){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{canScroll:e}=g;let m=0,c=0;const n=O(null),d=N(0),i=N(0),y=N(0),V=N(!1),v=N(!1),h=u(()=>Number(t.scrollThreshold)),p=u(()=>ge((h.value-d.value)/h.value||0)),x=()=>{const a=n.value;if(!a||e&&!e.value)return;m=d.value,d.value="window"in a?a.pageYOffset:a.scrollTop;const k=a instanceof Window?document.documentElement.scrollHeight:a.scrollHeight;if(c!==k){c=k;return}v.value=d.value<m,y.value=Math.abs(d.value-h.value)};return D(v,()=>{i.value=i.value||d.value}),D(V,()=>{i.value=0}),me(()=>{D(()=>t.scrollTarget,a=>{var B;const k=a?document.querySelector(a):window;k&&k!==n.value&&((B=n.value)==null||B.removeEventListener("scroll",x),n.value=k,n.value.addEventListener("scroll",x,{passive:!0}))},{immediate:!0})}),he(()=>{var a;(a=n.value)==null||a.removeEventListener("scroll",x)}),e&&D(e,x,{immediate:!0}),{scrollThreshold:h,currentScroll:d,currentThreshold:y,isScrollActive:V,scrollRatio:p,isScrollingUp:v,savedScroll:i}}const Fe=L({scrollBehavior:String,modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:t=>["top","bottom"].includes(t)},...te(),...pe(),...Me(),height:{type:[Number,String],default:64}},"VAppBar"),$e=z()({name:"VAppBar",props:Fe(),emits:{"update:modelValue":t=>!0},setup(t,g){let{slots:e}=g;const m=O(),c=ye(t,"modelValue"),n=u(()=>{var T;const s=new Set(((T=t.scrollBehavior)==null?void 0:T.split(" "))??[]);return{hide:s.has("hide"),fullyHide:s.has("fully-hide"),inverted:s.has("inverted"),collapse:s.has("collapse"),elevate:s.has("elevate"),fadeImage:s.has("fade-image")}}),d=u(()=>{const s=n.value;return s.hide||s.fullyHide||s.inverted||s.collapse||s.elevate||s.fadeImage||!c.value}),{currentScroll:i,scrollThreshold:y,isScrollingUp:V,scrollRatio:v}=Re(t,{canScroll:d}),h=u(()=>n.value.hide||n.value.fullyHide),p=u(()=>t.collapse||n.value.collapse&&(n.value.inverted?v.value>0:v.value===0)),x=u(()=>t.flat||n.value.fullyHide&&!c.value||n.value.elevate&&(n.value.inverted?i.value>0:i.value===0)),a=u(()=>n.value.fadeImage?n.value.inverted?1-v.value:v.value:void 0),k=u(()=>{var W,Y;const s=Number(((W=m.value)==null?void 0:W.contentHeight)??t.height),T=Number(((Y=m.value)==null?void 0:Y.extensionHeight)??0);return h.value?i.value<y.value||n.value.fullyHide?s+T:s:s+T});xe(u(()=>!!t.scrollBehavior),()=>{_e(()=>{h.value?n.value.inverted?c.value=i.value>y.value:c.value=V.value||i.value<y.value:c.value=!0})});const{ssrBootStyles:B}=Pe(),{layoutItemStyles:A,layoutIsReady:E}=be({id:t.name,order:u(()=>parseInt(t.order,10)),position:$(t,"location"),layoutSize:k,elementSize:N(void 0),active:c,absolute:$(t,"absolute")});return M(()=>{const s=K.filterProps(t);return l(K,ee({ref:m,class:["v-app-bar",{"v-app-bar--bottom":t.location==="bottom"},t.class],style:[{...A.value,"--v-toolbar-image-opacity":a.value,height:void 0,...B.value},t.style]},s,{collapse:p.value,flat:x.value}),e)}),E}}),qe=L({...ke({icon:"$menu",variant:"text"})},"VAppBarNavIcon"),Oe=z()({name:"VAppBarNavIcon",props:qe(),setup(t,g){let{slots:e}=g;return M(()=>l(w,ee(t,{class:["v-app-bar-nav-icon"]}),e)),{}}}),We={__name:"default",setup(t){const{mobile:g}=Ve(),e=Se(),m=Te(),c=Be(),n=O(!1),d=u(()=>({to:"/",img:new URL(""+new URL("Dost_logo-CIekf1rM.png",import.meta.url).href,import.meta.url).href})),i=u(()=>({to:"/cart",text:"購物車",icon:"mdi-cart-variant"})),y=u(()=>[{to:"/about",text:"About Me",icon:"mdi-alpha-d-box",show:e.isLogin||!e.isLogin},{to:"/coolDogs",text:"帥氣狗狗",icon:"mdi-dog",show:e.isLogin||!e.isLogin},{to:"/booking",text:"預約時間",icon:"mdi-calendar-clock",show:e.isLogin||!e.isLogin},{to:"/test",text:"狗狗適性測驗",icon:"mdi-dog-side",show:e.isLogin||!e.isLogin},{to:"/shop",text:"寵物用品",icon:"mdi-store",show:e.isLogin||!e.isLogin},{to:"/userZone",text:"會員專區",icon:"mdi-account-box",show:e.isLogin&&!e.isAdmin},{to:"/admin",text:"管理區",icon:"mdi-account-tie",show:e.isLogin&&e.isAdmin}]),V=u(()=>[{to:"/register",text:"註冊",icon:"mdi-account-plus",show:!e.isLogin&&!e.isAdmin},{to:"/login",text:"登入",icon:"mdi-account-circle",show:!e.isLogin&&!e.isAdmin}]),v=async()=>(await e.logout(),c({text:"登出成功",snackbarProps:{color:"green"}}),m.push("/"));return(h,p)=>{const x=Ce("router-view");return r(),C(I,null,[l($e,{class:"bg-light-blue-darken-4 align-center",height:b(g)===!0?"120":"190"},{default:o(()=>[b(g)?(r(),f(J,{key:0,class:"py-0 px-8"},{default:o(()=>[l(H,null,{default:o(()=>[l(S,{class:"d-flex justify-star align-center"},{default:o(()=>[l(w,{class:"bg-white rounded-circle",to:d.value.to,variant:"text",ripple:!1,size:"60"},{default:o(()=>[l(q,{src:d.value.img,width:"40"},null,8,["src"])]),_:1},8,["to"])]),_:1}),b(e).cart>0?(r(),f(w,{key:0,class:"",position:"fixed",location:"center",to:i.value.to,variant:"flat",ripple:!1,color:"transparent"},{default:o(()=>[i.value.to==="/cart"&&b(e).cart>0?(r(),f(Z,{key:0,"offset-x":"2","offset-y":"2",color:"pink-lighten-1",content:b(e).cart},{default:o(()=>[l(G,{class:"bg-white rounded-circle text-h5",size:"46",color:"pink-lighten-1",icon:i.value.icon},null,8,["icon"])]),_:1},8,["content"])):_("",!0)]),_:1},8,["to"])):_("",!0),l(S,{class:"d-flex justify-end align-center"},{default:o(()=>[l(Oe,{onClick:p[0]||(p[0]=Ie(a=>n.value=!n.value,["stop"]))})]),_:1})]),_:1})]),_:1})):(r(),f(J,{key:1,class:"pt-0 pa-0 w-100 h-100"},{default:o(()=>[l(H,{class:"pt-5 w-100"},{default:o(()=>[l(S,{class:"d-flex justify-center align-center"},{default:o(()=>[l(w,{class:"bg-white rounded-circle",color:"white",to:d.value.to,ripple:!1,size:"100"},{default:o(()=>[l(q,{class:"opacity-100",src:d.value.img,width:"70",cover:""},null,8,["src"])]),_:1},8,["to"])]),_:1})]),_:1}),l(H,{class:"mt-5 ma-0 rounded flex-nowrap"},{default:o(()=>[l(S,{class:"pa-0 d-flex justify-center align-center"},{default:o(()=>[(r(!0),C(I,null,U(y.value,a=>(r(),C(I,{key:a.to},[a.show?(r(),f(w,{key:0,class:"px-0",width:"150","prepend-icon":a.icon,to:a.to,variant:"plain",ripple:!1},{default:o(()=>[P(F(a.text),1)]),_:2},1032,["prepend-icon","to"])):_("",!0)],64))),128)),l(S,{class:"pa-0 d-flex d-flex justify-center align-center"},{default:o(()=>[P("|")]),_:1}),l(H,null,{default:o(()=>[l(S,{class:"pa-0 d-flex flex-nowrap justify-center align-center h-100",width:"100"},{default:o(()=>[(r(!0),C(I,null,U(V.value,a=>(r(),f(S,{key:a.to,class:"d-flex justify-center align-center pa-0 px-2"},{default:o(()=>[a.show?(r(),f(w,{key:0,"prepend-icon":a.icon,to:a.to,class:Ne(["pa-0",a.text=="登入"?"bg-green text-light-green-lighten-5":"bg-white text-green"]),width:"100px",variant:" ",rounded:"",ripple:!1},{default:o(()=>[P(F(a.text),1)]),_:2},1032,["prepend-icon","to","class"])):_("",!0)]),_:2},1024))),128))]),_:1})]),_:1}),b(e).isLogin?(r(),f(w,{key:0,class:"bg-deep-orange-darken-2","prepend-icon":"mdi-account-arrow-right",variant:" ",rounded:"",ripple:!1,onClick:v},{default:o(()=>[P("登出")]),_:1})):_("",!0)]),_:1})]),_:1}),b(e).cart>0?(r(),f(w,{key:0,class:"me-4",position:"fixed",location:"right",to:i.value.to,variant:"flat",ripple:!1,color:"transparent"},{default:o(()=>[i.value.to==="/cart"&&b(e).cart>0?(r(),f(Z,{key:0,"offset-x":"2","offset-y":"2",color:"pink-lighten-1",content:b(e).cart},{default:o(()=>[l(G,{class:"bg-white rounded-circle text-h5",size:"46",color:"pink-lighten-1",icon:i.value.icon},null,8,["icon"])]),_:1},8,["content"])):_("",!0)]),_:1},8,["to"])):_("",!0)]),_:1}))]),_:1},8,["height"]),b(g)?(r(),f(Ee,{key:0,modelValue:n.value,"onUpdate:modelValue":p[1]||(p[1]=a=>n.value=a)},{default:o(()=>[l(He,{nav:""},{default:o(()=>[(r(!0),C(I,null,U(y.value,a=>(r(),C(I,{key:a.to},[a.show?(r(),f(Le,{key:0,class:"px-10","prepend-icon":a.icon,to:a.to,title:a.text},null,8,["prepend-icon","to","title"])):_("",!0)],64))),128)),l(Ae,{class:"my-4"}),l(H,null,{default:o(()=>[(r(!0),C(I,null,U(V.value,a=>(r(),f(S,{key:a.to,class:"d-flex justify-center align-center"},{default:o(()=>[a.show?(r(),f(w,{key:0,"prepend-icon":a.icon,to:a.to,variant:"plain",ripple:!1},{default:o(()=>[P(F(a.text),1)]),_:2},1032,["prepend-icon","to"])):_("",!0)]),_:2},1024))),128))]),_:1}),l(S,{class:"d-flex justify-center"},{default:o(()=>[b(e).isLogin?(r(),f(w,{key:0,"prepend-icon":"mdi-account-arrow-right",variant:"outlined",rounded:"",ripple:!1,onClick:v},{default:o(()=>[P("登出")]),_:1})):_("",!0)]),_:1})]),_:1})]),_:1},8,["modelValue"])):_("",!0),l(je,null,{default:o(()=>[l(x)]),_:1})],64)}}},et=we(We,[["__scopeId","data-v-89c131e0"]]);export{et as default};
