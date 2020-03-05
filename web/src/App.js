import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import ProtectedRoute from "./util/ProtectedRoute";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import NewTask from "./pages/newTask";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/new" component={NewTask} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/register" component={Register} />
      </Router>
    </AuthProvider>
  );
}

export default App;
