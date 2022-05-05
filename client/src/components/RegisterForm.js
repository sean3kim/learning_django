import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { registerUser } from '../features/user/userThunks';

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
        navigate('/products/apparel');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant='outlined'
                    label='username'
                    name='username'
                    id='username'
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    variant='outlined'
                    type='email'
                    label='email'
                    name='email'
                    id='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    variant='outlined'
                    type='password'
                    label='password'
                    name='password'
                    id='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    variant='outlined'
                    type='password'
                    label='confirm'
                    name='confirm'
                    id='confirm'
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />

                <div>
                    <Button type='submit' variant='outlined'>register</Button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm;