import DashboardPanel from "../../../../../../UI/DashboardPanel"
import AddTicketForm from "./AddTicketForm";
import { useRouteMatch } from "react-router-dom";
import DashboardItem from "../../../../../../UI/DashboardItem";
import { useState } from "react";
import useHttp from "../../../../../../../hooks/useHttp";
import UpdateTicketForm from "./UpdateTicketForm";

const DashboardTickets = (props) => {
    const match = useRouteMatch();
    const panelTitles = { col1: 'TITLE', col2: 'DESCRIPTION', col3: 'AUTHOR' }
    const [tickets, setTickets] = useState(props.tickets);
    const { isLoading, error, httpRequest } = useHttp()
    const [updateTicket, setUpdateTicket] = useState(null);

    const onToggleTicketFormModal = () => {
        props.setTicketAddFormModalIsOpen(prevState => (!prevState));
    }

    const closeAddTicketFormModal = () => {
        console.log('Colse Add form ticket')
        props.setTicketAddFormModalIsOpen(prevState => !prevState);
    }
    const addNewTicketHandler = (newTicket) => {
        setTickets(prevTickets => {
            return [...prevTickets, newTicket];
        })
    }

    //Update Ticket with this ticket id.
    const updateTicketHandler = (ticket) => {
        props.setTicketUpdateFormModalIsOpen(true);
        setUpdateTicket(ticket);
        console.log('Updating...');
    }
    const closeUpdateTicketFormModal = () => {
        props.setTicketUpdateFormModalIsOpen(prevState => !prevState);
    }

    //Remove ticket with this ticket id.
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

    const redirectTicketItemHandler = (id) => {
        console.log('redirect Ticket Item Handler');
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
                    item={item}
                    onRemoveItem={removeTicketHandler}
                    onUpdateItem={updateTicketHandler}
                    onRedirectItem={redirectTicketItemHandler}
                />
            ))}
            {tickets.length === 0 && <h5>No Tickets yet.</h5>}
            {props.ticketAddFormModalIsOpen &&
                <AddTicketForm
                    addNewTicketHandler={addNewTicketHandler}
                    closeAddTicketFormModal={closeAddTicketFormModal}
                    id={match.params.id}
                />
            }
            {props.ticketUpdateFormModalIsOpen &&
                <UpdateTicketForm
                    updateTicketHandler={updateTicketHandler}
                    closeUpdateTicketFormModal={closeUpdateTicketFormModal}
                    id={match.params.id}
                    ticket={updateTicket}
                />
            }
        </DashboardPanel>
    )
}

export default DashboardTickets;