import React from "react";
import { Link } from "react-router-dom";

function CourseItem({ name, category, _id }) {
  return (
    <div className="container border border-primary mb-3">
      <Link to={`/course/${_id}`}>
        <h4>{name}</h4>
      </Link>
      <p>{category}</p>
    </div>
  );
}

export default CourseItem;
