// here we will create the model for our todo app
const mongoose = require("mongoose");

// create the Schema object

const todoSchema = mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
  },
  {
    versionKey: false,
  }
);

// Create the todo model

const todoModel = mongoose.model("todo", todoSchema);

todoModel.collection.createIndex({ title: "text" }, (error) => {
    if (error) {
      console.error("Error creating index:", error);
    } else {
      console.log("Index created successfully");
    }
  });
  

// export the todo model

module.exports = { todoModel };
