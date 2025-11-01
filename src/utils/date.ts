// src/utils/date.ts

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    // (수정) 유효하지 않은 날짜(예: "string")일 경우 원본 반환
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
  } catch (e) {
    return dateString; // 파싱 실패 시 원본 문자열 반환
  }
};