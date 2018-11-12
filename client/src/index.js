import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import withSession from "./components/withSession";
import NavBar from "./components/Navbar/NavBar";
import Search from "./components/Search/Search";
import AddCourse from "./components/AddCourse/AddCourse";
import Profile from "./components/Profile/Profile";
import CoursePage from "./components/Courses/CoursePage";

const client = new ApolloClient({
  uri: "http://localhost:4444/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log("Network Error", networkError);
    }
  }
});

const Root = ({ refetch, session }) => (
  <Fragment>
    <NavBar session={session} />
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signin" render={() => <Signin refetch={refetch} />} />
      <Route path="/signup" render={() => <Signup refetch={refetch} />} />
      <Route path="/search" render={() => <Search />} />
      <Route
        path="/addcourse"
        render={() => <AddCourse session={session} refetch={refetch} />}
      />
      <Route path="/profile" render={() => <Profile session={session} />} />
      <Route path="/course/:_id" render={() => <CoursePage />} />
      <Redirect to="/" />
    </Switch>
  </Fragment>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <RootWithSession />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
