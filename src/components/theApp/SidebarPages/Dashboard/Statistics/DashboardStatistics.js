import { useState, useEffect } from 'react'
import styles from './DashboardStatistics.module.css'
import StatsCard from './StatsCard'
import useHttp from '../../../../../hooks/useHttp'


const getTypeArray = (allTickets) => {
    let array = [0, 0, 0];
    allTickets.map(ticket => {
        switch (ticket.type) {
            case 'issue':
                array[0] += 1;
                break;
            case 'bug':
                array[1] += 1;
                break;
            case 'feature_request':
                array[2] += 1;
                break;
            default:
                break;
        }
    })
    return array;
}
const getPriorityArray = (allTickets) => {
    let array = [0, 0, 0, 0];
    allTickets.map(ticket => {
        switch (ticket.priority) {
            case 'immediate':
                array[0] += 1;
                break;
            case 'high':
                array[1] += 1;
                break;
            case 'medium':
                array[2] += 1;
                break;
            case 'low':
                array[3] += 1;
                break;
            default:
                break;
        }
    })
    return array;
}
const getStatusArray = (allTickets) => {
    let array = [0, 0, 0];
    allTickets.map(ticket => {
        switch (ticket.status) {
            case 'resolved':
                array[0] += 1;
                break;
            case 'new':
                array[1] += 1;
                break;
            case 'in_progress':
                array[2] += 1;
                break;
            default:
                break;
        }
    })
    return array;
}

const DashboardStatistics = () => {
    const { httpRequest, error, isLoading } = useHttp();
    const [allTickets, setAllTickets] = useState([]);
    const [typeArray, setTypeArray] = useState([]);
    const [priorityArray, setPriorityArray] = useState([]);
    const [statusArray, setStatusArray] = useState([]);

    useEffect(() => {
        let httpInfo = {
            url: '/tickets',
            method: 'GET',
        }
        httpRequest(httpInfo).then(res => {
            setAllTickets(res);
            // setTypeArray(getTypeArray(res));
            // setPriorityArray(getPriorityArray(res));
            // setStatusArray(getStatusArray(res));
        })
    }, [])


    useEffect(() => {
        setTypeArray(getTypeArray(allTickets));
        setPriorityArray(getPriorityArray(allTickets));
        setStatusArray(getStatusArray(allTickets));
    }, [allTickets])


    const DUMMY_DATA = [
        {
            name: 'Tickets by Type',
            values: typeArray,
            labels: ['Issue', 'Bug', 'Feature request'],
            id: Math.random(),
        },
        {
            name: 'Tickets by Priority',
            values: priorityArray,
            labels: ['Immediate', 'High', 'Medium', 'Low'],
            id: Math.random(),
        },
        {
            name: 'Tickets by Status',
            values: statusArray,
            labels: ['Resolved', 'New', 'In Progress'],
            id: Math.random(),
        }
    ]
    return (
        <div className={styles.dashboardStatisticsContainer}>
            {DUMMY_DATA.map(item => (
                <StatsCard chartData={item} id={item.id} key={item.id} />
            ))}
        </div>
    )
}

export default DashboardStatistics;