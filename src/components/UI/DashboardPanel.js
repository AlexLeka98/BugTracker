import styles from './DashboardPanel.module.css'


const DashboardPanel = (props) => {
    const panelTitles = props.panelTitles;
    return (
        <div className={styles.panelStyles}>
            <div className={styles.panelTitleAndButton}>
                <h4>{props.name}</h4>
                {props.buttonName ? <button onClick={props.onClick}>{props.buttonName}</button> : null}
            </div>
            <div className={styles.panelHeader}>
                <div>
                    {panelTitles.col1}
                </div>
                <div>
                    {panelTitles.col2}
                </div>
                <div>
                    {panelTitles.col3}
                </div>
                <div></div>
            </div>
            <ul className={styles.panelList}>
                {props.children}
            </ul>
        </div>
    )
}

export default DashboardPanel;