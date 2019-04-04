export const noteReducer = (state = [], action ) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [...state, action.note];
    case 'DELETE_CARD':
      return  state.filter(note => note.id != action.id);;
    case 'GET_ALL_NOTES':
      return action.notes
    default:
    return state
  }
}