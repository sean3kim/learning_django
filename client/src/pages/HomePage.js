import { React } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { Container, Paper } from '@mui/material';
import { StyledLink } from '../styles/LinkStyles';
import { TypeLight, TypeDark } from '../styles/TypographyStyles';

const TestLink = styled(Link, {
    name: 'testLink'
})({
    color: 'black',
    textDecoration: 'none',
    fontSize: '14px',
    padding: '0.3rem',
    marginY: '2rem',
    backgroundColor: 'white',
    borderRadius: '0.2rem',
})

const HomePage = () => {
    return (
        <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                <TypeLight variant='h3'>C O N T A C T</TypeLight>
                <TypeLight>Portland based climbing</TypeLight>
                <TestLink to={'/products'}>shop here</TestLink>
        </Container>
    )
}

export default HomePage;