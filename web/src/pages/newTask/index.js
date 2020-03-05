import React from "react";

import NewTaskMessage from "../../components/NewTaskMessage";
import PostForm from "../../components/PostForm";

export default function NewTask() {
  return (
    <div className="container">
      <NewTaskMessage />
      <PostForm />
    </div>
  );
}
