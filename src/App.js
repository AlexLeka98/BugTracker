import Header from './components/header/Header';
import LoginMenu from './components/LoginPage/LoginMenu';
import { Redirect, Route, Switch } from 'react-router-dom';
import BugTracker from './components/theApp/BugTracker';
import './App.css';
import LandingPage from './components/display/LandingPage';
import { useContext, useEffect, useState } from 'react';
import AuthContext from './store/auth-context';


function App() {
  const [data, setData] = useState(null)
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  // Relogin in if user was logged in before refresh.
  // const { token } = authCtx;
  // useEffect(() => {
  //   if (localStorage.getItem('token') && localStorage.getItem('token') !== '') {
  //     let storageData = JSON.parse(localStorage.getItem('token'));
  //     authCtx.initializeAuth({ token: storageData.token, userInfo: storageData.userInfo });
  //   }
  //   else if (authCtx.isLoggedIn) {
  //     localStorage.setItem('token', JSON.stringify({ token: authCtx.token, userInfo: authCtx.userInfo }))
  //     localStorage.setItem('expirationTime', expirationTime);
  //   }
  // }, [token])


  useEffect(() => {
    fetch('/users').then(res => {
      if (!res.ok) {
        throw new Error('Somethign happends');
      }
      const data = res.json()
        .then(data => {
          setUserData(data);
        })
    }).catch(err => {
      console.log(err)
    })
  }, [])


  
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/' exact>
          {authCtx.isLoggedIn && <Redirect to='/app' />}
          {!authCtx.isLoggedIn && <LandingPage />}
        </Route>
        <Route path='/auth'>
          <LoginMenu />
        </Route>
        <Route path='/app'>
          {authCtx.isLoggedIn && <BugTracker />}
          {!authCtx.isLoggedIn && <Redirect to='/' />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
