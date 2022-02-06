import styles from './Dashboard.module.css'
import DashboardProjects from './Projects/DashboardProjects';
import DashboardStatistics from './Statistics/DashboardStatistics';
import { Switch, Route } from 'react-router-dom';
import ProjectPage from './Projects/ProjectPage';

const Dashboard = () => {


    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.location}>
            </div>
            <DashboardProjects />
            <DashboardStatistics />
        </div>
    )
}

export default Dashboard;