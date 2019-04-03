import * as actions from '../actions'

describe('addNote', () => {
    it('should take in a note and return a note when the type is ADD_NOTE', () => {
        const mockNote = {title: 'alsdkjf', body:'a;sldkfj'}
        const expected = {type: 'ADD_NOTE', note: {title: 'alsdkjf', body:'a;sldkfj'}}
        const results = actions.addNote(mockNote)
        
        expect(results).toEqual(expected)
    })
})

describe('getAllNotes', () => {
    it('should take in and return an array of notes if the type is GET_ALL_NOTES', () => {
        const mockNotes = [
            {title: 'alsdkjf', body:'a;sldkfj'}, 
            {title: 'up', body:'a;cooool'}
        ]
        const expected = {notes: mockNotes, type: 'GET_ALL_NOTES'}
        const results = actions.getAllNotes(mockNotes)
        expect(results).toEqual(expected)
    })
})

describe('hasError', () => {
    const mockMessage = 'There is totally an error'
    const expected = {type: 'HAS_ERROR', message: mockMessage}
    const results = actions.hasError(mockMessage)
    expect(results).toEqual(expected)
})

describe('isLoading', () => {
    const mockBool = false
    const expected = {type: 'IS_LOADING', isLoading: mockBool}
    const results = actions.isLoading(mockBool)
    expect(results).toEqual(expected)
})