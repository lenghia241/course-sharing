import React, { Component } from "react";

export class Carousel extends Component {
  render() {
    return (
      <div
        id="carouselExampleIndicators"
        className="carousel slide mb-5"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          />
          <li data-target="#carouselExampleIndicators" data-slide-to="1" />
          <li data-target="#carouselExampleIndicators" data-slide-to="2" />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://assets.cloudacademy.com/bakery/media/uploads/corn/59f34fb4ea92e63e2f70fb65.jpg"
              alt="First slide"
              style={{ filter: "brightness(90%)" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h3>Obtain your skills to become a web developer</h3>
              <p>Learn about Front-End</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://assets.cloudacademy.com/bakery/media/uploads/entities/AWS_Code-Services_o7kiYZ3_BLuwH5m.jpg"
              alt="Second slide"
              style={{ filter: "brightness(90%)" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h3>Are you a Back-End people</h3>
              <p>Learn about Front-End</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://assets.cloudacademy.com/bakery/media/uploads/upload/631397f7-332.jpg"
              alt="Third slide"
              style={{ filter: "brightness(90%)" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h3>Notthing stop you to become both!</h3>
              <p>Learn to become Full-Stack developer</p>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

export default Carousel;
