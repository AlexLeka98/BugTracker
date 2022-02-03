import styles from './DashboardItem.module.css'
import { Link } from 'react-router-dom';


const DashboardItem = (props) => {
    if (props.contributors) {
        return (
            <li className={styles.headerItem}>
                <div>
                    {props.title}
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
                        {props.title}
                    </div>
                    <div>
                        {props.description}
                    </div>
                    <div>
                        {`${props.author}`}
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