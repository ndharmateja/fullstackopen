import StatisticLine from './StatisticLine'

const Statistics = ({ good, neutral, bad }) => {
  const getAverage = () =>
    (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)

  const getPositivePercentage = () => (100 * good) / (good + neutral + bad)

  return good + neutral + bad === 0 ? (
    <div>No feedback given</div>
  ) : (
    <>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={good + neutral + bad} />
      <StatisticLine text='average' value={getAverage()} />
      <StatisticLine text='positive' value={`${getPositivePercentage()} %`} />
    </>
  )
}

export default Statistics
