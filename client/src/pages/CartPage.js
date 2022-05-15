import { React, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Paper, Typography, Stack, Divider, Container, TextField, Alert } from '@mui/material';

import { getActiveOrder, editItem, removeItem } from '../features/order/orderThunks';
import { getLoginStatus } from '../features/user/userThunks';

const CartPage = () => {
    const [updateProduct, setUpdateProduct] = useState('');
    const [quantity, setQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const isMounted = useRef(false);
    const dispatch = useDispatch();

    let order = useSelector((state) => state.order)
    let errorMessage = useSelector((state) => state.order.errorMessage);

    useEffect(() => {
        dispatch(getLoginStatus());
        dispatch(getActiveOrder());
    }, [dispatch])

    useEffect(() => {
        getTotal(order.items);
    }, [order.items])

    useEffect(() => {
        // will see a dispatch going out in dev (and returning 404) because react strict mode is on which renders twice initially
        //  with strict mode commented out, no error and only renders once
        //  allowing the isMounted Ref to work as intended
        if (isMounted.current) {
            updateCart();
        } else {
            isMounted.current = true;
        }
    }, [quantity, updateProduct])


    const getTotal = (orderItems) => {
        let initial = {totalPrice: 0, totalQuantity: 0}
        const totals = orderItems.reduce((previousValue, currentValue) => {
            previousValue.totalPrice += currentValue.product_related.price * currentValue.quantity;
            previousValue.totalQuantity += currentValue.quantity;
            return previousValue;
        }, initial);
        setTotalPrice(totals.totalPrice);
        setTotalQuantity(totals.totalQuantity);
    }

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
        setUpdateProduct(e.target.name.split('_').shift());
    }

    const updateCart = () => {
        let data = {}
        let updateItemId
        for (let item of order.items) {
            if (item.product_related.name === updateProduct) {
                data.product = item.product_related.id;
                data.quantity = quantity;
                data.order = order.order.id;
                updateItemId = item.id;
            }
        }
        dispatch(editItem({data, id: updateItemId}));
    }

    return (
        <Container>
            <Paper sx={{paddingX: 2, paddingY: 1}} elevation={0}>
                {errorMessage && <Alert severity='error' variant='outlined'>{errorMessage}</Alert>}
                <Typography>C A R T</Typography>
                <Stack divider={<Divider sx={{borderColor: 'black'}}/>}>
                    {(order && order.items) &&
                        order.items.map((i, index) => (
                            <Paper key={index} elevation={0} sx={{marginY: '0.3rem'}}>
                                <Typography sx={{float: 'left'}}>{i.product_related.name}</Typography>
                                <Typography sx={{float: 'right'}}>
                                    qty:
                                    <TextField
                                        sx={{marginX: '0.2rem', maxWidth: '4rem', maxHeight: '6rem'}}
                                        inputProps= {{
                                            max: i.product_related.quantity, 
                                            min: 1,
                                            style: {
                                                height: '12px',
                                                width: '30px'
                                            }
                                        }}
                                        size='small'
                                        variant='outlined'
                                        name={`${i.product_related.name}_quantity`}
                                        id={`${i.product_related.name}_quantity`}
                                        type='number'
                                        defaultValue={i.quantity}
                                        required
                                        onChange={handleQuantityChange}
                                    />
                                    price: ${i.product_related.price*i.quantity}
                                </Typography>
                                <Button variant='outlined' size='small' onClick={() => dispatch(removeItem(i.id))}>remove</Button>
                            </Paper>
                        ))
                    }
                    <Typography>Total: {totalPrice}, Items: {totalQuantity}</Typography>
                </Stack>
                <Link to='/checkout' style={{textDecoration: 'none'}}>
                    <Button variant='outlined' size='small' sx={{marginTop: '0.5rem'}}>checkout</Button>
                </Link>
            </Paper>
        </Container>
    )
}

export default CartPage;