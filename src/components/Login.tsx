import axios from 'axios';
import React, {useState, FormEvent} from 'react';
import http from '../http';
const Login = () => {
    const [loginData, setLoginData] = useState<{username: string, password: string}>({username: '', password: ''});

    const getEmailandLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        const id = event.target.id;
        const value = event.target.value;
        setLoginData({...loginData, [id]: value});
    }
    const confirmUser = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const responseData = await axios.post('https://fakestoreapi.com/auth/login', loginData);
        if (responseData.data) {
            alert('welcome');

            /* username: mor_2314
            password:  83r5^_*/
        }
        }catch (err) {
            console.log(err);
        }
        
    }

    return(
        <div>
            <form className="row g-3 align-items-center" onSubmit={confirmUser}>
                <div className="col-auto">
                    <label htmlFor="username" className="visually-hidden">Email</label>
                    <input type="text" 
                            className="form-control" 
                            id="username" 
                            placeholder='email@example.com'
                            value={loginData.username}
                            onChange={getEmailandLogin}
                    />
                </div>
                <div className="col-auto">
                    <label htmlFor="inputPassword2" className="visually-hidden">Password</label>
                    <input type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Password"
                            value={loginData.password}
                            onChange={getEmailandLogin}
                    />
                </div>
                <div className="col-auto">
                    <button type="submit" 
                            className="btn btn-primary"

                    >
                        Confirm identity
                    </button>
                </div>
            </form>
        </div>
    )
}
export default Login;
