import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Divider, Grid } from '@material-ui/core';
import { updateRecipe } from '../../utils/api';
import Tag from '../Tag';
import Font, { Text } from 'react-font'

export default function RecipePage(props) {
    const history = useHistory();
    const [recipe, setRecipe] = useState(null);
    const recipeRef = useRef(recipe);

    useEffect(() => {
        setRecipe(props.location.state.draftedRecipe);      // The recipe from the edit page
        const ing = recipe?.ingredients;
        console.log(ing);
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
                margin: '10%',
            }}
        >
            <Grid container direction="column" align="left" spacing={1}>
                <Grid item xs={12}>
                    <Text family="Yusei Magic" weight={700} style={{ fontSize: 30, margin: 0 }} >
                        {recipe?.title}
                    </Text>
                </Grid>
                <Grid container item xs={12} direction="column" spacing={1} style={{marginLeft: '1%' }}>
                    <Grid item xs={12}>
                        <Text family="Yusei Magic" weight={500} style={{ fontSize: 24 }} >
                            Ingredients
                        </Text>
                    </Grid>
                    <Grid item xs={12}>
                        <Text family="Roboto" weight={400} style={{ fontSize: 14, marginLeft: '3%' }} >
                            {recipe?.ingredients.map((i) => <li>{i}</li>) }
                        </Text>
                    </Grid>
                </Grid>
                <Grid container item xs={12} direction="column" spacing={1} style={{marginLeft: '1%' }}>
                    <Grid item xs={12}>
                        <Text family="Yusei Magic" weight={500} style={{ fontSize: 24 }} >
                            Instructions
                        </Text>
                    </Grid>
                    <Grid item xs={12}>
                        <Text family="Roboto" weight={400} style={{ fontSize: 14, marginLeft: '3%' }} >
                            {recipe?.instructions}
                        </Text>
                    </Grid>
                </Grid>
            </Grid>
            <Box 
                style={{
                    margin: '10%'
                }}
            >
                <Text family="Yusei Magic" weight={500} style={{ fontSize: 24 }} >
                    {recipe?.tags ? "Tags": "No tags"}
                </Text>
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
