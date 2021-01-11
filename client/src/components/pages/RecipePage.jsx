import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextareaAutosize } from '@material-ui/core';
import UserContext from '../../contexts/UserContext';
import { getRecipe, } from '../../utils/api';

export default function RecipePage(props) {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [recipe, setRecipe] = useState(null);
    const recipeRef = useRef(recipe);

    useEffect(() => recipeRef.current = recipe);

    const changeHandler = (e) => {
        var changedText = e.target.value;
        console.log(changedText);
    }

    return(
        <Box
            style={{
                marginTop: '10%',
            }}
        >
            <h1>Recipe Page</h1>
            <h3>
            RecipePage: Load a recipe that has already been made, from the database, or for previewing a recipe that's done being edited
            </h3>

            <br/>
            <h3>    -Navigate here when the user goes to their library and clicks a recipe, and when they are done editing a recipe</h3>
        </Box>
    );
}
