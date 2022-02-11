import DashboardPanel from '../../../../UI/DashboardPanel';
import { useEffect, useState } from 'react';
import useHttp from '../../../../../hooks/useHttp';
import ProjectForm from './ProjectForm';
import DashboardItem from '../../../../UI/DashboardItem';
import { useHistory } from 'react-router-dom';



const DashboardProjects = () => {
    const [projectItems, setProjectItems] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const history = useHistory();


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

    const panelTitles = { col1: 'PROJECT', col2: 'DESCRIPTION', col3: 'CONTRIBUTORS' }

    const redirectProjectItemHandler = (item) => {
        let path = `/app/dashboard/project/${item._id}`
        history.push(path);
    }

    return (
        <DashboardPanel
            name='Projects'
            buttonName='New Project'
            onClick={toggleFormModal}
            panelTitles={panelTitles}>
            {projectItems.length > 0 && projectItems.map(item => (
                <DashboardItem
                    col1={item.title}
                    col2={item.description}
                    col3={item.author}
                    contrib={item.contributors}
                    key={item._id}
                    id={item._id}
                    item={item}
                    onRemoveItem={removeProjectHandler}
                    onClickItem={redirectProjectItemHandler}
                />
            ))}
            {isLoading && <div className='loader'></div>}
            {projectItems.length === 0 && <h5>No Projects yet.</h5>}
            {modalIsOpen && <ProjectForm onAddNewProject={addNewProjectHandler} closeFormModal={closeFormModal} />}
        </DashboardPanel >
    )
}

export default DashboardProjects;