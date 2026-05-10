import { Routes, Route } from 'react-router-dom'
import Home from './pages/index'
import SignIn from './pages/sign-in'
import User from './pages/user'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/user" element={<User />} />
    </Routes>
  )
}

export default App
