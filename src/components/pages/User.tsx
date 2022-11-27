import React, {useEffect} from 'react';
import http from '../../http';
import { useParams } from 'react-router-dom'

const User = () => {
    const params = useParams();
    useEffect(() => {
        getAllUserDataById();
    },[]);
    const getAllUserDataById = async () => {
        const userData = await http.get(`/users/${params.id}`);
        const userPostsData = await http.get(`/posts?userId=${userData.data.id}`);
        //get posts comments
        console.log(userData.data);
        console.log(userPostsData.data);
    }
    return (
        <div>
            <h1>I'am single cool User </h1>
        </div>
    );
};

export default User;