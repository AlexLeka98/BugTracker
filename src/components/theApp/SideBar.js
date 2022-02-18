import styles from "./SideBar.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";


const SideBar = () => {
    const authCtx = useContext(AuthContext);
    return (
        <div className={styles.sidebarContainer}>
            <ul className={styles.sidebarMenu}>
                <NavLink to='/app/dashboard' activeClassName={styles.active}>
                    <li>Dashboard</li></NavLink>
                <NavLink to='/app/tickets' activeClassName={styles.active}>
                    <li>Tickets</li></NavLink>
                {authCtx.userInfo.authority === 'admin' &&
                    <NavLink to='/app/administration' activeClassName={styles.active}>
                        <li>Administration</li></NavLink>
                }
            </ul>
        </div>
    )
}


export default SideBar;

