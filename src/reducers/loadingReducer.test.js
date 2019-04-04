import { loadingReducer } from './loadingReducer'
import * as actions from '../actions'

describe('loadingReducer', () => {
    it('should return state when there is no action.type', () => {
        const mockState = false
        const mockAction = {}
        const results = loadingReducer(mockState, mockAction)
        expect(results).toEqual(mockState)
    })

    it('should return a boolean if the action.type is IS_LOADING', () => {
        const mockState = ''
        const mockAction = actions.isLoading(true)
        const expected = true
        const results = loadingReducer(mockState, mockAction)
        expect(results).toEqual(expected)
    })
})