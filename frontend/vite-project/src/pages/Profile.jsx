import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
    const { id: paramId } = useParams();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        if (user?._id) {
            fetchProfile();
            fetchUserPosts();
        }
    }, [paramId, user?._id]);

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${URL}/api/users/${user._id}`);
            setUsername(res.data.username);
            setEmail(res.data.email);
            // 
            setPassword(res.data.password); // Commented out for security reasons
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUserPosts = async () => {
        try {
            const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
            setPosts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUserUpdate = async () => {
        setUpdated(false);
        try {
            await axios.put(
                `${URL}/api/users/${user._id}`,
                { username, email, password },
                { withCredentials: true }
            );
            setUpdated(true);
        } catch (err) {
            console.log(err);
            setUpdated(false);
        }
    };

    const handleUserDelete = async () => {
        try {
            await axios.delete(`${URL}/api/users/${user._id}`, {
                withCredentials: true,
            });
            setUser(null);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Navbar className="navbar" />
            <div className="container">
                <div className="profile-section">
                    <h1 className="profile-title">Profile</h1>
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className="profile-input"
                        placeholder="Your username"
                        type="text"
                    />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="profile-input"
                        placeholder="Your email"
                        type="email"
                    />
                    {/* 
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="profile-input"
                            placeholder="Your password"
                            type="password"
                        />
                    */}
                    <div className="buttons-container">
                        <button
                            onClick={handleUserUpdate}
                            className="action-button"
                        >
                            Update
                        </button>
                        <button
                            onClick={handleUserDelete}
                            className="action-button"
                        >
                            Delete
                        </button>
                    </div>
                    {updated && (
                        <h3 className="success-message">
                            User updated successfully!
                        </h3>
                    )}
                </div>
                <div className="profile-section">
                    <h1 className="profile-title">Your posts:</h1>
                    {posts?.map((post) => (
                        <ProfilePosts key={post._id} post={post} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
