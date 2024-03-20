import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Card from './components/Card/Card';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import Swiper from 'react-native-swiper';
import AddNewCardButton from './components/Button/AddNewCardButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as devConfig from "../assets/dev-config.json"
import { fontColor } from './styles/fontStyle';
import { isDarkMode } from './styles/fontStyle';
import { darkModeStyle } from './styles/fontStyle';
SplashScreen.preventAutoHideAsync();

const date_translation = {
  monday: 'Montag',
  tuesday: 'Dienstag',
  wednesday: 'Mittwoch',
  thursday: 'Donnerstag',
  friday: 'Freitag',
  saturday: 'Samstag',
  sunday: 'Sonntag',
};

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    ubuntu: require('../assets/Ubuntu-B.ttf'),
    roboto: require('../assets/Roboto-Bold.ttf'),
  });

  const [timetableData, setTimetableData] = useState();

  const deleteData = async () => {
    try{
      await AsyncStorage.clear()
    }catch{
      console.error("Error deleting database")
    }
  }
  const loadData = async () => {
    try {
      let storedData = await AsyncStorage.getItem('timetable');
      setTimetableData(JSON.parse(storedData) || {});
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    if(devConfig["dataClear"]){
      deleteData()
    }
    loadData();
  }, []);

  useEffect(() => {
  }, [timetableData]);

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

  const addCard = (newCard) => {
    const { day, lessonData } = newCard;
  
    // Add the new lesson data to the appropriate day's timetable
    const updatedTimetableData = {
      ...timetableData,
      [day]: [...(timetableData[day] || []), lessonData],
    };
  
    // Now we update the state with the new data
    setTimetableData(updatedTimetableData);
  };
  
  return (
    <View style={[styles.container, isDarkMode ? darkModeStyle.backgroundTheme : {}]}>
      <AddNewCardButton onCardAdd={addCard}/>
        <Swiper
          style={styles.swiperContainer}
          loop={true}
          loopJump={false}
          onIndexChanged={(idx) => (currentIndex = idx)}
        >
          {days.map((str, idx) => (
            <View key={str + idx} style={styles.slide}>
              <Text key={idx} style={[styles.title,  isDarkMode ? darkModeStyle.fontColor : {}]}>
                {date_translation[str]}{' '}
              </Text>
              {renderCards(str, timetableData)}
            </View>
          ))}
        </Swiper>
    </View>
  );
}

const renderCards = (day, timetableData) => {
  return timetableData && timetableData[day]
    ? timetableData[day].map((card, index) => <Card key={index} {...card} />)
    : null;
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  slide: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'roboto',
  },
  swiperContainer: {},
});
