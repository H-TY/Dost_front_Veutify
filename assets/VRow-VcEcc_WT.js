import{p as d,m as f,n as g,q as y,G as p,s as w,e as N,I as P,b4 as E,bZ as L,bE as A}from"./index-DLRJN4FZ.js";const R=d({fluid:{type:Boolean,default:!1},...f(),...g()},"VContainer"),_=y()({name:"VContainer",props:R(),setup(t,s){let{slots:n}=s;const{rtlClasses:a}=p();return w(()=>N(t.tag,{class:["v-container",{"v-container--fluid":t.fluid},a.value,t.class],style:t.style},n)),{}}}),o=["start","end","center"],C=["space-between","space-around","space-evenly"];function i(t,s){return L.reduce((n,a)=>{const e=t+A(a);return n[e]=s(),n},{})}const h=[...o,"baseline","stretch"],V=t=>h.includes(t),m=i("align",()=>({type:String,default:null,validator:V})),G=[...o,...C],v=t=>G.includes(t),j=i("justify",()=>({type:String,default:null,validator:v})),I=[...o,...C,"stretch"],b=t=>I.includes(t),k=i("alignContent",()=>({type:String,default:null,validator:b})),u={align:Object.keys(m),justify:Object.keys(j),alignContent:Object.keys(k)},T={align:"align",justify:"justify",alignContent:"align-content"};function $(t,s,n){let a=T[t];if(n!=null){if(s){const e=s.replace(t,"");a+=`-${e}`}return a+=`-${n}`,a.toLowerCase()}}const O=d({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:V},...m,justify:{type:String,default:null,validator:v},...j,alignContent:{type:String,default:null,validator:b},...k,...f(),...g()},"VRow"),B=y()({name:"VRow",props:O(),setup(t,s){let{slots:n}=s;const a=P(()=>{const e=[];let l;for(l in u)u[l].forEach(c=>{const S=t[c],r=$(l,c,S);r&&e.push(r)});return e.push({"v-row--no-gutters":t.noGutters,"v-row--dense":t.dense,[`align-${t.align}`]:t.align,[`justify-${t.justify}`]:t.justify,[`align-content-${t.alignContent}`]:t.alignContent}),e});return()=>{var e;return E(t.tag,{class:["v-row",a.value,t.class],style:t.style},(e=n.default)==null?void 0:e.call(n))}}});export{_ as V,B as a};
