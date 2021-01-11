import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { userLogin } from '../../utils/api';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

function LoginPage(props) {
    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loginError, setLoginError] = useState(null);
  
    const handlePassword = (e) => setPassword(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    


    function closeModal() {
        history.push(`/`);
        loginAsUser();
    }

    const loginAsUser = async () => {
        try {
          await userLogin(email, password);
          history.push('/login/success');
        } catch (err) {
          if (err?.response?.status === 401) {
            setLoginError('Incorrect email or password.');
          } else if (err?.response?.status === 400) {
            setLoginError('Please verify your account.');
          } else {
            setLoginError('Error logging in. Please try again later.')
          }
        }
      }

    const submit = () => {
        setOpen(true);
        setTimeout(closeModal, 1000);
    }
    return(
        <div style={{ backgroundColor: '#ffd5a8', height: '100vh' }}>
            <Modal 
                open={open}
                className={classes.modal}
            >
                <Box
                    style={{
                        backgroundColor: 'pink',
                        height: '300px',
                        width: '400px'
                    }}
                >
                    Log In successful! You will be redirected to a new Doc in about 1 second.
                </Box>
            </Modal>
            <h1>Log In</h1>
            <TextField
                label="Email"
                defaultValue=""
                onChange={handleEmail}
                value={email}
            />
            <TextField
                label="Password"
                defaultValue=""
                helperText="Enter your password."
                onChange={handlePassword}
                value={password}
            />
            <Button
                onClick={submit}
                style={{
                    backgroundColor: 'red',
                }}
            >
                Submit
            </Button>


        </div>
    );
}

export default LoginPage;
