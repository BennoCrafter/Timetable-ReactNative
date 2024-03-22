import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, Button } from "react-native";
import { modalStyles } from "../../styles/modalStyles";
import { isDarkMode, darkModeStyle } from "../../styles/fontStyle";
import { Alert } from "react-native";
import { convertEmojisToUnicode } from "../../utils/functions/convertEmojisToUnicode";
import { convertUnicodeToEmojis } from "../../utils/functions/convertUnicodeToEmojis";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { editCard } from "../Card/editCard";
import CardCreationUi from "../NewCard/CardCreationUi";

const EditCardModal = ({
  visible,
  onClose,
  clickedCardData,
  onUpdatedData,
  currentTimetableData
}) => {
  const submit = async (newData) => {
    onUpdatedData(await editCard(clickedCardData, currentTimetableData, newData));
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <CardCreationUi
        onClose={onClose}
        onCardAdd={submit}
        mode={"Edit Card"}
        defaultInputText={clickedCardData
        }
      />
    </Modal>
  );
};

export default EditCardModal;
