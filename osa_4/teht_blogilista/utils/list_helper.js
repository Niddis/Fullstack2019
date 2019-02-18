const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (acc, cur) => {
		return acc + cur.likes
	}

	return blogs.length === 0
		? 0
		: blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return 'no blogs'
	}

	blogs.sort((a, b) => {
		return b.likes - a.likes
	})

	const blog = {
		title: blogs[0].title,
		author: blogs[0].author,
		likes: blogs[0].likes
	}

	return blog
}

const mostBlogs = (blogs) => {
	const blog = _.chain(blogs)
		.countBy('author')
		.map((val, key) => {
			return { author: key, blogs: val }
		})
		.sortBy('blogs')
		.last()
		.value()

	return blogs.length === 0
	? 'no blogs'
	: blog
}

const mostLikes = (blogs) => {
	const blog = _.chain(blogs)
		.groupBy('author')
		.map((val, key) => {
			let likesSum = _.sumBy(val, 'likes')
			return { author: key, likes: likesSum }
		})
		.sortBy('likes')
		.last()
		.value()

	return blogs.length === 0
		? 'no blogs'
		: blog
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes
}