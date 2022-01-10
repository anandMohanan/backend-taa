const gql = require("graphql-tag");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    photo: String
    bio: String
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
    photo: String
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getUser: User
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: String!): Post!
    likePost(postId: ID!): Post!
    userProfile(photo: String, bio: String): User!
  }
`;
