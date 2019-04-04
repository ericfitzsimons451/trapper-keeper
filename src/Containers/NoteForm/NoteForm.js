import React, { Component } from 'react'
import { postNote } from '../../Thunks/postNote'
import { Link } from "react-router-dom"
 
export class NoteForm extends Component {
	constructor() {
		super()
		this.state = {
			title: '',
			body: []
		}
	}

	addNote = () => {
		this.setState({
			body: [...this.state.body, {id: Date.now(), text: "hello", checked: false}]
		})
	}

	deleteNote = (e) => {
		const { id } = e.target.parentElement
		const newBody = this.state.body.filter((note) => {
			return note.id !== parseInt(id)
		})
		this.setState({
			body: newBody
		})
	}

	checkedBox = (e) => {
		const { id } = e.target.parentElement
		const newBody = this.state.body.map((note) => {
			if(note.id === parseInt(id)){
				return {text: note.text, checked: !note.checked, id: note.id}
			}
			return note
		})
		this.setState({
			body: newBody
		})
	}

	textChange = (e) => {
		const { id } = e.target.parentElement
		const { value } = e.target
		const newBody = this.state.body.map((note) => {
			if(note.id === parseInt(id)){
				return {text: value, checked: note.checked, id: note.id}
			}
			return note
		})
		this.setState({
			body: newBody
		})
	}

	changeTitle = () => {

	} 
	
	test = () => {
		console.log("hello")
	}

	handleSubmit = (e) => {
		e.preventDefault()
		postNote(this.state)
	}

	render() {
		const { body } = this.state
		const filteredUnChecked = body.filter(note => !note.checked)
		const filteredChecked = body.filter(note => note.checked)
		const unchecked = filteredUnChecked.map((text)=> {
			return (<div onChange={this.test} key={text.id} id={text.id} className="text">
						<div onClick={this.checkedBox} className="uncheckbox"></div>
						<input  name='body' onChange={this.textChange} value={text.text}/>
						<div onClick={this.deleteNote} className="xmark"></div>
					</div>)
		})
		const checked = filteredChecked.map((text)=> {
			return (<div onChange={this.test} key={text.id} id={text.id} className="text">
						<div onClick={this.checkedBox} className="checkbox"></div>
						<input  name='body' onChange={this.textChange} value={text.text}/>
						<div onClick={this.deleteNote} className="xmark"></div>
					</div>)
		})
		return (
			<form className="note-form" onSubmit={this.handleSubmit}>
				<input onChange={this.changeTitle} name='title' value={this.state.title} placeholder="title"/>
				{
					unchecked
				}
				<button onClick={this.addNote}>add note</button>
				{
					checked
				}
				<nav>
					<Link to="/"><button>Save Note</button></Link>
				</nav>
			</form>
		)
	}
}

export default NoteForm