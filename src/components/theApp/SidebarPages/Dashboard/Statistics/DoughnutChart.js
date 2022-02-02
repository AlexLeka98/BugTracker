import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Fragment } from 'react';
import { Doughnut } from 'react-chartjs-2';
import styles from './DoughnutChart.module.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = (props) => {
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: '# of Votes',
                data: props.values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <Fragment>
            <div className={styles.doughnutStyle}>
            <Doughnut data={data} />
            </div>
        </Fragment>
    );
}

export default DoughnutChart;
