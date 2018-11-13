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
                <h2 className="text-center">{name}</h2>
                <h4>Category</h4>
                <span className="badge badge-primary">{category}</span>
                <h4>Description</h4>
                <span className="card-text">{description}</span>
                <h4>Instructor</h4>
                <p className="card-text">{instructions}</p>
                <h4>Shared by</h4>
                <p className="card-text">Shared by: {username}</p>
                <br />
                <p className="card-text">Likes: {likes}</p>
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
