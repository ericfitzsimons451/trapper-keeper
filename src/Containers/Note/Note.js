import React, { Component } from "react"
import { deleteNote } from "../../Thunks/deleteNote";
import { editNote } from "../../Thunks/updateNote";
import { connect } from "react-redux"

export class Note extends Component {
  constructor() {
    super();
    this.state = {
      listItems: []
    }
  }

  componentDidMount = () => {
    this.setState({
      listItems: this.props.note.listItems
    })
  }

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
    }, this.editNoteCheck);
  };

  editNoteCheck = async () => {
    const updatedNote = {
      id: this.props.note.id,
      title: this.props.note.title,
      listItems: this.state.listItems
    };
    await this.props.editNote(updatedNote);
  }

  openNote = e => {
    if (e.target.className !== "checkbox" && 
        e.target.className !== "uncheckbox" && 
        e.target.className !== "delete-button") {
      this.props.history.push(`/notes/${this.props.note.id}`)
    }
  }

  render = () => {
    const filteredUncheckedNotes = this.state.listItems.filter(note => !note.checked);
    const filteredCheckedNotes = this.state.listItems.filter(note => note.checked);
    const uncheckedNotes = filteredUncheckedNotes.map(text => {
      return (
        <div key={text.id} id={text.id} className="text">
          <div onClick={this.toggleCheckBox} className="uncheckbox" />
          <p>{text.text}</p>
        </div>
      );
    });
    
    const checkedNotes = filteredCheckedNotes.map(text => {
      return (
        <div key={text.id} id={text.id} className="text">
          <div onClick={this.toggleCheckBox} className="checkbox" />
          <p className="check-text">{text.text}</p>
        </div>
      );
    });

    return (
      <div className="note" onClick={this.openNote}>
        <button className="delete-button"
          onClick={() => {
            this.props.deleteNote(this.props.note.id);
          }}
        ></button>
        <h2>{this.props.note.title}</h2>
        {
          uncheckedNotes
        }
        {
          checkedNotes.length > 0 && (
            <div className="check-section">
              {
                checkedNotes
              }
            </div>
          )
        }
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  deleteNote: note => dispatch(deleteNote(note)),
  editNote: note => dispatch(editNote(note))
})

export default connect(null, mapDispatchToProps)(Note)