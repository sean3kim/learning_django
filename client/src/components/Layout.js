import { React } from 'react';
import { styled } from '@mui/system';

const StyledDiv = styled('div')(({theme}) => ({
    backgroundColor: 'black',
    minHeight: '100vh',
    margin: 0
}))

const Layout = ({children}) => {
    return (
        <StyledDiv>
            {children}
        </StyledDiv>
    )
}

export default Layout;