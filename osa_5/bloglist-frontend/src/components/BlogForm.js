import React from 'react'

const BlogForm = ({ handleSubmit, title, author, url }) => (
	<form onSubmit={handleSubmit}>
		<div>
			title: <input {...title}/>
		</div>
		<div>
			author: <input {...author}/>
		</div>
		<div>
			url: <input {...url}/>
		</div>
		<button type="submit">create</button>
	</form>
)

export default BlogForm