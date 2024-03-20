import AsyncStorage from "@react-native-async-storage/async-storage";

// Inside your component function
export const addNewLessonToTimetable = async (newLesson, dispatch) => {
    try {
        // Retrieve existing timetable data from AsyncStorage
        let existingTimetable = await AsyncStorage.getItem('timetable');
        existingTimetable = JSON.parse(existingTimetable) || {};

        // Extract day and lesson data from the new lesson
        const { day, lessonData } = newLesson;

        // Add the new lesson data to the appropriate day's timetable
        existingTimetable[day] = existingTimetable[day] || []; // Ensure the day exists in the timetable
        existingTimetable[day].push(lessonData); // Add the new lesson data

        // Stringify the updated timetable data
        const updatedTimetableString = JSON.stringify(existingTimetable);

        // Save the updated timetable data back to AsyncStorage
        await AsyncStorage.setItem('timetable', updatedTimetableString);
        console.log('New lesson added to timetable successfully!');
    } catch (error) {
        console.error('Error adding new lesson to timetable:', error);
    }
};
