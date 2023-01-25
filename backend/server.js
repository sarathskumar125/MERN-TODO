import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Todo from "./model/todoModel.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.post("/addTodo", async (req, res) => {
  const data = req.body.Data;
  const createTodo = new Todo({
    Data: data,
  });
  try {
    const todo = await createTodo.save();
    res.send(todo);
  } catch (error) {
    console.log(error);
  }
});

app.get("/readTodo", async (req, res) => {
  const data = await Todo.find({});
  try {
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

app.post("/deleteTodo:id", async (req, res) => {
  const id = req.params.id;
  await Todo.findByIdAndDelete(id);
  const newTodo = await Todo.find({});
  res.send(newTodo);
});

app.post("/checked:id", async (req, res) => {
  const id = req.params.id;
  await Todo.findByIdAndUpdate(id, { $set: { checked: true } });
  const Data = await Todo.findById(id)
  res.send(Data);
  // console.log(Data);
});
app.post("/unChecked:id", async (req, res) => {
  const id = req.params.id;
   await Todo.findByIdAndUpdate(id, { $set: { checked: false } });
   const Data = await Todo.findById(id)
   res.send(Data);
});

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
