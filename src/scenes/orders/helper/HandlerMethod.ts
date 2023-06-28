export const convertMethod = (method: string) => {
  let handlerMethod = "";
  const splitMethod = method.replaceAll("_", "").split("x");
  splitMethod.forEach((e, index) => {
    const value = e.trim();
    if (value && index < splitMethod.length - 1) {
      handlerMethod += `${value} x `;
    } else {
      handlerMethod += value;
    }
  });
  return handlerMethod;
};

const MAX_X_PATTERN = 3;
export const parseMethod = (method: string) => {
  const parsePattern = method.split("x");
  let res = "";
  parsePattern.forEach((e, i) => {
    if (i > MAX_X_PATTERN) return;
    const dataTrim = e.trim();
    const resTotal = 4 - dataTrim.length;
    const append = Array(resTotal).fill("_").join("");
    res += `${dataTrim}${append}`;
    if (i === parsePattern.length - 1 && i < MAX_X_PATTERN) {
      res += " x ___";
    } else if (i < MAX_X_PATTERN) {
      res += " x ";
    }
  });
  return res;
};
