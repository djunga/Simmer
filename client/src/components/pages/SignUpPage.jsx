import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Grid,
        Modal, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { userSignup } from '../../utils/api';
import { Text } from 'react-font';
import passwordValidator from 'password-validator';
import emailValidator from 'email-validator';

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
    submitButton: {
        background: 'linear-gradient(45deg, #f00000 30%, #d45959 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',        color: 'white',
        fontSize: '20px',
        height: 48,
        width: '15%',
        padding: '0 30px',
    },
}));

function SignUpPage(props) {
    const classes = useStyles();
    const history = useHistory();
    
    const [open, setOpen] = React.useState(false);

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handlePassword = (e) => setPassword(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);

    const validateEmail = () => emailValidator.validate(email);

    const schema = new passwordValidator();
    schema
      .is().min(8)                                    // Minimum length 8
      .is().max(100)                                  // Maximum length 100
      .has().uppercase()                              // Must have uppercase letters
      .has().lowercase()                              // Must have lowercase letters
      .has().digits(1)                                // Must have at least 1 digits
      .has().not().spaces()                           // Should not have spaces
      .has().symbols(1)
    //.has().oneOf(['!', '@', '#', '$', '%', '&', '*']);
  
    const validatePassword = () => schema.validate(password);

    const [errorText, setErrorText] = useState("");
    
    function closeModal() {
        userSignup(email, password)
        .then(() => {
            setOpen(false);
            history.push('/');
          })
        .catch(err => setErrorText(err?.response?.data?.message));
    }

    const submit = () => {
        if (!validatePassword()) {
            setErrorText('Password must be at least 8 characters in length, with no spaces and at least 1 of the following: Uppercase, lowercase, number, special character (!, @, #, $, %, &, *).');
          } 
        else if (!validateEmail()) {
            setErrorText('Please enter a valid email address.');
        }
        else {
            setErrorText(null);
        }
        if (validatePassword() && validateEmail()) {
            setOpen(true);
            setTimeout(closeModal, 3000);
        }
        // else{
        //     setErrorText("Please fix the errors above.");
        // }
    }
    
    return(
        <Paper elevation={10} className={classes.parentPaper}>
            
            <Modal 
                open={open}
                className={classes.modal}
            >
                <Box
                    style={{
                        backgroundColor: '#ffd95c',
                        height: '300px',
                        width: '400px'
                    }}
                >
                    Sign Up successful! You will be redirected to Log In in about 3 seconds.
                </Box>
            </Modal>
            
            <Text family="Courgette" style={{ fontSize: 70 }}>
                Sign Up
            </Text>
            <Grid container direction="column" alignContent="center" spacing={1}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Email"
                        onChange={handleEmail}
                        value={email}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Password"
                        helperText={errorText}
                        onChange={handlePassword}
                        value={password}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={submit}
                        className={classes.submitButton}
                    >Submit</Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default SignUpPage;
