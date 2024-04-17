import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>AssetAssistant Web</h1>
      <button onClick={event => { handleSubmit(event) }}>Click me</button>
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
