export const convertLevel = (highestLevelCompleted: number) => {
  const regionNum = Math.ceil(highestLevelCompleted / 5) + 1;
  const levelInRegionNum = highestLevelCompleted % 5 || 5;

  return {
    regionNum,
    levelInRegionNum,
  };
};
