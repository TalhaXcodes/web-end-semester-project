import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import iconCart from '../assets/images/iconCart.png'
import { useSelector, useDispatch } from 'react-redux'
import { toggleStatusTab } from "../stores/cart";

const Header = () => {
    const [totalQuantity, setTotalQuantity] = useState(0);
    const carts = useSelector(store => store.cart.items);
    const dispatch = useDispatch();
    useEffect(() => {
        let total = 0;
        carts.forEach(item =>
            total += item.quantity
        );
        setTotalQuantity(total);

    }, [carts])
    const handleOpenTabCart = () => {
        dispatch(toggleStatusTab());
    }
    return (
        <header className='flex justify-between items-center mb-5'>
            <Link to="/" className='text-xl font-semibold'>Home.</Link>
            <div className='w-10 h-10 bg-darkgray-100 rounded-full flex justify-center items-center relative' onClick={handleOpenTabCart}>
                <div className="relative group cursor-pointer">
                    <img
                        src={iconCart}
                        alt="Cart"
                        className="w-6 transition-transform duration-200 group-hover:scale-110"
                    />
                    <span className="absolute top-2/3 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center transition-colors duration-200 group-hover:bg-red-600">
                        {totalQuantity}
                    </span>
                </div>

            </div>
        </header>
    )

}
export default Header