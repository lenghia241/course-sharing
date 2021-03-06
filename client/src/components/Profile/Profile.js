import React from "react";
import { Link } from "react-router-dom";
import UserCourses from "./UserCourses";
import withAuth from "../withAuth";
import classNames from "classnames";

function Profile({ session: { getCurrentUser } }) {
  const formatDate = date => {
    const newDate = new Date(date).toLocaleDateString("fi-FIN");
    const newTime = new Date(date).toLocaleTimeString("en-US");
    return `${newDate} at ${newTime}`;
  };

  return (
    <div className="container">
      <h5 className="text-center">Hi, {getCurrentUser.username}</h5>
      <h3>User profile</h3>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Info</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Email</td>
            <td>{getCurrentUser.email}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>{getCurrentUser.username}</td>
          </tr>
          <tr>
            <td>Register Date</td>
            <td>{formatDate(getCurrentUser.joinDate)}</td>
          </tr>
        </tbody>
      </table>

      <h3>Saved Course</h3>
      <ul className="list-unstyled">
        {getCurrentUser.favourites.map(item => {
          return (
            <Link to={`/course/${item._id}`} key={item._id}>
              <li className="media mb-5 border-bottom">
                <img
                  className="mr-3"
                  src={item.imageUrl}
                  style={{ width: "10rem" }}
                  alt="Saved Course"
                />
                <div className="media-body">
                  <h5 className="mt-0 mb-1">{item.name}</h5>
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
              </li>
            </Link>
          );
        })}
        {!getCurrentUser.favourites.length && <p>You have no saved course</p>}
      </ul>
      <h3>User's courses</h3>
      <UserCourses getCurrentUser={getCurrentUser} />
    </div>
  );
}

export default withAuth(session => session && session.getCurrentUser)(Profile);
