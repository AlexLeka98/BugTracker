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
    console.log(match.params.id);

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
    const addNewTicketHandler = (newProject) => {
        setTickets(prevProjects => {
            return [...prevProjects, newProject];
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


    return (
        <div className={styles.projectPageContainer}>
            {project &&
                <div className={styles.projectPage}>
                    <div className={styles.teamPanelStyle}>
                        <DashboardPanel name='Team' buttonName='Add Member' onClick={toggleTeamFormModal}>
                            <DashboardItem
                                title='NAME'
                                description='EMAIL'
                                contributors='PHONE'
                            />
                            {teamModalIsOpen &&
                                <ProjectTeamForm addNewMemberHandler={addNewMemberHandler} closeTeamFormModal={closeTeamFormModal} id={match.params.id} />
                            }
                        </DashboardPanel>
                    </div>
                    <div className={styles.ticketsPanelStyle}>
                        <DashboardPanel name='Tickets' buttonName='New Ticket' onClick={toggleTicketFormModal}>
                            <DashboardItem
                                title='TICKET TITLE'
                                description='DESCRIPTION'
                                contributors='TICKET AUTHOR'
                            />
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