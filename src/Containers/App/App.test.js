import React from 'react';
import { shallow } from "enzyme";
import App, { mapStateToProps, mapDispatchtoProps } from './App'
import { fetchAllNotes } from '../../Thunks/fetchAllNotes';

jest.mock('../../Thunks/fetchAllNotes');

describe("App", () => {
  let wrapper;
  const mockFunc = jest.fn();
  beforeEach(() => { wrapper = shallow(<App fetchAllNotes={mockFunc}/>)
  
  })

  it.skip("should match the snapshot with all data passed in correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });


  it.skip("should invoke fetchAllNotes when componentDidMount is fired", () => {
    expect(fetchAllNotes).toHaveBeenCalled();
  })

  it("should map state to props", () => {
    const mockStore = {
      notes: [1,2,3],
      errorMsg: 'Error',
      isLoading: false
    }
    const expected = {
      notes: [1,2,3],
      errorMsg: 'Error',
      isLoading: false      
    }
    const mappedProps = mapStateToProps(mockStore)
    expect(mappedProps).toEqual(expected)
  });

  it.skip("should map dispatch to props", () => {
    const mockDispatch = jest.fn()
    const mockUrl = "www.reddit.com"
    const actionToDispatch = fetchAllNotes(mockUrl)
    const mappedProps = mapDispatchtoProps(mockDispatch)
    mappedProps.fetchAllNotes(mockUrl)
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
  });

})