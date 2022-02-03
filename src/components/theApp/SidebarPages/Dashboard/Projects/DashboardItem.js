import styles from './DashboardItem.module.css'
import { Link } from 'react-router-dom';


const DashboardItem = (props) => {
    if (props.contributors) {
        return (
            <li className={styles.headerItem}>
                <div>
                    {props.name}
                </div>
                <div>
                    {props.description}
                </div>
                <div>
                    {props.contributors}
                </div>
                <div></div>
            </li>
        )
    }
    else {
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
                        dots
                    </div>
                </Link>
            </li>
        )
    }
}

export default DashboardItem;