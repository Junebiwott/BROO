import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";
 // Import your Navbar.css file here

const Navbar = () => {
    const [prompt, setPrompt] = useState("");
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();
    const path = useLocation().pathname;

    const showMenu = () => {
        setMenu(!menu);
    };

    const { user } = useContext(UserContext);

    return (
        <div className="navbar-container">
            <h1 className="navbar-title">
                <Link to="/">Blog Market</Link>
            </h1>
            {path === "/" && (
                <div className="search-container">
                    <p
                        onClick={() =>
                            navigate(prompt ? "?search=" + prompt : navigate("/"))
                        }
                        className="cursor-pointer menu-icon"
                    >
                        <BsSearch />
                    </p>
                    <input
                        onChange={(e) => setPrompt(e.target.value)}
                        className="search-input"
                        placeholder="Search a post"
                        type="text"
                    />
                </div>
            )}
            <div className="hidden md:flex items-center justify-center space-x-4">
                {user ? (
                    <h3>
                        <Link to="/write">Write</Link>
                    </h3>
                ) : (
                    <h3>
                        <Link to="/login">Login</Link>
                    </h3>
                )}
                {user ? (
                    <div onClick={showMenu}>
                        <p className="cursor-pointer menu-icon">
                            <FaBars />
                        </p>
                        {menu && <Menu />}
                    </div>
                ) : (
                    <h3>
                        <Link to="/register">Register</Link>
                    </h3>
                )}
            </div>
            <div onClick={showMenu} className="md:hidden">
                <p className="cursor-pointer menu-icon">
                    <FaBars />
                </p>
                {menu && <Menu />}
            </div>
        </div>
    );
};

export default Navbar;
