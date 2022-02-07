import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import useHttp from '../../../../../../hooks/useHttp';
import DashboardPanel from '../../../../../UI/DashboardPanel';
import DashboardItem from '../DashboardItem';
import styles from './ProjectPage.module.css'
import ProjectTicketForm from './ProjectTicketForm'
import ProjectTeamForm from './ProjectTeamForm';

const ProjectPage = (props) => {
    const { isLoading, error, httpRequest } = useHttp();
    const [project, setProject] = useState(null)

    const [tickets, setTickets] = useState([]);
    const [members, setMembers] = useState([]);
    const [ticketModalIsOpen, setTicketModalIsOpen] = useState(false);
    const [membersModalIsOpen, setMembersModalIsOpen] = useState(false)

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


    // TEAM FORM
    const toggleMembersFormModal = () => {
        setTicketModalIsOpen(false)
        setMembersModalIsOpen(prevState => (!prevState));
    }
    const closeMembersFormModal = () => {
        setMembersModalIsOpen(prevState => !prevState);
    }
    const addNewMemberHandler = (newMember) => {
        setMembers(prevProjects => {
            return [...prevProjects, newMember];
        })
    }
    const removeMemberHandler = (id) => {
        console.log('Removing member from the Member And in general');
    }

    // TICKET FORM
    const toggleTicketFormModal = () => {
        setMembersModalIsOpen(false)
        setTicketModalIsOpen(prevState => (!prevState));
    }
    const closeTicketFormModal = () => {
        setTicketModalIsOpen(prevState => !prevState);
    }
    const addNewTicketHandler = (newTicket) => {
        console.log(newTicket);
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
            console.log('Hey there');
            console.log(id);
            setTickets(prevTickets => {
                return prevTickets.filter(ticket => ticket._id !== id);
            })
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <div className={styles.projectPageContainer}>
            {project &&
                <div className={styles.projectPage}>
                    <div className={styles.teamPanelStyle}>
                        <DashboardPanel name='Team' buttonName='Add Member' onClick={toggleMembersFormModal}>
                            <ul className={styles.projectList}>
                                <DashboardItem
                                    title='NAME'
                                    description='EMAIL'
                                    contributors='PHONE'
                                />



                                {isLoading && <div className='loader'></div>}
                                {members.length === 0 && <h5 className={styles.noProjects}>No Members yet.</h5>}
                            </ul>
                            {membersModalIsOpen &&
                                <ProjectTeamForm addNewMemberHandler={addNewMemberHandler} closeMembersFormModal={closeMembersFormModal} id={match.params.id} />
                            }
                        </DashboardPanel>
                    </div>
                    <div className={styles.ticketsPanelStyle}>
                        <DashboardPanel name='Tickets' buttonName='New Ticket' onClick={toggleTicketFormModal}>
                            <ul className={styles.projectList}>
                                <DashboardItem
                                    title='TICKET TITLE'
                                    description='DESCRIPTION'
                                    contributors='TICKET AUTHOR'
                                />
                                {tickets.length > 0 && tickets.map(item => (
                                    <DashboardItem
                                        title={item.title}
                                        description={item.description}
                                        author={item.author}
                                        key={item._id}
                                        id={item._id}
                                        status={item.status}
                                        onRemoveItem={removeTicketHandler}
                                    />
                                ))}
                                {/* {isLoading && <div className='loader'></div>} */}
                                {tickets.length === 0 && <h5 className={styles.noProjects}>No Tickets yet.</h5>}
                            </ul>
                            {ticketModalIsOpen &&
                                <ProjectTicketForm addNewTicketHandler={addNewTicketHandler} closeTicketFormModal={closeTicketFormModal} id={match.params.id} />
                            }
                        </DashboardPanel>
                    </div>
                </div>
            }
            {isLoading && <div className='loader'></div>}
        </div>
    )
}

export default ProjectPage;