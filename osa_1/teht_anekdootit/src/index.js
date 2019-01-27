import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = (props) => {
	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(new Array(6).fill(0))
	const [mostVotes, setMostVotes] = useState(new Array(2).fill(0))
	
	const handleNextClick = () => setSelected(Math.floor(Math.random() * 6))
	const handleVoteClick = () => {
		const copy = [...votes]
		copy[selected] += 1
    setVotes(copy)
    
    if (copy[selected] > mostVotes[1]) {
      const copyM = [...mostVotes]
      copyM[0] = selected
      copyM[1] = copy[selected]
			setMostVotes(copyM)
    }
	}

  return (
    <div>
			<h1>Anecdote of the day</h1>
			{props.anecdotes[selected]}
			<p>has {votes[selected]} votes</p>
			<Button handleClick={handleVoteClick} text='vote'/>
			<Button handleClick={handleNextClick} text='next anecdote'/>
			<h1>Anecdote with most votes</h1>
      {props.anecdotes[mostVotes[0]]}
      <p>has {mostVotes[1]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));
