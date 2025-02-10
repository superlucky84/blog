export function getPreloadData<T>() {
  return (globalThis as any).pagedata as T;
}
export function getGtmId() {
  return (globalThis as any).gtmId as string;
}
