import{g as I,e as K,c as W,S as N,a as O,P as G,N as ee}from"./pagination-Cks0c4jo.js";import{_ as k,I as q,o as b,j as L,w as a,e as s,h as S,d as Y,F,g as z,a8 as R,V as h,a2 as U,f as C,am as te}from"./index-DR4J8uSa.js";import{V as B}from"./VContainer-N-qNy2n_.js";import{V as P}from"./VRow-CV4hNakP.js";import{V as g}from"./VCol-CNbG2IYV.js";import{V as se}from"./VDivider-CyimJLSa.js";const ae=""+new URL("award_02_silver-BTjYJ4UV.png",import.meta.url).href,re=""+new URL("award_01_gold-C2Q-7F8O.png",import.meta.url).href,ne=""+new URL("award_03_copper-BYEHhieX.png",import.meta.url).href,ie=""+new URL("01_Dog_1280x720-DLOWzt7J.mp4",import.meta.url).href;function le(f){const{effect:e,swiper:t,on:c,setTranslate:m,setTransition:d,overwriteParams:i,perspective:l,recreateShadows:o,getEffectParams:r}=f;c("beforeInit",()=>{if(t.params.effect!==e)return;t.classNames.push(`${t.params.containerModifierClass}${e}`),l&&l()&&t.classNames.push(`${t.params.containerModifierClass}3d`);const w=i?i():{};Object.assign(t.params,w),Object.assign(t.originalParams,w)}),c("setTranslate",()=>{t.params.effect===e&&m()}),c("setTransition",(w,v)=>{t.params.effect===e&&d(v)}),c("transitionEnd",()=>{if(t.params.effect===e&&o){if(!r||!r().slideShadows)return;t.slides.forEach(w=>{w.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(v=>v.remove())}),o()}});let u;c("virtualUpdate",()=>{t.params.effect===e&&(t.slides.length||(u=!0),requestAnimationFrame(()=>{u&&t.slides&&t.slides.length&&(m(),u=!1)}))})}function oe(f,e){const t=I(e);return t!==e&&(t.style.backfaceVisibility="hidden",t.style["-webkit-backface-visibility"]="hidden"),t}function ce(f){let{swiper:e,duration:t,transformElements:c,allSlides:m}=f;const{activeIndex:d}=e,i=l=>l.parentElement?l.parentElement:e.slides.filter(r=>r.shadowRoot&&r.shadowRoot===l.parentNode)[0];if(e.params.virtualTranslate&&t!==0){let l=!1,o;m?o=c:o=c.filter(r=>{const u=r.classList.contains("swiper-slide-transform")?i(r):r;return e.getSlideIndex(u)===d}),o.forEach(r=>{K(r,()=>{if(l||!e||e.destroyed)return;l=!0,e.animating=!1;const u=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0});e.wrapperEl.dispatchEvent(u)})})}}function de(f,e,t){const c=`swiper-slide-shadow${` swiper-slide-shadow-${f}`}`,m=I(e);let d=m.querySelector(`.${c.split(" ").join(".")}`);return d||(d=W("div",c.split(" ")),m.append(d)),d}function fe(f){let{swiper:e,extendParams:t,on:c}=f;t({cardsEffect:{slideShadows:!0,rotate:!0,perSlideRotate:2,perSlideOffset:8}}),le({effect:"cards",swiper:e,on:c,setTranslate:()=>{const{slides:i,activeIndex:l,rtlTranslate:o}=e,r=e.params.cardsEffect,{startTranslate:u,isTouched:w}=e.touchEventsData,v=o?-e.translate:e.translate;for(let y=0;y<i.length;y+=1){const x=i[y],D=x.progress,n=Math.min(Math.max(D,-4),4);let T=x.swiperSlideOffset;e.params.centeredSlides&&!e.params.cssMode&&(e.wrapperEl.style.transform=`translateX(${e.minTranslate()}px)`),e.params.centeredSlides&&e.params.cssMode&&(T-=i[0].swiperSlideOffset);let _=e.params.cssMode?-T-e.translate:-T,$=0;const X=-100*Math.abs(n);let M=1,j=-r.perSlideRotate*n,V=r.perSlideOffset-Math.abs(n)*.75;const E=e.virtual&&e.params.virtual.enabled?e.virtual.from+y:y,A=(E===l||E===l-1)&&n>0&&n<1&&(w||e.params.cssMode)&&v<u,Q=(E===l||E===l+1)&&n<0&&n>-1&&(w||e.params.cssMode)&&v>u;if(A||Q){const p=(1-Math.abs((Math.abs(n)-.5)/.5))**.5;j+=-28*n*p,M+=-.5*p,V+=96*p,$=`${-25*p*Math.abs(n)}%`}if(n<0?_=`calc(${_}px ${o?"-":"+"} (${V*Math.abs(n)}%))`:n>0?_=`calc(${_}px ${o?"-":"+"} (-${V*Math.abs(n)}%))`:_=`${_}px`,!e.isHorizontal()){const p=$;$=_,_=p}const Z=n<0?`${1+(1-M)*n}`:`${1-(1-M)*n}`,H=`
        translate3d(${_}, ${$}, ${X}px)
        rotateZ(${r.rotate?o?-j:j:0}deg)
        scale(${Z})
      `;if(r.slideShadows){let p=x.querySelector(".swiper-slide-shadow");p||(p=de("cards",x)),p&&(p.style.opacity=Math.min(Math.max((Math.abs(n)-.5)/.5,0),1))}x.style.zIndex=-Math.abs(Math.round(D))+i.length;const J=oe(r,x);J.style.transform=H}},setTransition:i=>{const l=e.slides.map(o=>I(o));l.forEach(o=>{o.style.transitionDuration=`${i}ms`,o.querySelectorAll(".swiper-slide-shadow").forEach(r=>{r.style.transitionDuration=`${i}ms`})}),ce({swiper:e,duration:i,transformElements:l})},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0,virtualTranslate:!e.params.cssMode})})}const pe=["src"],me={__name:"bannerSwiper",setup(f){const e=[G,ee],t=q(()=>[{img:new URL(""+new URL("banner_01-DlQ9u58i.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("banner_02-DXK87R_v.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("banner_03-B65Ugju1.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("banner_04-h6dbNUSC.jpg",import.meta.url).href,import.meta.url).href}]);return(c,m)=>(b(),L(B,{fluid:"",class:"pa-0"},{default:a(()=>[s(S(N),{pagination:{dynamicBullets:!0},navigation:!0,modules:e,class:"mySwiper"},{default:a(()=>[(b(!0),Y(F,null,z(S(t),(d,i)=>(b(),L(S(O),{key:i},{default:a(()=>[R("img",{src:d.img},null,8,pe)]),_:2},1024))),128))]),_:1})]),_:1}))}},ue=k(me,[["__scopeId","data-v-feb66a39"]]),he=["src"],_e={__name:"photoCardSwiper",setup(f){const e=[fe],t=q(()=>[{img:new URL(""+new URL("active_img 01-Bz7SFT7j.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("active_img 02-hYyCyg7d.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("active_img 03-D2q59F3q.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("active_img 04-B_d9MgzD.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("active_img 05-BQvh8v9C.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("active_img 06-C6fu74SZ.jpg",import.meta.url).href,import.meta.url).href},{img:new URL(""+new URL("active_img 07-TRcsYeIV.jpg",import.meta.url).href,import.meta.url).href}]);return(c,m)=>(b(),L(B,{fluid:"",class:"pa-0"},{default:a(()=>[s(S(N),{effect:"cards",grabCursor:!0,modules:e,class:"mySwiper"},{default:a(()=>[(b(!0),Y(F,null,z(S(t),(d,i)=>(b(),L(S(O),{key:i},{default:a(()=>[R("img",{src:d.img},null,8,he)]),_:2},1024))),128))]),_:1})]),_:1}))}},we=k(_e,[["__scopeId","data-v-250bfc5b"]]),ge=R("h1",{class:"mb-3"},"可愛影片～療癒身心～",-1),be=R("video",{class:"w-100 rounded-xl",controls:""},[R("source",{src:ie,type:"video/mp4"}),U(" Your browser does not support the video tag. ")],-1),ve=R("h1",{class:"mb-3"},"滿滿的精采歡樂回憶!",-1),$e={__name:"index",setup(f){return(e,t)=>(b(),L(B,{fluid:"",class:"pa-0"},{default:a(()=>[s(h,{class:"bg-transparent"},{default:a(()=>[s(ue)]),_:1}),s(h,{class:"justify-center bg-transparent my-12 px-10"},{default:a(()=>[s(h,{class:"text-center text-h3 font-weight-blod bg-transparent"},{default:a(()=>[U("人氣狗狗大集合！")]),_:1}),s(P,{class:"d-flex flex-nowrap mt-3"},{default:a(()=>[s(g,{cols:"3",class:"mt-12 d-inline-flex align-end"},{default:a(()=>[s(C,{src:ae,cover:""})]),_:1}),s(g,{cols:"6",class:"d-flex justify-center",width:"300"},{default:a(()=>[s(C,{src:re,class:"",cover:""})]),_:1}),s(g,{cols:"3",class:"mt-12 d-inline-flex align-end"},{default:a(()=>[s(C,{src:ne,cover:""})]),_:1})]),_:1})]),_:1}),s(se,{class:"my-10 w-80 d-flex justify-center"}),s(h,{class:"bg-transparent px-10"},{default:a(()=>[s(h,{class:"text-center text-h3 font-weight-blod bg-transparent my-12"},{default:a(()=>[U(" 狗狗生活札記 ")]),_:1}),s(h,{class:"bg-transparent d-flex pa-0"},{default:a(()=>[s(P,null,{default:a(()=>[s(g,{cols:"5",class:"pa-0"},{default:a(()=>[s(h,{class:"bg-transparent pa-0 px-5"},{default:a(()=>[ge,U(" 大等西加，走突這不一說害遠雲然我看急行政足沒，氣專陽們藝來接怎出工力；下去那從立，後它家備。我易預完麼關全不態花內手智列手古衣的三實人是爸選聲。線政裡開到何法成去步全度車商己能親國一這使愛樂題有了……配來怎！間的光你？玩用節子集講初般情來界法引！ ")]),_:1})]),_:1}),s(g,{cols:"7",class:"pa-0"},{default:a(()=>[s(te,{"aspect-ratio":"16/9"},{default:a(()=>[be]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),s(h,{class:"bg-transparent px-10"},{default:a(()=>[s(P,{class:"d-flex my-10"},{default:a(()=>[s(g,{cols:"7",class:"pa-5"},{default:a(()=>[s(h,{class:"bg-transparent"},{default:a(()=>[s(we)]),_:1})]),_:1}),s(g,{cols:"5",class:"pa-15 position-relative"},{default:a(()=>[s(h,{class:"bg-transparent d-flex flex-column align-start"},{default:a(()=>[ve,U(" 大等西加，走突這不一說害遠雲然我看急行政足沒，氣專陽們藝來接怎出工力；下去那從立，後它家備。我易預完麼關全不態花內手智列手古衣的三實人是爸選聲。線政裡開到何法成去步全度車商己能親國一這使愛樂題有了……配來怎！間的光你？玩用節子集講初般情來界法引！ ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}};export{$e as default};