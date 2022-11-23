import React, {useState} from 'react';
import AddUser from '../Users/AddUser';
import SearchUser from '../Users/SearchUser'
import {useSearch} from '../hooks/useSerach';
import http from '../../http';
import {IUser} from '../Users/interfaces';
import UserCards from "../Users/UserCards";

const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [search, setSearch] = useState<string>('');
    const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
    const searchedUsers = useSearch(users, search, 'name');
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
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
            <h1 className="text-center w-100">Users page</h1>
            <button className="btn btn-success" onClick={() => getAllUsers()}>Get All users</button>
            <div>
                <button className="btn btn-success" onClick={() => setIsShowEdit(!isShowEdit)}>Show Form for Add user
                </button>
                {isShowEdit && <AddUser users={users} setUsers={setUsers}/>}
            </div>
            <SearchUser setSearch={setSearch}/>
            <UserCards users={searchedUsers} setUsers={setUsers} />
        </div>
    );
};

export default Users;