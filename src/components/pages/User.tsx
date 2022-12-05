import React, {useEffect, useState} from 'react';
import http from '../../http';
import { useParams } from 'react-router-dom';
import {IUser} from "../Users/interfaces";
import UserPosts from "../UserPosts/UserPosts";

const User = () => {
    const [user, setUser] = useState<IUser>({
        id: 0,
        name: '',
        username: '',
        phone: '',
        email: '',
        website: ''
    });
    const params = useParams();
    const userId = params.id ? +params.id : 0;
    useEffect(() => {
        getAllUserDataById();
    },[]);
    const getAllUserDataById = async () => {
        const userData = await http.get(`/users/${userId}`);
        setUser(userData.data);
    }
    const updateUserInfo = async () => {
        const newUser = await http.put(`/users/${userId}`, user);
        setUser(newUser.data);
    }
    console.log(user);
    return (
        <div>
            <h1 className='headers'>{user.name}</h1>
            <form className='form-control'>
            {Object.keys(user).map(field => {
                return <input className='form-control m-1 input-text' value={user[field as keyof Omit<IUser, 'address' | 'company'>]}
                              onChange={event => setUser({...user, [field]: event.target.value})}
                />
            })}
            <div className="d-flex justify-content-end">
            <button className="btn btn-outline-success m-2" onClick={() => updateUserInfo()}>Update User info</button>
            </div>
            </form>
            
            <UserPosts userId={userId} />
        </div>
    );
};

export default User;