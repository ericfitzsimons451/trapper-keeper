import { editNote } from '../../Thunks/updateNote'
import * as actions from '../../actions/'

describe('updateNote', () => {
    let mockDispatch;
    let mockNote;
    beforeEach(() => {
        mockDispatch = jest.fn()
        mockNote = [
            {
                id: 1242, title: "test", 
                body: [
                    {context: "testone", 
                    isChecked: false}, {context: "testtwo", isChecked: false}, {context: "testthree", isChecked: true}]}]
    })
    it('should dispatch isLoading(true)', () => {
        const thunk = editNote(mockNote)
        thunk(mockDispatch)
        expect(mockDispatch).toHaveBeenCalledWith(actions.isLoading(true))
    })

    it('should dispatch hasError with a message if the response is not OK', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: false,
            statusText: 'Something went wrong'
        }))
        const thunk = editNote(mockNote)
        await thunk(mockDispatch)
        expect(mockDispatch).toHaveBeenCalledWith(actions.hasError('Something went wrong'))
    })

    it('should dispatch isLoading(False) if the response is OK', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                mockNote
            })
        }))
        const thunk = editNote(mockNote)
        await thunk(mockDispatch)
        expect(mockDispatch).toHaveBeenCalledWith(actions.isLoading(false))
    })

    it('should dispatch editNote if the response if OK', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ mockNote })
        }))
        const thunk = editNote(mockNote)
        await thunk(mockDispatch)
        expect(mockDispatch).toHaveBeenCalledWith(actions.updateNote(mockNote))
    })
})