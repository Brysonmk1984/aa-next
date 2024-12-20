/**
 * @param activeLevel : number indicating the level as indicated in the url path
 */
export const convertLevel = (activeLevel: number) => {
  // Subtracting one helps determine if the level is divisible by 5 and in a new region. The "1" is added back in the levelInRegionNum
  const adjustedLevel = activeLevel - 1;
  const remainder = adjustedLevel % 5;
  const divisibleByFive = remainder === 0;
  const regionNum = divisibleByFive ? Math.ceil(adjustedLevel / 5) + 1 : Math.ceil(adjustedLevel / 5);

  const levelInRegionNum = divisibleByFive ? 1 : remainder + 1;

  return {
    regionNum,
    levelInRegionNum,
  };
};
