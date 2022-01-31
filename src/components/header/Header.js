import { useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'
import DropDownButton from './DropDownButton';


export default function Header() {

    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn;

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
            {isLoggedIn && <DropDownButton />}
        </header>
    );
}
