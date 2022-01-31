import styles from "./BugTracker.module.css";
import SideBar from "./SideBar";
import MainContent from './MainContent';

const BugTracker = () => {
    return (
        <div className={styles.bugtrackContainer}>
            <SideBar />
            <MainContent />
        </div>
    )
}


export default BugTracker;