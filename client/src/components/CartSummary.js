import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container, Paper, Stack, Typography } from '@mui/material';

const CartSummary = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    const order = useSelector((state) => state.order);

    useEffect(() => {
        getTotal(order.items);
    }, [order])

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
            <Paper>
                cart summary component
                <Stack>
                    {(order && order.items) &&
                        order.items.map((i, index) => (
                            <Paper key={index}>
                                {i.product_related.name}, price: {i.product_related.price*i.quantity}, quantity: {i.quantity}
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

export default CartSummary;