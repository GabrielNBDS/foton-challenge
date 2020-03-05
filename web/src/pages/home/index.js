import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import "./styles.scss";
import { AuthContext } from "../../context/auth";

import PostList from "../../components/PostList";
import HomeMessage from "../../components/HomeMessage";

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
    }
  }
`;

export default function Home() {
  const { user, logout } = useContext(AuthContext);

  const { data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <div className="container">
      <HomeMessage username={user.username} logout={logout} />

      {data && <PostList data={data} />}
    </div>
  );
}
