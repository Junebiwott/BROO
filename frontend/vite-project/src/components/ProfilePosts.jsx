import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
 // Import your Profile.css file here

const Profile = () => {
    const param = useParams().id;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [updated, setUpdated] = useState(false);

    const fetchProfile = async () => {
        try {
            const res = await axios.get(URL + "/api/users/" + user._id);
            setUsername(res.data.username);
            setEmail(res.data.email);
            setPassword(res.data.password);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUserUpdate = async () => {
        setUpdated(false);
        try {
            const res = await axios.put(URL + "/api/users/" + user._id, { username, email, password }, { withCredentials: true });
            console.log(res.data); // Optional: Log response data
            setUpdated(true);
        } catch (err) {
            console.log(err);
            setUpdated(false);
        }
    };

    const handleUserDelete = async () => {
        try {
            const res = await axios.delete(URL + "/api/users/" + user._id, { withCredentials: true });
            setUser(null);
            navigate("/");
            console.log(res.data); // Optional: Log response data
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUserPosts = async () => {
        try {
            const res = await axios.get(URL + "/api/posts/user/" + user._id);
            setPosts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [param]);

    useEffect(() => {
        fetchUserPosts();
    }, [param]);

    return (
        <div>
            <Navbar />
            <div className="profile-container">
                <div className="flex md:flex-row flex-col-reverse md:items-start items-start">
                    <div className="flex flex-col md:w-70 w-full mt-8 md:mt-0">
                        <h1 className="profile-heading">Your posts:</h1>
                        {posts?.map((p) => (
                            <ProfilePosts key={p._id} p={p} />
                        ))}
                    </div>
                    <div className="md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-30 w-full md:items-end">
                        <div className="flex flex-col space-y-4 items-start">
                            <h1 className="profile-heading">Profile</h1>
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
                            {/* <input onChange={(e)=>setPassword(e.target.value)} value={password} className="profile-input" placeholder="Your password" type="password"/> */}
                            <div className="flex items-center space-x-4 mt-8">
                                <button onClick={handleUserUpdate} className="profile-button">
                                    Update
                                </button>
                                <button onClick={handleUserDelete} className="profile-button">
                                    Delete
                                </button>
                            </div>
                            {updated && <h3 className="profile-success">User updated successfully!</h3>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
