
const fetchPricesByDate = async (date) => {
  try {
    const response = await fetch(
      `https://www.sahkohinta-api.fi/api/vartti/v1/halpa?vartit=96&tulos=haja&aikaraja=${date}`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const handleFetchTodayPrices = () => {
  const today = new Date().toISOString().split("T")[0];

  return fetchPricesByDate(today);
};

export const handleFetchTomorrowPrices = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowDate = tomorrow.toISOString().split("T")[0];

  return fetchPricesByDate(tomorrowDate);
};