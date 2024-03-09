import React, { useState} from "react";
import { View, StyleSheet, Modal, TouchableOpacity, Text } from "react-native";

// Import your SecondView component here
import SecondView from "./AddNewCardUi";

const AddNewCard = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <SecondView onClose={closeModal} />
      </Modal>
      <View>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    marginLeft: "90%",
    marginTop: "20%",
    paddingBottom: "3%",
  },
  buttonText: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default AddNewCard;
