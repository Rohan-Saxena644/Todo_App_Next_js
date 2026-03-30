import mongoose from "mongoose";
import { type } from "os";

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,"title is required"],
        trim: true,
        maxlength:[100,"title must be less than 100 characters"]
    },
    description:{
        type: String,
        required: [true,"description is required"],
        trim: true,
        maxlength:[500,"description must be less than 500 characters"]
    },
    completed:{
        type: Boolean,
        default: false
    },
    priority:{
        type: String,
        enum: ["low","medium","high"],
        default: "medium"
    },
},{
    timestamps: true    
});

const Todo = mongoose.models.Todo || mongoose.model("Todo",todoSchema);

export default Todo;