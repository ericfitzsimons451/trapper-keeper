import React, { Component } from 'react';
import NoteForm from '../NoteForm/NoteForm'
import { NavLink, Route } from 'react-router-dom'
import { addNote, getAllNotes } from '../../actions/index'
import './App.scss';
import { connect } from 'react-redux'
import { fetchAllNotes } from '../../Thunks/fetchAllNotes' 

class App extends Component {
  async componentDidMount() {
  const url = 'http://localhost:3000/api/v1/notes'
  this.props.fetchAllNotes(url)
  }

  
  render() {
    return (
      <div className="App">
        {/* <NavLink>Create New Note</NavLink> */}
        {/* <NoteForm addNewNote={this.props.addNote} /> */}
        TRAPPER KEEEEEEEPRRRR
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  notes: state.notes,
  errorMsg: state.errorMsg,
  isLoading: state.bool
})

export const mapDispatchtoProps = dispatch => ({
  fetchAllNotes: (url) => dispatch(fetchAllNotes(url)),
})

export default connect(mapStateToProps, mapDispatchtoProps)(App);
