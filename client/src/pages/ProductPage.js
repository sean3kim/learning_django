import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneProduct, deleteProduct } from '../features/product/productThunks';
import { Container, Paper, Typography, Grid, Button, Alert, TextField } from '@mui/material';
import MyImageCarousel from '../components/MyImageCarousel';
import AddReviewForm from '../components/AddReviewForm';
import ListReviews from '../components/ListReviews';

import { getActiveOrder, addItem } from '../features/order/orderThunks';


const ProductPage = () => {
    const [quantity, setQuantity] = useState(1);
    const [success, setSuccess] = useState(false);
    const [toggleReviewForm, setToggleReviewForm] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const product = useSelector((state) => state.product.byId[params.id]);
    const order = useSelector((state) => state.order.order);
    const errorMessage = useSelector((state) => state.order.errorMessage);
    const user = useSelector((state) => state.user);

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
        navigate('/products');
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

    const handleToggleReviewForm = () => {
        setToggleReviewForm(!toggleReviewForm);
    }


    return (
        <Container>
            <Paper sx={{paddingBottom: '1rem'}}>
            {console.log('products', product)}
            {errorMessage && <Alert severity='error' variant='outlined'>{errorMessage}</Alert>}
            {(success && !errorMessage) && <Alert severity='success' variant='outlined'>successfully added item to cart</Alert>}
                <Grid container >
                    <Grid item s={6}>
                        {(product && product.images) && <MyImageCarousel images={product.images} />}
                    </Grid>
                    <Grid item s={6}>
                        <div style={{marginTop: '24px'}}>
                            <Typography variant='h4'>{product && product.name}</Typography>
                            <Typography>${product && product.price}</Typography>
                            <br/>
                            <Typography variant='h6'>Description</Typography>
                            <Typography>{product && product.description}</Typography>

                            <br/>
                            {(product && product.size) && 
                                <div>
                                    <Typography>{product.size}</Typography>
                                    <span>
                                        <TextField
                                            sx={{maxWidth: '6rem'}}
                                            inputProps={{
                                                max: product.quantity, 
                                                min: 1, 
                                                style: {
                                                    height: '15px'
                                            }}}
                                            variant='outlined'
                                            label='qty'
                                            name='qty'
                                            id='qty'
                                            size='small'
                                            type='number'
                                            defaultValue={1}
                                            required
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                        <Button variant='outlined' sx={{height: '32px', paddingX: '7px', marginX: '5px'}} onClick={addToCart}>add to cart</Button>
                                    </span>
                                </div>
                            }
                            {user.isStaff && 
                                <div>
                                    <Button variant='outlined' onClick={handleDelete}>delete</Button>
                                </div>
                            }
                        </div>
                    </Grid>
                </Grid>

                {(product && product.reviews) && <ListReviews prod={product} revs={product.reviews}/>}
                {(toggleReviewForm && product && product.id) && <AddReviewForm user={user.username} productId={product.id}/>}
                <Button onClick={handleToggleReviewForm}>
                    {toggleReviewForm ? 'cancel' : 'leave a review'}
                </Button>
            </Paper>
        </Container>
    )
}

export default ProductPage;