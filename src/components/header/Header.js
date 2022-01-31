import { Fragment, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'


export default function Header() {

    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutClickHandler = () => {
        authCtx.logout();
    }
    console.log("Login status: ", isLoggedIn);
    return (
        <header className={styles.headerStyle}>
            <div className={styles.logoStyle}>
                <Link to='/'><h1 className={styles.logo}>BugTracker</h1></Link>
            </div>
            <ul>
                {!isLoggedIn &&
                    <li>
                        <Link to='/auth/login' className={styles.anchorStyle}>Login/SignUp</Link>
                    </li>
                }
                {isLoggedIn &&
                    <Fragment>
                        {/* <li>
                            <Link to='/' className={styles.anchorStyle}>Link 1</Link>
                        </li> */}
                        <li>
                            <Link to='/' onClick={logoutClickHandler} className={styles.anchorStyle}>Logout</Link>
                        </li>
                    </Fragment>
                }
            </ul>
        </header>
    );
}
