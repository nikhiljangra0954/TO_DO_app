// here we create the Routing controller for the todo application
const redis = require("redis");
// get the todo model first
const { todoModel } = require("../Model/todoModel");

// first create the todo with posting the data
// import { createClient } from 'redis';

const client = redis.createClient({
  password: process.env.password,
  socket: {
    host: "redis-12621.c301.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 12621,
  },
});
client.connect();

const newtodo = async (req, res) => {
  const data = req.body;
  try {
    if (data.title == "" || data.title == null || data.title == undefined) {
      res.status(400).send({
        message: "Add the title",
      });
    }
    // try {
    //   await client.set("todos", JSON.stringify(data.title));
    //   console.log("saved in the redis");
    // } catch (error) {
    //   res.send({ message: error.message });
    // }
    const newtododata = new todoModel(data);
    await newtododata.save();
    // console.log(newtododata)
    res.status(200).send(newtododata);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

// get all the todos data from data base

const gettodos = async (req, res) => {
  try {
    const data = await todoModel.find({})
    // const data = await client.SMEMBERS("todos");
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

// now lets delete the data from the database

const deleteTodoData = async (req, res) => {
  // we need the id of that todo to delete that todo
  let id = req.params.id;
  try {
    if (id == null || id == "" || id == undefined) {
      res.send({ msg: "Todo id is missing" });
    } else {
      await todoModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ message: "item deleted successfully" });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

// lets update the todo with same with the id

const updateTodoData = async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  try {
    if (id == null || id == "" || id == undefined) {
      res.send({ message: "Todo id is missing" });
    } else {
      await todoModel.findByIdAndUpdate({ _id: id }, data);
      res.status(204).send({ message: "item updated successfully" });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

// lets search the the todo witht the text we pasisng in the input field

const searchtododata = async (req, res) => {
  // get the search test from query
  const query = req.query.q; // Get the search query from the request query parameters
  try {
    const data = await todoModel.find({
      $text: { $search: query, $caseSensitive: false },
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  gettodos,
  searchtododata,
  deleteTodoData,
  updateTodoData,
  newtodo,
};
