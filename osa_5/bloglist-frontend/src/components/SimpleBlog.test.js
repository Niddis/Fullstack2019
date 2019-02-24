import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

test('renders title, author and likes', () => {
	const blog = {
		title: 'frontendin testaaminen',
		author: 'testaaja',
		likes: 3
	}

	const component = render(
		<SimpleBlog blog={blog} />
	)

	expect(component.container).toHaveTextContent(
		'frontendin testaaminen testaaja'
	)
	expect(component.container).toHaveTextContent(
		'blog has 3 likes'
	)
})

it('clicking the button twice calls event handler twice', async () => {
	const blog = {
		title: 'Klikkausten renderöinti',
		author: 'testaaja',
		likes: 1
	}

	const mockHandler = jest.fn()

	const { getByText } = render(
		<SimpleBlog blog={blog} onClick={mockHandler} />
	)

	const button = getByText('like')
	fireEvent.click(button)
	fireEvent.click(button)

	expect(mockHandler.mock.calls.length).toBe(2)
})