import { errorReducer } from './errorReducer'

describe('errorReducer', () => {
    it('should return state if the action has no type', () => {
        const mockAction = {}
        const mockState = ''
        const results = errorReducer(mockState, mockAction)
        expect(results).toEqual(mockState)
    })

    it('should return an error message', () => {
        const mockAction = {type: 'HAS_ERROR', message: 'a;sldkjf'}
        const mockState = ''
        const expected = 'a;sldkjf'
        const results = errorReducer(mockState, mockAction)
        expect(results).toEqual(expected)
    })
})