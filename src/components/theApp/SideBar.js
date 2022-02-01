import styles from "./SideBar.module.css";
import { NavLink } from "react-router-dom";


const SideBar = () => {
    return (
        <div className={styles.sidebarContainer}>
            <ul className={styles.sidebarMenu}>
                <NavLink to='/app/dashboard' activeClassName={styles.active}>
                    <li>Dashboard</li></NavLink>
                <NavLink to='/app/tickets' activeClassName={styles.active}>
                    <li>Tickets</li></NavLink>
                <NavLink to='/app/administration' activeClassName={styles.active}>
                    <li>Administration</li></NavLink>
            </ul>
        </div>
    )
}


export default SideBar;

