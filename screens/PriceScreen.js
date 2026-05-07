
import { useEffect, useState } from "react";
import { Text, View, FlatList, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import PriceChart from "../components/PriceChart";
import { usePrices } from "../hooks/usePrices";

import { screenStyles as styles } from "../styles/screenStyles";

import {
  getMinPrice,
  getMaxPrice,
  getAveragePrice,
  getCurrentPrice,
  getPriceLevel,
} from "../utils/priceHelper";

import { priceColors } from "../utils/colors";
import { isTomorrowAvailable } from "../utils/timeGate";

// mode = today / tomorrow
export default function PriceScreen({ mode, theme }) {

  // STATE - aika (pvm) ja hinta (today / tomorrow)
  const [currentTime, setCurrentTime] = useState(new Date());
  const { prices, setPrices } = usePrices(mode);

  // LASKENNAT JA SORTTAUS -> priceHelper.js
  const minPrice = getMinPrice(prices);
  const maxPrice = getMaxPrice(prices);
  const averagePrice = getAveragePrice(prices);
  const currentPrice = getCurrentPrice(prices, currentTime);

  // Aikajärjestykseen => 00:00 -> 23:45 kellonaikaan
  const sortedPrices = [...prices].sort(
    (a, b) =>
      new Date(a.aikaleima_utc + "Z") -
      new Date(b.aikaleima_utc + "Z")
  );

  // Kellonajan päivitys - minuutin välein 
  // => käyttö 'Hinta juuri nyt' -kortissa
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // TOMORROW LOCK - näytetään teksti jos kello on liian vähän (early return)
  if (mode === "tomorrow" && !isTomorrowAvailable()) {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={[
            styles.lockedContainer,
            { backgroundColor: theme.background }
          ]}>
          <Text style={[styles.lockedText, { color: theme.text }]}>
            Huomisen hinnat näkyvät {'\n'} klo 14:15 jälkeen
          </Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // LIST ITEM - renderItem - miten data näytetään riveittäin
  // vartti aika-hinta parit flatlistassa + hintatasojen värit
  const renderItem = ({ item }) => {
    const price = item.hinta * 1.255;
    const level = getPriceLevel(price); // -> priceHelper.js
    const color = priceColors[level];   // -> price.js

    return (
      <View
        style={[
          styles.listRow,
          { backgroundColor: theme.card },
          { borderLeftColor: color, borderLeftWidth: 5 }
        ]}>

        {/* Otetaan pvm vain aika -> tyyli: tt:mm */}
        <Text style={[styles.time, { color: theme.text }]}>
          Klo {item.aikaleima_suomi.split("T")[1].slice(0, 5)}
        </Text>

        {/* Näytetään hinta 2 desimaalin mukaan. */}
        <Text style={[styles.price, { color: theme.text }]}>
          {price.toFixed(2)} c/kWh
        </Text>
      </View >
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme.background }
        ]}>

        {/* sivun vieritys */}
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

          {/* TODAY ONLY */}
          {mode === "today" && (
            <View
              style={[
                styles.currentPriceCard,
                { backgroundColor: theme.card }
              ]}>
              <Text
                style={[styles.currentLabel, { color: theme.subText }]}>
                Hinta juuri nyt
              </Text>

              <Text
                style={[styles.currentPrice, { color: theme.text }]}>
                {currentPrice ? `${currentPrice} c/kWh` : "Ladataan..."}
              </Text>
            </View>
          )}

          {/* STATUS (alin, ylin, keskihinta) */}
          <View style={[
            styles.statsCard,
            { backgroundColor: theme.card }
          ]}>

            <View style={styles.topRow}>

              {/* Päivän alin */}
              <View style={styles.statBlock}>
                <Text style={[styles.statTitle, { color: theme.subText }]}>
                  Päivän alin
                </Text>
                <Text style={[styles.statValue, { color: theme.text }]}>
                  {(minPrice * 1.255).toFixed(2)} c/kWh
                </Text>
              </View>

              {/* Päivän ylin */}
              <View style={styles.statBlock}>
                <Text style={[styles.statTitle, { color: theme.subText }]}>
                  Päivän ylin
                </Text>
                <Text style={[styles.statValue, { color: theme.text }]}>
                  {(maxPrice * 1.255).toFixed(2)} c/kWh
                </Text>
              </View>

            </View>

            <View style={styles.divider} />

            {/* Päivän keskihinta */}
            <View style={styles.averageContainer}>
              <Text style={[styles.statTitle, { color: theme.subText }]}>
                Keskihinta
              </Text>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {averagePrice} c/kWh
              </Text>
            </View>

          </View>

          {/* BAR CHART */}
          <PriceChart data={sortedPrices} theme={theme} />

          {/* FLATLIST */}
          <View style={[
            styles.bigCard,
            { backgroundColor: theme.card }
          ]}>
            {/* Näkymä aika-hinta listaus */}
            <FlatList
              data={sortedPrices}
              renderItem={renderItem}
              keyExtractor={(item) => item.aikaleima_utc}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>

        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );

}