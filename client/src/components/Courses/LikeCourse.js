import React, { Component } from "react";
import withSession from "../withSession";
import { Mutation } from "react-apollo";
import { LIKE_COURSE, GET_COURSE } from "../../queries";

export class LikeCourse extends Component {
  state = {
    liked: false,
    username: ""
  };

  componentDidMount = () => {
    if (this.props.session.getCurrentUser) {
      const { username, favourites } = this.props.session.getCurrentUser;
      console.log(this.props.session.getCurrentUser);
      const { _id } = this.props;
      const prevLiked =
        favourites.findIndex(favourites => favourites._id === _id) > -1;
      this.setState({
        liked: prevLiked,
        username
      });
    }
  };

  handleClick = likeCourse => {
    this.setState(
      prevState => ({ liked: !prevState.liked }),
      () => this.handleLike(likeCourse)
    );
  };

  handleLike = likeCourse => {
    if (this.state.liked) {
      likeCourse().then(async data => {
        console.log(data);
        await this.props.refetch();
      });
    } else {
      //Unlike
      console.log("unlike");
    }
  };

  updateLike = (cache, { data: { likeCourse } }) => {
    const { _id } = this.props;
    const { getCourse } = cache.readQuery({
      query: GET_COURSE,
      variables: { _id }
    });

    cache.writeQuery({
      query: GET_COURSE,
      variables: { _id },
      data: {
        getCourse: { ...getCourse, likes: likeCourse.likes + 1 }
      }
    });
  };

  render() {
    const { username, liked } = this.state;
    const { _id } = this.props;
    console.log(username);
    return (
      <div>
        <Mutation
          mutation={LIKE_COURSE}
          variables={{ _id, username }}
          update={this.updateLike}
        >
          {likeCourse => {
            return (
              username && (
                <button onClick={() => this.handleClick(likeCourse)}>
                  {liked ? "Unlike" : "Like"}
                </button>
              )
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withSession(LikeCourse);
