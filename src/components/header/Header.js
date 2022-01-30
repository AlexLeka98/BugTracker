import * as React from 'react';
import AuthContext from '../../store/auth-context';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'


export default function Header() {


    const authCtx = React.useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <header className={styles.headerStyle}>
            <div>
                <h1 className={styles.logo}>BugTracker</h1>
            </div>
            <ul>
                <li><Link to='/login' className={styles.anchorStyle}>Link 2</Link></li>
                <li><Link to='/login' className={styles.anchorStyle}>{isLoggedIn ? 'Logout' : 'Login'}</Link></li>
            </ul>
        </header>


    );
}