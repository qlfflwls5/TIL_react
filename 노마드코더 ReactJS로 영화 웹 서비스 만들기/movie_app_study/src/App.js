import PropTypes from "prop-types"

function Test({name, age, bool}) { // Test(props) ... <h3>{props.name}</h3>
  return (
    <div>
      <h1>hello</h1>
      <h3>{name}</h3>
      <h3>{age}</h3>
      <h3>{bool}</h3>
    </div>
  )
}

Test.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  bool: PropTypes.bool.isRequired,
}

const human = [
  {
    id: 1, 
    name: "seungho",
    age: 26,
    bool: true,
  },
  {
    id: 2, 
    name: "na",
    age: 25,
    bool: false,
  },
  {
    id: 3, 
    name: "na",
    age: 25,
    bool: false,
  }
]

function renderHuman(man) {
  return <Test key={man.id} name={man.name} age={man.age} bool={man.bool} />
}

function App() {
  return (
    <div className="App">
      <h1>Hello!!!</h1>
      {human.map(renderHuman)}
    </div>
  );
}

export default App;
