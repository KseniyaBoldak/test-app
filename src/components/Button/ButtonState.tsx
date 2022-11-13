import React, {useState} from "react";

const ButtonState = () => {
    const [count, setCount] = useState(0);
    return (
        <button onClick={() => setCount(count + 1)}>{count}</button>
    )
}

export default ButtonState;