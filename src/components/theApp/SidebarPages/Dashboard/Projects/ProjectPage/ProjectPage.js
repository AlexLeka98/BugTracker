import { Fragment, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import useHttp from '../../../../../../hooks/useHttp';
import styles from './ProjectPage.module.css'
import DashboardTickets from './DashboardTickets/DashboardTickets';
import DashboardMembers from './DashboardMembers/DashboardMembers';

const ProjectPage = (props) => {
    const { isLoading, error, httpRequest } = useHttp();
    const [project, setProject] = useState(null)
    const [ticketModalIsOpen, setTicketModalIsOpen] = useState(false);
    const [memberModalIsOpen, setMemberModalIsOpen] = useState(false);

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
    const toggleMemberFormModal = () => {
        setTicketModalIsOpen(false)
        setMemberModalIsOpen(prevState => (!prevState));
    }
    // TICKETS FORM
    const toggleTicketFormModal = () => {
        setMemberModalIsOpen(false);
        setTicketModalIsOpen(prevState => (!prevState));
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
                                toggleTicketFormModal={toggleTicketFormModal}
                                ticketModalIsOpen={ticketModalIsOpen}
                                setTicketModalIsOpen={setTicketModalIsOpen}
                            />
                        </div>
                        <div className={styles.teamPanelStyle}>
                            <DashboardMembers
                                members={project.users}
                                toggleMemberFormModal={toggleMemberFormModal}
                                memberModalIsOpen={memberModalIsOpen}
                                setMemberModalIsOpen={setMemberModalIsOpen}
                            />
                        </div>
                    </div>
                </div>
            }
            {isLoading && <div className='loader bigBlack'></div>}
        </Fragment>
    )
}

export default ProjectPage;