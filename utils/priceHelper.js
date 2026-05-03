
// Päivän ALIN hinta
export const getMinPrice = (prices) => {
  if (!prices || prices.length === 0) return null;

  return Math.min(...prices.map(item => item.hinta));
};

// Päivän YLIN hinta
export const getMaxPrice = (prices) => {
  if (!prices || prices.length === 0) return null;

  return Math.max(...prices.map(item => item.hinta));
};

// Päivän KESKI hinta
export const getAveragePrice = (prices) => {
  if (!prices || prices.length === 0) return null;

  const total = prices.reduce((sum, item) => {
    return sum + (item.hinta * 1.255);
  }, 0);

  return (total / prices.length).toFixed(2);
};

// Hinta NYT
export const getCurrentPrice = (prices, now) => {
  if (!prices || prices.length === 0) return null;

  const currentItem = prices.find((item) => {
    const itemTime = new Date(item.aikaleima_suomi);

    const next15min = new Date(itemTime);
    next15min.setMinutes(next15min.getMinutes() + 15);

    return now >= itemTime && now < next15min;
  });

  return currentItem ? (currentItem.hinta * 1.255).toFixed(2) : null;
};

// Hintatasot värejä varten
export const getPriceLevel = (price) => {
  const value = Number(price);

  if (value < 3) return 'cheap';
  if (value < 10) return 'medium';
  return 'expensive';
};