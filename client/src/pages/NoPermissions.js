import { React } from 'react';
import { Link } from 'react-router-dom';

const NoPermissions = () => {
    return (
        <div>
            you do not have permissions to access that page. please login as an admin
            <div>
                <Link to='/products'>back to shop</Link>
            </div>
        </div>
    )
}

export default NoPermissions;
