export const deduplicateByKey = <T extends object, K extends keyof T>(
  items: T[],
  key: K
): T[] => {
  const seen = new Set<unknown>();

  return items.filter((item) => {
    const value = item[key];

    if (seen.has(value)) {
      return false;
    }

    seen.add(value);
    return true;
  });
};
