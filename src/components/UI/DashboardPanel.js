import { Fragment } from 'react';
import styles from './DashboardPanel.module.css'


const DashboardPanel = (props) => {

    let rows = [];

    const onSelectPanelPage = (event) => {
        let page = parseInt(event.target.innerText);
        props.onChangePage(page - 1);
    }

    const onIncreasePanelPage = () => {
        props.onChangePage(props.page + 1);
    }
    const onDecreasePanelPage = () => {
        props.onChangePage(props.page - 1);
    }

    for (let i = 0; i < props.pages; i++) {
        rows.push(<div onClick={onSelectPanelPage} className={`${styles.page} ${props.page === i && styles.activePage}`}>{i + 1}</div>)
    }

    return (
        <div className={styles.panelStyles}>
            <div className={styles.panelTitleAndButton}>
                <h4>{props.name}</h4>
                {props.buttonName ? <button onClick={props.onClick}>{props.buttonName}</button> : null}
            </div>
            <div className={styles.panelHeader}>
                {props.panelData && props.panelData.map((col, index) => (
                    <div key={index} style={{ width: `${col.width}%` }}>
                        {col.title}
                    </div>
                ))}
                <div></div>
            </div>
            <ul className={styles.panelList}>
                {props.children}
            </ul>
            <div className={styles.pageButtons}>
                {props.page >= 0 &&
                    <Fragment>
                        <div onClick={onDecreasePanelPage} className={styles.leftArrow}></div>
                        {rows}
                        <div onClick={onIncreasePanelPage} className={styles.rightArrow}></div>
                    </Fragment>
                }
            </div>
        </div>
    )
}

export default DashboardPanel;