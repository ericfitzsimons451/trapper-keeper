export const addNote = (note) => ({
  type: 'ADD_NOTE',
  note
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
  bool
})