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



    const addNewTicketHandler = (newTicket) => {
        setTickets(prevTickets => {
            return [...prevTickets, newTicket];
        })
    }

    // Stores the item that we want to update, so its data are filled in the 
    // modal form. Them we open the update <UpdateTicketForm />
    const selectUpdateItem = (ticket) => {
        props.toggleUpdateTicketFormModal();
        setUpdateTicket(ticket);
    }

    //Receive the ticket, open the form Model for update.
    const updateTicketHandler = (updatedTicket) => {
        setTickets(prevTickets => {
            let newTickets = [...prevTickets];
            prevTickets.map((ticket, index) => {
                if (ticket._id === updatedTicket._id) {
                    newTickets[index] = updatedTicket;
                }
            })
            return newTickets;
        })
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

    return (
        <DashboardPanel
            name='Tickets'
            buttonName='New Ticket'
            onClick={props.toggleAddTicketFormModal}
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
                    onUpdateItem={selectUpdateItem}
                    onClickItem={props.onSelectTicket}
                />
            ))}
            {tickets.length === 0 && <h5>No Tickets yet.</h5>}
            {props.ticketAddFormModalIsOpen &&
                <AddTicketForm
                    addNewTicketHandler={addNewTicketHandler}
                    closeAddTicketFormModal={props.toggleAddTicketFormModal}
                    // closeAddTicketFormModal={closeAddTicketFormModal}
                    id={match.params.id}
                />
            }
            {props.ticketUpdateFormModalIsOpen &&
                <UpdateTicketForm
                    updateTicketHandler={updateTicketHandler}
                    toggleUpdateTicketFormModal={props.toggleUpdateTicketFormModal}
                    id={match.params.id}
                    ticket={updateTicket}
                />
            }
        </DashboardPanel>
    )
}

export default DashboardTickets;