import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    userInfo: {},
    login: (token) => { },
    logout: () => { },
    updateUserInfo: () => { },
});


export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [userInfo, setUserInfo] = useState({
        username: '',
        surname: '',
        email: '',

    })
    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token)
    };

    const logoutHandler = () => {
        setUserInfo(prevState => ({
            username: '',
            surname: '',
            email: '',
        }));
        setToken(null);
    };

    const onUserInfoHandler = (userInfo) => {
        setUserInfo(prevState => (userInfo));
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        userInfo: userInfo,
        login: loginHandler,
        logout: logoutHandler,
        updateUserInfo: onUserInfoHandler,
    }


    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;