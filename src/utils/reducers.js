const initialState = {
    timetableData: null,
  };
  
  const timetableReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_TIMETABLE_DATA':
        return {
          ...state,
          timetableData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default timetableReducer;
  