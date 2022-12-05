import { ToDos } from "./interfacesToDo";
import { TODOS } from "./todos";
import {useState, useEffect} from 'react';
import http from "../../http";
import '../pages/style.css';
import { USERS } from '../Users/users';

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

    const findID = (toDoID: number) => {
        for (let i = 0; i < USERS.length; i++ ) {
            if (toDoID == USERS[i].id) {
                return USERS[i].name;
            }
    }
    }
    return (
        <div className="w-100">
            <h1 className="headers">Users ToDos</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Plans to do:</th>
                        <th scope="col">User</th>
                        <th scope="col">Completed</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                {TODOS.map(todo => {
                    return <tr key={todo.id}>
                                        <th scope="row"> &#10004;</th>
                                        <td>{todo.title}</td>
                                        <td className="fst-italic fw-lighter">{findID(todo.userId)}</td>
                                        <td>
                                            {todo.completed ? 
                                            <button className="btn btn-success">Done!</button>
                                            :
                                            <button className="btn btn-outline-success">Not yet!</button>
                                            }
                                        </td>
                                        </tr>
                                    
                                    
                                    
                           
                }
                    )}
             </tbody>
            </table>
        </div>
        
    )
}
export default UserToDos;