import { fetchAllNotes } from '../fetchAllNotes'
import { isLoading, getAllNotes, hasError } from '../../actions'

describe('fetchAllNotes', () => {
    let mockUrl;
    let mockDispatch;
    let mockNotes;

    beforeEach(() => {
        mockUrl = 'www.awesome.com'
        mockDispatch = jest.fn()
        mockNotes = ['a;sldkjfa', 'as;ldkfj']
    })

    it('should dispatch isLoading(true)', () => {
        const thunk = fetchAllNotes(mockUrl)
        thunk(mockDispatch)
        expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
    })

    it('should dispatch hasError with a message if the response.status is not 200', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: false,
            statusText:  'Something went wrong!'
        }))
        const thunk = fetchAllNotes(mockUrl)
        await thunk(mockDispatch)
        expect(mockDispatch).toHaveBeenCalledWith(hasError('Something went wrong!'))
    })

    it('should dispatch isLoading(false) if the response if OK', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                notes: mockNotes
            })
        }))
        const thunk = fetchAllNotes(mockUrl)
        await thunk(mockDispatch)
        expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
    })

    it('should dispatch getAllNotes with an array of notes', async () => {
        const notes =  [{id: 1242, title: "test", body: [{context: "testone", isChecked: false}, {context: "testtwo", isChecked: false}, {context: "testthree", isChecked: true}]}]

        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(
                notes
            )
        }))
        const thunk = fetchAllNotes(mockUrl)
        await thunk(mockDispatch)
        expect(mockDispatch).toHaveBeenCalledWith(getAllNotes(notes))
    })
})