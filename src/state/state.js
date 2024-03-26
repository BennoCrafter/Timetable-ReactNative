import AsyncStorage from "@react-native-async-storage/async-storage";
import defaultData from "../..//assets/defaultData.json";

export const deleteData = async () => {
  try {
    await AsyncStorage.clear();
    for (let item in defaultData) {
      await AsyncStorage.setItem(item, JSON.stringify(defaultData[item]));
    }
  } catch {
    console.error("Error deleting database");
  }
};

export const loadData = async (setTimetableData, setDays) => {
  try {
    let storedData = await AsyncStorage.getItem("timetable");
    let parsedData = JSON.parse(storedData);
    setTimetableData(parsedData || {});
    setDays(
      parsedData !== null ? JSON.parse(await AsyncStorage.getItem("dayOptions")) : []
    );
  } catch (error) {
    console.error("Error loading data:", error);
  }
};
