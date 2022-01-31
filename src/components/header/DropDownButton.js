import { useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { Link } from 'react-router-dom';
import styles from './DropDownButton.module.css'
import OutsideAlerter from '../../hooks/OutsideAlerter';


export default function DropDownButton() {
    const authCtx = useContext(AuthContext)

    const logoutClickHandler = () => {
        authCtx.logout();
    }

    const onDropdownHandler = () => {
        authCtx.toggleDropDown();
    }


    return (
        <OutsideAlerter>
            <div className={styles.dropdown}>
                <button onClick={onDropdownHandler} className={styles.dropButton}>My Profile</button>
                <div id="myDropdown" className={`${styles.dropdownContent} ${authCtx.dropDownIsOpen && styles.show}`}>
                    <Link to="/">{`${authCtx.userInfo.username} ${authCtx.userInfo.surname}`}</Link>
                    <Link to="/">Settings</Link>
                    <Link to="/" onClick={logoutClickHandler}>Logout</Link>
                </div>
            </div>
        </OutsideAlerter>
    )

}

