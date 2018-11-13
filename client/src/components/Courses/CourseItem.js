import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

function CourseItem({ name, imageUrl, category, _id }) {
  return (
    <div className="card" style={{ width: "30%", marginBottom: "3rem" }}>
      <img className="card-img-top" src={imageUrl} alt="Course" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <span
          className={classNames(
            "badge mb-3",
            { "badge-primary": category === "Front-End" },
            { "badge-secondary": category === "Back-End" },
            { "badge-info": category === "Full-Stack" }
          )}
        >
          {category}
        </span>
        <br />
        <Link to={`/course/${_id}`} className="btn btn-primary">
          More detail
        </Link>
      </div>
    </div>
  );
}

export default CourseItem;
