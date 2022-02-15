import { Fragment, useContext, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import AddTicketForm from "./AddTicketForm";
import UpdateTicketForm from "./UpdateTicketForm";
import useHttp from "../../../../../../../hooks/useHttp";
import DashboardPanel from "../../../../../../UI/DashboardPanel"
import DashboardItem from "../../../../../../UI/DashboardItem";
import TicketContext from "../../../../../../../store/ticket-context";

const DashboardTickets = (props) => {
    const match = useRouteMatch();
    const [updateTicket, setUpdateTicket] = useState(null);
    const { httpRequest } = useHttp();

    const ticketCtx = useContext(TicketContext);
    const history = useHistory();

    const selectUpdateItem = (ticket) => {
        props.toggleUpdateTicketFormModal();
        setUpdateTicket(ticket);
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
            props.removeTicketHandler(ticketId);
        }).catch(err => {
            console.log(err);
        })
    }

    const panelData = [
        {
            title: 'TITLE',
            width: 15,
        },
        {
            title: 'DESCRIPTION',
            width: 60,
        },
        {
            title: 'AUTHOR',
            width: 20,
        },
    ]
    const onSelectedTicketHandler = (ticket) => {
        ticketCtx.setSelectedTicket(ticket);
        let path = `/app/dashboard/project/${match.params.projectId}/${ticket._id}`
        history.push(path);
    }

    const funcito = (yes) => {
        console.log('Funcioto');
    }

    return (
        <Fragment>
            <DashboardPanel
                name='Tickets'
                buttonName='New Ticket'
                onClick={props.toggleAddTicketFormModal}
                panelData={panelData}>
                {props.tickets.length > 0 && props.tickets.map(ticket => {
                    let rowData = [
                        { value: ticket.title, width: 15 },
                        { value: ticket.description, width: 60 },
                        { value: ticket.author, width: 20 },
                    ]
                    return (
                        <DashboardItem
                            rowData={rowData}
                            key={ticket._id}
                            id={ticket._id}
                            status={ticket.status}
                            item={ticket}
                            onRemoveItem={removeTicketHandler}
                            onUpdateItem={selectUpdateItem}
                            onClickItem={onSelectedTicketHandler}
                        />
                    )
                })}
                {props.tickets.length === 0 && <h5>No Tickets yet.</h5>}
                {props.ticketAddFormModalIsOpen &&
                    <AddTicketForm
                        addNewTicketHandler={props.addNewTicketHandler}
                        closeAddTicketFormModal={props.toggleAddTicketFormModal}
                        id={match.params.id}
                    />
                }
                {props.ticketUpdateFormModalIsOpen &&
                    <UpdateTicketForm
                        updateTicketHandler={props.updateTicketHandler}
                        toggleUpdateTicketFormModal={props.toggleUpdateTicketFormModal}
                        id={match.params.id}
                        ticket={updateTicket}
                    />
                }
            </DashboardPanel>
        </Fragment>
    )
}

export default DashboardTickets;