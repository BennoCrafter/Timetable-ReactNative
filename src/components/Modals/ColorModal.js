import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Circle from "../../utils/Circle";
import NewColorModal from "./NewColorModal";
import { modalStyles } from "../../styles/modalStyles";
import { isDarkMode, darkModeStyle } from "../../styles/fontStyle";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ColorModal = ({
  visible,
  onClose,
  onSelectColor,
  colorOptions,
  onNewColorOptions,
}) => {
  const [showNewColorModal, setShowNewColorModal] = useState(false);
  const addNewColor = (colorCode) => {
    onNewColorOptions([...colorOptions, colorCode], "colorOptions");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[styles.container, modalStyles.modalContainer]}>
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
              onPress={() => setShowNewColorModal(true)}
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
            Select a color
          </Text>
          <GestureHandlerRootView>
            <ScrollView style={styles.scrollViewContainer}>
              <View style={styles.colorOptionsContainer}>
                {colorOptions.map((color, index) => (
                  <TouchableOpacity
                    onPress={() => onSelectColor(color)}
                    style={modalStyles.item}
                    key={index}
                  >
                    <Circle color={color} size={50}></Circle>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </GestureHandlerRootView>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showNewColorModal}
        onRequestClose={() => setShowNewColorModal(false)}
      >
        <NewColorModal
          onClose={() => setShowNewColorModal(false)}
          onNewColor={addNewColor}
        />
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  colorOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  scrollViewContainer: {
    maxHeight: "85%",
  },
});

export default ColorModal;
