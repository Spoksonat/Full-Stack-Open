const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => {
  const initialVal = 0;
  const total = parts.reduce(
    (accumulator, currentVal) => accumulator + currentVal.exercises,
    initialVal
  );
  return <b>total of {total} exercises</b>;
};

const Part = ({ part }) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  );
};

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
