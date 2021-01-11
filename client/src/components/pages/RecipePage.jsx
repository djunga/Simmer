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
    useEffect(
        () => console.log("user: " + user.isLoggedIn)
    );

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
            <TextareaAutosize 
                aria-label="minimum height" 
                rowsMin={5} 
                placeholder="Minimum 5 rows"
                onChange={(e) => changeHandler(e)}
            />
        </Box>
    );
}
