import { noteReducer } from './noteReducer'
import * as actions from '../actions'

describe('noteReducer', () => {
    let mockState;
    beforeEach(() => {
        mockState = []
    })
    it('should return default state where there is no action.type', () => {
        const mockAction = {}
        const results = noteReducer(mockState, mockAction)
        expect(results).toEqual(mockState)
    })

    it('should return a note when the action.type is ADD_NOTE', () => {
        const mockNote = {title: 'asdl', body: 'a;lsdkjf'}
        //this test passes whether or not we include the type.  Why?
        const mockAction = actions.addNote(mockNote)
        const results = noteReducer(mockState, mockAction)
        expect(results).toBe(mockNote)
    })

    it('should return an array of notes when the action.type is GET_ALL_NOTES', () => {
        const mockNotes =[
            {title: 'asdl', body: 'a;lsdkjf'},
            {title: 'asdfasdf', body: 'asdfasdfasdfsdf'}
        ]
        //this passes even without the type, just as above.  Why?
        const mockAction = actions.getAllNotes(mockNotes)
        const results = noteReducer(mockState, mockAction)
        expect(results).toEqual(mockNotes)
    })
})