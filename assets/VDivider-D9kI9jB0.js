import{p as c,m as u,i as h,g as m,q as g,by as y,t as f,x as _,u as b,a as r,A as s}from"./index-C--5loqc.js";const C=c({color:String,inset:Boolean,length:[Number,String],opacity:[Number,String],thickness:[Number,String],vertical:Boolean,...u(),...h()},"VDivider"),S=m()({name:"VDivider",props:C(),setup(e,l){let{attrs:i,slots:a}=l;const{themeClasses:n}=g(e),{textColorClasses:o,textColorStyles:d}=y(f(e,"color")),v=_(()=>{const t={};return e.length&&(t[e.vertical?"height":"width"]=s(e.length)),e.thickness&&(t[e.vertical?"borderRightWidth":"borderTopWidth"]=s(e.thickness)),t});return b(()=>{const t=r("hr",{class:[{"v-divider":!0,"v-divider--inset":e.inset,"v-divider--vertical":e.vertical},n.value,o.value,e.class],style:[v.value,d.value,{"--v-border-opacity":e.opacity},e.style],"aria-orientation":!i.role||i.role==="separator"?e.vertical?"vertical":"horizontal":void 0,role:`${i.role||"separator"}`},null);return a.default?r("div",{class:["v-divider__wrapper",{"v-divider__wrapper--vertical":e.vertical,"v-divider__wrapper--inset":e.inset}]},[t,r("div",{class:"v-divider__content"},[a.default()]),t]):t}),{}}});export{S as V};
