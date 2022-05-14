import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Paper } from '@mui/material';

import { getActiveOrder } from '../features/order/orderThunks';
import AddressForm from '../components/AddressForm';
import CartSummary from '../components/CartSummary';
import PaymentForm from '../components/PaymentForm';

const CheckoutPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getActiveOrder());
    }, [dispatch])

    return (
        <Container>
            <Paper>
                <CartSummary />
                <AddressForm />
                <PaymentForm />
            </Paper>
        </Container>
    )
}

export default CheckoutPage;