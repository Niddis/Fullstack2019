import React, { useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text}) => (
	<button onClick={handleClick}>
		{text}
	</button>
)

const Statistic = ({ text, info, extra }) => (
	<tr>
		<td>{text}</td>
		<td>{info} {extra}</td>
	</tr>
)

const Statistics = ({ good, neutral, bad}) => {
	const total = good + neutral + bad

	if (total === 0) {
		return (
			<div>
				<p>Ei yhtään palautetta annettu</p>
			</div>
		)
	}

	return (
		<div>
			<table>
				<tbody>
					<Statistic text='hyvä' info={good}/>
					<Statistic text='neutraali' info={neutral}/>
					<Statistic text='huono' info={bad}/>
					<Statistic text='yhteensä' info={total}/>
					<Statistic text='keskiarvo' info={(good - bad) / total}/>
					<Statistic text='positiivisia' info={good / total *100} extra='%'/>
				</tbody>
			</table>
		</div>
	)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	
	const handleGoodClick = () => setGood(good + 1)
	const handleNeutralClick = () => setNeutral(neutral + 1)
	const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
			<h1>anna palautetta</h1>
      <Button handleClick={handleGoodClick} text='hyvä'/>
			<Button handleClick={handleNeutralClick} text='neutraali'/>
			<Button handleClick={handleBadClick} text='huono'/>
			<h1>statistiikka</h1>
			<Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

