
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

    describe('onDragStart', () => {
	    it('should called startDrag when its invoke', () => {
            wrapper.find(".note").simulate("dragStart")
            expect(mockFunction).toHaveBeenCalled()
    })
    })
    describe('onDragEnd', () => {
	    it('should called patchNote when its invoke', () => {
            wrapper.find(".note").simulate("dragEnd")
            expect(mockFunction).toHaveBeenCalled()
    })
    })
    describe('Delete Button', () => {
	    it('should called deleteNote when its invoke', () => {
            wrapper.find(".delete-button").simulate("click")
            expect(mockFunction).toHaveBeenCalled()
    })
    })
    describe('onDragver', () => {
	    it('should return out the function if id match itself', () => {
            wrapper.instance().onDragOver(1)
        })
        it("should invoke changeNoteOrder when the ids dont match", () => {
            wrapper.instance().onDragOver(2)
            expect(mockFunction).toHaveBeenCalled()
        })
    })

    describe('openNote', () => {
	    it('should return out the function if id match itself', () => {
            wrapper.find(".note").simulate("click", {target: {className: "note"}})
        })
    })
    
    describe("mapDispatchToProps", () => {
        it("should called deleteNote  with input argument", () => {
            const mockDispatch = jest.fn();
            const mockNoteID = 123;
            const actionToDispatch = deleteNote(mockNoteID);
            const mappedProps = mapDispatchToProps(mockDispatch);
            mappedProps.deleteNote(mockNoteID);
            expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
        });
        it("should called editNote  with input argument", () => {
            const mockDispatch = jest.fn();
            const mockNoteID = 123;
            const actionToDispatch = editNote(mockNoteID);
            const mappedProps = mapDispatchToProps(mockDispatch);
            mappedProps.editNote(mockNoteID);
            expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
        });
        it("should called startDrag with input argument", () => {
            const mockDispatch = jest.fn();
            const mockNoteID = 123;
            const actionToDispatch = startDrag(mockNoteID);
            const mappedProps = mapDispatchToProps(mockDispatch);
            mappedProps.startDrag(mockNoteID);
            expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
        });
        it("should called changeNoteOrder with input argument", () => {
            const mockDispatch = jest.fn();
            const mockNoteIDOne = 1;
            const mockNoteIDTwo = 2;
            const actionToDispatch = changeNoteOrder(mockNoteIDOne, mockNoteIDTwo);
            const mappedProps = mapDispatchToProps(mockDispatch);
            mappedProps.changeNoteOrder(mockNoteIDOne, mockNoteIDTwo);
            expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
        })
        it("should called patchNotes with input argument", () => {
            const mockDispatch = jest.fn();
            const mockNotes = [{},{},{}];
            const actionToDispatch = patchNotes(mockNotes);
            const mappedProps = mapDispatchToProps(mockDispatch);
            mappedProps.patchNotes(mockNotes);
            expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
        });
    })
})