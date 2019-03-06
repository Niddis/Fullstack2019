import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: 'INIT_ANECDOTE',
			data: anecdotes
		})
	} 
}

export const createAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch({
			type: 'NEW_ANECDOTE',
			data: newAnecdote
		})
	}
}

export const voteFor = (id) => {
	return async dispatch => {
		const changedAnecdote = await anecdoteService.update(id)
		dispatch({
			type: 'VOTE',
			data: { id, changedAnecdote }
		})
	}
}

const reducer = (state = [], action) => {
	switch(action.type) {
		case 'INIT_ANECDOTE':
			return action.data
		case 'NEW_ANECDOTE':
			return [...state, action.data]
		case 'VOTE':
			const id = action.data.id
			const changedAnecdote = action.data.changedAnecdote
			return state.map(a => a.id !== id ? a : changedAnecdote)
		default:
		return state
	}
}

export default reducer