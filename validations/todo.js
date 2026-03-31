import {z} from "zod";

export const createTodoSchema = z.object({
    title: z.string().min(1,"title is required").max(100,"title must be less than 100 characters"),
    description: z.string().min(1,"description is required").max(500,"description must be less than 500 characters"),
    priority: z.enum(["low","medium","high"]).default("medium")
});