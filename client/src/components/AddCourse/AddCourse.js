import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import { ADD_COURSE, GET_ALL_COURSES, GET_USER_COURSES } from "../../queries";
import Error from "../Error";
import withAuth from "../withAuth";
import CKEditor from "react-ckeditor-component";

const initialState = {
  name: "",
  category: "Front-End",
  description: "",
  instructions: "",
  username: "",
  imageUrl: ""
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
    const { name, category, description, instructions, imageUrl } = this.state;
    const isValid =
      !name || !category || !description || !instructions || !imageUrl;
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

  handleDescriptionChange = e => {
    const newContent = e.editor.getData();
    this.setState({ description: newContent });
  };

  render() {
    const {
      name,
      category,
      description,
      instructions,
      username,
      imageUrl
    } = this.state;
    return (
      <Mutation
        mutation={ADD_COURSE}
        variables={{
          name,
          category,
          description,
          instructions,
          username,
          imageUrl
        }}
        update={this.updateCache}
        refetchQueries={() => [
          {
            query: GET_USER_COURSES,
            variables: { username }
          }
        ]}
      >
        {(addCourse, { data, loading, error }) => {
          return (
            <div className="container">
              <h2 className="text-center">Add Course</h2>
              <form onSubmit={e => this.onFormSubmit(e, addCourse)}>
                <div className="form-group">
                  <label htmlFor="coursename">Course name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="coursename"
                    placeholder="Enter course name"
                    name="name"
                    value={name}
                    onChange={this.onInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="imageUrl">Course Image</label>
                  <input
                    type="text"
                    className="form-control"
                    id="imageUrl"
                    placeholder="Input course image link"
                    name="imageUrl"
                    value={imageUrl}
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
                    <option value="Front-End">Front-End</option>
                    <option value="Back-End">Back-End</option>
                    <option value="Full-Stack">Full-Stack</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <CKEditor
                    name="description"
                    content={description}
                    events={{ change: this.handleDescriptionChange }}
                  />
                  {/*<textarea
                    className="form-control"
                    rows="5"
                    id="description"
                    placeholder="Enter description"
                    name="description"
                    value={description}
                    onChange={this.onInputChange}
                  />*/}
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
                  Submit
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

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddCourse)
);
