import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon } from '@material-ui/icons';
import { Box, Fab, Grid } from '@material-ui/core';
import { Text } from 'react-font';
import UserContext from '../../contexts/UserContext';
import { createRecipe, getLibrary } from '../../utils/api';
import LibraryCard from '../LibraryCard';

const useStyles = makeStyles((theme) => ({
    parentBox: {
        marginTop: '1%',
        height: '93%',
        width: '100%',
        //border: '3px solid green',
    },
    headingBox: {
        margin: '3%'
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
        >
            <Box
                style={{
                    padding: '1%'
                }}
            >
                <Box className={classes.headingBox}>
                    <Text family="Courgette" style={{ fontSize: 40, margin: 0 }} >
                        My Recipe Library
                    </Text>
                </Box>
                <Grid container direction="column" spacing={3}>
                    {createdRecipes?.map((r, index) => 
                        <Grid container item direction="column" xs={12} alignItems="center" spacing={1} key={index}>
                            <LibraryCard recipe={r} />
                        </Grid>
                        ) 
                    }
                </Grid>
            </Box>
            <Fab
                className={classes.fab}
                onClick={newRecipe}
            >
                <AddIcon />
            </Fab>
        </Box>

    );
}

