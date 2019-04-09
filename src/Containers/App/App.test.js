import React from 'react';
import { shallow } from "enzyme";
import  { App } from './App'
import { mapStateToProps, mapDispatchtoProps } from './App'
import { fetchAllNotes } from '../../Thunks/fetchAllNotes';

jest.mock('../../Thunks/fetchAllNotes');

describe("App", () => {
  let wrapper;
  let mockNote;
  let mockErrorMsg;
  let mockIsLoading;
  let mockFetchAllNotes;

  beforeEach(() => { 
    mockNote = {
			title: 'hello',
			listItems: [
				{ id: 4, text: 'yo', checked: false }, 
				{ id: 5, text: 'hello', checked: false }
			]
    }
    mockErrorMsg = 'Something went wrong'
    mockIsLoading = false
    mockFetchAllNotes = jest.fn()
    wrapper = shallow(<App 
      notes={[mockNote]}
      errorMsg={mockErrorMsg}
      isLoading={mockIsLoading}
      fetchAllNotes={mockFetchAllNotes}
      />)
  })

  it("should match the snapshot with all data passed in correctly", () => {
    wrapper.setProps({notes:mockNote})
    expect(wrapper).toMatchSnapshot();
  });

  describe('Conditional render', () => {
    it('should render the conditional', () => {
      wrapper.setProps({notes:[]})
      expect(wrapper).toMatchSnapshot();
    })
  })

  describe('componentDidMount', () => {
    it('should fire fetchAllNotes inside of componentDidMount', async () => {
      expect(mockFetchAllNotes).toHaveBeenCalledWith("http://localhost:3000/api/v1/notes")
    })
  })
  
  describe('mapStateToProps', () => {
    it("should map state to props", () => {
      const mockStore = {
        notes: [{}, {}, {}],
        errorMsg: 'Error',
        isLoading: false
      }
      const expected = {
        notes: [{}, {}, {}],
        errorMsg: 'Error',
        isLoading: false      
      }
      const mappedProps = mapStateToProps(mockStore)
      expect(mappedProps).toEqual(expected)
    });
  })

  describe('mapDispatchToProps', () => {
    it("should map dispatch to props", () => {
      const mockDispatch = jest.fn()
      const mockUrl = "www.reddit.com"
      const actionToDispatch = fetchAllNotes(mockUrl)
      const mappedProps = mapDispatchtoProps(mockDispatch)
      mappedProps.fetchAllNotes(mockUrl)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    });
  })
})