import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import { SEARCH_COURSES } from "../../queries";

export class Search extends Component {
  state = {
    searchResults: []
  };

  // onInputChange = e => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // };

  handleChange = ({ searchCourses }) => {
    this.setState({
      searchResults: searchCourses
    });
  };

  render() {
    const { searchResults } = this.state;
    return (
      <ApolloConsumer>
        {client => {
          return (
            <div className="container">
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type the name of the course you want to see"
                  onChange={async e => {
                    e.persist();
                    const { data } = await client.query({
                      query: SEARCH_COURSES,
                      variables: { searchTerm: e.target.value }
                    });
                    this.handleChange(data);
                  }}
                />
                <div className="input-group-append">
                  <span className="input-group-text">SEARCH</span>
                </div>
              </div>
              <ul className="list-unstyled">
                {searchResults.map(item => (
                  <li className="media mb-5 border-bottom" key={item._id}>
                    <img
                      className="mr-3"
                      src={item.imageUrl}
                      style={{ width: "12rem" }}
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
                        <span className="badge badge-primary">
                          {item.category}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default Search;
