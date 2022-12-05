import {PHOTOS} from '../UserPhotos/photos';
import {Photos} from '../UserPhotos/interfacesPhoto';
import {useState, useEffect} from 'react';
import http from '../../http';
import '../pages/style.css';

const UserPhotos = () => {
    const [photos, setPhotos] = useState<Photos[]>([]);
    const getAllPhotos = async() => {
        try {
            const responseData = await http.get('/photos');
            const photos = responseData.data;
            setPhotos(photos);
        }catch(err) {
            alert(err);
        }
    }
    useEffect(() => {
        getAllPhotos();
    }, []);

    
    return (
        <>
        <h1 className="headers">Users Photos</h1>
        <div className='d-flex flex-sm-wrap'> 
            {PHOTOS.map((photo:Photos) => {
                return  <div className="w-25">
                            <div className="card m-2" key={photo.id}>
                                <img src={photo.url} className="card-img-top" />
                                <div className="card-body">
                                    <p className="card-text">{photo.title}</p> 
                                </div>
                            </div>
                        </div>})
            }
        </div>
        </>
    )
}
export default UserPhotos;