import { useState } from 'react'

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  if (total === 0) {
    return <p>No feedback given</p>
  }

  const average = (good - bad) / total
  const positive = (good / total) * 100

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive %" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // =====================
  // UNICAFE STATE
  // =====================
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // =====================
  // ANECDOTES STATE
  // =====================
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower makes it later!',
    'First 90% takes 90% time...',
    'Good programmers write human code.',
    'Premature optimization is evil.',
    'Debugging is twice as hard...',
    'Console.log is your best friend.',
    'The only way to go fast is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  // random anecdote
  const randomAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  // vote
  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  // most voted
  const maxVotes = Math.max(...votes)
  const bestIndex = votes.indexOf(maxVotes)

  return (
    <div>

      {/* ================= UNICAFE ================= */}
      <h1>give feedback</h1>

      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />

      <h2>statistics</h2>

      <Statistics good={good} neutral={neutral} bad={bad} />

      {/* ================= ANECDOTES ================= */}
      <h1>anecdotes</h1>

      <p>{anecdotes[selected]}</p>

      <Button text="next anecdote" onClick={randomAnecdote} />
      <Button text="vote" onClick={vote} />

      <h2>anecdote with most votes</h2>
      <p>{anecdotes[bestIndex]}</p>
      <p>has {maxVotes} votes</p>

    </div>
  )
}

export default App