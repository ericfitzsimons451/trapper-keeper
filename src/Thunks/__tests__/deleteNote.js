import { deleteNote } from '../../Thunks/deleteNote'
import * as actions from '../../actions'

describe('deleteNote', () => {
    let mockNote;
    let mockDispatch;
    beforeEach(() => {
        mockNote = [
            {id: 1242, title: "test", 
            body: 
            [{
                context: "testone", 
                isChecked: false
            }, {
                context: "testtwo", 
                isChecked: false
            }, {
                context: "testthree", 
                isChecked: true
            }]}]
        mockDispatch = jest.fn()
    })

    it('should dispatch isLoading(true)', async () => {
        const thunk = deleteNote(mockNote)
        await thunk(mockDispatch)
        expect(mockDispatch).toHaveBeenCalledWith(actions.isLoading(true))  
    })

    it('should dispatch hasError with a message if the response is not OK', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: false,
            statusText: 'There was an error'
        }))
        const thunk = deleteNote(mockNote)
        await thunk(mockDispatch)
        expect(mockDispatch).toHaveBeenCalledWith(actions.hasError('There was an error'))
    })

    it('should dispatch isLoading(false) if the response is OK', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ mockNote })
        }))
        const thunk = deleteNote(mockNote)
        await thunk(mockDispatch)
        expect(mockDispatch).toHaveBeenCalledWith(actions.isLoading(false))
    })

    it('should dispatch deleteNote if the reponse is OK', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ mockNote })
        }))
        const thunk = deleteNote(mockNote)
        await thunk(mockDispatch)
        expect(mockDispatch).toHaveBeenCalledWith(actions.deleteCard(mockNote))
    })
})