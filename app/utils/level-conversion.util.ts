export const convertLevel = (highestLevelCompleted: number) => {
  const region = Math.ceil(highestLevelCompleted / 5);
  const level = highestLevelCompleted % 5 || 5;
  console.log(region, level);
  return {
    region,
    level,
  };
};
