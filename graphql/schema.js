exports.typeDefs = `

type Course {
    _id: ID
    name: String!
    category: String!
    imageUrl: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
}

type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String!
    joinDate: String
    favourites: [Course]
}

type Token {
    token: String!
}

type Query {
    getAllCourses: [Course],
    getCurrentUser: User,
    getCourse(_id: ID!): Course,
    searchCourses(searchTerm: String) : [Course],
    getUserCourses(username: String!) : [Course]
}

type Mutation {
    addCourse(
        name: String!, 
        description: String!,
        instructions: String!
        category: String!
        imageUrl: String!
        username: String
        ): Course,
    signupUser(
        username: String!, 
        email: String!, 
        password: String!
        ): Token,
    signinUser(
        username: String!,
        password: String!
        ): Token,
    deleteUserCourse(
        _id: ID!
        ): Course,
    likeCourse(
       _id: ID!, 
       username: String!
        ): Course,
    unlikeCourse(
       _id: ID!, 
       username: String!
        ): Course,
    },
   
`;
