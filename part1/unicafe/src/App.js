import { useState } from 'react'
import Statistics from './Statistics'
import Button from './Button'

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
