import { gql } from "apollo-boost";

// Course Query
export const GET_ALL_COURSES = gql`
  query {
    getAllCourses {
      _id
      name
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
      _id
      name
      category
      description
      instructions
      createdDate
      likes
      username
    }
  }
`;

export const SEARCH_COURSES = gql`
  query($searchTerm: String) {
    searchCourses(searchTerm: $searchTerm) {
      _id
      name
      likes
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
  ) {
    addCourse(
      name: $name
      description: $description
      instructions: $instructions
      category: $category
      username: $username
    ) {
      _id
      name
      category
      description
      instructions
      createdDate
      likes
    }
  }
`;
// User queries
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
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
