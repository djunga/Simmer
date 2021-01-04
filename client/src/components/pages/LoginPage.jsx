import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createRecipe, userLogin } from '../../utils/api';

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
    //const [open, setOpen] = useState(false);
    const [open, setOpen] = React.useState(false);

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
  
    const handlePassword = (e) => setPassword(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);

    const [errorText, setErrorText] = useState(null);
    
    function closeModal() {
        userLogin(email, password)
        .then(() => {
            setOpen(false);
            createRecipe()
            .then(recipeId => history.push(`/recipe/${recipeId}`))
            .catch(err => alert(err));
          })
        .catch(err => setErrorText(err?.response?.data?.message));
    }

    const submit = () => {
        setOpen(true);
        setTimeout(closeModal, 2000);
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
                    Log In successful! You will be redirected to a new Doc in about 2 seconds.
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
