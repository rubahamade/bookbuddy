import { Link, useLocation } from "react-router-dom"



const Navigations = ({user}) => {
    
    const location = useLocation()
    const {pathname} = location

    return (
        <nav>
            <Link to='/books' className={pathname === "/books" ? "selected" : ""}>Books</Link>

            <Link to='/about' className={pathname === "/about" ? "selected" : ""}>About</Link>
            {
                user.email ? (
                    <span>
                        <Link to="/account" className={pathname === "/account" ? "selected" : ""}>User</Link>
                    </span>

                    
                
                ) : (
                    
                    <span>
                        <Link to="/login" className={pathname === "/login" ? "selected" : ""}>Login</Link>
                        <Link to='/register' className={pathname === "/register" ? "selected" : ""}>Register</Link>
                    </span>
                )
            }
        </nav>
    )
}

export default Navigations