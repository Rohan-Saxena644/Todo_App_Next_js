import { todo } from "node:test";
import {create} from "zustand";
import {devTools} from "zustand/middleware";

export const useTodoStore = create(
    devTools(
        (set,get)=>({
            todos:[],
            filter:all,
            isLoading:false,

            setTodos:(todos)=>set({todos}),

            addTodo:(todo)=>set((state)=>({todos:[...state.todos,todo]})),

            setFilter: (filter)=>set({filter}),
            setLoading: (isLoading)=>set({isLoading})
        }),

        {name:"todo-store"},
    )
)