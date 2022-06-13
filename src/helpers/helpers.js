import { useLocation } from "react-router-dom";

// Creates exerpt of a string. Accepts string and limit (limit is int for number of characters required)
// Returns original and short string as object
export const getExcerpt = (str, limit) => {
  var fullText = str;
  var shortText = str;
  shortText = shortText.substr(0, shortText.lastIndexOf(" ", limit)) + "...";
  var returnString = {
    fullText: fullText,
    shortText: shortText,
  };
  return returnString;
};

// Converts MYSQL date string to locale date string e.g. Wed Jun 08 2022
export const sqlDateConvert = (isoDate) => {
  const newDate = new Date(isoDate).toLocaleDateString();
  return newDate;
};

// custom hook to get the current pathname in React
export const usePathname = () => {
  const location = useLocation();
  return location.pathname;
};

// Gets url origin e.g. http://localhost:3000
export const getUrlOrigin = () => {
  return window.location.origin;
};
