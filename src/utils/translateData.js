import ka from "@/locales/ka/translation.json";
import en from "@/locales/en/translation.json";
import he from "@/locales/he/translation.json";

const translations = {
  ka,
  en,
  he,
};

// დასაწყისისთვის: "home.welcome" → იღებს თარგმანს
export const getTranslation = (language, keyPath) => {
  const keys = keyPath.split(".");
  return keys.reduce((obj, key) => obj?.[key], translations[language]) || keyPath;
};

export default translations;
