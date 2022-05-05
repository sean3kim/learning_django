import { React } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            C O N T A C T
            <Link to={'/products/apparel'}>to apparels page</Link>
        </div>
    )
}

export default HomePage;