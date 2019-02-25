import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import useField from './hooks/index'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [notification, setNotification] = useState({ message: null })

	const usernameField = useField('text')
	const passwordField = useField('password')
	const titleField = useField('text')
	const authorField = useField('text')
	const urlField = useField('text')
	const username = usernameField.field.value
	const password = passwordField.field.value

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const notify = (message, type='success') => {
		setNotification({ message, type })
		setTimeout(() => setNotification({ message: null }), 3000)
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
		} catch(exception) {
			notify('wrong username or password', 'error')
		}
		usernameField.reset()
		passwordField.reset()
	}

	const handleClick = () => {
		setUser(null)
		window.localStorage.clear()
	}

	const addBlog = async (event) => {
		event.preventDefault()

		const blogObject = {
			title: titleField.field.value,
			author: authorField.field.value,
			url: urlField.field.value
		}

		try {
			const returnedBlog = await blogService.create(blogObject)
			const newBlogs = blogs.concat(returnedBlog)
			setBlogs(newBlogs)
			notify(`new blog added: ${returnedBlog.title}`)
		} catch(exception) {
			notify('something went wrong...', 'error')
		}
		titleField.reset()
		authorField.reset()
		urlField.reset()
	}

	const updateBlog = async (id) => {
		try {
			let blogToUpdate = blogs.find(b => b.id === id)
			blogToUpdate = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

			const updatedBlog = await blogService.update(blogToUpdate.id, blogToUpdate)
			const changedBlogs = blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog)
			setBlogs(changedBlogs)
		} catch(exception) {
			notify('unable to update blog', 'error')
		}
	}

	const deleteBlog = async (id) => {
		try {
			const blogToDelete = blogs.find(b => b.id === id)
			if (window.confirm(`remove blog ${blogToDelete.title}`)) {
				await blogService.deleteB(id)
				const changedBlogs = blogs.filter(b => b.id !== id)
				setBlogs(changedBlogs)
			}
		} catch(exception) {
			notify('unable to remove blog', 'error')
		}
	}

	const loginForm = () => {
		return (
			<Togglable buttonLabel='login'>
				<LoginForm
					username={usernameField.field}
					password={passwordField.field}
					handleSubmit={handleLogin}
				/>
			</Togglable>
		)
	}

	if (user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
				<Notification notification={notification} />
				{loginForm()}
			</div>
		)
	}

	return (
		<div>
			<h2>Blogs</h2>
			<Notification notification={notification} />

			<div>
				<p>{user.name} logged in</p>
			</div>

			<button onClick={handleClick}>kirjaudu ulos</button>
			<h2>Create new</h2>
			<BlogForm handleSubmit={addBlog} title={titleField.field} author={authorField.field} url={urlField.field}/>
			{blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
				<Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
			)}
		</div>
	)
}

export default App