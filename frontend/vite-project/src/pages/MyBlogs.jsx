import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import HomePosts from "../components/HomePosts";
import Loader from "../components/Loader";

const MyBlogs = () => {
    const { search } = useLocation();
    const [posts, setPosts] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loader, setLoader] = useState(false);
    const { user } = useContext(UserContext);

    const fetchPosts = async () => {
        setLoader(true);
        try {
            const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
            setPosts(res.data);
            setNoResults(res.data.length === 0);
        } catch (err) {
            console.error("Error fetching posts:", err);
            setNoResults(true); // Handle error state
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        if (user?._id) {
            fetchPosts();
        }
    }, [search, user?._id]);

    return (
        <>
            <Navbar />
            <div className="px-8 md:px-[200px] min-h-[80vh]">
                {loader ? (
                    <div className="h-[40vh] flex justify-center items-center">
                        <Loader />
                    </div>
                ) : noResults ? (
                    <h3 className="text-center font-bold mt-16">No posts available</h3>
                ) : (
                    posts.map((post) => (
                        <Link key={post._id} to={user ? `/posts/post/${post._id}` : "/login"}>
                            <HomePosts post={post} />
                        </Link>
                    ))
                )}
            </div>
            <Footer />
        </>
    );
};

export default MyBlogs;
