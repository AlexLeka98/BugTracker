import styles from './DashboardProjects.module.css'
import DashboardItem from './DashboardItem';
import DashboardPanel from '../../../../UI/DashboardPanel';
import { useEffect, useState } from 'react';
import useHttp from '../../../../../hooks/useHttp';
import ProjectForm from './ProjectForm';



const DashboardProjects = () => {
    const [projectItems, setProjectItems] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeFormModal = () => {
        setModalIsOpen(prevState => !prevState);
    }
    const toggleFormModal = () => {
        setModalIsOpen(prevState => (!prevState));
    }

    const addNewProjectHandler = (newProject) => {
        console.log('I am here!');
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
        console.log(httpInfo);
        httpRequest(httpInfo)
            .then(res => {
                setProjectItems(res);
            })
    }, [])

    return (
        <DashboardPanel name='Projects' buttonName='New Project' onClick={toggleFormModal} >
            <ul className={styles.projectList}>
                <DashboardItem
                    title='PROJECT'
                    description='DESCRIPTION'
                    contributors='CONTRIBUTORS'
                />
                {projectItems.length > 0 && projectItems.map(item => (
                    <DashboardItem
                        title={item.title}
                        description={item.description}
                        author={item.author}
                        contrib={item.contributors}
                        key={item._id}
                        id={item._id}
                        onRemoveItem={removeProjectHandler}
                    />
                ))}
                {isLoading && <div className='loader'></div>}
                {projectItems.length === 0 && <h5 className={styles.noProjects}>No Projects yet.</h5>}
            </ul>
            {modalIsOpen && <ProjectForm onAddNewProject={addNewProjectHandler} closeFormModal={closeFormModal} />}
        </DashboardPanel >
    )
}

export default DashboardProjects;