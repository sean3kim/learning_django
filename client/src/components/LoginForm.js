import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { loginUser } from '../features/user/userThunks';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    // const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {username, password};
        dispatch(loginUser(data))
        navigate('/products/apparel')
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
                {/* <TextField
                    variant='outlined'
                    label='email'
                    name='email'
                    id='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /> */}
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

                <div>
                    <Button type='submit' variant='outlined'>login</Button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;