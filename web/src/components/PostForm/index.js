import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../../util/hooks";

import "./styles.scss";

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
    }
  }
`;

export default function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ""
  });

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(_, result) {
      console.log(result);
      values.body = "";
    }
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <form onSubmit={onSubmit}>
      <textarea
        placeholder="your task here"
        name="body"
        type="text"
        onChange={onChange}
        values={values.body}
        className="newPost"
        required
      />
      <input type="submit" value="Add" />
    </form>
  );
}
