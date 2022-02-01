import Header from './components/header/Header';
import LoginMenu from './components/LoginPage/LoginMenu';
import { Route, Switch } from 'react-router-dom';
import BugTracker from './components/theApp/BugTracker';
import './App.css';
import LandingPage from './components/display/LandingPage';
import { useContext, useEffect, useState } from 'react';
import AuthContext from './store/auth-context';


function App() {
  const [data,setData] = useState(null)

  const authCtx = useContext(AuthContext);

  const { token } = authCtx;
  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== '') {
      let storageData = JSON.parse(localStorage.getItem('token'));
      authCtx.initializeAuth({ token: storageData.token, userInfo: storageData.userInfo });
    }
    else if (authCtx.isLoggedIn) {
      localStorage.setItem('token', JSON.stringify({ token: authCtx.token, userInfo: authCtx.userInfo }))
    }
  }, [token])


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
