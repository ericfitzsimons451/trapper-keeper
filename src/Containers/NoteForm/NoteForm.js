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

  addNote = e => {
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

  deleteNote = e => {
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

  editNoteText = e => {
    const { id } = e.target.parentElement;
    const { value } = e.target;
    const newBody = this.state.listItems.map(note => {
      if (note.id === parseInt(id)) {
        return { text: value, checked: note.checked, id: note.id };
      }
      return note;
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

  render() {
    const { listItems } = this.state;
    const id = Date.now();
    const filteredUncheckedNotes = listItems.filter(note => !note.checked);
    const filteredCheckedNotes = listItems.filter(note => note.checked);
    const uncheckedNotes = filteredUncheckedNotes.map(text => {
      return (
        <div key={text.id} id={text.id} className="text">
          <div onClick={this.toggleCheckBox} className="uncheckbox" />
          <input
            placeholder="take a note"
            name="body"
            onChange={this.editNoteText}
            value={text.text}
          />
          <div onClick={this.deleteNote} className="xmark" />
        </div>
      );
    });
    const checkedNotes = filteredCheckedNotes.map(text => {
      return (
        <div key={text.id} id={text.id} className="text">
          <div onClick={this.toggleCheckBox} className="checkbox" />
          <input
            placeholder="take a note"
            name="body"
            onChange={this.editNoteText}
            value={text.text}
          />
          <div onClick={this.deleteNote} className="xmark" />
        </div>
      );
    });
    uncheckedNotes.push(
      <div key={id} id={id} className="text">
        <div className="add" />
        <input
          placeholder="take a note"
          name="body"
          onChange={this.addNote}
          value={""}
        />
      </div>
    );
    return (
      <div className="modal">
        <form className="note-form">
          <input className="title-input"
            onChange={this.editTitle}
            name="title"
            value={this.state.title}
            placeholder="title"
          />
          {uncheckedNotes}
          {checkedNotes}
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
