import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Todo from "./model/todoModel.js";
import User from "./model/userModel.js";
import bcrypt from "bcrypt";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  const existUser = await User.findOne({username: req.body.Username});
  if(existUser){
    res.status(409).send({message:"USERNAME ALREADY EXIST !"})
  }
  else{
  const createuser = await new User({
    username: req.body.Username,
    password: bcrypt.hashSync(req.body.Password, 10),
  });
  try {
    const User = await createuser.save();
    res.send({
      _id: User._id,
      username: User.username,
    });
  } catch (error) {
    console.log(error);
    
  } }
});

app.post("/signin", async (req, res) => {
  const user = await User.findOne({ username: req.body.Username });
  if (user) {
    if (bcrypt.compareSync(req.body.Password, user.password)) {
      res.send({
        _id: user._id,
        username: user.username,   
      });
      // return;
      
    }else{res.status(401).send({ message: "INVALID USER OR PASSWORD" }); }
  } else {
    res.status(401).send({ message: "INVALID USER OR PASSWORD" }); 
  }
});

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
  const Data = await Todo.findById(id);
  res.send(Data);
  // console.log(Data);
});
app.post("/unChecked:id", async (req, res) => {
  const id = req.params.id;
  await Todo.findByIdAndUpdate(id, { $set: { checked: false } });
  const Data = await Todo.findById(id);
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
