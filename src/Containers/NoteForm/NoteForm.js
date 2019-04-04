import React, { Component } from 'react'
import { postNote } from '../../Thunks/postNote'
import { Link } from "react-router-dom"
import {ReactComponent as UnChecked } from "../../images/blank-square.svg"
import {ReactComponent as Xmark } from "../../images/close-button.svg"
import {ReactComponent as Checked } from "../../images/check-box.svg"
 
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
			body: [...this.state.body, {text: "hello", checked: false}]
		})
	}

	deleteNote = (e) => {
		const { id } = e.target.parentElement
		let newBody = this.state.body.filter((note, index) => {
			return index !== parseInt(id)
		})
		this.setState({
			body: newBody
		})
	}

	checkedBox = (e) => {
		console.log(e.target.parentElement)
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}
	
	test = () => {
		console.log("hello")
	}

	handleSubmit = (e) => {
		e.preventDefault()
		postNote(this.state)
	}

	render() {
		return (
			<form class="note-form" onSubmit={this.handleSubmit}>
				<input onChange={this.handleChange} name='title' value={this.state.title} placeholder="title"/>
				{
					this.state.body.map((text, index)=> {
						return (<div onChange={this.test} id={index} className="text">
									<div onClick={this.checkedBox} className="uncheckbox" id={index}></div>
									<input  name='body' value={text.text} id={index}/>
									<div onClick={this.deleteNote} className="xmark"></div>
								</div>)
					})
				}
				<button onClick={this.addNote}>add note</button>
				<nav>
					<Link to="/"><button>Save Note</button></Link>
				</nav>
			</form>
		)
	}
}

export default NoteForm