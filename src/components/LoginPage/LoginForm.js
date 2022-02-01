import Input from '../UI/Input';
import { useRef, useState, useContext, useEffect } from 'react';
import AuthContext from "../../store/auth-context";
import styles from './LoginForm.module.css'
import { useHistory } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import { CollectionsBookmarkOutlined } from '@mui/icons-material';

const LoginForm = () => {
    const [isLogin, setIsLogin] = useState(true); //Login or Sign up ?
    const [passwordAuth, setPasswordAuth] = useState({ isValid: true, message: null });
    const authCtx = useContext(AuthContext);
    const { isLoading, httpRequest, error } = useHttp();
    const history = useHistory();
    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();


    const authFunc = (data) => {
        authCtx.login(data.idToken);
        history.replace('/app/dashboard')
    }

    const userInfoFunc = async (data) => {
        authCtx.updateUserInfo(data);
    }

    const getUserInfo = (data) => {
        for (const user in data) {
            if (data[user].email === emailRef.current.value) {
                authCtx.updateUserInfo(data[user]);
                return;
            }
        }
    }




    const onChangeLoginHandler = () => {
        setIsLogin(prevState => (!prevState));
    }



    // This makes a authentication request , and later receives the user information
    // from the database.
    const authenticateUser = async (user) => {
        let dbUrl = 'https://react-http-a713f-default-rtdb.europe-west1.firebasedatabase.app/users.json'
        let url;
        let httpInfo;
        // Authentication request
        httpInfo = {
            url: `https://identitytoolkit.googleapis.com/v1/accounts:${isLogin ? 'signInWithPassword' : 'signUp'}?key=AIzaSyAa7bYb1a6bAeVDDONSMYyOZYTzD7z8BB0`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: user.email,
                password: user.password,
                returnSecureToken: true
            }
        }
        httpRequest(httpInfo, authFunc);

        // Recieving user information after Authentication request.
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAa7bYb1a6bAeVDDONSMYyOZYTzD7z8BB0';
            httpRequest({ url: dbUrl }, getUserInfo);
        }
        else {
            const enteredName = nameRef.current.value;
            const enteredSurname = surnameRef.current.value;
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAa7bYb1a6bAeVDDONSMYyOZYTzD7z8BB0';
            let userInfo = {
                email: user.email,
                username: enteredName,
                surname: enteredSurname
            }
            httpInfo = {
                url: dbUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: userInfo
            }
            httpRequest(httpInfo);
            userInfoFunc(userInfo);
        }
    }

    // if password is correct, we procced to make the authentication.
    // 
    const submitHandler = async (event) => {
        event.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        if (enteredPassword.length < 6) {
            setPasswordAuth({ isValid: false, message: 'Password should be at least 6 characters' });
            passwordRef.current.value = '';
            return;
        }
        setPasswordAuth({ isValid: true, message: '' })

        // authenticating a user by email and password
        authenticateUser({ email: enteredEmail, password: enteredPassword });
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.formStyle} onSubmit={submitHandler}>
                <h3 className={styles.formHeader}>{isLogin ? 'Login' : 'Sign Up'}</h3>
                {!isLogin &&
                    <div className={styles.namesStyle}>
                        <Input
                            type='text'
                            label='Username'
                            placeholder='Enter name...'
                            ref={nameRef}
                        />
                        <Input
                            type='text'
                            label='Surname'
                            placeholder='Enter surname...'
                            ref={surnameRef}
                        />
                    </div>
                }
                <Input
                    type='email'
                    label='Email'
                    placeholder='Enter email...'
                    ref={emailRef}
                />
                <Input
                    type='password'
                    label='Password'
                    placeholder='Enter password...'
                    ref={passwordRef}
                />
                {!passwordAuth.isValid && <p className={styles.errorMessage}>{passwordAuth.message}</p>}


                {!isLoading && <button className={styles.submitButton} type='submit' variant="outlined" sx={{ marginTop: 2, px: 6, py: 1 }}>
                    {isLogin ? 'Login' : 'Create account'}
                </button>}
                {isLoading && <div className='loader'></div>}
                <button className={styles.changeAuthButton} type='button' onClick={onChangeLoginHandler}>{isLogin ? 'Create new account' : 'Log In with existing account'}</button>

            </form>
        </div>
    )
}


export default LoginForm;