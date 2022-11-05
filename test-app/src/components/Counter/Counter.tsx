import React, {FC, useState} from "react";
import './Counter.css';

const Counter:FC = () => {
    const [count, setCount] = useState<number>(0);
    const limitIncrement = () => {
        if (count > 9) return;
        return setCount(count + 1);
    };
    return (
        <>
           <h1 className="counter-header">React Counter</h1>
           <h3 className="counter-value">{count}</h3>
           <button className="counter-decrement" onClick={() => setCount(count - 1)}>-</button>
           <button className="counter-increment" onClick={() => limitIncrement()}>+</button>
           <button className="counter-reset" onClick={() => setCount(0)}>Reset</button>
       </>
    );
}


export default Counter;