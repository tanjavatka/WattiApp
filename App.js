import NavigatorApp from './navigation/NavigatorApp';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  const [isDark, setIsDark] = useState(false);

  // LUE TALLENNETTU TEEMA - puhelimen / sovelluksen muistista
  useEffect(() => {
    const loadTheme = async () => {
      try {
        // kun App avataan -> hakee tallennetun teeman
        const savedTheme = await AsyncStorage.getItem("theme");

        if (savedTheme !== null) {
          setIsDark(savedTheme === "dark");
        }
      } catch (error) {
        console.log("Virhe teeman haussa:", error);
      }
    };

    loadTheme();
  }, []);

  // TALLENNA TEEMA KUN SE MUUTTUU
  useEffect(() => {
    const saveTheme = async () => {
      try {
        // Kun käyttäjä vaihtaa teemaa -> tallennetaan valinta
        await AsyncStorage.setItem("theme", isDark ? "dark" : "light");
      } catch (error) {
        console.log("Virhe teeman tallennuksessa:", error);
      }
    };

    saveTheme();

  }, [isDark]);

  const theme = {
    isDark,
    background: isDark ? "#121212" : "#F4F7FA",
    card: isDark ? "#1e1e1e" : "#ffffff",
    text: isDark ? "#ffffff" : "#111111",
    subText: isDark ? "#bbbbbb" : "#666666",
  };

  return (
    <>
      <NavigatorApp
        theme={theme}
        setIsDark={setIsDark}
        isDark={isDark}
      />

      <StatusBar style={isDark ? "light" : "dark"} />
    </>
  );
}