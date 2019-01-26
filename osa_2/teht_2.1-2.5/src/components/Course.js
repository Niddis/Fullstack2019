import React from 'react'

const Part = ({ part }) => (
	<li>{part.name} {part.exercises}</li>
)

const Header = ({ name }) => (
	<h2>{name}</h2>
)

const Content = ({ parts }) => {
  const listParts = () => parts.map(part => 
    <Part 
      key={part.id}
      part={part}
    />
  )

  const countExercises = () => parts.reduce((acc, cur) => 
    acc + cur.exercises, 0
  )

	return (
		<div>
			<ul>
        {listParts()}
      </ul>
      <p>yhteensä {countExercises()} tehtävää</p>
		</div>
	)
}

const Course = ({ courses }) => {
  const listCourses = () => courses.map(course => 
    <div key={course.id}>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )

  return (
    <div>
      {listCourses()}
    </div>
  )
}

export default Course