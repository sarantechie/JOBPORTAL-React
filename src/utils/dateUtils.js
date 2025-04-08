// New utility functions for date handling
export const formatDateForDisplay = (dateString) => {
  if (!dateString || dateString === "Present") return "Present";
  
  // Handle YYYY-MM-DD format
  if (dateString.includes('-')) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  
  // Handle DD/MM/YYYY format already
  if (dateString.includes('/') && dateString.split('/').length === 3) {
    return dateString;
  }
  
  // Try to parse as JavaScript Date
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
  
  // Check if it's already in DD/MM/YYYY format
  const dateParts = dateString.split('/');
  if (dateParts.length === 3) {
    const [day, month, year] = dateParts;
    // Return in YYYY-MM-DD format for storage
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  
  return dateString; // Return as is if not in expected format
};

export const formatDateForInput = (dateString) => {
  if (!dateString || dateString === "Present") return "";
  
  // Handle YYYY-MM-DD format
  if (dateString.includes('-')) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  
  // If already in DD/MM/YYYY format
  if (dateString.includes('/') && dateString.split('/').length === 3) {
    return dateString;
  }
  
  // Try to parse as JavaScript Date
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
  
  // Check DD/MM/YYYY format
  const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  if (!regex.test(dateString)) return false;
  
  const [, day, month, year] = dateString.match(regex);
  
  // Basic validation
  const numDay = parseInt(day, 10);
  const numMonth = parseInt(month, 10);
  const numYear = parseInt(year, 10);
  
  if (numMonth < 1 || numMonth > 12) return false;
  
  // Check days in month (simplified)
  const daysInMonth = new Date(numYear, numMonth, 0).getDate();
  if (numDay < 1 || numDay > daysInMonth) return false;
  
  return true;
};

export const formatDateFromAPI = (dateStr) => {
  if (!dateStr) return "";
  if (dateStr === "Present") return "Present";

  // Check if it's an ISO format date (contains 'T')
  if (typeof dateStr === "string" && dateStr.includes("T")) {
    try {
      // Parse ISO date to DD/MM/YYYY format for storage
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

  return dateStr; // Return as is if not an ISO date
};