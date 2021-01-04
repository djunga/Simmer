import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import StartPage from './components/pages/StartPage';
import SignUpPage from './components/pages/SignUpPage';
import LoginPage from './components/pages/LoginPage';
import VerifyAccountPage from './components/pages/VerifyAccountPage';
import RecipePage from './components/pages/RecipePage';
import { verifyUserLoggedIn, SERVER_ROOT_URL } from './utils/api';

function App() {
  const [socket, setSocket] = useState(socketIOClient(SERVER_ROOT_URL));
  const [user, setUser] = useState(null);

  useEffect(() => {
    verifyUserLoggedIn()
      .then(user => {
        const newUser = { ...user };
        setUser(newUser);
        socket.emit('setUserSocketId', { userId: newUser._id });
      })
      .catch(err => setUser({ ...user }));
  }, []);

  return (
    <div className="App">
        <UserContext.Provider value={{user, setUser}}> 
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={StartPage} />
                <Route exact path="/signup" component={SignUpPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/verify/:token" component={VerifyAccountPage} />
                <Route exact path="/signup" component={SignUpPage} />
                <Route exact path="/recipe/:id" component={RecipePage} />
                <Route path="/*">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </BrowserRouter>
          </UserContext.Provider>
    </div>
  );
}

export default App;
