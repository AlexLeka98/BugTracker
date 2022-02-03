import styles from './Dashboard.module.css'
import DashboardProjects from './Projects/DashboardProjects';
import DashboardStatistics from './Statistics/DashboardStatistics';
import ProjectForm from '../../../UI/ProjectForm';

const Dashboard = () => {


    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.location}>
            </div>
            <DashboardProjects />
            <DashboardStatistics />
            
            <ProjectForm />
        </div>
    )
}

export default Dashboard;