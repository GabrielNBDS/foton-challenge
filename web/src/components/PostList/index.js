import React from "react";

export default function PostList({ data }) {
  return (
    <>
      <input type="text" placeholder="search" />
      <ul>{data && data.getPosts.map(element => <li>{element.body}</li>)}</ul>
    </>
  );
}
