import styles from './DashboardPanel.module.css'


const DashboardPanel = (props) => {
    return (
        <div className={styles.panelStyles}>
            <div className={styles.panelTitleAndButton}>
                <h4>{props.name}</h4>
                {props.buttonName ? <button onClick={props.onClick}>{props.buttonName}</button> : null}
            </div>
            <div className={styles.panelHeader}>
                {props.panelData.map(col => (
                    <div style={{width: `${col.width}%`}}>
                        {col.title}
                    </div>
                ))}
                <div></div>
            </div>
            <ul className={styles.panelList}>
                {props.children}
            </ul>
        </div>
    )
}

export default DashboardPanel;