import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: '#a3eeff',
        color: '#5b5fcf',
        padding: '3%',
        border: '4px solid red',
        '&:hover': {
            border: '2px solid black',
        }
    },
  
  }));

export default function LibraryCard(props) {
    const classes = useStyles();
    const { recipe } = props;

    return(
        <Paper
            elevation={8}
            className={classes.paper}
        >
            {recipe?.title}
        </Paper>
    );
}
