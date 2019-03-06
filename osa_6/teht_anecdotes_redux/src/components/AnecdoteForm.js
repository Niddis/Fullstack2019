import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {

	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		store.dispatch(createAnecdote(content))
		store.dispatch(notificationChange(`you created a new anecdote: ${content}`))
		setTimeout(() => {
			store.dispatch(clearNotification())
		}, 5000)
		event.target.anecdote.value = ''
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

export default AnecdoteForm