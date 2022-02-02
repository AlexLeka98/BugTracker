import styles from './DashboardStatistics.module.css'
import StatsCard from './StatsCard'


const DUMMY_DATA = [
    {
        name:'Chart One',
        values: [2, 3, 4],
        labels: ['tick1', 'tick2', 'tick3'],
        id: Math.random(),
    },
    {
        name:'Chart Two',
        values: [10, 3, 4, 5, 2],
        labels: ['asd1', 'asd2', 'asd3', 'asd4', 'asd5'],
        id: Math.random(),
    },
    {
        name:'Chart Three',
        values: [20, 3, 12, 12],
        labels: ['cx1', 'cx2', 'cx3', 'cx4'],
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