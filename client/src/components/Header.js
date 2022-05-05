import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/user/userThunks';
import { Link } from 'react-router-dom';

const Header = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    return (
        <div>
            C O N T A C T
            {
                isLoggedIn && isLoggedIn ? 
                    (<button onClick={() => dispatch(logoutUser())}>logout</button>) : 
                    (<span><Link to='/users/login'>login</Link><Link to='/users/register'>register</Link></span>)
            }
            
        </div>
    )
}

export default Header;