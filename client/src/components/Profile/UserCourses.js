import React from "react";
import { Query } from "react-apollo";
import { GET_USER_COURSES } from "../../queries";
import { Link } from "react-router-dom";

function UserCourses({ getCurrentUser: { username } }) {
  return (
    <Query query={GET_USER_COURSES} variables={{ username }}>
      {({ data, loading, error }) => {
        if (loading) return <h1>Loading</h1>;
        if (error) return <p>Error</p>;
        return (
          <ul>
            {data.getUserCourses.map(item => (
              <li key={item._id} className="border border-secondary mb-3">
                <Link to={`/course/${item._id}`}>
                  <p>{item.name}</p>
                </Link>
                <p>
                  <i className="material-icons">thumb_up</i>: &nbsp;
                  {item.likes}
                </p>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
}

export default UserCourses;
