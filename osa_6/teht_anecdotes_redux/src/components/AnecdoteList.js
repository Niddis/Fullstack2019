import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

	const handleClick = (id, content) => {
		props.voteFor(id)
		props.notificationChange(`you voted '${content}'`, 3)
	}

	return (
		<div>
			{props.visibleAnecdotes.sort((a1, a2) => a2.votes - a1.votes).map(anecdote => 
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

const anecdotesToShow = ({ anecdotes, filter }) => {
	return (
	filter.length === 0
		? anecdotes
		: anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
	)
}

const mapStateToProps = (state) => {
	return {
		visibleAnecdotes: anecdotesToShow(state)
	}
}

const mapDispatchToProps = {
	voteFor,
	notificationChange
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(AnecdoteList)