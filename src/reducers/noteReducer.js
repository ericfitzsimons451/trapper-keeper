export const noteReducer = (state = [], action ) => {
  switch (action.type) {
    case 'ADD_NOTE':
      console.log("this i sthe note",action.note)
      console.log("this i sthe state",state)
      return [...state, action.note];
    case 'GET_ALL_NOTES':
      return action.notes
    default:
    return state
  }
}