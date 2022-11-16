import React, { FormEvent, useMemo, useState } from 'react';
import { USERS } from './users';


const UserCards = () => {
    const initialValue = {
        name: '',
        username: '',
        email: '', 
        phone: '',
        website: '', 
        company: '',
        address: ''
    };
    const [users, setUsers] = useState(USERS);
    const [search, setSearch] = useState<string>('');
    const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
    const [userValue, setUserValue] = useState<any>(initialValue);
    const [newUserId, setNewUserId] = useState<number>(USERS.length + 1);
   
    const deleteUser = (id: number) => {
        const confirm = window.confirm('Do you want delete this user?');
        if (confirm) {
            setUsers(users.filter(user => user.id !== id));
        }
    }
    const searchedUsers = useMemo(() => {
        if (search) {
            return users.filter(user => user.username.toLowerCase().includes(search.toLowerCase()));
        }
        return users;
    }, [search, users]);

    const getNewData = (id:string, inputValue: string) => {
        const field = id;
        const value = inputValue;
        setUserValue({...userValue, [field]: value});
       
    };
    const addUser = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userValueWithId = {...userValue, id: newUserId};
        setNewUserId(newUserId + 1);
        setUsers([...users, userValueWithId]);
        setUserValue(initialValue);
    };

    
    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
            <h1 className="text-center w-100">User cards</h1>
            <div>
            <button className="btn btn-success" onClick={() => setIsShowEdit(!isShowEdit)}>Show Form for Add user
            </button>
            {isShowEdit &&
            <form onSubmit={event => addUser(event)}>
                {Object.keys(USERS[0]).map(field => {
                        if (field === "company" || field === "id" || field === "address") return;
                        return <input className="form-control mt-2"
                                        key={field}
                                        required
                                        id={field} 
                                        placeholder={`Input user ${field}`}
                                        value={userValue[field]}
                                        onChange ={(event) => getNewData(event.target.id, event.target.value)}

                            />
                        }
                    )}
                    <button className="btn btn-success mt-2" type="submit">Add User</button>
                    </form>}
                </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Search</span>
                <input type="text"
                       className="form-control"
                       placeholder="Input username"
                       aria-label="Username"
                       aria-describedby="basic-addon1"
                       onChange={(event) => setSearch(event.target.value)}
                />
            </div>
            {searchedUsers.map(user =>
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
        </div>
    );
};

export default UserCards;