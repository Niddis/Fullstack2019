import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

	const addAnecdote = async (event) => {
		event.preventDefault()
		const element = event.target
		const content = element.anecdote.value
		props.createAnecdote(content)
		props.notificationChange(`you created a new anecdote: ${content}`, 3)
		element.anecdote.value = ''
	}

	return (
		<div>
			<h2>create</h2>
			<form onSubmit={addAnecdote}>
				<div><input name="anecdote" /></div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

const mapDispatchToProps = {
	createAnecdote,
	notificationChange
}

export default connect(
	null,
	mapDispatchToProps
	)(AnecdoteForm)