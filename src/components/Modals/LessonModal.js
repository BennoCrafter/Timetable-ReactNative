import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert
} from "react-native";
import { modalStyles } from "../../styles/modalStyles";
import { isDarkMode, darkModeStyle } from "../../styles/fontStyle";

const LessonModal = ({
  visible,
  onClose,
  onSelectLesson,
  lessonOptions,
  onNewLessonOptions,
}) => {
  const addNewLesson = (lessonName) => {
    onNewLessonOptions([...lessonOptions, lessonName], "lessonOptions");
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[modalStyles.modalContainer]}>
        <View style={[modalStyles.modalContent, isDarkMode ? darkModeStyle.backgroundTheme: []]}>
          <View style={modalStyles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={modalStyles.button3}>
              <Text style={[modalStyles.buttonText, isDarkMode ? darkModeStyle.fontColor: []]}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.prompt("Enter New Lesson Name", null, [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: addNewLesson,
                  },
                ])
              }
              style={modalStyles.button2}
            >
              <Text style={[modalStyles.buttonText, isDarkMode ? darkModeStyle.fontColor: []]}>Add</Text>
            </TouchableOpacity>
          </View>
          <Text style={[modalStyles.modalHeader, isDarkMode ? darkModeStyle.fontColor: []]}>Select a lesson</Text>
          {lessonOptions.map((lesson, index) => (
            <TouchableOpacity
              onPress={() => onSelectLesson(lesson)}
              style={[modalStyles.item, isDarkMode ? darkModeStyle.fontColor: []]}
              key={index}
            >
              <Text style={isDarkMode ? darkModeStyle.fontColor : []}>{lesson}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default LessonModal;
