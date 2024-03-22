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
import { formatTime } from "../../utils/functions/formatTime";

const CardCreationUi = ({ onClose, onCardAdd, mode, defaultInputText }) => {
  const [lessonModalVisible, setLessonModalVisible] = useState(false);
  const [dayModalVisible, setDayModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(defaultInputText != null ? defaultInputText["lesson"]:"Select lesson");
  const [selectedDay, setSelectedDay] = useState(defaultInputText != null ? defaultInputText["day"]:"Select day");
  const [selectedColor, setSelectedColor] = useState(defaultInputText != null ? defaultInputText["color"]: "Select color");
  const [timeBegin, setTimeBegin] = useState(defaultInputText != null ? new Date(formatTime(defaultInputText["timeBegin"])) : new Date());
  const [timeEnd, setTimeEnd] = useState(defaultInputText != null ? new Date(formatTime(defaultInputText["timeEnd"])): new Date());
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [lessonOptions, setLessonOptions] = useState([]);
  const [dayOptions, setDayOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);

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
      day: selectedDay,
      lessonData: {
        color: selectedColor,
        lesson: selectedLesson,
        timeBegin: prettifyTime(timeBegin),
        timeEnd: prettifyTime(timeEnd),
      },
    };
    onCardAdd(data);
    if (mode === "New Card") {
      addNewLessonToTimetable(data);
    }
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
    <View
      style={[
        modalStyles.modalContent,
        isDarkMode ? darkModeStyle.backgroundTheme : {},
      ]}
    >
      <View style={modalStyles.buttonContainer}>
        <TouchableOpacity onPress={onClose} style={modalStyles.button3}>
          <Text
            style={[
              modalStyles.buttonText,
              isDarkMode ? darkModeStyle.fontColor : {},
            ]}
          >
            Close
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNewCard()}
          style={modalStyles.button2}
        >
          <Text
            style={[
              modalStyles.buttonText,
              isDarkMode ? darkModeStyle.fontColor : {},
            ]}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={[modalStyles.label, isDarkMode ? darkModeStyle.fontColor : {}]}
      >
        {mode}
      </Text>

      <TouchableOpacity onPress={openDayModal} style={modalStyles.input}>
        <Text style={modalStyles.lessonText}>{selectedDay}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openLessonModal} style={modalStyles.input}>
        <Text style={modalStyles.lessonText}>{selectedLesson}</Text>
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
        <Text
          style={[modalStyles.label, isDarkMode ? darkModeStyle.fontColor : {}]}
        >
          Time begin:
        </Text>
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
        <Text
          style={[modalStyles.label, isDarkMode ? darkModeStyle.fontColor : {}]}
        >
          Time end:
        </Text>
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

export default CardCreationUi;
