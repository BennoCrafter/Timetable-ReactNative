import React, { useState, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import Card from "./Card"; // Importing the Card component
import { cardStyles } from "./styles"; // Importing the styles from styles.js
import * as timetableData from "./timetable.json";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Swiper from "react-native-swiper";

SplashScreen.preventAutoHideAsync();

const date_translation = {
  monday: "Montag",
  tuesday: "Dienstag",
  wednesday: "Mittwoch",
  thursday: "Donnerstag",
  friday: "Freitag",
  saturday: "Samstag",
  sunday: "Sonntag",
};

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    example: require("../assets/font.ttf"),
    cousine: require("../assets/Cousine-Regular.ttf"),
    ubuntu: require("../assets/Ubuntu-B.ttf"),
    roboto: require("../assets/Roboto-Regular.ttf"),
    dmsans: require("../assets/dmsans.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  onLayoutRootView();

  return (
    <Swiper style={styles.swiperContainer}>
        {days.map((str, idx) => (
          <View key={str+idx} style={styles.slide}>
            <Text key={idx} style={styles.title}>{date_translation[str]} </Text>
            {timetableData[str].map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </View>
        ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    marginTop: "15%",
  },
  title: {
    fontSize: 24, // Font size of the title
    fontWeight: "bold", // Font weight (bold)
    color: "#333", // Text color
    marginBottom: 20,
  },
});
