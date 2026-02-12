import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Button } from "./Button/Button";

// context
import { UserContext } from "../context/UserContext";

// Auth services
import { userLogout } from "../services/AuthService";

export const NavBar = () => {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    // if user exists, show data, otherwise show "Log In"
    const currentUserLabel = user ? user.name || user.email : "Log In";
    const linkStyle = "hover:underline"

    return (
        <nav className='bg-gray-800 p-4 text-white'>
            <div className='container mx-auto flex justify-between items-center'>

                <Link to="/" className={linkStyle}>Event Manager</Link>

                <div className="flex space-x-5 items-center">
                    <Link to={user ? "/profile" : "/login"} className={linkStyle}>{currentUserLabel}</Link>
                    {!user && <Link to='/register' className={linkStyle}>Register</Link>}
                    {user && <Button onClick={handleLogout}>Logout</Button>}
                </div>

            </div>
        </nav>
    )

    function handleLogout() {
        navigate("/"); // redirect to home
        setUser(null);
        userLogout(); // api call
    }
}