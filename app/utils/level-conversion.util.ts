export const convertLevel = (highestLevelCompleted: number) => {
  const regionNum = Math.ceil(highestLevelCompleted / 5);
  const levelInRegionNum = highestLevelCompleted % 5 || 5;

  return {
    regionNum,
    levelInRegionNum,
  };
};
