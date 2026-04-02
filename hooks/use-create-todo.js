import {createTodo,getTodos} from "@/actions/todo-actions";
import { useTodoStore } from "@/store/todo-store";
import { useQueryClient , useMutation , useQuery } from "@tanstack/react-query";

// export function useTodos(){
//     const setTodos = useTodoStore((state)=>state.setTodos);
// }

export const todoKeys = {
    all:["todos"],
    lists:()=>[...todoKeys.all,"list"],
}

export function useCreateTodo(){
    const queryClient = useQueryClient();
    const addTodo = useTodoStore((state)=>state.addTodo);

    return useMutation({
        mutationFn: async (data)=>(createTodo(data)),
        onSuccess: (result)=>{
            if(result.success){
                // addTodo(result.data);
                console.log(result);
                queryClient.invalidateQueries({queryKey:todoKeys.lists()});
            }
        }
    })
}


export function useTodos(){
    const setTodos = useTodoStore((state)=>state.setTodos);

    return useQuery({
    queryKey: todoKeys.lists(),
    queryFn: async ()=>{
        const result = await getTodos();
        console.log(result);

        if(result.success){
            setTodos(result.data);
            return result.data;
        }

        throw new Error(result.error || "Failed to fetch todos");
    }    
    })
}