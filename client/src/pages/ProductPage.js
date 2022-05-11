import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneProduct, deleteProduct } from '../features/product/productThunks';
import { Container, Paper, Button, Card, CardMedia } from '@mui/material';
import MyImageCarousel from '../components/MyImageCarousel';

import { getActiveOrder, addItem } from '../features/order/orderThunks';


const ProductPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const product = useSelector((state) => state.product.byId[params.id]);
    const order = useSelector((state) => state.order.order);

    // if the item is in the store already, grab from there
    // else dispatch an action to retrieve from server
    useEffect(() => {
        dispatch(getActiveOrder());
        if (product === undefined) {
            dispatch(getOneProduct(params.id));
        }
    }, [product])

    const handleDelete = () => {
        dispatch(deleteProduct(product.id));
        navigate('/products')
    }

    const addToCart = () => {
        let data = {
            product: product.id,
            quantity: 1,
            order: order.id
        }
        dispatch(addItem(data));
    }


    return (
        <Container>
            <Paper>
                <MyImageCarousel images={product.images} />
                {/* <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={product.images[0].image}
                        alt="green iguana"
                    />
                </Card> */}
                {product && product.name}
                {console.log('product in product page', product)}

                <div>
                    <Button onClick={addToCart}>add to cart</Button>
                </div>
                <div>
                    <Button onClick={handleDelete}>delete</Button>
                </div>
            </Paper>
        </Container>
    )
}

export default ProductPage;