import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import PriceScreen from '../screens/PriceScreen';
import SettingScreen from '../screens/SettingScreen';

// Alareunan navigaatio
const Tab = createBottomTabNavigator();

export default function NavigatorApp({ theme, isDark, setIsDark }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarStyle: {
            backgroundColor: theme.card,
          },

          tabBarActiveTintColor: theme.text,
          tabBarInactiveTintColor: "#888",

          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Tänään') {
              iconName = 'flash-outline';
            } else if (route.name === 'Huomenna') {
              iconName = 'flash-outline';
            } else if (route.name === 'Asetukset') {
              iconName = 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >

        {/* TODAY */}
        <Tab.Screen name="Tänään">
          {(props) => (
            <PriceScreen {...props} mode="today" theme={theme} />
          )}
        </Tab.Screen>

        {/* TOMORROW */}
        <Tab.Screen name="Huomenna">
          {(props) => (
            <PriceScreen {...props} mode="tomorrow" theme={theme} />
          )}
        </Tab.Screen>

        {/* SETTINGS */}
        <Tab.Screen name="Asetukset" >
          {(props) => (
            <SettingScreen
              {...props}
              theme={theme}
              isDark={isDark}
              setIsDark={setIsDark}
            />
          )}
        </Tab.Screen>

      </Tab.Navigator>
    </NavigationContainer>
  );
}