import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import Login from '../components/Login';
import '../components/pages/style.css';

const Navigation = () => {
    const currentLocation = useLocation();
    const [login, setLogin] = useState<boolean>(true);
    const routes = [
        {
            path: '/users',
            name: 'Users'
        },
        {
            path: '/posts',
            name: 'Posts'
        },
        {
            path: '/photos',
            name: 'Photos'
        },
        {
            path: '/albums',
            name: 'Albums'
        }, 
        {
            path: '/todos',
            name: 'ToDos'
        }, 
    ]
    return (
        <nav className="stick navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div>
                    <button className="navbar-toggler float-start" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {routes.map(route =>
                            <li className="nav-item" key={route.path}>
                                <Link className={`nav-link ${route.path === currentLocation.pathname && 'active'}`} to={route.path}>{route.name}</Link>
                            </li>
                        )}
                    </ul>
                </div>
                {login ? 
                <button className="btn btn-outline-secondary" type="submit" onClick={() => setLogin(false)}>Logout</button>
                :
                <Login/>
                }
            </div>
        </nav>
    );
};

export default Navigation;