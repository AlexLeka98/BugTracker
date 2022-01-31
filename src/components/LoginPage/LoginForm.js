import Input from '../UI/Input';
import { useRef, useState, useContext } from 'react';
import AuthContext from "../../store/auth-context";
import styles from './LoginForm.module.css'
import { useHistory } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';

const LoginForm = () => {
    const [isLogin, setIsLogin] = useState(true); //Login or Sign up ?
    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();


    const authFunc = (data) => {
        authCtx.login(data.idToken);
        history.replace('/app')
    }

    const userInfoFunc = (data) => {
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

    const { isLoading, httpRequest } = useHttp();


    const authCtx = useContext(AuthContext);
    const history = useHistory();


    const onChangeLoginHandler = () => {
        setIsLogin(prevState => (!prevState));
    }


    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        let url;
        let dbUrl = 'https://react-http-a713f-default-rtdb.europe-west1.firebasedatabase.app/users.json'
        let httpInfo;
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAa7bYb1a6bAeVDDONSMYyOZYTzD7z8BB0';
            httpRequest({ url: dbUrl }, getUserInfo);
        }
        else {
            const enteredName = nameRef.current.value;
            const enteredSurname = surnameRef.current.value;
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAa7bYb1a6bAeVDDONSMYyOZYTzD7z8BB0';
            let userInfo = {
                email: enteredEmail,
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
        httpInfo = {
            url: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
            }
        }
        httpRequest(httpInfo, authFunc);
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

                {isLogin && <button className={styles.submitButton} type='submit' variant="outlined" sx={{ marginTop: 2, px: 6, py: 1 }}>
                    {isLoading ? 'Loading...' : 'Login'}
                </button>}
                {!isLogin && <button className={styles.submitButton} type='submit' variant="outlined" sx={{ marginTop: 2, px: 6, py: 1 }}>
                    {isLoading ? 'Loading...' : 'Create account'}
                </button>}
                <button className={styles.changeAuthButton} type='button' onClick={onChangeLoginHandler}>{isLogin ? 'Create new account' : 'Log In with existing account'}</button>
            </form>
        </div>
    )
}


export default LoginForm;