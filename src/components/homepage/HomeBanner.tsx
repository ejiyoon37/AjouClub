import Banner from "../../assets/banner.png"

function HomeBanner() {
  return (
    <div className="w-[343px] h-[102px] mx-auto">
      <img
        src= {Banner}
        alt="아주대학교 동아리를 담은, a Club"
        className="w-full h-full object-cover rounded-[10px]"
      />
    </div>
  );
}
export default HomeBanner;