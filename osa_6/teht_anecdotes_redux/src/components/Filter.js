import React from 'react'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
	const handleChange = (event) => {
		const content = event.target.value
		props.store.dispatch(filterChange(content))
	}
	const style = {
		marginBottom: 10
	}

	return (
		<div style={style}>
			filter <input onChange={handleChange} />
		</div>
	)
}

export default Filter