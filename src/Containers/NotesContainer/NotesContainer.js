import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllNotes } from "../../Thunks/fetchAllNotes";
import Note from "../Note/Note"
import Loader from '../../Components/Loader/Loader'

export class NotesContainer extends Component {
  
  async componentDidMount() {
    const url = "http://localhost:3000/api/v1/notes";
    await fetchAllNotes(url);
  }

  displayAllNotes = () => {
    const { notes, history } = this.props
    return notes.map((note, i) => {
      return  <Note key={i} note={note} history={history}/> ;
    })
  }

  render() {
    const { notes } = this.props
    const displayNotes = this.displayAllNotes()
    if (notes.length > 0) {
      return (
        <div className="notes-container">
          {displayNotes}
        </div>
      );
    } else {
      return <Loader />;
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
