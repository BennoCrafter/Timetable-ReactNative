import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Card from "./Card/Card";

const RenderCards = ({ day, timetableData, setEditModalVisible, setClickedCardData }) => {
  const renderCards = (day, timetableData) => {
    return timetableData && timetableData[day]
      ? timetableData[day].map((card, index) => (
          <TouchableOpacity
            key={index + "touch"}
            onPress={() => {
              setClickedCardData({ ...card, day, index });
              setEditModalVisible(true);
            }}
          >
            <Card key={index} {...card} />
          </TouchableOpacity>
        ))
      : null;
  };

  return renderCards(day, timetableData);
};

export default RenderCards;
