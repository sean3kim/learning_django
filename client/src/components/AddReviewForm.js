import { React, useState } from 'react';
import { TextField, Button } from '@mui/material';

import axios from 'axios';
import { setAxiosConfig } from '../utils';

const AddReviewForm = ({user, productId}) => {
    const [title, setTitle] = useState('');
    const [reviewBody, setReviewBody] = useState('');
    const [rating, setRating] = useState(0);

    const url = 'http://localhost:8000/api'
    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = setAxiosConfig();
        const data = {
            title,
            body: reviewBody,
            rating,
            user,
            product: productId
        }
        const res = await axios.post(`${url}/reviews/`, data, config);
        console.log('submitted review data', res.data)
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField 
                sx={{marginY: '1rem'}}
                variant='outlined'
                label='title'
                name='title'
                id='title'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField 
                sx={{marginY: '1rem'}}
                variant='outlined'
                label='review'
                name='review'
                id='reviewBody'
                required
                value={reviewBody}
                onChange={(e) => setReviewBody(e.target.value)}
            />
            <TextField 
                sx={{marginY: '1rem'}}
                type='number'
                variant='outlined'
                label='rating'
                name='rating'
                id='rating'
                required
                value={rating}
                onChange={(e) => setRating(e.target.value)}
            />
            <div>
                <Button type='submit' variant='outlined'>add review</Button>
            </div>
        </form>
    )
}

export default AddReviewForm;