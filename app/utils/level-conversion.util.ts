/**
 *
 * @param highestLevelCompleted : number indicating the furthest along level that's been successfully completed
 * @returns Object containing the highest available region and level
 */
export const convertLevel = (highestLevelCompleted: number) => {
  const remainder = highestLevelCompleted % 5;
  const divisibleByFive = remainder === 0;
  const regionNum = divisibleByFive ? Math.ceil(highestLevelCompleted / 5) + 1 : Math.ceil(highestLevelCompleted / 5);

  const levelInRegionNum = divisibleByFive ? 1 : remainder + 1;

  return {
    regionNum,
    levelInRegionNum,
  };
};
