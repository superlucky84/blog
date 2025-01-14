export function shuffleArray<T>(array: T[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
}

export function groupByYear(
  files: string[]
): { year: string; list: string[] }[] {
  const groupedByYear: { [year: string]: string[] } = {};

  files.forEach(file => {
    const year = file.split('.')[0]; // 파일에서 연도 추출
    if (!groupedByYear[year]) {
      groupedByYear[year] = []; // 연도가 처음 등장하면 빈 배열 생성
    }
    groupedByYear[year].push(file); // 해당 연도의 배열에 파일 추가
  });

  // 연도를 배열 순서대로 반환
  const orderedResult: { year: string; list: string[] }[] = [];

  Object.keys(groupedByYear)
    .sort((a, b) => Number(b) - Number(a)) // 내림차순으로 정렬
    .forEach(year => {
      orderedResult.push({
        year,
        list: groupedByYear[year],
      });
    });

  return orderedResult;
}
