import React from "react";
import { View, Text, Modal, TouchableOpacity, Button } from "react-native";
import { modalStyles } from "../../styles/modalStyles";
import { isDarkMode, darkModeStyle } from "../../styles/fontStyle";
import { Alert } from "react-native";
import { convertEmojisToUnicode } from "../../utils/functions/convertEmojisToUnicode";
import { convertUnicodeToEmojis } from "../../utils/functions/convertUnicodeToEmojis";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

const DayModal = ({ visible, onClose, onSelectDay, dayOptions, onNewDayOptions }) => {
  const addNewDay = (dayName) => {
    onNewDayOptions([...dayOptions, convertEmojisToUnicode(dayName)], "dayOptions");
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[modalStyles.modalContainer]}>
        <View
          style={[
            modalStyles.modalContent,
            isDarkMode ? darkModeStyle.backgroundTheme : [],
          ]}
        >
          <View style={modalStyles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={modalStyles.button3}>
              <Text
                style={[
                  modalStyles.buttonText,
                  isDarkMode ? darkModeStyle.fontColor : [],
                ]}
              >
                Close
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.prompt("Enter New Day Name", null, [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: addNewDay,
                  },
                ])
              }
              style={modalStyles.button2}
            >
              <Text
                style={[
                  modalStyles.buttonText,
                  isDarkMode ? darkModeStyle.fontColor : [],
                ]}
              >
                Add
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={[
              modalStyles.modalHeader,
              isDarkMode ? darkModeStyle.fontColor : [],
            ]}
          >
            Select a day
          </Text>
          {dayOptions.map((day, index) => (
            <TouchableOpacity
              onPress={() => onSelectDay(day)}
              style={[
                modalStyles.item,
                isDarkMode ? darkModeStyle.fontColor : [],
              ]}
              key={index}
            >
              <Text style={isDarkMode ? darkModeStyle.fontColor : []}>{convertUnicodeToEmojis(day)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default DayModal;
