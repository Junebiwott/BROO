import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {ImCross} from 'react-icons/im'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
 // Import your CreatePost.css file here

const CreatePost = () => {
   
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [file,setFile]=useState(null)
    const {user}=useContext(UserContext)
    const [cat,setCat]=useState("")
    const [cats,setCats]=useState([])

    const navigate=useNavigate()

    const deleteCategory=(i)=>{
       let updatedCats=[...cats]
       updatedCats.splice(i)
       setCats(updatedCats)
    }

    const addCategory=()=>{
        let updatedCats=[...cats]
        updatedCats.push(cat)
        setCat("")
        setCats(updatedCats)
    }

    const handleCreate=async (e)=>{
        e.preventDefault()
        const post={
          title,
          desc,
          username:user.username,
          userId:user._id,
          categories:cats
        }

        if(file){
          const data=new FormData()
          const filename=Date.now()+file.name
          data.append("img",filename)
          data.append("file",file)
          post.photo=filename
          try{
            const imgUpload=await axios.post(URL+"/api/upload",data)
            console.log(imgUpload.data)
          }
          catch(err){
            console.log(err)
          }
        }

        try{
          const res=await axios.post(URL+"/api/posts/create",post,{withCredentials:true})
          navigate("/posts/post/"+res.data._id)
        }
        catch(err){
          console.log(err)
        }
    }

  return (
    <div>
        <Navbar/>
        <div className='create-post-container'>
        <h1 className='create-post-title'>Create a post</h1>
        <form className='create-post-form'>
          <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Enter post title' className='create-post-input'/>
          <input onChange={(e)=>setFile(e.target.files[0])} type="file" className='create-post-file-input'/>
          <div className='create-post-categories'>
            <div className='create-post-category-inputs'>
                <input value={cat} onChange={(e)=>setCat(e.target.value)} className='create-post-input' placeholder='Enter post category' type="text"/>
                <div onClick={addCategory} className='create-post-category-button'>Add</div>
            </div>

            {/* categories */}
            <div className='create-post-category-container'>
            {cats?.map((c,i)=>(
                <div key={i} className='create-post-category-item'>
                    <p>{c}</p>
                    <p onClick={()=>deleteCategory(i)} className='create-post-delete-category'><ImCross/></p>
                </div>
            ))}
            </div>
          </div>
          <textarea onChange={(e)=>setDesc(e.target.value)} rows={15} cols={30} className='create-post-description' placeholder='Enter post description'></textarea>
          <button onClick={handleCreate} className='create-post-button'>Create</button>
        </form>
        </div>
        <Footer/>
    </div>
  )
}

export default CreatePost
