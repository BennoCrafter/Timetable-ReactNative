import { StyleSheet } from 'react-native';

export const cardStyles = StyleSheet.create({
  card: {
    padding: 22,
    margin: 2,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'flex-start', // Align items to the start (left) of the container
    position: 'relative', // Set position to relative for absolute positioning of time text
    width: "100%",

  },
  lesson: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: "17.5%",
    textAlign: 'center', // Center-align the title text
    color: "white",
    fontWeight: "900",
    fontFamily: "roboto"

  },
  content: {
    fontSize: 16,
    textAlign: 'center', // Center-align the content text
  },
  timeBegin: {
    position: 'absolute',
    top: "50%",
    left: "4.5%",
    fontSize: 14,
    color: 'white',
    fontFamily: "roboto",
  },
  timeEnd: {
    fontFamily: "roboto",
    position: 'absolute',
    bottom: "50%",
    left: "4.5%",
    fontSize: 14,
    color: 'white',
  },
})
