export const getQueryString = (
  obj: Record<string, string | number | undefined | void> | undefined | void
): string => {
  if (!obj) return "";
  const queryString = Object.entries(obj)
    .filter(([_, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(
          value as string | number
        )}`
    )
    .join("&");
  return queryString ? `?${queryString}` : "";
};
