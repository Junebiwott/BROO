import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useContext, useState } from "react"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
      try {
          const res = await axios.post(URL + "/api/auth/login", { email, password }, { withCredentials: true });
          setUser(res.data);
          navigate("/");
      } catch (err) {
          setError(true);
          console.log(err);
      }
  };

  return (
      <>
          <div className="header">
              <h1><Link to="/">Blog Market</Link></h1>
              <h3><Link to="/register">Register</Link></h3>
          </div>
          <div className="container">
              <h1>Log in to your account</h1>
              <input onChange={(e) => setEmail(e.target.value)} className="input" type="text" placeholder="Enter your email" />
              <input onChange={(e) => setPassword(e.target.value)} className="input" type="password" placeholder="Enter your password" />
              <button onClick={handleLogin} className="button">Log in</button>
              {error && <h3 className="error">Something went wrong</h3>}
              <div className="new-user">
                  <p>New here?</p>
                  <p><Link to="/register">Register</Link></p>
              </div>
          </div>
          <Footer />
      </>
  );
};

export default Login;
