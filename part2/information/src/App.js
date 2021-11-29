import React from "react"

const Header = ({ course }) => <h1>{course}</h1>
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
const Content = ({ parts }) => parts.map(part => <Part part={part} />)

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((acc, item) => {
    acc += item.exercises
    return acc
  }, 0)
  
  return <b>total of {totalExercises} exercises</b>
}

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App