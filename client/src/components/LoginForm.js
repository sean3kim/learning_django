import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Typography } from '@mui/material';
import { loginUser } from '../features/user/userThunks';
import { useNavigate } from 'react-router-dom';

import { StyledPaperForm } from '../styles/PaperStyles';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {username, password};
        dispatch(loginUser(data))
        navigate('/products')
    }

    return (
        <StyledPaperForm>
            <Typography align='center' variant='h4'>login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{marginY: '1rem'}}
                    variant='outlined'
                    label='username'
                    name='username'
                    id='username'
                    required
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    sx={{marginY: '1rem'}}
                    variant='outlined'
                    type='password'
                    label='password'
                    name='password'
                    id='password'
                    required
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div>
                    <Button type='submit' variant='outlined' fullWidth>login</Button>
                </div>
            </form>
        </StyledPaperForm>
    )
}

export default LoginForm;