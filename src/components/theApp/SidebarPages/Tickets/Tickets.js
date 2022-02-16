import { Fragment, useContext, useEffect, useState } from "react";
import useHttp from "../../../../hooks/useHttp";
import DashboardPanel from "../../../UI/DashboardPanel";
import DashboardItem from "../../../UI/DashboardItem";
import styles from './Tickets.module.css'
import { useHistory } from "react-router-dom";
import TicketContext from "../../../../store/ticket-context";



const Tickets = () => {
    const [allTickets, setAllTickets] = useState([]);
    const { httpRequest, error, isLoading } = useHttp();
    const history = useHistory();
    const ticketCtx = useContext(TicketContext);

    useEffect(() => {
        let httpInfo = {
            url: '/tickets',
            method: 'GET'
        }
        httpRequest(httpInfo).then(res => {
            setAllTickets(res);
        })
    }, [])

    const selectATicket = (selectedTicket) => {
        const path = `/app/dashboard/project/${selectedTicket.projectId}/${selectedTicket._id}`
        history.push(path);
    }

    const panelData = [
        {
            title: 'PROJECT',
            width: 22
        },
        {
            title: 'TICKET',
            width: 22
        },
        {
            title: 'STATUS',
            width: 17
        },
        {
            title: 'DAYS OUTSTANDING',
            width: 17
        },
        {
            title: 'PRIORITY',
            width: 17
        },
    ]
    console.log(allTickets);
    return (
        <Fragment>
            <h1 className={styles.ticketsTitle}>Tickets</h1>
            <DashboardPanel
                name='Tickets'
                panelData={panelData}>
                {allTickets && allTickets.length > 0 && allTickets.map(ticket => {
                    let rowData = [
                        { value: 'Project', width: 22 },
                        { value: ticket.title, width: 22 },
                        { value: ticket.status, width: 17 },
                        { value: 3, width: 17 },
                        { value: 'Resolved', width: 17 },
                    ]
                    return (
                        <DashboardItem
                            rowData={rowData}
                            key={ticket._id}
                            id={ticket._id}
                            item={ticket}
                            className={styles.hoverColor}
                            // onRemoveItem={removeProjectHandler}
                            onClickItem={selectATicket}
                        />
                    )
                })}
                {isLoading && <div className="loader" style={{ marginTop: '30px' }}></div>}
            </DashboardPanel>
        </Fragment>
    )
}

export default Tickets;