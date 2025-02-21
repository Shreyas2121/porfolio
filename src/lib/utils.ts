export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
};
