import styles from './DashboardItem.module.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import OutsideClick from '../../../../../hooks/OutsideClick';


const DashboardItem = (props) => {

    const [openDropDown, setOpenDropDown] = useState(false);

    const onOpenDropDownHandler = () => {
        setOpenDropDown(true);
    }
    const onCloseDropDownHandler = () => {
        setOpenDropDown(false);
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
                        <Link to='/'>{props.title}</Link>
                    </div>
                    <div className={styles.description}>
                        {props.description}
                    </div>
                    <div className={styles.author}>
                        {`${props.author}`}
                    </div>
                    <div className={styles.dots} onClick={onOpenDropDownHandler}>
                        {openDropDown && <div className={styles.dropDown}>
                            <OutsideClick eventHandler={onCloseDropDownHandler}>
                                <ul>
                                    <li>Update</li>
                                    <li>Delete</li>
                                </ul>
                            </OutsideClick>
                        </div>}
                    </div>
                </div>
            </li>
        )
    }
}

export default DashboardItem;