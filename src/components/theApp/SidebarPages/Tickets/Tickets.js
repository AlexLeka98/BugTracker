import { Fragment, useContext, useEffect, useState } from "react";
import useHttp from "../../../../hooks/useHttp";
import DashboardPanel from "../../../UI/DashboardPanel";
import DashboardItem from "../../../UI/DashboardItem";
import styles from './Tickets.module.css'
import { useHistory } from "react-router-dom";
import TicketContext from "../../../../store/ticket-context";
import BugTrackHeader from "../BugTrackHeader";



const Tickets = () => {
    const [allTickets, setAllTickets] = useState([]);
    const [page, setPage] = useState(0);
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
        const path = `/app/dashboard/project/${selectedTicket.projectId._id}/${selectedTicket._id}`
        history.push(path);
    }

    const onChangePage = (page) => {
        console.log(page);
        console.log(Math.ceil(allTickets.length / 9 - 1));
        if (page >= 0 && page <= Math.ceil(allTickets.length / 9 - 1)) {
            console.log("I am still here");
            setPage(page);
        }
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
    return (
        <Fragment>
            <BugTrackHeader>Tickets</BugTrackHeader>
            <DashboardPanel
                name='Tickets'
                panelData={panelData}
                pages={Math.ceil(allTickets.length / 9)}
                onChangePage={onChangePage}
                page={page}
            >
                {allTickets && allTickets.length > 0 && allTickets.slice(page * 9, (page + 1) * 9).map(ticket => {
                    let rowData = [
                        { value: ticket.projectId.title, width: 22 },
                        { value: ticket.title, width: 22 },
                        { value: ticket.status, width: 17 },
                        { value: ticket.days, width: 17 },
                        { value: ticket.priority, width: 17 },
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