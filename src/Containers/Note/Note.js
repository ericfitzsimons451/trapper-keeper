import React, { Component } from "react"
import { deleteNote } from "../../Thunks/deleteNote";
import { Link } from "react-router-dom"
import { connect } from "react-redux"

export class Note extends Component{
    constructor(){
        super();
    }

    render = () => {
        const filteredUnChecked = this.props.note.listItems.filter(note => !note.checked);
        const filteredChecked = this.props.note.listItems.filter(note => note.checked);
        const unchecked = filteredUnChecked.map(text => {
            return (
              <div key={text.id} id={text.id} className="text">
                <div onClick={this.toggleCheckBox} className="uncheckbox" />
                <p>{text.text}</p>
              </div>
            );
          });
          const checked = filteredChecked.map(text => {
            return (
              <div key={text.id} id={text.id} className="text">
                <div onClick={this.toggleCheckBox} className="checkbox" />
                <p>{text.text}</p>
                </div>
            );
          });
        return(
            <div className="note">
                <button class="delete-button"
                  onClick={() => {
                    this.props.deleteNote(this.props.note.id);
                  }}
                ></button>
                <Link to={`/notes/${this.props.note.id}`} key={this.props.note.id}>
                <h2>{this.props.note.title}</h2>
                {
                    unchecked
                }
                {
                    checked.length > 0 && (
                        <div className="check-section">
                            {
                                checked
                            }
                        </div>
                    )
                }
                </Link>
            </div>
        )
    }
}

export const mapDispatchToProps = (dispatch) => ({
    deleteNote: note => dispatch(deleteNote(note))
})

export default connect(null, mapDispatchToProps)(Note)