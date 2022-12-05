import React, {useEffect, useState} from 'react';
import AddUser from '../Users/AddUser';
import SearchUser from '../Users/SearchUser'
import {useSearch} from '../hooks/useSearch';
import http from '../../http';
import {IUser} from '../Users/interfaces';
import UserCards from "../Users/UserCards";
import "./style.css";

const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [search, setSearch] = useState<string>('');
    const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
    const searchedUsers = useSearch(users, search, 'name');
    useEffect(() => {
        getAllUsers();
    },[]);
    const getAllUsers = async () => {
        try {
            const responseData = await http.get('/users');
            const users = responseData.data;
            setUsers(users);
        } catch (err) {
            alert(err);
        }
    };
    return (
        <>
        <h1 className="headers">Users page</h1>
            <SearchUser setSearch={setSearch}/>
            <div>
                <button type="button" className="btn btn-outline-dark mt-3" onClick={() => setIsShowEdit(!isShowEdit)}>Add New User
                </button>
                {isShowEdit && <AddUser users={users} setUsers={setUsers}/>}
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">
            {
                users.length
                    ?
                    <UserCards users={searchedUsers} setUsers={setUsers} />
                    :
                    <h1>Users not found...</h1> //spinner
            }
        </div>
        </>
        
    );
};

export default Users;