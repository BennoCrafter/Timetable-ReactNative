import React from 'react';
import {View, Text} from 'react-native';
import {cardStyles} from '../../styles/styles'; // Importing the styles from styles.js
import { convertUnicodeToEmojis } from '../../utils/functions/convertUnicodeToEmojis';

const Card = ({time_begin, time_end, lesson, color = 'gray'}) => {
  return (
    <View style={[cardStyles.card, {backgroundColor: color}]}>
      <Text style={cardStyles.time_begin}>{time_begin}</Text>
      <Text style={cardStyles.time_end}>{time_end}</Text>
      <Text style={cardStyles.lesson}>{convertUnicodeToEmojis(lesson)}</Text>
    </View>
  );
};

export default Card;
