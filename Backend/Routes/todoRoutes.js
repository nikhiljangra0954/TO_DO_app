// here we will connect the controller to the toutes
// const express
const express = require('express');
const todoRouter = express.Router();
const {
  gettodos,
  newtodo,
  updateTodoData,
  deleteTodoData,
  searchtododata,
} = require("../Controller/todocontroller");

// Endpoint to get all todos
todoRouter.get("/gettodo", gettodos);
// Endpoint to get search todos
todoRouter.get("/searchtodo", searchtododata);

// Endpoint to create a new todo
todoRouter.post("/newtodo", newtodo);

// Endpoint to delete a todo
todoRouter.delete("/deletetodo/:id", deleteTodoData);

// Endpoint to update a todo
todoRouter.patch("/updatetodo/:id", updateTodoData);

module.exports = { todoRouter };