import { getAllNotes, hasError, isLoading } from '../actions'

export const fetchAllNotes = (url) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true))
            const response = await fetch(url)
            if (response.status !== 200) {
                throw new Error(response.statusText)
            } 
            const data = await response.json()
            dispatch(isLoading(false))
            dispatch(getAllNotes(data))
        } catch (error) {
            dispatch(hasError(error.message))
        }
    }
}