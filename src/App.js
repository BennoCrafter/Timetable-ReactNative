import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import * as devConfig from "../assets/dev-config.json";
import { isDarkMode } from "./styles/fontStyle";
import { darkModeStyle } from "./styles/fontStyle";
import { convertUnicodeToEmojis } from "./utils/functions/convertUnicodeToEmojis";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AddNewCardButton from "./components/Button/AddNewCardButton";
import EditCardModal from "./components/Modals/EditCardModal";
import { sortTimetableDay } from "./utils/functions/sortTimetableDay";
import RenderCards from "./components/RenderCards";
import { useFonts } from "expo-font";

import { initializeState, deleteData, loadData } from "./state/state";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [clickedCardData, setClickedCardData] = useState();
  const [fontsLoaded, fontError] = useFonts({
    ubuntu: require("../assets/Ubuntu-B.ttf"),
    roboto: require("../assets/Roboto-Bold.ttf"),
  });
  const [timetableData, setTimetableData] = useState();
  const [days, setDays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (devConfig["dataClear"]) {
        await deleteData();
      }
      await loadData(setTimetableData, setDays);
    };

    fetchData();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const addCard = async (newCard, updatedDayOptions) => {
    const { day, lessonData } = newCard;
    const updatedTimetableData = {
      ...timetableData,
      [day]: sortTimetableDay([...(timetableData[day] || []), lessonData]),
    };
    setTimetableData(updatedTimetableData);
    setDays(updatedDayOptions);
  };

  return (
    <View style={[styles.container, isDarkMode ? darkModeStyle.backgroundTheme : {}]}>
      <AddNewCardButton onCardAdd={addCard} />
      <EditCardModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        clickedCardData={clickedCardData}
        onUpdatedData={setTimetableData}
        currentTimetableData={timetableData}
      />
      <Swiper style={styles.swiperContainer} loop loopJump={false}>
        {days.map((day, idx) => (
          <View key={day + idx} style={styles.slide}>
            <Text style={[styles.title, isDarkMode ? darkModeStyle.fontColor : {}]}>
              {convertUnicodeToEmojis(day)}
            </Text>
            <GestureHandlerRootView style={styles.ghrv}>
              <RenderCards
                day={day}
                timetableData={timetableData}
                setEditModalVisible={setEditModalVisible}
                setClickedCardData={setClickedCardData}
              />
            </GestureHandlerRootView>
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
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "roboto",
  },
  swiperContainer: {},
  ghrv: {
    width: "90%",
  },
});
