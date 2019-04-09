import * as actions from '../actions'

describe('addNote', () => {
    it('should take in a note and return a note when the type is ADD_NOTE', () => {
        const mockNote = { title: 'alsdkjf', body: 'a;sldkfj' }
        const expected = { type: 'ADD_NOTE', note: { title: 'alsdkjf', body: 'a;sldkfj' } }
        const results = actions.addNote(mockNote)
        expect(results).toEqual(expected)
    })
})

describe('getAllNotes', () => {
    it('should take in and return an array of notes if the type is GET_ALL_NOTES', () => {
        const mockNotes = [
            { title: 'alsdkjf', body: 'a;sldkfj' },
            { title: 'up', body: 'a;cooool' }
        ]
        const expected = { notes: mockNotes, type: 'GET_ALL_NOTES' }
        const results = actions.getAllNotes(mockNotes)
        expect(results).toEqual(expected)
    })
})

describe('hasError', () => {
    it('should take in and return a message if the action.type is HAS_ERROR', () => {
        const mockMessage = 'There is totally an error'
        const expected = { type: 'HAS_ERROR', message: mockMessage }
        const results = actions.hasError(mockMessage)
        expect(results).toEqual(expected)
    })
})

describe('isLoading', () => {
    it('should take in and return a boolean if the action.type is IS_LOADING', () => {
        const mockBool = false
        const expected = { type: 'IS_LOADING', isLoading: mockBool }
        const results = actions.isLoading(mockBool)
        expect(results).toEqual(expected)
    })
})

describe('updateNote', () => {
    it('should take in and return a note if the action.type is UPDATE_NOTE', () => {
        const mockNote = { title: 'alsdkjf', body: 'a;sldkfj' }
        const expected = {note: { title: 'alsdkjf', body: 'a;sldkfj'}, type: 'UPDATE_NOTE'} 
        const results = actions.updateNote(mockNote)
        expect(results).toEqual(expected)
    })
})

describe('deleteCard', () => {
    it('should take in and return an ID if the action.type is DELETE_CARD', () => {
        const mockId = 9
        const expected = {id: 9, type: 'DELETE_CARD'}
        const results = actions.deleteCard(mockId)
        expect(results).toEqual(expected)
    })
})

describe('startDrag', () => {
    it('should take in and return an ID if the action.type is START_ID', () => {
        const mockId = 10
        const expected = {id: 10, type: 'START_ID'}
        const results = actions.startDrag(mockId)
        expect(results).toEqual(expected)
    })
})

describe('changeNoteOrder', () => {
    it('should take in two notes and return an obj with both notes as keys if the action.type is CHANGE_ORDER', () => {
        const mockNote1 = { title: 'alsdkjf', body: 'a;sldkfj' }
        const mockNote2 = { title: 'up', body: 'a;cooool' }
        const expected = {noteOne: mockNote1, noteTwo: mockNote2, type: 'CHANGE_ORDER'}
        const results = actions.changeNoteOrder(mockNote1, mockNote2)
        expect(results).toEqual(expected)

    })
})
