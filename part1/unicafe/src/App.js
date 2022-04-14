import { useState } from 'react'

const Button = ({ onClick, title }) => (
  <button onClick={onClick}>{title}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const getAverage = () =>
    (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)

  const getPositivePercentage = () => (100 * good) / (good + neutral + bad)

  return good + neutral + bad === 0 ? (
    <div>No feedback given</div>
  ) : (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={good + neutral + bad} />
        <StatisticLine text='average' value={getAverage()} />
        <StatisticLine text='positive' value={`${getPositivePercentage()} %`} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} title='good' />
      <Button onClick={() => setNeutral(neutral + 1)} title='neutral' />
      <Button onClick={() => setBad(bad + 1)} title='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
