// MyComponent.js

import React from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import openModal from "./AddNewCard"
import AddNewCard from './AddNewCard';

const AddButton = () => {
  const handlePress = () => {
    Alert.alert('Button pressed!', 'You just clicked the + button!');
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    marginLeft: "90%",
    marginTop: "20%",
    paddingBottom: "3%"
  },
  buttonText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AddButton;
