import React, { useState } from "react"

const averageScores = { good: 1, neutral: 0, bad: -1 }

const Statistics = ({ good, neutral, bad}) => {
  return (
    <>
      <div>average {( good * averageScores.good + neutral * averageScores.neutral + bad * averageScores.bad ) / (good + neutral + bad)}</div>
      <div>positive {good / (good + neutral + bad) * 100}%</div>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>

      <div>
        <h2>statistics</h2>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {good + neutral + bad}</div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
}

export default App;
