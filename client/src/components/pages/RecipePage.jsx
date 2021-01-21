import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Grid } from '@material-ui/core';
import { updateRecipe } from '../../utils/api';
import Tag from '../Tag';

export default function RecipePage(props) {
    const history = useHistory();
    const [recipe, setRecipe] = useState(null);
    const recipeRef = useRef(recipe);

    useEffect(() => {
        setRecipe(props.location.state.draftedRecipe);      // The recipe from the edit page
    });

    useEffect(() => recipeRef.current = recipe);

    const edit = () => {
        history.push({
            pathname: `/editrecipe/${recipe._id}`,
            state: { draftedRecipe: recipe, editing: true }
        });
    }

    const saveRecipe = async () => {
        updateRecipe(recipe);
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
            <Box 
                style={{
                    margin: '10%'
                }}
            >
                <Grid container direction="row" spacing={1}>
                    {recipe?.tags.map((t) => <Tag name={t} count={0} />) }
                </Grid>
            </Box>
            <Button
                style={{
                    backgroundColor: '#ffb45e',
                    border: '1px solid black',
                    marginRight: '10px'
                }}
                onClick={edit}
            >
                Edit
            </Button>
            <Button
                style={{
                    backgroundColor: '#93d5db',
                    border: '1px solid black',
                    marginLeft: '10px'
                }}
                onClick={saveRecipe}
            >
                Save recipe
            </Button>
        </Box>
    );
}
