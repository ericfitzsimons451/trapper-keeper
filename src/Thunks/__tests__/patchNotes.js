import { hasError } from '../../actions'
import { patchNotes } from "../patchNotes" 


describe("patchNotes", () => {
    let mockDispatch;
    let mockNotes;
    let mockUrl;

    beforeEach(() => {
        mockUrl = "http:/localhost3003"
        mockDispatch = jest.fn()
        mockNotes = [{},{},{}]
    })
    it("should invoke has error", async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: false,
            statusText: 'Something went wrong'
        }))
        const thunk = patchNotes(mockNotes)
        await thunk(mockDispatch)
        expect(mockDispatch).toHaveBeenCalledWith(hasError('Something went wrong'))
    })

})