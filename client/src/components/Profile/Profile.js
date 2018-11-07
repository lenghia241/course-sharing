import React from "react";
import { Link } from "react-router-dom";
import UserCourses from "./UserCourses";
import withAuth from '../withAuth'

function Profile({ session: { getCurrentUser } }) {
  const formatDate = date => {
    const newDate = new Date(date).toLocaleDateString("fi-FIN");
    const newTime = new Date(date).toLocaleTimeString("en-US");
    return `${newDate} at ${newTime}`;
  };

  return (
    <div className="container">
      <h3>User profile</h3>
      <p>Email: {getCurrentUser.email}</p>
      <p>Username: {getCurrentUser.username}</p>
      <p>Join Date: {formatDate(getCurrentUser.joinDate)}</p>
      <h3>Saved Course</h3>
      <ul>
        {getCurrentUser.favourites.map(item => (
          <Link to={`/course/${item._id}`} key={item._id}>
            <li>{item.name}</li>
          </Link>
        ))}
        {!getCurrentUser.favourites.length && <p>You have no saved course</p>}
      </ul>
      <h3>User's courses</h3>
      <UserCourses getCurrentUser={getCurrentUser} />
    </div>
  );
}

export default withAuth(session=>session && session.getCurrentUser)(Profile);
