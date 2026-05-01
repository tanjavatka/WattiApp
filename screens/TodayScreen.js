import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { handleFetchTodayPrices } from '../services/api';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

export default function TodayScreen() {

  const [prices, setPrices] = useState([]);

  // Screen avautuu -> käynnistyy useEffect()
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

  console.log("PRICES:", prices);

  const sortedPrices = [...prices].sort(
    (a, b) => new Date(a.aikaleima_suomi) - new Date(b.aikaleima_suomi)
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>Today Prices</Text>
        <FlatList
          // flatlist näyttää datan prices (useStatesta)
          data={sortedPrices}
          // keyExtractor={(item) => item.aikaleima_suomi} 

          renderItem={({ item }) => (

            <View style={styles.card}>
              <View style={styles.row}>
                <Text
                  style={styles.time}>
                  {item.aikaleima_suomi.split("T")[1].slice(0, 5)}
                </Text>
                <Text style={styles.price}>{(item.hinta * 1.255).toFixed(2)} c/kWh</Text>
              </View>
            </View>
          )}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 35,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,

    width: "100%",

    // varjo (iOS + Android)
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  time: {
    fontSize: 14,
    color: "#666",
  },

  price: {
    fontSize: 16,
    // fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});