import { useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { Link } from 'react-router-dom';
import styles from './DropDownButton.module.css'


export default function DropDownButton() {
    const authCtx = useContext(AuthContext)
    const [openDropdown, setOpenDropdown] = useState(false);

    const logoutClickHandler = () => {
        authCtx.logout();
    }

    const openDropDown = () => {
        setOpenDropdown(prevState => (!prevState));
    }



    return (
        <div className={styles.dropdown}>
            <button onClick={openDropDown} className={styles.dropButton}>My Profile</button>
            <div id="myDropdown" className={`${styles.dropdownContent} ${openDropdown && styles.show}`}>
                <Link to="/">{`${authCtx.userInfo.username} ${authCtx.userInfo.surname}`}</Link>
                <Link to="/">Settings</Link>
                <Link to="/" onClick={logoutClickHandler}>Logout</Link>
            </div>
        </div>
    )

}

