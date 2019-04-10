import React from 'react'
import { Note } from './Note'
import { mapDispatchToProps, mapStateToProps } from './Note'
import { shallow } from 'enzyme'
import { startDrag, changeNoteOrder } from "../../actions"
import { deleteNote } from '../../Thunks/deleteNote'
import { editNote } from "../../Thunks/updateNote"
import { patchNotes } from "../../Thunks/patchNotes"
jest.mock('../../Thunks/deleteNote')

describe('Note', () => {
	let wrapper;
	let mockNote;
	let mockState;
	let mockHistory;
	let mockFunction;

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
		mockFunction = jest.fn()
		wrapper = shallow(
			<Note
				startID={1}
				patchNotes={mockFunction}
				note={mockNote}
				deleteNote={mockFunction}
				editNote={mockFunction}
				startDrag={mockFunction}
				changeNoteOrder={mockFunction}
				history={mockHistory} />)
	})

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should have initial state', () => {
		expect(wrapper.state()).toEqual({listItems: mockState})
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

	describe('onDragStart', () => {
		it('should call startDrag when it is invoked', () => {
			wrapper.find(".note").simulate("dragStart")
			expect(mockFunction).toHaveBeenCalled()
		})
	})

	describe('onDragEnd', () => {
		it('should call patchNote when it is invoked', () => {
			wrapper.find(".note").simulate("dragEnd")
			expect(mockFunction).toHaveBeenCalled()
		})
	})

	describe('Delete Button', () => {
		it('should called deleteNote when it is invoked', () => {
			wrapper.find(".delete-button").simulate("click")
			expect(mockFunction).toHaveBeenCalled()
		})
	})

	describe('onDragOver', () => {
		it('should return out of the function if the id matches itself', () => {
			wrapper.instance().onDragOver(1)
		})

		it("should invoke changeNoteOrder when the ids dont match", () => {
			wrapper.instance().onDragOver(2)
			expect(mockFunction).toHaveBeenCalled()
		})
	})

	describe('openNote', () => {
		it('should return out of the function if the id matches itself', () => {
			wrapper.find(".note").simulate("click", { target: { className: "note" } })
		})
	})

	describe("mapDispatchToProps", () => {
		it("should call deleteNote with the input argument", () => {
			const mockDispatch = jest.fn();
			const mockNoteID = 123;
			const actionToDispatch = deleteNote(mockNoteID);
			const mappedProps = mapDispatchToProps(mockDispatch);
			mappedProps.deleteNote(mockNoteID);
			expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
		});

		it.skip("should call editNote with the input argument", () => {
			const mockDispatch = jest.fn();
			const mockNoteID = 123;
			const actionToDispatch = editNote(mockNoteID);
			const mappedProps = mapDispatchToProps(mockDispatch);
			mappedProps.editNote(mockNoteID);
			expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
		});

		it("should call startDrag with the input argument", () => {
			const mockDispatch = jest.fn();
			const mockNoteID = 123;
			const actionToDispatch = startDrag(mockNoteID);
			const mappedProps = mapDispatchToProps(mockDispatch);
			mappedProps.startDrag(mockNoteID);
			expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
		});

		it("should call changeNoteOrder with the input arguments", () => {
			const mockDispatch = jest.fn();
			const mockNoteIDOne = 1;
			const mockNoteIDTwo = 2;
			const actionToDispatch = changeNoteOrder(mockNoteIDOne, mockNoteIDTwo);
			const mappedProps = mapDispatchToProps(mockDispatch);
			mappedProps.changeNoteOrder(mockNoteIDOne, mockNoteIDTwo);
			expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
		})

		it.skip("should call patchNotes with the input argument", () => {
			const mockDispatch = jest.fn();
			const mockNotes = [{}, {}, {}];
			const actionToDispatch = patchNotes(mockNotes);
			const mappedProps = mapDispatchToProps(mockDispatch);
			mappedProps.patchNotes(mockNotes);
			expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
		});
	})

	describe('mapStateToProps', () => {
		it('should mapStateToProps', () => {
			mockState = { startID: 29 }
			const results = mapStateToProps(mockState)
			expect(results).toEqual(mockState)
		})
	})
})