import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Divider, Stack, Typography } from '@mui/material';
import { setAxiosConfig } from '../utils';
import axios from 'axios';

const ListReviews = ({revs}) => {
    const reviews = useSelector((state) => 
        Object.values(state.review.byId).filter((rev) => revs.includes(rev.id)));

    return (
        <div style={{padding: '10px'}}>
            {reviews.map((review, index) => 
                <Stack key={index}>
                    <Divider sx={{borderColor: 'black'}}/>
                    <Typography variant='h6'>{review.title}</Typography>
                    <Typography variant='caption'>by: {review.user}</Typography>
                    <Typography>{review.body}</Typography>
                    <Typography>{review.rating}</Typography>
                </Stack>
            )}
            <Divider sx={{borderColor: 'black'}}/>
        </div>
    )
}

export default ListReviews;