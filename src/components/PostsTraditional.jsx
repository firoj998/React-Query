/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
const PostsTraditional = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      setPosts(response.data);
      console.log(posts);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  if (isLoading) {
    return <div>Page is loading...</div>;
  }
  if (isError) {
    return <div>Error has Occured...</div>;
  }
  return (
    <div className="post-list">
      {posts.map((post) => {
        return (
          <div key={post.id} className="post-item">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PostsTraditional;
