import React, { useState, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import Card from "./Card"; // Importing the Card component
import * as timetableData from "./timetable.json";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Swiper from "react-native-swiper";
import AddNewCardButton from "./AddNewCardButton";

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
    ubuntu: require("../assets/Ubuntu-B.ttf"),
    roboto: require("../assets/Roboto-Bold.ttf"),
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
    <View style={styles.container}>
      <AddNewCardButton></AddNewCardButton>
      <Swiper style={styles.swiperContainer} loop={true} loopJump={false}>
        {days.map((str, idx) => (
          <View key={str + idx} style={styles.slide}>
            <Text key={idx} style={styles.title}>
              {date_translation[str]}{" "}
            </Text>
            {timetableData[str].map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </View>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  slide: {
    alignItems: "center",
  },
  title: {
    fontSize: 24, // Font size of the title
    color: "#333", // Text color
    marginBottom: 20,
    fontFamily: "roboto",
  },
  swiperContainer: {},
});
