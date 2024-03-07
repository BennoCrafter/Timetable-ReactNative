import { StyleSheet } from 'react-native';

export const cardStyles = StyleSheet.create({
  card: {
    padding: 20,
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
    width: "90%",
  },
  lesson: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 50,
    textAlign: 'center', // Center-align the title text
    color: "white",
  },
  content: {
    fontSize: 16,
    textAlign: 'center', // Center-align the content text
  },
  time_begin: {
    position: 'absolute',
    top: 13,
    left: 13,
    fontSize: 15,
    color: 'white',
  },
  time_end: {
    position: 'absolute',
    bottom: 13,
    left: 13,
    fontSize: 15,
    color: 'white',
  },
});
