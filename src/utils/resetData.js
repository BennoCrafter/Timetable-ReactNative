import AsyncStorage from "@react-native-async-storage/async-storage";

// delete
export function deleteData(){
    
}
await AsyncStorage.clear()
await AsyncStorage.setItem("colorOptions", ['Red', 'Blue', 'Green', 'Yellow', 'Purple'])