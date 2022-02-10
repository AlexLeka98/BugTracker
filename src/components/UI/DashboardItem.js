import styles from './DashboardItem.module.css'
import { useState } from 'react';

import OutsideClick from '../../hooks/OutsideClick';

const DashboardItem = (props) => {

    const [openDropDown, setOpenDropDown] = useState(false);

    const onCloseDropDownHandler = (event) => {
        setOpenDropDown(false);
    }
    const toggleDropDownHandler = (event) => {
        setOpenDropDown(prevState => !prevState);
    }

    const updateItemHandler = () => {
        props.onUpdateItem(props.item);
    }

    const deleteItemHandler = () => {
        props.onRemoveItem(props.id);
    }

    const redirectItemPath = () => {
        props.onClickItem(props.item);
    }
    return (
        <li className={styles.listItem}>
            <div className={styles.linkItem}>
                <div className={styles.col1}>
                    <a onClick={redirectItemPath}>{props.col1}</a>
                </div>
                <div className={styles.col2}>
                    <a onClick={redirectItemPath}>{props.col2}</a>
                </div>
                <div className={styles.col3}>
                    {`${props.col3}`}
                    {/* {`${props.author}${props.contrib !== undefined && props.contrib.map(contributor => ` , ${contributor.name} ${contributor.surname}`)}`} */}
                </div>
                <OutsideClick eventHandler={onCloseDropDownHandler}>
                    <div className={styles.dots} onClick={toggleDropDownHandler}>
                        {openDropDown && <div className={styles.dropDown}>
                            <ul>
                                {props.onUpdateItem && <li onClick={updateItemHandler}>Update</li>}
                                <li onClick={deleteItemHandler}>Delete</li>
                            </ul>
                        </div>}
                    </div>
                </OutsideClick>
            </div>
        </li>

    )

}

export default DashboardItem;