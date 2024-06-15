import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";

// Import your Menu.css file here

const Menu = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get(`${URL}/api/auth/logout`, { withCredentials: true });
            setUser(null);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="menu-container">
            {!user ? (
                <>
                    <h3 className="menu-item">
                        <Link to="/login">Login</Link>
                    </h3>
                    <h3 className="menu-item">
                        <Link to="/register">Register</Link>
                    </h3>
                </>
            ) : (
                <>
                    <h3 className="menu-item">
                        <Link to={`/profile/${user._id}`}>Profile</Link>
                    </h3>
                    <h3 className="menu-item">
                        <Link to="/write">Write</Link>
                    </h3>
                    <h3 className="menu-item">
                        <Link to={`/myblogs/${user._id}`}>My blogs</Link>
                    </h3>
                    <h3 className="menu-item" onClick={handleLogout}>
                        Logout
                    </h3>
                </>
            )}
        </div>
    );
};

export default Menu;
