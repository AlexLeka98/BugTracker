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
    const [team, setTeam] = useState([]);
    const [ticketModalIsOpen, setTicketModalIsOpen] = useState(false);
    const [teamModalIsOpen, setTeamModalIsOpen] = useState(false)

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
    }, [])


    // TICKET FORM
    const toggleTicketFormModal = () => {
        setTeamModalIsOpen(false)
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

    // TEAM FORM
    const toggleTeamFormModal = () => {
        setTicketModalIsOpen(false)
        setTeamModalIsOpen(prevState => (!prevState));
    }
    const closeTeamFormModal = () => {
        setTeamModalIsOpen(prevState => !prevState);
    }
    const addNewMemberHandler = (newMember) => {
        setTeam(prevProjects => {
            return [...prevProjects, newMember];
        })
    }
    console.log(tickets);

    return (
        <div className={styles.projectPageContainer}>
            {project &&
                <div className={styles.projectPage}>
                    <div className={styles.teamPanelStyle}>
                        <DashboardPanel name='Team' buttonName='Add Member' onClick={toggleTeamFormModal}>
                            <ul className={styles.projectList}>
                                <DashboardItem
                                    title='NAME'
                                    description='EMAIL'
                                    contributors='PHONE'
                                />



                                {isLoading && <div className='loader'></div>}
                                {team.length === 0 && <h5 className={styles.noProjects}>No Teams yet.</h5>}
                            </ul>
                            {teamModalIsOpen &&
                                <ProjectTeamForm addNewMemberHandler={addNewMemberHandler} closeTeamFormModal={closeTeamFormModal} id={match.params.id} />
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
                                    // onRemoveItem={removeProjectHandler}
                                    />
                                ))}
                                {isLoading && <div className='loader'></div>}
                                {tickets.length === 0 && <h5 className={styles.noProjects}>No Projects yet.</h5>}
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