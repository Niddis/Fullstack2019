const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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

test('blog without title returns 400 and is not added', async () => {
	const newBlog = {
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10
	}

	await api.post('/api/blogs').send(newBlog).expect(400)
	const response = await api.get('/api/blogs')

	expect(response.body.length).toBe(initialBlogs.length)
})

test('blog without url returns 400 and is not added', async () => {
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

afterAll(() => {
	mongoose.connection.close()
})