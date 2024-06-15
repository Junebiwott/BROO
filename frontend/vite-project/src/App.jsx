
import {Route, Routes} from 'react-router-dom'
import Home from "../src/pages/Home"
import Login from "../src/pages/Login"
import Register from "../src/pages/Register"
import PostDetails from '../src/pages/PostDetails'
import CreatePost from '../src/pages/CreatePost'
import EditPost from '../src/pages/EditPost'
import Profile from '../src//pages/Profile'
import {  UserContextProvider } from '../src/context/UserContext'
import MyBlogs from '../src/pages/MyBlogs'




const App = () => {


  
  return (
      <UserContextProvider>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/write" element={<CreatePost/>}/>
      <Route exact path="/posts/post/:id" element={<PostDetails/>}/>
      <Route exact path="/edit/:id" element={<EditPost/>}/>
      <Route exact path="/myblogs/:id" element={<MyBlogs/>}/>
      <Route exact path="/profile/:id" element={<Profile/>}/>
      </Routes>
    
      </UserContextProvider>
  )
}

export default App