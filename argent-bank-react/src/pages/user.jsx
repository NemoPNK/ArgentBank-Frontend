import Header from '../components/Header'
import Footer from '../components/Footer'
import Account from '../components/Account'
import { useSelector } from 'react-redux'
import { useState } from 'react'

function User() {
  const user = useSelector((state) => state.auth.user)

  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState(user?.userName || '')

  return (
    <>
      <Header />

      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user?.userName}!
          </h1>

          {isEditing ? (
            <form>
              <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <button className="edit-button">Save</button>
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