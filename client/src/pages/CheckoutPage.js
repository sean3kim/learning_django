import { React } from 'react';
import { Container, Paper } from '@mui/material';


import AddressForm from '../components/AddressForm';

const CheckoutPage = () => {

    return (
        <Container>
            <Paper>
                <AddressForm />
            </Paper>
        </Container>
    )
}

export default CheckoutPage;