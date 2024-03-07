import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Card from "./Card"; // Importing the Card component
import { cardStyles } from "./styles"; // Importing the styles from styles.js
import * as timetableData from "./timetable.json"

const date_translation = {
  "monday": "Montag",
  "tuesday": "Dienstag",
  "wednesday": "Mittwoch",
  "thursday": "Donnerstag",
  "friday": "Freitag",
  "saturday": "Samstag",
  "sunday": "Sonntag"
};


const date = "monday"

export default function App() {
  return (
    <View style={styles.container}>
       <Text style={styles.title}>{date_translation[date]}</Text>
      {/* add Cards to day */}
      {timetableData[date].map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow:"scroll", 
    flex: 1,
    alignItems: "center",
    justifyContent: "top",
    marginTop: 80,
  },
  title: {
    fontSize: 24, // Font size of the title
    fontWeight: 'bold', // Font weight (bold)
    color: '#333', // Text color
    marginBottom: 20,
  },
});
