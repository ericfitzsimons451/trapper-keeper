import { noteReducer } from './noteReducer'
import * as actions from '../actions'

describe.only('noteReducer', () => {
    let mockState;
    let mockNotes
    beforeEach(() => {
        mockState = []
        mockNotes =[
            {id: 1, title: 'asdl', body: 'a;lsdkjf'},
            {id: 2, title: 'asdfasdf', body: 'asdfasdfasdfsdf'}
        ]
    })
    it('should return default state where there is no action.type', () => {
        const mockAction = {}
        const results = noteReducer(mockState, mockAction)
        expect(results).toEqual(mockState)
    })

    it('should return a note when the action.type is ADD_NOTE', () => {
        const mockNote = {title: 'asdl', body: 'a;lsdkjf'}
        const mockAction = actions.addNote(mockNote)
        const results = noteReducer(mockState, mockAction)
        expect(results).toEqual([mockNote])
    })

    it('should return an array of notes when the action.type is GET_ALL_NOTES', () => {
       
        const mockAction = actions.getAllNotes(mockNotes)
        const results = noteReducer(mockState, mockAction)
        expect(results).toEqual(mockNotes)
    })

    it('should return an ID when the action.type is UPDATE_NOTE', () => {
        const mockAction = actions.updateNote(mockNotes[0])
        const results = noteReducer(mockState, mockAction)
        expect(results).toEqual([mockNotes[0]])
    })

    it('should return an ID when the action.type is DELETE_CARD', () => {
        const mockIds = [1]
        const idAfterDelete = []
        const mockAction = actions.deleteCard(mockIds)
        const results = noteReducer(mockState, mockAction)
        expect(results).toEqual(idAfterDelete)
    })

    it('should return an array of notes when the action.type is CHANGE_ORDER', () => {
        const mockId = 1
        const upDatedNotes = [
            {id: 1, title: 'asdl', body: 'a;lsdkjf'},
            {id: 2, title: 'asdfasdf', body: 'asdfasdfasdfsdf'},
        ]
        const mockAction = actions.startDrag(mockId)
        const results = noteReducer(mockNotes, mockAction)
        expect(results).toEqual(upDatedNotes)
    })
})