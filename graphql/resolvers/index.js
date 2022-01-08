const postResolvers = require("./posts");
const userResolvers = require("./users");
module.exports = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
  },
  Post: {
    likeCount: (parent) => {
      console.log(parent);
      return parent.likes.length;
    },
    commentCount: (parent) => {
      return parent.comments.length;
    },
  },
};
