import { sortTimetableDay } from "../../utils/functions/sortTimetableDay";
import { UpdateData } from "../../utils/UpdateData";

export const editCard = async (
  clickedCardData,
  currentTimetableData,
  newData
) => {
  const { day, lessonData } = newData;

  currentTimetableData[day][clickedCardData["index"]] = lessonData;
  // sorting if times changed
  currentTimetableData[day] = sortTimetableDay(currentTimetableData[day]);
  await UpdateData("timetable", currentTimetableData)
  return currentTimetableData;
};
