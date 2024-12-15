// Models
const userModel = require("../models/user.model");
const testModel = require("../models/test.model");

// All
exports.allUsersService = async () => {
  try {
    const users = await userModel.find();
    return users;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// One
exports.oneUserService = async (id) => {
  console.log("🚀 ~ exports.oneUserService= ~ id:", id);
  try {
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return { error: new Error("Error: User not found") };
    }
    return user;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// All students
exports.allStudentsService = async () => {
  try {
    const users = await userModel.find({ role: "user" });
    return users;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Add
exports.addUserService = async (details) => {
  try {
    const findUser = await userModel.findOne({ name: details.name });
    if (findUser) {
      return { error: new Error("Error: User already exists") };
    }

    // create user
    const user = new userModel(details);
    await user.save();
    return user;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Edit
exports.editUserService = async (details, id) => {
  try {
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return { error: new Error("Error: User not found") };
    }

    user.firstName = details?.firstName;
    user.lastName = details?.lastName;
    user.email = details?.email;
    user.phoneNumber = details?.phoneNumber;
    user.username = details?.username;
    await user.save();
    return user;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Delete
exports.deleteUserService = async (id) => {
  try {
    const user = await userModel.findByIdAndRemove({ _id: id });
    if (!user) {
      return { error: new Error("Error: User not found") };
    }
    return user;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// one user tests
exports.oneUserTestsService = async (id) => {
  try {
    const user = await userModel.findById({ _id: id });
    const tests = await testModel.find({ userId: id });
    if (!user) {
      return { error: new Error("Error: User not found") };
    }
    return tests;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Leaderboard
exports.getLeaderboardService = async () => {
  try {
    const users = await userModel.find();

    // Filter out users with 0 points and map leaderboard data
    const leaderboard = users
      .filter((user) => user.userPoints > 0) // Only include users with points > 0
      .map((user) => ({
        userId: user.id,
        name: user.username || `${user.firstName} ${user.lastName}`,
        phoneNumber: user.phoneNumber,
        userPoints: user.userPoints,
      }))
      .sort((a, b) => b.userPoints - a.userPoints) // Sort by userPoints in descending order
      .slice(0, 10); // Return only the first 10 users

    return leaderboard.length > 0 ? leaderboard : []; // Return empty array if no leaderboard data
  } catch (error) {
    console.log("🚀 ~ exports.getLeaderboardService= ~ error:", error);
    return { error: new Error(error) };
  }
};

// Clear Leaderboard
exports.clearLeaderboardService = async () => {
  try {
    const users = await userModel.find();

    // Loop through all users and reset points
    await Promise.all(
      users.map(async (user) => {
        user.userPoints = 0;
        await user.save();
      })
    );

    return { message: "Leaderboard cleared successfully" };
  } catch (error) {
    return { error: new Error(error) };
  }
};

exports.getUserLeaderboardPositionService = async (userId) => {
  try {
    // Fetch all users
    const users = await userModel.find(
      {},
      { name: 1, phoneNumber: 1, userPoints: 1 }
    );

    // Filter out users with zero points
    const filteredUsers = users.filter((user) => user.userPoints > 0);

    // Sort users by userPoints in descending order
    const sortedUsers = filteredUsers.sort(
      (a, b) => b.userPoints - a.userPoints
    );

    // Find the position of the user
    const position = sortedUsers.findIndex(
      (user) => user._id.toString() === userId
    );

    // If user is not found in the leaderboard
    // if (position === -1) {
    //   return { error: "User not found on the leaderboard" };
    // }

    // Return the position (convert to 1-based index)
    return { position: position + 1, totalUsers: sortedUsers.length };
  } catch (error) {
    return { error: error.message };
  }
};
