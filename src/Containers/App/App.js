import React, { Component } from 'react';
import NoteForm from '../NoteForm/NoteForm'
import { NavLink, Route } from 'react-router-dom'
import './App.scss';
import { connect } from 'react-redux'
import { fetchAllNotes } from '../../Thunks/fetchAllNotes'
import { Header } from '../../Components/Header/Header'
import  NotesContainer  from '../NotesContainer/NotesContainer';

class App extends Component {
  async componentDidMount() {
    const url = 'http://localhost:3000/api/v1/notes'
    this.props.fetchAllNotes(url)
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <NavLink to='/notes'>Create New Note</NavLink>
        <Route exact path='/notes' component={NoteForm} />
        <Route exact path='/notes/:id' render={({match}) =>{
          const foundNote = this.props.notes.find(note => {
            return note.id === parseInt(match.params.id)
          })
          if (!foundNote) {
            console.log('404')
          }else {
            return <NoteForm note={foundNote}/>
          }
        }}/>
        <Route exact path='/' component={NotesContainer} />
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  notes: state.notes,
  errorMsg: state.errorMsg,
  isLoading: state.isLoading
})

export const mapDispatchtoProps = dispatch => ({
  fetchAllNotes: (url) => dispatch(fetchAllNotes(url)),
})

export default connect(mapStateToProps, mapDispatchtoProps)(App);
