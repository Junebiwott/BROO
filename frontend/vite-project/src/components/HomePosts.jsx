/* eslint-disable react/prop-types */
import { IF } from '../url';


const HomePosts = ({ post }) => {
  return (
    <div className="home-posts-container">
      {/* left */}
      <div className="home-posts-left">
        <img src={IF + post.photo} alt="" className="home-posts-image" />
      </div>
      {/* right */}
      <div className="home-posts-right">
        <h1 className="home-posts-title home-posts-title-md">
          {post.title}
        </h1>
        <div className="home-posts-info home-posts-info-md">
          <p>@{post.username}</p>
          <div className="home-posts-date">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="home-posts-desc home-posts-desc-md">
          {post.desc.slice(0, 200) + " ...Read more"}
        </p>
      </div>
    </div>
  );
}

export default HomePosts;
