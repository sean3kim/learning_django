import { React, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { setAxiosConfig } from '../utils';

const TestOrderPage = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [order, setOrder] = useState({});

    const url = 'http://localhost:8000/api'

    useEffect(() => {
        getOrder();
        getOrderItems();
    }, [])

    const getOrder = async () => {
        let config = setAxiosConfig();
        const res = await axios.get(`${url}/orders/2/`, config);
        console.log("get order", res.data);
        setOrder(res.data);
    }

    const getOrderItems = async () => {
        let config = setAxiosConfig();
        const res = await axios.get(`${url}/orders/item/`, config);
        console.log("get order items", res.data)
        setOrderItems(res.data);
    }

    const testAdd = async () => {
        let config = setAxiosConfig();
        let data = {
            apparel: 1,
            order: 2,
            quantity: 1,
        }
        const res = await axios.post(`${url}/orders/item/`, data, config)
        console.log("added", res.data)
    }

    const testDelete = async (id) => {
        let config = setAxiosConfig();
        const res = await axios.delete(`${url}/orders/item/${id}/`, config);
        console.log("test delete", res.data);
    }


    return (
        <div>
            test order page

            <p>ORDERS</p>
            <div>
                {(order && order.items) &&
                    order.items.map((i, index) => (
                        <div key={index}>
                            {i.apparel_related && i.apparel_related.name}, {i.climbing_related && i.climbing_related.name} <Button onClick={() => testDelete(i.id)}>delete</Button>
                        </div>
                    ))
                }
            </div>

            <p>ORDER ITEMS</p>
            <div>
                {orderItems && 
                    orderItems.map((item, index) => (
                    <div key={index}>
                        {item.apparel_related && item.apparel_related.name}, {item.climbing_related && item.climbing_related.name} <Button onClick={() => testDelete(item.id)}>delete</Button>
                    </div>
                    ))
                }
            </div>
            <Button onClick={testAdd}>add an order item</Button>
            {/* <Button onClick={testDelete}>remove an order item</Button> */}
        </div>
    )
}

export default TestOrderPage;