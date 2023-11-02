
import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/slices/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(setLoading(false))
  }, [])
  return !loading ? (
    <>
      <div>hello</div>
      <Header />
      <main>TODo: <Outlet /></main>
      <Footer /></>
  ) : (null)
}

export default App
