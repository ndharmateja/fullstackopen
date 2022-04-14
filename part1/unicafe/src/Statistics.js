const Statistics = ({ good, neutral, bad }) => {
  const getAverage = () =>
    (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)

  const getPositivePercentage = () => (100 * good) / (good + neutral + bad)

  return good + neutral + bad === 0 ? (
    <div>No feedback given</div>
  ) : (
    <>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {good + neutral + bad}</div>
      <div>average {getAverage()}</div>
      <div>positive {getPositivePercentage()}%</div>
    </>
  )
}

export default Statistics
