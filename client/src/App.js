import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from './contexts/UserContext';
import Navbar from './components/Navbar';
import StartPage from './components/pages/StartPage';
import SignUpPage from './components/pages/SignUpPage';
import LoginPage from './components/pages/LoginPage';
import VerifyLoginPage from './components/pages/VerifyLoginPage';
import VerifyAccountPage from './components/pages/VerifyAccountPage';
import RecipePage from './components/pages/RecipePage';
import EditRecipePage from './components/pages/EditRecipePage';
import MyLibraryPage from './components/pages/MyLibraryPage';
import HomePage from './components/pages/HomePage';
import RecipeSearchResultsPage from './components/pages/RecipeSearchResultsPage';
import MyAccountPage from './components/pages/MyAccountPage';
import { verifyUserLoggedIn, SERVER_ROOT_URL } from './utils/api';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '99%',
    width: '99%',
    left: '3px',
    position: 'absolute',
    overflow: 'auto',
  },
}));

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    verifyUserLoggedIn()
      .then(user => {
        const newUser = { isLoggedIn: true, isGuest: false, ...user };
        setUser(newUser);
      })
      .catch(err => setUser({ isLoggedIn: false }));
  }, []);

  const classes = useStyles();

  if (!user) {
    return null;
  }

  return (
    <div className="App">
        <UserContext.Provider value={{user, setUser}}> 
            <BrowserRouter>
              <div className={classes.root}>
                <Navbar visible={user?.isLoggedIn} />
                <Switch>
                  <Route exact path="/" component={user?.isLoggedIn ? HomePage : StartPage} />
                  <Route exact path="/signup" component={SignUpPage} />
                  <Route exact path="/login" component={LoginPage} />
                  <Route exact path="/login/success" component={VerifyLoginPage} />
                  <Route exact path="/verify/:token" component={VerifyAccountPage} />
                  <Route exact path="/editrecipe/:id" component={EditRecipePage} />
                  <Route exact path="/recipe/:id" component={RecipePage} />
                  <Route exact path="/mylibrary" component={MyLibraryPage} />
                  <Route exact path="/search/recipes" component={RecipeSearchResultsPage} />
                  <Route exact path="/myaccount" component={MyAccountPage} />
                  <Route path="/*">
                    <Redirect to="/" />
                  </Route>
                </Switch>
              </div>
            </BrowserRouter>
          </UserContext.Provider>
    </div>
  );
}

export default App;
