import AsyncStorage from "@react-native-async-storage/async-storage";
import { sortTimetableDay } from "../../utils/functions/sortTimetableDay";

export const editCard = async (
  clickedCardData,
  currentTimetableData,
  newData
) => {
  const { day, lessonData } = newData;

  currentTimetableData[day][clickedCardData["index"]] = lessonData;
  // sorting if times changed
  currentTimetableData[day] = sortTimetableDay(currentTimetableData[day]);
  await AsyncStorage.setItem("timetable", JSON.stringify(currentTimetableData));
  return currentTimetableData;
};
