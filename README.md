# WattiApp ⚡

A mobile app for checking Finnish exchange electricity prices in 15-minute intervals, for today and tomorrow.

Built as the final project of the Mobile Development course at Haaga-Helia University of Applied Sciences (topic of my own choice).

## Features

- **Today and tomorrow** – prices for every 15 minutes; tomorrow's prices become available after 14:15
- **Price cards** – current, lowest, highest and average price
- **Colour-coded price levels** – cheap (under 3 c/kWh), medium (under 10 c/kWh) and expensive (over 10 c/kWh)
- **Bar chart** – scrollable chart of the day's prices
- **Light and dark theme** – the selected theme is saved on the device
- Prices include VAT 25.5 %

## Tech stack

- React Native + Expo
- React Navigation (bottom tabs)
- react-native-chart-kit
- AsyncStorage
- REST API: [sahkohinta-api.fi](https://www.sahkohinta-api.fi)

## Project structure

```
screens/      Today, Tomorrow and Settings views
components/   Price chart
hooks/        usePrices – fetches and stores the price data
services/     API calls
utils/        Price calculations, colours and time logic
navigation/   Bottom tab navigation
```

## Getting started

```bash
npm install
npx expo start
```

Then open the app with Expo Go on your phone, or in an emulator.
