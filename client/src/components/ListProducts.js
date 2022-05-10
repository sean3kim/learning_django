import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProduct, deleteProduct } from '../features/product/productThunks';

import { Button, Typography, Container, Grid, Card } from '@mui/material';
import { StyledLink } from '../styles/LinkStyles';

const ListProducts = () => {

    const dispatch = useDispatch();

    const products = useSelector((state) => Object.values(state.product.byId));
    const isAdmin = useSelector((state) => state.user.isStaff);

    useEffect(() => {
        dispatch(getAllProduct());
    }, [])

    return (
        <Container>
            <Grid container rowSpacing={2} columnSpacing={2}>
                {/* the <Link> will build relative to current URL ?? */}
                {products && products.map((p, index) => 
                    <Grid item xs={4} key={index}>
                        <Card variant='outlined'>
                            <Link to={`${p.id}`}>{p.name}</Link>
                            <Typography>{p.price}</Typography>
                            <Typography>{p.description}</Typography>
                            {isAdmin && 
                                <div>
                                    <Link to={`edit/${p.id}`} state={{p}}>edit</Link>
                                    <Button onClick={() => dispatch(deleteProduct(p.id))}>delete</Button>
                                </div>
                            }
                        </Card>
                    </Grid>
                )}
            </Grid> 
            <div>
                <StyledLink to='/products/new'>add</StyledLink>
            </div>
        </Container>
    )
}

export default ListProducts