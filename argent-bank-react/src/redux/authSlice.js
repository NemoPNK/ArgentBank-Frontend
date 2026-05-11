import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      state.isAuthenticated = true
      localStorage.setItem('token', action.payload)
    },

    setUser: (state, action) => {
      state.user = action.payload
    },

    logout: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    },
  },
})

export const { setToken, setUser, logout } = authSlice.actions

export default authSlice.reducer