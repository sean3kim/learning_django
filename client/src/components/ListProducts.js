import { React, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllApparel, deleteApparel } from '../features/apparel/apparelThunks';

import {Button } from '@mui/material';

const ListProducts = () => {

    const dispatch = useDispatch();

    const products = useSelector((state) => Object.values(state.apparel.apparelById))

    useEffect(() => {
        dispatch(getAllApparel());
    }, [])

    return (
        <div>
            {/* the <Link> will build relative to current URL ?? */}
            {products && products.map((p, index) => 
                <div key={index}>
                    <Link to={`${p.id}`}>{p.name}</Link>
                    <br></br>
                    <Link to={`edit/${p.id}`} state={{p}}>edit</Link>
                    <Button onClick={() => dispatch(deleteApparel(p.id))}>delete</Button>
                </div>
            )}
            <div>
                <Link to='/products/apparel/new'>add</Link>
            </div>
        </div>
    )
}

export default ListProducts