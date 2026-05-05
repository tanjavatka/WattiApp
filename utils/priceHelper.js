
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

  // järjestetään hinnat aikajärjestykseen
  const sortedPrices = [...prices].sort(
    (a, b) => new Date(a.aikaleima_utc + "Z") - new Date(b.aikaleima_utc + "Z")
  );

  console.log("NOW:", now);

  const currentItem = prices.find((item) => {
    const itemTime = new Date(item.aikaleima_utc + "Z");

    console.log("ITEM:", itemTime);

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

// Hakee päiväyksen - tyyli: su 3.5.
export const getDateLabel = (data) => {
  if (!data || data.length === 0) return '';

  return new Date(data[0].aikaleima_utc + "Z").toLocaleDateString('fi-FI', {
    weekday: 'short',
    day: 'numeric',
    month: 'numeric',
  });
};