import React, { useState } from 'react';
import { USERS } from './users';


const UserCards = () => {
    const [users, setUsers] = useState(USERS);
    const deleteUser = (id: number) => {
        setUsers(users.filter(user => user.id !== id));
    }
    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
            {users.map(user =>
                <div className="col" key={user.id}>
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">{user.username}</p>
                            <p className="card-text">{user.email}</p>
                            <p className="card-text">{user.phone}</p>
                            <p className="card-text">{user.website}</p>
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
        </div>
    );
};

export default UserCards;