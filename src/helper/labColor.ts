// 글자 인덱스에 따라 색상 변화
export function getLabColor(
  isDark: boolean,
  index: number,
  total: number
): string {
  const dL = isDark ? 80.574 : 58.739;
  const da = isDark ? 30.6 : 56.873;
  const db = isDark ? -11.24 : -7.396;

  if (total <= 1) {
    return `lab(${dL} ${da} ${db})`;
  }

  const deltaL = ((isDark ? 78.532 : 52.169) - dL) / (total - 1);
  const deltaA = (22.169 - da) / (total - 1);
  const deltaB = (-31.47 - db) / (total - 1);

  const L = dL + index * deltaL;
  const a = da + index * deltaA;
  const b = db + index * deltaB;

  return `lab(${L} ${a} ${b})`;
}
