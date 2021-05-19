import fiTranslations from "translations/fi-FI";
import enTranslations from "translations/en-US";

const getTranslation = (stringToTranslate, translations) => {
  const hasTranslation = translations.hasOwnProperty(stringToTranslate);

  if (hasTranslation) {
    return translations[ stringToTranslate ];
  }
  return stringToTranslate;
};

const iterate = (objectToTranslate, translations) => {

  const isArray = Array.isArray(objectToTranslate);
  const newObj = isArray ? [] : {};

  Object.keys(objectToTranslate).forEach((key) => {
    const currentValue = objectToTranslate[ key ];

    if (currentValue && typeof currentValue === "object") {
      const value = iterate(currentValue, translations);

      if (isArray) {
        newObj.push(value);
      } else {
        newObj[ key ] = value;
      }
    } else {
      newObj[ key ] = getTranslation(currentValue, translations);
    }

  });

  return newObj;
};

export const translate = (data, languageCode = "en-US") => {
  const translations = languageCode === "fi-FI" ? fiTranslations : enTranslations;
  const translatedData = iterate(data, translations);

  return translatedData;
};
