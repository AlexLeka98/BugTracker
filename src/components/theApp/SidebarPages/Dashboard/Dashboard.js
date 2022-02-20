import styles from './Dashboard.module.css'
import DashboardProjects from './Projects/DashboardProjects';
import DashboardStatistics from './Statistics/DashboardStatistics';

const Dashboard = () => {


    return (
        <div className={styles.dashboardContainer}>

            <div className={styles.bugTrackerHeader}>
                <h1 className={styles.dashboardTitle}>Dashboard</h1>
            </div>
            <div className={styles.location}>
            </div>
            <DashboardProjects />
            <DashboardStatistics />
        </div>
    )
}

export default Dashboard;