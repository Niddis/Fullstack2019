import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
	const [blogVisible, setBlogVisible] = useState(false)

	const blogStyle = {
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 2,
		border: 'solid',
		borderWith: 1,
		marginBottom: 5
	}

	const show = { display: blogVisible ? '' : 'none' }
	const showButton = { display: user.username === blog.user.username ? '' : 'none' }
	const toggleVisibility = () => {
		setBlogVisible(!blogVisible)
	}

	return (
		<div style={blogStyle} className="blog">
			<div onClick={toggleVisibility} className="clickable">
				{blog.title} {blog.author}
			</div>
			<div style={show} className="togglable">
				<div>{blog.url}</div>
				<div>{blog.likes} likes <button onClick={() => updateBlog(blog.id)}>like</button></div>
				<div>added by {blog.user.name}</div>
				<button style={showButton} onClick={() => deleteBlog(blog.id)}>remove</button>
			</div>
		</div>
	)
}

export default Blog