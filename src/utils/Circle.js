import React from 'react';
import { View } from 'react-native';

const Circle = ({ color, size }) => {
  console.log(color)
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
      }}
    />
  );
};

export default Circle;
