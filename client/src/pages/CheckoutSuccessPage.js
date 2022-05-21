import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setAxiosConfig } from '../utils';
import axios from 'axios';
import { orderSuccess } from '../features/order/orderThunks';


// this page will only ever get accessed if a payment is successful
const CheckoutSuccessPage = () => {

    const params = useParams();
    const dispatch = useDispatch();

    const url = 'http://localhost:8000/api'
    useEffect(() => {
        // set the successful order's active field to false
        // create a new order
        dispatch(orderSuccess(params.id));
        // test();
    }, [])

    // const test = async () => {
    //     const config = setAxiosConfig();
    //     const res = await axios.post(`${url}/orders/success/`, {id: params.id}, config);
    //     console.log('response data', res.data);
    // }

    return (
        <div>checkout success {params.id}</div>
    )
}

export default CheckoutSuccessPage;