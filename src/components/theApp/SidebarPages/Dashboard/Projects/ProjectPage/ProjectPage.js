import { Fragment, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import useHttp from '../../../../../../hooks/useHttp';
import styles from './ProjectPage.module.css'
import DashboardTickets from './DashboardTickets/DashboardTickets';
import DashboardMembers from './DashboardMembers/DashboardMembers';

const ProjectPage = (props) => {
    const { isLoading, error, httpRequest } = useHttp();
    const [project, setProject] = useState(null)
    const [tickets, setTickets] = useState([]);
    const [members, setMembers] = useState([]);
    const [ticketModalIsOpen, setTicketModalIsOpen] = useState(false);
    const [memberModalIsOpen, setMemberModalIsOpen] = useState(false)

    const match = useRouteMatch();

    useEffect(() => {
        let httpInfo = {
            url: `/projects/${match.params.id}`,
            method: 'GET'
        }
        httpRequest(httpInfo).then(res => {
            setProject(res);
            setTickets(res.tickets);
            setMembers(res.users);
        }).catch(err => {
            console.log(err);
        })
    }, [])


    // MEMBERS FORM
    const toggleMemberFormModal = () => {
        setTicketModalIsOpen(false)
        setMemberModalIsOpen(prevState => (!prevState));
    }
    const closeMemberFormModal = () => {
        setMemberModalIsOpen(prevState => !prevState);
    }
    const addNewMemberHandler = (newMember) => {
        setMembers(prevMembers => {
            return [...prevMembers, newMember];
        })
    }
    const removeMemberHandler = (userId) => {
        console.log('Icamehere');
        let httpInfo = {
            url: '/projects/user',
            method: 'DELETE',
            body: { userId: userId, projectId: match.params.id },
            headers: { 'Content-Type': 'application/json' }
        }
        httpRequest(httpInfo).then(() => {
            setMembers(prevUsers => {
                return prevUsers.filter(user => user._id !== userId);
            })
        }).catch(err => {
            console.log(err);
        })
    }



    // TICKETS FORM
    const toggleTicketFormModal = () => {
        setMemberModalIsOpen(false)
        setTicketModalIsOpen(prevState => (!prevState));
    }
    const closeTicketFormModal = () => {
        setTicketModalIsOpen(prevState => !prevState);
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
        <Fragment>
            <h1>{project && project.title}</h1>
            <div className={styles.projectPageContainer}>
                <div className={styles.projectPage}>
                    <div className={styles.ticketsPanelStyle}>
                        <DashboardTickets
                            tickets={tickets}
                            addNewTicketHandler={addNewTicketHandler}
                            toggleTicketFormModal={toggleTicketFormModal}
                            ticketModalIsOpen={ticketModalIsOpen}
                            closeTicketFormModal={closeTicketFormModal}
                            removeTicketHandler={removeTicketHandler}
                        />
                    </div>
                    <div className={styles.teamPanelStyle}>
                        <DashboardMembers
                            members={members}
                            addNewMemberHandler={addNewMemberHandler}
                            toggleMemberFormModal={toggleMemberFormModal}
                            memberModalIsOpen={memberModalIsOpen}
                            closeMemberFormModal={closeMemberFormModal}
                            removeMemberHandler={removeMemberHandler}
                        />
                    </div>
                </div>
                {isLoading && <div className='loader'></div>}
            </div>
        </Fragment>
    )
}

export default ProjectPage;