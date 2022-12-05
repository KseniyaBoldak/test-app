import { POSTS } from './posts';
import { Posts } from './postInterfaces';
import  React, { useState, useMemo, useEffect, FormEvent,ChangeEvent } from 'react';
import http from '../../http';
import '../pages/style.css';

const UserPosts = ({ userId = 0 }: { userId?: number }) => {
    const initialPost = {
        title: '',
        body: ''
    }
    const [posts, setPosts] = useState<Posts[]>([]);
    const [search, searchPosts] = useState<string>('');
    const getAllPosts = async() => {
        try {
            const responseData = await http.get(userId === 0 ? '/posts' : `/posts?userId=${userId}`);
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
    const [form, showForm] = useState(false);
    return (
        <div>
            
            <div className="input-group mb-3 mt-3">
                <span className="input-group-text input-text" id="basic-addon1">Search</span>
                <input type="text"
                       className="form-control input-text"
                       placeholder="Post Title"
                       onChange={(event) => searchPosts(event.target.value)}
                />
            </div> 
            <button className="btn btn-outline-dark mb-2" onClick={() => showForm(!form)}>Add New Post</button>  
            {form &&
                <form className="form-control mb-3 d-flex flex-column w-50"
                onSubmit={(event) => addPost(event)}>
                    {Object.keys(POSTS[0]).map(field => {
                        if (field === "userId" || field === "id") return;
                        return <input type="text" className="form-control mb-2 input-text"
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
                   <div className="d-flex justify-content-end">
                        <button className="btn btn-outline-success mt-2 ps-5 pe-5" type="submit">Save</button>
                    </div> 
            
        </form>}
            
                {searchedPosts.map(post => 
                <div className="card-body border-bottom" key={post.id}>
                    <h5 className="card-title text-center m-2">{post.title}</h5>
                    <p className="card-text text-bg-light p-3 rounded-pill m-2">{post.body}</p>
                    <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-danger ps-5 pe-5 m-2" onClick={() => deletePost(post.id)}>Delete</button>
                    </div>
                </div>
                
                )}
            </div>
    )
}
export default UserPosts;