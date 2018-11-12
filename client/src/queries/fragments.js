import { gql } from "apollo-boost";

export const courseFragment = {
  course: gql`
    fragment CompleteCourse on Course {
      _id
      name
      imageUrl
      category
      description
      instructions
      createdDate
      likes
      username
    }
  `,
  like: gql`
    fragment LikeCourse on Course {
      _id
      likes
    }
  `
};
