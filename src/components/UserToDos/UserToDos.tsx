import { ToDos } from "./interfacesToDo";
import { TODOS } from "./todos";
import {useState, useEffect} from 'react';
import http from "../../http";

const UserToDos = () => {
    const [todos, setTodos] = useState<ToDos[]>([]);
    const getAllToDos = async() => {
        const responseData = await http.get('/todos');
        const todos = responseData.data;
        setTodos(todos);
    }
    useEffect(() => {
        getAllToDos();
    }, []);
    return (
        <div className="w-100">
            <h1 className="text-center">Users ToDos</h1>
            <ul className="list-group w-100">
                {TODOS.map(todo => {
                    return <li className="list-group-item list-group-item-success d-flex justify-content-between" key={todo.id}>{todo.title}
                    {todo.completed ? 
                        <button className="btn btn-success">Done!</button>
                        :
                        <button className="btn btn-outline-success">Not yet!</button>
                    }
                    </li>
                }
                    )}
            
            </ul>
        </div>
        
    )
}
export default UserToDos;