import{p as b,n as p,v as S,y as V,I as k,b4 as w,bZ as E,bE as L}from"./index-Bpng_Fgk.js";const o=["start","end","center"],g=["space-between","space-around","space-evenly"];function i(t,s){return E.reduce((e,a)=>{const n=t+L(a);return e[n]=s(),e},{})}const N=[...o,"baseline","stretch"],d=t=>N.includes(t),f=i("align",()=>({type:String,default:null,validator:d})),P=[...o,...g],y=t=>P.includes(t),C=i("justify",()=>({type:String,default:null,validator:y})),A=[...o,...g,"stretch"],j=t=>A.includes(t),m=i("alignContent",()=>({type:String,default:null,validator:j})),u={align:Object.keys(f),justify:Object.keys(C),alignContent:Object.keys(m)},h={align:"align",justify:"justify",alignContent:"align-content"};function G(t,s,e){let a=h[t];if(e!=null){if(s){const n=s.replace(t,"");a+=`-${n}`}return a+=`-${e}`,a.toLowerCase()}}const I=b({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d},...f,justify:{type:String,default:null,validator:y},...C,alignContent:{type:String,default:null,validator:j},...m,...p(),...S()},"VRow"),T=V()({name:"VRow",props:I(),setup(t,s){let{slots:e}=s;const a=k(()=>{const n=[];let l;for(l in u)u[l].forEach(c=>{const v=t[c],r=G(l,c,v);r&&n.push(r)});return n.push({"v-row--no-gutters":t.noGutters,"v-row--dense":t.dense,[`align-${t.align}`]:t.align,[`justify-${t.justify}`]:t.justify,[`align-content-${t.alignContent}`]:t.alignContent}),n});return()=>{var n;return w(t.tag,{class:["v-row",a.value,t.class],style:t.style},(n=e.default)==null?void 0:n.call(e))}}});export{T as V};
