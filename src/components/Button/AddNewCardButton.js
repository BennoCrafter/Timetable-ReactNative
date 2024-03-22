import React, {useState} from 'react';
import {View, StyleSheet, Modal, TouchableOpacity, Text} from 'react-native';
import { isDarkMode, darkModeStyle } from '../../styles/fontStyle';
// Import your SecondView component here
import CardCreationUi from '../NewCard/CardCreationUi';

const AddNewCardButton = ({onCardAdd}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);

  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const addCard = (d) => {
    console.log(d)
    onCardAdd(d)
  }
  return (
    <View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <CardCreationUi onClose={closeModal} onCardAdd={addCard} mode={"New Card"} defaultInputText={null}/>
      </Modal>
      <View>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={[styles.buttonText, isDarkMode? darkModeStyle.fontColor: {}]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    marginLeft: '90%',
    marginTop: '20%',
    paddingBottom: '3%',
  },
  buttonText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AddNewCardButton;
