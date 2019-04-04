import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllNotes } from "../../Thunks/fetchAllNotes";

export class NotesContainer extends Component {
 

  async componentDidMount() {
    const url = "http://localhost:3000/api/v1/notes";
    await fetchAllNotes(url);
  }

  render() {
    if (this.props.notes) {
      return (
        <ul>
          {this.props.notes.map((note) => {
            return (
              <div>
                <li>{note.id}</li>
                <li>
                  {note.body.map(body => {
                    return <div>{body.context}</div>;
                  })}
                </li>
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
  fetchAllNotes: url => dispatch(fetchAllNotes(url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesContainer);
