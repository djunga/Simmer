import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button,
        Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { userSignup } from '../../utils/api';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

function SignUpPage(props) {
    const classes = useStyles();
    const history = useHistory();
    //const [open, setOpen] = useState(false);
    const [open, setOpen] = React.useState(false);

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
  
    const handlePassword = (e) => setPassword(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);

    const [errorText, setErrorText] = useState(null);
    
    function closeModal() {
        userSignup(email, password)
        .then(() => {
            setOpen(false);
            history.push('/');
          })
        .catch(err => setErrorText(err?.response?.data?.message));
    }

    const submit = () => {
        setOpen(true);
        setTimeout(closeModal, 3000);
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
                    Sign Up successful! You will be redirected to Log In in about 3 seconds.
                </Box>
            </Modal>
            
            <h1>Sign Up</h1>
            <TextField
                label="Email"
                defaultValue=""
                onChange={handleEmail}
                value={email}
            />
            <TextField
                label="Password"
                defaultValue=""
                helperText="Some restrictions for the password"
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

export default SignUpPage;
