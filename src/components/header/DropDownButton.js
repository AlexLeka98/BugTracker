import { useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { Link } from 'react-router-dom';
import styles from './DropDownButton.module.css'
import OutsideClick from '../../hooks/OutsideClick';


export default function DropDownButton() {
    const authCtx = useContext(AuthContext)
    const [dropDownIsOpen, setDropDownIsOpen] = useState(false);

    const logoutClickHandler = () => {
        authCtx.logout();
    }

    const toggleDropDown = () => {
        setDropDownIsOpen(prevState => !prevState);
    }

    const closeDropDown = () => {
        setDropDownIsOpen(false);
    }

    return (
        <OutsideClick eventHandler={closeDropDown}>
            <div className={styles.dropdown}>
                <button onClick={toggleDropDown} className={styles.dropButton}>{`${authCtx.userInfo.username} ${authCtx.userInfo.surname}`}</button>
                <div id="myDropdown" className={`${styles.dropdownContent} ${dropDownIsOpen && styles.show}`}>
                    {/* <div id="myDropdown" className={`${styles.dropdownContent} ${authCtx.dropDownIsOpen && styles.show}`}> */}
                    {/* <Link to="/">{`${authCtx.userInfo.username} ${authCtx.userInfo.surname}`}</Link> */}
                    <Link onClick={toggleDropDown} to="/app/dashboard">Projects</Link>
                    <Link onClick={toggleDropDown} to="/app/tickets">Tickets</Link>
                    <Link onClick={toggleDropDown} to="/">Settings</Link>
                    <Link onClick={toggleDropDown} to="/" onClick={logoutClickHandler}>Logout</Link>
                </div>
            </div>
        </OutsideClick>
    )

}

