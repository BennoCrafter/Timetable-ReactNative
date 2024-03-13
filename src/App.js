import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Card from './components/Card/Card';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import Swiper from 'react-native-swiper';
import AddNewCardButton from './components/Button/AddNewCardButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import store from './utils/store';

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

  const loadData = async () => {
    try {
      let storedData = await AsyncStorage.getItem('timetable');
      setTimetableData(JSON.parse(storedData));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log(timetableData, 'sd');
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
    timetableData[day] = timetableData[day] || []; // Ensure the day exists in the timetable
    timetableData[day].push(lessonData); // Add the new lesson data
    console.log("ADDED LOCAL DATA")
  };
  return (
    <View style={styles.container}>
      <AddNewCardButton onCardAdd={addCard}/>
      <Provider store={store}>
        <Swiper
          style={styles.swiperContainer}
          loop={true}
          loopJump={false}
          onIndexChanged={(idx) => (currentIndex = idx)}
        >
          {days.map((str, idx) => (
            <View key={str + idx} style={styles.slide}>
              <Text key={idx} style={styles.title}>
                {date_translation[str]}{' '}
              </Text>
              {renderCards(str, timetableData)}
            </View>
          ))}
        </Swiper>
      </Provider>
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
    color: '#333',
    marginBottom: 20,
    fontFamily: 'roboto',
  },
  swiperContainer: {},
});
