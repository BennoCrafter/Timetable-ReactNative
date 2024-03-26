import AsyncStorage from "@react-native-async-storage/async-storage"

export const UpdateData = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value))
}