import React, { useState } from "react"

const averageScores = { good: 1, neutral: 0, bad: -1 }

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>
const Statistics = ({ good, neutral, bad}) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine text="average" value={( good * averageScores.good + neutral * averageScores.neutral + bad * averageScores.bad ) / (good + neutral + bad)} />
        <StatisticLine text="positive" value={`${good / (good + neutral + bad) * 100}%`} />
      </tbody>
    </table>
  )
}
const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <div>
        <Button onClick={() => setGood(good + 1)} text="good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button onClick={() => setBad(bad + 1)} text="bad" />
      </div>

      <div>
        <h2>statistics</h2>
        {(good || neutral || bad) ? <Statistics good={good} neutral={neutral} bad={bad} /> : <span>No feedback given</span>}
      </div>
    </div>
  );
}

export default App;
