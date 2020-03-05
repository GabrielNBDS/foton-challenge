import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import "./styles.scss";
import logo from "../../foton_logo.png";
import { useForm } from "../../util/hooks";
import { AuthContext } from "../../context/auth";

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState("");

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: ""
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.stacktrace[0]);
    },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="container">
      <img src={logo} alt="foton logo" className="logo" />
      <p>
        Don't have an account?{" "}
        <a onClick={() => props.history.push("/register")}>Register Now</a>
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
          type="password"
          required
          name="password"
          placeholder="password"
          value={values.password}
          onChange={onChange}
        />
        {Object.values(errors) != "" && (
          <span className="error">Wrong credentials</span>
        )}
        <input type="submit" value="Login"/>
      </form>
    </div>
  );
}
