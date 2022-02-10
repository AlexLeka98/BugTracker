import styles from './SingleTicket.module.css'




const SingleTicket = (props) => {

    const { ticket } = props;
    console.log(ticket);
    return (
        <div className={styles.panelStyles}>
            <h4>{ticket.title}</h4>
            <div className={styles.ticketContainer}>
                <div className={styles.ticketInfo}>
                    <div className={styles.firstInfoRow}>
                        <div>
                            <p>TICKET TITLE</p>
                            <h5>{ticket.title}</h5>
                        </div>
                        <div>
                            <p>AUTHOR</p>
                            <h5>{ticket.author}</h5>
                        </div>
                        <div>
                            <p>DESCRIPTION</p>
                            <h5>{ticket.description}</h5>
                        </div>
                    </div>
                    <div className={styles.secondInfoRow}>
                        <div>
                            <p>STATUS</p>
                            <h5>{ticket.status}</h5>
                        </div>
                        <div>
                            <p>PRIORITY</p>
                            <h5>HIGH</h5>
                        </div>
                        <div>
                            <p>TYPE</p>
                            <h5>{ticket.type}</h5>
                        </div>
                        <div>
                            <p>TIME ESTIMATE (HOURS)</p>
                            <h5>4</h5>
                        </div>
                    </div>
                </div>
                <div className={styles.ticketComments}>
                    TicketComments
                </div>
            </div>
        </div>
    )

}


export default SingleTicket;