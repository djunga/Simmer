import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { 
    Home as HomeIcon,
    LibraryBooksRounded as LibraryBooksRoundedIcon,
    AccountBoxRounded as AccountBoxRoundedIcon,
} from '@material-ui/icons';
import { getLibrary } from '../utils/api';

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

    const goHome = () => {
        history.push('/');
    }

    const goToLibrary = () => {
        console.log('goToLibrary');
        //history.push('/mylibrary');
        getLibrary()
        .then(history.push('/mylibrary'))
        .catch(err => console.log('error getting library'));
    }

    return(
            <Box
                style={{
                    height: '5%',
                    width: '100%',
                    padding: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
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
            </Box>
    );
}
