
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Slider from '@react-native-community/slider';
import { getDateLabel, getPriceLevel } from '../utils/priceHelper';
import { priceColors } from '../utils/colors';


const screenWidth = Dimensions.get("window").width;

export default function PriceChart({ data = [], theme }) {

  // SAFE FALLBACK (ESTÄÄ CRASHIT)
  const safeTheme = theme || {
    card: "#fff",
    text: "#000"
  };

  const [startIndex, setStartIndex] = useState(0);

  const dateLabel = getDateLabel(data);

  const visibleBars = 20; // kuinka monta pylvästä näkyy kerralla
  const safeSlide = Math.max(0, Math.round(startIndex));
  const start = safeSlide * visibleBars;
  const visibleData = data.slice(start, start + visibleBars);

  const values = visibleData.map(item =>
    Number(item.hinta) * 1.255
  );

  // BarChartin värit 
  const barColors = values.map(value => {
    const level = getPriceLevel(value);

    if (level === 'cheap') return priceColors.cheap;
    if (level === 'medium') return priceColors.medium;
    return priceColors.expensive;
  });

  // Data
  const chartData = {

    // Näytetään x akselin selityksessä vain tasatunnit eli joka 4 vartti
    labels: visibleData.map((item, index) =>
      index % 4 === 0
        ? item.aikaleima_suomi.split("T")[1].slice(0, 2)  // tunnit tyylillä tt
        : ""
    ),

    datasets: [
      {
        data: values,
        colors: barColors.map(color => () => color)
      }
    ]
  };

  return (
    <View style={[styles.chartCard,
    styles.chartWrapper,
    { backgroundColor: safeTheme.card }]}>

      <Text style={[styles.chartTitle, { color: safeTheme.text }]}>
        {dateLabel}
      </Text>

      <Text style={[styles.axisLabel, { color: safeTheme.text }]}>
        c/kWh
      </Text>

      {/* chartin ja pylväiden ulkoasu */}
      <BarChart
        data={chartData}

        // chartin leveys
        width={screenWidth - 40}
        height={220}
        segments={6}
        fromZero // chart hinta näkymä aloittaa nollasta

        // chartin pylväiden värit
        withCustomBarColorFromData={true}
        flatColor={true}

        chartConfig={{
          backgroundColor: safeTheme.card,
          backgroundGradientFrom: safeTheme.card,
          backgroundGradientTo: safeTheme.card,

          decimalPlaces: 1, // hinnan desimaalien määrä
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: () => safeTheme.text,

          barPercentage: 0.3, // pylväiden leveys

          propsForBackgroundLines: {
            stroke: "#eee"
          },

        }}

        style={{
          borderRadius: 16,
          paddingRight: 35,
          marginRight: -25,
        }}
      />

      <Slider
        style={{
          width: screenWidth - 70,
          alignSelf: 'center',
          marginTop: 8,
          height: 25,
        }}
        minimumValue={0}
        maximumValue={Math.ceil(data.length / visibleBars) - 1}
        value={startIndex}

        onValueChange={(value) => setStartIndex(Math.round(value))}
      />

    </View >
  );
}

// STYLES
const styles = StyleSheet.create({

  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 5,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  chartWrapper: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingTop: 15,
    paddingHorizontal: 12,
    paddingBottom: 12,
    marginBottom: 20,
  },

  axisLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
    marginLeft: 4,
    fontWeight: '500',
    position: 'absolute',
    top: 23,
    left: 5,

    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  chartTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 14,
    textAlign: 'center'
  },
});

//   NAPPULAT - OIKEALLE / VASEMMALLE - BAR CHARTTIIN
// return (
//     <View>

//       <BarChart

//       {/* SIMPLE "scroll" napit */}
//       <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>

//         <TouchableOpacity
//           onPress={() => setPage(Math.max(page - 1, 0))}
//         >
//           <Text>◀ Edellinen</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() =>
//             setPage(Math.min(page + 1, Math.floor(data.length / pageSize)))
//           }
//         >
//           <Text>Seuraava ▶</Text>
//         </TouchableOpacity>

//       </View>

//     </View>
//   );
// }