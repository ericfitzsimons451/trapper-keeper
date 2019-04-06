import React, { Component } from "react"
import { deleteNote } from "../../Thunks/deleteNote";
import { Link } from "react-router-dom"
import { connect } from "react-redux"

export class Note extends Component{
    constructor(){
        super();
        this.state = {
            listItems: [] 
        }
    }

    componentDidMount = () => {
        this.setState({
            listItems: this.props.note.listItems
        })
    }

    toggleCheckBox = e => {
        const { id } = e.target.parentElement;
        const newBody = this.state.listItems.map(note => {
          if (note.id === parseInt(id)) {
            return { text: note.text, checked: !note.checked, id: note.id };
          }
          return note;
        });
        this.setState({
          listItems: newBody
        });
      };

      openNote = e => {
          console.log(e.target.className)
        if(e.target.className !== "checkbox" && e.target.className !== "uncheckbox" && e.target.className !== "delete-button" ){
            this.props.history.push(`/notes/${this.props.note.id}`)
        }
      }

    render = () => {
        const filteredUnChecked = this.state.listItems.filter(note => !note.checked);
        const filteredChecked = this.state.listItems.filter(note => note.checked);
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
            <div className="note" onClick={this.openNote}>
                <button className="delete-button"
                  onClick={() => {
                    this.props.deleteNote(this.props.note.id);
                  }}
                ></button>
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
            </div>
        )
    }
}

export const mapDispatchToProps = (dispatch) => ({
    deleteNote: note => dispatch(deleteNote(note))
})

export default connect(null, mapDispatchToProps)(Note)