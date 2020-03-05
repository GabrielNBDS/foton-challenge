import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import "./styles.scss";

export default function NewTaskMessage() {

    const [redirect, setRedirect] = useState(false);

    if (redirect) {
      return <Redirect to={{ pathname: "/" }} />;
    }

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="left-container">
          <h2>New Task</h2>
          <h6>
            What do you want to do? <span>🤔</span>
          </h6>
        </div>
        <div className="right-container">
          <a onClick={e => setRedirect(true)}>Back Home</a>
        </div>
      </div>
    </>
  );
}
