export const convertLevel = (totalLevel: number) => {
  const region = Math.ceil(totalLevel / 5);
  const level = totalLevel % 5 || 5;
  console.log(region, level);
  return {
    region,
    level,
  };
};
