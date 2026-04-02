"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import Todo from "@/models/todo";
import { createTodoSchema } from "@/validations/todo";
// import { success } from "zod";
// import { toast } from "@/components/ui/use-toast";

export async function createTodo(data){

    try{
        // const validatedData = createTodoSchema.parse(Object.fromEntries(formData));
        const validatedData = createTodoSchema.parse(data);
        await connectDB();
        const todo = await Todo.create(validatedData);
        revalidatePath("/");
        return {
            success:true,
            data:JSON.parse(JSON.stringify(todo))
        }
    }catch(error){
        console.error("Error creating todo:", error);
        return {
            success:false,
            error:error ? error.message : "Failed to create the todo",
        }
    }   
}

export async function getTodos(){
    try{
        await connectDB();
        const todos = await Todo.find({}).sort({createdAt:-1}).lean();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(todos))
        }
    }catch(error){
        console.error("Error fetching todos:", error);
        return {
            success: false,
            error: error ? error.message : "Failed to fetch todos"
        }
    }
}