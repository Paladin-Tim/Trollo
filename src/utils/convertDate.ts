export const convertDate = (dateString: string) => {
  return `${new Date(dateString).toLocaleDateString("default", { month: "long", year: "numeric", day: "numeric" })},  ${new Date(dateString).toLocaleTimeString()} `;
};
