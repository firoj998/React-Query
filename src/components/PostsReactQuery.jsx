import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const PostsReactQuery = () => {
  //posts    ["posts"]
  //posts/1    ["posts", "post.id"]
  //posts/1/comments    ["posts", "post.id", "comments"]  // every single query should have its own query key

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:3000/posts");
    },
    // staleTime: 30000,
    // refetchInterval: 1000,    // polling
    // refetchIntervalInBackground: true,
    enabled: false, // Disable for query fetching on component mount
  });
  // console.log(data);
  if (isLoading) {
    return <div className="loading">Page is loading...</div>;
  }
  if (isError) {
    return <div className="error">{error.message}</div>;
  }
  return (
    <div className="post-list">
      <button onClick={refetch}>Fetch Posts</button>
      {data?.data?.map((post) => (
        <Link key={post.id} to={`/rq-posts/${post.id}`}>
          <div key={post.id} className="post-item">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostsReactQuery;
