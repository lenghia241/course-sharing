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
          <button
            className="nav-link btn-outline-secondary btn pull-right"
            onClick={() => handleSignout(client, history)}
          >
            Log out
          </button>
        );
      }}
    </ApolloConsumer>
  );
}

export default withRouter(Signout);
