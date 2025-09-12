import "./App.css";
import Home from "./components/Home";
import PostsReactQuery from "./components/PostsReactQuery";
import PostsTraditional from "./components/PostsTraditional";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Traditional Posts</Link>
            </li>
            <li>
              <Link to="/rq-posts">React Qeury Posts</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostsTraditional />} />
          <Route path="/rq-posts" element={<PostsReactQuery />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
