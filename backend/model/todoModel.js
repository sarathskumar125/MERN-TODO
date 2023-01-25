import mongoose from "mongoose";
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  Data: { 
    type: String,
  },
  checked:{
    type:Boolean,
    default:false
  }
});

const Todo = mongoose.model("todo", todoSchema);
export default Todo;
