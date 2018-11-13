import React from "react";
import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";

const handleSignout = (client, history) => {
  localStorage.removeItem("token");
  client.resetStore();
  history.push("/");
};

function Signout({ history }) {
  return (
    <ApolloConsumer>
      {client => {
        return (
          <li className="nav-item">
            <button
              className="nav-link btn btn-raised btn-secondary"
              onClick={() => handleSignout(client, history)}
            >
              Log out
            </button>
          </li>
        );
      }}
    </ApolloConsumer>
  );
}

export default withRouter(Signout);
