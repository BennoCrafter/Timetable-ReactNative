import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addNewLessonToTimetable } from "../../utils/AddNewCardBackend";
import { prettifyTime } from "../../utils/functions/prettifyTime";
import LessonModal from "../Modals/LessonModal";
import DayModal from "../Modals/DayModal";
import ColorModal from "../Modals/ColorModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { modalStyles } from "../../styles/modalStyles";
import { darkModeStyle, isDarkMode } from "../../styles/fontStyle";
import { convertEmojisToUnicode } from "../../utils/functions/convertEmojisToUnicode";

const AddNewCardUi = ({ onClose, onCardAdd }) => {
  const [lessonModalVisible, setLessonModalVisible] = useState(false);
  const [dayModalVisible, setDayModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState("Select lesson");
  const [selectedDay, setSelectedDay] = useState("Select day");
  const [selectedColor, setSelectedColor] = useState("Select color");
  const [timeBegin, setTimeBegin] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [lessonOptions, setLessonOptions] = useState([
    "Deutsch",
    "Mathe",
    "Englisch",
  ]);
  const [dayOptions, setDayOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState(["#61A8EC"]);

  let storedData;
  const loadData = async () => {
    try {
      storedData = await AsyncStorage.getItem("lessonOptions");
      setLessonOptions(JSON.parse(storedData) || []);

      storedData = await AsyncStorage.getItem("colorOptions");
      setColorOptions(JSON.parse(storedData) || []);

      storedData = await AsyncStorage.getItem("dayOptions");
      setDayOptions(JSON.parse(storedData) || []);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openLessonModal = () => {
    setLessonModalVisible(true);
  };

  const openDayModal = () => {
    setDayModalVisible(true);
  };

  const closeLessonModal = () => {
    setLessonModalVisible(false);
  };

  const closeDayModal = () => {
    setDayModalVisible(false);
  };

  const openColorModal = () => {
    setColorModalVisible(true);
  };

  const closeColorModal = () => {
    setColorModalVisible(false);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setColorModalVisible(false);
  };

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setLessonModalVisible(false);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setDayModalVisible(false);
  };

  const handleNewCard = () => {
    const data = {
      day: convertEmojisToUnicode(selectedDay),
      lessonData: {
        color: selectedColor,
        lesson: convertEmojisToUnicode(selectedLesson),
        time_begin: prettifyTime(timeBegin),
        time_end: prettifyTime(timeEnd),
      },
    };

    addNewLessonToTimetable(data);
    onCardAdd(data);
    onClose();
  };

  const onChangeBegin = (event, selectedDate) => {
    const currentDate = selectedDate || timeBegin;
    setTimeBegin(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || timeEnd;
    setTimeEnd(currentDate);
  };
  // todo: make clea
  const handleNewOptions = async (options, storageKey) => {
    try {
      switch (storageKey) {
        case "lessonOptions":
          setLessonOptions(options);
          break;
        case "colorOptions":
          setColorOptions(options);
          break;
        case "dayOptions":
          setDayOptions(options);
          break;
        default:
          break;
      }
      await AsyncStorage.setItem(storageKey, JSON.stringify(options));
      console.log(`${storageKey} saved successfully!`);
    } catch (error) {
      console.error(`Error saving ${storageKey}:`, error);
    }
  };
  
  return (
    <View style={[modalStyles.modalContent, isDarkMode ? darkModeStyle.backgroundTheme : {}]}>
        <View style={modalStyles.buttonContainer}>
          <TouchableOpacity onPress={onClose} style={modalStyles.button3}>
            <Text style={[modalStyles.buttonText, isDarkMode ? darkModeStyle.fontColor : {}]}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNewCard()}
            style={modalStyles.button2}
          >
            <Text style={[modalStyles.buttonText, isDarkMode ? darkModeStyle.fontColor : {}]}>Add</Text>
          </TouchableOpacity>
        </View>

      <TouchableOpacity onPress={openLessonModal} style={modalStyles.input}>
        <Text style={modalStyles.lessonText}>{selectedLesson}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openDayModal} style={modalStyles.input}>
        <Text style={modalStyles.lessonText}>{selectedDay}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openColorModal} style={modalStyles.input}>
        <Text style={modalStyles.lessonText}>{selectedColor}</Text>
      </TouchableOpacity>

      <LessonModal
        visible={lessonModalVisible}
        onClose={closeLessonModal}
        onSelectLesson={handleLessonSelect}
        lessonOptions={lessonOptions}
        onNewLessonOptions={handleNewOptions}
      />

      <DayModal
        visible={dayModalVisible}
        onClose={closeDayModal}
        onSelectDay={handleDaySelect}
        dayOptions={dayOptions}
        onNewDayOptions={handleNewOptions}
      />

      <ColorModal
        visible={colorModalVisible}
        onClose={closeColorModal}
        onSelectColor={handleColorSelect}
        colorOptions={colorOptions}
        onNewColorOptions={handleNewOptions}
      />

      <View style={modalStyles.timeContainer}>
        <Text style={[modalStyles.label, isDarkMode ? darkModeStyle.fontColor : {}]}>Time begin:</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={timeBegin || new Date()}
          mode={"time"}
          is24Hour={true}
          onChange={onChangeBegin}
          style={[modalStyles.dateTimePicker]}
          themeVariant={isDarkMode ? "dark" : "light"}
        />
      </View>

      <View style={modalStyles.timeContainer}>
        <Text style={[modalStyles.label, isDarkMode ? darkModeStyle.fontColor : {}]}>Time end:</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={timeEnd || new Date()}
          mode={"time"}
          is24Hour={true}
          onChange={onChangeEnd}
          style={modalStyles.dateTimePicker}
          themeVariant={isDarkMode ? "dark" : "light"}
        />
      </View>
    </View>
  );
};

export default AddNewCardUi;
