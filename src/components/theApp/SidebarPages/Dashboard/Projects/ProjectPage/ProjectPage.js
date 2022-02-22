import { Fragment, useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import useHttp from '../../../../../../hooks/useHttp';
import styles from './ProjectPage.module.css'
import DashboardTickets from './DashboardTickets/DashboardTickets';
import DashboardMembers from './DashboardMembers/DashboardMembers';
import TicketContext from '../../../../../../store/ticket-context';
import SingleTicket from './DashboardTickets/SingleTicket/SingleTicket';

const ProjectPage = () => {
    const { isLoading, httpRequest } = useHttp();
    const [project, setProject] = useState(null)
    const [tickets, setTickets] = useState([]);
    const [memberAddFormModalIsOpen, setMemberAddFormModalIsOpen] = useState(false);
    const [ticketAddFormModalIsOpen, setTicketAddFormModalIsOpen] = useState(false);
    const [ticketUpdateFormModalIsOpen, setTicketUpdateFormModalIsOpen] = useState(false);

    const match = useRouteMatch();
    const ticketCtx = useContext(TicketContext);

    useEffect(() => {
        let httpInfo = {
            url: `/projects/${match.params.projectId}`,
            method: 'GET'
        }
        httpRequest(httpInfo).then(res => {
            setProject(res);
            setTickets(res.tickets)
        }).catch(err => {
            console.log(err);
        })
        if (match.params.ticketId) {
            const httpInfo = {
                url: `/tickets/${match.params.ticketId}`,
            }
            httpRequest(httpInfo).then(res => {
                ticketCtx.setSelectedTicket(res);
            })
        }
        return () => {
            setProject({}); // This worked for me
        };
    }, [])

    // Member and Ticket modal communicate with each other, thats why they have to be in the parebt component.
    const toggleAddMemberFormModal = () => {
        setTicketAddFormModalIsOpen(false);
        setTicketUpdateFormModalIsOpen(false);
        setMemberAddFormModalIsOpen(prevState => (!prevState));
    }
    // TICKETS FORM
    const toggleAddTicketFormModal = () => {
        setMemberAddFormModalIsOpen(false);
        setTicketUpdateFormModalIsOpen(false);
        setTicketAddFormModalIsOpen(prevState => (!prevState));
    }

    // const toggle
    const toggleUpdateTicketFormModal = () => {
        setMemberAddFormModalIsOpen(false);
        setTicketAddFormModalIsOpen(false);
        setTicketUpdateFormModalIsOpen(prevState => (!prevState));
    }


    // Ticket operations, add, update, delete.
    const addNewTicketHandler = (newTicket) => {
        setTickets(prevTickets => {
            return [...prevTickets, newTicket];
        })
        toggleAddTicketFormModal();
    }

    const updateTicketHandler = (updatedTicket) => {
        console.log(updatedTicket);
        setTickets(prevTickets => {
            let newTickets = [...prevTickets];
            prevTickets.map((ticket, index) => {
                if (ticket._id === updatedTicket._id) {
                    newTickets[index] = updatedTicket;
                    ticketCtx.setSelectedTicket(updatedTicket);
                }
            })
            console.log(newTickets);
            return newTickets;
        })
        // After we update the ticket, we check if the selectedTicket was update, cuz in that case
        // it needs to change also.
    }

    const removeTicketHandler = (ticketId) => {
        setTickets(prevTickets => {
            return prevTickets.filter(ticket => ticket._id !== ticketId);
        })
    }

    return (
        <Fragment>
            <h1 className={styles.projectTitle}>{project && project.title}</h1>
            {project &&
                <div className={styles.projectPageContainer}>
                    <div className={styles.projectPage}>
                        <div className={styles.ticketsPanelStyle}>
                            <DashboardTickets
                                tickets={tickets}
                                onUpdateTicket={updateTicketHandler}
                                toggleAddTicketFormModal={toggleAddTicketFormModal}
                                toggleUpdateTicketFormModal={toggleUpdateTicketFormModal}
                                ticketAddFormModalIsOpen={ticketAddFormModalIsOpen}
                                ticketUpdateFormModalIsOpen={ticketUpdateFormModalIsOpen}
                                updateTicketHandler={updateTicketHandler}
                                addNewTicketHandler={addNewTicketHandler}
                                removeTicketHandler={removeTicketHandler}
                            />
                        </div>
                        <div className={styles.teamPanelStyle}>
                            <DashboardMembers
                                members={project.users}
                                toggleAddMemberFormModal={toggleAddMemberFormModal}
                                memberAddFormModalIsOpen={memberAddFormModalIsOpen} />
                        </div>
                    </div>
                    {ticketCtx.selectedTicket &&
                        <SingleTicket
                            ticket={ticketCtx.selectedTicket}
                            onUpdateSelectedTicket={updateTicketHandler}
                        />}
                    
                </div>
            }
            {isLoading && <div className={`${styles.loadingStyle} loader bigBlack`}></div>}
        </Fragment>
    )
}

export default ProjectPage;