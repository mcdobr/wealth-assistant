import './App.css'
import CompoundInterestCalculator from './CompoundInterestCalculator.jsx'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  return (
    <>
      <h1>AssetAssistant Web</h1>

      <LoginButton />
      <LogoutButton />
      {/*
      <button onClick={event => { handleSubmit(event) }}>Click me</button>

      <CompoundInterestCalculator/>
      */}
    </>
  )
}

const handleSubmit = (e) => {
  fetch('http://localhost:8080/api/v1/assets')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  
  return (
    <>
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <>
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
    </>
  );
}

export default App
