// src/components/MyPage/FavoriteRecruitmentList.tsx

import RecruitmentListItem from "../common/Card/Card_recruitment _listitem";
interface FavoriteRecruitmentItem {
  recruitmentId: number;
  title: string;
  thumbnailUrl: string;
}

const FavoriteRecruitmentList = ({
  item,
}: {
  item: FavoriteRecruitmentItem;
}) => {
  return (
    <RecruitmentListItem
      imageUrl={item.thumbnailUrl}
      recruitmentStatus="regular"
      title={item.title}
      viewCount={103}
      saveCount={10}
      postedDate="2025. 03. 23"
    />
  );
};

export default FavoriteRecruitmentList;