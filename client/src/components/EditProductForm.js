import { React, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';

import { editProduct } from '../features/product/productThunks';

import { StyledPaperForm } from '../styles/PaperStyles';

const EditProductForm = () => {
    const [type, setType] = useState("");
    const [product, setProduct] = useState({});

    const navigate =  useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();

    const all_types = [
        'apparel', 'climbing'
    ]
    const all_tags = [
        'shirts', 'pants', 'sweaters', 'chalk bags', 'chalk buckets', 'brushes', 'bottles'
    ]
    const all_sizes = [
        'small', 'medium', 'large', 'xlarge'
    ]
    const all_genders = [
        'mens', 'womens', 'other'
    ]

    useEffect(() => {
        location.state && setProduct({
            name: location.state.p.name,
            price: location.state.p.price,
            quantity: location.state.p.quantity,
            description: location.state.p.description,
            size: location.state.p.size,
            tag: location.state.p.tag_name,
            gender: location.state.p.gender,
        })
        
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {product, id: params.id, type}
        dispatch(editProduct(data))
        navigate('/products');
    }

    // have all the ?? because getting an error about how value was changing from undefined to a defined value
    //      ?? basically means if the left hand value does not exist, use the right hand value
    //      probably happening because taking a bit of time to load and set the product state
    return (
        <StyledPaperForm>
            <Typography align='center' variant='h4'>edit product</Typography>
            <form onSubmit={handleSubmit}>
                {product && 
                    <div>
                        <div>
                            <FormControl sx={{marginY: '1rem'}}>
                                <InputLabel>type</InputLabel>
                                <Select
                                    variant='outlined'
                                    label='type'
                                    name='type'
                                    id='type'
                                    style={{minWidth: 240}}
                                    required
                                    fullWidth
                                    defaultValue=""
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    {all_types.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                                </Select>
                            </FormControl>

                            <FormControl sx={{marginY: '1rem'}}>
                                <InputLabel>tag</InputLabel>
                                <Select
                                    key={product.tag}
                                    variant='outlined'
                                    label='tag'
                                    name='tag'
                                    id='tag'
                                    style={{minWidth: 240}}
                                    required
                                    fullWidth
                                    value={product.tag ?? ""}
                                    onChange={(e) => setProduct({...product, tag: e.target.value})}
                                >
                                    {all_tags.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </div>
                        <TextField
                            sx={{marginY: '1rem'}}
                            variant='outlined'
                            label='name'
                            name='name'
                            id='name'
                            required
                            fullWidth
                            value={product.name ?? ""}
                            onChange={(e) => setProduct({...product, name: e.target.value})}
                        />
                        <TextField
                            sx={{marginY: '1rem'}}
                            variant='outlined'
                            label='price'
                            name='price'
                            id='price'
                            type='number'
                            required
                            fullWidth
                            value={product.price ?? ""}
                            onChange={(e) => setProduct({...product, price: e.target.value})}
                        />
                        <TextField
                            sx={{marginY: '1rem'}}
                            variant='outlined'
                            label='description'
                            name='description'
                            id='description'
                            required
                            fullWidth
                            value={product.description ?? ""}
                            onChange={(e) => setProduct({...product, description: e.target.value})}
                        />
                        <TextField
                            sx={{marginY: '1rem'}}
                            variant='outlined'
                            label='quantity'
                            name='quantity'
                            id='quantity'
                            type='number'
                            required
                            fullWidth
                            value={product.quantity ?? ""}
                            onChange={(e) => setProduct({...product, quantity: e.target.value})}
                        />


                        <FormControl sx={{marginY: '1rem'}}>
                            <InputLabel>size</InputLabel>
                            <Select
                                key={product.size}
                                variant='outlined'
                                label='size'
                                name='size'
                                id='size'
                                style={{minWidth: 240}}
                                required
                                fullWidth
                                value={product.size ?? ""}
                                onChange={(e) => setProduct({...product, size: e.target.value})}
                            >
                                {all_sizes.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                            </Select>
                        </FormControl>

                        <FormControl sx={{marginY: '1rem'}}>
                            <InputLabel>gender</InputLabel>
                            <Select
                                key={product.gender}
                                variant='outlined'
                                label='gender'
                                name='gender'
                                id='gender'
                                style={{minWidth: 240}}
                                required
                                fullWidth
                                value={product.gender ?? ""}
                                onChange={(e) => setProduct({...product, gender: e.target.value})}
                            >
                                {all_genders.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                            </Select>
                        </FormControl>

                        <div>
                            <Button type='submit' variant='outlined' fullWidth>edit item</Button>
                        </div>
                </div>
                }
            </form>
        </StyledPaperForm>
    )
}

export default EditProductForm;