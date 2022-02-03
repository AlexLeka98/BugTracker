import styles from './DashboardStatistics.module.css'
import StatsCard from './StatsCard'


const DUMMY_DATA = [
    {
        name:'Tickets by Type',
        values: [2, 3, 4],
        labels: ['Issue', 'Bug', 'Feature request'],
        id: Math.random(),
    },
    {
        name:'Tickets by Priority',
        values: [10, 3, 4, 5, 2],
        labels: ['Immediate', 'High', 'Low', 'Medium'],
        id: Math.random(),
    },
    {
        name:'Tickets by Status',
        values: [20, 3, 12, 12],
        labels: ['Resolved', 'New', 'In Progress'],
        id: Math.random(),
    }
]

const DashboardStatistics = (props) => {
    return (
        <div className={styles.dashboardStatisticsContainer}>
            {DUMMY_DATA.map(item => (
                <StatsCard chartData={item} id={item.id} key={item.id} />
            ))}
        </div>
    )
}

export default DashboardStatistics;