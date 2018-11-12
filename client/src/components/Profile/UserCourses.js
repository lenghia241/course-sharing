import React from "react";
import { Query, Mutation } from "react-apollo";
import {
  GET_USER_COURSES,
  DELETE_USER_COURSE,
  GET_ALL_COURSES,
  GET_CURRENT_USER
} from "../../queries";
import { Link } from "react-router-dom";

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
          <ul>
            {!data.getUserCourses.length && (
              <p>You haven't share any course yet.</p>
            )}
            {data.getUserCourses.map(item => (
              <div key={item._id} className="border border-secondary mb-3">
                <Link to={`/course/${item._id}`}>
                  <p>{item.name}</p>
                </Link>
                <p>
                  <i className="material-icons">thumb_up</i>: &nbsp;
                  {item.likes}
                </p>
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
                      <p>
                        <i
                          className="material-icons"
                          onClick={() => handleDelete(deleteUserCourse)}
                        >
                          delete
                        </i>
                        {atr.loading ? <span>Deleting...</span> : null}
                      </p>
                    );
                  }}
                </Mutation>
              </div>
            ))}
          </ul>
        );
      }}
    </Query>
  );
}

export default UserCourses;
