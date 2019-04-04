import React, { Component } from 'react'
import { postNote } from '../../Thunks/postNote'
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import { fetchAllNotes } from '../../Thunks/fetchAllNotes';
 
export class NoteForm extends Component {
	constructor() {
		super()
		this.state = {
			title: '',
			body: []
		}
	}

	async componentDidMount () {
		const url = 'http://localhost:3000/api/v1/notes'
		await fetchAllNotes(url);
	}

	addNote = (e) => {
		const { id } = e.target.parentElement
		console.log("add", id)
		if(e.target.value !== null){
			this.setState({
				body: [...this.state.body, {id: parseInt(id), text: e.target.value, checked: false}]
			})
		}
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

	changeTitle = (e) => {
		const title = e.target.value
		this.setState({
			title 
		})
	} 

	handleSubmit = (e) => {
		e.preventDefault()
		postNote(this.state)
	}

	render() {
		const { body } = this.state
		const id = Date.now()
		const filteredUnChecked = body.filter(note => !note.checked)
		const filteredChecked = body.filter(note => note.checked)
		const unchecked = filteredUnChecked.map((text)=> {
			return (<div onChange={this.test} key={text.id} id={text.id} className="text">
						<div onClick={this.checkedBox} className="uncheckbox"></div>
						<input  placeholder="take a note" name='body' onChange={this.textChange} value={text.text}/>
						<div onClick={this.deleteNote} className="xmark"></div>
					</div>)
		})
		const checked = filteredChecked.map((text)=> {
			return (<div onChange={this.test} key={text.id} id={text.id} className="text">
						<div onClick={this.checkedBox} className="checkbox"></div>
						<input  placeholder="take a note" name='body' onChange={this.textChange} value={text.text}/>
						<div onClick={this.deleteNote} className="xmark"></div>
					</div>)
		})
		unchecked.push(<div onChange={this.test} key={id} id={id} className="text">
			<div className="add"></div>
			<input  placeholder="take a note" name='body' onChange={this.addNote} value={null}/>
		</div>)
		return (
			<form className="note-form" onSubmit={this.handleSubmit}>
				<input onChange={this.changeTitle} name='title' value={this.state.title} placeholder="title"/>
				{
					unchecked
				}
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

export const mapStateToProps = state => ({
	notes: state,
	errorMsg: state.errorMsg,
	isLoading: state.isLoading,
})

export const mapDispatchToProps = (dispatch) => ({
	fetchAllNotes: (url) => dispatch(fetchAllNotes(url)),
})

export default connect(mapStateToProps, mapStateToProps)(NoteForm)