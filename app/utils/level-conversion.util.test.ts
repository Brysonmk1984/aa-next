import { convertLevel } from './level-conversion.util';

describe('level-conversion-util', () => {
  // REGION ONE

  describe('Region 1', () => {
    it('A highestActiveLevel of 1 should return region 1, level 1', () => {
      const highestActiveLevel = 1;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(1);
      expect(levelInRegionNum).toBe(1);
    });
    it('A highestActiveLevel of 2 should return region 1, level 2', () => {
      const highestActiveLevel = 2;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(1);
      expect(levelInRegionNum).toBe(2);
    });
    it('A highestActiveLevel of 3 should return region 1, level 3', () => {
      const highestActiveLevel = 3;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(1);
      expect(levelInRegionNum).toBe(3);
    });
    it('A highestActiveLevel of 4 should return region 1, level 4', () => {
      const highestActiveLevel = 4;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(1);
      expect(levelInRegionNum).toBe(4);
    });
    it('A highestActiveLevel of 5 should return region 1, level 5', () => {
      const highestActiveLevel = 5;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(1);
      expect(levelInRegionNum).toBe(5);
    });
  });

  // REGION TWO

  describe('Region 2', () => {
    it('A highestActiveLevel of 6 should return region 2, level 1', () => {
      const highestActiveLevel = 6;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(2);
      expect(levelInRegionNum).toBe(1);
    });
    it('A highestActiveLevel of 7 should return region 2, level 2', () => {
      const highestActiveLevel = 7;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(2);
      expect(levelInRegionNum).toBe(2);
    });
    it('A highestActiveLevel of 8 should return region 2, level 3', () => {
      const highestActiveLevel = 8;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(2);
      expect(levelInRegionNum).toBe(3);
    });
    it('A highestActiveLevel of 9 should return region 2, level 4', () => {
      const highestActiveLevel = 9;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(2);
      expect(levelInRegionNum).toBe(4);
    });
    it('A highestActiveLevel of 10 should return region 2, level 5', () => {
      const highestActiveLevel = 10;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(2);
      expect(levelInRegionNum).toBe(5);
    });
  });

  // REGION THREE

  describe('Region 3', () => {
    it('A highestActiveLevel of 11 should return region 3, level 1', () => {
      const highestActiveLevel = 11;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(3);
      expect(levelInRegionNum).toBe(1);
    });
    it('A highestActiveLevel of 12 should return region 3, level 2', () => {
      const highestActiveLevel = 12;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(3);
      expect(levelInRegionNum).toBe(2);
    });
    it('A highestActiveLevel of 13 should return region 3, level 3', () => {
      const highestActiveLevel = 13;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(3);
      expect(levelInRegionNum).toBe(3);
    });
    it('A highestActiveLevel of 14 should return region 3, level 4', () => {
      const highestActiveLevel = 14;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(3);
      expect(levelInRegionNum).toBe(4);
    });
    it('A highestActiveLevel of 15 should return region 3, level 5', () => {
      const highestActiveLevel = 15;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(3);
      expect(levelInRegionNum).toBe(5);
    });
  });

  // REGION SIX

  describe('Region 6', () => {
    it('A highestActiveLevel of 26 should return region 6, level 1', () => {
      const highestActiveLevel = 26;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(6);
      expect(levelInRegionNum).toBe(1);
    });
    it('A highestActiveLevel of 27 should return region 6, level 2', () => {
      const highestActiveLevel = 27;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(6);
      expect(levelInRegionNum).toBe(2);
    });
    it('A highestActiveLevel of 28 should return region 6, level 3', () => {
      const highestActiveLevel = 28;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(6);
      expect(levelInRegionNum).toBe(3);
    });
    it('A highestActiveLevel of 29 should return region 6, level 4', () => {
      const highestActiveLevel = 29;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(6);
      expect(levelInRegionNum).toBe(4);
    });
    it('A highestActiveLevel of 30 should return region 6, level 5', () => {
      const highestActiveLevel = 30;
      const { regionNum, levelInRegionNum } = convertLevel(highestActiveLevel);
      expect(regionNum).toBe(6);
      expect(levelInRegionNum).toBe(5);
    });
  });
});
