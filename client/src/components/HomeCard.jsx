import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LocalDining as LocalDiningIcon, AccessAlarm as AccessAlarmIcon } from '@material-ui/icons';
import { Text } from 'react-font'

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: 'white',
        color: 'black',
        padding: '3%',
        minWidth: '70%',
        border: '4px solid orange',
        '&:hover': {
            border: '4px solid red',
            cursor: 'pointer'
        }
    },
    box: {
        border: '4px dashed black',
        padding: '3%',
        minWidth: '40%'
    },
  }));

export default function HomeCard(props) {
    const classes = useStyles();
    const { recipe } = props;
    const history = useHistory();

    const viewRecipe = () => {
        history.push({
            pathname: `/recipe/${recipe._id}`,
            state: { draftedRecipe: recipe }
        });
    }

    return(
        <Paper
            elevation={8}
            className={classes.paper}
            onClick={viewRecipe}
        >
            <Grid container direction="row" xs={12} spacing={1}>
                <Grid container item direction="column" xs={6}>
                    <Grid item xs={6} spacing={1}>
                        <Text family="Yusei Magic" weight={700} style={{ fontSize: 24 }} >
                            {recipe?.title}
                        </Text>
                    </Grid>
                </Grid>
                <Grid item xs={6} spacing={1}>
                    <Box alignItems="center" className={classes.box}>
                        <Grid container direction="column" spacing={2} xs={12}>
                            <Grid container item direction="row" spacing={1} xs={12} style={{ display: 'inline'}}>
                                <Grid item xs={12}>
                                    <AccessAlarmIcon style={{marginRight: '10%'}} />
                                    Prep Time: {recipe?.prepTime}
                                </Grid>
                            </Grid>    
                            <Grid container item direction="row" spacing={1} xs={12}>
                                <Grid item xs={12}>
                                    <LocalDiningIcon style={{marginRight: '10%'}}  />
                                    Number of Servings: {recipe?.servings}
                                </Grid>
                            </Grid>                  
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}
