import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
//import { HelpIcon as HelpOutlineIcon } from '@material-ui/icons';
import { getRecipe } from '../../utils/api'; 
import RichTextEditor from 'react-rte';
import ChipInput from 'material-ui-chip-input-without-variants';

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
    const [instructions, setInstructions] = useState(RichTextEditor.createValueFromString('Start writing your recipe here!', 'html'));
    const [ingredients, setIngredients] = useState(RichTextEditor.createValueFromString('Click the bullet points in the toolbar above and start listing your ingredients here!', 'html'));
    const [tags, setTags] = useState([]);
    const [titleError, setTitleError] = useState(false);
    const [titleErrorText, setTitleErrorText] = useState("");
    const [instructionsError, setInstructionsError] = useState(false);
    const [instructionsErrorText, setInstructionsErrorText] = useState("");
    const [ingredientsError, setIngredientsError] = useState(false);
    const [ingredientsErrorText, setIngredientsErrorText] = useState("");

    /**
     * The toolbar in the rte, for instructions.
    */
    const toolbarInstructions = {
        // Optionally specify the groups to display (displayed in the order listed).
        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS',  'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
        INLINE_STYLE_BUTTONS: [
          {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
          {label: 'Italic', style: 'ITALIC'},
          {label: 'Underline', style: 'UNDERLINE'}
        ],
        BLOCK_TYPE_DROPDOWN: [
          {label: 'Normal', style: 'unstyled'},
          {label: 'Heading Large', style: 'header-one'},
          {label: 'Heading Medium', style: 'header-two'},
          {label: 'Heading Small', style: 'header-three'}
        ],
        BLOCK_TYPE_BUTTONS: [
          {label: 'UL', style: 'unordered-list-item'},
          {label: 'OL', style: 'ordered-list-item'}
        ]
      };

          /**
     * The toolbar in the rte, for ingredients.
    */
      const toolbarIngredients = {
        // Optionally specify the groups to display (displayed in the order listed).
        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS',  'HISTORY_BUTTONS'],

        BLOCK_TYPE_BUTTONS: [
          {label: 'UL', style: 'unordered-list-item'},
        ]
      };

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
            setRecipeTitleField(draftedRecipe.title);
            setInstructions(RichTextEditor.createValueFromString(draftedRecipe.instructions, 'html'));
            setTags(draftedRecipe.tags);
        }
    }, []);

    // The rte adds a newline to each ingredient. This method removes it.
    const formatRTEArray = (arr) => {
        var a = arr;
        for (var i=0; i< a.length; i++) {
            var ingredient = a[i].toString('markdown');
            a[i] = ingredient.substring(0, ingredient.length-1);
        }
        return a;
    }
    // Add the initial value when setting up our state.
    const changeIngredientsHandler = (value) => {
        setIngredients(value);
        const i = value.toString('markdown');
        var arr = i.split("-");
        console.log(arr);
    }

    // Add the initial value when setting up our state.
    const changeInstructionsHandler = (value) => {
        setInstructions(value);
        const i = value.toString('markdown');
        console.log("instructions: ", i);
        console.log("Length: " + i.length);
        if(i.length < 20 || i.length > 5000) {
            console.log("error true");
            setInstructionsError(true);
            setInstructionsErrorText("* The Instructions must be between 20 and 5000 characters.");
        }
        else {
            console.log("error false");
            setInstructionsError(false);
            setInstructionsErrorText("");
        }
    }

    const handleChangeTitle = (e) => {
        const inputValue = e.target.value;
        setRecipeTitleField(inputValue);
        console.log("Length: " + inputValue.length);
        if(inputValue.length < 5 || inputValue.length > 100) {
            console.log("error true");
            setTitleError(true);
            setTitleErrorText("* The title must be between 5 and 100 characters.");
        }
        else {
            console.log("error false");
            setTitleError(false);
            setTitleErrorText("");
        }
    }

    const handleChipsChange = (chips) => {
        setTags(chips);
    }

    const previewRecipe = async () => {
        recipe.title = recipeTitleField;
        var a = formatRTEArray(ingredients.toString('markdown').split("-"));
        console.log(a);
        recipe.ingredients = a;
        var i = instructions.toString('markdown');
        recipe.instructions = i.substring(0, i.length-1);
        recipe.tags = tags;
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
                    <Grid container item xs={6} spacing={1}>
                        <TextField 
                            error={titleError}
                            variant="outlined" 
                            color="primary" 
                            align="left" 
                            fullWidth={true}
                            helperText={titleErrorText}
                            label="Title of Recipe"
                            autoFocus={true}
                            defaultValue="My Recipe"
                            value={recipeTitleField}
                            onChange={handleChangeTitle}
                        />
                        
                    </Grid>
                </Grid>
                <Grid container item spacing={3} direction="column">
                    <Grid container item xs={12} spacing={3}>
                        <Typography variant="h3" align="left">Ingredients</Typography>
                    </Grid>
                    <Grid container item xs={12} spacing={1}>
                        <Paper elevation={3} style={{ width: '100%', overflow: 'auto'}}>
                            <RichTextEditor
                                toolbarConfig={toolbarIngredients}
                                value={ingredients}
                                onChange={changeIngredientsHandler}
                            />
                        </Paper>
                        <Box
                            style={{
                                color: 'red',
                                height: "10%",
                                width: "100%",
                            }}
                        >
                           {ingredientsErrorText}
                        </Box>
                    </Grid>
                </Grid>
                <Grid container item spacing={3} direction="column">
                    <Grid container item xs={12} spacing={3}>
                        <Typography variant="h3" align="left">Recipe Instructions</Typography>
                    </Grid>
                    <Grid container item xs={12} spacing={1}>
                        <Paper elevation={3} style={{ width: '100%', overflow: 'auto'}}>
                            <RichTextEditor
                                toolbarConfig={toolbarInstructions}
                                value={instructions}
                                onChange={changeInstructionsHandler}
                            />
                        </Paper>
                        <Box
                            style={{
                                color: 'red',
                                height: "10%",
                                width: "100%",
                            }}
                        >
                           {instructionsErrorText}
                        </Box>
                    </Grid>
                </Grid>
                <Grid container item spacing={3} direction="column">
                    <Grid container item xs={12} spacing={3}>
                        <Typography variant="h3" align="left">Add Tags</Typography>
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                        <Paper elevation={3} style={{overflow: 'auto'}}>
                            <ChipInput
                                defaultValue={tags}
                                onChange={(chips) => handleChipsChange(chips)}
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
