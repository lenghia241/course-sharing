import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries";
import Error from "../Error";

const initialState = {
  username: "",
  password: ""
};

class Signin extends Component {
  state = {
    ...initialState
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  clearState = () => {
    this.setState({
      ...initialState
    });
  };

  onFormSubmit = (e, signinUser) => {
    e.preventDefault();
    signinUser().then(async ({ data }) => {
      localStorage.setItem("token", data.signinUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push("/");
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="container">
        <h2>Sign in</h2>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, { data, loading, error }) => {
            return (
              <form onSubmit={e => this.onFormSubmit(e, signinUser)}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    name="username"
                    value={username}
                    onChange={this.onInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.onInputChange}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || this.validateForm()}
                  className="btn btn-outline-primary"
                >
                  Sign in
                </button>
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Signin);
