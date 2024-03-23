import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Card from "./components/Card/Card";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Swiper from "react-native-swiper";
import AddNewCardButton from "./components/Button/AddNewCardButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as devConfig from "../assets/dev-config.json";
import { isDarkMode } from "./styles/fontStyle";
import { darkModeStyle } from "./styles/fontStyle";
import { convertUnicodeToEmojis } from "./utils/functions/convertUnicodeToEmojis";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import EditCardModal from "./components/Modals/EditCardModal";
import { sortTimetableDay } from "./utils/functions/sortTimetableDay";

SplashScreen.preventAutoHideAsync();


export default function App() {
  const [editCardModalVisible, seteditCardModalVisible] = useState(false);
  const [clickedCardData, setClickedCardData] = useState()
  const [fontsLoaded, fontError] = useFonts({
    ubuntu: require("../assets/Ubuntu-B.ttf"),
    roboto: require("../assets/Roboto-Bold.ttf"),
  });

  const [timetableData, setTimetableData] = useState();
  const [days, setDays] = useState([]);
  const deleteData = async () => {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.setItem("colorOptions", '["#63C8BA","#5BBC73","#9B61E2","#EA676A","#4366CF","#61A8EC","#9A742A","#A7B1C0","#CB7CE0","#9AC8EB", "#F09A57"]')
    } catch {
      console.error("Error deleting database");
    }
  };
  const loadData = async () => {
    try {
      let storedData = await AsyncStorage.getItem("timetable");
      let parsedData = JSON.parse(storedData);
      setTimetableData(parsedData || {});
      setDays(
        parsedData !== null
          ? JSON.parse(await AsyncStorage.getItem("dayOptions"))
          : []
      );
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    if (devConfig["dataClear"]) {
      deleteData();
    }
    loadData();
  }, []);

  useEffect(() => {}, [timetableData]);

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

  const addCard = async (newCard) => {
    const { day, lessonData } = newCard;

    // Add the new lesson data to the appropriate day's timetable
    const updatedTimetableData = {
      ...timetableData,
      [day]: sortTimetableDay([...(timetableData[day] || []), lessonData]),
    };

    // Now we update the state with the new data
    setTimetableData(updatedTimetableData);
    setDays(JSON.parse(await AsyncStorage.getItem("dayOptions")));
  };

  const renderCards = (day, timetableData) => {
    return timetableData && timetableData[day]
      ? timetableData[day].map((card, index) => <TouchableOpacity key={index+"touch"} onPress={() => {setClickedCardData({...card , day, index});seteditCardModalVisible(true)}}><Card key={index} {...card} /></TouchableOpacity>)
      : null;
  };
  
  return (
    <View
      style={[
        styles.container,
        isDarkMode ? darkModeStyle.backgroundTheme : {},
      ]}
    >
      <AddNewCardButton onCardAdd={addCard} />
      <EditCardModal visible={editCardModalVisible} onClose={() => seteditCardModalVisible(false)} clickedCardData={clickedCardData} onUpdatedData={setTimetableData} currentTimetableData={timetableData}/>
      <Swiper
        style={styles.swiperContainer}
        loop={true}
        loopJump={false}
        onIndexChanged={(idx) => (currentIndex = idx)}
      >
        {days.map((day, idx) => (
          <View key={day + idx} style={styles.slide}>
            <Text
              key={idx}
              style={[styles.title, isDarkMode ? darkModeStyle.fontColor : {}]}
            >
              {convertUnicodeToEmojis(day)}
            </Text>
            <GestureHandlerRootView key={idx+"ghrv"} style={styles.ghrv}>
            {renderCards(day, timetableData)}
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
  }
});
