type PostItem = { id: string; date: string; title: string; view: number };

export function groupByYear(
  posts: PostItem[]
): { year: string; list: PostItem[] }[] {
  const groupedByYear: {
    [year: string]: PostItem[];
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
    list: PostItem[];
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

export function transformFilename(filename: string) {
  return '/' + filename.replace(/\.[^.]+$/, '').replace(/\./g, '/');
}

export function formatNumberWithCommas(num: number): string {
  return num.toLocaleString('en-US');
}

export function isExity(target: unknown) {
  return target !== undefined && target !== null;
}
