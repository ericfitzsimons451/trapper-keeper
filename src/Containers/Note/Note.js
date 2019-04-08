import React, { Component } from "react"
import { deleteNote } from "../../Thunks/deleteNote";
import { editNote } from "../../Thunks/updateNote";
import { startDrag } from "../../actions"
import { changeNoteOrder } from "../../actions"
import { connect } from "react-redux"


export class Note extends Component{
    // refactor to take out constructor
    constructor(){
        super();
        this.state = {
            listItems: []
        }
    }

    componentDidMount = () => {
        this.setState({
            listItems: this.props.note.listItems,
        })
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
    }, this.editNoteCheck);
  };


    openNote = e => {
          console.log(e.target.className)
        if(e.target.className !== "checkbox" && e.target.className !== "uncheckbox" && e.target.className !== "delete-button" ){
            this.props.history.push(`/notes/${this.props.note.id}`)
        }
      }

    onDragOver = (id) => {
        if(this.props.startID === id){
            return
        }else{
            this.props.changeNoteOrder(this.props.startID, id)
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
                <p className="check-text">{text.text}</p>
                </div>
            );
          });
        return(
            <div draggable onDragStart={() => {this.props.startDrag(this.props.note.id)}} onDragOver={() => {this.onDragOver(this.props.note.id)}} onDragEnd={() => {console.log("hello world")}} className="note" onClick={this.openNote}>
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

  render = () => {
    const filteredUncheckedNotes = this.state.listItems.filter(note => !note.checked);
    const filteredCheckedNotes = this.state.listItems.filter(note => note.checked);
    const uncheckedNotes = filteredUncheckedNotes.map(text => {
      return (
        <div key={text.id} id={text.id} className="text">
          <div onClick={this.toggleCheckBox} className="uncheckbox" />
          <p>{text.text}</p>
        </div>
      );
    });
    
    const checkedNotes = filteredCheckedNotes.map(text => {
      return (
        <div key={text.id} id={text.id} className="text">
          <div onClick={this.toggleCheckBox} className="checkbox" />
          <p className="check-text">{text.text}</p>
        </div>
      );
    });

    return (
      <div className="note" onClick={this.openNote}>
        <button className="delete-button"
          onClick={() => {
            this.props.deleteNote(this.props.note.id);
          }}
        ></button>
        <h2>{this.props.note.title}</h2>
        {
          uncheckedNotes
        }
        {
          checkedNotes.length > 0 && (
            <div className="check-section">
              {
                checkedNotes
              }
            </div>
          )
        }
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({

    deleteNote: note => dispatch(deleteNote(note)),
    editNote: note => dispatch(editNote(note)),
    startDrag: id => dispatch(startDrag(id)),
    changeNoteOrder: (noteOne, noteTwo) => dispatch(changeNoteOrder(noteOne, noteTwo))
})

export const mapStateToProps = (state) => ({
    startID: state.startID

})

export default connect(mapStateToProps, mapDispatchToProps)(Note)