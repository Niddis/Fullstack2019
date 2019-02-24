import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {
	let component

	beforeEach(() => {
		const blog = {
			title: 'frontendin testaaminen',
			author: 'testaaja',
			likes: 3,
			user: {
				username: 'root',
				name: 'superuser'
			}
		}

		const user = {
			username: 'root',
			name: 'superuser'
		}

		component = render(
			<Blog blog={blog} user={user}/>
		)
	})

	it('at start only title and author are displayed', () => {
		const div = component.container.querySelector('.togglable')
		expect(div).toHaveStyle('display: none')
	})

	it('after clicking blog name other info is displayed', () => {
		const nameDiv = component.container.querySelector('.clickable')
		fireEvent.click(nameDiv)

		const div = component.container.querySelector('.togglable')
		expect(div).not.toHaveStyle('display: none')
	})
})