import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './redux/authSlice'

import Home from './pages/index'
import SignIn from './pages/sign-in'
import User from './pages/user'

function App() {
  const dispatch = useDispatch()
  const { token, user, isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token || user) {
        return
      }

      try {
        const response = await fetch(
          'http://localhost:3001/api/v1/user/profile',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()
        dispatch(setUser(data.body))
      } catch (error) {
        console.log(error)
      }
    }

    fetchUserProfile()
  }, [token, user, dispatch])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route
        path="/user"
        element={isAuthenticated ? <User /> : <Navigate to="/" />}
      />
    </Routes>
  )
}

export default App
