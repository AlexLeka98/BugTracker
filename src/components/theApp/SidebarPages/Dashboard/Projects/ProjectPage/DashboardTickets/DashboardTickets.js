import DashboardPanel from "../../../../../../UI/DashboardPanel"
import ProjectTicketForm from "./ProjectTicketForm";
import { useRouteMatch } from "react-router-dom";
import DashboardItem from "../../../../../../UI/DashboardItem";

const DashboardTickets = (props) => {
    const match = useRouteMatch();
    const panelTitles = { col1: 'TITLE', col2: 'DESCRIPTION', col3: 'AUTHOR' }
    return (
        <DashboardPanel
            name='Tickets'
            buttonName='New Ticket'
            onClick={props.toggleTicketFormModal}
            panelTitles={panelTitles}>
                {props.tickets.length > 0 && props.tickets.map(item => (
                    <DashboardItem
                        col1={item.title}
                        col2={item.description}
                        col3={item.author}
                        key={item._id}
                        id={item._id}
                        status={item.status}
                        onRemoveItem={props.removeTicketHandler}
                    />
                ))}
                {props.tickets.length === 0 && <h5>No Tickets yet.</h5>}
            {props.ticketModalIsOpen &&
                <ProjectTicketForm
                    addNewTicketHandler={props.addNewTicketHandler}
                    closeTicketFormModal={props.closeTicketFormModal}
                    id={match.params.id}
                />
            }
        </DashboardPanel>
    )
}

export default DashboardTickets;