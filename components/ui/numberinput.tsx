import {useState} from "react";

export default function NumberInput({item, addTakeawayItem}:any) {

    const [foodQuantity, setFoodQuantity] = useState(0);

    const incrementQuantity = () => {
        setFoodQuantity(foodQuantity + 1);
        addTakeawayItem(item);
    };

    return (
        <div>
            <span className="px-2 py-1 bg-slate-200 border-gray-100 cursor-pointer" onClick={() => addTakeawayItem(item)}>-</span>
            <span className="px-2 py-1">{foodQuantity}</span>
            <span className="px-2 py-1 bg-slate-200 border-gray-100 cursor-pointer" onClick={() => incrementQuantity()}>+</span>
        </div>
    );
}