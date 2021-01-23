import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { LocalDining as LocalDiningIcon, AccessAlarm as AccessAlarmIcon } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import { blueGrey } from '@material-ui/core/colors';
import { recipeSearch } from '../../utils/api';
import { Text } from 'react-font';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: 'white',
        color: 'black',
        padding: '3%',
        margin: '3%',
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

export default function RecipeSearchResultsPage(props) {

    const [recipes, setRecipes] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        recipeSearch(new URLSearchParams(props.location.search).get('query'), currentPage)
        .then(res => {
            setRecipes(res.results);
            setTotalPages(res.totalPages);
            setTotalResults(res.totalResults);
            console.log("recipes: ", recipes);
            console.log("total pages: ", totalPages);
            console.log("total results: ", totalResults);
        });
    }, [currentPage, new URLSearchParams(props.location.search).get('query')]);

    const changePageHandler = (event, pageNumber) => {
        let newPageNumber;
        if (typeof(pageNumber) === 'string') { // weird hack to make material ui paginate component work for going to next page
            newPageNumber = Number(new URLSearchParams(props.location.search).get('page')) + 1;
        } else {
            newPageNumber = pageNumber;
        }
        setCurrentPage(pageNumber);
    };

    const viewRecipe = (recipe) => {
        history.push({
            pathname: `/recipe/${recipe._id}`,
            state: { draftedRecipe: recipe }
        });
    }

    const RecipeRows = ({ recipes }) => (
        <>
            {recipes.map(recipe => (
            <Paper
                elevation={8}
                className={classes.paper}
                onClick={() => viewRecipe(recipe)}
            >
                <Grid container direction="row" spacing={1}>
                    <Grid container item direction="column" xs={6}>
                        <Grid item xs={6}>
                            <Text family="Yusei Magic" style={{ fontSize: 24 }} >
                                {recipe?.title}
                            </Text>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Box alignItems="center" className={classes.box}>
                            <Grid container direction="column" spacing={2}>
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
            ))}
        </>
    );
    return (
        <div style={{ left: 0 }}>
            <br />
            <br />
            <br />
            <Text family="Yusei Magic" style={{ fontSize: 30 }} >
                Search results for "{new URLSearchParams(props.location.search).get('query')}" ({totalResults}):
            </Text>
            <Grid container >
                <Box style={{
                    marginLeft: "10%",
                    marginTop: '2%',
                    marginRight: '10%',
                    marginBottom: '10%',
                    padding: '10px',
                    width: '99%',
                }}>
                    <RecipeRows recipes={recipes} />
                    {totalPages > 1 ?
                        <Paper style={{display: 'inline-block'}}>
                            <Pagination count={totalPages} page={new URLSearchParams(props.location.search).get('page')} onChange={changePageHandler} />
                        </Paper>
                        : undefined
                    }
                </Box>
            </Grid>
        </div>
    )
}

