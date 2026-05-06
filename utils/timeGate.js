
// Tarkistetaan onko huomisen aika+hinta saatavilla. Onko kello jo 14:15
export const isTomorrowAvailable = () => {
  const now = new Date();

  const cutoff = new Date();
  cutoff.setHours(14, 15, 0, 0);

  return now >= cutoff;

  // Tomorrow sivun testaus
  // return true;
};

// Tomorrow sivun testaus
// export const isTomorrowAvailable = () => true;