import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import UserContext from '../../contexts/UserContext';
import { getRecipe } from '../../utils/api'; 
import RichTextEditor from 'react-rte';

// Slate
// Import the Slate editor factory.
import { createEditor, Transforms } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import UploadPictureModal from '../modals/UploadPictureModal';

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
    const { user } = useContext(UserContext);
    const [recipe, setRecipe] = useState(null);
    const [recipeTitleField, setRecipeTitleField] = useState("My Recipe");
    const [file, setFile] = useState(null);
    const [uploadPictureModalOpen, setUploadPictureModalOpen] = useState(false);

    // fetch recipe from server
    useEffect(async () => {
        const initialRecipe = await getRecipe(props.match.params.id);
        if (!initialRecipe) {
            history.push('/');
            return;
        }
        setRecipe(initialRecipe);
    }, []);

    // Add the initial value when setting up our state.
    const changeInstructionsHandler = (newValue) => {
        //setValue(RichTextEditor.createValueFromString(newValue, 'html'));
        setValue(newValue);
        newValue.toString('html');
    }
    const [value, setValue] = useState(RichTextEditor.createEmptyValue());

    const handleChangeTitle = (e) => {
        setRecipeTitleField(e.target.value);
    }

    const previewRecipe = async () => {
        recipe.title = recipeTitleField;
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
            <UploadPictureModal
                open={uploadPictureModalOpen}
                setOpen={setUploadPictureModalOpen}
            />
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
                            onChange={handleChangeTitle}
                        />
                    </Grid>
                </Grid>
                <Grid container item spacing={3} direction="column">
                    <Grid container item xs={12} spacing={3}>
                        <Typography variant="h3" align="left">Recipe</Typography>
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                        <Paper elevation={3} style={{height: 400, width: 400}}>
                        <RichTextEditor
                            value={value}
                            onChange={changeInstructionsHandler}
                        />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container item spacing={3} direction="column">
                    <Grid container item xs={12} spacing={3}>
                        <Typography variant="h3" align="left">Pictures</Typography>
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                        <Box style={{height: '60%', width: '60%', background: '#7efcc8s' }}>
                            <DropzoneArea onChange={(file) => setFile(file[0])} filesLimit={1} />
                        </Box>

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
