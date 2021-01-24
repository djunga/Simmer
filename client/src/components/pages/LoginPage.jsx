import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Grid, Modal, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { userLogin } from '../../utils/api';
import { Text } from 'react-font';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    parentPaper: {
        margin: '20%',
        padding: '5%',
        justifyContent: 'center',
        backgroundColor: '#ffad54',
        height: '100vh'
    },
    loginButton: {
        background: 'linear-gradient(45deg, #3e8a3a 30%, #74e66e 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',        color: 'white',
        fontSize: '20px',
        height: 48,
        width: '25%',
        padding: '0 30px',
    },
}));

function LoginPage(props) {
    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loginError, setLoginError] = useState("");
  
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
            alert('Incorrect email or password.');
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
        setTimeout(closeModal, 3000);
    }
    
    return(
        <Paper elevation={10} className={classes.parentPaper}>
            <Modal 
                open={open}
                className={classes.modal}
            >
                <Paper
                    elevation={8}
                    style={{
                        margin: '20%',
                        padding: '5%',
                        justifyContent: 'center',
                        backgroundColor: '#ffad54',
                    }}
                >
                    <Text family="Courgette" style={{ fontSize: 36 }}>
                        Log In successful! You will be redirected in about 3 seconds.
                    </Text>
                </Paper>
            </Modal>
            <Text family="Courgette" style={{ fontSize: 70 }}>
                Log In
            </Text>
            <Grid container direction="column" alignContent="center" spacing={1}>
                <Grid item xs={6}>
                    <TextField
                        label="Email"
                        onChange={handleEmail}
                        value={email}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Password"
                        onChange={handlePassword}
                        value={password}
                        helperText={loginError}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button
                        onClick={submit}
                        className={classes.loginButton}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default LoginPage;
