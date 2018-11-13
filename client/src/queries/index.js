import { gql } from "apollo-boost";
import { courseFragment } from "./fragments";

// Course Query
export const GET_ALL_COURSES = gql`
  query {
    getAllCourses {
      _id
      name
      imageUrl
      description
      instructions
      category
      likes
      createdDate
    }
  }
`;

export const GET_COURSE = gql`
  query($_id: ID!) {
    getCourse(_id: $_id) {
      ...CompleteCourse
    }
  }
  ${courseFragment.course}
`;

export const SEARCH_COURSES = gql`
  query($searchTerm: String) {
    searchCourses(searchTerm: $searchTerm) {
      _id
      name
      likes
      category
      imageUrl
    }
  }
`;

//Course mutation

export const ADD_COURSE = gql`
  mutation(
    $name: String!
    $description: String!
    $instructions: String!
    $category: String!
    $username: String
    $imageUrl: String!
  ) {
    addCourse(
      name: $name
      description: $description
      instructions: $instructions
      category: $category
      username: $username
      imageUrl: $imageUrl
    ) {
      ...CompleteCourse
    }
  }
  ${courseFragment.course}
`;

export const DELETE_USER_COURSE = gql`
  mutation($id: ID!) {
    deleteUserCourse(_id: $id) {
      _id
    }
  }
`;

export const LIKE_COURSE = gql`
  mutation($_id: ID!, $username: String!) {
    likeCourse(_id: $_id, username: $username) {
      ...LikeCourse
    }
  }
  ${courseFragment.like}
`;

export const UNLIKE_COURSE = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeCourse(_id: $_id, username: $username) {
      ...LikeCourse
    }
  }
  ${courseFragment.like}
`;

// User queries
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
      favourites {
        _id
        name
        category
        imageUrl
      }
    }
  }
`;

export const GET_USER_COURSES = gql`
  query($username: String!) {
    getUserCourses(username: $username) {
      _id
      name
      likes
      category
      imageUrl
    }
  }
`;

// User mutation

export const SIGNUP_USER = gql`
  mutation($username: String!, $password: String!, $email: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;
