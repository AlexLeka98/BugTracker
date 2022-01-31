import { Fragment, useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'


export default function Header() {

    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn;
    const [openDropdown, setOpenDropdown] = useState(false);

    const dropStyle = 'dropDown'
    const logoutClickHandler = () => {
        authCtx.logout();
    }

    const openDropDown = () => {
        setOpenDropdown(prevState => (!prevState));
    }
    console.log(openDropdown);

    return (
        <header className={styles.headerStyle}>
            <div className={styles.logoStyle}>
                <Link to='/'><h1 className={styles.logo}>BugTracker</h1></Link>
            </div>
            {!isLoggedIn &&
                <ul>
                    <li>
                        <Link to='/auth/login' className={styles.anchorStyle}>Login/SignUp</Link>
                    </li>
                </ul>
            }
            {isLoggedIn &&
                <Fragment>
                    <div className={styles.dropdown}>
                        <button onClick={openDropDown} className={styles.dropButton}>My Profile</button>
                        <div id="myDropdown" className={`${styles.dropdownContent} ${openDropdown && styles.show}`}>
                            <Link to="/">{`${authCtx.userInfo.username} ${authCtx.userInfo.surname}`}</Link>
                            <Link to="/">Settings</Link>
                            <Link to="/" onClick={logoutClickHandler}>Logout</Link>
                        </div>
                    </div>
                </Fragment>
            }
        </header>
    );
}
