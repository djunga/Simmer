import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../../contexts/UserContext';
import { Button, Grid, Paper } from '@material-ui/core';
import { Text } from 'react-font'

const useStyles = makeStyles((theme) => ({
    parentPaper: {
        margin: '1%',
        padding: '5%',
        justifyContent: 'center',
        backgroundColor: '#ffad54'
    },
    sectionHeadings: {
        variant: 'h2',
        align: 'left'
    },
    signUpButton: {
        background: 'linear-gradient(45deg, #f00000 30%, #d45959 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',        color: 'white',
        fontSize: '20px',
        height: 48,
        width: '25%',
        padding: '0 30px',
    },
    logInButton: {
        background: 'linear-gradient(45deg, #3e8a3a 30%, #74e66e 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',        color: 'white',
        fontSize: '20px',
        height: 48,
        width: '25%',
        padding: '0 30px',
    },
    guestButton: {
        background: 'linear-gradient(45deg, #1e008c 30%, #643afc 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',
        color: 'white',
        fontSize: '20px',
        height: 48,
        width: '25%',
        padding: '0 30px',
    },
  }));

function StartPage(props) {
    const classes = useStyles();
    const history = useHistory();
    const { setUser } = useContext(UserContext);
    const loginAsGuest = () => setUser({ username: 'Guest', isGuest: true, isLoggedIn: true });

    return(
        <Paper elevation={8} className={classes.parentPaper}>
            <Text family="Courgette" style={{ fontSize: 70 }}>
                Simmer
            </Text>
            <Grid container direction="column" spacing={1}>
                <Grid item xs={12}>
                    <Button 
                        onClick={() => history.push('/signup')}
                        className={classes.signUpButton}
                    >Sign up</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={() => history.push('/login')}
                        className={classes.logInButton}
                    >Log in</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={() => loginAsGuest()}
                        className={classes.guestButton}
                    >Continue as Guest</Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default StartPage;
