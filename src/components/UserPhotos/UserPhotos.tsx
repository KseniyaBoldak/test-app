import {PHOTOS} from '../UserPhotos/photos';
import {Photos} from '../UserPhotos/interfacesPhoto';
import {useState, useEffect} from 'react';
import http from '../../http';

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
        <div> 
        <h1>Users Photos</h1>
        {PHOTOS.map(photo => {
           return  <div className="w-100">
                        <div className="card w-25" key={photo.id}>
                            <img src={photo.url} className="card-img-top" />
                            <div className="card-body">
                                <p className="card-text">{photo.title}</p>
                            </div>
                        </div>
                    </div>
           
        }

        )
            
    }
    </div>
    )
}
export default UserPhotos;