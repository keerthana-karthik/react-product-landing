const categoryDisplayNameMap = [
  { key: "cookware", value: "Cookware" },
  { key: "cutlery", value: "Cutlery" },
  { key: "electrics", value: "Electrics" },
  { key: "bakeware", value: "Bakeware" },
  { key: "food", value: "Food" },
  { key: "homekeeping", value: "Homekeeping" },
  { key: "outdoor", value: "Outdoor" },
];
export const getCategoriesMap = () => {
  return categoryDisplayNameMap;
};
export const getCategoryDisplayName = (key: string) => {
  let categoryValue = "";
  categoryDisplayNameMap.map((category) => {
    if (key === category.key) {
      return (categoryValue = category.value);
    }
    return categoryValue;
  });
  return categoryValue;
};
