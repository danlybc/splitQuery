import jQueryFunctions from "../data/jQueryFunctions.json";

const FN_JSON = jQueryFunctions;

export function getFunctionsLength() {
  let length = 0;
  for (let category of FN_JSON) {
    for (let func of category.functions) {
      length++;
    }
  }
  return length;
}

/**
 * @param {string} name Name of the category you want to find
 * @returns {int} index of the category in jQueryFunctions.json
 */
export function getCategoryIndex(name) {
  const idx = FN_JSON.findIndex((cat) => cat.name === name);
  return idx;
}
