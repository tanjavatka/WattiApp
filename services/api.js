
// Haetaan sähkön hinnat päivän mukaan | date = today / tomorrow
const fetchPricesByDate = async (date) => {
  try {
    const response = await fetch(
      `https://www.sahkohinta-api.fi/api/vartti/v1/halpa?vartit=96&tulos=haja&aikaraja=${date}`
    );

    // koodin testausta
    // const text = await response.text();
    // console.log("RAW RESPONSE:", text);

    // tarkista status
    if (!response.ok) {
      console.log("API error status:", response.status);
      return [];
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.log("Fetch error: ", error);
    return [];
  }
};

// Haetaan tämän päivän hinnat
export const handleFetchTodayPrices = () => {

  // haetaan suomen aikojen mukaan
  const today = new Date().toLocaleDateString("sv-SE");

  return fetchPricesByDate(today);
};

// Haetaan huomisen päivän hinnat
export const handleFetchTomorrowPrices = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // haetaan suomen aikojen mukaan
  const tomorrowDate = tomorrow.toLocaleDateString("sv-SE");

  return fetchPricesByDate(tomorrowDate);
};