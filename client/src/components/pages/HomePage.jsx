import React, {useContext, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';
import { Text } from 'react-font';
import HomeCard from '../HomeCard';
import UserContext from '../../contexts/UserContext';
import { getRandomRecipes } from '../../utils/api';

const useStyles = makeStyles((theme) => ({
    parentBox: {
        marginTop: '1%',
        height: '93%',
        width: '100%',
    },
    headingBox: {
        margin: '3%'
    },
  }));

/*
    TODO: Home Page
*/
export default function HomePage(props) {
    const history = useHistory();
    const classes = useStyles();

    const { user, setUser } = useContext(UserContext);
    const [recipesToday, setRecipesToday] = useState([]);

    useEffect(() => {
        if(user?.isLoggedIn) {
            getRandomRecipes(3).then(recipes => {
                setRecipesToday(recipes);
            });
        }
    },[recipesToday]);

    return(
        <Box className={classes.parentBox}>
            <Box
                style={{
                    padding: '1%'
                }}
            >
                <Box className={classes.headingBox}>
                    <Text family="Courgette" style={{ fontSize: 40, margin: 0 }} >
                        Recipes of the Day
                    </Text>
                </Box>
                <Grid container direction="column" spacing={3}>
                    {recipesToday?.map((r, index) => 
                        <Grid container item direction="column" xs={12} alignItems="center" spacing={1} key={index}>
                            <HomeCard recipe={r} />
                        </Grid>
                        )
                    }
                </Grid>
            </Box>
        </Box>
    );
}

