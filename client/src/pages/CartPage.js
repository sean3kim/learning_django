import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper, Typography, Stack, Divider, Container, TextField } from '@mui/material';

import { getActiveOrder, editItem, removeItem } from '../features/order/orderThunks';

const CartPage = () => {
    const [updateProduct, setUpdateProduct] = useState('');
    const [quantity, setQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const dispatch = useDispatch();

    let order = useSelector((state) => state.order)

    useEffect(() => {
        dispatch(getActiveOrder());
    }, [dispatch])

    useEffect(() => {
        getTotal(order.items);
    }, [order.items])

    useEffect(() => {
        // ok now just need to figure how to prevent updatecart from running on mount, only after mount
        updateCart();
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
            <Paper sx={{paddingX: 2, paddingY: 1}}>
                <Typography>C A R T</Typography>
                <Stack divider={<Divider />}>
                    {(order && order.items) &&
                        order.items.map((i, index) => (
                            <Paper key={index}>
                                {i.product_related.name}, price: {i.product_related.price*i.quantity}, quantity: 
                                <TextField
                                    sx={{maxWidth: '4rem', maxHeight: '6rem'}}
                                    size='small'
                                    variant='outlined'
                                    name={`${i.product_related.name}_quantity`}
                                    id={`${i.product_related.name}_quantity`}
                                    type='number'
                                    defaultValue={i.quantity}
                                    required
                                    onChange={handleQuantityChange}
                                    // onChange={(e) => setQuantity(e.target.value)}
                                />

                                <Button onClick={() => dispatch(removeItem(i.id))}>delete</Button>
                            </Paper>
                        ))
                    }
                    <Paper>
                        <Typography>Total: {totalPrice}, Items: {totalQuantity}</Typography>
                    </Paper>
                </Stack>
            </Paper>
        </Container>
    )
}

export default CartPage;