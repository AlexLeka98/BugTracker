import styles from './DashboardPanel.module.css'


const DashboardPanel = (props) => {

    let rows = [];
    for (let i = 0; i < props.pages; i++) {
        rows.push(<div className={styles.page1}>{i + 1}</div>)
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
            {rows.length > 1 &&
                <div className={styles.pageButtons}>
                    <div className={styles.leftArrow}></div>
                    {rows}
                    <div className={styles.rightArrow}></div>
                </div>
            }
        </div>
    )
}

export default DashboardPanel;