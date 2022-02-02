import styles from './StatsCard.module.css'
import DoughnutChart from './DoughnutChart';


const DUMMY_DATA = [
    {
        name: 'Chart One',
        values: [2, 3, 4],
        labels: ['tick1', 'tick2', 'tick3'],
        id: Math.random(),
    },
    {
        name: 'Chart Two',
        values: [10, 3, 4, 5, 2],
        labels: ['asd1', 'asd2', 'asd3', 'asd4', 'asd5'],
        id: Math.random(),
    },
    {
        name: 'Chart Three',
        values: [20, 3, 12, 12],
        labels: ['cx1', 'cx2', 'cx3', 'cx4'],
        id: Math.random(),
    }
]


const StatsCard = (props) => {
    // let values = props.chartData.values;
    // let labels = props.chartData.labels;
    const { name, values, labels } = props.chartData;
    return (
        <div className={styles.statsCardStyles}>
            <h4>{name}</h4>
            <div>
                <DoughnutChart values={values} labels={labels} />
            </div>
        </div>
    )
}

export default StatsCard;