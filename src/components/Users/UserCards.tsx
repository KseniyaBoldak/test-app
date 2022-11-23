import { IUser } from './interfaces';
import React, {SetStateAction} from 'react';
import http from "../../http";


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
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">{user.username}</p>
                            <p className="card-text">{user.email}</p>
                            <p className="card-text">{user.phone}</p>
                            <p className="card-text">{user.website}</p>
                            <p className="card-text">{user.company?.name}</p>
                            <p className="card-text">{user.address?.city}</p>
                        </div>
                        
                        <div className="card-footer">
                            <button className="btn btn-danger"
                                    onClick={() => deleteUser(user.id)}
                            >
                                Delete this user
                            </button>
                            
                        </div>
                        
                    </div>
                </div>
            )}
       </>
    );
};

export default UserCards;