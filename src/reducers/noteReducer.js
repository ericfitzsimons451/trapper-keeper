export const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return [...state, action.note];
    case "DELETE_CARD":
      return state.filter(note => note.id != action.id);
    case "GET_ALL_NOTES":
      return action.notes;
    case "UPDATE_NOTE":
      const noteIdIndex = state.findIndexOf(action.note.id);
      state.splice(noteIdIndex, 1, action.note)
      return state
    default:
      return state;
  }
};
