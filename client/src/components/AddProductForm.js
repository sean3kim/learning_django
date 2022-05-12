import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Input, Typography } from '@mui/material';

import { StyledPaperForm } from '../styles/PaperStyles';
import { addProduct } from '../features/product/productThunks';

const AddProductForm = () => {
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0.0);
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [tag, setTag] = useState("");
    const [size, setSize] = useState("");
    const [gender, setGender] = useState("");
    const [image, setImage] = useState([]);

    const navigate =  useNavigate();
    const dispatch = useDispatch();

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
    
    const handleImageChange = (e) => {
        const {length, ...files} = e.target.files;
        setImage(Object.values(files));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let prod = new FormData();
        prod.append('name', name);
        prod.append('price', price);
        prod.append('description', description);
        prod.append('quantity', quantity);
        prod.append('tag', tag);
        prod.append('size', size);
        prod.append('gender', gender);

        for (let i=0; i < image.length; i++) {
            prod.append(`image${i}`, image[i])
        }

        dispatch(addProduct({prod, type}));
        navigate('/products');
    }

    return (
        <StyledPaperForm>
            <Typography align='center' variant='h4'>add a new product</Typography>
            {console.log('image', image)}
            <form onSubmit={handleSubmit}>
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
                            variant='outlined'
                            label='tag'
                            name='tag'
                            id='tag'
                            style={{minWidth: 240}}
                            required
                            fullWidth
                            defaultValue=""
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    sx={{marginY: '1rem'}}
                    variant='outlined'
                    label='description'
                    name='description'
                    id='description'
                    required
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />



                <FormControl sx={{marginY: '1rem'}}>
                    <InputLabel>size</InputLabel>
                    <Select
                        variant='outlined'
                        label='size'
                        name='size'
                        id='size'
                        style={{minWidth: 240}}
                        required={type==='apparel' ? true: false}
                        fullWidth
                        defaultValue=""
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    >
                        {all_sizes.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl sx={{marginY: '1rem'}}>
                    <InputLabel>gender</InputLabel>
                    <Select
                        variant='outlined'
                        label='gender'
                        name='gender'
                        id='gender'
                        style={{minWidth: 240}}
                        required={type==='apparel' ? true: false}
                        fullWidth
                        defaultValue=""
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        {all_genders.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                    </Select>
                </FormControl>

                <label htmlFor="contained-button-file">
                    <Input 
                        inputProps={{
                            multiple: true,
                            accept:"image/*",
                            type:"file"
                        }}
                        sx={{marginBottom: 10}}
                        id="contained-button-file"
                        onChange={handleImageChange}/>
                </label>

                <div>
                    <Button type='submit' variant='outlined' fullWidth>add item</Button>
                </div>
            </form>
        </StyledPaperForm>
    )
}

export default AddProductForm;