import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import "./styles.scss";
import NewTask from "../../pages/newTask";

export default function HomeMessage({ username, logout }) {
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to={{ pathname: "/new" }} />;
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="left-container">
          <h2>Hello, {username}</h2>
          <h6>
            Check your tasks <span>👇</span>
          </h6>
        </div>
        <div className="right-container">
          <a onClick={logout}>Logout</a>
          <a onClick={e => setRedirect(true)}>New Task</a>
        </div>
      </div>
    </>
  );
}
