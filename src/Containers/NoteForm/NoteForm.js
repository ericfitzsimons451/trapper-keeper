import React, { Component } from 'react'

class NoteForm extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            body: ''
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({[name]: value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addNote(this.state)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} name='title' value={this.state.title} />
                <input onChange={this.handleChange} name='body' value={this.state.body} />
                <button>Save Note</button>
            </form>
        )
    }
}