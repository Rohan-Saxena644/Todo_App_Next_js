"use client";
import React from 'react'
import { useState } from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { createTodoSchema } from '@/validations/todo';

const TodoForm = () => {

    const [isOpen,setIsOpen] = useState(false);
    const createTodoMutation = useCreateTodo();

    const form = useForm({
        resolver: zodResolver(createTodoSchema),
        defaultValues:{
            title:"",
            description:"",
            priority: "medium"
        }
    })

    const onSubmit = async (data)=>{
        try{
            const result = await createTodoMutation.mutateAsync(data);

            if(result.success){
                toast.success("Todo created successfully");
                form.reset();
            }
        }catch(error){
            toast.error("Failed to create todo");
        }
    }

    if(!isOpen){
        return(
            <Button onClick={()=>setIsOpen(true)}>
                Add New Todo
            </Button>
        )
    }

  return (
    <div>TodoForm</div>
  )
}

export default TodoForm