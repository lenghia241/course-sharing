import React, { Component } from "react";
import "./App.css";
import CourseItem from "./Courses/CourseItem";

import { Query } from "react-apollo";
import { GET_ALL_COURSES } from "../queries/index";

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="App">Home</h1>
        <Query query={GET_ALL_COURSES}>
          {({ data, loading, error }) => {
            if (loading) {
              return <div>Loading</div>;
            }
            if (error) {
              return <div>There is an error</div>;
            }
            return (
              <div>
                {data.getAllCourses.map(course => (
                  <CourseItem key={course._id} {...course} />
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
