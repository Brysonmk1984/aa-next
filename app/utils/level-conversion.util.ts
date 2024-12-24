/**
 * Converts a level (number) into an object of { regionNum : number, levelInRegionNum : number }
 * @param activeLevel : number indicating the level as indicated in the url path
 */
export const convertLevel = (activeLevel: number) => {
  const remainder = activeLevel % 5;
  const divisibleByFive = remainder === 0;

  const regionNum = Math.ceil(activeLevel / 5);

  const levelInRegionNum = divisibleByFive ? 5 : remainder;

  return {
    regionNum,
    levelInRegionNum,
  };
};
