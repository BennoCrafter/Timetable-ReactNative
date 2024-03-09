import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const AddNewCardUi = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <Text>Coming soon!</Text>
      <Button title="Close" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#E2E5DE"
  }
})
export default AddNewCardUi;
