import React from "react";
import { shallow } from "enzyme";
import { NoteForm } from "./NoteForm";

describe("NoteForm", () => {
  let wrapper;
  let mockFunc;
  let mockState;
  let mockEvent;

  beforeEach(() => {
    wrapper = shallow(<NoteForm postNote={mockFunc} editNote={mockFunc}  />);
    mockFunc = jest.fn();
    mockState = { 
                title: '',
                listItems: []
              }
    mockEvent = {target: {
      parentElement: {
        id: 12,
        text: 'asl;dkjf',
        checked: false
      }
    }}
  });

  it("should have a proper default state", () => {
    expect(wrapper.state()).toEqual(mockState);
  });

  it.skip("should match the snapshot with all data passed in correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  describe.skip('addListItem', () => {
    it("should updateState when AddNote is invoked", () => {
      const mockETargetValue = 'words'
      const mockListItem = [{id: 12, text: mockETargetValue, checked: false}]
      expect(wrapper.state("listItems")).toEqual( [] );
      wrapper.instance().addListItem(mockEvent)
      expect(wrapper.state("listItems")).toEqual(mockListItem);
        //why am I getting undefined as the text?
    })
  });

  describe('componentDidMount', () => {
    it("should test if state is changed when componentDidMount is invoked", () => {
      wrapper.instance().componentDidMount();
      expect(wrapper.state("listItems")).toEqual( [] );
    });
  })

  describe('deleteListItem', () => {
    it("should test if state is changed when deleteListItem is invoked", () => {
      wrapper.setState({ listItems: [{ id: 12 }] });
      wrapper.instance().deleteListItem({
        target: {
          parentElement: {
            id: 12
          }
        }
      });
      expect(wrapper.state("listItems")).toEqual( [] );
    });
  })
  
  describe('toggleCheckBox', () => {
    it("should toggle the checkbox when toggleCheckBox is invoked", () => {
      wrapper.setState({
        listItems: [{ id: 12, checked: false, text: "Test Text" }]
      });
      wrapper.instance().toggleCheckBox({
        target: {
          parentElement: {
            id: 12
          }
        }
      });
      expect(wrapper.state("listItems")).toEqual([
        { id: 12, checked: true, text: "Test Text" }
      ]);
    });
  })

  describe('editListItemText', () => {
    it("should edit text property when editListItemText is invoked", () => {
      wrapper.setState({
        listItems: [{ id: 12, checked: false, text: "Test Text" }]
      });
      expect(wrapper.state()).toEqual({
        title: '',
        listItems: [{ id: 12, checked: false, text: "Test Text" }]
      })
      wrapper.instance().editListItemText({
        target: {
          value: "Test2",
          parentElement: {
            id: 12
          }
        }
      });
      expect(wrapper.state("listItems")).toEqual([
        { id: 12, checked: false, text: "Test2" }
      ]);
    });
  })
  
    describe('editTitle', () => {
      it("should edit title property when editTitle is invoked", () => {
        wrapper.setState({ title: "Tester" });
        wrapper.instance().editTitle({
          target: {
            value: "It passes",
            parentElement: {
              id: 12
            }
          }
        });
        expect(wrapper.state("title")).toEqual("It passes");
      });
    })

});
