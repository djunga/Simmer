import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import { 
    Home as HomeIcon,
    LibraryBooksRounded as LibraryBooksRoundedIcon,
    AccountBoxRounded as AccountBoxRoundedIcon,
} from '@material-ui/icons';
import UserContext from '../contexts/UserContext';
import { getLibrary, userLogout } from '../utils/api';

const useStyles = makeStyles((theme) => ({
    tab: {
        height: '100%',
        width: '10%',
        border: '2px solid #d32f2f',
        borderRadius: 3,
        margin: 3,
        paddingTop: 7,
        '&:hover': {
            border: '2px solid black',
        }

    },
  
  }));

export default function Navbar(props) {
    const history = useHistory();
    const classes = useStyles();
    
    const { user, setUser } = useContext(UserContext);

    useEffect(() => (
        console.log("props.visible: " + props.visible)
    )
      , []);

    const goHome = () => {
        history.push('/');
    }

    const logout = async () => {
        if (!user?.isGuest) {
          await userLogout();
        }
        history.push('/');
        setUser({ isLoggedIn: false });
      }
    //   {user?.isLoggedIn ?
    //     <Button style={{ margin: 'auto' }} onClick={() => logout()} variant="contained">Logout</Button>
    //     : undefined
    //   }
    const goToLibrary = () => {
        getLibrary()
        .then(history.push('/mylibrary'))
        .catch(err => console.log('error getting library'));
    }

    return(
            <Box
                style={user?.isLoggedIn ?
                {
                    height: '3%',
                    width: '100%',
                    padding: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }:
                {
                    visibility: 'hidden'
                }
            }
            > 
                <Box
                    className={classes.tab}
                    onClick={goHome}
                >
                    <HomeIcon />
                </Box>
                <Box
                    className={classes.tab}
                    onClick={goToLibrary}
                >
                    <LibraryBooksRoundedIcon />
                </Box>
                <Box
                    className={classes.tab}
                >
                    <AccountBoxRoundedIcon />
                </Box>
                <Button
                    onClick={() => logout()}
                    style={{
                        background: '#65e0da'
                    }}
                >
                    logout
                </Button>
            </Box>
    );
}
