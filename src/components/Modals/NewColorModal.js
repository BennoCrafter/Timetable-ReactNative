import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { modalStyles } from "../../styles/modalStyles";
import {isDarkMode, darkModeStyle} from "../../styles/fontStyle"

const NewColorModal = ({ onClose, onNewColor }) => {
  const [colorCode, onChangeColorCode] = useState('#000000');

  const handleButtonClick = () => {
    onNewColor(colorCode)
    onClose()
  }
  return (
    <View style={modalStyles.modalContainer}>
      <View style={[modalStyles.modalContent, isDarkMode ? darkModeStyle.backgroundTheme: []]}>
        <View style={modalStyles.buttonContainer}>
          <TouchableOpacity onPress={onClose} style={modalStyles.button3}>
            <Text style={[modalStyles.buttonText, isDarkMode ? darkModeStyle.fontColor: []]}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleButtonClick()}
            style={modalStyles.button2}
          >
            <Text style={[modalStyles.buttonText, isDarkMode ? darkModeStyle.fontColor: []]}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={[modalStyles.modalHeader, isDarkMode ? darkModeStyle.fontColor: []]}>Enter hex code:</Text>
          <TextInput style={[modalStyles.input, styles.inputField]} value={colorCode} onChangeText={onChangeColorCode} />
          <View style={[styles.colorPreview, {backgroundColor: colorCode}]}></View>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  inputField: {
    maxWidth: "80%",
    minWidth: "80%",
    alignItems: "center"
  },
  colorPreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 5,
    justifyContent: "center"
  },
  container: {
    alignItems: "center"
  }
});

export default NewColorModal;
