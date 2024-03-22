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
import { convertEmojisToUnicode } from "../../utils/functions/convertEmojisToUnicode";
import { convertUnicodeToEmojis } from "../../utils/functions/convertUnicodeToEmojis";
import { GestureHandlerRootView, NativeViewGestureHandler, ScrollView } from "react-native-gesture-handler";

const LessonModal = ({
  visible,
  onClose,
  onSelectLesson,
  lessonOptions,
  onNewLessonOptions,
}) => {
  const addNewLesson = (lessonName) => {
    onNewLessonOptions([...lessonOptions, convertEmojisToUnicode(lessonName)], "lessonOptions");
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
          <GestureHandlerRootView>
          <ScrollView style={styles.scrollViewContainer}>
          {lessonOptions.map((lesson, index) => (
            <TouchableOpacity
              onPress={() => onSelectLesson(lesson)}
              style={[modalStyles.item, isDarkMode ? darkModeStyle.fontColor: []]}
              key={index}
            >
              <Text style={isDarkMode ? darkModeStyle.fontColor : []}>{convertUnicodeToEmojis(lesson)}</Text>
            </TouchableOpacity>
          ))}
          </ScrollView>
          </GestureHandlerRootView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    maxHeight: "85%",
  }
})
export default LessonModal;
