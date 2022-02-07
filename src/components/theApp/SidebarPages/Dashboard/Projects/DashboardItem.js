import styles from './DashboardItem.module.css'
import { Link, Route } from 'react-router-dom';
import { Fragment, useState } from 'react';
import OutsideClick from '../../../../../hooks/OutsideClick';
import useHttp from '../../../../../hooks/useHttp';

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
                <div className={styles.linkItem}>
                    <div className={styles.title}>
                        <Link to={`/app/dashboard/project/${props.id}`}>{props.title}</Link>
                    </div>
                    <div className={styles.description}>
                        <Link to={`/app/dashboard/project/${props.id}`}>{props.description}</Link>
                    </div>
                    <div className={styles.author}>
                        {`${props.author}${props.contrib !== undefined && props.contrib.map(contributor => ` , ${contributor.name} ${contributor.surname}`)}`}
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
}

export default DashboardItem;