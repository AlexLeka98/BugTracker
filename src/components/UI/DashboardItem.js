import styles from './DashboardItem.module.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';

import OutsideClick from '../../hooks/OutsideClick';
import useHttp from '../../hooks/useHttp';


const DashboardItem = (props) => {

    const [openDropDown, setOpenDropDown] = useState(false);
    const { isLoading, error, httpRequest } = useHttp();
    const onOpenDropDownHandler = () => {
        setOpenDropDown(true);
    }
    const onCloseDropDownHandler = (event) => {
        setOpenDropDown(false);
    }
    const toggleDropDownHandler = (event) => {
        setOpenDropDown(prevState => !prevState);
    }

    const deleteProjectHandler = () => {
        props.onRemoveItem(props.id);
    }


    return (
        <li className={styles.listItem}>
            <div className={styles.linkItem}>
                <div className={styles.title}>
                    <Link to={`/app/dashboard/project/${props.id}`}>{props.col1}</Link>
                </div>
                <div className={styles.description}>
                    <Link to={`/app/dashboard/project/${props.id}`}>{props.col2}</Link>
                </div>
                <div className={styles.author}>
                    {`${props.col3}`}
                    {/* {`${props.author}${props.contrib !== undefined && props.contrib.map(contributor => ` , ${contributor.name} ${contributor.surname}`)}`} */}
                </div>
                <OutsideClick eventHandler={onCloseDropDownHandler}>
                    <div className={styles.dots} onClick={toggleDropDownHandler}>
                        {openDropDown && <div className={styles.dropDown}>
                            <ul>
                                <li>Update</li>
                                <li onClick={deleteProjectHandler}>Delete</li>
                            </ul>
                        </div>}
                    </div>
                </OutsideClick>
            </div>
        </li>

    )

}

export default DashboardItem;