import { useEffect, useState } from "react";
import { handleFetchTodayPrices, handleFetchTomorrowPrices } from "../services/api";

export const usePrices = (mode) => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  // haetaan aika-hinta parit moden mukaan.
  // mode = today / tomorrow
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const result =
        mode === "today"
          ? await handleFetchTodayPrices()
          : await handleFetchTomorrowPrices();

      setPrices(result);
      setLoading(false);
    };

    load();

    // päivän testaus -> today / tomorrow
    console.log("MODE:", mode);

  }, [mode]);

  return { prices, loading };
};