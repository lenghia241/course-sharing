import React, { Component } from "react";
import "./App.css";
import CourseItem from "./Courses/CourseItem";
import { ClipLoader } from "react-spinners";

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
            if (loading) {
              return <ClipLoader size={150} margin={"5px"} color={"#36D7B7"} />;
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
