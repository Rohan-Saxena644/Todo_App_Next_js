"use client";
import React from 'react'
import { useState } from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCreateTodo} from '@/hooks/use-create-todo';

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
                setIsOpen(false);
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
    <div>
        <Card>
            <CardHeader>
                <CardTitle>Create New Todo</CardTitle>
                <CardDescription>Fill the form below to create a new todo item.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <div>
                        <Label htmlFor='title'>Title</Label>
                        <Input id='title' {...form.register("title")} />
                        {form.formState.errors.title && <p className='text-red-500'>{form.formState.errors.title.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor='description'>Description</Label>
                        <Textarea
                            id="description"
                            className="w-full resize-none overflow-hidden"
                            rows={3}
                            {...form.register("description")}
                        />
                        {form.formState.errors.description && <p className='text-red-500'>{form.formState.errors.description.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor='priority'>Priority</Label>
                        <Select
                        value = {form.watch("priority")}
                        onValueChange={(value)=>form.setValue("priority",value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder='Select priority' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='low'>Low</SelectItem>
                                <SelectItem value='medium'>Medium</SelectItem>
                                <SelectItem value='high'>High</SelectItem>
                            </SelectContent>
                        </Select>
                        {form.formState.errors.priority && <p className='text-red-500'>{form.formState.errors.priority.message}</p>}
                    </div>
                    <Button type='submit' variant="outline" disabled={createTodoMutation.isLoading} >
                        {createTodoMutation.isLoading ? "Creating..." : "Create Todo"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default TodoForm