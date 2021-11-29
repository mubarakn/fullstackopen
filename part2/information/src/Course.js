const Header = ({ course }) => <h1>{course}</h1>
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
const Content = ({ parts }) => parts.map(part => <Part part={part} />)
const Total = ({ parts }) => {
  const totalExercises = parts.reduce((acc, item) => {
    acc += item.exercises
    return acc
  }, 0)
  
  return <b>total of {totalExercises} exercises</b>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course