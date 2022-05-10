import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getLoginStatus } from '../features/user/userThunks';

/**
 * what kind of authentication do i need to check?
 *  is admin for creating etc products 
 *  is owner for changing order?
 */
const GetAdminAuth = ({children, redirectTo}) => {

    const dispatch =  useDispatch();

    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getLoginStatus());
    }, [])

    return user && (user.isStaff ? children : <Navigate to={redirectTo} />)
}

export default GetAdminAuth;