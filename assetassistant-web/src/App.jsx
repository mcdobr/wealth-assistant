import './App.css'
import CompoundInterestCalculator from './CompoundInterestCalculator.jsx'

function App() {
  return (
    <>
      <h1>AssetAssistant Web</h1>
      <button onClick={event => { handleSubmit(event) }}>Click me</button>

      <CompoundInterestCalculator/>
    </>
  )
}

const handleSubmit = (e) => {
  fetch('http://localhost:8080/api/v1/assets')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

export default App
