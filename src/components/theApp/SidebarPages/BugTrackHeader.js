import styles from './BugTrackHeader.module.css';

const BugTrackHeader = (props) => {
    return (
        <div className={styles.bugTrackerHeader}>
            <h1 className={styles.dashboardTitle}>{props.children}</h1>
        </div>
    )
}


export default BugTrackHeader;