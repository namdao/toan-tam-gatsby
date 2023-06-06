import numeral from "numeral";

const isRegisterNumeral = numeral.locales["vi"];
if (isRegisterNumeral === undefined) {
  numeral.register("locale", "vi", {
    delimiters: {
      thousands: ".",
      decimal: ",",
    },
    abbreviations: {
      thousand: " k",
      million: " triệu",
      billion: " tỷ",
      trillion: " ktỷ",
    },
    ordinal: function (number: number) {
      return number ? "1" : number.toString();
    },
    currency: {
      symbol: "VNĐ",
    },
  });
  numeral.locale("vi");
}
type InputValue = string | number | null;

export function fNumber(number: InputValue) {
  return numeral(number).format();
}

export function parseToNumber(number: string) {
  return numeral(number).value() || 0;
}
export function fCurrency(number: InputValue) {
  const format = number ? numeral(number).format("0,0.00") : "";
  return result(format, ".00");
}

export function fPercent(number: InputValue) {
  const format = number ? numeral(Number(number) / 100).format("0.0%") : "";

  return result(format, ".0");
}

export function fShortenNumber(number: InputValue) {
  const format = number ? numeral(number).format("0.0a") : "";

  return result(format, ".00");
}

export function fData(number: InputValue) {
  const format = number ? numeral(number).format("0.0 b") : "";

  return result(format, ".0");
}

function result(format: string, key = ".00") {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, "") : format;
}
