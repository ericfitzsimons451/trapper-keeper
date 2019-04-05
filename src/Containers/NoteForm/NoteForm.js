import React, { Component } from 'react'
import { postNote } from '../../Thunks/postNote'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { fetchAllNotes } from '../../Thunks/fetchAllNotes'
 
export class NoteForm extends Component {
	constructor() {
		super()
		this.state = {
			title: "",
			listItems: []
		}
	}

	addNote = (e) => {
		const { id } = e.target.parentElement
		if(e.target.value !== null){
			this.setState({
				listItems: [...this.state.listItems, {id: parseInt(id), text: e.target.value, checked: false}]
			})
		}
	}

	deleteNote = (e) => {
		const { id } = e.target.parentElement
		const newBody = this.state.listItems.filter((note) => {
			return note.id !== parseInt(id)
		})
		this.setState({
			listItems: newBody
		})
	}

	toggleCheckBox = (e) => {
		const { id } = e.target.parentElement
		const newBody = this.state.listItems.map((note) => {
			if(note.id === parseInt(id)){
				return {text: note.text, checked: !note.checked, id: note.id}
			}
			return note
		})
		this.setState({
			listItems: newBody
		})
	}

	editNoteText = (e) => {
		const { id } = e.target.parentElement
		const { value } = e.target
		const newBody = this.state.listItems.map((note) => {
			if(note.id === parseInt(id)){
				return {text: value, checked: note.checked, id: note.id}
			}
			return note
		})
		this.setState({
			listItems: newBody
		})
	}

	editTitle = (e) => {
		const title = e.target.value
		this.setState({
			title 
		})
	} 

	handleSubmit = (e) => {
		e.preventDefault()
		const {className, type } = e.target
		console.log(e.target.type)
		if (className === "modal" || type === "submit") {
			this.props.history.push('/')
			this.props.postNote(this.state)
		  }
	}

	render() {
		const { listItems } = this.state
		const id = Date.now()
		const filteredUnChecked = listItems.filter(note => !note.checked)
		const filteredChecked = listItems.filter(note => note.checked)
		const unchecked = filteredUnChecked.map((text)=> {
			return (<div onChange={this.test} key={text.id} id={text.id} className="text">
						<div onClick={this.toggleCheckBox} className="uncheckbox"></div>
						<input  placeholder="take a note" name='body' onChange={this.editNoteText} value={text.text}/>
						<div onClick={this.deleteNote} className="xmark"></div>
					</div>)
		})
		const checked = filteredChecked.map((text)=> {
			return (<div onChange={this.test} key={text.id} id={text.id} className="text">
						<div onClick={this.toggleCheckBox} className="checkbox"></div>
						<input  placeholder="take a note" name='body' onChange={this.editNoteText} value={text.text}/>
						<div onClick={this.deleteNote} className="xmark"></div>
					</div>)
		})
		unchecked.push(<div onChange={this.test} key={id} id={id} className="text">
			<div className="add"></div>
			<input  placeholder="take a note" name='body' onChange={this.addNote} value={''}/>
		</div>)
		return (
			<div onClick={this.handleSubmit} className="modal">
				<form className="note-form">
					<input onChange={this.editTitle} name='title' value={this.state.title} placeholder="title"/>
					{
						unchecked
					}
					{
						checked
					}
					<nav>
						<button onClick={this.handleSubmit}>Save Note</button>
					</nav>
				</form>
			</div>
		)
	}
}

export const mapDispatchToProps = (dispatch) => ({
	postNote: (note) => dispatch(postNote(note))
})

export default connect(null, mapDispatchToProps)(NoteForm)

