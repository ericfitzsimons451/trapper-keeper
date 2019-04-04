import { addNote, isLoading, hasError } from '../actions'

export const postNote = (newNote) => {
    const option = {
        method: "POST",
        body: JSON.stringify(newNote),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return async (dispatch) => {
        try {
            dispatch(isLoading(true))
<<<<<<< HEAD
            const response = await fetch('http://localhost:3000/api/v1/notes', option)
            if (response.status !== 201) {
=======
            const response = await fetch('http://localhost:3000/api/v1/notes')
            if (!response.ok) {
>>>>>>> adds thunk tests for fetchAllNotes and postNote
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