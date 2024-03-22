import React from 'react';
import { View } from 'react-native';

const Circle = ({ color, size }) => {
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
