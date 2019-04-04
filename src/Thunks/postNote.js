import { addNote, isLoading, hasError } from '../actions'

export const postNote = (note) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true))
            const response = await fetch('http://localhost:3000/api/v1/notes')
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const note = await response.json()
            dispatch(isLoading(false))
            dispatch(addNote(note))
        } catch (error) {
            dispatch(hasError(error.message))
        }
    }
}