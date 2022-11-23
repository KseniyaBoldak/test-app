import React, {Dispatch, SetStateAction} from 'react';

const SearchUsers = ({setSearch}: { setSearch: Dispatch<SetStateAction<string>> }) => {
    const getNewData = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }
    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Search</span>
            <input type="text"
                   className="form-control"
                   placeholder="Input username"
                   aria-label="Username"
                   aria-describedby="basic-addon1"
                   onChange={event => getNewData(event)}
            />
        </div>
    );
};

export default SearchUsers;