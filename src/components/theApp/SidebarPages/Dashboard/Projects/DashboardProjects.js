import styles from './DashboardProjects.module.css'
import DashboardItem from './DashboardItem';
import DashboardPanel from '../../../../UI/DashboardPanel';
import { Fragment, useEffect, useState } from 'react';
import useHttp from '../../../../../hooks/useHttp';
import ProjectForm from '../../../../UI/ProjectForm';



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
        setProjectItems(prevProjects => {
            return prevProjects.filter(item => item._id !== id);
        })
    }

    const { isLoading, error, httpRequest } = useHttp();
    useEffect(() => {
        let httpInfo = {
            url: '/projects',
        }
        httpRequest(httpInfo).then(res => {
            setProjectItems(res);
        })
    }, [])
    return (
        <Fragment>
            <DashboardPanel name='Projects' buttonName='New Project' onClick={toggleFormModal} >
                <ul className={styles.projectList}>
                    {projectItems.length > 0 &&
                        <DashboardItem
                            title='PROJECT'
                            description='DESCRIPTION'
                            contributors='CONTRIBUTORS'
                        />
                    }
                    {projectItems.length > 0 && projectItems.map(item => (
                        <DashboardItem
                            title={item.title}
                            description={item.description}
                            author={item.author}
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
        </Fragment>
    )
}

export default DashboardProjects;