export const determineAmountPerHour = (amountPerIteration: number, frequencyInMinutes: number) => {
  const calcsPerHour = 60 / frequencyInMinutes;
  const amountPerHour = calcsPerHour * amountPerIteration;

  return {
    amountPerHour,
    amount: amountPerIteration,
    frequencyInMinutes,
  };
};
