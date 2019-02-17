const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0
	}
]

const listWithMultipleBlogs = [
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0
	}
]

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {
	test('of empty list is zero', () => {
		const result = listHelper.totalLikes([])
		expect(result).toBe(0)
	})

	test('when list has only one blog equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(7)
	})

	test('of a bigger list is calculated right', () => {
		const result = listHelper.totalLikes(listWithMultipleBlogs)
		expect(result).toBe(22)
	})
})

describe('favourite blog', () => {
	test('of empty list is "no blogs"', () => {
		const result = listHelper.favouriteBlog([])
		expect(result).toBe('no blogs')
	})

	test('when a list has only one blog is that blog', () => {
		const result = listHelper.favouriteBlog(listWithOneBlog)
		const expectedResult = {
			title: "React patterns",
			author: "Michael Chan",
			likes: 7
		}
		expect(result).toEqual(expectedResult)
	})

	test('of a bigger list is found correctly', () => {
		const result = listHelper.favouriteBlog(listWithMultipleBlogs)
		const expectedResult = {
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			likes: 12
		}
		expect(result).toEqual(expectedResult)
	})
})

describe('author with most blogs', () => {
	test('of empty list is "no blogs"', () => {
		const result = listHelper.mostBlogs([])
		expect(result).toBe('no blogs')
	})

	test('when a list has only one blog is the author of that blog', () => {
		const result = listHelper.mostBlogs(listWithOneBlog)
		const expectedResult = {
			author: "Michael Chan",
			blogs: 1
		}
		expect(result).toEqual(expectedResult)
	})

	test('is found correctly from a bigger list', () => {
		const result = listHelper.mostBlogs(listWithMultipleBlogs)
		const expectedResult = {
			author: 'Robert C. Martin',
			blogs: 2
		}
		expect(result).toEqual(expectedResult)
	})
})