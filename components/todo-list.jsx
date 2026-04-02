"use client"
import React from 'react'
import {useTodoStore} from "@/store/todo-store";
import { useTodos } from '@/hooks/use-create-todo';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import {useQuery} from "@tanstack/react-query";

const TodoList = () => {
    const {data:todos,isLoading,error} = useTodos();

    const filteredTodos = useTodoStore((state)=>state.filteredTodos());

    if(isLoading){
        return(
            <Card>
                <CardContent className='flex items-center justify-center'>
                    <Loader2 className='animate-spin'/>
                    <p className="p-8 text-center">Loading Todos...</p>
                </CardContent>
            </Card>
        )
    }

    if(error){
        return(
            <Card>
                <CardContent className='flex items-center justify-center'>
                    <p className="p-8 text-center text-red-500">Failed to load todos: {error.message}</p>
                </CardContent>
            </Card>
        )
    }

    if(filteredTodos.length === 0){
        return(
            <Card>
                <CardContent className='flex items-center justify-center'>
                    <p className="p-8 text-center">No todos found.</p>
                </CardContent>
            </Card>
        )
    }


  return (
    <div className="space-y-3">
        {
            filteredTodos.map((todo)=>(
                <Card key={todo.id}>
                    <CardHeader>
                        <CardTitle>{todo.title}</CardTitle>
                        <CardDescription>Priority: {todo.priority}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{todo.description}</p>   
                    </CardContent>
                </Card>
            ))
        }
    </div>
  )
}

export default TodoList