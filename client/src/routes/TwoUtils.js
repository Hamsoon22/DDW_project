export function filterTruthy(obj) {
  const result = [];
  for (const k in obj) {
    if (!!obj[k]) {
      result.push(k);
    }
  }
  return result;
}
