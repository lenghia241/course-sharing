import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import { ADD_COURSE, GET_ALL_COURSES } from "../../queries";
import Error from "../Error";

const initialState = {
  name: "",
  category: "Front-End",
  description: "",
  instructions: "",
  username: ""
};

export class AddCourse extends Component {
  state = {
    ...initialState
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username
    });
  }

  validateForm = () => {
    const { name, category, description, instructions } = this.state;
    const isValid = !name || !category || !description || !instructions;
    return isValid;
  };

  onFormSubmit = (e, addCourse) => {
    e.preventDefault();
    addCourse().then(({ data }) => {
      this.setState({
        ...initialState
      });
      this.props.history.push("/");
      this.props.refetch();
    });
  };

  updateCache = (cache, { data: { addCourse } }) => {
    const { getAllCourses } = cache.readQuery({ query: GET_ALL_COURSES });
    cache.writeQuery({
      query: GET_ALL_COURSES,
      data: {
        getAllCourses: [addCourse, ...getAllCourses]
      }
    });
  };

  render() {
    const { name, category, description, instructions, username } = this.state;
    return (
      <Mutation
        mutation={ADD_COURSE}
        variables={{ name, category, description, instructions, username }}
        update={this.updateCache}
      >
        {(addCourse, { data, loading, error }) => {
          return (
            <div className="container">
              <h1>Add Course</h1>
              <form onSubmit={e => this.onFormSubmit(e, addCourse)}>
                <div className="form-group">
                  <label htmlFor="username">Course name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter course name"
                    name="name"
                    value={name}
                    onChange={this.onInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">
                    Select category of the course
                  </label>
                  <select
                    className="form-control"
                    id="category"
                    placeholder="Password"
                    name="category"
                    value={category}
                    onChange={this.onInputChange}
                  >
                    <option value="Front-End">Front end</option>
                    <option value="Back-End">Back end</option>
                    <option value="Full-Stack">Full stack</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Enter description"
                    name="description"
                    value={description}
                    onChange={this.onInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="instructions">Instructor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="instructions"
                    placeholder="Enter instructor name"
                    name="instructions"
                    value={instructions}
                    onChange={this.onInputChange}
                  />
                </div>
                <button
                  disabled={loading || this.validateForm()}
                  type="submit"
                  className="btn btn-outline-primary"
                >
                  Sign in
                </button>
                {error && <Error error={error} />}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(AddCourse);
