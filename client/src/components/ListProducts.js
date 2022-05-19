import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProduct, deleteProduct } from '../features/product/productThunks';

import { Button, Typography, Container, Grid, Card, CardMedia, CardActionArea } from '@mui/material';
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
                        <Card variant='outlined' sx={{borderRadius: '0.2rem', padding: '0.2rem'}}>
                            <CardActionArea disableRipple component={Link} to={`${p.id}`}>
                                <CardMedia 
                                    component='img'
                                    height='150'
                                    image={p.images[0].image}
                                />
                                <div>
                                    <Typography sx={{fontSize: '20px', float: 'left'}}>{p.name}</Typography>
                                    <Typography sx={{fontSize: '20px', float: 'right'}}>${p.price}</Typography>
                                </div>
                                <Typography sx={{color: '#524e4e', clear:'both'}}>{p.description}</Typography>
                            </CardActionArea>
                            {isAdmin && 
                                <div>
                                    <Link to={`edit/${p.id}`} state={{p}} style={{textDecoration: 'none', marginRight: '0.2rem'}}>
                                        <Button variant='outlined' size='small'>
                                            edit
                                        </Button>
                                    </Link>
                                    <Button variant='outlined' size='small' onClick={() => dispatch(deleteProduct(p.id))}>delete</Button>
                                </div>
                            }
                        </Card>
                    </Grid>
                )}
            </Grid> 
            {isAdmin &&
                <div>
                    <StyledLink to='/products/new'>add</StyledLink>
                </div>
            }
        </Container>
    )
}

export default ListProducts