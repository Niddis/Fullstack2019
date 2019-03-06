import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { notificationChange, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {

	const handleClick = (id, content) => {
		store.dispatch(voteFor(id))
		store.dispatch(notificationChange(`you voted '${content}'`))
		setTimeout(() => {
			store.dispatch(clearNotification())
		}, 5000)
	}

	const anecdotesToShow = store.getState().filter.length === 0
		? store.getState().anecdotes
		: store.getState().anecdotes.filter(a => a.content.toLowerCase().includes(store.getState().filter.toLowerCase()))

	return (
		<div>
			{anecdotesToShow.sort((a1, a2) => a2.votes - a1.votes).map(anecdote => 
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleClick(anecdote.id, anecdote.content)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default AnecdoteList