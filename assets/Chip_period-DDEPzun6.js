import{j as t}from"./index-DYhfhBFg.js";const u=({status:s,dDay:e,size:r="small"})=>{const n=`
    inline-flex w-auto items-center justify-center
    h-[20px] rounded-[4px]
    font-bold leading-[1.4] tracking-[-0.03em]
  `,x=()=>{switch(r){case"large":return"px-2 py-1 text-sm";case"medium":return"px-[5px] py-0.5 text-xs";case"small":default:return"px-[5px] py-[3px] text-[10px]"}},l=()=>{switch(s){case"d-day":return{style:"bg-red-50 text-red-300",text:e!==void 0?`마감 D-${e}`:"마감 임박"};case"end":return{style:"bg-gray-100 text-gray-500",text:"마감"};case"regular":default:return{style:"bg-blue-50 text-blue-400",text:"상시모집"}}},a=x(),{style:i,text:c}=l();return t.jsx("div",{className:`${n} ${a} ${i}`,children:t.jsx("span",{children:c})})};export{u as P};
