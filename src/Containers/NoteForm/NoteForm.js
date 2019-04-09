import React, { Component } from "react";
import { postNote } from "../../Thunks/postNote";
import { connect } from "react-redux";
import { editNote } from "../../Thunks/updateNote";

export class NoteForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      listItems: []
    };
  }

  componentDidMount() {
    if (this.props.note) {
      this.setState({
        title: this.props.note.title,
        listItems: this.props.note.listItems
      });
    }
  }

  addListItem = e => {
    const { id } = e.target.parentElement;
    if (e.target.value !== null) {
      this.setState({
        listItems: [
          ...this.state.listItems,
          { id: parseInt(id), text: e.target.value, checked: false }
        ]
      });
    }
  };

  deleteListItem = e => {
    const { id } = e.target.parentElement;
    const newBody = this.state.listItems.filter(note => {
      return note.id !== parseInt(id);
    });
    this.setState({
      listItems: newBody
    });
  };

  toggleCheckBox = e => {
    const { id } = e.target.parentElement;
    const newBody = this.state.listItems.map(note => {
      if (note.id === parseInt(id)) {
        return { text: note.text, checked: !note.checked, id: note.id };
      }
      return note;
    });
    this.setState({
      listItems: newBody
    });
  };

  editListItemText = e => {
    const { id } = e.target.parentElement;
    const { value } = e.target;
    const newBody = this.state.listItems.map(listItem => {
      if (listItem.id === parseInt(id)) {
        return { text: value, checked: listItem.checked, id: listItem.id };
      }
      return listItem;
    });
    this.setState({
      listItems: newBody
    });
  };

  editTitle = e => {
    const title = e.target.value;
    this.setState({
      title
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.props.note) {
      const updatedNote = {
        id: this.props.note.id,
        title: this.state.title,
        listItems: this.state.listItems
      };
      await this.props.editNote(updatedNote);
      this.props.history.push("/");
    } else {
      const { className, type } = e.target;
      if (className === "modal" || type === "submit") {
				await this.props.postNote(this.state);
        this.props.history.push("/");
      }
    }
  };

  displayCheckedListItems = () => {
    const filteredCheckedListItems = this.state.listItems.filter(note => note.checked);
    const checkedListItems = filteredCheckedListItems.map(text => {
      return (
        <div key={text.id} id={text.id} className="text">
          <div onClick={this.toggleCheckBox} className="checkbox" />
          <input
            placeholder="take a note"
            name="body"
            onChange={this.editListItemText}
            value={text.text}
          />
          <div onClick={this.deleteListItem} className="xmark"/>
        </div>
      );
    });
    return checkedListItems
  }

  render() {
    const { listItems } = this.state; 
    const filteredUncheckedListItems = listItems.filter(listItem => !listItem.checked);
    const uncheckedListItems = filteredUncheckedListItems.map(text => {
      return (
        <div key={text.id} id={text.id} className="text">
          <div onClick={this.toggleCheckBox} className="uncheckbox" />
          <input
            placeholder="take a note"
            name="body"
            onChange={this.editListItemText}
            value={text.text}
            />
          <div onClick={this.deleteListItem} className="xmark"/>
        </div>
      );
    });
    
    const id = Date.now();
    uncheckedListItems.push(
      <div key={id} id={id} className="text">
        <div className="add" />
        <input
          placeholder="take a note"
          name="body"
          onChange={this.addListItem}
          value={""}
          />
      </div>
    );
    
    const checkedListItems = this.displayCheckedListItems()

    return (
      <div className="modal">
        <form className="note-form">
          <input className="title-input"
            onChange={this.editTitle}
            name="title"
            value={this.state.title}
            placeholder="title"
          />
          {uncheckedListItems}
          {checkedListItems}
          <nav>
            <button onClick={this.handleSubmit}>Save Note</button>
          </nav>
        </form>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  postNote: note => dispatch(postNote(note)),
  editNote: note => dispatch(editNote(note))
});

export default connect(
  null,
  mapDispatchToProps
)(NoteForm);
