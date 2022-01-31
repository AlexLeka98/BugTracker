import Header from './components/header/Header';
import LoginMenu from './components/LoginPage/LoginMenu';
import WelcomePage from './components/display/WelcomePage';
import { Route, Switch } from 'react-router-dom';
import BugTracker from './components/theApp/BugTracker';
import './App.css';
import LandingPage from './components/display/LandingPage';
import { useContext } from 'react';
import AuthContext from './store/auth-context';

// const addUser = 

function App() {

  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/' exact>
          {authCtx.isLoggedIn && <BugTracker />}
          {!authCtx.isLoggedIn && <LandingPage />}
        </Route>
        <Route path='/auth'>
          <LoginMenu />
        </Route>
        <Route path='/app'>
          <BugTracker />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
