const Header = (props) => <h1>{props.course}</h1>

const Total = (props) => {
  const { parts } = props
  return (
    <p>
      Number of exercises{' '}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  )
}

const Part = (props) => {
  const { name, exercises } = props.part
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = (props) => {
  const { parts } = props
  return (
    <>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 },
    ],
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
