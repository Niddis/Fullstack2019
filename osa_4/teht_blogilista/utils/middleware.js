const tokenExtractor = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		request.token = authorization.substring(7)
	}
	request.token = null
}

module.exports = {
	tokenExtractor
}