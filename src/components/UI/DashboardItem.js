import styles from './DashboardItem.module.scss'
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
        <li className={`${styles.listItem}`}>
            <div className={`${styles.linkItem} ${props.className && props.className}`}>
                {props.rowData.map((row, index) => (
                    <div key={index} onClick={props.onClickItem && redirectItemPath} style={{ width: `${row.width}%` }}>
                        <p>{row.value}</p>
                    </div>
                ))}
                {props.onRemoveItem &&
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
                }
            </div>
        </li>

    )

}

export default DashboardItem;