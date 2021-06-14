import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";

export default function Users() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUsers() {
      const allUsers = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );
      setUsers(allUsers.data.data);
    }

    setLoading(true);
    getUsers();
    setLoading(false);
  }, [page]);

  return (
    <div className="App">
      <h2 className="heading" style={{ textAlign: "center" }}>
        {loading ? <span>Loading...</span> : <span>Page {page}/2</span>}
      </h2>
      <div id="app">
        {users.map((user) => {
          return (
            <div class="user">
              <p>
                <img src={user.avatar} alt={user.first_name} />
              </p>
              <p>Email: {user.email}</p>
              <p>First Name: {user.first_name}</p>
              <p>Last Name: {user.last_name}</p>
            </div>
          );
        })}
      </div>
      <div className="buttons">
        <button
          onClick={() => setPage(1)}
          className={`btn ${page === 1 && "hide"}`}
        >
          {" "}
          Previous
        </button>
        <button
          onClick={() => setPage(2)}
          className={`btn ${page === 2 && "hide"}`}
        >
          Next{" "}
        </button>
      </div>
    </div>
  );
}
