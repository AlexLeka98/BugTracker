import styles from './DashboardProjects.module.css'
import DashboardItem from './DashboardItem';
import DashboardPanel from '../../../../UI/DashboardPanel';
import { useEffect, useState } from 'react';
import useHttp from '../../../../../hooks/useHttp';
import ProjectForm from '../../../../UI/ProjectForm';

const DUMMY_DATA = [
    {
        name: 'Bug Tracker',
        description: 'Project managment tool to track project issues, buggs, etc.',
        authorname: 'Aleksander',
        authorsurname: 'Leka',
        id: Math.random(),
    },
    {
        name: 'Crypto app',
        description: 'Project managment tool to track project issues, buggs, etc.',
        authorname: 'Aleksander',
        authorsurname: 'Leka',
        id: Math.random(),
    },
    {
        name: 'Bug Tracker',
        description: 'Project managment tool to track project issues, buggs, etc.',
        authorname: 'Aleksander',
        authorsurname: 'Leka',
        id: Math.random(),
    },
    {
        name: 'Bug Tracker',
        description: 'Project managment tool to track project issues, buggs, etc.',
        authorname: 'Aleksander',
        authorsurname: 'Leka',
        id: Math.random(),
    },
]



const DashboardProjects = () => {
    const [dashItemsData, setDashItemsData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeFormModal = () => {
        setModalIsOpen(prevState => !prevState);
    }
    const openFormModal = () => {
        setModalIsOpen(true);
    }

    const { isLoading, error, httpRequest } = useHttp();
    useEffect(() => {
        let httpInfo = {
            url: '/projects',
        }
        // let data;
        httpRequest(httpInfo).then(res => {
            setDashItemsData(res);
        })
    }, [])
    return (
        <DashboardPanel name='Projects' buttonName='New Project' onClick={openFormModal} >
            <ul className={styles.projectList}>
                {dashItemsData.length > 0 &&
                    <DashboardItem
                        title='PROJECT'
                        description='DESCRIPTION'
                        contributors='CONTRIBUTORS'
                    />
                }
                {dashItemsData.length > 0 && dashItemsData.map(item => (
                    <DashboardItem
                        title={item.title}
                        description={item.description}
                        author={item.author}
                        key={item._id}
                        id={item._id}
                    />
                ))}
                {isLoading && <div className='loader'></div>}
                {dashItemsData.length === 0 && <h5 className={styles.noProjects}>No Projects yet.</h5>}
            </ul>
            {modalIsOpen && <ProjectForm closeFormModal={closeFormModal} />}
        </DashboardPanel >
    )
}

export default DashboardProjects;