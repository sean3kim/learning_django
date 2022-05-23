import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { orderSuccess } from '../features/order/orderThunks';


// this page will only ever get accessed if a payment is successful
const CheckoutSuccessPage = () => {

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderSuccess(params.id));
        navigate('/products');
    }, [dispatch, params.id, navigate])

    return (
        <div>checkout success {params.id}</div>
    )
}

export default CheckoutSuccessPage;