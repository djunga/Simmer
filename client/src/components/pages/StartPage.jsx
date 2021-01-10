import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

function StartPage(props) {
    const history = useHistory();

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
                    style={{
                        backgroundColor: 'blue',
                    }}
                >Continue as Guest</Button>
        </div>
    );
}

export default StartPage;
