import React from 'react'
import { NotesContainer } from './NotesContainer'
import { mapStateToProps, mapDispatchToProps } from './NotesContainer'
import { fetchAllNotes } from '../../Thunks/fetchAllNotes'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
jest.mock('../../Thunks/fetchAllNotes')

describe.only('NotesContainer', () => {

	let wrapper
	let mockProps = {
		notes: [{}, {}],
		errorMsg: 'There was an error',
		isLoading: false
	}
	beforeEach(() => {
		wrapper = shallow(
			<NotesContainer
				notes={mockProps.notes}
				errorMsg={mockProps.errorMsg}
				isLoading={mockProps.isLoading}
			/>)
	})

	it('should match the snapshot with all data passed in', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should render the Loader if there are no notes', () => {
		wrapper = shallow(
			<NotesContainer
				notes={[]}
				errorMsg={mockProps.errorMsg}
				isLoading={mockProps.isLoading}
			/>)
		expect(wrapper).toMatchSnapshot()
	})

	describe('mapStateToProps', () => {
		it('should mapStateToProps', () => {
			const mockState = {
				notes: [{}, {}],
				errorMsg: 'Error message',
				isLoading: false
			}
			const mappedProps = mapStateToProps(mockState)
			expect(mappedProps).toEqual(mockState)
		})

	})

	describe('mapDispatchToProps', () => {
		it('calls dispatch with the correct action', async () => {
			const mockUrl = 'www.url.com'
			const mockDispatch = jest.fn()
			const actionToDispatch = await fetchAllNotes(mockUrl)
			const mappedProps = mapDispatchToProps(mockDispatch)
			mappedProps.fetchAllNotes(mockUrl)
			expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
		})
	})

	describe('componentDidMount', () => {
		it('should call fetchAllNotes with the correct url', async () => {
			await wrapper.instance().componentDidMount()
			expect(fetchAllNotes).toHaveBeenCalledWith("http://localhost:3000/api/v1/notes")
		})
	})
})