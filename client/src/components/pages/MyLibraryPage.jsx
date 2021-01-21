import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon } from '@material-ui/icons';
import { Box, Fab } from '@material-ui/core';
import UserContext from '../../contexts/UserContext';
import { createRecipe, getLibrary } from '../../utils/api';

const useStyles = makeStyles((theme) => ({
    parentBox: {
        marginTop: '1%',
        height: '93%',
        width: '100%',
        border: '3px solid green',
    },
    fab: {
        position: 'absolute',
        top: '85%',
        left: '90%',
        background: 'red',
        color: 'white'
    }
  
  }));

/*
    TODO: Library
*/
export default function MyLibraryPage(props) {
    const history = useHistory();
    const classes = useStyles();

    const { user, setUser } = useContext(UserContext);
    const [createdRecipes, setCreatedRecipes] = useState([]);

    // fetch the user's recipes from the db
    useEffect(() => {
        if(user.email) {
            getLibrary(user.email)
            .then(
                recipes => {
                    setCreatedRecipes(recipes);
                }
        ).catch(err => console.log('error getting library'));
        }

      }, [user.email]);

    const newRecipe = async () => {
        createRecipe()
        .then(recipeId => history.push(`/editrecipe/${recipeId}`))
        .catch(err => alert(err));
    }

    return(
        <Box
            className={classes.parentBox}
        >   my library
            <Fab
                className={classes.fab}
                onClick={newRecipe}
            >
                <AddIcon />
            </Fab>
        </Box>

    );
}

