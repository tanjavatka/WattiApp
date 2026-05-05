import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import TodayScreen from '../screens/TodayScreen';
import TomorrowScreen from '../screens/TomorrowScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

export default function NavigatorApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
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
        <Tab.Screen name="Tänään" component={TodayScreen} />
        <Tab.Screen name="Huomenna" component={TomorrowScreen} />
        <Tab.Screen name="Asetukset" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// muuta ikonien väriä !