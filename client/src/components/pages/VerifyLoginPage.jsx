import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { verifyUserLoggedIn } from '../../utils/api';

function VerifyLoginPage(props) {
    const history = useHistory();

    const { setUser } = useContext(UserContext);

    useEffect(async () => {
        const user = await verifyUserLoggedIn();
        setUser({ isLoggedIn: true, isGuest: false, ...user });
        history.push('/');
    }, []);

    return (
        <div>
            <h1>Logging in...</h1>
        </div>
    )
}

export default VerifyLoginPage;
