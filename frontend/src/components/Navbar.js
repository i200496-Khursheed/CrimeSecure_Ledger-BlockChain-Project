//Navbar done
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
    logout()
    }
    
    const isAdmin = user?.email?.endsWith('@admin.crimesecure.com')
    const isCitizen = user?.email?.endsWith('@citizen.crimesecure.com')

    return (
        <header>
            <div className = "container">
                <Link to = "/">
                    <h1> Welcome to CrimeSecure Ledger </h1>
                </Link>
            
                <nav>
                    {user && (
                        <div>
                             <ul>

                                {isCitizen && (
                                    <>
                                        <li> <Link to="/ViewCrimeRecordsPage"> <a> View Crime Records</a> </Link> </li> 
                                    </>
                                )}

                                {isAdmin && (
                                    <>
                                        <li> <Link to="/"><a> Add New Crime Record</a></Link></li>
                                        <li> <Link to="/ViewCrimeRecordsPage"> <a> View Crime Records</a> </Link> </li>
                                    </>
                                )}

                            </ul>
                            <span>{user.email}</span>
                            <button id='out' onClick={handleClick}>Log out</button>
                        </div>
                    )}

                    {!user && (
                        <div>
                            <Link to="/login"><a id='log'>Login</a></Link>
                            <Link to="/signup"><a id='sig'>Signup</a></Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar