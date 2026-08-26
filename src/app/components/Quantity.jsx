"use client";

import { useState } from "react";

const Quantity = ({ handleQuantity }) => {
    const [count, setCount] = useState(1);

    const increase = () => {
        const newCount = count + 1;
        setCount(newCount);
        handleQuantity(newCount);
    };

    const decrease = () => {
        if (count !== 1) {
            const newCount = count - 1;
            setCount(newCount);
            handleQuantity(newCount);
        }
    };

    return (
        <div className="flex shrink-0 items-center rounded-lg border border-gray-300">
            <button
                onClick={decrease}
                className="px-3 py-2 text-lg hover:bg-gray-100"
            >
                -
            </button>

            <span className="min-w-10 text-center font-semibold">
                {count}
            </span>

            <button
                onClick={increase}
                className="px-3 py-2 text-lg hover:bg-gray-100"
            >
                +
            </button>
        </div>
    );
};

export default Quantity;