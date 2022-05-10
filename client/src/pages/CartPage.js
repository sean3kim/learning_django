import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper, Typography, Stack, Divider, Container } from '@mui/material';

import { getActiveOrder, removeItem } from '../features/order/orderThunks';

const CartPage = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const dispatch = useDispatch();

    // no simple way to filter an object (which byId is) so first turn it into entries, an [ [key, value], [key, value], [key, value], ...]
    // then reduce to add the ones that have matching keys as in the order items to the initial array
    // let items = useSelector((state) => Object.entries(state.product.byId).reduce((previousValue, currentValue) => {
    //     let key = currentValue.shift();
    //     // let stateKeys = Object.keys(state.order.items);
    //     let stateKeys = state.order.items.map((item) => item.product_id)
    //     if (stateKeys.includes(parseInt(key))) {
    //         previousValue.push(currentValue.shift())
    //     }
    //     return previousValue
    // }, []))

    let order = useSelector((state) => state.order)

    useEffect(() => {
        dispatch(getActiveOrder());
    }, [])

    useEffect(() => {
        getTotal(order.items);
    }, [order.items])

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

    return (
        <Container>
            <Paper sx={{paddingX: 2, paddingY: 1}}>
                <Typography>C A R T</Typography>
                <Stack divider={<Divider />}>
                    {(order && order.items) &&
                        order.items.map((i, index) => (
                            <Paper key={index}>
                                {i.product_related.name}, price: {i.product_related.price}, quantity: {i.quantity}
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