import Header from '../components/Header'
import Footer from '../components/Footer'
import Account from '../components/Account'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/authSlice'
import { useEffect, useState } from 'react'

function User() {
  const dispatch = useDispatch()
  const { user, token } = useSelector((state) => state.auth)

  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState(user?.userName || '')

  useEffect(() => {
    if (user?.userName) {
      setUserName(user.userName)
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/user/profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userName,
          }),
        }
      )

      const data = await response.json()

      dispatch(setUser(data.body))
      setIsEditing(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header />

      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user?.firstName} {user?.lastName}!
          </h1>

          {isEditing ? (
            <form className="edit-user-form" onSubmit={handleSubmit}>
              <h2 className="edit-user-form-title">Edit user info</h2>

              <div className="edit-input-wrapper">
                <label htmlFor="username">User name:</label>
                <input
                  type="text"
                  id="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="edit-input-wrapper">
                <label htmlFor="firstName">First name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={user?.firstName || ''}
                  disabled
                />
              </div>

              <div className="edit-input-wrapper">
                <label htmlFor="lastName">Last name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={user?.lastName || ''}
                  disabled
                />
              </div>

              <div className="edit-button-wrapper">
                <button className="edit-button">Save</button>
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Name
            </button>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>

        <Account
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />

        <Account
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />

        <Account
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>

      <Footer />
    </>
  )
}

export default User