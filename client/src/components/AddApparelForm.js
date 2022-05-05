import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import { addApparel } from '../features/apparel/apparelThunks';

const AddApparelForm = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0.0);
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [tag, setTag] = useState("");
    const [size, setSize] = useState("");
    const [gender, setGender] = useState("");

    const navigate =  useNavigate();
    const dispatch = useDispatch();

    const all_tags = [
        'shirts', 'pants', 'sweaters', 'chalk bags', 'chalk buckets', 'brushes', 'bottles'
    ]
    const all_sizes = [
        'small', 'medium', 'large', 'xlarge'
    ]
    const all_genders = [
        'mens', 'womens', 'other'
    ]
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name,
            price,
            description,
            quantity,
            tag,
            size,
            gender
        }
        dispatch(addApparel(data))
        navigate('/products/apparel');
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                variant='outlined'
                label='name'
                name='name'
                id='name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                variant='outlined'
                label='price'
                name='price'
                id='price'
                type='number'
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
                variant='outlined'
                label='description'
                name='description'
                id='description'
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
                variant='outlined'
                label='quantity'
                name='quantity'
                id='quantity'
                type='number'
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />


            <FormControl>
                <InputLabel>tag</InputLabel>
                <Select
                    variant='outlined'
                    label='tag'
                    name='tag'
                    id='tag'
                    style={{minWidth: 240}}
                    required
                    defaultValue=""
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                >
                    {all_tags.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel>size</InputLabel>
                <Select
                    variant='outlined'
                    label='size'
                    name='size'
                    id='size'
                    style={{minWidth: 240}}
                    required
                    defaultValue=""
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                >
                    {all_sizes.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel>gender</InputLabel>
                <Select
                    variant='outlined'
                    label='gender'
                    name='gender'
                    id='gender'
                    style={{minWidth: 240}}
                    required
                    defaultValue=""
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    {all_genders.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                </Select>
            </FormControl>

            <div>
                <Button type='submit' variant='outlined'>add item</Button>
            </div>
        </form>
    )
}

export default AddApparelForm;