import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllNotes } from "../../Thunks/fetchAllNotes";
import Note from "../Note/Note"

export class NotesContainer extends Component {
  
  async componentDidMount() {
    const url = "http://localhost:3000/api/v1/notes";
    await fetchAllNotes(url);
  }

  render() {
    if (this.props.notes.length > 0) {
      return (
        <div className="notes-container">
          {this.props.notes.map((note) => {
            return  <Note key={note.id} note={note} history={this.props.history}/> ;

          })}
        </div>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesContainer);
