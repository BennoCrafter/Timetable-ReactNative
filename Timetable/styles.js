import { StyleSheet } from 'react-native';

export const cardStyles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 5,
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 40,
    textAlign: 'center', // Center-align the title text
  },
  content: {
    fontSize: 16,
    textAlign: 'center', // Center-align the content text
  },
  time_begin: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 14,
    color: 'white',
  },
  time_end: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 14,
    color: 'white',
  },
});
