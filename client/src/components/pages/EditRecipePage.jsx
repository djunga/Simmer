import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Paper, StepContent, Stepper, Step, StepLabel, TextField, Typography } from '@material-ui/core';
import UserContext from '../../contexts/UserContext';

// Slate
// Import the Slate editor factory.
import { createEditor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

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
    const recipeRef = useRef(recipe);

    useEffect(() => recipeRef.current = recipe);

    const editor = useMemo(() => withReact(createEditor()), [])
  // Add the initial value when setting up our state.
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])

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
                        <TextField variant="outlined" color="black" align="left" />
                    </Grid>
                </Grid>
                <Grid container item spacing={3} direction="column">
                    <Grid container item xs={4} spacing={3}>
                        <Typography variant="h3" align="left">Recipe</Typography>
                    </Grid>
                    <Grid container item xs={4} spacing={3}>
                        <Paper elevation={3}> Sameday
                            <Slate
                                editor={editor}
                                value={value}
                                onChange={newValue => setValue(newValue)}
                            >
                                <Editable />
                            </Slate>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
