import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";
import Error from "../Error";

const initialState = {
  username: "",
  email: "",
  password: "",
  rePassword: ""
};

class Signup extends Component {
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

  onFormSubmit = (e, signupUser) => {
    e.preventDefault();
    signupUser().then(async ({ data }) => {
      localStorage.setItem("token", data.signupUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push("/");
    });
  };

  validateForm = () => {
    const { username, password, email, rePassword } = this.state;
    const isInvalid =
      !username || !email || !password || password !== rePassword;
    return isInvalid;
  };

  render() {
    const { username, password, email, rePassword } = this.state;
    return (
      <div className="container h-100 align-middle">
        <h2>Sign up</h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(signupUser, { data, loading, error }) => {
            return (
              <form onSubmit={e => this.onFormSubmit(e, signupUser)}>
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
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={this.onInputChange}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.onInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rePassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="rePassword"
                    placeholder="Confirm Password"
                    name="rePassword"
                    value={rePassword}
                    onChange={this.onInputChange}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || this.validateForm()}
                  className="btn btn-outline-primary"
                >
                  Submit
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

export default withRouter(Signup);
