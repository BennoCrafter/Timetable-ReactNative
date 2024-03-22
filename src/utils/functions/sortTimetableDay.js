import { formatTime } from "./formatTime";

export const sortTimetableDay = (timetable) => {
    const sortedTimetable = timetable
      .map((card) => {
        const formattedTime = new Date(formatTime(card["timeBegin"]));
        return { ...card, formattedTime }; // Adding formattedTime to each card object
      })
      .sort((a, b) => a.formattedTime - b.formattedTime)
      .map(({ formattedTime, ...rest }) => rest); // Omitting formattedTime from each object
  
    return sortedTimetable;
  };
  