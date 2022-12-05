import React from 'react';
import UserPosts from '../UserPosts/UserPosts';
import './style.css';

const Posts = () => {
    return (
        <>
        <h1 className="headers">Users Posts</h1>
        <UserPosts />
        </>
        
    );
};

export default Posts;