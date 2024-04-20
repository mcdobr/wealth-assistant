import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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

function CompoundInterestCalculator() {
  const [formData, setFormData] = useState({
    "principal-sum": 1000,
    "interest-rate": 1,
    "number-of-years": 10
  });

  const [estimatedEarnings, setEstimatedEarnings] = useState(0);

  const onChange = (event) => {
    setFormData(previousFormData => {
      const currentFormData = {
        ...previousFormData,
        [event.target.name]: parseFloat(event.target.value)
      };

      return currentFormData;
    });
  };
   
    useEffect(() => {
      console.log(formData);
      setEstimatedEarnings(formData["principal-sum"] * ((1 + formData["interest-rate"] / 100) ** formData["number-of-years"]));
    }, [formData, estimatedEarnings]);

  return (
    <>
      <form>
        <label>Principal: </label>
        <input 
          type="number" 
          min="1"
          value={formData["principal-sum"]}
          onChange={onChange}
          id="principal-sum"
          name="principal-sum"
        />

        <label>Interest rate: </label>
        <input 
          type="range" 
          min="0" 
          max="100" 
          step="0.5" 
          value={formData["interest-rate"]} 
          onChange={onChange}
          id="interest-rate"
          name="interest-rate"
        />

        <label>Number of years: </label>
        <input
          type="number"
          min="1"
          max="100"
          step="1"
          value={formData["number-of-years"]}
          onChange={onChange}
          id="number-of-years"
          name="number-of-years"
        />
      </form>

      <div>
        <span>Expected earnings:</span>
        <span id="estimated-earnings">{isNaN(estimatedEarnings) ? "N/A" : estimatedEarnings.toFixed(3)}</span>
      </div>
    </>
  )
}


export default App
