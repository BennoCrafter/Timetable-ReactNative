import { Appearance } from "react-native";
import { StyleSheet } from "react-native";
const colorScheme = Appearance.getColorScheme();

console.log(colorScheme)
export const isDarkMode = colorScheme === "dark" ? true: false

export const darkModeStyle = StyleSheet.create({
    backgroundTheme: {
        backgroundColor: "#1a1a1a"
    },
    fontColor: {
        color: "white"
    }
})