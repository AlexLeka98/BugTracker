import styles from './DashboardProjects.module.css'
import DashboardItem from './DashboardItem';
import DashboardPanel from '../../../../UI/DashboardPanel';

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

const addNewProject = () => {
    console.log("Add a new Project!!!!!");
}

const DashboardProjects = () => {
    return (
        <DashboardPanel name='Projects' buttonName='New Project' onClick={addNewProject} >
            <ul className={styles.projectList}>
                <DashboardItem
                    name='PROJECT'
                    description='DESCRIPTION'
                    contributors='CONTRIBUTORS'
                />
                {DUMMY_DATA.map(item => (
                    <DashboardItem
                        name={item.name}
                        description={item.description}
                        authorname={item.authorname}
                        authorsurname={item.authorsurname}
                        key={item.id}
                        id={item.id}
                    />
                ))}
            </ul>
        </DashboardPanel >
    )
}

export default DashboardProjects;