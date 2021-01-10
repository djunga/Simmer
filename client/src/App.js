import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from './contexts/UserContext';
import Navbar from './components/Navbar';
import StartPage from './components/pages/StartPage';
import SignUpPage from './components/pages/SignUpPage';
import LoginPage from './components/pages/LoginPage';
import VerifyAccountPage from './components/pages/VerifyAccountPage';
import RecipePage from './components/pages/RecipePage';
import MyLibraryPage from './components/pages/MyLibraryPage';
import { verifyUserLoggedIn, SERVER_ROOT_URL } from './utils/api';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '99%',
    width: '99%',
    left: '3px',
    position: 'absolute',
    border: '1px solid black'
  },

}));

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    verifyUserLoggedIn()
      .then(user => {
        const newUser = { ...user };
        setUser(newUser);
      })
      .catch(err => setUser({ ...user }));
  }, []);

  const classes = useStyles();

  return (
    <div className="App">
        <UserContext.Provider value={{user, setUser}}> 
            <BrowserRouter>
              <div className={classes.root}>
                <Navbar />
                <Switch>
                  <Route exact path="/" component={StartPage} />
                  <Route exact path="/signup" component={SignUpPage} />
                  <Route exact path="/login" component={LoginPage} />
                  <Route exact path="/verify/:token" component={VerifyAccountPage} />
                  <Route exact path="/recipe/:id" component={RecipePage} />
                  <Route exact path="/mylibrary" component={MyLibraryPage} />
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
