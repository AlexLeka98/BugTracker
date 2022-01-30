import Header from './components/header/Header';
import LoginMenu from './components/LoginPage/LoginMenu';
import WelcomePage from './components/WelcomePage';
import { Route, Switch } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/' exact>
          <LoginMenu />
        </Route>
        <Route path='/login'>
          <LoginMenu />
        </Route>
        <Route path='/welcome'>
          <WelcomePage />
        </Route>
      </Switch>


    </div>
  );
}

export default App;
