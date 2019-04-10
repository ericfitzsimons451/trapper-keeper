import { hasError } from '../actions'

export const patchNotes = (notes) => {
	const option = {
		method: "PATCH",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(notes)
	}

	return async (dispatch) => {
		try {
			const response = await fetch("http://localhost:3000/api/v1/notes", option)
			if (!response.ok) {
				throw new Error(response.statusText)
			}
		} catch (error) {
			dispatch(hasError(error.message))
		}
	}
}