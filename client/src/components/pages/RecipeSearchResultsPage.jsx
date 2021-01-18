import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import { blueGrey } from '@material-ui/core/colors';
import { recipeSearch } from '../../utils/api';

export default function RecipeSearchResultsPage(props) {

    const [recipes, setRecipes] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const history = useHistory();

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

    const RecipeRows = ({ recipes }) => (
        <>

            {recipes.map(recipe => (
                <Box
                    style={{
                        margin: "5px",
                        padding: "10px",
                        backgroundColor: blueGrey[700],
                        display: "flex",
                        flexDirection: "row",
                        borderRadius: 6,
                        fontSize: '1em',
                    }}
                >
                    <Grid container style={{ height: '10vh' }}>
                        <Grid item xs={2} align="center" onClick={() => history.push(`/recipe/${recipe._id}`)} style={{cursor: 'pointer'}}>
                            {recipe.name}
                        </Grid>
                        <Grid item xs={1} />
                    </Grid>
                </Box>
            ))}
        </>
    );
    return (
        <div style={{ color: 'white', left: 0 }}>
            <br />
            <br />
            <br />
            <Typography style={{ marginLeft: '100px', textAlign: "left" }} variant="h4">Search results for "{new URLSearchParams(props.location.search).get('query')}" ({totalResults}):</Typography>
            <Grid container >
                <Box style={{
                    maxHeight: '60vh',
                    overflow: 'auto',
                    display: 'inline-flex',
                    flexDirection: 'row',
                    backgroundColor: blueGrey[900],
                    marginTop: '2%',
                    marginLeft: '10%',
                    marginRight: '10%',
                    paddingLeft: '20px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    width: '90%',
                    height: '30%'
                }} boxShadow={3} borderRadius={12}>
                    <Box style={{
                        backgroundColor: blueGrey[900],
                        width: "33%",
                        textAlign: "center",
                        boxShadow: "3",
                        borderRadius: 6
                    }}>
                        Name
            </Box>
                    <Box style={{
                        backgroundColor: blueGrey[900],
                        width: "33%",
                        textAlign: "center",
                        boxShadow: 3,
                        borderRadius: 6
                    }}>
                        Collaborators
            </Box>
                    <Box style={{
                        backgroundColor: blueGrey[900],
                        width: "34%",
                        textAlign: "center",
                        boxShadow: "3",
                        borderRadius: 6
                    }}>
                        Favorites
            </Box>
                </Box>
                <Box style={{
                    marginLeft: "10%",
                    marginTop: '2%',
                    marginRight: '10%',
                    marginBottom: '10%',
                    padding: '10px',
                    borderRadius: 6,
                    backgroundColor: blueGrey[900],
                    width: '90%',
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

