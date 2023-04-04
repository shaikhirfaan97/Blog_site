import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchallBlogs = async () => {
      const res = await axios.get("http://localhost:9000/api/v1//get/allblog", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlogs(res.data);
    };
    fetchallBlogs();
  });
  return (
    <>
      <main className="my-5">
        <div className="container shadow-lg">
          <section className="text-center">
            <h2 className="mb-5 my-3">
              <strong>Latest Blog</strong>
            </h2>
            <div className="column">
              {blogs && blogs.length > 0 ? (
                blogs.map((item) => {
                  return (
                    <div key={item._id} className="card" style={{ width: "18rem" }}>
                      <img
                        src={`http://localhost:9000/${item.thumbnail}`}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.description}</p>
                        <Link to={`/blog/${item._id}`} className="btn btn-primary">
                          Read More
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h2>Loading....</h2>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
