import { IUser } from './interfaces';
import React, {SetStateAction} from 'react';
import http from "../../http";
import {Link} from "react-router-dom";
import '../pages/style.css';


const UserCards = ({users, setUsers}: { users: IUser[], setUsers: React.Dispatch<SetStateAction<IUser[]>> }) => {
   
    const deleteUser = async(id: number) => {
        const confirm = window.confirm('Do you want delete this user?');
        if (confirm) {
            const del = await http.delete(`/users/${id}`);
            if (del.status === 200) {
                setUsers(users.filter(user => user.id !== id));

            }
        }
    }
    
    
    return (
        <>
            {users.map(user =>
                <div className="col" key={user.id}>
                    <div className="card h-100">
                        <div className="card-body" id={user.id.toString()}>
                            <Link to={`/users/${user.id}`} className='userColorName'>
                                <h5 className="userColorName text-center">{user.name}</h5>
                            </Link>
                            <p className="card-text">&#9998; {user.username}</p>
                            <p className="card-text">&#9993; {user.email}</p>
                            <p className="card-text">&#9743; {user.phone}</p>
                            <p className="card-text">&#128269; {user.website}</p>
                            <p className="card-text">&#128188; Company: {user.company?.name}</p>
                            <p className="card-text">&#127968; {user.address?.city}</p>
                        </div>
                        
                        <div className="card-footer d-flex justify-content-end">
                            <button className="btn btn-outline-danger ps-5 pe-5"
                                    onClick={() => deleteUser(user.id)}
                            >
                                Delete
                            </button>
                            
                        </div>
                        
                    </div>
                </div>
            )}
       </>
    );
};

export default UserCards;