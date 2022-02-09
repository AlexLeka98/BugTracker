import { Fragment, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import useHttp from '../../../../../../hooks/useHttp';
import styles from './ProjectPage.module.css'
import DashboardTickets from './DashboardTickets/DashboardTickets';
import DashboardMembers from './DashboardMembers/DashboardMembers';
import SingleTicket from './DashboardTickets/SingleTicket/SingleTicket';


const ProjectPage = (props) => {
    const { isLoading, error, httpRequest } = useHttp();
    const [project, setProject] = useState(null)
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [memberAddFormModalIsOpen, setMemberAddFormModalIsOpen] = useState(false);
    const [ticketAddFormModalIsOpen, setTicketAddFormModalIsOpen] = useState(false);
    const [ticketUpdateFormModalIsOpen, setTicketUpdateFormModalIsOpen] = useState(false);

    const match = useRouteMatch();

    useEffect(() => {
        let httpInfo = {
            url: `/projects/${match.params.id}`,
            method: 'GET'
        }
        httpRequest(httpInfo).then(res => {
            setProject(res);
        }).catch(err => {
            console.log(err);
        })
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

    return (
        <Fragment>
            <h1>{project && project.title}</h1>
            {project &&
                <div className={styles.projectPageContainer}>
                    <div className={styles.projectPage}>
                        <div className={styles.ticketsPanelStyle}>
                            <DashboardTickets
                                tickets={project.tickets}
                                toggleAddTicketFormModal={toggleAddTicketFormModal}
                                toggleUpdateTicketFormModal={toggleUpdateTicketFormModal}
                                ticketAddFormModalIsOpen={ticketAddFormModalIsOpen}
                                ticketUpdateFormModalIsOpen={ticketUpdateFormModalIsOpen}
                                onSelectTicket={setSelectedTicket} />
                        </div>
                        <div className={styles.teamPanelStyle}>
                            <DashboardMembers
                                members={project.users}
                                toggleAddMemberFormModal={toggleAddMemberFormModal}
                                memberAddFormModalIsOpen={memberAddFormModalIsOpen} />
                        </div>
                    </div>
                    {selectedTicket &&
                        <SingleTicket
                            ticket={selectedTicket} />
                    }
                </div>
            }
            {isLoading && <div className='loader bigBlack'></div>}
        </Fragment>
    )
}

export default ProjectPage;