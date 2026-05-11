import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/authSlice'

function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuthenticated, user } = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src="/src/assets/img/argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {isAuthenticated ? (
                    <>
                        <Link className="main-nav-item" to="/user">
                            <i className="fa fa-user-circle"></i>
                            {user?.userName}
                        </Link>

                        <Link className="main-nav-item" to="/" onClick={handleLogout}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </Link>
                    </>
                ) : (
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Header
