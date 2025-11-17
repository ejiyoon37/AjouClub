// src/components/homepage/HomeBanner.tsx

import Banner from "../../assets/banner.png"

function HomeBanner() {
  return (
    <div className="h-[102px] mx-auto">
      <img
        src= {Banner}
        alt="아주대학교 동아리를 담은, a Club"
        className="w-full h-full object-cover rounded-[10px]"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
export default HomeBanner;
