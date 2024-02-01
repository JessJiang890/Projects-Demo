import "./App.css";
import Pagination from "./components/Pagination";
import Posts from "./components/Posts";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  //get current posts of the active page 3
  const indexOfLastPost = currentPage * postsPerPage; //30
  const indexOfFirstPage = indexOfLastPost - postsPerPage; //20
  const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container">
        <h1>My Blog</h1>
        <Posts posts={currentPosts} loading={loading} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

export default App;
