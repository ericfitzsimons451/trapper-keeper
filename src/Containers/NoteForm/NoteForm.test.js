import React from "react";
import { shallow } from "enzyme";
import { NoteForm } from "./NoteForm";

describe("NoteForm", () => {
  let wrapper;
  const mockFunc = jest.fn();
  const mockData = { listItems: [1], title: "" };

  beforeEach(() => {
    wrapper = shallow(<NoteForm postNote={mockFunc} editNote={mockFunc} note={mockData} />);
  });

  it("should have a proper default state", () => {
    expect(wrapper.state()).toEqual({
      title: "",
      listItems: [1]
    });
  });

  it("should match the snapshot with all data passed in correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should test if state is changed when AddNote is invoked", () => {
    expect(wrapper.state("listItems")).toEqual([1]);
    wrapper.instance().addNote({
      target: {
        parentElement: {
          id: 12
        }
      }
    });
    expect(wrapper.state("listItems")).toHaveLength(2);
  });

  it("should test if state is changed when componentDidMount is invoked", () => {
    wrapper.instance().componentDidMount();
    expect(wrapper.state("listItems")).toHaveLength(1);
  });

  it("should test if state is changed when deleteNote is invoked", () => {
    wrapper.setState({ listItems: [{ id: 12 }] });
    wrapper.instance().deleteNote({
      target: {
        parentElement: {
          id: 12
        }
      }
    });
    expect(wrapper.state("listItems")).toHaveLength(0);
  });

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

  it("should edit text property when editNoteText is invoked", () => {
    wrapper.setState({
      listItems: [{ id: 12, checked: false, text: "Test Text" }]
    });
    wrapper.instance().editNoteText({
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

  it.only("should call editNote when handleSubmit is called", () => {
    console.log(wrapper.instance().props.note)
    wrapper.instance().handleSubmit();
    expect(wrapper.instance().props.editNote).toHaveBeenCalled()
  });
});
