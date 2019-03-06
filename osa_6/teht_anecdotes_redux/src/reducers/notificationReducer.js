const initialstate = 'Tämä on aloitusviesti'

const notificationReducer = (state = null, action) => {
	console.log('state now: ', state)
	console.log('action ', action)
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return action.notification
		case 'CLEAR_NOTIFICATION':
			return null
		default:
			return state
	}
}

export const notificationChange = notification => {
	return {
		type: 'SET_NOTIFICATION',
		notification,
	}
}

export const clearNotification = () => {
	return {
		type: 'CLEAR_NOTIFICATION'
	}
}

export default notificationReducer