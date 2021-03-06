import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Paper } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { setAxiosConfig } from '../utils';
import axios from 'axios';

import { getActiveOrder } from '../features/order/orderThunks';
import AddressForm from '../components/AddressForm';
import CartSummary from '../components/CartSummary';
import PaymentForm from '../components/PaymentForm';
import { api_url } from '../proddev';


const stripePromise = loadStripe('pk_test_51L1bA4BJHlw2dgLLTqHibNkPiXZWk3gIozfKf7rJoE9DNrYMK3fxhMALBbJWTu5BfhkuUWAOPqHaxxCNczX73F7P00eTCgWvgH')

const CheckoutPage = () => {
    const [clientSecret, setClientSecret] = useState('');
    const dispatch = useDispatch();

    const orderItems = useSelector((state) => state.order.items);

    // const url = 'http://localhost:8000/api'
    useEffect(() => {
        dispatch(getActiveOrder());
        getPaymentIntent();
    }, [dispatch])

    const getPaymentIntent = async () => {
        // sending order ids and getting the products related in server
        const config = setAxiosConfig();
        const data = orderItems.map((item) => item.id);
        const res = await axios.post(`${api_url}/orders/create-payment-intent/`, {items: data}, config);
        setClientSecret(res.data.clientSecret);
    }

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <Container>
            <Paper>
                <CartSummary />
                <AddressForm />
                {clientSecret && 
                    <Elements options={options} stripe={stripePromise}>
                        <PaymentForm clientSecret={clientSecret}/>
                    </Elements>
                }
            </Paper>
        </Container>
    )
}

export default CheckoutPage;