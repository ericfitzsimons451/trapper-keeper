import { postNote } from '../../thunks/postNote'
import * as actions from '../../actions/'

describe('postNote', () => {
    let mockDispatch;
    let mockNote;

    beforeEach(() => {
        mockDispatch = jest.fn()
        mockNote = [{id: 1242, title: "test", body: [{context: "testone", isChecked: false}, {context: "testtwo", isChecked: false}, {context: "testthree", isChecked: true}]}]
    })

    it('should dispatch isLoading(true)', () => {
        const thunk = postNote(mockNote)
        thunk(mockDispatch)
        expect(mockDispatch).toHaveBeenCalledWith(actions.isLoading(true))
    })

    it('should dispatch hasError with a message if the response is not OK', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: false,
            statusText: 'Something went wrong'
        }))
        const thunk = postNote(mockNote)
        await thunk(mockDispatch)
        expect(mockDispatch).toHaveBeenCalledWith(actions.hasError('Something went wrong'))
    })

    it('should dispatch isLoading(false) if the response is OK', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(
                mockNote
            )
        }))
        const thunk = postNote(mockNote)
        await thunk(mockDispatch)
        expect(mockDispatch).toHaveBeenCalledWith(actions.isLoading(false))
    })

    it('should dispatch addNote() if the response is OK', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(
                mockNote
            )
        }))
        const thunk = postNote(mockNote)
        await thunk(mockDispatch)
        expect(mockDispatch).toHaveBeenCalledWith(actions.addNote(mockNote))
    })
})