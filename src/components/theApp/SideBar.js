import styles from "./SideBar.module.css";
import { Link } from "react-router-dom";


const SideBar = () => {
    return (
        <div className={styles.sidebarContainer}>
            <ul className={styles.sidebarMenu}>
                <Link to='/'><li>One</li></Link>
                <Link to='/'><li>Two</li></Link>
                <Link to='/'><li>Three</li></Link>
            </ul>
        </div>
    )
}


export default SideBar;