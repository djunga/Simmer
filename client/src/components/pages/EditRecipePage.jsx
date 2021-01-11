import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, StepContent, Stepper, Step, StepLabel } from '@material-ui/core';
import UserContext from '../../contexts/UserContext';

// Slate
// Import the Slate editor factory.
import { createEditor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

export default function EditRecipePage(props) {
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
            style={{
                marginTop: '10%',
            }}
        >
            <Slate
                editor={editor}
                value={value}
                onChange={newValue => setValue(newValue)}
            >
                <Editable />
            </Slate>
        </Box>
    );
}
