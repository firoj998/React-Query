import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

// GET method
const fetchPosts = () => {
  return axios.get("http://localhost:3000/posts");
};

// Post method
const addPost = (post) => {
  return axios.post("http://localhost:3000/posts", post);
};

const PostsReactQuery = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  //posts    ["posts"]
  //posts/1    ["posts", "post.id"]
  //posts/1/comments    ["posts", "post.id", "comments"]  // every single query should have its own query key

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    // staleTime: 30000,
    // refetchInterval: 1000,    // polling
    // refetchIntervalInBackground: true,
    //enabled: false, // Disable for query fetching on component mount
  });
  // console.log(data);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addPost,
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["posts"]);
    // },
    onSuccess: (newData) => {
      queryClient.setQueryData(["posts"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, newData.data],
        };
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, body);
    const post = { title, body };
    mutate(post);
    setTitle("");
    setBody("");
  };

  if (isLoading) {
    return <div className="loading">Page is loading...</div>;
  }
  if (isError) {
    return <div className="error">{error.message}</div>;
  }
  return (
    <div className="post-list">
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post  title"
          value={title}
        />
        <input
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter post  body"
          value={body}
        />
        <button type="submit">Post</button>
      </form>

      {data?.data?.map((post) => (
        <Link key={post.id} to={`/rq-posts/${post.id}`}>
          <div key={post.id} className="post-item">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </div>
        </Link>
      ))}
      <button onClick={refetch}>Fetch Posts</button>
    </div>
  );
};

export default PostsReactQuery;
