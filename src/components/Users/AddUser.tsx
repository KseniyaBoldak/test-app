import React, {ChangeEvent, FormEvent, useState} from 'react';
import http from '../../http';
import {USERS} from './users';
import {IUser} from './interfaces';

const AddUser = ({ users, setUsers }: { users: IUser[], setUsers: React.Dispatch<IUser[]>}) => {
    const initialValue = {
        name: '',
        username: '',
        phone: '',
        email: '',
        website: ''
    }

    const [userValue, setUserValue] = useState<any>(initialValue);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.id;
        const value = event.target.value;
        setUserValue({...userValue, [field]: value});
    }

    const addUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const responseData = await http.post('/users', userValue);
        if (responseData.data) {
            setUsers([...users, responseData.data]);
            setUserValue(initialValue);
        }
    }
    return (
        <form onSubmit={event => addUser(event)}>
            {Object.keys(USERS[0]).map(field => {
                    if (field === "company" || field === "id" || field === "address") return
                    // Object.keys(USERS[0].company).map(companyField => <input placeholder={companyField}/>)
                    return <input className="form-control mt-2"
                                  key={field}
                                  required
                                  id={field}
                                  type={field === 'email' ? 'email' : 'text'}
                                  value={userValue[field]}
                                  placeholder={`Input user ${field}`}
                                  onChange={event => onChange(event)}
                    />
                }
            )}
            <button className="btn btn-success mt-2" type="submit">Add User</button>
        </form>
    )
};

export default AddUser;