import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E2E5DE",
  },
  input: {
    marginTop: "12%",
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  lessonText: {
    fontFamily: "roboto",
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%", // Adjust the width of the modal content
    height: "100%",
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontFamily: "roboto",
    flexDirection: "row",
  },
  dateTimePicker: {},
  label: {
    marginRight: "3%",
    fontFamily: "roboto",
    fontSize: 18,
  },
  timeContainer: {
    marginTop: "10%",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%", // Ensure buttons take up the full width
    paddingHorizontal: 5, // Add horizontal padding for spacing
    marginBottom: "10%",
    marginTop: "10%",
  },
});
