// Models
const levelModel = require("../models/level.model");

// All
exports.allLevelsService = async () => {
  try {
    const levels = await levelModel.find();
    return levels;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// One
exports.oneLevelService = async (id) => {
  try {
    const level = await levelModel.findById({ _id: id });
    if (!level) {
      return { error: new Error("Error: Level not found") };
    }
    return level;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Add
exports.addLevelService = async (details) => {
  try {
    const findLevel = await levelModel.findOne({ name: details.name });
    if (findLevel) {
      return { error: new Error("Error: Level already exists") };
    }

    // create level
    const level = new levelModel(details);
    await level.save();
    return level;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Edit
exports.editLevelService = async (details, id) => {
  try {
    const level = await levelModel.findOne({ _id: id });
    if (!level) {
      return { error: new Error("Error: Level not found") };
    }

    level.name = details.name;
    await level.save();
    return level;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Delete
exports.deleteLevelService = async (id) => {
  try {
    const level = await levelModel.findByIdAndRemove({ _id: id });
    if (!level) {
      return { error: new Error("Error: Level not found") };
    }
    return level;
  } catch (error) {
    return { error: new Error(error) };
  }
};
