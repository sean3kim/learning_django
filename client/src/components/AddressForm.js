import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Paper, TextField, Button, Alert } from '@mui/material';

import { addAddress } from '../features/order/orderThunks';

const AddressForm = () => {
    const initialAddressState = {
        address: '',
        state: '',
        city: '',
        zip: '',
    }

    const [shipAddress, setShipAddress] = useState(initialAddressState)

    const user = useSelector((state) => state.user.username);
    const order = useSelector((state) => state.order.order);
    const errorMessage = useSelector((state) => state.order.errorMessage);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addAddress({...shipAddress, customer: user, order: order.id}))
    }

    return (
        <Container>
            <Paper>
                {errorMessage && <Alert severity='error' variant='outlined'>{errorMessage}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField 
                        sx={{marginY: '1rem'}} 
                        variant='outlined'
                        label='address'
                        name='address'
                        id='address'
                        required
                        value={shipAddress.address}
                        onChange={(e) => setShipAddress({...shipAddress, address: e.target.value})}
                    />
                    <TextField 
                        sx={{marginY: '1rem'}} 
                        variant='outlined'
                        label='city'
                        name='city'
                        id='city'
                        required
                        value={shipAddress.city}
                        onChange={(e) => setShipAddress({...shipAddress, city: e.target.value})}
                    />
                    <TextField 
                        sx={{marginY: '1rem'}} 
                        variant='outlined'
                        label='state'
                        name='state'
                        id='state'
                        required
                        value={shipAddress.state}
                        onChange={(e) => setShipAddress({...shipAddress, state: e.target.value})}
                    />
                    <TextField 
                        sx={{marginY: '1rem'}} 
                        variant='outlined'
                        label='zip'
                        name='zip'
                        id='zip'
                        required
                        value={shipAddress.zip}
                        onChange={(e) => setShipAddress({...shipAddress, zip: e.target.value})}
                    />
                    <Button type='submit' variant='outlined'>confirm</Button>
                </form>

            </Paper>
        </Container>
    )
}

export default AddressForm;