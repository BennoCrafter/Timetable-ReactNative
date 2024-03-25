import { Appearance } from "react-native";
import { StyleSheet } from "react-native";
const colorScheme = Appearance.getColorScheme();

export const isDarkMode = colorScheme === "dark"

export const darkModeStyle = StyleSheet.create({
    backgroundTheme: {
        backgroundColor: "#1a1a1a"
    },
    fontColor: {
        color: "white"
    }
})