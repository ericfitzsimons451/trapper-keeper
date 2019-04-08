export const addNote = (note) => ({
  type: 'ADD_NOTE',
  note
})

export const deleteCard = (id) => ({
  type: 'DELETE_CARD',
  id
})

export const getAllNotes = (notes) => ({
  type: 'GET_ALL_NOTES',  
  notes
})

export const hasError = (message) => ({
  type: 'HAS_ERROR',
  message
})

export const isLoading = (bool) => ({
  type: 'IS_LOADING',
  isLoading: bool
})

export const updateNote = (note) => ({
  type: 'UPDATE_NOTE',
  note
})

export const startDrag = (id) => ({
  type: "START_ID",
  id
})

export const changeNoteOrder = (noteOne, noteTwo) => ({
  type: "CHANGE_ORDER",
  noteOne,
  noteTwo
})

