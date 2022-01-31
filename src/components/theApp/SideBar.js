import styles from "./SideBar.module.css";
import { Link } from "react-router-dom";


const SideBar = () => {
    return (
        <div className={styles.sidebarContainer}>
            <ul className={styles.sidebarMenu}>
                <Link to='/'><li>Dashboard</li></Link>
                <Link to='/'><li>Tickets</li></Link>
                <Link to='/'><li>Administration</li></Link>
            </ul>
        </div>
    )
}


export default SideBar;