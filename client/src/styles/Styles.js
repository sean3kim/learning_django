import { createTheme } from '@mui/material/styles';

const Colors = {
    white: '#F9F7F3',
    black: '#0D1321',
}


const theme = createTheme({
    palette: {
        primary: {
            main: Colors.black
        }
    }
})

export default theme;