import React, {Dispatch, SetStateAction} from 'react';
import '../pages/style.css';

const SearchUsers = ({setSearch}: { setSearch: Dispatch<SetStateAction<string>> }) => {
    const getNewData = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }
    return (
        <div className="input-group mt-3">
            <span className="input-group-text input-text" id="basic-addon1">Search</span>
            <input type="text"
                   className="form-control input-text"
                   placeholder="Username"
                   aria-label="Username"
                   aria-describedby="basic-addon1"
                   onChange={event => getNewData(event)}
            />
        </div>
    );
};

export default SearchUsers;