import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { registerUser } from '../features/user/userThunks';
import { StyledPaperForm } from '../styles/PaperStyles';

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {username, email, password, confirm};
        dispatch(registerUser(data));
        navigate('/products');
    }

    return (
        <StyledPaperForm>
            <Typography align='center' variant='h4'>register</Typography>
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
                    type='email'
                    label='email'
                    name='email'
                    id='email'
                    required
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <TextField
                    sx={{marginY: '1rem'}}
                    variant='outlined'
                    type='password'
                    label='confirm'
                    name='confirm'
                    id='confirm'
                    required
                    fullWidth
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />

                <div>
                    <Button type='submit' variant='outlined' fullWidth>register</Button>
                </div>
            </form>
        </StyledPaperForm>
    )
}

export default RegisterForm;