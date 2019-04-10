import React, { Component } from "react";
import NoteForm from "../NoteForm/NoteForm";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import { connect } from "react-redux";
import { fetchAllNotes } from "../../Thunks/fetchAllNotes";
import { Header } from "../../Components/Header/Header";
import NotesContainer from "../NotesContainer/NotesContainer";
import Error from '../../Components/Error/Error'
import PropTypes from "prop-types";

export class App extends Component {
 
  async componentDidMount() {
    const url = "http://localhost:3000/api/v1/notes";
    this.props.fetchAllNotes(url);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/new-note" component={NoteForm} />
          <Route
            exact
            path="/notes/:id"
            render={({ match, history }) => {
              const foundNote = this.props.notes.find(note => {
                return note.id === parseInt(match.params.id);
                //what is happening here with the match?
              });
              if (!foundNote) {
              } else {
                return <NoteForm note={foundNote} history={history} />;
                //what is happening here with note and the history props?
              }
            }}
          />
          <Route exact path="/" component={NotesContainer} />
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  notes: PropTypes.array,
  errorMsg: PropTypes.string,
  isLoading: PropTypes.bool
};

export const mapStateToProps = state => ({
  notes: state.notes,
  errorMsg: state.errorMsg,
  isLoading: state.isLoading
});

export const mapDispatchtoProps = dispatch => ({
  fetchAllNotes: url => dispatch(fetchAllNotes(url))
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(App);
