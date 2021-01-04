import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextareaAutosize } from '@material-ui/core';
import UserContext from '../../contexts/UserContext';
import { getRecipe, } from '../../utils/api';

function RecipePage(props) {
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
        <div>
            <TextareaAutosize 
                aria-label="minimum height" 
                rowsMin={5} 
                placeholder="Minimum 5 rows"
                onChange={(e) => changeHandler(e)}
            />
        </div>
    );
}

export default RecipePage;