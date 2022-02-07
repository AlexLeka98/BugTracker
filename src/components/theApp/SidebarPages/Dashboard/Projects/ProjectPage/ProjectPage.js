import { useEffect, useState } from 'react';
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
            console.log(res);
            setTickets(res.tickets);
            console.log(res.users);
            setMembers(res.users);
        }).catch(err => {
            console.log(err);
        })
    }, [])


    // TEAM FORM
    const toggleMemberFormModal = () => {
        setTicketModalIsOpen(false)
        setMemberModalIsOpen(prevState => (!prevState));
    }
    const closeMemberFormModal = () => {
        setMemberModalIsOpen(prevState => !prevState);
    }
    const addNewMemberHandler = (newMember) => {
        console.log("Adding new member")
        console.log(newMember);

        setMembers(prevMembers => {
            return [...prevMembers, newMember];
        })
    }
    const removeMemberHandler = (id) => {
        console.log(id);
        let httpInfo = {
            url: '/users',
            method: 'DELETE',
            body: { id: id },
            headers: { 'Content-Type': 'application/json' }
        }
        httpRequest(httpInfo).then(() => {
            setMembers(prevMembers => {
                return prevMembers.filter(member => member._id !== id);
            })
        }).catch(err => {
            console.log(err);
        })
        console.log('Removing member from the Member And in general');
    }
    
    const toggleTicketFormModal = () => {
        setMemberModalIsOpen(false)
        setTicketModalIsOpen(prevState => (!prevState));
    }
    const closeTicketFormModal = () => {
        setTicketModalIsOpen(prevState => !prevState);
    }
    const addNewTicketHandler = (newTicket) => {
        setTickets(prevProjects => {
            return [...prevProjects, newTicket];
        })
    }
    const removeTicketHandler = (id) => {
        let httpInfo = {
            url: '/tickets',
            method: 'DELETE',
            body: { id: id },
            headers: { 'Content-Type': 'application/json' }
        }
        httpRequest(httpInfo).then(() => {
            setTickets(prevTickets => {
                return prevTickets.filter(ticket => ticket._id !== id);
            })
        }).catch(err => {
            console.log(err);
        })
    }
    console.log(tickets);
    return (
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
    )
}

export default ProjectPage;