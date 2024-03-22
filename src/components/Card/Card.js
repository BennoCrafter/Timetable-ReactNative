import React from 'react';
import {View, Text} from 'react-native';
import {cardStyles} from '../../styles/styles'; // Importing the styles from styles.js
import { convertUnicodeToEmojis } from '../../utils/functions/convertUnicodeToEmojis';

const Card = ({timeBegin, timeEnd, lesson, color = 'gray'}) => {
  return (
    <View style={[cardStyles.card, {backgroundColor: color}]}>
      <Text style={cardStyles.timeBegin}>{timeBegin}</Text>
      <Text style={cardStyles.timeEnd}>{timeEnd}</Text>
      <Text style={cardStyles.lesson}>{convertUnicodeToEmojis(lesson)}</Text>
    </View>
  );
};

export default Card;
