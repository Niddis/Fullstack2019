import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
	handleSubmit,
	username,
	password
}) => {

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					käyttäjätunnus
					<input {...username}/>
				</div>
				<div>
				salasana
					<input {...password}/>
				</div>
				<button type="submit">kirjaudu</button>
			</form>
		</div>
	)
}

LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired
}

export default LoginForm