export const noteReducer = (state = [], action ) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return action.note;
    case 'GET_ALL_NOTES':
      return action.notes
    default:
    return state
  }
}