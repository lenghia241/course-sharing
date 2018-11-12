import React from "react";
import { Link } from "react-router-dom";

function CourseItem({ name, imageUrl, category, _id }) {
  return (
    // <div className="container border border-primary mb-3" style={{background: `url(${imageUrl}) center center / cover no-repeat` }}>
    //   <Link to={`/course/${_id}`}>
    //     <h4>{name}</h4>
    //   </Link>
    //   <p>{category}</p>
    // </div>
    <div className="card" style={{ width: "30%", marginBottom: "3rem" }}>
      <img className="card-img-top" src={imageUrl} alt="Course" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{category}</p>
        <Link to={`/course/${_id}`} className="btn btn-primary">
          More detail
        </Link>
      </div>
    </div>
  );
}

export default CourseItem;
