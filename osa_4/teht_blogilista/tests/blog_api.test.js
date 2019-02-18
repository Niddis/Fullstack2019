const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
	{
		title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
	},
	{
		title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
	}
]

describe('when there is initially some blogs saved', async () => {
	beforeEach(async () => {
		await Blog.remove({})

		const blogObjects = initialBlogs.map(blog => new Blog(blog))
		const promiseArray = blogObjects.map(blog => blog.save())
		await Promise.all(promiseArray)
	})

	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body.length).toBe(initialBlogs.length)
	})

	test('id is defined', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body[0].id).toBeDefined()
	})

	test('a valid blog can be added', async () => {
		const newBlog = {
			title: "First class tests",
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
			likes: 10,
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')
		const contents = response.body.map(r => r.title)

		expect(response.body.length).toBe(initialBlogs.length + 1)
		expect(contents).toContain('First class tests')
	})

	test('blog with empty likes-field returns zero', async () => {
		const newBlog = {
			title: "First class tests",
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
			likes: undefined
		}

		await api.post('/api/blogs').send(newBlog)
		const response = await api.get('/api/blogs')

		expect(response.body[2].likes).toBe(0)
	})

	test('blog without title fails with statuscode 400 and is not added', async () => {
		const newBlog = {
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
			likes: 10
		}

		await api.post('/api/blogs').send(newBlog).expect(400)
		const response = await api.get('/api/blogs')

		expect(response.body.length).toBe(initialBlogs.length)
	})

	test('blog without url fails with statuscode 400 and is not added', async () => {
		const newBlog = {
			title: "First class tests",
			author: "Robert C. Martin",
			likes: 10
		}

		await api.post('/api/blogs').send(newBlog).expect(400)
		const response = await api.get('/api/blogs')

		expect(response.body.length).toBe(initialBlogs.length)
	})

	test('valid blog is deleted', async () => {
		const blogsAtStart = await api.get('/api/blogs')
		const blogToDelete = blogsAtStart.body[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await api.get('/api/blogs')
		expect(blogsAtEnd.body.length).toBe(initialBlogs.length - 1)

		const titles = blogsAtEnd.body.map(r => r.title)
		expect(titles).not.toContain(blogToDelete.title)
	})

	test('valid blog is updated', async () => {
		const blogsAtStart = await api.get('/api/blogs')
		const blogToUpdate = blogsAtStart.body[0]

		const updatedBlog = {
			title: blogToUpdate.title,
			author: blogToUpdate.author,
			url: blogToUpdate.url,
			likes: blogToUpdate.likes + 1
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlog)

		const resultBlog = await api
			.get(`/api/blogs/${blogToUpdate.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(resultBlog.body.likes).toBe(blogToUpdate.likes + 1)
	})
})

describe('when there is initially one user at db', async () => {
	beforeEach(async () => {
		await User.remove({})
		const user = new User({ username: 'root', password: 'sekret' })
		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await api.get('/api/users')

		const newUser = {
			username: 'pekka76',
			name: 'Pekka Puupää',
			password: 'pekkis1'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await api.get('/api/users')
		expect(usersAtEnd.body.length).toBe(usersAtStart.body.length + 1)

		const usernames = usersAtEnd.body.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username is taken', async () => {
		const usersAtStart = await api.get('/api/users')

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('`username` to be unique')

		const usersAtEnd = await api.get('/api/users')
		expect(usersAtEnd.body.length).toBe(usersAtStart.body.length)
	})

	test('creation fails with proper statuscode and message if username is too short', async () => {
		const usersAtStart = await api.get('/api/users')

		const newUser = {
			username: 'ro',
			name: 'Superuser',
			password: 'salainen'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('is shorter than the minimum allowed length')

		const usersAtEnd = await api.get('/api/users')
		expect(usersAtEnd.body.length).toBe(usersAtStart.body.length)
	})

	test('creation fails with proper statuscode and message if username is missing', async () => {
		const usersAtStart = await api.get('/api/users')

		const newUser = {
			name: 'Superuser',
			password: 'salainen'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('`username` is required')

		const usersAtEnd = await api.get('/api/users')
		expect(usersAtEnd.body.length).toBe(usersAtStart.body.length)
	})

	test('creation fails with proper statuscode and message if password is too short', async () => {
		const usersAtStart = await api.get('/api/users')

		const newUser = {
			username: 'rooter',
			name: 'Superuser',
			password: 'sa'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('password is missing or shorter than 3 characters')

		const usersAtEnd = await api.get('/api/users')
		expect(usersAtEnd.body.length).toBe(usersAtStart.body.length)
	})

	test('creation fails with proper statuscode and message if password is missing', async () => {
		const usersAtStart = await api.get('/api/users')

		const newUser = {
			username: 'rooter',
			name: 'Superuser'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('password is missing or shorter than 3 characters')

		const usersAtEnd = await api.get('/api/users')
		expect(usersAtEnd.body.length).toBe(usersAtStart.body.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})