import{i as x,a as B,r as c,o as d,j as g,w as t,e as a,k as v,a2 as u,a5 as N,aJ as T,d as C,g as w,F as I,aI as S,a8 as A,a3 as D,aQ as L}from"./index-CnKDs-mF.js";import{b as f}from"./route-block-B_A1xBdJ.js";import{V as k}from"./VCol-CrgD1yeS.js";import{V as y}from"./VRow-IkpUkABv.js";import{r as F}from"./VDataTable-JQyfRSdh.js";import{a as U,V as j}from"./VList-Bew-uVHL.js";import{V as O}from"./VContainer-BLyZHjss.js";import"./VPagination-CF5GJWBd.js";import"./VCheckboxBtn-yv2f7NIx.js";import"./VDivider-bRFIQgSV.js";const P=A("h1",null,"預約管理",-1),E={__name:"manageBooking",setup(J){const{apiAuth:V}=L(),_=x(),b=B();c(b.account);const o=c(""),r=c([]),m=[{key:"bookingOrderNumber",order:"desc"}],h=[{align:"center",title:"訂單編號",key:"bookingOrderNumber"},{align:"center",title:"下單日期",key:"createdAt",value:n=>new Date(n.createdAt).toLocaleString()},{align:"center",title:"帳號名稱",key:"accountName"},{align:"center",title:"預約人",key:"name"},{align:"center",title:"電話",key:"phone"},{align:"center",title:"預約狗狗",key:"dogName"},{align:"center",title:"預約日期",key:"bookingDate"},{align:"center",title:"預約時段",key:"bookingTime"},{align:"center",title:"預約總時數",key:"totalBookingTime"},{align:"center",title:"預約總金額",key:"totalPrice"}],p=async()=>{var n,l;try{const{data:e}=await V.get("/order");r.value.splice(0,r.value.length,...e.result.data)}catch(e){console.log(e),_({text:((l=(n=e==null?void 0:e.response)==null?void 0:n.data)==null?void 0:l.message)||"發生錯誤",snackbarProps:{color:"red"}})}};return p(),(n,l)=>(d(),g(O,{fluid:""},{default:t(()=>[a(y,{class:"text-center"},{default:t(()=>[a(k,null,{default:t(()=>[P]),_:1})]),_:1}),a(y,{class:"text-center"},{default:t(()=>[a(k,null,{default:t(()=>[a(v,{class:"d-inline-flex pa-4",color:"green",onClick:p},{default:t(()=>[u("查詢預約")]),_:1})]),_:1})]),_:1}),a(S,{class:"mt-8",flat:""},{text:t(()=>[a(N,{modelValue:o.value,"onUpdate:modelValue":l[0]||(l[0]=e=>o.value=e),label:"Search","prepend-inner-icon":"mdi-magnify",variant:"outlined","hide-details":"","single-line":""},null,8,["modelValue"])]),default:t(()=>[a(T,null,{default:t(()=>[u("查詢預約資料")]),_:1}),a(F,{"sort-by":m,"onUpdate:sortBy":l[1]||(l[1]=e=>m=e),headers:h,items:r.value,search:o.value},{"item.bookingTime":t(({value:e})=>[a(U,null,{default:t(()=>[(d(!0),C(I,null,w(e.join(" ").split(",").sort((s,i)=>parseInt(s)-parseInt(i)),(s,i)=>(d(),g(j,{key:i},{default:t(()=>[u(D(s),1)]),_:2},1024))),128))]),_:2},1024)]),_:2},1032,["items","search"])]),_:1})]),_:1}))}};typeof f=="function"&&f(E);export{E as default};
