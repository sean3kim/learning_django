import { styled } from '@mui/system';
import { TextField } from '@mui/material';

export const StyledTextField = styled(TextField, {
    name: 'StyledTextField'
})({
    '.MuiFormControl-root': {
        marginY: 10,
    }
})