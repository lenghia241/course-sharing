import React, { Component } from "react";
import withSession from "../withSession";
import { Mutation } from "react-apollo";
import { LIKE_COURSE, GET_COURSE, UNLIKE_COURSE } from "../../queries";

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

  handleClick = (likeCourse, unlikeCourse) => {
    this.setState(
      prevState => ({ liked: !prevState.liked }),
      () => this.handleLike(likeCourse, unlikeCourse)
    );
  };

  handleLike = (likeCourse, unlikeCourse) => {
    if (this.state.liked) {
      likeCourse().then(async () => {
        await this.props.refetch();
      });
    } else {
      unlikeCourse().then(async () => {
        await this.props.refetch();
      });
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

  updateUnlike = (cache, { data: { unlikeCourse } }) => {
    const { _id } = this.props;
    const { getCourse } = cache.readQuery({
      query: GET_COURSE,
      variables: { _id }
    });

    cache.writeQuery({
      query: GET_COURSE,
      variables: { _id },
      data: {
        getCourse: { ...getCourse, likes: unlikeCourse.likes - 1 }
      }
    });
  };

  render() {
    const { username, liked } = this.state;
    const { _id } = this.props;
    return (
      <div>
        <Mutation
          mutation={UNLIKE_COURSE}
          variables={{ _id, username }}
          update={this.updateUnlike}
        >
          {unlikeCourse => {
            return (
              <Mutation
                mutation={LIKE_COURSE}
                variables={{ _id, username }}
                update={this.updateLike}
              >
                {likeCourse => {
                  return (
                    username && (
                      <button
                        onClick={() =>
                          this.handleClick(likeCourse, unlikeCourse)
                        }
                      >
                        {liked ? "Unlike" : "Like"}
                      </button>
                    )
                  );
                }}
              </Mutation>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withSession(LikeCourse);
