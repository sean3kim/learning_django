import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneProduct, deleteProduct } from '../features/product/productThunks';
import { Container, Paper, Button, Alert, TextField } from '@mui/material';
import MyImageCarousel from '../components/MyImageCarousel';

import { getActiveOrder, addItem } from '../features/order/orderThunks';


const ProductPage = () => {
    const [quantity, setQuantity] = useState(1);
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const product = useSelector((state) => state.product.byId[params.id]);
    const order = useSelector((state) => state.order.order);
    const errorMessage = useSelector((state) => state.order.errorMessage);

    // if the item is in the store already, grab from there
    // else dispatch an action to retrieve from server
    useEffect(() => {
        dispatch(getActiveOrder());
        if (product === undefined) {
            dispatch(getOneProduct(params.id));
        }
    }, [product, dispatch, params.id])

    const handleDelete = () => {
        dispatch(deleteProduct(product.id));
        navigate('/products')
    }

    const addToCart = () => {
        let data = {
            product: product.id,
            quantity: quantity,
            order: order.id
        }
        dispatch(addItem(data));
        setSuccess(true);
    }


    return (
        <Container>
            <Paper>
                {console.log('in product page', product)}
                {console.log('quantity', quantity)}
                {errorMessage && <Alert severity='error' variant='outlined'>{errorMessage}</Alert>}
                {(success && !errorMessage) && <Alert severity='success' variant='outlined'>successfully added item to cart</Alert>}
                <MyImageCarousel images={product.images} />

                {product && product.name}

                <hr></hr>
                <div>
                    <span>
                        <TextField
                            sx={{maxWidth: '6rem'}}
                            variant='outlined'
                            label='quantity'
                            name='quantity'
                            id='quantity'
                            type='number'
                            defaultValue={1}
                            required
                            // value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <Button onClick={addToCart}>add to cart</Button>
                    </span>
                </div>
                <div>
                    <Button onClick={handleDelete}>delete</Button>
                </div>
            </Paper>
        </Container>
    )
}

export default ProductPage;