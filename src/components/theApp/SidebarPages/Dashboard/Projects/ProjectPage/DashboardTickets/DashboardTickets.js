import DashboardPanel from "../../../../../../UI/DashboardPanel"
import ProjectTicketForm from "./ProjectTicketForm";
import { useRouteMatch } from "react-router-dom";
import DashboardItem from "../../../../../../UI/DashboardItem";
import { useState } from "react";
import useHttp from "../../../../../../../hooks/useHttp";

const DashboardTickets = (props) => {
    const match = useRouteMatch();
    const panelTitles = { col1: 'TITLE', col2: 'DESCRIPTION', col3: 'AUTHOR' }
    const [tickets, setTickets] = useState(props.tickets);
    const { isLoading, error, httpRequest } = useHttp()


    const onToggleTicketFormModal = () => {
        props.setTicketModalIsOpen(prevState => (!prevState));
    }

    const closeTicketFormModal = () => {
        props.setTicketModalIsOpen(prevState => !prevState);
    }
    const addNewTicketHandler = (newTicket) => {
        setTickets(prevTickets => {
            return [...prevTickets, newTicket];
        })
    }
    const removeTicketHandler = (ticketId) => {
        let httpInfo = {
            url: '/projects/ticket',
            method: 'DELETE',
            body: { ticketId: ticketId, projectId: match.params.id },
            headers: { 'Content-Type': 'application/json' }
        }
        httpRequest(httpInfo).then(() => {
            setTickets(prevTickets => {
                return prevTickets.filter(ticket => ticket._id !== ticketId);
            })
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <DashboardPanel
            name='Tickets'
            buttonName='New Ticket'
            onClick={onToggleTicketFormModal}
            panelTitles={panelTitles}>
            {tickets.length > 0 && tickets.map(item => (
                <DashboardItem
                    col1={item.title}
                    col2={item.description}
                    col3={item.author}
                    key={item._id}
                    id={item._id}
                    status={item.status}
                    onRemoveItem={removeTicketHandler}
                />
            ))}
            {tickets.length === 0 && <h5>No Tickets yet.</h5>}
            {props.ticketModalIsOpen &&
                <ProjectTicketForm
                    addNewTicketHandler={addNewTicketHandler}
                    closeTicketFormModal={closeTicketFormModal}
                    id={match.params.id}
                />
            }
        </DashboardPanel>
    )
}

export default DashboardTickets;