import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const CartPage = () => {


    const order = useSelector((state) => state.order.byId[2]);

    return (
        <div>
            {console.log("cart page", order)}
            cart page
        </div>
    )
}

export default CartPage;