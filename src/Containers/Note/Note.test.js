
import React from 'react'
import { Note } from './Note'
import { mapDispatchToProps, mapStateToProps } from './Note'
import { shallow } from 'enzyme'
import { deleteNote } from '../../Thunks/deleteNote'
jest.mock('../../Thunks/deleteNote')

describe('Note', () => {
	let wrapper;
	let mockNote;
	let mockState;
	let mockHistory;

	beforeEach(() => {
		mockState = [
			{ id: 4, text: 'yo', checked: false }, 
			{ id: 5, text: 'hello', checked: false }
		]
		mockHistory = { push: jest.fn() }
		mockNote = {
			title: 'hello',
			listItems: [
				{ id: 4, text: 'yo', checked: false }, 
				{ id: 5, text: 'hello', checked: false }
			]
		}
		wrapper = shallow(
		<Note
			note={mockNote}
			deleteNote={jest.fn()}
			editNote={jest.fn()}
			startDrag={jest.fn()}
			changeNoteOrder={jest.fn()}
			history={mockHistory} />)
	})

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should have initial state', () => {
		expect(wrapper.state()).toEqual({ listItems: mockState })
	})

	it('should mapStateToProps', () => {
		mockState = { startID: 29 }
		const results = mapStateToProps(mockState)
		expect(results).toEqual(mockState)
	})

	it('should mapDispatchToProps', () => {
		const mockDispatch = jest.fn()
		const mockNote = [
			{
				id: 1242, title: "test",
				body:
					[{
						context: "testone",
						isChecked: false
					}, {
						context: "testtwo",
						isChecked: false
					}, {
						context: "testthree",
						isChecked: true
					}]
			}
		]
		const actionToDispatch = deleteNote(mockNote)
		const mappedProps = mapDispatchToProps(mockDispatch)
		mappedProps.deleteNote(mockNote)
		expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
	})

	describe('componentDidMount', () => {
		it('should call setState inside of componentDidMount', () => {
			const mockListItems = [{}]
			wrapper.setState({ listItems: mockListItems })
			expect(wrapper.state()).toEqual({ listItems: mockListItems })
		})
	})

	describe('toggleCheckBox', () => {
		it('should reset state with the updatedNote if the ID matches', () => {
			const mockEvent = { target: { parentElement: { id: 4 } } }
			wrapper.instance().toggleCheckBox(mockEvent)
			expect(wrapper.state()).toEqual({
				listItems: [{ id: 4, text: 'yo', checked: true }, { id: 5, text: 'hello', checked: false }]
			})
		})

		// it('should fire editNoteCheck as a callback function', async () => {
		//     const mockEvent = {target: {parentElement: {id: 4 }}}
		//     const editNoteCheck = jest.fn()
		//     await wrapper.instance().toggleCheckBox(mockEvent)
		//     expect(editNoteCheck).toHaveBeenCalled()
		// })
	})

	describe('editNoteCheck', () => {
		it('should fire props.editNote', async () => {
			const mockNote = {
				title: 'hello',
				listItems: mockState
			}
			await wrapper.instance().editNoteCheck()
			expect(wrapper.instance().props.editNote).toHaveBeenCalledWith(mockNote)
		})
	})

	describe.skip('openNote', () => {

		// these tests need some work.  I am not explicitly calling
		// the push onto the history object.  Ideas?


		it('should push a note id onto the history object if the className is NOT checkbox, uncheckbox, or delete-button', () => {
			const mockPushToHistory = jest.fn()
			const mockEvent = { target: { parentElement: { className: 'update' } } }
			wrapper.instance().openNote(mockEvent)
			expect(mockPushToHistory).toHaveBeenCalled()
		})

		it('should call nothing if the className is CHECKBOX, UNCHECKBOX, OR DELETE-BUTTON', () => {
			const mockPushToHistory = jest.fn()
			const mockEvent = { target: { parentElement: { className: 'checkbox' } } }
			wrapper.instance().openNote(mockEvent)
			expect(mockPushToHistory).toHaveBeenCalledTimes(0)
		})

	})

	describe.skip('onDragOver', () => {
	    it('should call props.changeNoteOrder with 2 arguments if the ID does not match', () => {
	        const mockStartId = 9
	        const mockId = 9
	        wrapper.instance().onDragOver(mockId)
	        expect(wrapper.instance().props.changeNoteOrder).toHaveBeenCalledWith(mockStartId, mockId)
			})
			
			it('should do nothing if the id matched the props.startID', () => {

			})
	})

})