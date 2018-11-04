import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_COURSE } from "../../queries";

function CoursePage({ match }) {
  const { _id } = match.params;
  return (
    <Query query={GET_COURSE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;
        return (
          <div className="container">
            <h2>{data.getCourse.name}</h2>
            <p>Category: {data.getCourse.category}</p>
            <p>Description: {data.getCourse.description}</p>
            <p>Instructor: {data.getCourse.instructions}</p>
            <p>Likes: {data.getCourse.likes}</p>
            <p>Shared by: {data.getCourse.username}</p>
          </div>
        );
      }}
    </Query>
  );
}

export default withRouter(CoursePage);
