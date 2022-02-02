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


const DashboardProjects = () => {
    return (
        <DashboardPanel>
            <ul className={styles.projectList}>
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