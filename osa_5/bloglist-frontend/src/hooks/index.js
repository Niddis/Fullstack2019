import { useState } from 'react'

const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}

	const reset = () => setValue('')
	const field = {
		type: type,
		value: value,
		onChange: onChange
	}

	return {
		reset,
		field
	}
}

export default useField