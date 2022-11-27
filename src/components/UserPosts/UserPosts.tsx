import { POSTS } from './posts';
import { Posts } from './postInterfaces';
import  React, { useState, useMemo, useEffect, FormEvent,ChangeEvent } from 'react';
import axios from 'axios';
import http from '../../http';

const UserPosts = () => {
    const initialPost = {
        title: '',
        body: ''
    }
    const [posts, setPosts] = useState<Posts[]>([]);
    const [search, searchPosts] = useState<string>('');
    const getAllPosts = async() => {
        try {
            const responseData = await http.get('/posts');
            const posts = responseData.data;
            setPosts(posts);
        } catch (err) {
            alert(err)
        }
    }
    const searchedPosts = useMemo(() => {
        if (search) {
            return posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
        }
        return posts;
    }, [search, posts]);

    const deletePost = async(id: number) => {
        const confirm = window.confirm('Do you want delete this post?');
        if (confirm) {
            const del = await http.delete(`/users/${id}`);
            if (del.status === 200) {
                setPosts(posts.filter(post => post.id !== id));

            }
        }
    }
    useEffect(() => {
        getAllPosts();
    }, []);

    const [newPost, setNewPost] = useState<any>(initialPost);
    const getNewPost = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.id;
        const value = event.target.value;
        setNewPost({...newPost, [field]: value});

    }
    const addPost = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const responseData = await http.post('/posts', newPost);
        if (responseData.data) {
            setPosts([...posts, responseData.data]);
            setNewPost(initialPost);
        }

    }

    return (
        <div className="card container">
            <h1 className="w-50 mb-3 mt-3 p-2 bg-info bg-opacity-10 border border-info border-start-0 rounded-end">User Posts</h1>
            <form className="form-control mb-3 d-flex flex-column w-50"
                    onSubmit={(event) => addPost(event)}>
                        {Object.keys(POSTS[0]).map(field => {
                            if (field === "userId" || field === "id") return;
                            return <input type="text" className="form-control mb-2"
                                        key={field}
                                        required
                                        id={field}
                                        placeholder={`${field}`}
                                        value={newPost[field]}
                                        onChange={event => getNewPost(event)}
                                    />
                                    }
                                )
                        }
                <button className="btn btn-secondary w-25 mb-3">Add New Post</button>
            </form>
            <div className="input-group mb-3 w-50">
                <span className="input-group-text" id="basic-addon1">Search</span>
                <input type="text"
                       className="form-control"
                       placeholder="Input Post Title"
                       onChange={(event) => searchPosts(event.target.value)}
                />
            </div>            
                {searchedPosts.map(post => 
                <div className="card-body border-bottom" key={post.id}>
                    <h5 className="card-title text-center">{post.title}</h5>
                    <p className="card-text text-bg-light p-3 rounded-pill">{post.body}</p>
                    <button className="btn btn-primary" onClick={() => deletePost(post.id)}>Delete Post</button>
                </div>
                
                )}
            </div>
    )
}
export default UserPosts;