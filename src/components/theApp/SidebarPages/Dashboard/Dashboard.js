import BugTrackHeader from '../BugTrackHeader';
import styles from './Dashboard.module.css'
import DashboardProjects from './Projects/DashboardProjects';
import DashboardStatistics from './Statistics/DashboardStatistics';

const Dashboard = () => {


    return (
        <div className={styles.dashboardContainer}>
            <BugTrackHeader>Dashboard</BugTrackHeader>
            <div className={styles.location}>
            </div>
            <DashboardProjects />
            <DashboardStatistics />
        </div>
    )
}

export default Dashboard;