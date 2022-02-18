import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

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

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    return adjExpirationTime - currentTime;
}

const retrieveStoredToken = () => {
    const storedToken = JSON.parse(localStorage.getItem('token'));
    const storedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    // Threshhold, don't log the user in if there is only 1 minute left(60000 milisec)
    if (remainingTime <= 60000) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return { token: storedToken, duration: remainingTime }
}

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    let initalUserInfo;
    if (tokenData) {
        initialToken = tokenData.token.token;
        initalUserInfo = tokenData.token.userInfo;
    }

    const [token, setToken] = useState(initialToken);
    const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(initalUserInfo);
    const userIsLoggedIn = !!token;




    const logoutHandler = useCallback(() => {
        setUserInfo(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
        closeDropDown();
    }, []);

    // Right after you login.
    // Save the tokenId, calculate the remaining time to be logged in.
    // Logout after the remaining time is over.
    const loginHandler = (token, userInfo, expirationTime) => {
        updateUserInfo(userInfo);
        setToken(token);
        const remainingTime = calculateRemainingTime(expirationTime);
        localStorage.setItem('token', JSON.stringify({ token: token, userInfo: userInfo }));
        localStorage.setItem('expirationTime', expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    // Restart count, because soneone esle has been logged in.
    // we know that because tokenData changed.
    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);


    const toggleDropDown = () => {
        setDropDownIsOpen(prevState => (!prevState));
    }
    const closeDropDown = () => {
        setDropDownIsOpen(false);
    }


    const updateUserInfo = (userInfo) => {
        setUserInfo(userInfo);
    }

    const initializeAuth = (auth) => {
        loginHandler(auth.token);
        updateUserInfo(auth.userInfo);
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        userInfo: userInfo,
        dropDownIsOpen: dropDownIsOpen,
        login: loginHandler,
        logout: logoutHandler,
        updateUserInfo: updateUserInfo,
        toggleDropDown: toggleDropDown,
        closeDropDown: closeDropDown,
        initializeAuth: initializeAuth,
    }


    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;