import React, { Component } from 'react';
import NoteForm from '../NoteForm/NoteForm'
import { NavLink, Route } from 'react-router-dom'
import { addNote, getAllNotes } from '../../actions/index'
import './App.scss';
import { connect } from 'react-redux'


class App extends Component {
  async componentDidMount() {
    const url = 'http://localhost:3000/api/v1/notes'
    const response = await fetch(url)
    const notes = await response.json()
    console.log(notes)
    this.props.getAllNotes(notes)
  }

  
  render() {
    return (
      <div className="App">
        <NavLink>Create New Note</NavLink>
        {/* <NoteForm addNewNote={this.props.addNote} /> */}
        TRAPPER KEEEEEEEPRRRR
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  notes: state.notes
})

export const mapDispatchtoProps = dispatch => ({
  addNote: note => dispatch(addNote(note)),
  getAllNotes: (notes) => dispatch(getAllNotes(notes))
})

export default connect(mapStateToProps, mapDispatchtoProps)(App);
