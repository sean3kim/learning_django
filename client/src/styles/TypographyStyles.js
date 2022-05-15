import { styled } from '@mui/system';
import { Typography } from '@mui/material';

export const TypeLight = styled(Typography, {
    name: "TypeLight"
})({
    color: 'white',
    // fontSize: '14px',
})

export const TypeDark = styled(Typography, {
    name: "TypeDark"
})({
    color: 'black',
    fontSize: '14px',
})