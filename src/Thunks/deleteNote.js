import { deleteCard, isLoading, hasError } from "../actions";

export const deleteNote = (id) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(`http://localhost:3000/api/v1/notes/${id}`, {
        method: "DELETE"
      });
      if (response.status !== 204) {
        throw new Error(response.statusText);
      }
      dispatch(isLoading(false));
      dispatch(deleteCard(id));
    } catch (error) {
      console.log("hello world")
      dispatch(hasError(error.message));
    }
  };
};
