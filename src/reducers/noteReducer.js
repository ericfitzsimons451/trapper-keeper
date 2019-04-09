export const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return [...state, action.note];
      
    case "DELETE_CARD":
      return state.filter(note => note.id != action.id);

    case "GET_ALL_NOTES":
      return action.notes;

    case "UPDATE_NOTE":
      const noteIdIndex = state.find(note => {
        return note.id == action.note.id
      })
      const index = state.indexOf(noteIdIndex)
      state.splice(index, 1, action.note)
      return state

    case "CHANGE_ORDER":
      const noteArray = [...state]
      const findNoteOne = noteArray.find(note => action.noteOne === note.id)
      const one = noteArray.indexOf(findNoteOne)
      const findNoteTwo = noteArray.find(note => parseInt(action.noteTwo) === note.id)
      const two = noteArray.indexOf(findNoteTwo)
      const change = [noteArray[one], noteArray[two]] = [noteArray[two], noteArray[one]]
        return noteArray; 
    default:
      return state;
  }
};
