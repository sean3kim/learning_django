import { React, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import { editApparel } from '../features/apparel/apparelThunks';

const EditApparelForm = () => {
    const [apparel, setApparel] = useState({});

    const navigate =  useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();

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
        location.state && setApparel({
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
        const data = {apparel, id: params.id}
        dispatch(editApparel(data))
        navigate('/products/apparel');
    }

    // have all the ?? because getting an error about how value was changing from undefined to a defined value
    //      ?? basically means if the left hand value does not exist, use the right hand value
    //      probably happening because taking a bit of time to load and set the apparel state
    return (
        <form onSubmit={handleSubmit}>
            {apparel && 
                <div>
                    <TextField
                        variant='outlined'
                        label='name'
                        name='name'
                        id='name'
                        required
                        value={apparel.name ?? ""}
                        onChange={(e) => setApparel({...apparel, name: e.target.value})}
                    />
                    <TextField
                        variant='outlined'
                        label='price'
                        name='price'
                        id='price'
                        type='number'
                        required
                        value={apparel.price ?? ""}
                        onChange={(e) => setApparel({...apparel, price: e.target.value})}
                    />
                    <TextField
                        variant='outlined'
                        label='description'
                        name='description'
                        id='description'
                        required
                        value={apparel.description ?? ""}
                        onChange={(e) => setApparel({...apparel, description: e.target.value})}
                    />
                    <TextField
                        variant='outlined'
                        label='quantity'
                        name='quantity'
                        id='quantity'
                        type='number'
                        required
                        value={apparel.quantity ?? ""}
                        onChange={(e) => setApparel({...apparel, quantity: e.target.value})}
                    />

                    <FormControl>
                        <InputLabel>tag</InputLabel>
                        <Select
                            key={apparel.tag}
                            variant='outlined'
                            label='tag'
                            name='tag'
                            id='tag'
                            style={{minWidth: 240}}
                            required
                            value={apparel.tag ?? ""}
                            onChange={(e) => setApparel({...apparel, tag: e.target.value})}
                        >
                            {all_tags.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel>size</InputLabel>
                        <Select
                            key={apparel.size}
                            variant='outlined'
                            label='size'
                            name='size'
                            id='size'
                            style={{minWidth: 240}}
                            required
                            value={apparel.size ?? ""}
                            onChange={(e) => setApparel({...apparel, size: e.target.value})}
                        >
                            {all_sizes.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel>gender</InputLabel>
                        <Select
                            key={apparel.gender}
                            variant='outlined'
                            label='gender'
                            name='gender'
                            id='gender'
                            style={{minWidth: 240}}
                            required
                            value={apparel.gender ?? ""}
                            onChange={(e) => setApparel({...apparel, gender: e.target.value})}
                        >
                            {all_genders.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <div>
                        <Button type='submit' variant='outlined'>add item</Button>
                    </div>
            </div>
            }
        </form>
    )
}

export default EditApparelForm;