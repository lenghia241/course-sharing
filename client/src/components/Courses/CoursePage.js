import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_COURSE } from "../../queries";
import LikeCourse from "./LikeCourse";

function CoursePage({ match }) {
  const { _id } = match.params;
  return (
    <Query query={GET_COURSE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;
        const {
          name,
          category,
          description,
          instructions,
          likes,
          username,
          imageUrl
        } = data.getCourse;
        return (
          <div className="container">
            <div className="card">
              <img className="card-img-top" src={imageUrl} alt="Course" />
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">Category: {category}</p>
                <p className="card-text">Description: {description}</p>
                <p className="card-text">Instructor: {instructions}</p>
                <p className="card-text">Likes: {likes}</p>
                <p className="card-text">Shared by: {username}</p>
                <LikeCourse _id={_id} />
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
}

export default withRouter(CoursePage);
