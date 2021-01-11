import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { Button } from '@material-ui/core';

function StartPage(props) {
    const history = useHistory();
    const { setUser } = useContext(UserContext);
    const loginAsGuest = () => setUser({ username: 'Guest', isGuest: true, isLoggedIn: true });

    return(
        <div style={{ 
            marginTop: '10%',
            justifyContent: 'center'
        }}>
                <Button 
                    onClick={() => history.push('/signup')}
                    style={{
                        backgroundColor: 'red',
                    }}
                >Sign up</Button>
                <Button
                    onClick={() => history.push('/login')}
                    style={{
                        backgroundColor: 'green',
                    }}
                >Log in</Button>
                <Button
                    style={{
                        backgroundColor: 'gray',
                    }}
                >Forgot Password</Button>
                <Button
                    onClick={() => loginAsGuest()}
                    style={{
                        backgroundColor: 'blue',
                    }}
                >Continue as Guest</Button>
        </div>
    );
}

export default StartPage;
