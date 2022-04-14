const Header = (props) => <h2>{props.course}</h2>

const Total = (props) => {
  const { parts } = props
  return (
    <p>
      <b>
        total of {parts.reduce((sum, part) => sum + part.exercises, 0)}{' '}
        exercises
      </b>
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
      {parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </>
  )
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
