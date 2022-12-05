import { useEffect, useState } from "react";
import http from "../../http";
import { ALBUMS } from "./albums";
import { Albums } from "./interfacesAlbum";
import { USERS } from '../Users/users';
import '../pages/style.css';

const UserAlbums = () => {
    const [albums, setAlbums] = useState<Albums[]>([]);
    const getAllAlbums = async() => {
        const responseData = await http.get('/albums');
        const albums = responseData.data;
        setAlbums(albums);

    }
    useEffect(() => {
        getAllAlbums();
    }, []);
    const findID = (albumID: number) => {
        for (let i = 0; i < USERS.length; i++ ) {
            if (albumID == USERS[i].id) {
                return USERS[i].name;
            }
    }
    }
    return (
        <>
        <h1 className="headers">Users Albums</h1>
        <div className="container d-flex flex-wrap justify-content-center mb-3">
        {ALBUMS.map(album => {
           return <button type="button" 
                            className="btn btn-outline-secondary ps-4 pe-4 m-2" 
                            key={album.id}>
                    &#128366; {album.title}
                    <p className="m-0 w-100 text-end fst-italic fw-lighter">
                        {findID(album.userId)}
                    </p>
                </button>
        })
        }
    </div>
    </>
    )
}
export default UserAlbums;