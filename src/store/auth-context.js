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
});


export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
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

    const closeDropDown= () => {
        setDropDownIsOpen(false);
    }

    const logoutHandler = () => {
        setUserInfo(prevState => ({
            username: '',
            surname: '',
            email: '',
        }));
        setToken(null);
        closeDropDown();
    };

    const onUserInfoHandler = (userInfo) => {
        setUserInfo(prevState => (userInfo));
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
        closeDropDown: closeDropDown
    }


    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;