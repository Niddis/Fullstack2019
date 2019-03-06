const initialState = {
	good: 0,
	ok: 0,
	bad: 0
}

const counterReducer = (state = initialState, action) => {
	console.log(action)
	switch (action.type) {
		case 'GOOD':
			const incrementGood = state.good + 1
			return { ...state, good: incrementGood }
		case 'OK':
			const incrementOk = state.ok + 1
			return { ...state, ok: incrementOk }
		case 'BAD':
			const incrementBad = state.bad + 1
			return { ...state, bad: incrementBad }
		case 'ZERO':
			return initialState
		default:
			return state
	}
}

export default counterReducer