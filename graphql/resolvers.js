const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllCourses: async (root, args, { Course }) => {
      const allCourses = await Course.find().sort({ createdDate: "desc" });
      return allCourses;
    },
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username
      }).populate({
        path: "favourites",
        model: "Course"
      });
      return user;
    },
    getCourse: async (root, { _id }, { Course }) => {
      const course = await Course.findOne({ _id });
      return course;
    },
    getUserCourses: async (root, { username }, { Course }) => {
      const course = await Course.find({ username: username }).sort({
        createdDate: "desc"
      });
      return course;
    },
    searchCourses: async (root, { searchTerm }, { Course }) => {
      if (searchTerm) {
        const searchCourses = await Course.find(
          {
            $text: { $search: searchTerm }
          },
          {
            score: { $meta: "textScore" }
          }
        ).sort({
          score: { $meta: "textScore" }
        });
        return searchCourses;
      } else {
        const allCourses = await Course.find().sort({
          likes: "desc",
          createdDate: "desc"
        });
        return allCourses;
      }
    }
  },

  Mutation: {
    addCourse: async (
      roots,
      { name, description, category, instructions, username },
      { Course }
    ) => {
      const newCourse = await new Course({
        name,
        description,
        category,
        instructions,
        username
      }).save();
      return newCourse;
    },
    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }

      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    },
    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }
      return { token: createToken(user, process.env.SECRET, "1hr") };
    },
    deleteUserCourse: async (root, { _id }, { Course }) => {
      const course = Course.findOneAndRemove({ _id });
      return course;
    },
    likeCourse: async (root, { _id, username }, { Course, User }) => {
      const course = await Course.findOneAndUpdate(
        { _id },
        { $inc: { likes: 1 } }
      );
      const user = await User.findOneAndUpdate(
        { username },
        {
          $addToSet: {
            favourites: _id
          }
        }
      );
      return course;
    }
  }
};
