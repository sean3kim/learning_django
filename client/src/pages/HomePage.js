import { React } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            C O N T A C T
            <Link to={'/products'}>to products page</Link>
        </div>
    )
}

export default HomePage;