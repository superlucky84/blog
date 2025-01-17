export function groupByYear(
  posts: { id: string; date: string; title: string }[]
): { year: string; list: { id: string; date: string; title: string }[] }[] {
  const groupedByYear: {
    [year: string]: { id: string; date: string; title: string }[];
  } = {};

  posts.forEach(post => {
    const year = new Date(post.date).getFullYear();
    if (!groupedByYear[year]) {
      groupedByYear[year] = [];
    }
    groupedByYear[year].push(post);
  });

  const orderedResult: {
    year: string;
    list: { id: string; date: string; title: string }[];
  }[] = [];

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
