import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { getRecipe } from '../../utils/api'; 
import RichTextEditor from 'react-rte';

const useStyles = makeStyles((theme) => ({
    parentBox: {
        marginTop: '5%',
        marginLeft: '10%',
        marginRight: '10%',
    },
    sectionHeadings: {
        variant: 'h2',
        align: 'left'
    }
  
  }));

export default function EditRecipePage(props) {
    const classes = useStyles();
    const history = useHistory();
    const [recipe, setRecipe] = useState(null);
    const [recipeTitleField, setRecipeTitleField] = useState("My Recipe");

    // fetch recipe from server
    useEffect(async () => {
        const initialRecipe = await getRecipe(props.match.params.id);
        if (!initialRecipe) {
            history.push('/');
            return;
        }
        setRecipe(initialRecipe);
    }, []);

    useEffect(() => {
        if(props.location.state?.editing) {
            const draftedRecipe = props.location.state.draftedRecipe;
            console.log("draftedRecipe: ", draftedRecipe);
            setRecipeTitleField(draftedRecipe.title);
            setInstructions(RichTextEditor.createValueFromString(draftedRecipe.instructions, 'html'));
        }
    }, []);

    const [instructions, setInstructions] = useState(RichTextEditor.createValueFromString('richVal', 'html'));

    // Add the initial value when setting up our state.
    const changeInstructionsHandler = (value) => {
        console.log("typeof value: " + typeof value);
        setInstructions(value);
    }

    const handleChangeTitle = (e) => {
        setRecipeTitleField(e.target.value);
    }

    const previewRecipe = async () => {
        recipe.title = recipeTitleField;
        recipe.instructions = instructions.toString('markdown');
        setRecipe(recipe);
        history.push({
            pathname: `/recipe/${recipe._id}`,
            state: { draftedRecipe: recipe }
        });
    }

    return(
        <Box
            className={classes.parentBox}
        >
            <Grid container spacing={10} direction="column">
                <Grid container item spacing={3} direction="column">
                    <Grid container item xs={4} spacing={3}>
                        <Typography variant="h3" align="left">Title</Typography>
                    </Grid>
                    <Grid container item xs={4} spacing={3}>
                        <TextField 
                            variant="outlined" 
                            color="primary" 
                            align="left" 
                            autoFocus={true}
                            defaultValue="My Recipe"
                            value={recipeTitleField}
                            onChange={handleChangeTitle}
                        />
                    </Grid>
                </Grid>
                <Grid container item spacing={3} direction="column">
                    <Grid container item xs={12} spacing={3}>
                        <Typography variant="h3" align="left">Recipe</Typography>
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                        <Paper elevation={3} style={{overflow: 'auto'}}>
                        <RichTextEditor
                            value={instructions}
                            onChange={changeInstructionsHandler}
                        />
                        </Paper>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Button onClick={previewRecipe} style={{backgroundColor: '#7efcc8'}}>
                        Preview Recipe
                    </Button>
                </Grid>
            </Grid>

        </Box>
    );
}
