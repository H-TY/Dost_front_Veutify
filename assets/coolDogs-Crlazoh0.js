import{i as V,u as v,r as n,o as c,j as m,w as s,e as t,d as P,h,F as k,a4 as x,f as y,W as b,aQ as w}from"./index-tRG4-w5O.js";import{_ as A}from"./dogsCard-CyvEhETH.js";import{V as p}from"./VCol-BSBQN9V1.js";import{V as C}from"./VPagination-B5DjGkXT.js";import{a as E,V as B}from"./VRow-PH86K8s3.js";import"./VDivider-C1-2HxHp.js";const d=6,I={__name:"coolDogs",setup(D){const{backApi:f,apiAuth:F}=w(),_=V(),{mobile:g}=v(),o=n(1),u=n(1),l=n([]),i=async()=>{var r,e;try{const{data:a}=await f.get("/dogs",{params:{itemsPerPage:d,page:o.value}});u.value=Math.ceil(a.result.total/d),l.value.splice(0,l.value.length,...a.result.data)}catch(a){console.log(a),_({text:((e=(r=a==null?void 0:a.response)==null?void 0:r.data)==null?void 0:e.message)||"發生錯誤",snackbarProps:{color:"red"}})}};return i(),(r,e)=>(c(),m(B,{class:"my-8"},{default:s(()=>[t(E,null,{default:s(()=>[(c(!0),P(k,null,h(l.value,a=>(c(),m(p,{cols:"12",sm:"4",key:a._id,class:x(y(g)===!0?"px-8":"")},{default:s(()=>[t(A,b({ref_for:!0},a),null,16)]),_:2},1032,["class"]))),128)),t(p,{cols:"12"},{default:s(()=>[t(C,{modelValue:o.value,"onUpdate:modelValue":[e[0]||(e[0]=a=>o.value=a),i],length:u.value,rounded:"circle"},null,8,["modelValue","length"])]),_:1})]),_:1})]),_:1}))}};export{I as default};
