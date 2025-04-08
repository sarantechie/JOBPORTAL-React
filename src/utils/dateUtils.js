
export const formatDateForDisplay = (dateString) => {
  if (!dateString || dateString === "Present") return "Present";
  
  
  if (dateString.includes('-')) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  
  
  if (dateString.includes('/') && dateString.split('/').length === 3) {
    return dateString;
  }
  
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return "Invalid date";
  }
};

export const parseInputDate = (dateString) => {
  if (!dateString || dateString === "Present") return dateString;
  
  
  const dateParts = dateString.split('/');
  if (dateParts.length === 3) {
    const [day, month, year] = dateParts;
    
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  
  return dateString; 
};

export const formatDateForInput = (dateString) => {
  if (!dateString || dateString === "Present") return "";
  
  
  if (dateString.includes('-')) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  
  
  if (dateString.includes('/') && dateString.split('/').length === 3) {
    return dateString;
  }
  
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return "";
  }
};

export const validateDateFormat = (dateString) => {
  if (!dateString || dateString === "Present") return true;
  
  
  const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  if (!regex.test(dateString)) return false;
  
  const [, day, month, year] = dateString.match(regex);
  
  
  const numDay = parseInt(day, 10);
  const numMonth = parseInt(month, 10);
  const numYear = parseInt(year, 10);
  
  if (numMonth < 1 || numMonth > 12) return false;
  
  
  const daysInMonth = new Date(numYear, numMonth, 0).getDate();
  if (numDay < 1 || numDay > daysInMonth) return false;
  
  return true;
};

export const formatDateFromAPI = (dateStr) => {
  if (!dateStr) return "";
  if (dateStr === "Present") return "Present";

  
  if (typeof dateStr === "string" && dateStr.includes("T")) {
    try {
      
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }
    } catch (e) {
      console.error("Error parsing date:", e);
    }
  }

  return dateStr; 
};