import React, { Component } from 'react';
import { addNote } from '../../actions/index'
import './App.scss';
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div className="App">
        TRAPPER KEEEEEEEPRRRR
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  notes: state.notes
})

export const mapDispatchtoProps = dispatch => ({
  addNote: note => dispatch(addNote(note))
})

export default connect(mapStateToProps, null)(App);
