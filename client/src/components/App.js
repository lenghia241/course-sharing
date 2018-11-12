import React, { Component } from "react";
import "./App.css";
import CourseItem from "./Courses/CourseItem";

import { Query } from "react-apollo";
import { GET_ALL_COURSES } from "../queries/index";
import Carousel from "./Carousel/Carousel";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Carousel />
        <h1 className="lead text-center">Available Course</h1>
        <Query query={GET_ALL_COURSES}>
          {({ data, loading, error }) => {
            console.log(data);
            if (loading) {
              return <div>Loading</div>;
            }
            if (error) {
              return <div>There is an error</div>;
            }
            return (
              <div
                className="d-flex flex-wrap justify-content-between"
                style={{ width: "100%" }}
              >
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
