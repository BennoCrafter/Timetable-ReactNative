import AsyncStorage from "@react-native-async-storage/async-storage";
import { sortTimetableDay } from "../../utils/functions/sortTimetableDay";

export const editCard = async (
  clickedCardData,
  currentTimetableData,
  newData
) => {
  const { day, lessonData } = newData;
  clickedCardData["lesson"] = lessonData["lesson"];
  clickedCardData["color"] = lessonData["color"];
  clickedCardData["timeBegin"] = lessonData["timeBegin"];
  clickedCardData["timeEnd"] = lessonData["timeEnd"];

  currentTimetableData[day][clickedCardData["index"]] = clickedCardData;
  currentTimetableData[day] = sortTimetableDay(currentTimetableData[day]);
  await AsyncStorage.setItem("timetable", JSON.stringify(currentTimetableData));
  return currentTimetableData;
};
