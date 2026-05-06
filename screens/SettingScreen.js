import React from "react";
import { View, Text, Switch } from "react-native";
import { screenStyles as styles } from "../styles/screenStyles";
import { priceColors } from "../utils/colors";


export default function SettingScreen({ theme, isDark, setIsDark }) {

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      {/* THEME */}
      <View style={[styles.statsCard, { backgroundColor: theme.card }]}>

        <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text }}>
          🌗 Teema
        </Text>

        <View style={extra.row}>
          <Text style={{ color: theme.subText }}>
            Tumma teema
          </Text>

          <Switch
            value={isDark}
            onValueChange={() => setIsDark(prev => !prev)}
          />
        </View>
      </View>

      {/* INFO */}
      <View style={[styles.statsCard, { backgroundColor: theme.card }]}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text }}>
          ℹ️ App info
        </Text>

        <Text style={{ color: theme.subText, marginTop: 8 }}>
          Näyttää pörssisähkön hinnat varttitasolla.
        </Text>

        <Text style={{ color: theme.subText, marginTop: 6 }}>
          Data: sahkohinta-api.fi
        </Text>
      </View>

      {/* PRICE LEVELS */}
      <View style={[styles.statsCard, { backgroundColor: theme.card }]}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text }}>
          📊 Hintaluokat
        </Text>

        {/* HALVIN */}
        <View style={extra.rowColor}>
          <View style={[
            extra.dot,
            { backgroundColor: priceColors.cheap }
          ]} />
          <Text style={{ color: theme.text }}>
            Halvin: alle 3 c/kWh
          </Text>
        </View>

        {/* KESKITASO */}
        <View style={extra.rowColor}>
          <View style={[
            extra.dot,
            { backgroundColor: priceColors.medium }
          ]} />
          <Text style={{ color: theme.text }}>
            Keskitaso: alle 10 c/kWh
          </Text>
        </View>

        {/* KALLIS */}
        <View style={extra.rowColor}>
          <View style={[
            extra.dot,
            { backgroundColor: priceColors.expensive }
          ]} />
          <Text style={{ color: theme.text }}>
            Kallis: yli 10 c/kWh
          </Text>
        </View>

      </View>

      {/* VAT */}
      <View style={[styles.statsCard, { backgroundColor: theme.card }]}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text }}>
          💰 ALV
        </Text>

        <Text style={{ color: theme.subText, marginTop: 8 }}>
          Hinnat sisältävät ALV 25,5%
        </Text>
      </View>

      {/* TEKIJÄ */}
      <View style={[styles.statsCard, { backgroundColor: theme.card }]}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text }}>
          👩‍💻 Tekijä
        </Text>

        <Text style={{ color: theme.subText, marginTop: 8 }}>
          Tanja V
        </Text>

        <Text style={{ color: theme.subText, marginTop: 4 }}>
          React Native -projekti
        </Text>

        <Text style={{ color: theme.subText, marginTop: 4 }}>
          2026
        </Text>

      </View >

    </View >
  );
}

// EXTRA STYLES (vain tähän screeniin)
const extra = {
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  rowColor: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  }
};