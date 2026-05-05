import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { handleFetchTodayPrices } from '../services/api';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { getMinPrice, getMaxPrice, getAveragePrice, getCurrentPrice, getPriceLevel } from '../utils/priceHelper';
import { priceColors } from '../utils/colors';
import PriceChart from '../components/PriceChart';

export default function TodayScreen() {

  // STATE
  const [prices, setPrices] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // DATA + LASKENTA -> priceHelper.js
  // haetaan halvin, kallein, keski, nykyinen hinta
  const minPrice = getMinPrice(prices);
  const maxPrice = getMaxPrice(prices);
  const averagePrice = getAveragePrice(prices);
  const currentPrice = getCurrentPrice(prices, currentTime);

  // järjestetään hinnat aikajärjestykseen
  const sortedPrices = [...prices].sort(
    (a, b) => new Date(a.aikaleima_utc + "Z") - new Date(b.aikaleima_utc + "Z")
  );

  // USeEFFECT API
  // Screen avautuu -> käynnistyy useEffect() -> haetaan käytettävä data
  useEffect(() => {
    const loadData = async () => {
      // kutsuu api.js tiedostosta api hakua ja tallentaa sen result muuttujaan.
      const result = await handleFetchTodayPrices();
      console.log(result);
      // tallentaa datan (result / tuloksen) useStateen.
      setPrices(result);
    };

    loadData();
  }, []);

  // USeEFFECT KELLO
  // Päivitetään nykyinen aika
  // Päivittää currentTime -staten 60s välein
  // Käyttö 'Hinta juuri nyt' -kortissa
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // testausta tulostuuko data
  console.log("PRICES:", prices);

  // RENDERITEM
  // Näytetään data riveittäin -logiikka
  // vartti aika-hinta parit flatlistassa + hintatasojen värit
  const renderItem = ({ item }) => {

    const price = item.hinta * 1.255;
    const level = getPriceLevel(price);
    const color = priceColors[level];

    return (
      <View style={[styles.listRow, { borderLeftColor: color, borderLeftWidth: 5 }]}>

        <Text
          style={styles.time}>
          Klo {item.aikaleima_suomi.split("T")[1].slice(0, 5)}
        </Text>

        <Text style={styles.price}>
          {price.toFixed(2)} c/kWh
        </Text>

      </View>
    );
  };

  // RETURN - UI
  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

          {/* <Text>Hinnat tänään</Text> */}

          {/* Hinta NYT */}
          <View style={styles.currentPriceCard}>
            <Text style={styles.currentLabel}>
              Hinta juuri nyt
              {/* Hinta juuri nyt klo {currentTime.toLocaleTimeString('fi-FI', {
              hour: '2-digit',
              minute: '2-digit',
            })} */}
            </Text>

            <Text style={styles.currentPrice}>
              {currentPrice ? `${currentPrice} c/kWh` : 'Ladataan...'}
            </Text>
          </View>

          {/* Kortti jossa näkyy ALIN - YLIN - KESKI hinnat */}
          <View style={styles.statsCard}>

            <View style={styles.topRow}>

              {/* tuodaan näytölle päivän ALIN hinta */}
              <View style={styles.statBlock}>
                <Text style={styles.statTitle}>Päivän alin</Text>
                <Text style={styles.statValue}>{(minPrice * 1.255).toFixed(2)} c/kWh</Text>
              </View>

              {/* tuodaan näytölle päivän YLIN hinta */}
              <View style={styles.statBlock}>
                <Text style={styles.statTitle}>Päivän ylin</Text>
                <Text style={styles.statValue}>{(maxPrice * 1.255).toFixed(2)} c/kWh</Text>
              </View>

            </View>

            <View style={styles.divider} />

            {/* tuodaan näytölle päivän KESKI hinta */}
            <View style={styles.averageContainer}>
              <Text style={styles.statTitle}>Keskihinta</Text>
              <Text style={styles.statValue}>{averagePrice} c/kWh</Text>
            </View>
          </View>

          {/* BARCHART */}
          {/* Aika-hinta parit pylväsdiagrammissa | data + logiikka omassa tiedostossa */}
          <PriceChart data={sortedPrices} />

          {/* FLATLIST : kello-hinta listaus samaan korttiin */}
          <View style={styles.bigCard}>
            <FlatList
              // flatlist näyttää datan prices (useStatesta) sortattuna
              data={sortedPrices}
              // keyExtractor={(item) => item.aikaleima_suomi} ??

              // näytetään data riveittäin
              renderItem={renderItem}

              // erotetaan eri aika-kello parit väliviivalla
              ItemSeparatorComponent={() => (
                <View style={styles.separator} />
              )}
              showsVerticalScrollIndicator={false}

              scrollEnabled={false}
            />
          </View>

          <StatusBar style="auto" />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>

  );
}

// STYLES
const styles = StyleSheet.create({

  // SIVUSTON STYLE
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA', // '#fff'. '#cfc402'
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  // FLATLIST STYLE
  bigCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 4,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,

    flex: 1,
  },

  listRow: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginVertical: 4,
    borderRadius: 10,
  },

  separator: {
    height: 1,
    backgroundColor: '#eee',
  },

  time: {
    fontSize: 14,
    color: "#666",
  },

  price: {
    fontSize: 14,
    // fontWeight: "bold",
  },

  // YLIN - ALIN - KESKIHINTA
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 10,
    elevation: 4,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statBlock: {
    flex: 1,
    alignItems: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },

  averageContainer: {
    alignItems: 'center',
  },

  statTitle: {
    fontSize: 14,
    color: '#666',
  },

  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  averageValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  // HINTA NYT 
  currentPriceCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
    marginVertical: 20,
    alignItems: 'center',
    elevation: 5,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  currentLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },

  currentPrice: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});