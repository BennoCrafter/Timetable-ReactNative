import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card'; // Importing the Card component
import { cardStyles } from './styles'; // Importing the styles from styles.js

export default function App() {
  return (
    <View style={styles.container}>
      <Card time_begin="7:55" time_end="8:40" title="Deutsch" color="#FF5B38"/>
      <Card time_begin="8:40" time_end="9:25" title="Mathe" color='#38B7FF'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    marginTop : 80,
  },
});
