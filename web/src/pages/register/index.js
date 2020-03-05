import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import "./styles.scss";
import logo from "../../foton_logo.png";
import { useForm } from "../../util/hooks";
import { AuthContext } from "../../context/auth";

const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(
      registerInput: { username: $username, email: $email, password: $password }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState("");

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: ""
  });

  const [addUser] = useMutation(REGISTER_USER, {
    update({ data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.stacktrace[0]);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="container">
      <img src={logo} alt="foton logo" className="logo" />
      <p>
        Already have an account?{" "}
        <a onClick={() => props.history.push("/login")}>Login</a>
      </p>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          required
          name="username"
          placeholder="username"
          value={values.username}
          onChange={onChange}
        />
        <input
          type="email"
          required
          name="email"
          placeholder="email"
          value={values.email}
          onChange={onChange}
        />
        <input
          type="password"
          required
          name="password"
          placeholder="password"
          value={values.password}
          onChange={onChange}
        />
        {Object.values(errors) != "" && (
          <span className="error">Email already taken</span>
        )}
        <input type="submit" value="Register"/>
      </form>
    </div>
  );
}
