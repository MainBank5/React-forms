import './App.css'
import Form from './components/form'
import { useState } from 'react'
import SignUp from './components/SignUp';
function App() {
  const [register, setRegister] = useState(false);


  const handleRegister = () => {
    setRegister(!register)
  }

  return (
    <>
      <Form/> <br />
      <button onClick={handleRegister}>Sign Up</button>
      {register && <SignUp/>}
    </>
  )
}

export default App
