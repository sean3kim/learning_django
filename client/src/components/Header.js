import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/user/userThunks';

import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { StyledLink } from '../styles/LinkStyles';




const Header = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position='static'>
                <Toolbar sx={{bgcolor: 'black'}}>
                    <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
                        <StyledLink to='/'>C O N T A C T</StyledLink>
                    </Typography>
                    <StyledLink to='/orders' sx={{marginRight: 2}}>C A R T</StyledLink>
                    {isLoggedIn && isLoggedIn ?
                        (<Button onClick={() => dispatch(logoutUser())} color="inherit">L O G O U T</Button>):
                        (<span>
                            <StyledLink to='/users/login' sx={{marginRight: 2}}>L O G I N</StyledLink>
                            <StyledLink to='/users/register'>R E G I S T E R</StyledLink>
                        </span>)
                    }
                </Toolbar>
            </AppBar> 
        </Box>
    )
}

export default Header;