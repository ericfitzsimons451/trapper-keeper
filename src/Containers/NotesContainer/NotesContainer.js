import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllNotes } from "../../Thunks/fetchAllNotes";
import { deleteNote } from "../../Thunks/deleteNote";
import { Link } from "react-router-dom";

export class NotesContainer extends Component {
  async componentDidMount() {
    const url = "http://localhost:3000/api/v1/notes";
    await fetchAllNotes(url);
  }

  render() {
    if (this.props.notes.length > 0) {
      return (
        <ul>
          {this.props.notes.map((note, index) => {
            return (
              <div>
                <button
                  onClick={() => {
                    this.props.deleteNote(note.id);
                  }}
                >
                  DELETE ME
                </button>

                <Link to={`/notes/${note.id}`} key={index}>
                  <li>{note.id}</li>
                  <li>
                    {note.listItems.map(body => {
                      return <div key={body.id}>{body.text}</div>;
                    })}
                  </li>
                </Link>
              </div>
            );
          })}
        </ul>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export const mapStateToProps = state => ({
  notes: state.notes,
  errorMsg: state.errorMsg,
  isLoading: state.isLoading
});

export const mapDispatchToProps = dispatch => ({
  fetchAllNotes: url => dispatch(fetchAllNotes(url)),
  deleteNote: note => dispatch(deleteNote(note))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesContainer);
