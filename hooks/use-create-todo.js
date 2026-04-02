import {createTodo} from "@/actions/todo-actions";
import { useTodoStore } from "@/store/todo-store";
import { useQueryClient , useMutation } from "@tanstack/react-query";

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