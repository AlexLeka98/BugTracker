import styles from './DashboardPanel.module.css'


const DashboardPanel = (props) => {
    return (
        <div className={styles.panelStyles}>
            <div className={styles.panelTitleAndButton}>
                <h4>{props.name}</h4>
                {props.buttonName ? <button onClick={props.onClick}>{props.buttonName}</button> : null}
            </div>
            <div className={styles.panelHeader}>
                
            </div>
            {props.children}
        </div>
    )
}

export default DashboardPanel;