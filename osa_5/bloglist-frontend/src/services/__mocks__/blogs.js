const blogs = [
	{
		title: 'React Patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com',
		likes: 15,
		user: {
			username: 'pekkis76',
			name: 'Pekka Puupää',
			id: '5c6ac89dcf029e1cf427b704'
		},
		id: '5c6ac99fcf029e1cf427b705'
	},
	{
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 8,
		user: {
			username: 'root',
			name: 'Superuser',
			id: '5c69a1e372a6ec1d101ac8b9'
		},
		id: '5c6c3f7f1735353398d9b946'
	},
	{
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
		likes: 5,
		user: {
			username: 'root',
			name: 'Superuser',
			id: '5c69a1e372a6ec1d101ac8b9'
		},
		id: '5c6c42471735353398d9b947'
	},
	{
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 7,
		user: {
			username: 'root',
			name: 'Superuser',
			id: '5c69a1e372a6ec1d101ac8b9'
		},
		id: '5c6c440f1735353398d9b948'
	}
]

const getAll = () => {
	return Promise.resolve(blogs)
}

let token = null
const setToken = newToken => {
	token = `bearer ${newToken}`
}

export default { getAll, setToken }