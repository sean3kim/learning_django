import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneApparel, deleteApparel } from '../features/apparel/apparelThunks';
import { Button } from '@mui/material';

const ProductPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let params = useParams();
    let product = useSelector((state) => state.apparel.apparelById[params.id])

    // if the item is in the store already, grab from there
    // else dispatch an action to retrieve from server
    useEffect(() => {
        if (product === undefined) {
            dispatch(getOneApparel(params.id));
        }
    }, [product])

    const handleDelete = () => {
        dispatch(deleteApparel(product.id));
        navigate('/products/apparel')
    }

    return (
        <div>
            {console.log("product", product)}
            {product && product.name}

            <div>
                <Button onClick={handleDelete}>delete</Button>
            </div>
        </div>
    )
}

export default ProductPage;