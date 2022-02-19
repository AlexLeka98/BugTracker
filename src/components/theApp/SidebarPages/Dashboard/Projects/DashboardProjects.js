import DashboardPanel from '../../../../UI/DashboardPanel';
import { useContext, useEffect, useState } from 'react';
import useHttp from '../../../../../hooks/useHttp';
import ProjectForm from './ProjectForm';
import DashboardItem from '../../../../UI/DashboardItem';
import { useHistory } from 'react-router-dom';
import TicketContext from '../../../../../store/ticket-context';


const DashboardProjects = () => {
    const [page, setPage] = useState(1);


    const [projectItems, setProjectItems] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const history = useHistory();
    const ticketCtx = useContext(TicketContext);


    const closeFormModal = () => {
        setModalIsOpen(prevState => !prevState);
    }
    const toggleFormModal = () => {
        setModalIsOpen(prevState => (!prevState));
    }

    const addNewProjectHandler = (newProject) => {
        setProjectItems(prevProjects => {
            return [...prevProjects, newProject];
        })
    }

    const removeProjectHandler = (id) => {
        let httpInfo = {
            url: '/projects',
            method: 'DELETE',
            body: { id: id },
            headers: { 'Content-Type': 'application/json' }
        }
        httpRequest(httpInfo).then(() => {
            setProjectItems(prevProjects => {
                return prevProjects.filter(item => item._id !== id);
            })
        })
    }

    const { isLoading, error, httpRequest } = useHttp();
    useEffect(() => {
        let httpInfo = {
            url: '/projects',
        }
        httpRequest(httpInfo)
            .then(res => {
                setProjectItems(res);
            })
    }, [])

    const redirectProjectItemHandler = (item) => {
        ticketCtx.setSelectedTicket(null);
        let path = `/app/dashboard/project/${item._id}`
        history.push(path);
    }

    const panelData = [
        {
            title: 'PROJECT',
            width: 15,
        },
        {
            title: 'DESCRIPTION',
            width: 60,
        },
        {
            title: 'CONTRIBUTORS',
            width: 20,
        },
    ]
    if (projectItems) {
        console.log();
    }
    const panelTitles = { col1: 'PROJECT', col2: 'DESCRIPTION', col3: 'CONTRIBUTORS' }
    return (
        <DashboardPanel
            name='Projects'
            buttonName='New Project'
            onClick={toggleFormModal}
            panelTitles={panelTitles}
            panelData={panelData}
            pages={Math.ceil(projectItems.length/5)}
            >
            {projectItems.length > 0 && projectItems.map(project => {
                let rowData = [
                    { value: project.title, width: 15 },
                    { value: project.description, width: 60 },
                    { value: project.author, width: 20 },
                ]
                return (
                    <DashboardItem
                        rowData={rowData}
                        key={project._id}
                        id={project._id}
                        item={project}
                        onRemoveItem={removeProjectHandler}
                        onClickItem={redirectProjectItemHandler}
                    />
                )
            })}
            {isLoading && <div className='loader'></div>}
            {projectItems.length === 0 && <h5>No Projects yet.</h5>}
            {modalIsOpen && <ProjectForm onAddNewProject={addNewProjectHandler} closeFormModal={closeFormModal} />}
        </DashboardPanel >
    )
}

export default DashboardProjects;