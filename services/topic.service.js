// Models
const topicModel = require("../models/topic.model");

// All
exports.allTopicsService = async () => {
  try {
    const topic = await topicModel.find();
    return topic;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// One
exports.oneTopicService = async (id) => {
  try {
    const topic = await topicModel.findById({ _id: id });
    if (!topic) {
      return { error: new Error("Error: Topic not found") };
    }
    return topic;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Add
exports.addTopicService = async (details) => {
  try {
    // create topic
    const topic = new topicModel({ ...details });
    await topic.save();
    return topic;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Edit
exports.editTopicService = async (details, id) => {
  console.log("🚀 ~ exports.editTopicService= ~ id:", id);
  try {
    const topic = await topicModel.findOne({ _id: id });
    if (!topic) {
      return { error: new Error("Error: Topic not found") };
    }

    topic.title = details.title;
    topic.description = details.description;
    topic.image = details.image;
    topic.body = details.body;
    await topic.save();
    return topic;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Delete
exports.deleteTopicService = async (id) => {
  try {
    const topic = await topicModel.findByIdAndRemove({ _id: id });
    if (!topic) {
      return { error: new Error("Error: Topic not found") };
    }
    return topic;
  } catch (error) {
    return { error: new Error(error) };
  }
};
