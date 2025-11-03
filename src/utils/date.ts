// src/utils/date.ts

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
  } catch (e) {
    return dateString; 
  }
};