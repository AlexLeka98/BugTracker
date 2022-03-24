import Input from '../UI/Input';
import { useRef, useState, useContext, Fragment } from 'react';
import AuthContext from "../../store/auth-context";
import styles from './LoginForm.module.scss'
import { useHistory } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';

const LoginForm = () => {
    const [showLoginForm, setShowLoginForm] = useState(true); //Login or Sign up ?
    const [passwordAuth, setPasswordAuth] = useState({ isValid: true, message: null });
    const authCtx = useContext(AuthContext);
    const { isLoading, httpRequest, error } = useHttp();
    const history = useHistory();
    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();
    const firebase_key = authCtx.firebaseKey;

    const loginFunc = (authData, userInfo) => {
        const expirationTime = new Date(new Date().getTime() + (+authData.expiresIn * 1000))  // Data expires in an hour.
        authCtx.login(authData.idToken, userInfo, expirationTime.toString());
        history.replace('/app/dashboard')
    }

    const userInfoFunc = async (data) => {
        authCtx.updateUserInfo(data);
    }

    const getUserInfo = (data) => {
        for (const user in data) {
            if (data[user].email === emailRef.current.value) {
                return data[user];
            }
        }
    }



    const onChangeLoginHandler = () => {
        setShowLoginForm(prevState => (!prevState));
    }



    // This makes a authentication request , and later receives the user information
    // from the database.
    const authenticateUser = async (user) => {
        let dbUrl = '/users'
        let httpInfo;
        let userInfo;

        // Authentication POST request
        httpInfo = {
            url: `https://identitytoolkit.googleapis.com/v1/accounts:${showLoginForm ? 'signInWithPassword' : 'signUp'}?key=${firebase_key}`,
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

        let authData = await httpRequest(httpInfo);
        if (authData.error) {
            passwordRef.current.value = '';
            return;
        }

        // If we login
        if (showLoginForm) {
            userInfo = await httpRequest({ url: dbUrl }, getUserInfo);

        } // If we signup, Add new user to the database.
        else {
            const enteredName = nameRef.current.value;
            const enteredSurname = surnameRef.current.value;
            const enteredPhone = phoneRef.current.value;
            userInfo = {
                email: user.email,
                username: enteredName,
                surname: enteredSurname,
                phone: enteredPhone,
                authority: 'none',
                idToken: authData.idToken,
            }
            httpInfo = {
                url: dbUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: userInfo
            }
            await httpRequest(httpInfo);
        }
        loginFunc(authData, userInfo);
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
                <h3 className={styles.formHeader}>{showLoginForm ? 'Login' : 'Sign Up'}</h3>
                {!showLoginForm &&
                    <Fragment>
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
                        <Input
                            type='text'
                            label='Phone'
                            placeholder='Enter phone...'
                            ref={phoneRef}
                        />
                    </Fragment>
                }
                <Input
                    type='email'
                    label='Email'
                    placeholder='Enter email...'
                    ref={emailRef}
                />
                <Input
                    type='password'
                    autoComplete='on'
                    label='Password'
                    placeholder='Enter password...'
                    ref={passwordRef}
                />
                {!passwordAuth.isValid && <p className={styles.errorMessage}>{passwordAuth.message}</p>}


                {!isLoading && <button className={styles.submitButton} type='submit' variant="outlined" sx={{ marginTop: 2, px: 6, py: 1 }}>
                    {showLoginForm ? 'Login' : 'Create account'}
                </button>}
                {isLoading && <div className='loader'></div>}
                <button className={styles.changeAuthButton} type='button' onClick={onChangeLoginHandler}>{showLoginForm ? 'Create new account' : 'Log In with existing account'}</button>

            </form>
        </div>
    )
}


export default LoginForm;