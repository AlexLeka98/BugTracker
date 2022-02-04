import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    userInfo: {},
    dropDownIsOpen: false,
    login: (token) => { },
    logout: () => { },
    updateUserInfo: () => { },
    toggleDropDown: () => { },
    closeDropDown: () => { },
    initializeAuth: () => { },
});


export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: '',
        surname: '',
        email: '',

    })
    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token)
    };

    const toggleDropDown = () => {
        setDropDownIsOpen(prevState => (!prevState));
    }
    const closeDropDown = () => {
        setDropDownIsOpen(false);
    }

    const logoutHandler = () => {
        setUserInfo(prevState => ({
            username: '',
            surname: '',
            email: '',
        }));
        setToken(null);
        localStorage.setItem('token', '');
        closeDropDown();
    };

    const onUserInfoHandler = (userInfo) => {
        setUserInfo(userInfo);
    }

    const initializeAuth = (auth) => {
        loginHandler(auth.token);
        onUserInfoHandler(auth.userInfo);
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        userInfo: userInfo,
        dropDownIsOpen: dropDownIsOpen,
        login: loginHandler,
        logout: logoutHandler,
        updateUserInfo: onUserInfoHandler,
        toggleDropDown: toggleDropDown,
        closeDropDown: closeDropDown,
        initializeAuth: initializeAuth,
    }


    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;