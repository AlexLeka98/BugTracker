import styles from "./BugTracker.module.css";
import { useState } from "react";
import SideBar from "./SideBar";
import MainContent from './MainContent';

const BugTracker = () => {
    const [sidebarSelection, setSidebarSelection] = useState('dashboard');
    return (
        <div className={styles.bugtrackContainer}>
            <SideBar />
            <MainContent sidebarSelection={sidebarSelection} />
        </div>
    )
}


export default BugTracker;