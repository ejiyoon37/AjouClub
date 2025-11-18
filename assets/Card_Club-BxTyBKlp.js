import{u as c,j as e}from"./index-Ck0rkagM.js";import{T as i}from"./Chip_type-C-U0bwel.js";const m=({club:a,variant:l="home"})=>{const{clubId:n,profileImageUrl:x,clubType:o,clubName:r}=a,p=c(),s=()=>{p(`/clubs/${n}`)},t=l==="explore";return e.jsxs("div",{onClick:s,role:"button",tabIndex:0,className:`
        ${t?"w-[109px] h-[147px] rounded-[12px] px-2 pt-3 pb-4":"w-[120px] h-[156px] rounded-[13.41px] px-2 pt-3 pb-4"}
        bg-gray-50 flex flex-col items-center justify-between
      `,children:[e.jsx("img",{src:x||"/OnlyLogo.svg",alt:`${r} profile`,className:`
          ${t?"w-[72px] h-[72px]":"w-[80px] h-[80px]"}
          rounded-full border border-gray-100 object-cover
        `,loading:"lazy",decoding:"async"}),e.jsx(i,{size:"regular",children:o}),e.jsx("p",{className:`
          ${t?"text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-900 text-center w-full truncate":"w-[104px] h-[18px] text-center truncate text-[14px] font-medium text-gray-900 leading-[135%] tracking-[-0.03em]"}
        `,children:r})]})};export{m as C};
