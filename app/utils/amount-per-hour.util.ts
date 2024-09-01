export const determineAmountPerHour = (amount: number, frequencyInMinutes: number) => {
  const calculationsPerHour = amount / 60;
  const amountPerHour = Math.floor(amount * calculationsPerHour);

  return {
    amountPerHour,
    amount,
    frequencyInMinutes,
  };
};
