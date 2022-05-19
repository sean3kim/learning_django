import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { setAxiosConfig } from '../utils';
import axios from 'axios';

const ListReviews = ({revs}) => {
    const reviews = useSelector((state) => 
        Object.values(state.review.byId).filter((rev) => revs.includes(rev.id)))

    return (
        <div>
            {reviews.map((review, index) => <Typography key={index}>{review.title}</Typography>)}
        </div>
    )
}

export default ListReviews;