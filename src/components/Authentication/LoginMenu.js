import LoginForm from "./LoginForm";
import { Route, Switch, useHistory } from 'react-router-dom'


const LoginMenu = () => {
    const history = useHistory();
    const loginFirstHandler = () => {
        history.push('/auth/login')
    }
    return (
        <Switch>
            <Route path='/auth' exact>
                <button onClick={loginFirstHandler}>Login first!</button>
            </Route>
            <Route path='/auth/login'>
                <LoginForm />
            </Route>
        </Switch>
    )
}


export default LoginMenu;