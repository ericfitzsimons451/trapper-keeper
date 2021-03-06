import { updateNote, isLoading, hasError } from '../actions'

export const editNote = (noteToUpdate) => {
  const option = {
    method: 'PUT',
    body: JSON.stringify(noteToUpdate),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(`http://localhost:3000/api/v1/notes/${noteToUpdate.id}`, option)
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      dispatch(isLoading(false))
      dispatch(updateNote(noteToUpdate))
    } catch (error) {
      dispatch(hasError(error.message))
    }
  }
}