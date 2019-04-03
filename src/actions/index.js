export const addNote = (note) => ({
  type: 'ADD_NOTE',
  note
})

export const getAllNotes = (notes) => ({
  type: 'GET_ALL_NOTES',  
  notes
})