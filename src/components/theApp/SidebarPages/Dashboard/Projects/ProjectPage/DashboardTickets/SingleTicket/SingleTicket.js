import styles from './SingleTicket.module.css'




const SingleTicket = (props) => {

    const {ticket} = props;

    return (
        <div className={styles.panelStyles}>
            <div className={styles.panelTitleAndButton}>
                <h4>{ticket.title}</h4>
                {props.buttonName ? <button onClick={props.onClick}>{props.buttonName}</button> : null}
            </div>
        </div>
    )

}


export default SingleTicket;