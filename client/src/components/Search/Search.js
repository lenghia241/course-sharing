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
              {searchResults.map(item => (
                <div
                  className="container border border-primary mb-3"
                  key={item._id}
                >
                  <Link to={`/course/${item._id}`}>
                    <h4>{item.name}</h4>
                  </Link>
                  <p>
                    <i className="material-icons">thumb_up</i>: &nbsp;{" "}
                    {item.likes}
                  </p>
                </div>
              ))}
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default Search;
