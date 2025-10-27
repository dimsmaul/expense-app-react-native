export const formatMoney = (amount: number, currency: string = 'IDR') => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

export const money = (value: string): string => {
  return new Intl.NumberFormat('id-ID').format(Number(value || 0));
};
