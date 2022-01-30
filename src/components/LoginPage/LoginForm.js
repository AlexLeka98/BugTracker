import Input from './Input';
import { useRef, useState, useContext } from 'react';
import AuthContext from "../../store/auth-context";
import styles from './LoginForm.module.css'
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const emailRef = useRef();
    const passwordRef = useRef();

    const onChangeLoginHandler = () => {
        setIsLogin(prevState => (!prevState));
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        console.log(enteredEmail, "  ", enteredPassword);

        let url;
        setIsLoading(true);
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signIn?key=AIzaSyAa7bYb1a6bAeVDDONSMYyOZYTzD7z8BB0';
        }
        else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAa7bYb1a6bAeVDDONSMYyOZYTzD7z8BB0';
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setIsLoading(false);
            emailRef.current.value = '';
            passwordRef.current.value = '';
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(data => {
                    // or show and error modal
                    let errorMessage = 'Authentication failed';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage)
                });
            }
        }).then(data => {
            // We end up here if we have a successful request.
            authCtx.login(data.idToken);
            history.replace('/welcome')
        }).catch(err => {
            alert(err.message);
        });

    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.formStyle} onSubmit={submitHandler}>
                <h3 className={styles.formHeader}>{isLogin ? 'Login' : 'Sign Up'}</h3>
                <Input
                    type='email'
                    label='Email'
                    ref={emailRef}
                />
                <Input
                    type='password'
                    label='Password'
                    ref={passwordRef}
                />
                <button className={styles.submitButton} type='submit' variant="outlined" sx={{ marginTop: 2, px: 6, py: 1 }}>
                    {isLoading ? 'Loading...' : 'Create Account'}
                </button>
                <button className={styles.changeAuthButton} type='button' onClick={onChangeLoginHandler}>{isLogin ? 'Create new account' : 'Log In with existing account'}</button>
            </form>
        </div>
    )
}


export default LoginForm;