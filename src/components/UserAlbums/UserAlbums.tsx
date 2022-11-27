import { useEffect, useState } from "react";
import http from "../../http";
import { ALBUMS } from "./albums";
import { Albums } from "./interfacesAlbum";

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

    return (
    <div className="container d-flex flex-column">
        <h1 className="text-center">Users Albums</h1>
        {ALBUMS.map(album => {
           return <button type="button" className="btn btn-outline-info" key={album.id}>
                    {album.title}
                </button>
        })
        }
    </div>
    )
}
export default UserAlbums;