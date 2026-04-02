"use client";
import React from 'react'
import { useTodoStore } from '@/store/todo-store';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const TodoFilter = () => {

    const filter = useTodoStore((state) => state.filter);
    const setFilter = useTodoStore((state) => state.setFilter);
    const completedCount = useTodoStore((state) => state.completedCount);
    const activeCount = useTodoStore((state) => state.activeCount);

    const filters = [
        {Key: "all", Label: "ALL", count: activeCount() + completedCount()},
        {Key: "active", Label: "Active", count: activeCount()},
        {Key: "completed", Label: "Completed", count: completedCount()},
    ]

  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>Filter Todos</CardTitle>
                <CardDescription>Use the buttons below to filter your todo list.</CardDescription>
            </CardHeader>
            <CardContent className='flex space-x-4'>
                {filters.map(filterOption=>(
                    <button
                        key={filterOption.Key}
                        className={`px-4 py-2 rounded ${filter === filterOption.Key ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={()=>setFilter(filterOption.Key)}
                    >
                        {filterOption.Label} ({filterOption.count})
                    </button>
                ))}
            </CardContent>
        </Card>
    </div>
  )
}

export default TodoFilter