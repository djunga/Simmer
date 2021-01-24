import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, Paper } from '@material-ui/core';
import { 
    Home as HomeIcon,
    LibraryBooksRounded as LibraryBooksRoundedIcon,
    AccountBoxRounded as AccountBoxRoundedIcon,
} from '@material-ui/icons';
import UserContext from '../contexts/UserContext';
import { userLogout } from '../utils/api';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
    tab: {
        height: '100%',
        width: '5%',
        border: '2px solid #d32f2f',
        borderRadius: 3,
        marginTop: '1%',
        padding: '1%',
        '&:hover': {
            border: '3px solid black',
        }
    },
  
  }));

export default function Navbar(props) {
    const history = useHistory();
    const classes = useStyles();
    
    const { user, setUser } = useContext(UserContext);

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

    const goToLibrary = () => {
        history.push('/mylibrary');
    }

    const goToMyAccount = () => {
        history.push('/myaccount');
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
                    {visibility: 'hidden'}
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
                    onClick={goToMyAccount}
                >
                    <AccountBoxRoundedIcon />
                </Box>
                <Button
                    onClick={() => logout()}
                    style={{
                        background: '#65e0da',
                        marginLeft: '2%',
                        marginRight: '2%',
                        marginTop: '1%',
                        height: 30,
                        width: 90,
                    }}
                >
                    logout
                </Button>
                <SearchBar />
            </Box>

            // <Box
            //     style={user?.isLoggedIn ?
            //     {
            //         height: '3%',
            //         width: '100%',
            //         padding: 5,
            //     }: { visibility: 'hidden' }
            // }
            // >
            //     <Grid container direction="row" spacing={1}>
            //         <Grid container item direction="row" xs={6} spacing={1}>
            //             <Grid item xs={4}>
            //                 <Box className={classes.tab} onClick={goHome}>
            //                     <HomeIcon />
            //                 </Box>
            //             </Grid>
            //             <Grid item xs={4}>
            //                 <Box className={classes.tab} onClick={goToLibrary} >
            //                     <LibraryBooksRoundedIcon />
            //                 </Box>
            //             </Grid>
            //             <Grid item xs={4}>
            //                 <Box className={classes.tab} onClick={goToMyAccount} >
            //                     <AccountBoxRoundedIcon />
            //                 </Box>
            //             </Grid>
            //         </Grid>
            //         <Grid container item direction="row" xs={6} spacing={1}>
            //             <Grid item xs={6}>
            //                 <Button onClick={() => logout()} style={{ background: '#65e0da'}}>
            //                     logout
            //                 </Button>
            //             </Grid>
            //         </Grid>
            //     </Grid>
            // </Box>
    );
}
