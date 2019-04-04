import { getAllNotes, hasError, isLoading } from '../actions'

export const fetchAllNotes = (url) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const notes = await response.json()
      dispatch(isLoading(false))
      dispatch(getAllNotes(notes))
    } catch (error) {
      dispatch(hasError(error.message))
    }
  }
}