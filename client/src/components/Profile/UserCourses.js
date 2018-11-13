import React from "react";
import { Query, Mutation } from "react-apollo";
import {
  GET_USER_COURSES,
  DELETE_USER_COURSE,
  GET_ALL_COURSES,
  GET_CURRENT_USER
} from "../../queries";
import { Link } from "react-router-dom";
import classNames from "classnames";

const handleDelete = deleteUserCourse => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this course?"
  );
  if (confirmDelete) {
    deleteUserCourse();
  }
};

function UserCourses({ getCurrentUser: { username } }) {
  return (
    <Query query={GET_USER_COURSES} variables={{ username }}>
      {({ data, loading, error }) => {
        if (loading) return <h1>Loading</h1>;
        if (error) return <p>Error</p>;
        return (
          <ul className="list-unstyled">
            {!data.getUserCourses.length && (
              <p>You haven't share any course yet.</p>
            )}
            {data.getUserCourses.map(item => {
              return (
                <li key={item._id} className="media mb-5 border-bottom">
                  <img
                    className="mr-3"
                    src={item.imageUrl}
                    style={{ width: "15rem" }}
                    alt="Search Course"
                  />
                  <div className="media-body">
                    <Link to={`/course/${item._id}`}>
                      <h5 className="mt-0 mb-1">{item.name}</h5>
                    </Link>
                    <p>
                      <i className="material-icons">thumb_up</i> &nbsp;{" "}
                      {item.likes}
                    </p>
                    <p>
                      <span
                        className={classNames(
                          "badge",
                          { "badge-primary": item.category === "Front-End" },
                          { "badge-secondary": item.category === "Back-End" },
                          { "badge-info": item.category === "Full-Stack" }
                        )}
                      >
                        {item.category}
                      </span>
                    </p>
                  </div>
                  <Mutation
                    mutation={DELETE_USER_COURSE}
                    variables={{ id: item._id }}
                    update={(cache, { data: { deleteUserCourse } }) => {
                      const { getUserCourses } = cache.readQuery({
                        query: GET_USER_COURSES,
                        variables: { username }
                      });

                      cache.writeQuery({
                        query: GET_USER_COURSES,
                        variables: { username },
                        data: {
                          getUserCourses: getUserCourses.filter(
                            course => course._id !== deleteUserCourse._id
                          )
                        }
                      });
                    }}
                    refetchQueries={() => [
                      {
                        query: GET_ALL_COURSES
                      },
                      {
                        query: GET_CURRENT_USER
                      }
                    ]}
                  >
                    {(deleteUserCourse, atr = {}) => {
                      return (
                        <span className="btn btn-danger">
                          <i
                            className="material-icons"
                            onClick={() => handleDelete(deleteUserCourse)}
                          >
                            delete
                          </i>
                          {atr.loading ? <span>Deleting...</span> : null}
                        </span>
                      );
                    }}
                  </Mutation>
                </li>
              );
            })}
          </ul>
        );
      }}
    </Query>
  );
}

export default UserCourses;
