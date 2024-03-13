import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {addNewLessonToTimetable} from '../../utils/AddNewCardBackend';

const AddNewCardUi = ({onClose , onCardAdd}) => {
  const [lessonModalVisible, setLessonModalVisible] = useState(false);
  const [dayModalVisible, setDayModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState('Select lesson');
  const [selectedDay, setSelectedDay] = useState('Select day');
  const [selectedColor, setSelectedColor] = useState('Select color');
  const [timeBegin, setTimeBegin] = useState();
  const [timeEnd, setTimeEnd] = useState();
  const [colorModalVisible, setColorModalVisible] = useState(false);

  const openLessonModal = () => {
    setLessonModalVisible(true);
  };

  const openDayModal = () => {
    setDayModalVisible(true);
  };

  const closeLessonModal = () => {
    setLessonModalVisible(false);
  };

  const closeDayModal = () => {
    setDayModalVisible(false);
  };

  const openColorModal = () => {
    setColorModalVisible(true);
  };

  const closeColorModal = () => {
    setColorModalVisible(false);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setColorModalVisible(false);
  };

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setLessonModalVisible(false);
    // Open the day modal only if a lesson is selected and the day modal is closed
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setDayModalVisible(false);
  };

  const handleButtonClickNewCard = () => {
    // Call the function from another file with one attribute
    const timeEndStripped =
      new Date(timeEnd).getHours() + ':' + new Date(timeEnd).getMinutes();
    const timeBeginStripped =
      new Date(timeBegin).getHours() + ':' + new Date(timeBegin).getMinutes();
    addNewLessonToTimetable({
      day: selectedDay.toLowerCase(),
      lessonData: {
        color: selectedColor.toLowerCase(),
        lesson: selectedLesson,
        time_begin: timeBeginStripped,
        time_end: timeEndStripped,
      },
    });
    onCardAdd({
      day: selectedDay.toLowerCase(),
      lessonData: {
        color: selectedColor.toLowerCase(),
        lesson: selectedLesson,
        time_begin: timeBeginStripped,
        time_end: timeEndStripped,
      },
    })
  };

  const onChangeBegin = (event, selectedDate) => {
    const currentDate = selectedDate || timeBegin;
    setTimeBegin(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || timeEnd;
    setTimeEnd(currentDate);
  };

  const lessonOptions = ['Deutsch', 'Mathe', 'Englisch'];
  const dayOptions = ['Monday', 'Tuesday', 'wednesday', 'Thursday', 'Friday'];
  const colorOptions = ['Red', 'Blue', 'Green', 'Yellow', 'Purple'];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleButtonClickNewCard}
      >
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openLessonModal} style={styles.input}>
        <Text style={styles.lessonText}>{selectedLesson}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openDayModal} style={styles.input}>
        <Text style={styles.lessonText}>{selectedDay}</Text>
      </TouchableOpacity>
      <Modal
        animationType='slide'
        transparent={true}
        visible={lessonModalVisible}
        onRequestClose={closeLessonModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select a lesson</Text>
            {lessonOptions.map((lesson, index) => (
              <TouchableOpacity
                onPress={() => handleLessonSelect(lesson)}
                style={styles.item}
                key={index}
              >
                <Text>{lesson}</Text>
              </TouchableOpacity>
            ))}
            <Button title='Close' onPress={closeLessonModal} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType='slide'
        transparent={true}
        visible={dayModalVisible}
        onRequestClose={closeDayModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select a day</Text>
            {dayOptions.map((day, index) => (
              <TouchableOpacity
                onPress={() => handleDaySelect(day)}
                style={styles.item}
                key={index}
              >
                <Text>{day}</Text>
              </TouchableOpacity>
            ))}
            <Button title='Close' onPress={closeDayModal} />
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={openColorModal} style={styles.input}>
        <Text style={styles.lessonText}>{selectedColor}</Text>
      </TouchableOpacity>
      <Modal
        animationType='slide'
        transparent={true}
        visible={colorModalVisible}
        onRequestClose={closeColorModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select a color</Text>
            {colorOptions.map((color, index) => (
              <TouchableOpacity
                onPress={() => handleColorSelect(color)}
                style={styles.item}
                key={index}
              >
                <Text>{color}</Text>
              </TouchableOpacity>
            ))}
            <Button title='Close' onPress={closeColorModal} />
          </View>
        </View>
      </Modal>
      <View style={styles.timeContainer}>
        <Text style={styles.label}>Time begin:</Text>
        <DateTimePicker
          testID='dateTimePicker'
          value={timeBegin || new Date()}
          mode={'time'}
          is24Hour={true}
          onChange={onChangeBegin}
          style={styles.dateTimePicker}
        />
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.label}>Time end:</Text>
        <DateTimePicker
          testID='dateTimePicker'
          value={timeEnd || new Date()}
          mode={'time'}
          is24Hour={true}
          onChange={onChangeEnd}
          style={styles.dateTimePicker}
        />
      </View>
      <Button title='Close' onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E2E5DE',
  },
  input: {
    marginTop: '12%',
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonText: {
    fontFamily: 'roboto',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'stretch',
    width: '80%', // Adjust the width of the modal content
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontFamily: 'roboto',
  },
  dateTimePicker: {},
  label: {
    marginRight: '3%',
    fontFamily: 'roboto',
    fontSize: 18,
  },
  timeContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: '80%',
    paddingTop: '14%',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddNewCardUi;
