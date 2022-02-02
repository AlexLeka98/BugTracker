import styles from './DashboardItem.module.css'
import { Link } from 'react-router-dom';


const DashboardItem = (props) => {
    return (
        <li className={styles.listItem}>
            <Link to='/' className={styles.linkItem}>

                <div>
                    {props.name}
                </div>
                <div>
                    {props.description}
                </div>
                <div>
                    {`${props.authorname} ${props.authorsurname}`}
                </div>
                <div>
                    Three dots
                </div>
            </Link>
        </li>
    )
}

export default DashboardItem;