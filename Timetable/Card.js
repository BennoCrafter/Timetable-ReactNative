import React from 'react';
import { View, Text } from 'react-native';
import { cardStyles } from './styles'; // Importing the styles from styles.js

const Card = ({ time_begin, time_end, title, color="gray" }) => {
  return (
    <View style={[cardStyles.card, { backgroundColor: color }]}>
      <Text style={cardStyles.time_begin}>{time_begin}</Text>
      <Text style={cardStyles.time_end}>{time_end}</Text>
      <Text style={cardStyles.title}>{title}</Text>
    </View>
  );
};

export default Card;
