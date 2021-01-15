import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import UserContext from '../../contexts/UserContext';
import { getRecipe, } from '../../utils/api';

export default function RecipePage(props) {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [recipe, setRecipe] = useState(null);
    const recipeRef = useRef(recipe);

    // useEffect(() => {
    //         getRecipe(fetchedRecipe => setRecipe(fetchedRecipe))   // just use this when fetching from db, not editing
    //     }
    // );

    useEffect(() => {
        setRecipe(props.location.state.draftedRecipe);      // The recipe from the edit page
        //console.log("Recipe photoURL: " + recipe.photoURL);
    });

    useEffect(() => recipeRef.current = recipe);

    const edit = () => {
        history.push({
            pathname: `/editrecipe/${recipe._id}`,
            state: { draftedRecipe: recipe, editing: true }
        });
    }

    return(
        <Box
            style={{
                marginTop: '10%',
            }}
        >
            <h1>Recipe Page</h1>
            <h3>
                Title: {recipe?.title}
            </h3>

            Instructions: {recipe?.instructions}
            <Button
                style={{
                    backgroundColor: 'red',
                    border: '1px solid black'
                }}
                onClick={edit}
            >
                Edit
            </Button>
        </Box>
    );
}
