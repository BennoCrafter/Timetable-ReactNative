import React from "react";
import { View, Text, Button } from "react-native";

const SecondView = ({ onClose }) => {
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
    color: "#F2F3F5"
  }
})
export default SecondView;
